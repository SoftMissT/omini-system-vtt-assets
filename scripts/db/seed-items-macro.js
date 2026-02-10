/**
 * ⚔️ OMNI-SYSTEM: Initialize Item Database
 * 
 * This macro populates the 'omini-items' compendium with tiered equipment.
 */

const PACK_CODE = "omini-system-vtt.omini-items";

async function seedItems() {
    // Dynamic import to bypass Foundry Macro restrictions
    const { ITEM_DB } = await import("/modules/omini-system-vtt/scripts/db/items-data.js");
    console.log("⚔️ OMNI-SYSTEM | Seeding Items Database...");
    
    const pack = game.packs.get(PACK_CODE);
    if (!pack) {
        ui.notifications.error(`Pack [${PACK_CODE}] não encontrado!`);
        return;
    }

    const wasLocked = pack.locked;
    if (wasLocked) await pack.configure({locked: false});

    const index = await pack.getIndex();
    let count = 0;

    for (const itemData of ITEM_DB) {
        if (index.find(i => i.name === itemData.name)) continue;
        await Item.create(itemData, { pack: PACK_CODE });
        count++;
    }

    if (wasLocked) await pack.configure({locked: true});

    ui.notifications.info(`✨ Items Database: ${count} itens criados.`);
}

new Dialog({
    title: "Omni-System: Seed Items",
    content: "<p>Popular compêndio de Itens (Armas/Armaduras por Tier)?</p>",
    buttons: {
        yes: { label: "Popular", callback: () => seedItems() },
        no: { label: "Cancelar" }
    },
    default: "yes"
}).render(true);
