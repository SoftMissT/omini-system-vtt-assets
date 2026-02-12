# 🚀 AXION PROMPT BLINDADO 2.0 - DATABASE EDITION

> **Sistema Unificado de Geração de DATABASE para Omini System VTT**
>
> Este é o prompt DEFINITIVO que gera arquivos de DATABASE:
> ✅ Detecção automática de obra e tipo
> ✅ Descrição completa do item
> ✅ Mecânicas balanceadas
> ✅ **Arquivo JSON para o compêndio**
> ✅ Prompt do Midjourney para ícone
> ✅ Nome do arquivo do ícone
> ✅ Script de importação para Foundry VTT

---

## 📝 COMO USAR (ULTRA SIMPLES)

**1. Digite o que você quer criar:**
```
Exemplo: "Preciso criar a Elucidator do Kirito"
Exemplo: "Quero fazer a Shadow Extraction do Sung Jin-Woo"
Exemplo: "Cria a Playful Cloud do JJK"
```

**2. O sistema automaticamente:**
- 🔍 Detecta a obra (SAO, Solo Leveling, JJK, etc.)
- 🎯 Detecta o tipo (weapon, skill, armor, etc.)
- 📊 Define a raridade automaticamente
- 📝 Gera descrição completa
- ⚙️ Cria mecânicas balanceadas
- 🎨 Gera prompt do Midjourney
- 📦 **Gera arquivo JSON do item**
- 📂 **Define pasta de organização**
- ✅ Fornece o nome do arquivo do ícone

**3. Você recebe:**
- Arquivo JSON pronto para salvar
- Localização exata: `packs/[tipo]/[item-id].json`
- Script de importação para Foundry
- Prompt do Midjourney
- Nome do ícone

---

## 🎯 DETECÇÃO AUTOMÁTICA DE OBRA

| Código | Nome Completo | Palavras-chave de Detecção |
|--------|---------------|----------------------------|
| `sao` | Sword Art Online | Kirito, Asuna, Elucidator, Dark Repulsor, SAO, ALO, GGO, Aincrad, Klein, Silica |
| `solo-leveling` | Solo Leveling | Sung Jin-Woo, Shadow, Monarca, Monarch, Arise, Extraction, Hunter, Igris, Beru |
| `jjk` | Jujutsu Kaisen | Gojo, Sukuna, Domain Expansion, Cursed Technique, Hollow Purple, Playful Cloud, Itadori |
| `highschool-dxd` | Highschool DxD | Issei, Rias, Boosted Gear, Devil, Sacred Gear, Dragon, Balance Breaker |
| `demon-slayer` | Demon Slayer | Tanjiro, Nezuko, Breathing, Hinokami, Water Breathing, Thunder Breathing, Hashira |
| `naruto` | Naruto | Naruto, Sasuke, Sharingan, Rasengan, Chidori, Jutsu, Chakra, Hokage |
| `one-piece` | One Piece | Luffy, Zoro, Devil Fruit, Haki, Gomu Gomu, Grand Line, Pirate |
| `bleach` | Bleach | Ichigo, Zanpakuto, Bankai, Shikai, Hollow, Soul Reaper, Getsuga |
| `generic` | Genérico | Qualquer outro ou sem obra específica |

---

## 🎲 DETECÇÃO AUTOMÁTICA DE TIPO

