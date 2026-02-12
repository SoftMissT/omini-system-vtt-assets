/* ═══════════════════════════════════════════════════════════════
 * CLASS FEATURE: Debug
 * Class: Arquiteto do Vazio
 * Type: Active
 * ═══════════════════════════════════════════════════════════════ */
(async () => {
    if (!OmniCore.validateModules(["dice-so-nice", "sequencer"])) return;
    const actor = await OmniCore.actor.resolve();
    
    // Estilo Visual "Glitch" ou "System"
    const isGlitch = "glitch" === "glitch";
    const borderColor = isGlitch ? "#ff00ff" : "#00ff00";
    const bgStyle = isGlitch 
        ? "background: repeating-linear-gradient(45deg, #000, #000 10px, #1a001a 10px, #1a001a 20px);" 
        : "background: #000; border: 1px solid #00ff00;";

    // Lógica Específica: Debug (Arquiteto)
    if ("Debug" === "Debug") {
        const target = game.user.targets.first();
        if (target) {
            const weaknesses = target.actor.system.traits?.dr?.value || "Nenhuma"; // Exemplo
            ui.notifications.info(`���️ DEBUGGING ${target.name}... Fraquezas detectadas.`);
            ChatMessage.create({ content: `��� <strong>Análise de Código:</strong> Alvo tem vulnerabilidade em: ${weaknesses}` });
        }
    }

    // Lógica Específica: Metavisão (Egoísta)
    if ("Debug" === "Metavisão de Combate") {
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
                <h3 style="color: ${borderColor}; text-transform: uppercase; border-bottom: 1px dashed ${borderColor};">Debug</h3>
                <div style="font-size: 0.8em; color: #888;">&lt;SYSTEM_OVERRIDE: Arquiteto do Vazio&gt;</div>
                <p style="margin-top: 10px;">Analisa o código do inimigo. Revela resistências e reduz eficácia.</p>
                <div style="background: rgba(0,255,0,0.1); border: 1px solid ${borderColor}; padding: 5px; text-align: center; margin-top: 10px;">
                    <strong>STATUS:</strong> <span style="color: ${borderColor};">Reveal Weakness</span>
                </div>
            </div>
        `
    });

    // VFX
    let vfxFile = "modules/omini-system-assets/assets/vfx/digital_glitch.webm";
    if ("Arquiteto do Vazio".includes("Baskerville")) vfxFile = "modules/omini-system-assets/assets/vfx/blood_slash.webm";
    
    new Sequence()
        .effect()
            .file(vfxFile)
            .atLocation(actor)
            .scale(1.0)
        .play();
})();
