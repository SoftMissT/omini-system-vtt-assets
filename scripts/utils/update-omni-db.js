/**
 * 🔄 OMNI-DB Auto-Updater
 * Reads all JSON files from items/ directory and updates omni-db.js
 * Run with: node scripts/utils/update-omni-db.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const ITEMS_DIR = path.join(__dirname, '../../items');
const OUTPUT_FILE = path.join(__dirname, '../core/omni-db.js');

// Categories to process
const CATEGORIES = [
    'weapons',
    'armors',
    'accessories',
    'consumables',
    'skills',
    'classes',
    'pets',
    'mounts',
    'summons',
    'materials',
    'housing'
];

/**
 * Recursively find all JSON files in a directory
 */
function findJsonFiles(dir) {
    let results = [];
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            results = results.concat(findJsonFiles(filePath));
        } else if (file.endsWith('.json')) {
            results.push(filePath);
        }
    }

    return results;
}

/**
 * Convert item JSON to Foundry VTT format
 */
function convertToFoundryFormat(itemData) {
    // Map tier codes to tier names
    const tierMap = {
        'C': 'Comum',
        'U': 'Incomum',
        'R': 'Raro',
        'E': 'Épico',
        'L': 'Lendário',
        'M': 'Mítico',
        'X': 'Conceito'
    };

    return {
        name: itemData.name,
        tier: tierMap[itemData.tier] || itemData.tier,
        type: 'item',
        system: {
            props: {
                itemType: itemData.category,
                description: itemData.description || '',
                ...itemData.stats,
                effects: itemData.effects || [],
                meta: itemData.meta || {}
            }
        },
        img: itemData.icon || `icons/svg/item-bag.svg`
    };
}

/**
 * Load all items from a category
 */
function loadCategory(category) {
    const categoryDir = path.join(ITEMS_DIR, category);

    if (!fs.existsSync(categoryDir)) {
        console.log(`⚠️  Directory not found: ${category}`);
        return [];
    }

    const jsonFiles = findJsonFiles(categoryDir);
    const items = [];

    for (const filePath of jsonFiles) {
        try {
            const rawData = fs.readFileSync(filePath, 'utf8');
            const itemData = JSON.parse(rawData);
            const foundryItem = convertToFoundryFormat(itemData);
            items.push(foundryItem);
        } catch (error) {
            console.error(`❌ Error loading ${filePath}:`, error.message);
        }
    }

    console.log(`✅ Loaded ${items.length} items from ${category}`);
    return items;
}

/**
 * Generate omni-db.js file
 */
function generateOmniDb() {
    console.log('🌌 Starting OMNI-DB generation...\n');

    const db = {};

    // Load all categories
    for (const category of CATEGORIES) {
        db[category] = loadCategory(category);
    }

    // Add empty arrays for other categories
    db.npcs = [];
    db.backgrounds = [];
    db.maps = [];

    // Generate JavaScript file content
    let content = `/**
 * 🌌 OMNI-SYSTEM: Master Database
 * Source of truth for all legendary items, skills, and meta-data.
 * NOTE: Using type: 'item' for all documents to ensure compatibility with Custom System Builder (CSB).
 *
 * ⚠️ AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Run 'node scripts/utils/update-omni-db.js' to regenerate
 */

const OMNI_DB = ${JSON.stringify(db, null, 2)};

window.OMNI_DB = OMNI_DB;
`;

    // Write to file
    fs.writeFileSync(OUTPUT_FILE, content, 'utf8');

    console.log(`\n✨ OMNI-DB generated successfully!`);
    console.log(`📂 Output: ${OUTPUT_FILE}`);

    // Print summary
    console.log('\n📊 Summary:');
    for (const category of CATEGORIES) {
        console.log(`   ${category}: ${db[category].length} items`);
    }
}

// Run the generator
try {
    generateOmniDb();
} catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
}