| Tipo | Palavras-chave | Pack Foundry | Nome Técnico |
|------|----------------|--------------|--------------|
| **weapon** | espada, arma, blade, dagger, bow, lança, katana | Omini - Armas | omini-weapons |
| **skill** | técnica, skill, jutsu, magia, spell, breathing, domain | Omini - Habilidades | omini-skills |
| **armor** | armadura, robes, vest, proteção, outfit | Omini - Armaduras | omini-armors |
| **accessory** | anel, colar, ring, necklace, acessório, artifact | Omini - Acessórios | omini-accessories |
| **consumable** | poção, potion, elixir, consumível | Omini - Consumíveis | omini-consumables |
| **pet** | pet, familiar, companheiro, mascote | Omini - Pets & Familiares | omini-pets |
| **mount** | montaria, mount, veículo, transporte | Omini - Montarias | omini-mounts |
| **summon** | invocação, summon, criatura, spirit | Omini - Invocações | omini-summons |
| **material** | material, recurso, ore, cristal, essence | Omini - Materiais | omini-materials |
| **housing** | casa, base, propriedade, território | Omini - Habitação | omini-housing |
| **class** | classe, job, profissão | Omini - Classes | omini-classes |
| **background** | background, origem, histórico | Omini - Backgrounds | omini-backgrounds |
| **npc** | personagem, npc, character | Omini - NPCs | omini-npcs |

---

## ⭐ TABELA DE RARIDADES

| Código | Nome | Descrição | Cor |
|--------|------|-----------|-----|
| `common` | Comum | Itens básicos e facilmente encontrados | Cinza |
| `uncommon` | Incomum | Itens aprimorados, raros mas não únicos | Verde |
| `rare` | Raro | Itens poderosos e difíceis de obter | Azul |
| `epic` | Épico | Itens muito raros, peças importantes | Roxo |
| `legendary` | Lendário | Itens únicos, artefatos famosos | Dourado |
| `mythic` | Mítico | Itens divinos, poderes transcendentais | Vermelho |
| `exotic` | Exótico | Itens além da compreensão, únicos absolutos | Arco-íris |

---

## 📋 TEMPLATE DE GERAÇÃO

### **FASE 1: DETECÇÃO AUTOMÁTICA**

```markdown
🔍 ANÁLISE INICIAL
Nome fornecido: [NOME DO ITEM]
Obra detectada: [CÓDIGO DA OBRA] - [NOME COMPLETO]
Tipo detectado: [TIPO]
Raridade sugerida: [RARIDADE]
Pack de destino: omini-[tipo_plural]
Pasta de organização: [OBRA]
```

### **FASE 2: DESCRIÇÃO FUNCIONAL**

```markdown
📝 DESCRIÇÃO DO ITEM

**Função Principal:**
[O que o item faz? Qual é seu propósito?]

**Origem na Obra:**
[De onde vem? Quem usou? Qual episódio/capítulo?]

**Características Visuais:**
- Cor principal: [COR]
- Material: [MATERIAL]
- Forma: [FORMA]
- Efeitos visuais: [BRILHOS, AURAS, PARTÍCULAS]
- Detalhes únicos: [MARCAS, SÍMBOLOS, RUNAS]

**Lore e Contexto:**
[História do item, significado, importância na obra]
```

### **FASE 3: MECÂNICAS DE JOGO**

```markdown
⚙️ MECÂNICAS E ATRIBUTOS

**Estatísticas Base:**
[Para weapons: Dano, alcance, tipo de dano]
[Para skills: Custo de mana/energia, cooldown, duração]
[Para armors: Defesa, resistências]
[Para accessories: Bônus de atributos]

**Efeitos Especiais:**
- [Efeito 1]
- [Efeito 2]
- [Efeito 3]

**Requisitos:**
- Nível mínimo: [NÍVEL]
- Atributos necessários: [ATRIBUTOS]
- Classe permitida: [CLASSES]

**Balanceamento:**
[Justificativa do poder do item baseado na raridade]
```

### **FASE 4: PROMPT DO MIDJOURNEY**

