# 💥 GUIA DE CRÍTICOS: DUAL-CHECK SYSTEM

> **[GOHAN]** - Matemática de Críticos + **[CARDINAL]** - Design Tático

---

## SISTEMA DUAL-CHECK

Dois caminhos independentes para crítico:

### 1. INSTINTO (Margem)
```javascript
if (d20_natural >= crit_margin) {
  isCritical = true;
}

// Padrão: margem 18 (18-20)
// Chance: 15%
```

### 2. FIO DA ABERTURA (Técnico)
```javascript
if (attack_total >= defense + 10) {
  isCritical = true;
  ignorar_RD = true;
  dano_extra = ESP_mod;
}

// Requer skill ou sorte
// Chance: ~5% (players bons: 10-15%)
```

Ambos funcionam **simultaneamente**. Não é "ou/ou", é "e/e".

---

## MATEMÁTICA DE CHANCE

### Base Line
```javascript
// Margem padrão (18-20)
chance_margin = 3/20 = 0.15 (15%)

// Fio técnico (requer total alto)
// Exemplo: DEX +5, arma +2, bônus +3 = +10
// vs Defesa 18
// Roll 18+ no d20 = total 28 ≥ 28 (18+10)
chance_technical = 3/20 = 0.15 (15%)

// Chance de pelo menos 1 crítico
chance_any_crit = 1 - (0.85 × 0.85) = 0.2775 (27.75%)
```

**Validação:** D&D 5e = 5% base, builds otimizadas 15-25%. OMNI = ~28% para players bem equipados. ✓

### Modificadores de Margem
```javascript
const critModifiers = {
  class_assassin:   -2,  // 16-20 (25%)
  skill_precision:  -1,  // 17-20 (20%)
  weapon_keen:      -1,  // 17-20 (20%)
  buff_focus:       -1   // 17-20 (20%)
};

// Empilhável (cap 10-20, 55%)
final_margin = base_margin - sum(active_modifiers);
final_margin = Math.max(10, final_margin);
```

---

## DANO CRÍTICO

### Fórmula Base
```javascript
// Crítico normal
damage = roll_dice() × 2 + modifiers

// Exemplo: 2d6+5
normal = 7 + 5 = 12 avg
crit   = 14 + 5 = 19 avg (+58%)
```

### Fio da Abertura Adicional
```javascript
// Ignora RD + adiciona ESP mod
damage = (roll_dice() × 2 + modifiers) + ESP_mod
RD_ignored = true

// Exemplo: 2d6+5, ESP +3, vs RD 5
normal = 12 - 5 = 7 dano
crit   = 19 dano (sem redução)
crit_fio = 19 + 3 = 22 dano (sem redução) (+214%)
```

### Multiplicadores Adicionais
```javascript
const critDamageMult = {
  sneak_attack:     +2d6,
  elemental_fury:   +1d10,
  divine_smite:     +2d8,
  assassinate:      ×2 dano total
};

// Exemplo crítico assassino
base = 2d6 + 5 = 12
crit = (2d6 + 5) × 2 = 24
sneak = 24 + (2d6 × 2) = 24 + 14 = 38
assassinate = 38 × 2 = 76 dano total
```

---

## TIPOS DE CRÍTICO

### Tier S: Fio da Abertura
```javascript
{
  trigger: "total ≥ def+10",
  effects: [
    "ignore_RD",
    "+ESP_mod",
    "2× dice",
    "animation_gold"
  ],
  rarity: "5-15%"
}
```

### Tier A: Margem Natural
```javascript
{
  trigger: "d20 ≥ margin",
  effects: [
    "2× dice",
    "normal_RD_applies"
  ],
  rarity: "15-25%"
}
```

### Tier SSS: Nat 20 + Fio
```javascript
{
  trigger: "d20 = 20 AND total ≥ def+10",
  effects: [
    "ignore_RD",
    "+ESP_mod × 2",
    "3× dice",
    "animation_rainbow",
    "instant_kill_chance_5%"
  ],
  rarity: "0.5-1%"
}
```

---

## CONTRA-ATAQUE (PARRY CRÍTICO)

### Mecânica
```javascript
// Player faz parry
parry_roll = d20 + mods;

if (parry_roll >= enemy_attack_roll) {
  block_100_damage();
  
  if (parry_roll - enemy_attack >= 10) {
    // CRITICAL PARRY
    counter_attack_free();
    counter_attack_uses_fio_rules = true;
  }
}
```

### Chance de Parry Crítico
```javascript
// Requer superar ataque por 10+
// Enemy ATK roll avg: 10.5 + mods
// Player parry avg: 10.5 + mods

// Se igual mod: chance ~8%
// Se player +5 mod: chance ~15%
```

---

## CRÍTICO DEFENSIVO

### Esquiva Crítica
```javascript
if (dodge_roll - attack_roll >= 10) {
  evade_100();
  gain_momentum(+1);
  gain_temp_buff("reflex", 1_round);
}
```

### Resistência Crítica
```javascript
// Save vs efeito
if (save_roll ≥ DC + 10) {
  negate_effect();
  reflect_50_percent_to_caster();
}
```

---

## CRIT FISHING (OTIMIZAÇÃO)

### Build Assassino
```javascript
base_margin = 18;
class_feature = -2;  // 16-20
weapon_keen = -1;    // 15-20
buff_precision = -1; // 14-20
total_margin = 14;   // 35% chance

// Adiciona advantage (roll 2× d20)
advantage_crit_chance = 1 - (0.65^2) = 0.5775 (57.75%)
```

