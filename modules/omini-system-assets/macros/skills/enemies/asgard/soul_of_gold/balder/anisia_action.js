/* ═══════════════════════════════════════════════════════════════
 * ASGARD SKILL: Anisia
 * User: Balder
 * ═══════════════════════════════════════════════════════════════ */
(async () => {
    if (!OmniCore.validateModules(["dice-so-nice", "sequencer"])) return;
    const actor = await OmniCore.actor.resolve();
    
    // Chat Card Valhalla
    ChatMessage.create({
        speaker: ChatMessage.getSpeaker({actor}),
        content: `
            <div style="background: linear-gradient(to bottom, #001a1a, #003333); border: 2px solid gold; padding: 15px; color: #ccffff;">
                <h2 style="color: gold; text-align: center; font-family: 'Orbitron'; text-shadow: 0 0 5px #00ffff;">Anisia</h2>
                <div style="text-align: center; margin-bottom: 10px; font-size: 0.8em; color: #66cccc;">Balder - Guerreiro Deus</div>
                <p style="border-top: 1px solid #004d4d; padding-top: 10px; font-style: italic;">Imunidade divina. Corpo incorruptível.</p>
                <div style="background: #002b2b; padding: 5px; text-align: center; margin-top: 10px; border: 1px solid #004d4d;">
                    <strong>EFEITO:</strong> <span style="color: #33ffff;">Immunity</span>
                </div>
            </div>
        `
    });

    // Lógica Específica (Amethyst Shield)
    if ("Anisia" === "Amethyst Shield") {
        ui.notifications.info("��� Alvo preso no Cristal Ametista! HP do Cristal: 60");
    }

    // Roll
    const dmg = "Immunity";
    if (dmg && dmg.includes("d")) {
        await OmniCore.dice.roll(dmg);
    }

    // VFX
    const vfxFile = "modules/omini-system-assets/assets/vfx/ice_shard.webm";
    
    new Sequence()
        .effect()
            .file(vfxFile)
            .atLocation(actor)
            .scale(1.3)
            .tint("#00ffff")
        .play();
})();
