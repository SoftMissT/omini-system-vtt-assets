# 🏗️ ESTRUTURA HÍBRIDA - OMINI SYSTEM VTT

## 📋 Visão Geral

Este repositório usa uma **estrutura híbrida** que combina duas filosofias de organização:

1. **Por FUNÇÃO** → Para macros do sistema (combat, core, helpers, huds, radar)
2. **Por TIPO + OBRA** → Para macros de itens (weapons, skills, consumables por SAO, Solo Leveling, JJK, etc)

---

## 📂 Estrutura Completa

```
omini-system-vtt/
│
├── macros/                         ← HÍBRIDO
│   ├── combat/                     ← POR FUNÇÃO (sistema interno)
│   ├── core/
│   ├── helpers/
│   ├── huds/
│   ├── integrators/
│   ├── omni-v4/
│   ├── radar/
│   └── items/                      ← POR TIPO + OBRA (conteúdo de itens)
│       ├── weapons/
│       │   ├── sao/
│       │   ├── solo-leveling/
│       │   ├── jjk/
│       │   ├── highschool-dxd/
│       │   └── generic/
│       ├── skills/
│       │   ├── sao/
│       │   ├── solo-leveling/
│       │   └── jjk/
│       ├── consumables/
│       ├── armors/
│       └── classes/
│
├── assets/
│   ├── branding/                   ← Logos e branding do sistema
│   ├── icons/                      ← Ícones por TIPO + OBRA
│   │   ├── weapons/
│   │   │   ├── sao/
│   │   │   ├── solo-leveling/
│   │   │   ├── jjk/
│   │   │   ├── highschool-dxd/
│   │   │   └── generic/
│   │   ├── skills/
│   │   │   ├── sao/
│   │   │   ├── solo-leveling/
│   │   │   └── jjk/
│   │   ├── armors/
│   │   ├── accessories/
│   │   ├── consumables/
│   │   └── classes/
│   ├── vfx/                        ← Efeitos visuais por TIPO
│   │   ├── weapons/
│   │   ├── skills/
│   │   ├── ultimate/
│   │   └── environmental/
│   └── sfx/                        ← Efeitos sonoros por TIPO
│       ├── weapons/
│       ├── skills/
│       ├── ambient/
│       └── ui/
│
└── items/                          ← JSONs por RARIDADE (fonte)
    ├── weapons/
    │   ├── comum/
    │   ├── incomum/
    │   ├── raro/
    │   ├── epico/
    │   ├── lendario/
    │   ├── mitico/
    │   └── conceito/
    ├── skills/
    ├── armors/
    └── ...
```

---

## 🎯 Quando Usar Cada Estrutura

### ✅ Use `macros/[função]/` para:
- Sistemas internos do módulo
- HUDs e interfaces
- Integrações com outros módulos
- Utilitários do radar/combat/core

**Exemplos:**
- `macros/radar/absolute-detection-matrix.js`
- `macros/huds/jjk-character-sheet.js`
- `macros/combat/demon-slayer/RESPIRAÇÃO DA ÁGUA/`

---

### ✅ Use `macros/items/[tipo]/[obra]/` para:
- Macros de ação de itens
- Skills específicas de obras
- Consumables com efeitos customizados

**Exemplos:**
- `macros/items/weapons/sao/elucidator_action.js`
- `macros/items/skills/solo-leveling/shadow_extraction.js`
- `macros/items/weapons/jjk/playful_cloud_action.js`

---

## 📖 Obras Suportadas

| Código | Nome Completo | Diretório |
|--------|--------------|-----------|
| `sao` | Sword Art Online | `/sao/` |
| `solo-leveling` | Solo Leveling | `/solo-leveling/` |
| `jjk` | Jujutsu Kaisen | `/jjk/` |
| `highschool-dxd` | Highschool DxD | `/highschool-dxd/` |
| `generic` | Genérico/Original | `/generic/` |

---

