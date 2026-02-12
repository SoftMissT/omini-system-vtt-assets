/* ═══════════════════════════════════════════════════════════════
 * SPECTER SKILL: Shadow Sewing
 * User: Violate (terrestrial)
 * ═══════════════════════════════════════════════════════════════ */
(async () => {
    if (!OmniCore.validateModules(["dice-so-nice", "sequencer"])) return;
    const actor = await OmniCore.actor.resolve();
    
    // Chat Card Underworld
    ChatMessage.create({
        speaker: ChatMessage.getSpeaker({actor}),
        content: `
            <div style="background: linear-gradient(to bottom, #0a001a, #000); border: 2px solid dark blue; padding: 15px; color: #d8b4fe;">
                <h2 style="color: dark blue; text-align: center; font-family: 'Orbitron'; text-shadow: 0 0 5px #a855f7;">Shadow Sewing</h2>
                <div style="text-align: center; margin-bottom: 10px; font-size: 0.8em; color: #888;">Violate - Estrela Maligna</div>
                <p style="border-top: 1px solid #333; padding-top: 10px; font-style: italic;">Costura a sombra no chão.</p>
                <div style="background: #1a0526; padding: 5px; text-align: center; margin-top: 10px; border: 1px solid #333;">
                    <strong>EFEITO:</strong> <span style="color: #c084fc;">Bind</span>
                </div>
            </div>
        `
    });

    // Roll
    const dmg = "Bind";
    if (dmg && dmg.includes("d")) {
        await OmniCore.dice.roll(dmg);
    }

    // VFX
    new Sequence()
        .effect()
            .file("modules/omini-system-assets/assets/vfx/purple_energy_burst.webm")
            .atLocation(actor)
            .scale(1.2)
            .tint("#a855f7")
        .play();
})();
