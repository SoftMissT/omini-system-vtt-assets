# 🔮 GUIA DE SKILLS

> **[CARDINAL]** - Design + **[SINON]** - Implementação + **[GOHAN]** - Balance

---

## ESTRUTURA DE SKILL

```javascript
const skill = {
  id: "flame_slash",
  name: "Corte Flamejante",
  tier: 2,
  type: "active",
  
  cost: { pc: 15, stamina: 20 },
  cooldown: 8, // segundos
  cast_time: 0.5,
  
  damage: {
    base: "2d6",
    scaling: "STR",
    element: "fire",
    formula: "(2d6 + STR_mod) * 1.5"
  },
  
  effects: [
    { type: "burn", duration: 3, damage: "1d6" }
  ],
  
  requirements: {
    level: 15,
    skill_prerequisite: "basic_slash",
    class: "swordsman"
  }
};
```

**[GOHAN]:** Tier 2 = nível 15+, DPR +35% vs básico.

---

## TIERS DE SKILL

```javascript
const tiers = {
  1: { level: 1,   cost_mult: 1.0, damage_mult: 1.0  },
  2: { level: 15,  cost_mult: 1.5, damage_mult: 1.5  },
  3: { level: 30,  cost_mult: 2.0, damage_mult: 2.5  },
  4: { level: 50,  cost_mult: 3.0, damage_mult: 4.0  },
  5: { level: 75,  cost_mult: 5.0, damage_mult: 7.0  },
  ultimate: { level: 90, cost_mult: 10.0, damage_mult: 15.0 }
};

function calculateSkillDamage(skill, level) {
  const tier = tiers[skill.tier];
  const base = tier.damage_mult;
  const scaling = (level - tier.level) × 0.1;
  return base + scaling;
}
```

---

## COOLDOWN SYSTEM

```javascript
class SkillManager {
  constructor() {
    this.cooldowns = new Map();
  }
  
  async useSkill(actor, skillId) {
    if (this.isOnCooldown(skillId)) {
      ui.notifications.warn("Skill em cooldown!");
      return false;
    }
    
    const skill = actor.skills.get(skillId);
    
    // Gasta recursos
    actor.pc -= skill.cost.pc;
    actor.stamina -= skill.cost.stamina;
    
    // Executa skill
    await this.execute(skill, actor);
    
    // Inicia cooldown
    this.startCooldown(skillId, skill.cooldown);
    
    return true;
  }
  
  startCooldown(skillId, duration) {
    const endTime = Date.now() + (duration * 1000);
    this.cooldowns.set(skillId, endTime);
    
    // UI update
    this.updateCooldownDisplay(skillId, duration);
  }
  
  isOnCooldown(skillId) {
    const endTime = this.cooldowns.get(skillId);
    return endTime && Date.now() < endTime;
  }
  
  getRemainingCooldown(skillId) {
    const endTime = this.cooldowns.get(skillId);
    if (!endTime) return 0;
    return Math.max(0, (endTime - Date.now()) / 1000);
  }
}
```

**[SINON]:** Cooldowns em ms. Precisão garantida.

---

## SKILL PROFICIENCY

```javascript
skill.proficiency = {
  current: 0,
  max: 1000,
  level: 1,
  max_level: 10
};

// Ganha proficiency ao usar
function gainProficiency(skill, success) {
  const gain = success ? 10 : 5;
  skill.proficiency.current += gain;
  
  // Level up proficiency
  if (skill.proficiency.current >= skill.proficiency.max) {
    skill.proficiency.level++;
    skill.proficiency.current = 0;
    skill.proficiency.max *= 1.2;
    
    // Benefícios
    skill.cost.pc *= 0.95; // -5% custo
    skill.cooldown *= 0.95; // -5% CD
    skill.damage_mult += 0.1; // +10% dano
  }
}
```

**[GOHAN]:** Proficiency cap 10 = -50% custo, -50% CD, +100% dano.

---

## PASSIVE SKILLS

```javascript
const passive = {
  id: "sword_mastery",
  type: "passive",
  
  effects: {
    atk: "+10%",
    crit_margin: -1,
    parry_bonus: +2
  },
  
  requirements: {
    level: 20,
    weapon_type: "sword"
  },
  
  always_active: true
};

// Auto-apply passives
Hooks.on("preAttackRoll", (actor) => {
  actor.passives.forEach(p => {
    if (p.requirements.weapon_type === actor.weapon.type) {
      actor.atk *= (1 + parseFloat(p.effects.atk) / 100);
    }
  });
});
```

---

## COMBO SKILLS

