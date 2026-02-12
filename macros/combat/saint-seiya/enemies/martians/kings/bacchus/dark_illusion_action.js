/* ═══════════════════════════════════════════════════════════════
 * VILLAIN SKILL: Dark Illusion
 * User: Bacchus
 * ═══════════════════════════════════════════════════════════════ */
(async () => {
    if (!OmniCore.validateModules(["dice-so-nice", "sequencer"])) return;
    const actor = await OmniCore.actor.resolve();
    
    // Chat Card Omega
    ChatMessage.create({
        speaker: ChatMessage.getSpeaker({actor}),
        content: `
            <div style="background: #000; border: 2px solid red; padding: 15px; color: #fff; font-family: 'Rajdhani';">
                <h2 style="color: red; text-align: center; font-family: 'Orbitron'; letter-spacing: 2px;">Dark Illusion</h2>
                <div style="text-align: center; margin-bottom: 10px; font-size: 0.9em; opacity: 0.8;">Bacchus</div>
                <p style="border-top: 1px solid #333; padding-top: 10px;">Ilusão de água negra.</p>
                <div style="background: #222; padding: 5px; text-align: center; margin-top: 10px; border-radius: 4px;">
                    <strong>DANO:</strong> <span style="color: #ff2b4a;">Confuse</span>
                </div>
            </div>
        `
    });

    // Roll
    const dmg = "Confuse";
    if (dmg && dmg.includes("d")) {
        await OmniCore.dice.roll(dmg);
    }

    // VFX
    const isTime = "Ilusão de água negra.".toLowerCase().includes("tempo") || "Ilusão de água negra.".toLowerCase().includes("time");
    const vfxFile = isTime ? "modules/omini-system-assets/assets/vfx/time_stop.webm" : "modules/omini-system-assets/assets/vfx/dark_blast.webm";
    
    new Sequence()
        .effect()
            .file(vfxFile)
            .atLocation(actor)
            .scale(1.5)
        .play();
})();
