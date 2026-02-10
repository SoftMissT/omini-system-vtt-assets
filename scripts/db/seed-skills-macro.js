/**
 * 🌌 OMNI-SYSTEM: Initialize Skill Database
 * 
 * This macro populates the 'omini-skills' compendium with the default data.
 * Usage: Run once to seed the database.
 */

const PACK_CODE = "omini-system-vtt.omini-skills";

async function seedSkills() {
    // Dynamic import to bypass Foundry Macro restrictions
    const { SKILL_DB } = await import("/modules/omini-system-vtt/scripts/db/skills-data.js");

    console.log("🌌 OMNI-SYSTEM | Seeding Skills Database...");
    
    // Get Compendium
    const pack = game.packs.get(PACK_CODE);
    if (!pack) {
        ui.notifications.error(`Pack [${PACK_CODE}] não encontrado! Verifique module.json.`);
        return;
    }

    // Unlock pack (if locked)
    const wasLocked = pack.locked;
    if (wasLocked) await pack.configure({locked: false});

    // Load existing index
    const index = await pack.getIndex();

    let createdCount = 0;
    let updatedCount = 0;

    for (const skillData of SKILL_DB) {
        // Check if exists
        const existing = index.find(i => i.name === skillData.name);

        if (existing) {
            // Update logic could go here, but for now we skip to avoid overwriting user changes
            // Or we could force update if a flag is set
            // console.log(`Skipping existing: ${skillData.name}`);
            continue;
        }

        // Create Item
        await Item.create(skillData, { pack: PACK_CODE });
        createdCount++;
    }

    // Re-lock pack if it was locked
    if (wasLocked) await pack.configure({locked: true});

    ui.notifications.info(`✨ Database Atualizada! ${createdCount} novas skills criadas.`);
    console.log(`🌌 OMNI-SYSTEM | Skill Seed Complete. Created: ${createdCount}`);
}

// Dialog to confirm
new Dialog({
    title: "Omni-System: Seed Skills",
    content: "<p>Deseja popular o compêndio de Skills com os dados padrão? Isso pode levar alguns segundos.</p>",
    buttons: {
        yes: {
            icon: '<i class="fas fa-check"></i>',
            label: "Popular Database",
            callback: () => seedSkills()
        },
        no: {
            icon: '<i class="fas fa-times"></i>',
            label: "Cancelar"
        }
    },
    default: "yes"
}).render(true);
