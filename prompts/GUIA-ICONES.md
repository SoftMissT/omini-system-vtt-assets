# 🎨 GUIA DE ÍCONES - AXION SYSTEM

## 📋 Padrão de Nomenclatura

### ✅ FORMATO OBRIGATÓRIO

```
[tipo]-[obra]-[nome].webp
```

### 🔤 Componentes

1. **[tipo]** → Tipo do item (weapon, skill, armor, etc)
2. **[obra]** → Obra/anime (sao, solo-leveling, jjk, generic, etc)
3. **[nome]** → Nome do item (em snake_case)
4. **.webp** → Extensão (pode ser .webp, .png, .jpg)

---

## 📦 Exemplos Práticos

### ⚔️ Armas (Weapons)

```
weapon-sao-elucidator.webp
weapon-sao-dark_repulsor.webp
weapon-solo-leveling-demon_kings_dagger.webp
weapon-jjk-playful_cloud.webp
weapon-highschool-dxd-boosted_gear.webp
weapon-demon-slayer-nichirin_sword.webp
weapon-generic-legendary_sword.webp
```

### ⚡ Skills

```
skill-sao-starburst_stream.webp
skill-solo-leveling-shadow_extraction.webp
skill-jjk-domain_expansion.webp
skill-jjk-cursed_speech.webp
skill-demon-slayer-water_breathing.webp
skill-generic-fireball.webp
```

### 🛡️ Armaduras (Armors)

```
armor-sao-knight_of_blood.webp
armor-solo-leveling-shadow_armor.webp
armor-jjk-cursed_robes.webp
armor-generic-dragon_plate.webp
```

### 💎 Acessórios (Accessories)

```
accessory-solo-leveling-ring_of_shadows.webp
accessory-highschool-dxd-sacred_gear.webp
accessory-generic-magic_ring.webp
```

### 🧪 Consumíveis (Consumables)

```
consumable-sao-healing_crystal.webp
consumable-solo-leveling-mana_potion.webp
consumable-generic-health_potion.webp
```

---

## 🚀 Workflow de Organização

### 1️⃣ Gerar Ícones no Midjourney

Use os prompts gerados pelo AXION SYSTEM e baixe as imagens.

### 2️⃣ Renomear Arquivos

Renomeie seguindo o padrão:
```
weapon-sao-elucidator.webp
skill-jjk-domain_expansion.webp
```

**⚠️ IMPORTANTE:**
- Use **hífen** (`-`) para separar tipo, obra e nome
- Use **underscore** (`_`) para espaços no nome do item
- Tudo em **minúsculas**
- Sem caracteres especiais (acentos, ç, etc)

### 3️⃣ Colocar na Pasta Temporária

Coloque **TODOS** os ícones em:
```
assets/icons/_temp/
```

**Exemplo:**
```
assets/icons/_temp/
├── weapon-sao-elucidator.webp
├── weapon-sao-dark_repulsor.webp
├── skill-solo-leveling-shadow_extraction.webp
├── skill-jjk-domain_expansion.webp
└── consumable-generic-health_potion.webp
```

### 4️⃣ Executar Organizador

```bash
node scripts/utils/organize-icons.js
```

### 5️⃣ Resultado

O script irá **automaticamente**:
- ✅ Criar pastas necessárias
- ✅ Mover ícones para locais corretos
- ✅ Mostrar progresso

**Resultado Final:**
```
assets/icons/
├── weapons/
│   ├── sao/
│   │   ├── elucidator.webp
│   │   └── dark_repulsor.webp
│   ├── solo-leveling/
│   │   └── demon_kings_dagger.webp
│   └── jjk/
│       └── playful_cloud.webp
├── skills/
│   ├── solo-leveling/
│   │   └── shadow_extraction.webp
│   └── jjk/
│       └── domain_expansion.webp
└── consumables/
    └── generic/
        └── health_potion.webp
```

---

## 🎯 Tabela de Obras Suportadas

| Código | Nome Completo | Exemplo |
|--------|---------------|---------|
| `sao` | Sword Art Online | `weapon-sao-elucidator.webp` |
| `solo-leveling` | Solo Leveling | `skill-solo-leveling-arise.webp` |
| `jjk` | Jujutsu Kaisen | `weapon-jjk-playful_cloud.webp` |
| `highschool-dxd` | Highschool DxD | `weapon-highschool-dxd-boosted_gear.webp` |
| `demon-slayer` | Demon Slayer | `weapon-demon-slayer-nichirin_sword.webp` |
| `naruto` | Naruto | `weapon-naruto-kunai.webp` |
| `one-piece` | One Piece | `weapon-one-piece-wado_ichimonji.webp` |
| `bleach` | Bleach | `weapon-bleach-zangetsu.webp` |
| `generic` | Genérico/Original | `weapon-generic-legendary_sword.webp` |

