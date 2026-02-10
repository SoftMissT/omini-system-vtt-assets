/**
 * 🎨 OMINI SYSTEM DATABASE GENERATOR
 * Macro para geração de Prompts (Niji 7/Midjourney), Ícones e Lore de Fusão.
 * Integração com Gemini AI.
 */

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

class OmniDatabaseGenerator extends HandlebarsApplicationMixin(ApplicationV2) {
    static DEFAULT_OPTIONS = {
        id: "omni-db-generator",
        tag: "form",
        window: {
            title: "🧬 OMINI DATABASE GENERATOR",
            icon: "fas fa-database",
            resizable: true,
            width: 700,
            height: 800
        },
        position: {
            width: 700,
            height: 800
        },
        classes: ["omni-hud", "db-generator"]
    };

    static PARTS = {
        form: {
            template: "modules/omini-system-assets/templates/macros/db-generator.hbs"
        }
    };

    async _prepareContext(_options) {
        return {
            modes: [
                { id: "icon", label: "🎨 Ícones (Skills/Itens)", icon: "fas fa-icons" },
                { id: "token", label: "♟️ Tokens 3D", icon: "fas fa-chess-pawn" },
                { id: "scene", label: "🗺️ Cenários/Mapas", icon: "fas fa-map" },
                { id: "fusion", label: "⚗️ Fusão & Forja", icon: "fas fa-fire-burner" }
            ],
            history: this.history || []
        };
    }

    _onRender(context, options) {
        super._onRender(context, options);
        
        // Mode Selection
        this.element.querySelectorAll(".mode-btn").forEach(btn => {
            btn.addEventListener("click", (e) => this._switchMode(e));
        });

        // Generate Button
        this.element.querySelector("#generate-btn")?.addEventListener("click", () => this._onGenerate());
        
        // Copy Buttons
        this.element.querySelectorAll(".copy-btn").forEach(btn => {
            btn.addEventListener("click", (e) => this._copyToClipboard(e));
        });
    }

    _switchMode(event) {
        const mode = event.currentTarget.dataset.mode;
        this.element.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
        event.currentTarget.classList.add("active");
        
        this.element.querySelectorAll(".generator-section").forEach(s => s.classList.add("hidden"));
        this.element.querySelector(`#section-${mode}`).classList.remove("hidden");
        
        this.currentMode = mode;
    }

    async _onGenerate() {
        const input = this.element.querySelector(`#input-${this.currentMode}`).value;
        const outputDiv = this.element.querySelector("#output-console");
        
        if (!input) return ui.notifications.warn("Digite algo para gerar!");

        outputDiv.innerHTML = `<div class="loading"><i class="fas fa-spinner fa-spin"></i> Processando com GEMINI...</div>`;

        try {
            // Call Gemini Service (Assumes omni.services.gemini exists)
            // If not, we fall back to a direct fetch or mock for now
            const result = await this._callGemini(this.currentMode, input);
            
            this._addToHistory(this.currentMode, input, result);
            this.render();
        } catch (err) {
            outputDiv.innerHTML = `<div class="error">ERRO: ${err.message}</div>`;
            console.error(err);
        }
    }

    async _callGemini(mode, input) {
        const gemini = game.modules.get("omini-system-vtt-assets")?.api?.gemini;
        
        if (!gemini) {
            throw new Error("Gemini Service não inicializado no módulo.");
        }

        let sysPrompt = "";
        
        // 🎨 PROMPT ENGINEERING - BASED ON USER FILES
        if (mode === "icon") {
            sysPrompt = `
            Você é um especialista em Prompt Engineering para Midjourney Niji 7.
            Objetivo: Gerar prompts para ícones de RPG no estilo "Solo Leveling + Ufotable".
            
            ESTRUTURA OBRIGATÓRIA DO PROMPT:
            "/imagine prompt: A perfect fusion of Ufotable anime and Redice Studio manhwa art, premium game UI icon, hexagonal golden frame with glowing edges, floating pixel particles, dark atmospheric background, [DESCRIÇÃO DO USUÁRIO]. Sharp iconography, clean geometric symbol, dramatic rim lighting, high contrast gradient, volumetric glow, professional color grading, 8k clarity --ar 1:1 --niji 7 --no character, person, face, hands, body, text, logo, watermark, blurry, noisy, flat"
            
            1. Analise o pedido do usuário (ex: "Espada de Fogo").
            2. Substitua [DESCRIÇÃO DO USUÁRIO] por uma descrição visual rica em inglês.
            3. Gere 3 variações do prompt.
            `;
        } 
        else if (mode === "token") {
            sysPrompt = `
            Você é um especialista em Prompt Engineering para Midjourney Niji 7.
            Objetivo: Gerar prompts para TOKENS 3D ISOMÉTRICOS de VTT.
            
            ESTRUTURA:
            "/imagine prompt: Full body shot, wide angle view, zoom out to fit entire character, white space padding around subject, Isometric VTT token art, strict top-down camera (90 degrees above), [DESCRIÇÃO DO PERSONAGEM], clean white background, flat overhead lighting, minimal shadows, no rim light, no cinematic lighting, bold black outlines, thick and consistent line art, sharp cel-shading optimized for top-down view, comic book coloring style, modern anime-inspired, 8k resolution --niji 7"
            
            Gere 3 variações descrevendo o personagem detalhadamente em inglês.
            `;
        }
        else if (mode === "scene") {
            sysPrompt = `
            Objetivo: Cenários estilo Manhwa/Anime (Ufotable + Redice Studio).
            ESTRUTURA:
            "/imagine prompt: A perfect fusion of Ufotable anime animation and Redice Studio manhwa art, masterpiece illustration, premium webtoon cover art style, Wide angle cinematic landscape shot of [DESCRIÇÃO DO LOCAL], [CLIMA/HORÁRIO]. Cinematic volumetric lighting, God rays, atmospheric perspective, high-frequency texture detail, Anime matte painting, intricate environment details, 8k resolution, masterpiece --ar 16:9 --niji 7 --no text, watermarks, characters, people, blurry, low quality, distorted perspective"
            `;
        }
        else if (mode === "fusion") {
            sysPrompt = `
            Você é o OMNI-SYSTEM, uma IA auxiliar de design de RPG.
            O usuário vai dar dois itens ou um conceito.
            Você deve:
            1. Criar um Nome Épico (Estilo Manhwa).
            2. Definir Raridade (Rare, Epic, Legendary, Mythic).
            3. Criar uma Descrição com Lore.
            4. Definir Efeitos Mecânicos (Dano, buffs, skills passivas).
            5. Gerar um prompt de imagem para esse item novo.
            
            Responda em JSON válido ou Markdown bem formatado.
            `;
        }

        const response = await gemini.chat(input, { systemInstruction: sysPrompt });
        return response;
    }

    _addToHistory(mode, input, output) {
        if (!this.history) this.history = [];
        this.history.unshift({
            mode: mode.toUpperCase(),
            input,
            output: marked.parse(output), // Render Markdown
            timestamp: new Date().toLocaleTimeString()
        });
    }

    _copyToClipboard(event) {
        const text = event.currentTarget.previousElementSibling.innerText;
        navigator.clipboard.writeText(text);
        ui.notifications.info("Copiado para a área de transferência!");
    }
}

// Inicialização
new OmniDatabaseGenerator().render(true);
