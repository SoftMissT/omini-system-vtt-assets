/* ═══════════════════════════════════════════════════════════════
 * ENEMY SKILL: Ebony Vortex
 * Entity: Hyperion (titans)
 * ═══════════════════════════════════════════════════════════════ */
(async () => {
    if (!OmniCore.validateModules(["dice-so-nice", "sequencer"])) return;
    const actor = await OmniCore.actor.resolve();
    if (!actor) return;

    // Chat Card Dramático (Estilo Vilão)
    ChatMessage.create({
        speaker: ChatMessage.getSpeaker({actor}),
        content: `
            <div style="background: #050508; border: 2px solid var(--omni-red); padding: 15px; color: #fff;">
                <h2 style="color: var(--omni-red); font-family: 'Orbitron'; text-align: center; margin-bottom: 5px;">Ebony Vortex</h2>
                <div style="text-align: center; font-size: 0.8em; color: #666; margin-bottom: 10px;">Hyperion - titans</div>
                <p style="font-style: italic; color: #ccc;">Vórtice de vento negro e asfixia.</p>
                <div style="border-top: 1px solid #333; margin-top: 10px; padding-top: 5px;">
                    <strong>Dano/Efeito:</strong> <span style="color: #ff2b4a;">15d10</span>
                </div>
            </div>
        `
    });

    // Roll de Dano Real (se aplicável)
    const damageFormula = "15d10";
    if (damageFormula && damageFormula.includes("d")) {
        await OmniCore.dice.roll(damageFormula, { atk: actor.system.attributes.atk?.value || 0 });
    }

    // VFX Sombrio Genérico
    new Sequence()
        .effect()
            .file("modules/omini-system-assets/assets/vfx/dark_energy_burst.webm")
            .atLocation(actor)
            .scale(1.5)
        .play();
})();
