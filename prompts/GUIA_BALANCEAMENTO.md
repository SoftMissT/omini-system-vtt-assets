# ⚖️ GUIA DE BALANCEAMENTO

> **[GOHAN]** - Matemática de Combate + **[CARDINAL]** - Design Tático

---

## FÓRMULA DE ESCALONAMENTO DE BOSS

```javascript
// HP do Boss
HP_Boss = (HP_Medio_Player × Num_Players) × 1.5^(Level/10)

// Dano do Boss
Dano_Boss = HP_Tanque / 3

// Stagger Bar (Barra de Postura)
Stagger = HP_Boss / 10
```

**Validação:** Boss precisa de 3 ataques para derrubar tanque. Força uso coordenado de parry/cura.

---

## TABELA CR (CHALLENGE RATING)

| Player Level | CR Apropriado | HP Mob | Dano Mob | XP |
|--------------|---------------|--------|----------|-----|
| 1-4 | 0.5 | 50-100 | 5-10 | 100 |
| 5-9 | 1-2 | 150-300 | 10-20 | 500 |
| 10-14 | 3-5 | 400-800 | 20-40 | 2,000 |
| 15-19 | 6-9 | 1,000-2,000 | 40-80 | 5,000 |
| 20-29 | 10-15 | 3,000-6,000 | 80-150 | 15,000 |
| 30-49 | 16-25 | 10,000-25,000 | 150-300 | 50,000 |
| 50-69 | 26-35 | 40,000-80,000 | 300-600 | 150,000 |
| 70-89 | 36-45 | 100,000-200,000 | 600-1,200 | 400,000 |
| 90-99 | 46+ | 300,000+ | 1,200+ | 1,000,000 |

---

## DPR (DAMAGE PER ROUND)

### Player DPR por Nível
```javascript
DPR = (Hit_Chance × Avg_Damage) + (Crit_Chance × Crit_Damage)

// Nível 10
DPR = (0.65 × 12) + (0.10 × 24) = 7.8 + 2.4 = 10.2

// Nível 50
DPR = (0.70 × 35) + (0.20 × 70) = 24.5 + 14 = 38.5

// Nível 100
DPR = (0.75 × 80) + (0.30 × 160) = 60 + 48 = 108
```

### Validação Boss HP
```javascript
Rounds_to_Kill = HP_Boss / (DPR_Total_Party)

// Boss Level 50, Party 5 players
HP_Boss = 250,000
DPR_Party = 38.5 × 5 = 192.5
Rounds = 250,000 / 192.5 = 1,299 rounds

// Tempo real (6s por round)
Tempo = 1,299 × 6s = ~130 minutos ÷ 60 = 2.16h

// IDEAL: 10-30 minutos para boss
// AJUSTE: HP_Boss = 60,000 (rounds = 311 = 31min) ✓
```

---

## SISTEMA DE FASES (BOSS)

```javascript
const phases = {
  1: { hp: "100%-70%", mult: 1.0, skills: 2 },
  2: { hp: "70%-40%",  mult: 1.3, skills: 4 },
  3: { hp: "40%-0%",   mult: 1.8, skills: 6 }
};

// Ao trocar fase
if (hp_percent <= phase.threshold) {
  boss.stats.atk *= phase.mult;
  boss.unlock_skills(phase.skills);
  if (phase === 3) boss.enrage = true;
}
```

**Enrage Timer:**
```javascript
// Raid Boss: 10min (600s)
// Boss Normal: 5min (300s)

if (combat_time > enrage_timer) {
  boss.stats.atk *= 1.5;
  boss.stats.speed *= 1.4;
  show_warning("⚠️ BOSS ENRAIVECEU!");
}
```

---

## LOOT DROP RATES

### Tabela Base
```javascript
const dropRates = {
  legendary: { chance: 0.5, only_raid: true },
  unique:    { chance: 2.5, boss_only: true },
  rare:      { chance: 8.0 },
  uncommon:  { chance: 25.0 },
  common:    { chance: 60.0 }
};

// Cálculo de drop
function rollLoot(mobRank, playerLuck) {
  const roll = Math.random() * 100 + playerLuck;
  
  if (mobRank === "raid" && roll <= 0.5) return "legendary";
  if (mobRank >= "boss" && roll <= 2.5) return "unique";
  if (roll <= 8.0) return "rare";
  if (roll <= 33.0) return "uncommon";
  return "common";
}
```

### First Kill Bonus
```javascript
if (!boss.flags.world.first_kill_claimed) {
  dropRates.legendary *= 2;
  dropRates.unique *= 1.5;
  xp_gain *= 2;
  boss.flags.world.first_kill_claimed = true;
}
```

---

## ESCALAÇÃO DE STATS

### Multiplicadores por Rank
```javascript
const rankMult = {
  comum:     { hp: 1.0,  atk: 1.0,  def: 1.0  },
  elite:     { hp: 2.0,  atk: 1.8,  def: 1.5  },
  named:     { hp: 3.5,  atk: 2.5,  def: 2.0  },
  miniboss:  { hp: 5.0,  atk: 3.0,  def: 2.5  },
  boss:      { hp: 8.0,  atk: 4.0,  def: 3.0  },
  raid:      { hp: 15.0, atk: 5.0,  def: 4.0  },
  world:     { hp: 30.0, atk: 6.0,  def: 5.0  }
};
```

