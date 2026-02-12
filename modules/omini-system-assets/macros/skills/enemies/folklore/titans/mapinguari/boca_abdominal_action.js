/* ═══════════════════════════════════════════════════════════════
 * FOLKLORE SKILL: Boca Abdominal
 * User: Mapinguari
 * ═══════════════════════════════════════════════════════════════ */
(async () => {
    if (!OmniCore.validateModules(["dice-so-nice", "sequencer"])) return;
    const actor = await OmniCore.actor.resolve();
    
    // Chat Card Sertão
    ChatMessage.create({
        speaker: ChatMessage.getSpeaker({actor}),
        content: `
            <div style="background: url('modules/omini-system-assets/assets/bg/leather_texture.webp') repeat, #3e2723; border: 2px solid red; padding: 15px; color: #fff8e1; font-family: 'Courier New', monospace;">
                <h2 style="color: red; text-align: center; text-transform: uppercase; border-bottom: 2px dashed #8d6e63;">Boca Abdominal</h2>
                <div style="text-align: center; margin-bottom: 10px; font-size: 0.8em; color: #d7ccc8;">Mapinguari</div>
                <p style="padding-top: 10px; font-style: italic;">Boca na barriga morde arma. Cura.</p>
                <div style="background: #5d4037; padding: 5px; text-align: center; margin-top: 10px; border-radius: 4px;">
                    <strong>EFEITO:</strong> <span style="color: #ffcc80;">6d10 Drain</span>
                </div>
            </div>
        `
    });

    // Lógica Específica (Lampião Multi-Hit)
    if ("Boca Abdominal" === "Estrela de Sete Pontas") {
        ui.notifications.info("��� Disparando 7 punhais solares! Se 3 acertarem: Quebra de Armadura.");
    }

    // Roll
    const dmg = "6d10 Drain";
    if (dmg && dmg.includes("d")) {
        await OmniCore.dice.roll(dmg);
    }

    // VFX
    const isFire = "Boca na barriga morde arma. Cura.".toLowerCase().includes("fogo") || "Boca na barriga morde arma. Cura.".toLowerCase().includes("solar");
    const vfxFile = isFire ? "modules/omini-system-assets/assets/vfx/fire_blast.webm" : "modules/omini-system-assets/assets/vfx/nature_vines.webm";
    
    new Sequence()
        .effect()
            .file(vfxFile)
            .atLocation(actor)
            .scale(1.2)
            .tint("red")
        .play();
})();
