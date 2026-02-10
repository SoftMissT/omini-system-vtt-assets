/**
 * 🌌 OMNI-SYSTEM DATABASE LOADER
 * Aggregates all data files into a global OMNI_DB object.
 */

import { ITEM_DB } from "../db/items-data.js";
import { SKILL_DB } from "../db/skills-data.js";

export class OmniDbLoader {
    static async load() {
        console.log("🌌 OMNI-SYSTEM: Loading Database...");
        
        // Ensure structure matches OMINI_DATABASE_GENERATOR expectations
        window.OMNI_DB = {
            weapons: ITEM_DB.filter(i => i.type === "weapon" || i.system?.type === "sword" || i.system?.type === "bow"),
            armors: ITEM_DB.filter(i => i.type === "equipment" || i.type === "armor"),
            consumables: ITEM_DB.filter(i => i.type === "consumable"),
            materials: ITEM_DB.filter(i => i.type === "loot" || i.type === "material"),
            skills: SKILL_DB,
            pets: [] // Placeholder for future expansion
        };

        console.log("✅ OMNI-SYSTEM: Database Loaded.", window.OMNI_DB);
        return window.OMNI_DB;
    }
}
