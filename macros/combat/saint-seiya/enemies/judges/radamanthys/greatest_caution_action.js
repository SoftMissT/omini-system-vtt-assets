/* ═══════════════════════════════════════════════════════════════
 * SPECTER SKILL: Greatest Caution
 * User: Radamanthys (judges)
 * ═══════════════════════════════════════════════════════════════ */
(async () => {
    if (!OmniCore.validateModules(["dice-so-nice", "sequencer"])) return;
    const actor = await OmniCore.actor.resolve();
    
    // Chat Card Underworld
    ChatMessage.create({
        speaker: ChatMessage.getSpeaker({actor}),
        content: `
            <div style="background: linear-gradient(to bottom, #0a001a, #000); border: 2px solid deep purple; padding: 15px; color: #d8b4fe;">
                <h2 style="color: deep purple; text-align: center; font-family: 'Orbitron'; text-shadow: 0 0 5px #a855f7;">Greatest Caution</h2>
                <div style="text-align: center; margin-bottom: 10px; font-size: 0.8em; color: #888;">Radamanthys - Estrela Maligna</div>
                <p style="border-top: 1px solid #333; padding-top: 10px; font-style: italic;">Ondas de choque de Wyvern. Quebra escudos.</p>
                <div style="background: #1a0526; padding: 5px; text-align: center; margin-top: 10px; border: 1px solid #333;">
                    <strong>EFEITO:</strong> <span style="color: #c084fc;">10d10 Impact</span>
                </div>
            </div>
        `
    });

    // Roll
    const dmg = "10d10 Impact";
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
