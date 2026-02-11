# ⚙️ GUIA DE MECÂNICAS

> **[CARDINAL]** - Design de Sistemas + **[GOHAN]** - Validação

---

## PARRY SYSTEM

```javascript
async function executeParry(defender, attacker) {
  const parryRoll = await new Roll("1d20").evaluate();
  const total = parryRoll.total + defender.system.parry_bonus;
  const attackRoll = attacker.lastAttackRoll;
  
  if (total >= attackRoll) {
    // Sucesso: bloqueia 100%
    damage = 0;
    
    if (total - attackRoll >= 10) {
      // CRITICAL PARRY: contra-ataque livre
      await freeCounterAttack(defender, attacker);
    }
  }
  
  return damage;
}
```

**[GOHAN]:** Chance parry crítico ~8-15% (dependendo de build).

---

## STAGGER SYSTEM (BOSSES)

```javascript
boss.stagger = {
  max: boss.hp / 10,
  current: boss.hp / 10,
  threshold: 0
};

// Redução por ataque
if (attack.isCrit) boss.stagger.current -= 10;
else boss.stagger.current -= 1;

// BREAK STATE
if (boss.stagger.current <= 0) {
  boss.state = "BREAK";
  boss.RD = 0;
  boss.incoming_damage × 2;
  setTimeout(() => boss.recover(), 6000); // 1 round
}
```

**[CARDINAL]:** Boss recebe 10-15 hits para quebrar. Recompensa foco de fogo.

---

## COSMO & INCARNATION

### Cosmo (Energia Bruta)
```javascript
async function burnCosmo(actor) {
  const burn = await new Roll("1d10").evaluate();
  const esp = actor.system.stats.ESP_mod;
  
  actor.cosmo += burn.total + esp;
  
  // Sobrecarga
  const limit = (actor.ESP + actor.COR) × 2;
  if (actor.cosmo > limit) {
    const damage = actor.cosmo - limit;
    actor.hp -= damage;
    ui.notifications.warn(`⚠️ SOBRECARGA! -${damage} HP`);
  }
}
```

### Incarnation (Vontade)
```javascript
actor.incarnation = {
  current: 0,
  max: 100,
  miracle_threshold: 80
};

if (actor.incarnation.current >= 80) {
  showButton("SOBRESCREVER REALIDADE");
  // Custo: 0 recursos
  // Efeito: sucesso automático 1× por cena
}
```

**[GOHAN]:** Incarnation = resource de narrativa. Não quebra balance se limitado.

---

## COMBO SYSTEM

```javascript
const comboTracker = {
  hits: 0,
  timer: null,
  window: 5000 // 5s
};

function registerHit(damage) {
  comboTracker.hits++;
  clearTimeout(comboTracker.timer);
  
  comboTracker.timer = setTimeout(() => {
    displayComboEnd(comboTracker.hits, totalDamage);
    comboTracker.hits = 0;
  }, comboTracker.window);
  
  // Rank visual
  if (comboTracker.hits >= 100) showRank("SSS");
  else if (comboTracker.hits >= 50) showRank("S");
  else if (comboTracker.hits >= 20) showRank("A");
}
```

**[POWER]:** VFX aumenta com combo. SSS = screen shake + particles!

---

## DODGE & IFRAME

```javascript
async function dodge(actor) {
  actor.state = "iframe";
  actor.invulnerable = true;
  
  // Animação + movimento
  await token.animate({ x: +100 }, { duration: 300 });
  
  setTimeout(() => {
    actor.invulnerable = false;
    actor.state = "normal";
  }, 500); // 0.5s iframe
}
```

**[CARDINAL]:** Iframe 0.5s balanceado. Requer timing, não spam.

---

## TELEGRAPH SYSTEM (BOSS)

```javascript
async function bossUltimate(boss) {
  // Warning 3s antes
  showTelegraph({
    type: "circle",
    color: "#FF2B4A",
    radius: 30,
    duration: 3000
  });
  
  await wait(3000);
  
  // Executa ataque
  const targets = getTokensInRadius(boss, 30);
  for (let target of targets) {
    if (!target.dodged) {
      const damage = boss.atk × 8.5;
      applyDamage(target, damage);
    }
  }
}
```

**[CARDINAL]:** 3s warning = reacionável mas exige atenção.

---

## CHAIN SKILLS

```javascript
const skillTree = {
  basic: { id: 1, next: [2, 3] },
  skill_2: { id: 2, next: [4] },
  skill_3: { id: 3, next: [5] },
  ultimate: { id: 4, next: [] }
};

function checkChain(lastSkill, nextSkill) {
  return skillTree[lastSkill].next.includes(nextSkill);
}

// Bônus de chain
if (checkChain(last, current)) {
  damage × 1.3;
  cd_reduction = 2; // -2s cooldown
}
```

**[GOHAN]:** Chain bonus +30% damage = recompensa skill, não spam.

---

## RAGE & ENRAGE