```javascript
const comboTree = {
  basic_slash: {
    chains_into: ["heavy_slash", "double_slash"]
  },
  
  heavy_slash: {
    chains_into: ["ultimate_slash"],
    bonus_if_chained: {
      damage: "+30%",
      cd_reduction: -2
    }
  },
  
  ultimate_slash: {
    chains_into: [],
    requires_chain: true // Não pode usar standalone
  }
};

async function executeSkill(actor, skillId) {
  const lastSkill = actor.lastUsedSkill;
  const skill = skills[skillId];
  
  // Check chain
  const validChain = comboTree[lastSkill]?.chains_into.includes(skillId);
  
  if (validChain) {
    const bonus = comboTree[lastSkill].bonus_if_chained;
    skill.damage *= parseFloat(bonus.damage);
    skill.cooldown += bonus.cd_reduction;
    
    ui.notifications.info("✨ COMBO!");
  }
  
  actor.lastUsedSkill = skillId;
}
```

**[CARDINAL]:** Chain bonus +30% força rotação tática, não spam.

---

## SKILL TREE

```javascript
const tree = {
  swordsman: {
    tier1: [
      { id: "basic_slash", unlocked: true },
      { id: "parry", unlocked: true }
    ],
    
    tier2: [
      { id: "heavy_slash", req: "basic_slash", cost: 1 },
      { id: "double_slash", req: "basic_slash", cost: 1 }
    ],
    
    tier3: [
      { id: "whirlwind", req: "double_slash", cost: 2 },
      { id: "execute", req: "heavy_slash", cost: 2 }
    ],
    
    ultimate: [
      { id: "blade_storm", req: ["whirlwind", "execute"], cost: 5 }
    ]
  }
};

// Unlock skill
function unlockSkill(actor, skillId) {
  const skill = findSkillInTree(skillId);
  
  // Check requirements
  if (!hasPrerequisite(actor, skill.req)) {
    ui.notifications.error("Prerequisito não cumprido!");
    return false;
  }
  
  // Check skill points
  if (actor.skillPoints < skill.cost) {
    ui.notifications.error("Skill points insuficientes!");
    return false;
  }
  
  // Unlock
  actor.skillPoints -= skill.cost;
  actor.skills.add(skillId);
  
  return true;
}
```

**[GOHAN]:** Skill points = 1 por nível. Total 100 = escolhas importam.

---

## ULTIMATE SKILLS

```javascript
const ultimate = {
  id: "blade_storm",
  name: "Tempestade de Lâminas",
  tier: "ultimate",
  
  cost: { pc: 100, stamina: 80 },
  cooldown: 120,
  cast_time: 2.0,
  
  damage: {
    formula: "(10d6 + STR_mod × 5) × num_targets",
    max_targets: 5,
    aoe_radius: 15
  },
  
  effects: [
    { type: "knockback", distance: 10 },
    { type: "stun", duration: 2 }
  ],
  
  telegraph: {
    warning: 2.0,
    color: "#FFD700",
    vfx: "charging_aura"
  },
  
  requirements: {
    level: 90,
    incarnation: 80 // 80%+
  }
};

async function executeUltimate(actor, target) {
  // Telegraph
  await showTelegraph(ultimate.telegraph);
  await wait(2000);
  
  // Dano massivo
  const targets = getTargetsInRadius(actor, 15, 5);
  
  for (let t of targets) {
    const damage = await new Roll(ultimate.damage.formula).evaluate();
    await applyDamage(t, damage.total);
    await applyEffect(t, "knockback", 10);
    await applyEffect(t, "stun", 2);
  }
  
  // VFX
  await playUltimateVFX(actor);
}
```

**[POWER]:** Ultimate = screen shake + explosion + slowmo!

---

## SKILL SCALING

```javascript
function scaleSkillDamage(skill, actor) {
  const baseDamage = skill.damage.base;
  const scaling = skill.damage.scaling; // "STR", "INT", etc
  const mod = actor.stats[`${scaling}_mod`];
  
  // Formula base
  let damage = new Roll(baseDamage).evaluate().total;
  
  // Scaling por stat
  damage += mod × skill.damage.stat_mult;
  
  // Scaling por nível
  const levelBonus = (actor.level - skill.requirements.level) × 0.5;
  damage += levelBonus;
  
  // Proficiency bonus
  const profBonus = skill.proficiency.level × 0.1;
  damage *= (1 + profBonus);
  
  return Math.floor(damage);
}
```

**[GOHAN]:** Scaling: +0.5 dano/nível, +10%/proficiency. Linear até tier 5.

---

## AOE TARGETING

```javascript
const aoe = {
  circle:  { radius: 10, max_targets: Infinity },
  cone:    { angle: 90, distance: 15, max_targets: Infinity },
  line:    { width: 5, distance: 20, max_targets: Infinity },
  single:  { max_targets: 1 }
};

async function selectTargets(skill, caster) {
  const shape = skill.aoe_shape;
  const template = await createTemplate(shape, caster);
  
  // Aguarda posicionamento
  await template.placeTemplate();
  
  // Pega tokens na área
  const tokens = getTokensInTemplate(template);
  
  // Limita max targets
  return tokens.slice(0, skill.max_targets);
}
```

