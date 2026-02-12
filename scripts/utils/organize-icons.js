/**
 * 🎨 ICON ORGANIZER - AXION SYSTEM
 *
 * Organiza ícones da pasta temporária para as pastas corretas
 * baseado no padrão de nomenclatura
 *
 * PADRÃO DE NOMENCLATURA:
 * [tipo]-[obra]-[nome].webp
 *
 * Exemplos:
 * - weapon-sao-elucidator.webp
 * - skill-solo-leveling-shadow_extraction.webp
 * - weapon-jjk-playful_cloud.webp
 * - consumable-generic-health_potion.webp
 *
 * USO:
 * node scripts/utils/organize-icons.js
 */

const fs = require('fs');
const path = require('path');

// Configuração
const TEMP_DIR = path.join(__dirname, '../../assets/icons/_temp');
const BASE_DIR = path.join(__dirname, '../../assets/icons');

// Tipos suportados
const TIPOS_SUPORTADOS = [
    'weapon',
    'weapons',
    'skill',
    'skills',
    'armor',
    'armors',
    'accessory',
    'accessories',
    'consumable',
    'consumables',
    'class',
    'classes',
    'mount',
    'mounts',
    'pet',
    'pets'
];

// Normalizar tipo para plural
const TIPO_PLURAL_MAP = {
    'weapon': 'weapons',
    'weapons': 'weapons',
    'skill': 'skills',
    'skills': 'skills',
    'armor': 'armors',
    'armors': 'armors',
    'accessory': 'accessories',
    'accessories': 'accessories',
    'consumable': 'consumables',
    'consumables': 'consumables',
    'class': 'classes',
    'classes': 'classes',
    'mount': 'mounts',
    'mounts': 'mounts',
    'pet': 'pets',
    'pets': 'pets'
};

// Cores para console
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    blue: '\x1b[34m'
};

/**
 * Analisa o nome do arquivo e extrai informações
 */
function parseFileName(fileName) {
    // Remove extensão
    const nameWithoutExt = fileName.replace(/\.(webp|png|jpg|jpeg)$/i, '');

    // Divide por hífen
    const parts = nameWithoutExt.split('-');

    if (parts.length < 3) {
        return null;
    }

    const tipo = parts[0].toLowerCase();
    const obra = parts[1].toLowerCase();
    const nome = parts.slice(2).join('-');

    // Valida tipo
    if (!TIPOS_SUPORTADOS.includes(tipo)) {
        return null;
    }

    return {
        tipo: TIPO_PLURAL_MAP[tipo],
        obra: obra,
        nome: nome,
        extensao: fileName.match(/\.(webp|png|jpg|jpeg)$/i)[0]
    };
}

/**
 * Organiza um ícone
 */
function organizeIcon(fileName) {
    const info = parseFileName(fileName);

    if (!info) {
        console.log(`${colors.yellow}⚠️  Ignorando: ${fileName} (formato incorreto)${colors.reset}`);
        return false;
    }

    const sourcePath = path.join(TEMP_DIR, fileName);
    const targetDir = path.join(BASE_DIR, info.tipo, info.obra);
    const targetPath = path.join(targetDir, `${info.nome}${info.extensao}`);

    // Cria diretório de destino se não existir
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
        console.log(`${colors.cyan}📁 Criado: ${info.tipo}/${info.obra}/${colors.reset}`);
    }

    // Move arquivo
    try {
        fs.copyFileSync(sourcePath, targetPath);
        fs.unlinkSync(sourcePath);
        console.log(`${colors.green}✅ ${fileName} → ${info.tipo}/${info.obra}/${info.nome}${info.extensao}${colors.reset}`);
        return true;
    } catch (error) {
        console.log(`${colors.red}❌ Erro ao mover ${fileName}: ${error.message}${colors.reset}`);
        return false;
    }
}

/**
 * Processa todos os ícones na pasta temporária
 */
function organizeAllIcons() {
    console.log(`${colors.bright}${colors.blue}`);
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('🎨 ICON ORGANIZER - AXION SYSTEM');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`${colors.reset}\n`);

    // Verifica se a pasta temp existe
    if (!fs.existsSync(TEMP_DIR)) {
        fs.mkdirSync(TEMP_DIR, { recursive: true });
        console.log(`${colors.yellow}⚠️  Pasta temporária criada: assets/icons/_temp${colors.reset}`);
        console.log(`${colors.cyan}💡 Coloque seus ícones nesta pasta e execute novamente${colors.reset}`);
        return;
    }

    // Lista arquivos
    const files = fs.readdirSync(TEMP_DIR);

    if (files.length === 0) {
        console.log(`${colors.yellow}⚠️  Nenhum arquivo encontrado em assets/icons/_temp${colors.reset}`);
        console.log(`${colors.cyan}💡 Coloque seus ícones seguindo o padrão: [tipo]-[obra]-[nome].webp${colors.reset}\n`);
        console.log(`${colors.cyan}Exemplos:${colors.reset}`);
        console.log(`   - weapon-sao-elucidator.webp`);
        console.log(`   - skill-solo-leveling-shadow_extraction.webp`);
        console.log(`   - weapon-jjk-playful_cloud.webp\n`);
        return;
    }

    console.log(`${colors.bright}📦 Encontrados ${files.length} arquivo(s)${colors.reset}\n`);

    let organized = 0;
    let skipped = 0;

    files.forEach(file => {
        if (organizeIcon(file)) {
            organized++;
        } else {
            skipped++;
        }
    });

    console.log(`\n${colors.bright}${colors.blue}`);
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`${colors.reset}`);
    console.log(`${colors.green}✅ Organizados: ${organized}${colors.reset}`);
    console.log(`${colors.yellow}⚠️  Ignorados: ${skipped}${colors.reset}`);
    console.log(`${colors.bright}${colors.blue}`);
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`${colors.reset}\n`);

    if (organized > 0) {
        console.log(`${colors.cyan}💡 Próximos passos:${colors.reset}`);
        console.log(`   1. Verificar se os ícones foram organizados corretamente`);
        console.log(`   2. Executar: node scripts/utils/update-omni-db.js`);
        console.log(`   3. Recarregar Foundry VTT (F5)\n`);
    }
}

// Executa
try {
    organizeAllIcons();
} catch (error) {
    console.error(`${colors.red}❌ Erro fatal:${colors.reset}`, error);
    process.exit(1);
}
