(async () => {
  /**
   * ╔══════════════════════════════════════════════════════════════════════════╗
   * ║  🌌 OMINI SYSTEM DATABASE GENERATOR — A FORJA VIVA                        ║
   * ║  O Oráculo Digital que Transforma Conceito em Pixel Renderizado          ║
   * ║                                                                           ║
   * ║  Foundry VTT v13.351+ | ApplicationV2 | Gemini 2.5 Pro | Niji v7        ║
   * ║  Repositório: https://github.com/SoftMissT/omini-system-vtt              ║
   * ║                                                                           ║
   * ║  MÓDULOS:                                                                 ║
   * ║  ├─ Prompt Forge (TTRPG, Manhwa, Token3D, Icon Library)                 ║
   * ║  ├─ Icon Synthesis Engine (Gemini → Midjourney)                         ║
   * ║  ├─ Fusion Engine (Item/Class/Skill Alchemy)                            ║
   * ║  ├─ Database Organizer (Auto-estruturação Git)                          ║
   * ║  └─ Reality Weaver (Sistema de Quebra de Regras)                        ║
   * ╚══════════════════════════════════════════════════════════════════════════╝
   */

  const { ApplicationV2, HandlebarsApplicationMixin } =
    foundry.applications.api;

  // ═══════════════════════════════════════════════════════════════════════════
  // 🔮 CONFIGURAÇÃO GLOBAL
  // ═══════════════════════════════════════════════════════════════════════════

  const OMINI_CONFIG = {
    APP_ID: "omini-db-generator",
    VERSION: "1.0.0",
    GEMINI_MODELS: {
      FAST: "gemini-2.0-flash-exp", // Geração rápida
      PRO: "gemini-2.5-pro-exp-0827", // Máxima inteligência
      THINKING: "gemini-2.0-flash-thinking-exp-01-21", // Raciocínio profundo
    },
    REPOSITORY: "https://github.com/SoftMissT/omini-system-vtt",
    ASSET_BASE: "modules/omini-system-assets/assets/icons",

    TIERS: {
      COMUM: { color: "#9e9e9e", glow: "soft silver", frame: "simple steel" },
      INCOMUM: {
        color: "#4caf50",
        glow: "green wisps",
        frame: "enhanced bronze",
      },
      RARO: {
        color: "#42a5f5",
        glow: "purple crystalline",
        frame: "ornate gold gemstones",
      },
      EPICO: {
        color: "#9c27b0",
        glow: "crimson lightning arcs",
        frame: "dragon-scale molten",
      },
      LENDARIO: {
        color: "#ffb74d",
        glow: "golden cosmic rays",
        frame: "celestial mandala prismatic",
      },
      MITICO: {
        color: "#bd00ff",
        glow: "void tendrils reality cracks",
        frame: "impossible geometry eldritch",
      },
    },
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // 🧬 GEMINI CLIENT — A CONSCIÊNCIA SINTÉTICA
  // ═══════════════════════════════════════════════════════════════════════════

  class GeminiClient {
    constructor(config = {}) {
      this.apiKey = config.apiKey || "";
      this.model = config.model || OMINI_CONFIG.GEMINI_MODELS.FAST;
    }

    async generateJSON(prompt) {
      if (!this.apiKey) {
        const storedKey = game.settings.get("omni-fusion", "geminiApiKey");
        if (storedKey) this.apiKey = storedKey;
        else throw new Error("Gemini API Key não configurada!");
      }

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text:
                    prompt +
                    "\nRESPONDA APENAS COM O JSON PURO. NÃO USE MARKDOWN BLOCKS.",
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);

      let text = data.candidates[0].content.parts[0].text;
      // Clean markdown if present
      text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      return JSON.parse(text);
    }

    async generateText(prompt) {
      if (!this.apiKey) {
        const storedKey = game.settings.get("omni-fusion", "geminiApiKey");
        if (storedKey) this.apiKey = storedKey;
        else throw new Error("Gemini API Key não configurada!");
      }

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 🎨 ICON SYNTHESIS ENGINE
  // ═══════════════════════════════════════════════════════════════════════════

  class IconSynthesisEngine {
    constructor(gemini) {
      this.gemini = gemini;
    }

    async synthesizePrompt(itemData, style = "MANHWA") {
      const styleGuide = PROMPT_TEMPLATES[style] || PROMPT_TEMPLATES.MANHWA;
      const prompt = `
            ${styleGuide}
            ITEM DATA: ${JSON.stringify(itemData)}
            TIER CONFIG: ${JSON.stringify(OMINI_CONFIG.TIERS[itemData.tier?.toUpperCase()] || OMINI_CONFIG.TIERS.COMUM)}
            
            Gere um prompt otimizado para Midjourney Niji v7 focado apenas no ícone do item.
        `;

      return await this.gemini.generateText(prompt);
    }

    async generateLibrary(category, items, style = "MANHWA") {
      ui.notifications.info(`📚 Sintetizando biblioteca para ${category}...`);
      const results = [];

      for (const item of items) {
        const prompt = await this.synthesizePrompt(item, style);
        results.push({
          name: item.name,
          tier: item.tier,
          prompt: prompt,
        });
      }

      return results;
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ⚗️ FUSION ENGINE
  // ═══════════════════════════════════════════════════════════════════════════

  class FusionEngine {
    constructor(gemini) {
      this.gemini = gemini;
    }

    async fuseItems(item1, item2, catalyst = null) {
      ui.notifications.info(`⚗️ Iniciando fusão dimensional...`);

      let prompt = PROMPT_TEMPLATES.FUSION.replace(
        "{ITEM_1}",
        JSON.stringify(item1, null, 2),
      ).replace("{ITEM_2}", JSON.stringify(item2, null, 2));

      if (catalyst) {
        prompt = prompt.replace(
          "{CATALYST_SECTION}",
          `CATALISADOR:\n${JSON.stringify(catalyst, null, 2)}`,
        );
      } else {
        prompt = prompt.replace("{CATALYST_SECTION}", "");
      }

      try {
        console.log("🧠 Consultando Gemini para fusão...");
        const fusedItem = await this.gemini.generateJSON(prompt);

        ui.notifications.info(`✨ Fusão completa: ${fusedItem.name}`);
        return fusedItem;
      } catch (error) {
        console.error("❌ Erro na fusão:", error);
        ui.notifications.error("Falha na fusão dimensional!");
        throw error;
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 📜 PROMPT TEMPLATES (DNA)
  // ═══════════════════════════════════════════════════════════════════════════

  const PROMPT_TEMPLATES = {
    MANHWA: `ESTILO: Korean Webtoon (Solo Leveling/Redice Studio). 
             Aura explosiva, contraste extremo, mana circuits, dimensional rifts.
             niji 7 --style scenic`,

    TTRPG: `ESTILO: High-end TTRPG (Baldur's Gate 3). 
            Painterly 3D render, ornate hexagonal frame, atmospheric particles.
            niji 7 --style expressive`,

    TOKEN_3D: `ESTILO: Cinematic 3D Portrait (Ufotable/Fate Zero). 
               Heroic 3/4 view, cinematic bokeh, dramatic rim lighting.
               niji 7 --style scenic`,

    FUSION: `Você é o OMINI Fusion Engine. Sua tarefa é fundir dois itens de um RPG Manhwa/VRMMO.
    
    ITEM 1: {ITEM_1}
    ITEM 2: {ITEM_2}
    {CATALYST_SECTION}

    REGRAS DE FUSÃO:
    1. O NOME deve ser épico e evocativo.
    2. O TIER deve ser igual ou superior ao maior tier dos itens base.
    3. A LORE deve narrar como as propriedades se fundiram.
    4. O EFEITO deve ser uma sinergia mecânica única.
    5. Gere também um PROMPT MIDJOURNEY para o ícone resultante.

    RESPONDA APENAS EM JSON:
    {
        "name": "...",
        "tier": "...",
        "type": "...",
        "lore": "...",
        "effects": [{"name": "...", "description": "..."}],
        "visual_description": "...",
        "icon_prompt_midjourney": "..."
    }`,
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // 🖥️ OMINI DATABASE GENERATOR UI
  // ═══════════════════════════════════════════════════════════════════════════

  class OminiDatabaseGenerator extends HandlebarsApplicationMixin(
    ApplicationV2,
  ) {
    constructor(options = {}) {
      super(options);
      this.gemini = new GeminiClient();
      this.iconSynth = new IconSynthesisEngine(this.gemini);
      this.fusion = new FusionEngine(this.gemini);

      this.state = {
        activeTab: "generation",
        category: "weapons",
        style: "MANHWA",
        items: [],
        results: null,
        fusionPanel: {
          slot1: null,
          slot2: null,
          catalyst: null,
          result: null,
        },
      };
    }

    static DEFAULT_OPTIONS = {
      id: OMINI_CONFIG.APP_ID,
      tag: "form",
      window: {
        title: "🌌 OMINI DATABASE GENERATOR — A Forja Viva",
        icon: "fas fa-atom",
        resizable: true,
      },
      position: { width: 900, height: 750 },
    };

    static PARTS = {
      main: {
        template:
          "modules/omini-system-vtt-assets/templates/macros/db-generator.hbs",
      },
    };

    async _prepareContext() {
      // Obter itens da database global do sistema OMINI_DB
      const dbItems = window.OMNI_DB?.[this.state.category] || [];

      return {
        config: OMINI_CONFIG,
        state: this.state,
        dbItems: dbItems,
        tabs: [
          { id: "generation", label: "Prompt Forge", icon: "fas fa-fire" },
          { id: "fusion", label: "Fusion Lab", icon: "fas fa-flask" },
          { id: "config", label: "System Config", icon: "fas fa-cog" },
        ],
      };
    }

    _onRender(context, options) {
      super._onRender(context, options);
      const html = this.element;

      // Bind Events
      html
        .querySelector("[name='category']")
        ?.addEventListener("change", (e) => {
          this.state.category = e.target.value;
          this.render();
        });

      html.querySelector("[name='style']")?.addEventListener("change", (e) => {
        this.state.style = e.target.value;
      });

      html.querySelectorAll(".tab-link").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          this.state.activeTab = e.currentTarget.dataset.tab;
          this.render();
        });
      });

      html
        .querySelector(".btn-generate")
        ?.addEventListener("click", this._onGeneratePrompts.bind(this));
      html
        .querySelector(".btn-fuse")
        ?.addEventListener("click", this._onFuseItems.bind(this));
      html
        .querySelector(".btn-save-config")
        ?.addEventListener("click", this._onSaveConfig.bind(this));

      // Fusion Slot Handlers
      html.querySelectorAll(".fusion-slot")?.forEach((slot) => {
        slot.addEventListener("drop", this._onSlotDrop.bind(this));
      });
    }

    async _onGeneratePrompts(event) {
      event.preventDefault();
      const items = window.OMNI_DB?.[this.state.category] || [];

      if (items.length === 0) {
        return ui.notifications.warn("Nenhum item encontrado nesta categoria!");
      }

      try {
        this.state.results = await this.iconSynth.generateLibrary(
          this.state.category,
          items,
          this.state.style,
        );
        this.render();

        // Save to Markdown
        this._saveResultsToMarkdown(this.state.results, this.state.category);
      } catch (error) {
        ui.notifications.error("Erro na geração de prompts!");
        console.error(error);
      }
    }

    async _onFuseItems(event) {
      event.preventDefault();
      if (!this.state.fusionPanel.slot1 || !this.state.fusionPanel.slot2) {
        return ui.notifications.warn("Coloque dois itens na forja!");
      }

      try {
        this.state.fusionPanel.result = await this.fusion.fuseItems(
          this.state.fusionPanel.slot1,
          this.state.fusionPanel.slot2,
          this.state.fusionPanel.catalyst,
        );
        this.render();
      } catch (error) {
        console.error(error);
      }
    }

    _onSlotDrop(event) {
      // Logic for drag and drop into slots
    }

    _onSaveConfig(event) {
      event.preventDefault();
      const key = this.element.querySelector("[name='geminiKey']").value;
      game.settings.set("omni-fusion", "geminiApiKey", key);
      ui.notifications.info("API Key salva com sucesso!");
    }

    async _saveResultsToMarkdown(results, category) {
      let content = `# 🌌 OMINI Prompt Library — ${category.toUpperCase()}\n\n`;
      content += `Gerado em: ${new Date().toLocaleString()}\n\n`;

      results.forEach((res) => {
        content += `## ${res.name} (${res.tier})\n`;
        content += `\`\`\`\n${res.prompt}\n\`\`\`\n\n`;
      });

      const filename = `${category}_icon_library_${Date.now()}.md`;
      saveDataToFile(content, "text/markdown", filename);
    }

    async _createItemInFoundry(itemData) {
      ui.notifications.info(`🔨 Criando ${itemData.name} no sistema...`);

      // Mapear dados do Gemini para o Schema do Foundry (Custom System Builder)
      const mappedData = {
        name: itemData.name,
        type: "weapon", // Default, pode ser dinâmico
        img: "icons/svg/item-bag.svg", // Placeholder, o usuário fará o upload depois
        system: {
          props: {
            rarity: itemData.tier,
            description: itemData.description,
            lore: itemData.lore,
            // Adicionar mais mapeamentos conforme necessário
          },
        },
      };

      const item = await Item.create(mappedData);
      if (item) {
        ui.notifications.info(
          `✅ ${itemData.name} criado no diretório de itens!`,
        );
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 🚀 INICIALIZAÇÃO
  // ═══════════════════════════════════════════════════════════════════════════

  // Registrar configuração do Gemini
  Hooks.once("init", () => {
    game.settings.register("omni-fusion", "geminiApiKey", {
      scope: "world",
      config: false,
      type: String,
      default: "",
    });
  });

  // Comando de macro
  Hooks.once("ready", () => {
    console.log(`
╔══════════════════════════════════════════════════════════════════════════╗
║  🌌 OMINI SYSTEM DATABASE GENERATOR                                       ║
║  v${OMINI_CONFIG.VERSION} — A Forja Viva                                        ║
║                                                                           ║
║  COMANDOS:                                                                ║
║  • new OminiDatabaseGenerator().render(true)  → Abrir interface           ║
║  • /omini config                              → Configurar Gemini         ║
║  • /omini fuse                                → Fusão rápida             ║
║                                                                           ║
║  REPOSITÓRIO: ${OMINI_CONFIG.REPOSITORY}  ║
╚══════════════════════════════════════════════════════════════════════════╝
    `);

    // Registrar comandos globais
    window.OminiDB = {
      open: () => new OminiDatabaseGenerator().render(true),
      IconSynth: IconSynthesisEngine,
      Fusion: FusionEngine,
      Gemini: GeminiClient,
      CONFIG: OMINI_CONFIG,
    };

    ui.notifications.info(
      "🌌 OMINI Database Generator carregado! Use: OminiDB.open()",
    );
  });

  // Executar se for chamado como macro
  if (typeof Macro !== "undefined") {
    new OminiDatabaseGenerator().render(true);
  }
})();
