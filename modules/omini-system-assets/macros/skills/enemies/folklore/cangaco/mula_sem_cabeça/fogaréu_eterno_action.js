/* ═══════════════════════════════════════════════════════════════
 * FOLKLORE SKILL: Fogaréu Eterno
 * User: Mula Sem Cabeça
 * ═══════════════════════════════════════════════════════════════ */
(async () => {
    if (!OmniCore.validateModules(["dice-so-nice", "sequencer"])) return;
    const actor = await OmniCore.actor.resolve();
    
    // Chat Card Sertão
    ChatMessage.create({
        speaker: ChatMessage.getSpeaker({actor}),
        content: `
            <div style="background: url('modules/omini-system-assets/assets/bg/leather_texture.webp') repeat, #3e2723; border: 2px solid orange; padding: 15px; color: #fff8e1; font-family: 'Courier New', monospace;">
                <h2 style="color: orange; text-align: center; text-transform: uppercase; border-bottom: 2px dashed #8d6e63;">Fogaréu Eterno</h2>
                <div style="text-align: center; margin-bottom: 10px; font-size: 0.8em; color: #d7ccc8;">Mula Sem Cabeça</div>
                <p style="padding-top: 10px; font-style: italic;">Jato de plasma do pescoço. Dano espiritual.</p>
                <div style="background: #5d4037; padding: 5px; text-align: center; margin-top: 10px; border-radius: 4px;">
                    <strong>EFEITO:</strong> <span style="color: #ffcc80;">10d8 Fire</span>
                </div>
            </div>
        `
    });

    // Lógica Específica (Lampião Multi-Hit)
    if ("Fogaréu Eterno" === "Estrela de Sete Pontas") {
        ui.notifications.info("��� Disparando 7 punhais solares! Se 3 acertarem: Quebra de Armadura.");
    }

    // Roll
    const dmg = "10d8 Fire";
    if (dmg && dmg.includes("d")) {
        await OmniCore.dice.roll(dmg);
    }

    // VFX
    const isFire = "Jato de plasma do pescoço. Dano espiritual.".toLowerCase().includes("fogo") || "Jato de plasma do pescoço. Dano espiritual.".toLowerCase().includes("solar");
    const vfxFile = isFire ? "modules/omini-system-assets/assets/vfx/fire_blast.webm" : "modules/omini-system-assets/assets/vfx/nature_vines.webm";
    
    new Sequence()
        .effect()
            .file(vfxFile)
            .atLocation(actor)
            .scale(1.2)
            .tint("orange")
        .play();
})();
