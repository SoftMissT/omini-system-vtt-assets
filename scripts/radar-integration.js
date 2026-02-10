/**
 * ═══════════════════════════════════════════════════════════════════════
 * 🔗 RADAR INTEGRATION — OMNI-SYSTEM Hooks & Socket Listeners
 * ═══════════════════════════════════════════════════════════════════════
 */

Hooks.once('ready', () => {
    console.log("[OMNI-SYSTEM] Inicializando Radar System...");

    // Socket listener (ALL users)
    game.socket.on('module.omini-system-vtt', ({ action, payload }) => {
        if (action === 'radar.signal') {
            handleRadarSignal(payload);
        } else if (action === 'radar.expire' || action === 'radar.cancel') {
            handleRadarExpire(payload);
        }
    });

    // Auto-spawn de monstros (GM only)
    if (game.user.isGM) {
        Hooks.on('omniCore.gm.monsterSpawned', async ({ tokenId, monsterId, position }) => {
            const monster = game.actors.get(monsterId);
            if (!monster) return;

            await RadarCore.placeSignal({
                type: 'monster',
                position,
                targetId: 'all',
                message: `⚠️ ${monster.name} apareceu!`,
                customDuration: 30000
            });
        });

        // Auto-sinal de quest aceita
        Hooks.on('omniCore.quest.accepted', async ({ actorId, questData }) => {
            if (!questData.mapPosition) return;

            await RadarCore.placeSignal({
                type: 'quest',
                position: questData.mapPosition,
                targetId: actorId,
                message: `📜 ${questData.name}`,
                customDuration: null
            });
        });

        // Alerta de HP crítico
        Hooks.on('omniCore.combat.damage', async ({ targetId, amount }) => {
            const actor = game.actors.get(targetId);
            if (!actor?.hasPlayerOwner) return;

            const hpPct = (actor.system.hp?.value / actor.system.hp?.max) * 100;
            if (hpPct <= 20 && hpPct > 0) {
                const token = actor.getActiveTokens()[0];
                if (!token) return;

                await RadarCore.placeSignal({
                    type: 'danger',
                    position: { x: token.x, y: token.y },
                    targetId: 'gm',
                    message: `🩸 ${actor.name} em estado crítico!`,
                    customDuration: 15000
                });
            }
        });
    }

    console.log("[OMNI-SYSTEM] Radar System online.");
});

// ═══════════════════════════════════════════════════════════════════════
// Handler Functions
// ═══════════════════════════════════════════════════════════════════════

function handleRadarSignal(payload) {
    const actor = game.user.character;
    if (!actor) return;

    // Check if signal is for this user
    if (payload.targetId !== 'all' && payload.targetId !== actor.id) return;

    // Update player radar HUD if open
    const radarHUD = Object.values(ui.windows).find(w => w instanceof RadarPlayerHUD && w.actor.id === actor.id);
    if (radarHUD) {
        radarHUD.handleRadarSignal(payload);
    }

    // Audio notification
    AudioHelper.play({ src: "sounds/notify.wav", volume: 0.5, autoplay: true, loop: false }, false);

    console.log("[RADAR] Sinal recebido:", payload);
}

function handleRadarExpire(payload) {
    const actor = game.user.character;
    if (!actor) return;

    const radarHUD = Object.values(ui.windows).find(w => w instanceof RadarPlayerHUD && w.actor.id === actor.id);
    if (radarHUD) {
        radarHUD.handleRadarExpire(payload);
    }
}