```markdown
🎨 PROMPT PARA GERAÇÃO DO ÍCONE

/imagine prompt: A perfect fusion of Ufotable anime and Redice Studio manhwa art,
premium game UI icon, hexagonal golden frame with glowing edges, floating pixel particles,
dark atmospheric background, [DESCRIÇÃO VISUAL DETALHADA DO ITEM COM CORES, MATERIAIS,
FORMA E EFEITOS]. Sharp iconography, clean geometric symbol, dramatic rim lighting,
high contrast gradient, volumetric glow, professional color grading, 8k clarity
--ar 1:1 --niji 7 --no character, person, face, hands, body, text, logo, watermark,
blurry, noisy, flat

📦 NOME DO ARQUIVO DO ÍCONE:
[tipo]-[obra]-[nome_do_item].webp

Exemplo: weapon-sao-elucidator.webp

🔄 WORKFLOW DO ÍCONE:
1. Gerar no Midjourney
2. Baixar e renomear: [tipo]-[obra]-[nome].webp
3. Colocar em: assets/icons/_temp/
4. Executar: node scripts/utils/organize-icons.js
5. ✅ Ícone organizado em: assets/icons/[tipo_plural]/[obra]/[nome].webp
```

### **FASE 5: ARQUIVO JSON DO ITEM (DATABASE)**

```json
{
  "name": "[NOME DO ITEM]",
  "type": "Item",
  "_id": "[NOME_NORMALIZADO]_[OBRA]",
  "img": "modules/omini-system-vtt/assets/icons/[TIPO_PLURAL]/[OBRA]/[NOME].webp",
  "system": {
    "description": {
      "value": "<h2>📖 Descrição</h2><p>[DESCRIÇÃO COMPLETA]</p><h3>🎯 Origem</h3><p>[ORIGEM NA OBRA]</p><h3>⚙️ Mecânicas</h3><ul><li>[MECÂNICA 1]</li><li>[MECÂNICA 2]</li></ul><h3>✨ Efeitos Especiais</h3><p>[EFEITOS]</p>",
      "chat": "",
      "unidentified": ""
    },
    "source": "[NOME DA OBRA]",
    "quantity": 1,
    "weight": 0,
    "price": 0,
    "attunement": 0,
    "equipped": false,
    "rarity": "[RARIDADE]",
    "identified": true,

    // CAMPOS ESPECÍFICOS POR TIPO (weapon, skill, armor, etc.)
    // [CAMPOS DINÂMICOS BASEADOS NO TIPO DETECTADO]

    "obra": "[CÓDIGO_OBRA]",
    "category": "[TIPO]",
    "version": "2.0.0"
  },
  "effects": [],
  "folder": "[NOME_PASTA_OBRA]",
  "flags": {
    "omini-system-vtt": {
      "obra": "[CÓDIGO_OBRA]",
      "sourceSystem": "AXION-BLINDADO-2.0",
      "generatedDate": "[DATA_ISO]",
      "rarity": "[RARIDADE]",
      "category": "[TIPO]"
    }
  }
}
```

**📂 SALVAR COMO:**
```
packs/[tipo_plural]/[nome-normalizado]_[obra].json
```

**Exemplo:**
```
packs/weapons/elucidator_sao.json
```

### **FASE 6: SCRIPT DE IMPORTAÇÃO**

