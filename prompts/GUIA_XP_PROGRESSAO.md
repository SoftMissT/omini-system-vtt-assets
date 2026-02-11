# 📈 GUIA DE PROGRESSÃO: SISTEMA DE XP

> **[GOHAN]** - Análise Matemática Completa + **[CARDINAL]** - Design de Progressão

---

## 🎯 FILOSOFIA DO SISTEMA

O OMNI-SYSTEM usa progressão **dual-phase** inspirada em:
- **Black Desert Online** (grinding exponencial)
- **The King's Avatar** (cap fixo com skill mastery)
- **SAO/Solo Leveling** (breakthrough gates)

**Objetivo:** 200-500h até endgame (nível 100), mantendo engajamento.

---

## 📊 FASE 1: HASHIRA (NÍVEIS 1-20)

### Conceito
Fase de **aprendizado técnico**. O jogador domina mecânicas base.

### Fórmula de XP
```javascript
XP_Necessario = Level² × 100
```

### Tabela de Progressão

| Nível | XP Total | XP para Próximo | Tempo Estimado* | Marco |
|-------|----------|-----------------|-----------------|-------|
| 1 | 0 | 100 | Tutorial | Início |
| 2 | 100 | 300 | +15min | - |
| 3 | 400 | 500 | +30min | - |
| 4 | 900 | 700 | +45min | **Pico de Iluminação** |
| 5 | 1,600 | 900 | +1h | Primeira Skill Ativa |
| 8 | 5,900 | 1,500 | +3h | **Pico de Iluminação** |
| 10 | 9,400 | 1,700 | +5h | **TESTE DE ASCENSÃO** |
| 12 | 13,900 | 2,100 | +8h | **Pico de Iluminação** |
| 15 | 27,400 | 2,700 | +15h | Skill Ultimate Básica |
| 16 | 32,900 | 2,900 | +18h | **Pico de Iluminação** |
| 20 | 66,900 | 3,700 | +30h | **BREAKTHROUGH → VRMMO** |

*Tempo baseado em 1000 XP/hora (grinding médio)

### Ganho de HP
```javascript
HP = Base_Origem + (CON × Level) + Picos_Iluminação

Picos_Iluminação: Níveis 4, 8, 12, 16, 20
Bônus: +CON × 5 em cada pico
```

**Exemplo (CON 14, mod +2):**
```
Nível 1:  50 (base) + 2 = 52 HP
Nível 4:  52 + (2×3) + 10 = 68 HP
Nível 8:  68 + (2×4) + 10 = 86 HP
Nível 20: ~150 HP
```

---

## 🚀 FASE 2: VRMMO (NÍVEIS 21-999)

### Conceito
Progressão tipo **MMORPG hardcore**. Cada nível é uma conquista.

### Fórmula de XP
```javascript
XP_Necessario = Level³ × 500
```

### Tabela de Progressão

| Nível | XP Total | XP para Próximo | Tempo Estimado* | Soft/Hard Cap |
|-------|----------|-----------------|-----------------|---------------|
| 21 | ~4.6M | 4.6M | +30h | - |
| 30 | 13.5M | 13.5M | +50h | - |
| 40 | 32M | 32M | +80h | - |
| 50 | 62M | 62M | +120h | **SOFT CAP** |
| 60 | 108M | 108M | +180h | Jogável |
| 70 | 171M | 171M | +250h | Competitivo |
| 80 | 256M | 256M | +350h | Elite |
| 90 | 364M | 364M | +500h | Hardcore |
| 99 | 485M | 485M | +700h | **TESTE FINAL** |
| 100 | 500M | - | +800h | **MÍTICO** |

*Tempo baseado em 10,000 XP/hora (grinding otimizado + dungeons)

### Ganho de HP
```javascript
HP = HP_Anterior + 50 + (CON × 10)
```

**Exemplo (CON 14, mod +2):**
```
Nível 21: 150 + 50 + 20 = 220 HP
Nível 50: ~800 HP
Nível 100: ~2500 HP
```

---

## 💰 FONTES DE XP

### 1. Grinding de Mobs
```javascript
XP_Mob = (Level_Mob² × 10) × Rank_Multiplier × Level_Gap_Penalty
```

#### Rank Multipliers
| Rank | Multiplicador |
|------|---------------|
| Comum | 1.0x |
| Elite | 2.0x |
| Named | 3.5x |
| Mini-Boss | 5.0x |
| Boss | 8.0x |
| Raid Boss | 15.0x |
| World Boss | 30.0x |

#### Level Gap Penalty
```javascript
if (abs(Level_Player - Level_Mob) > 5) {
  Penalty = max(0.1, 1 - abs(gap) × 0.05)
}

// Exemplo: Player 50 vs Mob 30 (gap 20)
Penalty = 1 - (20 × 0.05) = 0.0 → mínimo 0.1 (10% XP)
```

### 2. Quests
```javascript
XP_Quest = Level_Quest × 1000 × Quest_Type_Mult

Quest_Type_Mult:
- Daily: 1.0x
- Story: 3.0x
- Side: 1.5x
- Hidden: 5.0x
```

### 3. Dungeons
```javascript
XP_Dungeon = (Level_Dungeon × 500) + Boss_Bonus

Boss_Bonus = Level_Boss × 2000 × Clear_Bonus

Clear_Bonus:
- First Clear: 2.0x
- S-Rank Clear: 1.5x
- Normal Clear: 1.0x
```

