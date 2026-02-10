/**
 * ═══════════════════════════════════════════════════════════════════════
 * 📡 RADAR PLAYER HUD — Client-Side Renderer
 * ═══════════════════════════════════════════════════════════════════════
 * Foundry VTT v13.351+ | OMNI-SYSTEM Integration
 * 
 * FEATURES:
 * - Real-time signal display
 * - Mini-map with compass
 * - Notification system
 * - Socket listener integration
 * ═══════════════════════════════════════════════════════════════════════
 */

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class RadarPlayerHUD extends HandlebarsApplicationMixin(ApplicationV2) {
    constructor(actor, options = {}) {
        super(options);
        this.actor = actor;
        this._signals = [];
        this._notifications = [];
        this._compassRotation = 0;
        this._updateInterval = null;
    }

    static DEFAULT_OPTIONS = {
        id: "radar-player-hud",
        classes: ["omni-system", "radar-player-hud"],
        tag: "div",
        window: {
            title: "📡 RADAR",
            icon: "fas fa-radar",
            minimizable: true,
            resizable: false
        },
        position: {
            width: 300,
            height: 400,
            top: 20,
            right: 20
        },
        actions: {
            dismissNotification: RadarPlayerHUD.prototype._dismissNotification
        }
    };

    static PARTS = {
        main: {
            template: "modules/omini-system-vtt/templates/radar/player-radar.hbs",
            scrollable: []
        }
    };

    async _prepareContext(options) {
        // Load active signals from actor flags
        const flagKey = `sao_radar_event_${this.actor.id}`;
        const signalData = this.actor.getFlag('world', flagKey);
        
        if (signalData?.active) {
            this._signals = [signalData];
        }

        // Calculate screen positions for signals
        const signalsWithPos = this._signals.map(signal => {
            const pos = this._worldToScreen(signal.position);
            return {
                ...signal,
                screenX: pos.x,
                screenY: pos.y
            };
        });

        return {
            actorId: this.actor.id,
            signals: signalsWithPos,
            activeNotifications: this._notifications,
            compassRotation: this._compassRotation,
            signalCount: this._signals.length,
            activeCount: this._signals.filter(s => s.active).length
        };
    }

    _onRender(context, options) {
        // Start update loop
        this._startUpdateLoop();

        // Draw mini-map
        this._drawMiniMap();
    }

    _startUpdateLoop() {
        if (this._updateInterval) clearInterval(this._updateInterval);
        
        this._updateInterval = setInterval(() => {
            this._updateCompass();
            this._checkSignalExpiry();
            this.render();
        }, 1000);
    }

    _updateCompass() {
        const token = this.actor.getActiveTokens()[0];
        if (!token) return;

        // Calculate rotation based on token rotation
        this._compassRotation = token.document.rotation || 0;
    }

    _checkSignalExpiry() {
        const now = Date.now();
        
        this._signals = this._signals.filter(signal => {
            if (!signal.expiresAt) return true;
            if (now >= signal.expiresAt) {
                this._showNotification({
                    type: 'expired',
                    label: 'Sinal Expirado',
                    message: `${signal.label} não está mais ativo.`,
                    color: '#888',
                    icon: '⏱️',
                    duration: 5000
                });
                return false;
            }
            return true;
        });
    }

    _worldToScreen(worldPos) {
        // Convert world coordinates to mini-map screen %
        const token = this.actor.getActiveTokens()[0];
        if (!token) return { x: 50, y: 50 };

        const tokenPos = { x: token.x, y: token.y };
        const dx = worldPos.x - tokenPos.x;
        const dy = worldPos.y - tokenPos.y;

        // Normalize to 0-100% range (200px radius view)
        const range = canvas.grid.size * 20;
        const x = 50 + (dx / range) * 50;
        const y = 50 + (dy / range) * 50;

        return {
            x: Math.max(0, Math.min(100, x)),
            y: Math.max(0, Math.min(100, y))
        };
    }

    _drawMiniMap() {
        const canvas = this.element.querySelector(`#radar-canvas-${this.actor.id}`);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 200, 200);

        // Draw grid background
        ctx.strokeStyle = 'rgba(0, 217, 255, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 200; i += 20) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, 200);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(200, i);
            ctx.stroke();
        }

        // Draw radar sweep
        const time = Date.now() / 1000;
        const sweepAngle = (time * Math.PI / 2) % (Math.PI * 2);
        
        ctx.save();
        ctx.translate(100, 100);
        ctx.rotate(sweepAngle);
        
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 100);
        gradient.addColorStop(0, 'rgba(0, 217, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 217, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 100, -Math.PI / 6, Math.PI / 6);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }

    _showNotification(data) {
        const id = `notif_${Date.now()}`;
        this._notifications.push({ ...data, id });

        if (data.duration) {
            setTimeout(() => {
                this._dismissNotification(null, { id });
            }, data.duration);
        }

        this.render();
    }

    _dismissNotification(event, target) {
        const id = target?.id || event?.currentTarget?.dataset?.id;
        this._notifications = this._notifications.filter(n => n.id !== id);
        this.render();
    }

    async _onClose(options) {
        if (this._updateInterval) {
            clearInterval(this._updateInterval);
        }
        await super._onClose(options);
    }

    // ═══════════════════════════════════════════════════════════════
    // Socket Handler (called from radar-integration.js)
    // ═══════════════════════════════════════════════════════════════
    
    handleRadarSignal(payload) {
        // Check if signal is for this actor
        if (payload.targetId !== 'all' && payload.targetId !== this.actor.id) return;

        this._signals.push(payload);

        this._showNotification({
            type: payload.type,
            label: payload.label,
            message: payload.message,
            color: payload.color,
            icon: payload.icon,
            duration: 10000
        });

        this.render();
    }

    handleRadarExpire(payload) {
        this._signals = this._signals.filter(s => s.id !== payload.id);
        this.render();
    }
}

// ═══════════════════════════════════════════════════════════════════════
// Global Registration
// ═══════════════════════════════════════════════════════════════════════

window.RadarPlayerHUD = RadarPlayerHUD;