```javascript
// ============================================
// 📦 SCRIPT DE IMPORTAÇÃO PARA FOUNDRY VTT
// ============================================
// INSTRUÇÕES:
// 1. Salve o JSON acima em: packs/[tipo]/[nome].json
// 2. Copie este script
// 3. Abra o Foundry VTT (F12 - Console)
// 4. Cole e execute
// 5. ✅ Item importado para o compêndio!
// ============================================

(async () => {
    // 📋 CARREGAR JSON DO ARQUIVO
    const itemJSON = `[COLE O JSON COMPLETO AQUI]`;

    const itemData = JSON.parse(itemJSON);

    // 📦 COMPÊNDIO DE DESTINO
    const packName = "omini-system-vtt.omini-[TIPO_PLURAL]";
    const pack = game.packs.get(packName);

    if (!pack) {
        ui.notifications.error(`❌ Compêndio ${packName} não encontrado!`);
        return;
    }

    // 📁 ESTRUTURA DE PASTAS POR OBRA
    const obraFolders = {
        "sao": "SAO - Sword Art Online",
        "solo-leveling": "Solo Leveling",
        "jjk": "JJK - Jujutsu Kaisen",
        "highschool-dxd": "Highschool DxD",
        "demon-slayer": "Demon Slayer",
        "naruto": "Naruto",
        "one-piece": "One Piece",
        "bleach": "Bleach",
        "generic": "Generic"
    };

    const folderName = obraFolders["[CÓDIGO_OBRA]"] || "Generic";
    let folder = pack.folders.find(f => f.name === folderName);

    if (!folder) {
        folder = await Folder.create({
            name: folderName,
            type: "Item",
            sorting: "a",
            parent: null
        }, { pack: pack.collection });
        console.log(`📁 Pasta "${folderName}" criada!`);
    }

    // ✅ IMPORTAR ITEM PARA O COMPÊNDIO
    itemData.folder = folder.id;
    const item = await Item.create(itemData);
    await pack.importDocument(item);
    await item.delete();

    ui.notifications.info(`✅ "${itemData.name}" importado para ${pack.metadata.label} > ${folderName}`);
    console.log(`✅ Item importado:`, itemData.name);
    console.log(`📂 Localização: ${pack.metadata.label} > ${folderName}`);
})();
```

---

## 🎯 EXEMPLO COMPLETO: ELUCIDATOR (SAO)

### **ENTRADA DO USUÁRIO:**
```
"Preciso criar a Elucidator do Kirito"
```

---

### **🔍 FASE 1: DETECÇÃO AUTOMÁTICA**

```markdown
🔍 ANÁLISE INICIAL
Nome fornecido: Elucidator
Obra detectada: sao - Sword Art Online
Tipo detectado: weapon
Raridade sugerida: legendary
Pack de destino: omini-weapons
Pasta de organização: SAO - Sword Art Online
```

---

### **📝 FASE 2: DESCRIÇÃO FUNCIONAL**

```markdown
📝 DESCRIÇÃO DO ITEM

**Função Principal:**
Espada longa de uma mão, uma das armas principais de Kirito. Parte do conjunto de espadas duplas.

**Origem na Obra:**
Obtida por Kirito no 50º andar de Aincrad após derrotar um boss raid. Usada em conjunto
com a Dark Repulsor para o estilo Dual Blades.

**Características Visuais:**
- Cor principal: Preto obsidiana com brilho vermelho-carmesim
- Material: Obsidiana encantada de alto nível
- Forma: Espada longa reta com lâmina de fio único
- Efeitos visuais: Rastro vermelho ao atacar, aura sombria ao redor da lâmina
- Detalhes únicos: Empunhadura ergonômica preta, guarda minimalista

**Lore e Contexto:**
A Elucidator foi a primeira espada rara que Kirito obteve sozinho após se tornar um
jogador solo. Representa sua determinação e força. O nome vem de "Elucidate" (elucidar),
simbolizando a busca pela verdade em Aincrad.
```

---

### **⚙️ FASE 3: MECÂNICAS DE JOGO**

```markdown
⚙️ MECÂNICAS E ATRIBUTOS

**Estatísticas Base:**
- Dano: 2d8 + 5 (Cortante)
- Alcance: 1.5m (Melee)
- Peso: 1.2 kg (Leve)
- Durabilidade: 850/850
- Velocidade de Ataque: Rápida

**Efeitos Especiais:**
- **Fio Sombrio**: Ataques críticos causam 1d6 de dano necrótico adicional
- **Rastro Carmesim**: +2 em rolagens de ataque quando usado com outra espada
- **Dança das Lâminas**: Permite usar a ação "Dual Wielding" sem penalidade
- **Ressonância de Aincrad**: +3 de bônus contra monstros do tipo "Boss"

**Requisitos:**
- Nível mínimo: 45
- Atributos necessários: 16 DEX, 14 STR
- Classe permitida: Espadachim, Dual Wielder

**Balanceamento:**
Lendária - Poder justificado por ser uma das armas icônicas do protagonista.
Alto dano base balanceado por requisitos elevados de atributos.
```

