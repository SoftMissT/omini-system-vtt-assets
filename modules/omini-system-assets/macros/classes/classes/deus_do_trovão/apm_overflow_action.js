/* ═══════════════════════════════════════════════════════════════
 * CLASS FEATURE: APM Overflow
 * Class: Deus do Trovão
 * Type: Meta
 * ═══════════════════════════════════════════════════════════════ */
(async () => {
    if (!OmniCore.validateModules(["dice-so-nice", "sequencer"])) return;
    const actor = await OmniCore.actor.resolve();
    
    // Estilo Visual "Glitch" ou "System"
    const isGlitch = "hidden" === "glitch";
    const borderColor = isGlitch ? "#ff00ff" : "#00ff00";
    const bgStyle = isGlitch 
        ? "background: repeating-linear-gradient(45deg, #000, #000 10px, #1a001a 10px, #1a001a 20px);" 
        : "background: #000; border: 1px solid #00ff00;";

    // Lógica Específica: Debug (Arquiteto)
    if ("APM Overflow" === "Debug") {
        const target = game.user.targets.first();
        if (target) {
            const weaknesses = target.actor.system.traits?.dr?.value || "Nenhuma"; // Exemplo
            ui.notifications.info(`���️ DEBUGGING ${target.name}... Fraquezas detectadas.`);
            ChatMessage.create({ content: `��� <strong>Análise de Código:</strong> Alvo tem vulnerabilidade em: ${weaknesses}` });
        }
    }

    // Lógica Específica: Metavisão (Egoísta)
    if ("APM Overflow" === "Metavisão de Combate") {
        // Verificar aliados próximos (Exemplo simples)
        const allies = canvas.tokens.placeables.filter(t => t.actor.type === "character" && t.id !== actor.token?.id);
        const tooClose = allies.some(t => canvas.grid.measureDistance(actor.token, t) < 6); // 6m
        
        if (tooClose) {
            ui.notifications.warn("⚠️ Aliados muito próximos! O Egoísmo não pode ser ativado.");
            return;
        }
        ui.notifications.info("��� METAVISÃO ATIVADA. CRÍTICO GARANTIDO.");
    }

    // Chat Card
    ChatMessage.create({
        speaker: ChatMessage.getSpeaker({actor}),
        content: `
            <div style="${bgStyle} padding: 10px; color: #fff; font-family: 'Courier New', monospace;">
                <h3 style="color: ${borderColor}; text-transform: uppercase; border-bottom: 1px dashed ${borderColor};">APM Overflow</h3>
                <div style="font-size: 0.8em; color: #888;">&lt;SYSTEM_OVERRIDE: Deus do Trovão&gt;</div>
                <p style="margin-top: 10px;">300+ Ações por minuto. Dobra velocidade, depois paralisa.</p>
                <div style="background: rgba(0,255,0,0.1); border: 1px solid ${borderColor}; padding: 5px; text-align: center; margin-top: 10px;">
                    <strong>STATUS:</strong> <span style="color: ${borderColor};">Double Speed</span>
                </div>
            </div>
        `
    });

    // VFX
    let vfxFile = "modules/omini-system-assets/assets/vfx/digital_glitch.webm";
    if ("Deus do Trovão".includes("Baskerville")) vfxFile = "modules/omini-system-assets/assets/vfx/blood_slash.webm";
    
    new Sequence()
        .effect()
            .file(vfxFile)
            .atLocation(actor)
            .scale(1.0)
        .play();
})();