---

## 🔧 Tipos Suportados

| Tipo | Singular | Plural | Exemplo |
|------|----------|--------|---------|
| Arma | `weapon` | `weapons` | `weapon-sao-elucidator.webp` |
| Skill | `skill` | `skills` | `skill-jjk-domain_expansion.webp` |
| Armadura | `armor` | `armors` | `armor-sao-knight_armor.webp` |
| Acessório | `accessory` | `accessories` | `accessory-solo-leveling-ring.webp` |
| Consumível | `consumable` | `consumables` | `consumable-sao-health_potion.webp` |
| Classe | `class` | `classes` | `class-sao-swordsman.webp` |
| Montaria | `mount` | `mounts` | `mount-solo-leveling-fenrir.webp` |
| Pet | `pet` | `pets` | `pet-solo-leveling-igris.webp` |

**⚠️ NOTA:** Você pode usar singular ou plural, o script normaliza automaticamente!

---

## ❌ Erros Comuns

### ❌ ERRADO

```
Elucidator.webp                    (falta tipo e obra)
weapon-Elucidator.webp             (falta obra)
weapon_sao_elucidator.webp         (underscore ao invés de hífen)
weapon-sao-Elucidator.webp         (maiúsculas)
weapon-sao-elucidator com espaços.webp  (espaços)
weapon-SAO-elucidator.webp         (obra em maiúsculas)
Weapon-SAO-Elucidator.WEBP         (tudo errado!)
```

### ✅ CORRETO

```
weapon-sao-elucidator.webp
weapon-solo-leveling-demon_kings_dagger.webp
skill-jjk-domain_expansion.webp
consumable-generic-health_potion.webp
```

---

## 💡 Dicas

### 📝 Conversão de Nomes

| Nome Original | Nome Correto |
|---------------|--------------|
| "Dark Repulsor" | `dark_repulsor` |
| "Domain Expansion" | `domain_expansion` |
| "Demon King's Dagger" | `demon_kings_dagger` |
| "Boosted Gear" | `boosted_gear` |
| "Shadow Extraction" | `shadow_extraction` |

### 🔄 Renomeação em Lote

**Windows (PowerShell):**
```powershell
# Converter espaços para underscore
Get-ChildItem *.webp | Rename-Item -NewName { $_.Name -replace ' ','_' }

# Converter para minúsculas
Get-ChildItem *.webp | Rename-Item -NewName { $_.Name.ToLower() }
```

**Linux/Mac:**
```bash
# Converter espaços para underscore
for f in *.webp; do mv "$f" "${f// /_}"; done

# Converter para minúsculas
for f in *.webp; do mv "$f" "${f,,}"; done
```

---

## 🎨 Formatos Suportados

- ✅ `.webp` (recomendado - menor tamanho)
- ✅ `.png` (boa qualidade)
- ✅ `.jpg` / `.jpeg` (aceitável)

**⚠️ Recomendação:** Use sempre `.webp` para melhor performance!

---

## 📋 Checklist Rápido

Antes de organizar, verifique:

- [ ] Todos os arquivos seguem o padrão `[tipo]-[obra]-[nome].webp`
- [ ] Nomes estão em **minúsculas**
- [ ] Espaços foram substituídos por **underscore** (`_`)
- [ ] Não há caracteres especiais (acentos, ç, etc)
- [ ] Arquivos estão em `assets/icons/_temp/`

Se tudo OK, execute:
```bash
node scripts/utils/organize-icons.js
```

---

## 🆘 Troubleshooting

### Problema: "Formato incorreto"

**Causa:** Nome do arquivo não segue o padrão

**Solução:**
```
ERRADO: elucidator.webp
CORRETO: weapon-sao-elucidator.webp
```

### Problema: "Tipo não suportado"

**Causa:** Tipo de item não reconhecido

**Solução:** Use apenas os tipos da lista:
- `weapon`, `skill`, `armor`, `accessory`, `consumable`, `class`, `mount`, `pet`

### Problema: "Pasta não criada"

**Causa:** Permissões ou path incorreto

**Solução:**
```bash
# Criar manualmente
mkdir -p assets/icons/_temp
```

---

**Desenvolvido por:** SoftMissT
**Sistema:** AXION SYSTEM v1.0
**Powered by:** Claude Code
