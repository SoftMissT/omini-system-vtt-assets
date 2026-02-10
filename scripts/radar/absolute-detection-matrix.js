/**
 * ═══════════════════════════════════════════════════════════════════════
 * 👁️ ABSOLUTE DETECTION MATRIX - v1.0 [OMNISCIENT PROTOCOL]
 * ═══════════════════════════════════════════════════════════════════════
 * Foundry VTT v13+ | ApplicationV2 Implementation
 * ═══════════════════════════════════════════════════════════════════════
 */

const APP_ID = "absolute-detection-matrix";

const MATRIX_CSS = `
.adm-window {
    --adm-cyan: #00BCD4;
    --adm-red: #F44336;
    --adm-purple: #9C27B0;
    --adm-gold: #FFD700;
    --adm-green: #4CAF50;
    --adm-bg-dark: rgba(5, 5, 15, 0.98);
    --adm-bg-panel: rgba(15, 15, 25, 0.95);
    --adm-border: rgba(0, 188, 212, 0.6);
    --adm-glow: 0 0 20px rgba(0, 188, 212, 0.4);
    
    font-family: 'Orbitron', 'Exo 2', 'Rajdhani', sans-serif;
    border: 2px solid var(--adm-border);
    box-shadow: var(--adm-glow), inset 0 0 30px rgba(0, 188, 212, 0.1);
    background: var(--adm-bg-dark) !important;
    border-radius: 12px;
    z-index: 100 !important;
    backdrop-filter: blur(10px);
}

.adm-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: #fff;
    padding: 0;
    overflow: hidden;
    gap: 0;
}

.adm-header {
    background: linear-gradient(135deg, rgba(0, 188, 212, 0.2) 0%, rgba(156, 39, 176, 0.2) 100%);
    padding: 12px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.adm-title {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    background: linear-gradient(90deg, var(--adm-cyan), var(--adm-purple));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 10px rgba(0, 188, 212, 0.3);
}

.adm-status-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 10px;
    opacity: 0.8;
}

.adm-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--adm-green);
    box-shadow: 0 0 8px var(--adm-green);
    animation: adm-pulse 2s ease-in-out infinite;
}

@keyframes adm-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.2); }
}

.adm-radar-container {
    position: relative;
    padding: 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--adm-bg-panel);
}

.adm-radar-scope {
    position: relative;
    width: 280px;
    height: 280px;
    background: 
        radial-gradient(circle at center, rgba(0, 188, 212, 0.05) 0%, rgba(0, 0, 0, 0.9) 70%),
        repeating-radial-gradient(
            circle at center,
            transparent 0,
            transparent 45px,
            rgba(0, 188, 212, 0.1) 45px,
            rgba(0, 188, 212, 0.1) 46px
        );
    border: 3px solid rgba(0, 188, 212, 0.4);
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 
        inset 0 0 30px rgba(0, 188, 212, 0.2),
        0 0 30px rgba(0, 188, 212, 0.3);
}

.adm-range-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid rgba(0, 188, 212, 0.15);
    border-radius: 50%;
    pointer-events: none;
}

.adm-range-ring.r1 { width: 33%; height: 33%; }
.adm-range-ring.r2 { width: 66%; height: 66%; }
.adm-range-ring.r3 { width: 100%; height: 100%; }

.adm-scanner {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 3px;
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(0, 188, 212, 0.8) 50%,
        var(--adm-cyan) 100%
    );
    transform-origin: 0% 50%;
    animation: adm-scan 4s linear infinite;
    filter: drop-shadow(0 0 8px var(--adm-cyan));
    z-index: 50;
}

@keyframes adm-scan {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.adm-player-marker {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    transform: translate(-50%, -50%);
    z-index: 100;
}

.adm-player-marker::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: var(--adm-cyan);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--adm-cyan);
}

.adm-player-marker::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150%;
    height: 150%;
    border: 2px solid var(--adm-cyan);
    border-radius: 50%;
    animation: adm-player-pulse 2s ease-in-out infinite;
}

@keyframes adm-player-pulse {
    0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.3); }
}

.adm-blips {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.adm-blip {
    position: absolute;
    transform: translate(-50%, -50%);
    pointer-events: auto;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 10;
}

.adm-blip.physical {
    width: 8px;
    height: 8px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.4);
}

.adm-blip.hostile {
    width: 10px;
    height: 10px;
    background: var(--adm-red);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--adm-red);
    animation: adm-hostile-pulse 1.5s ease-in-out infinite;
    z-index: 20;
}

@keyframes adm-hostile-pulse {
    0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 10px var(--adm-red); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.4); box-shadow: 0 0 20px var(--adm-red); }
}

.adm-blip.elite {
    width: 14px;
    height: 14px;
    background: var(--adm-purple);
    border-radius: 50%;
    box-shadow: 0 0 15px var(--adm-purple);
    border: 2px solid rgba(156, 39, 176, 0.5);
    animation: adm-elite-glow 2s ease-in-out infinite;
    z-index: 30;
}

@keyframes adm-elite-glow {
    0%, 100% { filter: brightness(1); box-shadow: 0 0 15px var(--adm-purple); }
    50% { filter: brightness(1.5); box-shadow: 0 0 25px var(--adm-purple), 0 0 40px rgba(156, 39, 176, 0.3); }
}

.adm-blip.legendary {
    width: 18px;
    height: 18px;
    background: linear-gradient(135deg, var(--adm-red), var(--adm-purple));
    border-radius: 50%;
    box-shadow: 0 0 20px var(--adm-red), 0 0 30px var(--adm-purple);
    border: 3px solid rgba(255, 215, 0, 0.6);
    animation: adm-legendary-rotate 3s linear infinite;
    z-index: 40;
}

.adm-blip.opportunity {
    width: 12px;
    height: 12px;
    background: var(--adm-gold);
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    box-shadow: 0 0 15px var(--adm-gold);
    animation: adm-loot-sparkle 2s ease-in-out infinite;
    z-index: 25;
}

.adm-offline {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: var(--adm-red);
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 0 0 10px var(--adm-red);
    z-index: 200;
    pointer-events: none;
    animation: adm-offline-blink 2s ease-in-out infinite;
}

@keyframes adm-offline-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
}

.adm-layers {
    display: flex;
    justify-content: space-around;
    gap: 8px;
    padding: 12px 16px;
    background: rgba(0, 0, 0, 0.3);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.adm-layer-btn {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: all 0.3s;
    font-size: 10px;
    text-transform: uppercase;
}

.adm-layer-btn.active {
    background: rgba(0, 188, 212, 0.2);
    border-color: var(--adm-cyan);
    box-shadow: 0 0 10px rgba(0, 188, 212, 0.3);
}

.adm-layer-btn.locked { opacity: 0.3; cursor: not-allowed; }

.adm-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    padding: 12px 16px;
    background: rgba(0, 0, 0, 0.2);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 10px;
}

.adm-stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    border-left: 3px solid;
}

.adm-stat-item.physical { border-color: #fff; }
.adm-stat-item.hostile { border-color: var(--adm-red); }
.adm-stat-item.elite { border-color: var(--adm-purple); }
.adm-stat-item.loot { border-color: var(--adm-gold); }

.adm-stat-value { font-weight: 700; font-size: 14px; }

.adm-threats {
    max-height: 150px;
    overflow-y: auto;
    padding: 12px 16px;
    background: rgba(0, 0, 0, 0.3);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.adm-threats-title {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
    color: var(--adm-red);
}

.adm-threat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 8px;
    margin-bottom: 4px;
    background: rgba(244, 67, 54, 0.1);
    border-left: 3px solid var(--adm-red);
    border-radius: 4px;
    font-size: 10px;
    transition: all 0.2s;
}

.adm-footer {
    padding: 8px 16px;
    background: rgba(0, 0, 0, 0.4);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
    font-size: 10px;
    color: var(--adm-cyan);
    letter-spacing: 1px;
}

.adm-tooltip {
    position: fixed;
    background: rgba(0, 0, 0, 0.95);
    border: 1px solid var(--adm-cyan);
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 11px;
    pointer-events: none;
    z-index: 10000;
    box-shadow: 0 0 15px rgba(0, 188, 212, 0.4);
}
`;

