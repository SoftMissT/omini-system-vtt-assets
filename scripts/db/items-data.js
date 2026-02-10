/**
 * ⚔️ OMNI-SYSTEM ITEM DATABASE
 * Generated from "Icon Library" Tiers & Categories
 */

const RARITY = {
    common: { price: 10, color: "#9E9E9E" },      // Cinza
    rare: { price: 50, color: "#2196F3" },        // Azul
    epic: { price: 200, color: "#9C27B0" },       // Roxo
    legendary: { price: 1000, color: "#FFD700" }, // Oricalco Gold
    mythic: { price: 5000, color: "prismatic" },  // Arco-íris (Special logic needed in HUD)
    cursed: { price: 0, color: "#FF2B4A" }        // Preto/Vermelho
};

const WEAPON_TYPES = ['sword', 'spear', 'bow', 'gauntlet', 'staff', 'dagger'];
const ARMOR_TYPES = ['light', 'medium', 'heavy'];

export const ITEM_DB = [];

// Helper to generate items
function generateItems() {
    // WEAPONS
    WEAPON_TYPES.forEach(type => {
        Object.keys(RARITY).forEach(rarity => {
            ITEM_DB.push({
                name: `${capitalize(rarity)} ${capitalize(type)}`,
                type: "weapon",
                img: `modules/omini-system-assets/assets/icons/weapons/${type}/icon_${type}_${rarity}.webp`,
                system: {
                    rarity: rarity,
                    type: type,
                    price: RARITY[rarity].price,
                    damage: getDamage(type, rarity),
                    description: `A ${rarity} tier ${type}.`
                }
            });
        });
    });

    // ARMOR
    ARMOR_TYPES.forEach(type => {
        Object.keys(RARITY).forEach(rarity => {
            ITEM_DB.push({
                name: `${capitalize(rarity)} ${capitalize(type)} Armor`,
                type: "equipment",
                img: `modules/omini-system-assets/assets/icons/armors/${type}/icon_armor_${type}_${rarity}.webp`,
                system: {
                    rarity: rarity,
                    type: type,
                    price: RARITY[rarity].price * 1.5,
                    defense: getDefense(type, rarity),
                    description: `A ${rarity} tier ${type} armor.`
                }
            });
        });
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getDamage(type, rarity) {
    const base = { sword: 6, spear: 8, bow: 6, gauntlet: 4, staff: 4, dagger: 4 };
    const mult = { common: 1, rare: 2, epic: 3, legendary: 5, mythic: 10, cursed: 8 };
    return `${mult[rarity]}d${base[type]}`;
}

function getDefense(type, rarity) {
    const base = { light: 2, medium: 4, heavy: 6 };
    const mult = { common: 1, rare: 2, epic: 3, legendary: 5, mythic: 10, cursed: 8 };
    return base[type] * mult[rarity];
}

// Run generation
generateItems();