## 🔄 Workflow de Adição de Itens

### 1️⃣ Criar JSON do Item
```bash
# items/weapons/[raridade]/[nome].json
items/weapons/lendario/elucidator.json
```

### 2️⃣ Criar Macro de Ação
```bash
# macros/items/[tipo]/[obra]/[nome]_action.js
macros/items/weapons/sao/elucidator_action.js
```

### 3️⃣ Adicionar Ícone
```bash
# assets/icons/[tipo]/[obra]/[nome].webp
assets/icons/weapons/sao/elucidator.webp
```

### 4️⃣ (Opcional) VFX e SFX
```bash
# assets/vfx/[tipo]/[nome]_[efeito].webp
assets/vfx/weapons/elucidator_slash.webp

# assets/sfx/[tipo]/[nome]_[efeito].ogg
assets/sfx/weapons/elucidator_hit.ogg
```

### 5️⃣ Atualizar Database
```bash
node scripts/utils/update-omni-db.js
```

### 6️⃣ Recarregar Foundry
Pressione **F5** no Foundry VTT para popular os compendiums.

---

## 🎨 Paths de Assets

### ❌ ERRADO (antigo)
```json
{
  "img": "modules/omini-system-assets/assets/icons/weapons/elucidator.webp"
}
```

### ✅ CORRETO (atual)
```json
{
  "img": "assets/icons/weapons/sao/elucidator.webp"
}
```

### VFX/SFX no Macro
```javascript
await OmniCore.vfx.play({
    file: "assets/vfx/weapons/elucidator_slash.webp",
    target: target,
    sound: "assets/sfx/weapons/elucidator_hit.ogg"
});
```

---

## 🚀 Exemplos Práticos

### Exemplo 1: Arma de SAO
```bash
# Estrutura de arquivos:
items/weapons/lendario/elucidator.json
macros/items/weapons/sao/elucidator_action.js
assets/icons/weapons/sao/elucidator.webp
assets/vfx/weapons/elucidator_slash.webp
docs/midjourney/weapons/lendario/elucidator_MIDJOURNEY.md
```

### Exemplo 2: Skill de Solo Leveling
```bash
# Estrutura de arquivos:
items/skills/mitico/shadow_extraction.json
macros/items/skills/solo-leveling/shadow_extraction_action.js
assets/icons/skills/solo-leveling/shadow_extraction.webp
assets/vfx/skills/shadow_extraction_activate.webp
docs/midjourney/skills/mitico/shadow_extraction_MIDJOURNEY.md
```

### Exemplo 3: Skill de JJK
```bash
# Estrutura de arquivos:
items/skills/epico/cursed_speech.json
macros/items/skills/jjk/cursed_speech_action.js
assets/icons/skills/jjk/cursed_speech.webp
assets/sfx/skills/cursed_speech_word.ogg
docs/midjourney/skills/epico/cursed_speech_MIDJOURNEY.md
```

---

## ⚠️ REGRAS IMPORTANTES

### ✅ SEMPRE:
- Use paths relativos à raiz do módulo
- Organize itens por obra quando aplicável
- Execute `update-omni-db.js` após criar JSONs
- Recarregue o Foundry para popular compendiums

### ❌ NUNCA:
- Criar subdiretórios `modules/`
- Usar paths absolutos com `modules/omini-system-assets/`
- Editar `omni-db.js` manualmente

---

## 📝 Changelog

### v1.2.0 - Estrutura Híbrida
- ✨ Adicionada organização por obra
- 📁 Criada estrutura `macros/items/[tipo]/[obra]/`
- 🎨 Expandida estrutura `assets/icons/[tipo]/[obra]/`
- 🎬 Criadas pastas `assets/vfx/` e `assets/sfx/`
- 📖 Atualizado prompt supremo de engenharia

---

**Desenvolvido por SoftMissT**
*Com apoio de IAs: Claude, Gemini, Midjourney, ChatGPT*
