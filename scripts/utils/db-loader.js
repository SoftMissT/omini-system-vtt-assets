/**
 * 📂 OMNI-SYSTEM: Database & Compendium Loader
 * Handles synchronization between script files and Foundry Compendiums.
 */

export class OmniDbLoader {
    /**
     * Main entry point for database initialization.
     */
    static async load() {
        console.log("🌌 OMNI-SYSTEM | Inciando carga de base de dados...");
        
        if (game.user.isGM) {
            await this.seedMacros();
            await this.checkAssets();
        }
        
        console.log("🌌 OMNI-SYSTEM | Base de dados carregada.");
    }

    /**
     * Seeds the 'omini-macros' compendium with scripts from the module.
     */
    static async seedMacros() {
        const pack = game.packs.get("omini-system-vtt.omini-macros");
        if (!pack) {
            console.warn("⚠️ Compêndio 'omini-macros' não encontrado.");
            return;
        }

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
                const macro = await Macro.create({
                    name: macroData.name,
                    type: "script",
                    command: macroData.command,
                    img: macroData.img,
                    ownership: { default: CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER }
                });
                await pack.importDocument(macro);
                await macro.delete(); // Clean up from the world, keep in compendium
            }
        }
    }

    /**
     * Verifies that the assets module is active.
     */
    static async checkAssets() {
        const assetsModule = game.modules.get("omini-system-assets");
        if (!assetsModule?.active) {
            ui.notifications.error("⚠️ Módulo 'omini-system-assets' NÃO ENCONTRADO ou INATIVO. A interface pode apresentar falhas de ícones.");
        }
    }
}