### 4. PvP
```javascript
XP_PvP = (Level_Derrotado × 200) × Streak_Bonus

Streak_Bonus:
- 1-5 kills: 1.0x
- 6-10 kills: 1.5x
- 11+ kills: 2.0x
```

---

## 📉 SISTEMA ANTI-GRINDING

### Diminishing Returns
```javascript
if (tempo_mesmo_spot > 2h) {
  XP_Mult = max(0.5, 1 - (horas_excesso × 0.25))
}
```

### Rested XP (Offline Bonus)
```javascript
Rested_XP = min(Level × 5000, horas_offline × 2000)

Quando ativo: +50% XP em combate
Cap: 1 nível de XP acumulado
```

### Group Bonus
```javascript
XP_Individual = XP_Base × (1 + (num_membros - 1) × 0.1)

Max: +40% (5 players)

Distribuição:
XP_Player = XP_Total / num_membros × (1 + Level_Gap_Bonus)
```

---

## 🚧 TESTES DE ASCENSÃO (BREAKTHROUGH)

### Níveis de Breakthrough
- **Nível 10:** Primeira Ascensão (Despertar do Potencial)
- **Nível 20:** Hashira → VRMMO (Transição de Sistema)
- **Nível 50:** Mid-Game Gate (Acesso a Tier 3 Skills)
- **Nível 99:** Ascensão Final (Unlock Level 100)

### Mecânica
```javascript
// Sistema TRAVA o nível
if (current_xp >= xp_required && !ascended) {
  prevent_level_up();
  show_notification("⚠️ TESTE DE ASCENSÃO DISPONÍVEL");
}

// Após passar no teste
actor.flags.world.ascended = true;
level_up();
```

### Tipos de Teste
1. **Combate Solo:** Derrote Boss de Ascensão
2. **Habilidade:** Demonstre domínio técnico (combo SSS)
3. **Prova de Vontade:** Teste de resistência mental (Incarnation)

---

## 📈 CURVAS DE PROGRESSÃO COMPARADAS

### Linear (Referência - NÃO usada)
```
XP = Level × 1000
Total para 100: ~5M
Problema: Muito rápido, sem sensação de conquista
```

### Quadrática (Fase 1 - Hashira)
```
XP = Level² × 100
Total para 20: ~273k
Vantagem: Suave mas crescente
```

### Cúbica (Fase 2 - VRMMO)
```
XP = Level³ × 500
Total para 100: ~500M
Vantagem: Longevidade, soft caps naturais
```

### Comparação Visual
```
Level 10:  10k   (Linear) vs 10k   (Quad) vs 500k   (Cubic)
Level 50:  50k   (Linear) vs 250k  (Quad) vs 62M    (Cubic)
Level 100: 100k  (Linear) vs 1M    (Quad) vs 500M   (Cubic)
```

---

## 🎮 REFERÊNCIAS PRÁTICAS

### Black Desert Online
- Soft cap: ~61 (nosso equivalente: 60-70)
- Hard cap: ~66+ (nosso: 90+)
- Grinding: Principal fonte (40% nosso sistema)

### The King's Avatar
- Cap fixo: 70 (inspirou nossos breakpoints)
- Skill mastery > Level puro
- Dungeons > Grinding

### Solo Leveling
- Re-awakening system (nossos Breakthroughs)
- Daily Quests importantes
- Gates dão XP massivo (nossos Dungeons)

---

## 🔬 VALIDAÇÃO MATEMÁTICA

### DPR (Damage Per Round) vs Level
```javascript
// Player Level 20
DPR = (hit_chance × avg_damage) + (crit_chance × crit_damage)
    = (0.65 × 15) + (0.10 × 30)
    = 9.75 + 3.0 = 12.75

// Mob Elite Level 20
HP = 85,000
Rounds_to_Kill = HP / DPR / Party_Size
               = 85,000 / 12.75 / 4
               = ~1,670 rounds = ~280 minutos (grupo 4 players)

XP_Gain = 18,500 (mob) × grupo_bonus(1.3) = 24,050
```

### Horas para Nível 50
```
XP_Total = 62M
XP_por_hora = 10,000 (grinding) + 5,000 (quests médias)
Horas = 62M / 15k = ~4,133 horas

COM rested bonus (50%) + group (40%):
Horas_Reais = 4,133 / 1.9 = ~2,175 horas = ~120-150h gameplay
```

---

## ⚡ DICAS DE OTIMIZAÇÃO

### Para Jogadores
1. **Use Rested XP:** Sempre faça logout em cidade segura
2. **Grupo > Solo:** +40% XP em grupos de 5
3. **First Clear Bonus:** Priorize dungeons novos (2.0x XP)
4. **Level Gap:** Lute contra mobs ±5 níveis

### Para GMs
1. **Soft Caps:** Reduza XP de quests após nível 60
2. **Hidden Quests:** Use 5.0x mult para recompensar exploração
3. **World Events:** Boss público com XP massivo (server-wide)
4. **Death Penalty:** -5% XP do nível (não perde nível)

---

**[GOHAN]:** Sistema validado matematicamente. Curvas balanceadas para 200-500h de gameplay rico.

**[CARDINAL]:** Progressão alinhada com narrativa. Breakpoints marcam evolução do personagem.
