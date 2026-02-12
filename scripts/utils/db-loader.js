/**
 * 📂 OMNI-SYSTEM: Database & Compendium Loader
 * Handles synchronization between script files and Foundry Compendiums.
 */
import { OMNI_DB } from "../core/omni-db.js";

export class OmniDbLoader {
    /**
     * Main entry point for database initialization.
     */
    static async load() {
        console.log("🌌 OMNI-SYSTEM | Iniciando carga de base de dados...");

        if (game.user.isGM) {
            await this.seedMacros();
            await this.seedCompendiumsByCategory();
            await this.checkAssets();
        }

        console.log("🌌 OMNI-SYSTEM | Base de dados carregada.");
    }

    /**
     * Seeds the 'omini-macros' compendium.
     */
    static async seedMacros() {
        const pack = game.packs.get("omini-system-vtt.omini-macros");
        if (!pack) return;

        // Ensure index is loaded
        await pack.getIndex();

        const macrosToSeed = [
            {
                name: "[HUD] Absolute Detection Matrix",
                command: 'import { AbsoluteDetectionMatrix } from "./scripts/radar/absolute-detection-matrix.js"; new AbsoluteDetectionMatrix().render(true);',
                img: "icons/svg/radar.svg"
            },
            {
                name: "[HUD] GM Radar Control",
                command: 'import { GMControlHUD } from "./scripts/radar/radar-gm-control.js"; new GMControlHUD().render(true);',
                img: "icons/svg/cog.svg"
            },
            {
                name: "[HUD] JJK Character Sheet",
                command: 'import { CharacterSheetJJK } from "./scripts/huds/jjk-character-sheet.js"; const actor = canvas.tokens.controlled[0]?.actor || game.user.character; if(actor) new CharacterSheetJJK(actor).render(true); else ui.notifications.warn("Selecione um token!");',
                img: "icons/svg/scroll.svg"
            }
        ];

        for (const macroData of macrosToSeed) {
            const existing = pack.index.find(m => m.name === macroData.name);
            if (!existing) {
                console.log(`✨ Semeando macro: ${macroData.name}`);
                await Macro.create({
                    ...macroData,
                    type: "script",
                    ownership: { default: CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER }
                }, { pack: pack.collection });
            }
        }
    }

    /**
     * Seeds all item compendiums by category.
     */
    static async seedCompendiumsByCategory() {
        const categories = {
            'weapons': 'omini-weapons',
            'armors': 'omini-armors',
            'accessories': 'omini-accessories',
            'consumables': 'omini-consumables',
            'skills': 'omini-skills',
            'classes': 'omini-classes',
            'pets': 'omini-pets',
            'mounts': 'omini-mounts',
            'summons': 'omini-summons',
            'materials': 'omini-materials',
            'housing': 'omini-housing',
            'backgrounds': 'omini-backgrounds'
        };

        for (const [category, packName] of Object.entries(categories)) {
            await this.seedCategoryCompendium(category, packName);
        }

        // Seed NPCs separately (Actor type)
        await this.seedNPCCompendium();
    }

    /**
     * Seeds a specific category compendium.
     */
    static async seedCategoryCompendium(category, packName) {
        const pack = game.packs.get(`omini-system-vtt.${packName}`);
        if (!pack) {
            console.warn(`⚠️ Compendium não encontrado: ${packName}`);
            return;
        }

        await pack.getIndex();
        const itemsToSeed = OMNI_DB[category] || [];

        if (itemsToSeed.length === 0) {
            console.log(`📦 ${category}: nenhum item para popular`);
            return;
        }

        for (const itemData of itemsToSeed) {
            const existing = pack.index.find(i => i.name === itemData.name);
            if (!existing) {
                console.log(`✨ Semeando ${category}: ${itemData.name}`);
                await Item.create(itemData, { pack: pack.collection });
            }
        }
    }

    /**
     * Seeds the NPCs compendium (Actor type).
     */
    static async seedNPCCompendium() {
        const pack = game.packs.get("omini-system-vtt.omini-npcs");
        if (!pack) {
            console.warn("⚠️ Compendium não encontrado: omini-npcs");
            return;
        }

        await pack.getIndex();
        const npcsToSeed = OMNI_DB.npcs || [];

        if (npcsToSeed.length === 0) {
            console.log("📦 npcs: nenhum item para popular");
            return;
        }

        for (const npcData of npcsToSeed) {
            const existing = pack.index.find(n => n.name === npcData.name);
            if (!existing) {
                console.log(`✨ Semeando NPC: ${npcData.name}`);
                await Actor.create(npcData, { pack: pack.collection });
            }
        }
    }

    /**
     * Verifies that the module is active.
     */
    static async checkAssets() {
        console.log("✅ Módulo OMINI-SYSTEM carregado com sucesso!");
    }
}
