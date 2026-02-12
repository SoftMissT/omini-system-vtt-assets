/* ═══════════════════════════════════════════════════════════════
 * SKILL: Kholodny Smerch
 * Signo: aquarius
 * Type: Action | Custo: 12 IC
 * ═══════════════════════════════════════════════════════════════ */
(async () => {
    if (!OmniCore.validateModules(["dice-so-nice", "sequencer"])) return;
    const actor = await OmniCore.actor.resolve();
    if (!actor) return;

    // Verificar IC
    const currentIC = actor.system.props.ic?.value || 0;
    const cost = 12;
    
    if (currentIC < cost && !game.user.isGM) {
        return ui.notifications.warn(`⚠️ Cosmo insuficiente! Necessário: ${cost} IC`);
    }

    // Configuração de Alvo (se ofensivo)
    const isOffensive = "Action".toLowerCase().includes("action");
    let targets = Array.from(game.user.targets);
    
    if (isOffensive && targets.length === 0) {
        ui.notifications.warn("⚠️ Selecione um alvo para esta técnica.");
        // Não retorna, permite disparo "no ar" para efeito visual
    }

    // Roll de Dano (se houver fórmula)
    const damageFormula = "6d8";
    let rollHtml = "";
    
    if (damageFormula && damageFormula !== "0" && damageFormula !== "-") {
        const roll = await OmniCore.dice.roll(damageFormula, { atk: actor.system.attributes.atk?.value || 0 });
        rollHtml = `<div class="dice-roll"><div class="dice-result">${roll.total}</div></div>`;
        
        // Aplicar dano (Automação básica)
        if (targets.length > 0) {
            for (let t of targets) {
                // Aqui entraria lógica de redução de HP se desejado
            }
        }
    }

    // Chat Card
    ChatMessage.create({
        speaker: ChatMessage.getSpeaker({actor}),
        content: `
            <div style="background: linear-gradient(to bottom, #1a1a1a, #000); border: 2px solid var(--omni-gold); padding: 10px; color: white;">
                <h3 style="color: var(--omni-gold); border-bottom: 1px solid #555;">Kholodny Smerch</h3>
                <p><em>Tornado de gelo uppercut.</em></p>
                ${rollHtml}
                <div style="margin-top: 5px; font-size: 0.8em; color: #aaa;">Consumo: 12 IC</div>
            </div>
        `
    });

    // VFX Genérico (Placeholder)
    // Para VFX específico, edite este arquivo manualmente depois.
    new Sequence()
        .effect()
            .file("modules/omini-system-assets/assets/vfx/generic_cosmo_burst.webm")
            .atLocation(actor)
        .play();
})();