### Build Técnico (Fio)
```javascript
// Maximizar bônus de acerto
base_DEX = +5;
weapon_enhancement = +3;
buff_bless = +1d4 (avg +2.5);
magic_item = +2;
total_bonus = +12.5;

// vs Defesa 20
// Roll 8+ = total 20.5 ≥ 20
// Crítico técnico: 65% chance
// Fio: roll 18+ = total 30.5 ≥ 30 (20+10) = 15%
```

---

## IMPLEMENTAÇÃO CÓDIGO

```javascript
async function rollAttack(actor, target) {
  const roll = await new Roll("1d20").evaluate();
  const d20 = roll.dice[0].total;
  const bonus = actor.system.stats.atk_bonus;
  const total = d20 + bonus;
  
  const def = target.system.stats.defense;
  const margin = actor.system.crit_margin || 18;
  
  let isCrit = false;
  let isFio = false;
  let type = "normal";
  
  // Check 1: Instinto
  if (d20 >= margin) {
    isCrit = true;
    type = "margin";
  }
  
  // Check 2: Fio da Abertura
  if (total >= def + 10) {
    isCrit = true;
    isFio = true;
    type = isFio && d20 >= margin ? "both" : "fio";
  }
  
  // Check 3: Nat 20 + Fio (SSS)
  if (d20 === 20 && isFio) {
    type = "sss";
  }
  
  return { total, isCrit, isFio, type, d20 };
}

async function calculateDamage(actor, target, critInfo) {
  const baseDice = actor.system.weapon.damage; // "2d6"
  const baseMod = actor.system.stats.STR_mod;
  const espMod = actor.system.stats.ESP_mod;
  
  let damage = await new Roll(baseDice).evaluate();
  let total = damage.total + baseMod;
  
  if (critInfo.isCrit) {
    // Dobra dados
    damage = await new Roll(baseDice).evaluate();
    total += damage.total;
    
    // Fio adiciona ESP e ignora RD
    if (critInfo.isFio) {
      total += espMod;
      target.flags.ignore_RD = true;
    }
    
    // SSS triplica tudo
    if (critInfo.type === "sss") {
      damage = await new Roll(baseDice).evaluate();
      total += damage.total + espMod;
    }
  }
  
  return total;
}
```

---

## EFEITOS VISUAIS

```javascript
// [POWER] - VFX por tipo de crítico

const critVFX = {
  margin: {
    color: "#FFD700",
    particles: "spark",
    sound: "sword-hit-critical.mp3",
    shake: 0.3
  },
  
  fio: {
    color: "#00D9FF",
    particles: "slash-blue",
    sound: "precision-strike.mp3",
    shake: 0.5,
    slowmo: 0.5
  },
  
  sss: {
    color: "rainbow",
    particles: "explosion-rainbow",
    sound: "ultimate-critical.mp3",
    shake: 1.0,
    slowmo: 0.3,
    screen_flash: true
  }
};

async function playCritVFX(type, token) {
  const vfx = critVFX[type];
  
  new Sequence()
    .effect()
      .atLocation(token)
      .file(`jb2a.${vfx.particles}`)
      .scaleToObject(1.5)
      .tint(vfx.color)
    .sound()
      .file(vfx.sound)
      .volume(0.8)
    .canvasPan()
      .shake({ duration: 500, strength: vfx.shake })
    .play();
  
  if (vfx.screen_flash) {
    canvas.app.screen.flash({ duration: 200, color: 0xFFFFFF });
  }
}
```

---

## CRÍTICO EM BOSSES

### Boss Recebe Crítico
```javascript
// Redução de Stagger Bar
if (attack.isCrit) {
  boss.stagger -= 10;
} else {
  boss.stagger -= 1;
}

if (boss.stagger <= 0) {
  boss.state = "BREAK";
  boss.RD = 0;
  boss.incoming_damage_mult = 2.0;
  boss.duration = 1; // round
}
```

### Boss Dá Crítico
```javascript
// Boss crítico = Telegraph + One-Shot potential
if (boss.attack.isCrit) {
  show_warning("⚠️ BOSS ULTIMATE INCOMING!");
  delay(3000); // 3s warning
  
  damage = boss.atk × 5;
  if (player.hp < damage) {
    show_telegraph_red_circle();
    allow_dodge_window(1500); // 1.5s iframe
  }
}
```

---

## BALANCE NOTES

### Crit vs Normal DPR
```javascript
// Player level 50
DPR_normal = (0.70 × 35) + (0.25 × 70) = 24.5 + 17.5 = 42
DPR_fio = (0.70 × 35) + (0.30 × 85) = 24.5 + 25.5 = 50 (+19%)

// Validação: builds crítico 15-30% mais DPR ✓
```

### Custo de Oportunidade
```javascript
// Investir em crit vs ATK
build_atk = { atk: +10, crit: 15% }; // DPR 45
build_crit = { atk: +5, crit: 35% }; // DPR 47.5 (+5.5%)

// Crítico ganha por margem pequena
// Tradeoff: risco vs consistência ✓
```

---

**[GOHAN]:** Dual-check equilibrado. Crit chance 15-35% conforme build. DPR increase 15-30%.

**[CARDINAL]:** Fio da Abertura recompensa skill. SSS cria momentos épicos sem quebrar o sistema.
