/* ═══════════════════════════════════════════════════════════════
 * MARINA SKILL: Golden Triangle
 * User: Kanon
 * ═══════════════════════════════════════════════════════════════ */
(async () => {
    if (!OmniCore.validateModules(["dice-so-nice", "sequencer"])) return;
    const actor = await OmniCore.actor.resolve();
    
    // Lógica especial para Scylla (Seleção de Besta)
    if ("Kanon" === "Io" && "Golden Triangle" === "The Six Beasts") {
        new Dialog({
            title: "��� Selecione a Besta",
            content: "<p>Qual besta de Scylla atacar?</p>",
            buttons: {
                eagle: { label: "��� Águia", callback: () => executeAttack("4d8", "Eagle Clutch", "Ignora 50% Def") },
                wolf: { label: "��� Lobo", callback: () => executeAttack("3d8", "Wolf Fang", "Sangramento") },
                bee: { label: "��� Abelha", callback: () => executeAttack("2d8", "Queen Bee", "Veneno") },
                serpent: { label: "��� Serpente", callback: () => executeAttack("3d8", "Serpent Strangler", "Agarrar") },
                bat: { label: "��� Morcego", callback: () => executeAttack("3d6", "Vampire Inhale", "Drena Vida") },
                bear: { label: "��� Urso", callback: () => executeAttack("5d10", "Grizzly Slap", "Empurrão") }
            }
        }).render(true);
        return;
    }

    async function executeAttack(dmg, name, effect) {
        await OmniCore.dice.roll(dmg);
        ChatMessage.create({
             content: `��� <strong>Scylia - ${name}:</strong> ${effect}`
        });
    }

    // Chat Card Atlantis
    ChatMessage.create({
        speaker: ChatMessage.getSpeaker({actor}),
        content: `
            <div style="background: linear-gradient(to bottom, #001a33, #003366); border: 2px solid orange; padding: 15px; color: #b3d9ff;">
                <h2 style="color: orange; text-align: center; font-family: 'Orbitron'; text-shadow: 0 0 5px #00ccff;">Golden Triangle</h2>
                <div style="text-align: center; margin-bottom: 10px; font-size: 0.8em; color: #66a3ff;">Kanon - Marina General</div>
                <p style="border-top: 1px solid #004d99; padding-top: 10px; font-style: italic;">Triângulo de Ouro. Banimento dimensional.</p>
                <div style="background: #00264d; padding: 5px; text-align: center; margin-top: 10px; border: 1px solid #004d99;">
                    <strong>DANO/EFEITO:</strong> <span style="color: #33ccff;">Banish + 5d10</span>
                </div>
            </div>
        `
    });

    // Roll Padrão
    const dmg = "Banish + 5d10";
    if (dmg && dmg.includes("d") && "Golden Triangle" !== "The Six Beasts") {
        await OmniCore.dice.roll(dmg);
    }

    // VFX
    const isWater = true; 
    const vfxFile = isWater ? "modules/omini-system-assets/assets/vfx/water_splash.webm" : "modules/omini-system-assets/assets/vfx/generic_hit.webm";
    
    new Sequence()
        .effect()
            .file(vfxFile)
            .atLocation(actor)
            .scale(1.5)
            .tint("#00ccff")
        .play();
})();