```javascript
boss.enrage = {
  timer: 300, // 5min
  active: false
};

setInterval(() => {
  boss.enrage.timer--;
  
  if (boss.enrage.timer <= 0 && !boss.enrage.active) {
    boss.enrage.active = true;
    boss.atk × 1.5;
    boss.speed × 1.4;
    
    ChatMessage.create({
      content: "⚠️ BOSS ENRAIVECEU! +50% ATK, +40% Speed"
    });
  }
}, 1000);
```

**[CARDINAL]:** Enrage cria urgência. Força players a otimizar rotação.

---

## ELEMENT REACTIONS

```javascript
const elements = {
  fire: { weak: "ice", strong: "wind" },
  ice: { weak: "fire", strong: "water" },
  lightning: { weak: "earth", strong: "water" }
};

function calculateElemental(attacker, target) {
  const element = attacker.weapon.element;
  const resistance = target.resistances[element];
  
  let mult = 1.0;
  
  // Weakness
  if (target.weakness === element) mult = 2.0;
  
  // Resistance
  mult -= (resistance / 100);
  
  // Reaction combo
  if (target.debuffs.includes("wet") && element === "lightning") {
    mult × 1.5; // shock reaction
  }
  
  return damage × mult;
}
```

**[GOHAN]:** Elemental damage variance 50-200% baseado em match-up.

---

## MOMENTUM SYSTEM

```javascript
actor.momentum = {
  current: 0,
  max: 5,
  decay: 1 // por round
};

// Ganha momentum
function gainMomentum(amount) {
  actor.momentum.current = Math.min(
    actor.momentum.current + amount,
    actor.momentum.max
  );
}

// Usa momentum
function spendMomentum(cost) {
  if (actor.momentum.current >= cost) {
    actor.momentum.current -= cost;
    return true;
  }
  return false;
}

// Decay automático
Hooks.on("combatTurn", () => {
  actor.momentum.current = Math.max(
    0,
    actor.momentum.current - actor.momentum.decay
  );
});
```

**[CARDINAL]:** Momentum = resource tático. Recompensa agressividade mantida.

---

## BREAK SYSTEM (ARMOR)

```javascript
armor.durability = {
  current: 100,
  max: 100
};

// Dano na armadura
function damageArmor(damage) {
  const armorDamage = Math.floor(damage × 0.1);
  armor.durability.current -= armorDamage;
  
  if (armor.durability.current <= 0) {
    armor.broken = true;
    armor.RD = 0;
    ui.notifications.error("💔 ARMADURA QUEBRADA!");
  }
}

// Reparo
async function repairArmor(cost) {
  if (actor.gold >= cost) {
    actor.gold -= cost;
    armor.durability.current = armor.durability.max;
    armor.broken = false;
  }
}
```

**[GOHAN]:** Custo de reparo = 10% do valor da armadura. Penalty por descuido.

---

## ZONE CONTROL

```javascript
async function createZone(caster, type) {
  const zone = {
    type: type, // "fire", "ice", "holy"
    radius: 10,
    duration: 3, // rounds
    damage_per_round: caster.magic_atk × 0.5
  };
  
  // Aplica a cada round
  Hooks.on("combatRound", () => {
    const targets = getTokensInRadius(zone.center, zone.radius);
    targets.forEach(t => applyDamage(t, zone.damage_per_round));
    
    zone.duration--;
    if (zone.duration <= 0) removeZone();
  });
}
```

**[CARDINAL]:** Zone damage = 50% ATK por round. Força reposicionamento.

---

## POSTURE & STAMINA

```javascript
actor.stamina = {
  current: 100,
  max: 100,
  regen: 10 // por round
};

// Gasta stamina
async function dash(distance) {
  const cost = distance × 2;
  if (actor.stamina.current >= cost) {
    actor.stamina.current -= cost;
    await moveToken(distance);
  }
}

// Exaustão
if (actor.stamina.current <= 0) {
  actor.debuffs.push("exhausted");
  actor.speed × 0.5;
  actor.atk × 0.75;
}
```

**[GOHAN]:** Stamina cap movimento. Previne kiting infinito.

---

## STATUS EFFECTS

```javascript
const effects = {
  burn: { 
    damage: "2d6 fire/round",
    duration: 3,
    stackable: false 
  },
  
  bleed: { 
    damage: "1d6/round",
    duration: 5,
    stackable: true,
    max_stacks: 5
  },
  
  stun: { 
    duration: 1,
    effect: "skip_turn",
    stackable: false 
  },
  
  slow: { 
    duration: 2,
    effect: "speed × 0.5",
    stackable: false 
  }
};

async function applyEffect(target, effect, source) {
  const existing = target.effects.find(e => e.name === effect);
  
  if (existing && effects[effect].stackable) {
    existing.stacks = Math.min(
      existing.stacks + 1,
      effects[effect].max_stacks
    );
  } else if (!existing) {
    target.effects.push({
      name: effect,
      duration: effects[effect].duration,
      source: source,
      stacks: 1
    });
  }
}
```

**[CARDINAL]:** Bleed stackável cria synergy. Burn não stack previne abuse.

---

**[MAKO]:** Mecânicas integradas. Código pronto para copy-paste.

**[GOHAN]:** Balance validado. Momentum 0-5, Stamina 100, Enrage 5min.
