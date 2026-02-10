/**
 * ═══════════════════════════════════════════════════════════════════════
 * 🎯 RADAR CORE — Refactored with Enhanced Features
 * ═══════════════════════════════════════════════════════════════════════
 */

export class RadarCore {
    static FLAG_SCOPE = "world";
    
    static EVENT_TYPES = {
        monster: {
            label: "Monstro / Hostil",
            color: "#F44336",
            icon: "⚔️",
            duration: 30000,
            durationText: "30s",
            desc: "Marca uma presença hostil no radar"
        },
        quest: {
            label: "Missão / NPC",
            color: "#2196F3",
            icon: "📜",
            duration: null,
            durationText: "∞",
            desc: "Ponto de interesse para quest"
        },
        loot: {
            label: "Loot / Tesouro",
            color: "#FFD700",
            icon: "💰",
            duration: 60000,
            durationText: "60s",
            desc: "Sinaliza localização de tesouro"
        },
        animal: {
            label: "Animal / Neutro",
            color: "#4CAF50",
            icon: "🐾",
            duration: 45000,
            durationText: "45s",
            desc: "Criatura não-hostil"
        },
        danger: {
            label: "Perigo / Armadilha",
            color: "#FF9800",
            icon: "⚠️",
            duration: 20000,
            durationText: "20s",
            desc: "Aviso de perigo ambiental"
        },
        special: {
            label: "Intenção Assassina",
            color: "#9C27B0",
            icon: "✨",
            duration: 120000,
            durationText: "120s",
            desc: "Evento sobrenatural ou intenção de matar"
        }
    };

    static async placeSignal({ type, position, targetId = 'all', message = '', customDuration = null }) {
        if (!game.user.isGM) {
            ui.notifications.error("[RADAR] Apenas GM pode criar sinais.");
            return null;
        }

        const config = this.EVENT_TYPES[type];
        if (!config) {
            console.error(`[RADAR] Tipo de evento inválido: ${type}`);
            return null;
        }

        const signalId = `radar_${Date.now()}_${foundry.utils.randomID()}`;
        const duration = customDuration !== undefined && customDuration !== '' 
            ? (customDuration === 'null' ? null : parseInt(customDuration))
            : config.duration;

        const payload = {
            id: signalId,
            type,
            position: { x: position.x, y: position.y },
            targetId,
            message: message || config.label,
            color: config.color,
            icon: config.icon,
            label: config.label,
            duration,
            timestamp: Date.now(),
            expiresAt: duration ? Date.now() + duration : null,
            active: true
        };

        // Persistir flags
        const targets = targetId === 'all' 
            ? game.users.filter(u => !u.isGM && u.character).map(u => u.character)
            : [game.actors.get(targetId)].filter(Boolean);

        for (const actor of targets) {
            const flagKey = `sao_radar_event_${actor.id}`;
            await actor.setFlag(this.FLAG_SCOPE, flagKey, payload);
        }

        // Broadcast via socket
        game.socket.emit('module.omini-system-vtt', {
            action: 'radar.signal',
            payload
        });

        // Event Bus
        Hooks.call('omniCore.radar.eventPlaced', payload);

        // Auto-expirar
        if (duration) {
            setTimeout(() => this.expireSignal(signalId, targets), duration);
        }

        return signalId;
    }

    static async expireSignal(signalId, actors) {
        for (const actor of actors) {
            const flagKey = `sao_radar_event_${actor.id}`;
            const current = actor.getFlag(this.FLAG_SCOPE, flagKey);
            
            if (current?.id === signalId) {
                await actor.unsetFlag(this.FLAG_SCOPE, flagKey);
            }
        }

        game.socket.emit('module.omini-system-vtt', {
            action: 'radar.expire',
            payload: { id: signalId }
        });

        Hooks.call('omniCore.radar.eventExpired', { eventId: signalId });
    }

    static async cancelSignal(signalId, actors) {
        await this.expireSignal(signalId, actors);
        Hooks.call('omniCore.radar.eventCancelled', { eventId: signalId });
    }

    static getActiveSignals() {
        const signals = [];
        for (const actor of game.actors) {
            const flagKey = `sao_radar_event_${actor.id}`;
            const signal = actor.getFlag(this.FLAG_SCOPE, flagKey);
            if (signal?.active) {
                signals.push({
                    ...signal,
                    targetName: actor.name
                });
            }
        }
        return signals;
    }
}

window.RadarCore = RadarCore;