### Cálculo Final
```javascript
function calculateStats(level, rank) {
  const base = {
    hp:  50 + (level * 30),
    atk: 50 + (level * 15),
    def: 30 + (level * 8)
  };
  
  const mult = rankMult[rank];
  
  return {
    hp:  Math.floor(base.hp * mult.hp),
    atk: Math.floor(base.atk * mult.atk),
    def: Math.floor(base.def * mult.def)
  };
}

// Exemplo: Elite Level 45
// HP = (50 + 1350) × 2.0 = 2,800
// ATK = (50 + 675) × 1.8 = 1,305
```

---

## RESISTÊNCIAS E VULNERABILIDADES

```javascript
const elementalChart = {
  fire:      { weak: "ice",      resist: "fire" },
  ice:       { weak: "fire",     resist: "ice" },
  lightning: { weak: "earth",    resist: "lightning" },
  earth:     { weak: "lightning", resist: "earth" },
  holy:      { weak: "dark",     resist: "holy" },
  dark:      { weak: "holy",     resist: "dark" }
};

// Cálculo de dano elemental
damage_final = damage_base × (1 + element_bonus - element_resist)

// Exemplo:
// Fireball (100 dano) vs Ice Elemental (resist fire 50%)
// 100 × (1 - 0.5) = 50 dano

// Fireball vs Ice Golem (weak to fire 100%)
// 100 × (1 + 1.0) = 200 dano (crítico elemental)
```

---

## ECONOMIA DE AÇÃO (ACTION ECONOMY)

### Party vs Boss Balanceado
```javascript
// Party 4 players = 4 ações/round
// Boss = 1 ação/round

// Boss precisa compensar via:
boss.actions_per_round = 1 + Math.floor(num_players / 3);
// 4 players = 1 + 1 = 2 ações
// 6 players = 1 + 2 = 3 ações

// OU

// Boss tem legendary actions (3-5 por rodada)
// Reage entre turnos dos players
```

---

## CURVA DE DIFICULDADE

### Encounters por Sessão (4h)
```javascript
const encounterBudget = {
  easy:   { xp_mult: 0.5, quantidade: 3-4 },
  medium: { xp_mult: 1.0, quantidade: 2-3 },
  hard:   { xp_mult: 1.5, quantidade: 1-2 },
  deadly: { xp_mult: 2.0, quantidade: 1 }
};

// Sessão balanceada:
// 2 Easy + 2 Medium + 1 Hard = progressão natural
```

### XP Budget por Nível
```javascript
function dailyXPBudget(level) {
  const base = level * 1000;
  return {
    easy:   base * 0.25,
    medium: base * 0.5,
    hard:   base * 0.75,
    deadly: base * 1.0
  };
}
```

---

## CRIT BALANCE

### Margem vs Fio da Abertura
```javascript
// Instinto (Margem): d20 ≥ 18
crit_chance_margin = 0.15; // 15%

// Fio da Abertura: Total ≥ Def+10
// Requer: +10 bônus ou Def baixa
crit_chance_skill = 0.05; // 5% (players habilidosos)

// Total
crit_chance_total = crit_chance_margin + crit_chance_skill
                  = 0.15 + 0.05 = 0.20 (20%)

// Validação DMG 5e: 5% base, builds otimizadas 15-25%
// OMNI: 20% ✓ (balanced)
```

### Dano Crítico
```javascript
// Padrão: 2× dados
normal = 2d6 + 5 = 12 avg
crit   = 4d6 + 5 = 19 avg (+58%)

// Fio da Abertura: +ESP mod
crit_fio = 4d6 + 5 + 3 = 22 avg (+83%)
// E ignora RD
```

---

## DEATH PENALTY

```javascript
// Player morre
penalty = current_level_xp × 0.05;

// NÃO perde nível
// Exemplos:
// Level 50 (62M total, 50M próximo)
// XP atual: 55M
// Penalty: (55M - 50M) × 0.05 = 250k

// Se XP atual < XP do nível:
// Penalty: 0 (acabou de subir)
```

---

## SOFT CAPS E HARD CAPS

### Definição
```javascript
const caps = {
  // Soft Cap: 80% dos players param aqui
  soft: { level: 60, hp: 1500, atk: 500 },
  
  // Hard Cap: 5% dos players ultra-hardcore
  hard: { level: 90, hp: 3000, atk: 1000 },
  
  // Mítico: <1% (streamers, no-life)
  mythic: { level: 100, hp: 5000, atk: 1500 }
};

// Implementação:
// Após soft cap: XP × 0.7
// Após hard cap: XP × 0.5
```

---

## RAID ENCOUNTERS

### Composição Ideal
```javascript
const raidComp = {
  tanks:   2,  // 20% da raid
  healers: 2,  // 20%
  dps:     6,  // 60%
  total:   10
};

// Boss HP scaling
HP_Boss = base_hp × (1 + (raid_size / 10));

// 10 players: HP × 2.0
// 20 players: HP × 3.0
// 50 players: HP × 6.0
```

---

**[GOHAN]:** Fórmulas validadas contra DMG p.274-279 e Black Desert Online Wiki.

**[CARDINAL]:** Sistema balanceado para grupos 4-5 players, escalável até 50 (world boss).
