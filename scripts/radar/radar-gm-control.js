/**
 * 🕹️ ADM - GM CONTROL HUD v3.0
 * Foundry VTT v13+ | OMNI-SYSTEM Integration
 */

const APP_ID = "sao-radar-gm-hud-v3";
const FLAG_SCOPE = "world";
const EVENT_KEY = "sao_radar_system_event";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class GMControlHUD extends HandlebarsApplicationMixin(ApplicationV2) {
    constructor(options = {}) {
        super(options);
        this.placingEvent = null;
        this.onCanvasClick = this._onCanvasClick.bind(this);
        this.eventTypes = [
            { key: 'monster', label: 'Monstro / Hostil', color: '#F44336' },
            { key: 'quest', label: 'Missão / NPC', color: '#2196F3' },
            { key: 'loot', label: 'Loot / Tesouro', color: '#FFD700' },
            { key: 'animal', label: 'Animal / Neutro', color: '#4CAF50' },
            { key: 'danger', label: 'Perigo / Armadilha', color: '#FF9800' },
            { key: 'special', label: 'Intenção Assassina', color: '#9C27B0' }
        ];
    }

    static DEFAULT_OPTIONS = {
        id: APP_ID,
        tag: "div",
        classes: ["omni-system", "gm-hud-window"],
        window: { title: "ADM - GM Console", resizable: true },
        position: { width: 650, height: 250, left: 100, top: 400 }
    };

    static PARTS = {
        main: { template: "templates/radar/gm-control-legacy.hbs" }
    };

    async _prepareContext(options) {
        const players = game.users.filter(u => !u.isGM && u.character).map(u => ({ name: u.name, actorId: u.character.id }));
        return { players, eventTypes: this.eventTypes };
    }

    _onRender(context, options) {
        this.element.querySelectorAll('[data-action="select-event"]').forEach(btn => {
            btn.addEventListener('click', e => this._selectEvent(e.currentTarget.dataset.type));
        });
    }

    _selectEvent(type) {
        if (this.placingEvent?.key === type) return this._deactivatePlacingMode();
        this._deactivatePlacingMode();
        this.placingEvent = this.eventTypes.find(e => e.key === type);
        canvas.stage.on('pointerdown', this.onCanvasClick);
        ui.notifications.info(`Modo de posicionamento: ${this.placingEvent.label}. Clique no canvas.`);
    }

    _deactivatePlacingMode() {
        canvas.stage.off('pointerdown', this.onCanvasClick);
        this.placingEvent = null;
    }

    async _onCanvasClick(event) {
        const pos = event.data.getLocalPosition(canvas.stage);
        const targetId = this.element.querySelector('[name="targetActorId"]')?.value || 'all';
        const message = this.element.querySelector('[name="message"]')?.value || 'Sinal Detectado';
        
        // Use RadarCore if available, otherwise fallback to direct flag setting
        if (window.RadarCore) {
            await RadarCore.placeSignal({ type: this.placingEvent.key, position: pos, targetId, message });
        } else {
             const payload = { type: this.placingEvent.key, message, position: pos, duration: 15000 };
             if (targetId === 'all') {
                 for (const p of game.users.filter(u => !u.isGM && u.character)) await p.character.setFlag(FLAG_SCOPE, EVENT_KEY, payload);
             } else {
                 const actor = game.actors.get(targetId);
                 if (actor) await actor.setFlag(FLAG_SCOPE, EVENT_KEY, payload);
             }
        }
        this._deactivatePlacingMode();
    }
}
