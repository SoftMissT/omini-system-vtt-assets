/**
 * 🧬 OMNI-SYSTEM: SYNTHESIS CORE HUD
 * Manages Item/Skill Fusion, Sacrifice, and Evolution.
 */

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class SynthesisCore extends HandlebarsApplicationMixin(ApplicationV2) {
    
    static DEFAULT_OPTIONS = {
        id: "synthesis-core",
        tag: "form",
        window: {
            title: "🧬 Synthesis Core",
            icon: "modules/omini-system-assets/assets/icons/ui/synthesis-icon.webp",
            resizable: false,
            width: 800,
            height: 600
        },
        position: {
            width: 800,
            height: 600
        },
        actions: {
            processFusion: SynthesisCore.processFusion,
            clearSlots: SynthesisCore.clearSlots
        }
    };

    static PARTS = {
        main: {
            template: "modules/omini-system-vtt/templates/huds/synthesis-core.hbs"
        }
    };

    /** @override */
    async _prepareContext(options) {
        // Load Actor Data
        const actor = OmniCore.actor.resolve(game.user);
        const synthData = await OmniCore.data.get(actor, "synthesis") || {
            slot1: null,
            slot2: null,
            history: []
        };

        return {
            actor: actor,
            slots: {
                left: synthData.slot1,
                right: synthData.slot2
            },
            history: synthData.history.reverse().slice(0, 5), // Last 5 fusions
            canFuse: !!(synthData.slot1 && synthData.slot2)
        };
    }

    /* ------------------------------------------- */
    /*  Event Listeners & Actions                  */
    /* ------------------------------------------- */

    /**
     * Handle Drop Events (Items dragged into slots)
     * @param {DragEvent} event 
     * @param {HTMLElement} target 
     */
    _onDrop(event) {
        const data = TextEditor.getDragEventData(event);
        if (data.type !== "Item") return;
        
        // Logic to validate and set slot item
        console.log("🧬 Synthesis Drop:", data);
    }

    static async processFusion(event, target) {
        console.log("🧬 Initiating Fusion Sequence...");
        // 1. Get Items
        // 2. Calculate Outcome
        // 3. Gemini AI Flavor Text
        // 4. Create New Item
        // 5. Delete Old Items (if not 'copy' mode)
    }

    static async clearSlots(event, target) {
        // Clear flags
        const actor = OmniCore.actor.resolve(game.user);
        await OmniCore.data.set(actor, "synthesis", { slot1: null, slot2: null });
        this.render();
    }
}
