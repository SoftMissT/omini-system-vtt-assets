/* ═══════════════════════════════════════════════════════════════
 * REALITY SKILL: Violation
 * Universe: bdo
 * Source: Sorceress
 * ═══════════════════════════════════════════════════════════════ */
(async () => {
    if (!OmniCore.validateModules(["dice-so-nice", "sequencer"])) return;
    const actor = await OmniCore.actor.resolve();
    
    // Configuração Visual por Universo
    let bgStyle = "background: #000;";
    let titleColor = "#fff";
    
    if ("bdo" === "orv") { 
        bgStyle = "background: url('modules/omini-system-assets/assets/bg/star_stream.webp') repeat, #000;";
        titleColor = "#00D9FF"; 
    }
    if ("bdo" === "tbate") {
        bgStyle = "background: linear-gradient(135deg, #1a0b2e 0%, #4a148c 100%);";
        titleColor = "#d6bcfa";
    }
    if ("bdo" === "bdo") {
        bgStyle = "background: linear-gradient(to bottom, #2b1b17, #000); border: 2px solid #ff8000;";
        titleColor = "#ffb300";
    }

    // Chat Card
    ChatMessage.create({
        speaker: ChatMessage.getSpeaker({actor}),
        content: `
            <div style="${bgStyle} padding: 15px; border-radius: 8px; border: 1px solid ${titleColor}; color: #fff;">
                <h3 style="color: ${titleColor}; text-align: center; font-family: 'Orbitron'; text-transform: uppercase;">Violation</h3>
                <div style="text-align: center; font-size: 0.8em; margin-bottom: 8px; opacity: 0.8;">Sorceress</div>
                <p style="font-style: italic; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 8px;">Redemoinho de foice sombria.</p>
                <div style="background: rgba(0,0,0,0.5); padding: 5px; text-align: center; margin-top: 10px; border-radius: 4px;">
                    <strong>EFEITO:</strong> <span style="color: ${titleColor}; font-weight: bold;">Shadow Dmg</span>
                </div>
            </div>
        `
    });

    // Roll (se houver dano numérico)
    const dmg = "Shadow Dmg";
    if (dmg && dmg.includes("d") && !dmg.includes("%")) {
        await OmniCore.dice.roll(dmg);
    }

    // VFX Específico
    let vfxFile = "modules/omini-system-assets/assets/vfx/generic_burst.webm";
    if ("Violation".includes("Hellfire")) vfxFile = "modules/omini-system-assets/assets/vfx/black_fire.webm";
    if ("Violation".includes("Destruction")) vfxFile = "modules/omini-system-assets/assets/vfx/purple_aether_burn.webm";
    if ("Violation".includes("Dragon Raises")) vfxFile = "modules/omini-system-assets/assets/vfx/dragon_rise.webm";
    
    new Sequence()
        .effect()
            .file(vfxFile)
            .atLocation(actor)
            .scale(1.5)
        .play();
})();
