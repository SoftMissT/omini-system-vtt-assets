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
            await this.seedItems();
            await this.seedSkills();
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
     * Seeds the 'omini-items' compendium.
     */
    static async seedItems() {
        const pack = game.packs.get("omini-system-vtt.omini-items");
        if (!pack) return;
        await pack.getIndex();

        const itemsToSeed = [...OMNI_DB.weapons, ...OMNI_DB.materials, ...OMNI_DB.shop];

        for (const itemData of itemsToSeed) {
            const existing = pack.index.find(i => i.name === itemData.name);
            if (!existing) {
                console.log(`✨ Semeando item: ${itemData.name}`);
                await Item.create(itemData, { pack: pack.collection });
            }
        }
    }

    /**
     * Seeds the 'omini-skills' compendium.
     */
    static async seedSkills() {
        const pack = game.packs.get("omini-system-vtt.omini-skills");
        if (!pack) return;
        await pack.getIndex();

        for (const skillData of OMNI_DB.skills) {
            const existing = pack.index.find(i => i.name === skillData.name);
            if (!existing) {
                console.log(`✨ Semeando skill: ${skillData.name}`);
                await Item.create(skillData, { pack: pack.collection });
            }
        }
    }

    /**
     * Verifies that the assets module is active.
     */
    static async checkAssets() {
        const assetsModule = game.modules.get("omini-system-assets");
        if (!assetsModule?.active) {
            ui.notifications.error("⚠️ Módulo 'omini-system-assets' NÃO ENCONTRADO ou INATIVO.");
        }
    }
}