---

### **🎨 FASE 4: PROMPT DO MIDJOURNEY**

```markdown
🎨 PROMPT PARA GERAÇÃO DO ÍCONE

/imagine prompt: A perfect fusion of Ufotable anime and Redice Studio manhwa art,
premium game UI icon, hexagonal golden frame with glowing edges, floating pixel particles,
dark atmospheric background, legendary obsidian longsword with crimson glow, sharp black
blade with red energy trails, elegant dark grip with minimalist guard, mystical shadow
aura, dramatic lighting, perfect blade geometry. Sharp iconography, clean geometric symbol,
dramatic rim lighting, high contrast gradient, volumetric glow, professional color grading,
8k clarity --ar 1:1 --niji 7 --no character, person, face, hands, body, text, logo,
watermark, blurry, noisy, flat

📦 NOME DO ARQUIVO DO ÍCONE:
weapon-sao-elucidator.webp

🔄 WORKFLOW DO ÍCONE:
1. Gerar no Midjourney
2. Baixar e renomear: weapon-sao-elucidator.webp
3. Colocar em: assets/icons/_temp/
4. Executar: node scripts/utils/organize-icons.js
5. ✅ Ícone movido para: assets/icons/weapons/sao/elucidator.webp
```

---

### **💾 FASE 5: ARQUIVO JSON (DATABASE)**

**📂 Salvar como:** `packs/weapons/elucidator_sao.json`

```json
{
  "name": "Elucidator",
  "type": "Item",
  "_id": "elucidator_sao",
  "img": "modules/omini-system-vtt/assets/icons/weapons/sao/elucidator.webp",
  "system": {
    "description": {
      "value": "<h2>📖 Descrição</h2><p>Espada longa de uma mão forjada em obsidiana encantada, uma das armas principais de Kirito. Com sua lâmina negra e brilho carmesim, a Elucidator é reconhecida como uma das espadas mais poderosas de Aincrad.</p><h3>🎯 Origem</h3><p>Obtida por Kirito no 50º andar de Aincrad após derrotar um boss raid. Usada em conjunto com a Dark Repulsor para o lendário estilo Dual Blades. O nome vem de \"Elucidate\", simbolizando a busca pela verdade.</p><h3>⚙️ Mecânicas</h3><ul><li><strong>Dano:</strong> 2d8 + 5 (Cortante)</li><li><strong>Alcance:</strong> 1.5m (Melee)</li><li><strong>Velocidade:</strong> Rápida</li><li><strong>Durabilidade:</strong> 850/850</li></ul><h3>✨ Efeitos Especiais</h3><ul><li><strong>Fio Sombrio:</strong> Críticos causam +1d6 necrótico</li><li><strong>Rastro Carmesim:</strong> +2 ataque com dual wielding</li><li><strong>Dança das Lâminas:</strong> Sem penalidade em duas armas</li><li><strong>Ressonância de Aincrad:</strong> +3 contra bosses</li></ul><h3>📊 Requisitos</h3><p><strong>Nível:</strong> 45 | <strong>DEX:</strong> 16 | <strong>STR:</strong> 14</p>",
      "chat": "",
      "unidentified": ""
    },
    "source": "Sword Art Online",
    "quantity": 1,
    "weight": 1.2,
    "price": 0,
    "attunement": 0,
    "equipped": false,
    "rarity": "legendary",
    "identified": true,

    "damage": {
      "parts": [["2d8 + 5", "slashing"]],
      "versatile": ""
    },
    "range": {
      "value": null,
      "long": null,
      "units": ""
    },
    "weaponType": "longsword",
    "properties": {
      "ver": false,
      "lgt": true,
      "fin": true
    },
    "attackBonus": "+2",
    "criticalDamage": "1d6",
    "durability": {
      "current": 850,
      "max": 850
    },
    "requirements": {
      "level": 45,
      "dex": 16,
      "str": 14
    },

    "obra": "sao",
    "category": "weapon",
    "version": "2.0.0"
  },
  "effects": [
    {
      "name": "Fio Sombrio",
      "icon": "modules/omini-system-vtt/assets/icons/effects/shadow-blade.webp",
      "changes": [
        {
          "key": "system.bonuses.criticalDamage",
          "mode": 2,
          "value": "1d6",
          "priority": 20
        }
      ],
      "disabled": false,
      "duration": {},
      "flags": {}
    },
    {
      "name": "Rastro Carmesim",
      "icon": "modules/omini-system-vtt/assets/icons/effects/dual-wield.webp",
      "changes": [
        {
          "key": "system.bonuses.attack.melee",
          "mode": 2,
          "value": "+2",
          "priority": 20
        }
      ],
      "disabled": false,
      "duration": {},
      "flags": {}
    }
  ],
  "folder": null,
  "flags": {
    "omini-system-vtt": {
      "obra": "sao",
      "sourceSystem": "AXION-BLINDADO-2.0",
      "generatedDate": "2026-02-12T05:30:00.000Z",
      "rarity": "legendary",
      "category": "weapon"
    }
  }
}
```

