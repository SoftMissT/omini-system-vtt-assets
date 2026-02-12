// SERPENTE GÊMEA - Ignora bloqueio
const nv = skill.system.nivel;
const custo = skill.system.custo[nv];
const dano = skill.system.dano[nv];

if(actor.system.resources.pc.value < custo) return;
actor.update({"system.resources.pc.value": actor.system.resources.pc.value - custo});

const target = game.user.targets.first();
const roll = await new Roll(dano).evaluate();
const block = target.actor.system.defenses.block || 0;

target.actor.update({"system.defenses.block": Math.max(0, block-3)});
await target.actor.applyDamage(roll.total);
target.actor.update({"system.defenses.block": block});

await game.modules.get('sequencer')?.effects?.playOn(target,{file:"jb2a.impact.ground_crack.brown.02"});
