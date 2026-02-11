(async () => {
    const actor = await OmniCore.actor.resolve();
    if (!actor) return;

    // Configura√ß√µes da Forma
    const levels = {
        1: { dano: "1d6", custo: 1 },
        2: { dano: "1d8", custo: 2 },
        3: { dano: "1d10", custo: 4 },
        4: { dano: "2d6", custo: 6 }
    };

    // Interface de Ativa√ß√£o (ApplicationV2 Style)
    const content = `
        <div style="background: #0a0a0f; color: #fff; padding: 10px; border: 2px solid #048ABF; border-radius: 8px; font-family: 'Rajdhani', sans-serif;">
            <h2 style="color: #048ABF; font-family: 'Orbitron'; text-align: center; margin-top: 0;">ICHI NO KATA: MINAMO GIRI</h2>
            <p style="font-size: 0.9em; border-bottom: 1px solid #333; padding-bottom: 5px;">Escolha o n√≠vel de intensidade e o Estado do Fluxo:</p>
            
            <div style="margin-bottom: 10px;">
                <label>N√≠vel da Forma:</label>
                <select id="skill-level" style="width: 100%; background: #1a1a24; color: #fff; border: 1px solid #048ABF;">
                    <option value="1">N√≠vel 1 (1 PC - 1d6)</option>
                    <option value="2">N√≠vel 2 (2 PC - 1d8)</option>
                    <option value="3">N√≠vel 3 (4 PC - 1d10)</option>
                    <option value="4">N√≠vel 4 (6 PC - 2d6)</option>
                </select>
            </div>

            <div style="margin-bottom: 10px;">
                <label>Estado do Fluxo (Passiva):</label>
                <select id="flow-state" style="width: 100%; background: #1a1a24; color: #fff; border: 1px solid #048ABF;">
                    <option value="none">Nenhum</option>
                    <option value="cascata">Cascata (Peso: Derrubar)</option>
                    <option value="correnteza">Correnteza (Extens√£o: +3m)</option>
                    <option value="vortice">V√≥rtice (Dispers√£o: √Årea)</option>
                </select>
            </div>

            <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 10px;">
                <input type="checkbox" id="bonus-move" />
                <label for="bonus-move">Avan√ßo de 3m+ (+2 Acerto)</label>
            </div>
        </div>
    `;

    new Dialog({
        title: "Ìºä Respira√ß√£o da √Ågua: 1¬™ Forma",
        content: content,
        buttons: {
            execute: {
                label: "Ìºä CORTAR",
                callback: async (html) => {
                    const lvl = html.find('#skill-level').val();
                    const state = html.find('#flow-state').val();
                    const hasBonus = html.find('#bonus-move').is(':checked');
                    const config = levels[lvl];

                    // Valida√ß√£o de PC (Exemplo de atributo: system.attributes.pc.value)
                    const currentPC = actor.system.attributes?.pc?.value || 0;
                    if (currentPC < config.custo) {
                        ui.notifications.error("‚ùå Pontos de Concentra√ß√£o insuficientes!");
                        return;
                    }

                    // Redu√ß√£o de PC
                    await actor.update({"system.attributes.pc.value": currentPC - config.custo});

                    // L√≥gica de Ataque
                    let attackMod = hasBonus ? 2 : 0;
                    const attackRoll = await new Roll(`1d20 + @atk + ${attackMod}`, {
                        atk: actor.system.attributes.atk.value
                    }).evaluate({async: true});
                    
                    await game.dice3d?.showForRoll(attackRoll);

                    // L√≥gica de Dano e Estados
                    let damageFormula = config.dano;
                    let effectText = "";
                    
                    if (state === "vortice") {
                        damageFormula = `(${damageFormula}) / 2`;
                        effectText = "Ìºä <strong>V√≥rtice:</strong> Atinge todos adjacentes (1,5m).";
                    } else if (state === "cascata") {
                        effectText = "Ìºä <strong>Cascata:</strong> Alvo faz T.R. F√≠sica ou cai/empurrado.";
                    } else if (state === "correnteza") {
                        effectText = "Ìºä <strong>Correnteza:</strong> Alcance aumentado em +3m.";
                    }

                    const damageRoll = await new Roll(`${damageFormula} + @str`, {
                        str: actor.system.attributes.str.value
                    }).evaluate({async: true});

                    // VFX
                    if (typeof Sequencer !== 'undefined') {
                        new Sequencer.Sequence()
                            .effect()
                                .file("modules/sequencer/assets/water_slash.webp")
                                .atToken(canvas.tokens.controlled[0])
                                .stretchTo(game.user.targets.first() || canvas.tokens.controlled[0])
                            .play();
                    }

                    // Chat Card
                    ChatMessage.create({
                        speaker: ChatMessage.getSpeaker({actor}),
                        content: `
                            <div style="background: linear-gradient(135deg, #0a0a0f 0%, #048ABF 100%); border: 2px solid #048ABF; border-radius: 8px; padding: 10px; color: #fff;">
                                <h3 style="margin: 0; color: #fff; font-family: 'Orbitron';">MINAMO GIRI (N√≠vel ${lvl})</h3>
                                <p style="font-size: 0.8em; margin: 2px 0;"><em>Estado: ${state.toUpperCase()}</em></p>
                                <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.2);">
                                <p><strong>Ataque:</strong> ${attackRoll.total} ${hasBonus ? '(+2 Avan√ßo)' : ''}</p>
                                <p><strong>Dano:</strong> ${damageRoll.total} [√Ågua]</p>
                                <p style="font-size: 0.9em; color: #00D9FF;">${effectText}</p>
                                <p style="text-align: right; font-size: 0.7em; opacity: 0.7;">Ì≤æ PC Gasto: ${config.custo}</p>
                            </div>
                        `
                    });
                }
            }
        },
        default: "execute"
    }).render(true);
})();