---

### **📥 FASE 6: IMPORTAR PARA FOUNDRY**

**Método 1: Via Interface (Recomendado)**

```
1. Abrir Foundry VTT
2. Ir em: Compêndios > Omini - Armas
3. Clicar com botão direito > "Import Data"
4. Selecionar o arquivo: packs/weapons/elucidator_sao.json
5. ✅ Item importado!
```

**Método 2: Via Console**

```javascript
// 1. Abrir Foundry VTT
// 2. Pressionar F12 (Console)
// 3. Colar e executar:

(async () => {
    const itemData = {
      "name": "Elucidator",
      "type": "Item",
      "_id": "elucidator_sao",
      "img": "modules/omini-system-vtt/assets/icons/weapons/sao/elucidator.webp",
      // ... (JSON completo aqui)
    };

    const pack = game.packs.get("omini-system-vtt.omini-weapons");

    let folder = pack.folders.find(f => f.name === "SAO - Sword Art Online");
    if (!folder) {
        folder = await Folder.create({
            name: "SAO - Sword Art Online",
            type: "Item",
            sorting: "a"
        }, { pack: pack.collection });
    }

    itemData.folder = folder.id;
    const item = await Item.create(itemData);
    await pack.importDocument(item);
    await item.delete();

    ui.notifications.info(`✅ Elucidator importada para Omini - Armas > SAO`);
})();
```

---

## 🔄 WORKFLOW COMPLETO RESUMIDO

```
1. 💬 VOCÊ DIZ: "Quero criar [NOME DO ITEM]"
                    ↓
2. 🔍 SISTEMA DETECTA: Obra + Tipo + Raridade
                    ↓
3. 📝 SISTEMA GERA: Descrição + Mecânicas + Lore
                    ↓
4. 💾 SISTEMA CRIA: Arquivo JSON do item
                    ↓
5. 📂 VOCÊ SALVA: packs/[tipo]/[nome].json
                    ↓
6. 🎨 GERAR ÍCONE: Midjourney + organize-icons.js
                    ↓
7. 📥 IMPORTAR: Via interface ou console do Foundry
                    ↓
8. ✅ PRONTO: Item no compêndio, organizado por obra!
```

---

## 📦 ESTRUTURA DE PASTAS DOS PACKS

```
packs/
├── weapons/
│   ├── elucidator_sao.json
│   ├── dark_repulsor_sao.json
│   └── shadow_dagger_solo-leveling.json
├── skills/
│   ├── shadow_extraction_solo-leveling.json
│   └── domain_expansion_jjk.json
├── armors/
│   └── shadow_armor_solo-leveling.json
└── ... (outros tipos)
```