const MATRIX_TEMPLATE = `
<div class="adm-content">
    <div class="adm-header">
        <div class="adm-title">⬢ ABSOLUTE DETECTION MATRIX ⬢</div>
        <div class="adm-status-indicator">
            <div class="adm-status-dot"></div>
            <span>ONLINE</span>
        </div>
    </div>
    <div class="adm-radar-container">
        <div class="adm-radar-scope">
            <div class="adm-range-ring r1"></div>
            <div class="adm-range-ring r2"></div>
            <div class="adm-range-ring r3"></div>
            <div class="adm-scanner"></div>
            <div class="adm-player-marker"></div>
            <div class="adm-blips" id="adm-blips"></div>
            {{#unless hasToken}}
            <div class="adm-offline">⚠️ SEM SINAL ⚠️</div>
            {{/unless}}
        </div>
    </div>
    <div class="adm-layers">
        <div class="adm-layer-btn active" data-layer="physical">
            <div class="adm-layer-icon">🌐</div>
            <div class="adm-layer-name">Físico</div>
            <div class="adm-layer-range">{{ranges.physical}}m</div>
            <div class="adm-layer-count">{{counts.physical}}</div>
        </div>
        <div class="adm-layer-btn {{#unless layers.spiritual.unlocked}}locked{{/unless}}" data-layer="spiritual">
            <div class="adm-layer-icon">🔮</div>
            <div class="adm-layer-name">Espiritual</div>
            <div class="adm-layer-range">{{ranges.spiritual}}m</div>
        </div>
        <div class="adm-layer-btn {{#unless layers.conceptual.unlocked}}locked{{/unless}}" data-layer="conceptual">
            <div class="adm-layer-icon">👁️</div>
            <div class="adm-layer-name">Conceitual</div>
            <div class="adm-layer-range">∞</div>
        </div>
    </div>
    <div class="adm-stats">
        <div class="adm-stat-item physical"><span class="adm-stat-label">🟢 Neutro</span><span class="adm-stat-value">{{counts.physical}}</span></div>
        <div class="adm-stat-item hostile"><span class="adm-stat-label">🔴 Hostil</span><span class="adm-stat-value">{{counts.hostile}}</span></div>
        <div class="adm-stat-item elite"><span class="adm-stat-label">🟣 Elite</span><span class="adm-stat-value">{{counts.elite}}</span></div>
        <div class="adm-stat-item loot"><span class="adm-stat-label">💎 Loot</span><span class="adm-stat-value">{{counts.loot}}</span></div>
    </div>
</div>
`;

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class AbsoluteDetectionMatrix extends HandlebarsApplicationMixin(ApplicationV2) {
    constructor(options = {}) {
        super(options);
        this.scanInterval = null;
        this.targetToken = null;
        this.layers = {
            physical: { active: true, unlocked: true },
            spiritual: { active: false, unlocked: false },
            conceptual: { active: false, unlocked: false }
        };
        this.counts = { physical: 0, hostile: 0, elite: 0, loot: 0 };
        this.detectedEntities = new Map();
    }

    static DEFAULT_OPTIONS = {
        id: APP_ID,
        tag: "div",
        classes: ["omni-system", "adm-window"],
        window: { title: "ABSOLUTE DETECTION MATRIX", icon: "fa-solid fa-radar", resizable: false, minimizable: true },
        position: { width: 340, height: 'auto', right: 20, top: 80 }
    };

    static PARTS = {
        main: { template: "templates/radar/adm-matrix.hbs" }
    };

    async _prepareContext(options) {
        this.targetToken = this._findTargetToken();
        const ranges = this._calculateRanges();
        return {
            hasToken: !!this.targetToken,
            layers: this.layers,
            ranges: ranges,
            counts: this.counts,
            totalEntities: this.detectedEntities.size
        };
    }

    _onRender(context, options) {
        if (!document.getElementById('adm-css')) {
            const style = document.createElement('style');
            style.id = 'adm-css';
            style.innerHTML = MATRIX_CSS;
            document.head.appendChild(style);
        }
        this._startScanning();
    }

    _onClose() {
        if (this.scanInterval) clearInterval(this.scanInterval);
    }

    _findTargetToken() {
        const controlled = canvas.tokens.controlled;
        if (controlled.length > 0) return controlled[0];
        if (game.user.character) {
            const tokens = game.user.character.getActiveTokens();
            if (tokens.length > 0) return tokens[0];
        }
        return null;
    }

    _calculateRanges() {
        if (!this.targetToken?.actor) return { physical: 25, spiritual: 0, conceptual: 999 };
        const attrs = this.targetToken.actor.system?.atributos || {};
        const mente = attrs.MENTE || 5;
        const espirito = attrs.ESPIRITO || 0;
        return { physical: mente * 5, spiritual: espirito * 10, conceptual: 999 };
    }

    _startScanning() {
        if (this.scanInterval) clearInterval(this.scanInterval);
        this.scanInterval = setInterval(() => this._scan(), 2000);
    }

    _scan() {
        const container = this.element.querySelector('#adm-blips');
        if (!container) return;
        if (!this.targetToken) {
            container.innerHTML = '';
            this.detectedEntities.clear();
            return;
        }
        container.innerHTML = '';
        this.counts = { physical: 0, hostile: 0, elite: 0, loot: 0 };
        const origin = this.targetToken.center;
        const gridSize = canvas.grid.size || 100;
        const ranges = this._calculateRanges();
        const maxDist = ranges.physical * gridSize;

        for (const token of canvas.tokens.placeables) {
            if (token === this.targetToken || (!token.visible && !game.user.isGM)) continue;
            const dx = token.center.x - origin.x;
            const dy = token.center.y - origin.y;
            const dist = Math.hypot(dx, dy);
            if (dist / gridSize > ranges.physical) continue;

            const sig = this._classify(token, dist / gridSize);
            this._renderBlip(container, sig, dx, dy, maxDist);
        }
    }

    _classify(token, dist) {
        const actor = token.actor;
        let type = 'physical';
        if (actor) {
            const name = actor.name.toLowerCase();
            const hp = actor.system?.attributes?.hp?.max || 0;
            if (name.includes('baú') || name.includes('chest')) type = 'opportunity';
            else if (hp > 200) type = 'elite';
            else if (token.document.disposition === -1) type = 'hostile';
        }
        this.counts[type === 'opportunity' ? 'loot' : type]++;
        return { id: token.id, name: token.name, type };
    }

    _renderBlip(container, sig, dx, dy, maxDist) {
        const scale = 130 / maxDist;
        const blip = document.createElement('div');
        blip.className = `adm-blip ${sig.type}`;
        blip.style.left = `calc(50% + ${dx * scale}px)`;
        blip.style.top = `calc(50% + ${dy * scale}px)`;
        container.appendChild(blip);
    }
}

window.AbsoluteDetectionMatrix = AbsoluteDetectionMatrix;