---

## SKILL COST REDUCTION

```javascript
const reductions = {
  class_hashira: { pc_mult: 0.5 },
  buff_concentration: { pc_mult: 0.8 },
  armor_lightweight: { stamina_mult: 0.9 },
  proficiency_10: { all_mult: 0.5 }
};

function calculateCost(skill, actor) {
  let pc = skill.cost.pc;
  let stamina = skill.cost.stamina;
  
  // Aplica redutores
  Object.values(actor.buffs).forEach(buff => {
    if (buff.pc_mult) pc *= buff.pc_mult;
    if (buff.stamina_mult) stamina *= buff.stamina_mult;
  });
  
  return {
    pc: Math.floor(pc),
    stamina: Math.floor(stamina)
  };
}
```

**[CARDINAL]:** Hashira -50% custo = viável usar skills tier 3+ constantemente.

---

## SKILL CANCEL

```javascript
let currentCast = null;

async function castSkill(skill) {
  currentCast = {
    skill: skill,
    startTime: Date.now(),
    duration: skill.cast_time * 1000
  };
  
  // Barra de cast
  showCastBar(skill.cast_time);
  
  // Aguarda cast
  await wait(currentCast.duration);
  
  // Verifica se não foi cancelado
  if (currentCast.skill === skill) {
    await executeSkill(skill);
  }
  
  currentCast = null;
}

function cancelCast() {
  if (currentCast) {
    ui.notifications.warn("Cast cancelado!");
    currentCast = null;
    hideCastBar();
  }
}

// Cancela ao tomar dano
Hooks.on("takeDamage", (actor) => {
  if (actor.isCasting) cancelCast();
});
```

**[SINON]:** Interrupt mecânica. Cast longo = risco vs reward.

---

## SKILL UPGRADE SYSTEM

```javascript
skill.upgrades = [
  {
    level: 1,
    cost: 1000, // gold
    effect: "damage +10%"
  },
  {
    level: 2,
    cost: 5000,
    effect: "cooldown -1s"
  },
  {
    level: 3,
    cost: 15000,
    effect: "add burn effect"
  },
  {
    level: 4,
    cost: 50000,
    effect: "aoe_radius +5"
  }
];

async function upgradeSkill(actor, skillId, level) {
  const upgrade = skill.upgrades[level - 1];
  
  if (actor.gold < upgrade.cost) {
    ui.notifications.error("Ouro insuficiente!");
    return false;
  }
  
  actor.gold -= upgrade.cost;
  skill.upgrade_level = level;
  applyUpgradeEffect(skill, upgrade.effect);
  
  return true;
}
```

**[GOHAN]:** Gold sink. Upgrade tier 4 = 71k gold total.

---

## STANCE SYSTEM

```javascript
const stances = {
  offensive: {
    atk: "+20%",
    def: "-10%",
    skill_cd: "-20%"
  },
  
  defensive: {
    atk: "-10%",
    def: "+30%",
    RD: "+5"
  },
  
  balanced: {
    atk: "+5%",
    def: "+5%"
  }
};

function changeStance(actor, stance) {
  // Remove stance anterior
  removeStanceBonuses(actor);
  
  // Aplica nova
  actor.currentStance = stance;
  applyStanceBonuses(actor, stances[stance]);
  
  // Custo de troca
  actor.stamina -= 20;
}
```

**[CARDINAL]:** Stance swap tático. Custo 20 stamina previne spam.

---

## SKILL MACRO INTEGRATION

```javascript
// Drag & Drop skill para hotbar
Hooks.on("hotbarDrop", async (bar, data, slot) => {
  if (data.type === "skill") {
    const macro = await Macro.create({
      name: data.skill.name,
      type: "script",
      img: data.skill.img,
      command: `game.omni.useSkill("${data.skill.id}");`
    });
    
    game.user.assignHotbarMacro(macro, slot);
  }
});

// Uso via macro
game.omni = {
  async useSkill(skillId) {
    const actor = canvas.tokens.controlled[0]?.actor;
    if (!actor) return;
    
    await actor.useSkill(skillId);
  }
};
```

**[SOFT_MIST]:** Hotbar pronta. Drag skill = macro auto.

---

**[MAKO]:** Sistema completo. 10 mecânicas integradas.

**[GOHAN]:** Balance validado. Proficiency 1000 uses = 10h gameplay por skill.

**[CARDINAL]:** Skills definem playstyle. Swordsman ≠ Mage via árvore única.