---

## 🎓 CAMPOS DINÂMICOS POR TIPO

### **WEAPON (Armas)**
```json
{
  "damage": {
    "parts": [["XdY + Z", "tipo"]],
    "versatile": ""
  },
  "weaponType": "longsword|dagger|bow|spear",
  "properties": {
    "ver": false,
    "lgt": true,
    "fin": false,
    "hvy": false,
    "two": false
  },
  "attackBonus": "+X",
  "durability": { "current": 0, "max": 0 }
}
```

### **SKILL (Habilidades)**
```json
{
  "activation": {
    "type": "action|bonus|reaction",
    "cost": 1,
    "condition": ""
  },
  "duration": {
    "value": null,
    "units": "inst|round|minute|hour"
  },
  "target": {
    "value": 1,
    "width": null,
    "units": "",
    "type": "creature|object|space"
  },
  "range": {
    "value": 10,
    "long": null,
    "units": "ft|m|self"
  },
  "uses": {
    "value": 0,
    "max": 0,
    "per": "sr|lr|day"
  },
  "consume": {
    "type": "ammo|attribute|material|charges",
    "target": "",
    "amount": 0
  }
}
```

### **ARMOR (Armaduras)**
```json
{
  "armor": {
    "type": "light|medium|heavy|natural",
    "value": 10,
    "dex": null
  },
  "strength": 0,
  "stealth": false,
  "proficient": true
}
```

### **ACCESSORY (Acessórios)**
```json
{
  "attunement": 0,
  "equipped": false,
  "bonuses": {
    "str": 0,
    "dex": 0,
    "con": 0,
    "int": 0,
    "wis": 0,
    "cha": 0
  }
}
```

---

## 🛡️ VANTAGENS DO SISTEMA DATABASE

✅ **Arquivos JSON**: Versionáveis com Git
✅ **Organizado**: Por tipo e obra
✅ **Portável**: Fácil backup e compartilhamento
✅ **Editável**: Pode ser editado manualmente
✅ **Importável**: Direto para os compêndios do Foundry
✅ **Rastreável**: Metadados completos
✅ **Escalável**: Suporta múltiplas obras
✅ **Profissional**: Estrutura de database real

---

## 📚 ARQUIVOS DO SISTEMA

```
📁 omini-system-vtt-assets/
├── 📁 prompts/
│   ├── AXION PROMPT BLINDADO 2.0.md ⭐ (ESTE ARQUIVO)
│   └── README.md (Índice)
├── 📁 packs/ (DATABASE - Compêndios)
│   ├── weapons/
│   ├── skills/
│   ├── armors/
│   └── ... (JSONs dos itens)
├── 📁 assets/icons/
│   ├── _temp/
│   └── [tipo]/[obra]/ (Ícones organizados)
└── 📁 scripts/utils/
    └── organize-icons.js
```

---

## ⚠️ IMPORTANTE

### **Este sistema gera DATABASE, não código de console!**

❌ **NÃO FAZER:**
- Executar código JavaScript diretamente no console para criar itens
- Modificar compêndios manualmente item por item

✅ **FAZER:**
- Gerar arquivo JSON do item
- Salvar em `packs/[tipo]/[nome].json`
- Importar via interface ou script
- Versionando tudo com Git

---

**📌 Criado por:** SoftMissT
**🤖 Powered by:** Claude Sonnet 4.5, Gemini, Midjourney
**📅 Versão:** 2.0.0 - DATABASE EDITION
**📖 Sistema:** Omini System VTT para Foundry VTT v13
**⚡ Formato:** JSON Database + Import Scripts

---

## 🚀 AGORA É SUA VEZ!

Diga o que você quer criar e o **AXION BLINDADO 2.0** vai gerar o arquivo JSON completo do database! 🎮✨
