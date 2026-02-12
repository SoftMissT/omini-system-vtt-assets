# ��� RESPIRAÇÃO DA PEDRA

**Categoria:** Skill System
**Raridade:** Épico (Sistema completo)
**Obra:** Demon Slayer
**Cor:** #8D6027

---

## ��� Sistema Completo (6 Skills)

### 1. Passiva: SEKISHIN
- Movimento ≤1.5m → RD = Mod.CORPO
- Imunidades: Empurrado, Derrubado
- Reverberação ao bloquear

### 2. Forma 1: Serpente Gêmea (Ação Padrão)
| Nv | Dano | PC | DPR |
|----|------|----|-----|
| 1 | 1d10 | 2 | 5.5 |
| 4 | 2d10 | 7 | 11.0 |

**Efeito:** Ignora 3 Bloqueio

### 3. Forma 2: Cume Celestial (Ação Bônus)
| Nv | Dano | PC | DPR |
|----|------|----|-----|
| 1 | 1d8+1d6 | 2 | 8.0 |
| 4 | 2d8+1d12 | 8 | 14.0 |

**Efeito:** CD 10+ESP → Desorientado

### 4. Forma 3: Pele Rochosa (Reação)
| Nv | Block | PC |
|----|-------|----|
| 1 | +2 | 1 |
| 4 | +8 | 6 |

### 5. Forma 4: Rocha Vulcânica (Ação Bônus)
| Nv | Dano | Alvos | PC | DPR |
|----|------|-------|----|-----|
| 1 | 1d8 | 2 | 3 | 9.0 |
| 4 | 2d8/1d10 | 2/3 | 6 | 16.5 |

**Efeito:** CD Acro 13 → Restrição

### 6. Forma 5: Arco do Oni (Ação Completa)
| Nv | Dano | PC | DPR |
|----|------|----|-----|
| 3 | 3d10 | 6 | 16.5 |
| 4 | 3d12 | 9 | 19.5 |

**Efeitos:** Atordoado + Derrubado
**Requisito:** Nível 3+

---

## ��� Balanceamento (GOHAN)

**Comparação D&D 5e:**
- Fighter Nv10 (2 ataques): 19 DPR
- Forma 5 Nv4: 19.5 DPR
- **Margem: 2.6%** ✓

**Trade-off Passiva:**
- Ganho: +4 RD, imunidades
- Custo: Mobilidade (-66%)

**Veredito:** ✅ Sistema balanceado

---

## ��� Estrutura de Arquivos
```
items/skills/epico/
├── pedra_passiva_sekishin.json
├── pedra_forma_01_serpente_gemea.json
├── pedra_forma_02_cume_celestial.json
├── pedra_forma_03_pele_rochosa.json
├── pedra_forma_04_rocha_vulcanica.json
└── pedra_forma_05_arco_oni.json

macros/items/skills/demon-slayer/
└── (macros a serem criados)

assets/icons/skills/demon-slayer/
├── sekishin.webp
├── serpente_gemea.webp
├── cume_celestial.webp
├── pele_rochosa.webp
├── rocha_vulcanica.webp
└── arco_oni.webp

docs/midjourney/skills/epico/
├── sekishin_MIDJOURNEY.md
├── serpente_gemea_MIDJOURNEY.md
├── cume_celestial_MIDJOURNEY.md
├── pele_rochosa_MIDJOURNEY.md
├── rocha_vulcanica_MIDJOURNEY.md
└── arco_oni_MIDJOURNEY.md
```

---

## ��� Próximos Passos

1. Gerar ícones Midjourney (6 prompts prontos)
2. Renomear: `skill-demon-slayer-[nome].webp`
3. Colocar em: `assets/icons/_temp/`
4. Executar: `node scripts/utils/organize-icons.js`
5. Executar: `node scripts/utils/update-omni-db.js`
6. Recarregar Foundry VTT (F5)

---

**Prompt Original:**
```
Respiração da Pedra - Sistema completo
6 skills (1 passiva + 5 formas)
Kazuyoshi Iwamoto
Cor: #8D6027
```

**Gerado por:** MAKO-SYN05 v1.0
**Data:** $(date +"%Y-%m-%d %H:%M:%S")
**Obra:** demon-slayer
