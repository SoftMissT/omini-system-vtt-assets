/* ═══════════════════════════════════════════════════════════════
 * MARINA SKILL: The Six Beasts
 * User: Io
 * ═══════════════════════════════════════════════════════════════ */
(async () => {
    if (!OmniCore.validateModules(["dice-so-nice", "sequencer"])) return;
    const actor = await OmniCore.actor.resolve();
    
    // Lógica especial para Scylla (Seleção de Besta)
    if ("Io" === "Io" && "The Six Beasts" === "The Six Beasts") {
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
                <h2 style="color: orange; text-align: center; font-family: 'Orbitron'; text-shadow: 0 0 5px #00ccff;">The Six Beasts</h2>
                <div style="text-align: center; margin-bottom: 10px; font-size: 0.8em; color: #66a3ff;">Io - Marina General</div>
                <p style="border-top: 1px solid #004d99; padding-top: 10px; font-style: italic;">As Seis Bestas de Scylla.</p>
                <div style="background: #00264d; padding: 5px; text-align: center; margin-top: 10px; border: 1px solid #004d99;">
                    <strong>DANO/EFEITO:</strong> <span style="color: #33ccff;">Select Beast</span>
                </div>
            </div>
        `
    });

    // Roll Padrão
    const dmg = "Select Beast";
    if (dmg && dmg.includes("d") && "The Six Beasts" !== "The Six Beasts") {
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
