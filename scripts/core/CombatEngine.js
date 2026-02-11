/* ═══════════════════════════════════════════════════════════════
 * OMNI-SYSTEM v4.0 - COMBAT ENGINE
 * Parry System (D100 3-Phase) + Sword Skills (SAO/King's Avatar)
 * Autor: MAKO-SYN05 [SINON + SOFT_MIST]
 * ═══════════════════════════════════════════════════════════════ */

class CombatEngine {
  static SWORD_SKILLS = {
    LINEAR: {
      name: "Linear",
      tier: 1,
      momentum: 1,
      damage: "1d8 + @atk",
      afterDelay: 0.5,
      vfx: "modules/omini-system-assets/assets/vfx/linear_thrust.webm",
    },
    VORPAL_STRIKE: {
      name: "Vorpal Strike",
      tier: 2,
      momentum: 2,
      damage: "2d6 + @atk",
      afterDelay: 1.0,
      effect: "posture_break",
      vfx: "modules/omini-system-assets/assets/vfx/vorpal_slash.webm",
    },
    HORIZONTAL_SQUARE: {
      name: "Horizontal Square",
      tier: 3,
      momentum: 3,
      damage: "4 × (1d6 + @atk)",
      hits: 4,
      afterDelay: 2.0,
      aoe: true,
      vfx: "modules/omini-system-assets/assets/vfx/square_slash.webm",
    },
    STARBURST_STREAM: {
      name: "Starburst Stream",
      tier: 5,
      momentum: 10,
      damage: "16 × (1d4 + @atk)",
      hits: 16,
      afterDelay: 5.0,
      risk: "collapse",
      vfx: "modules/omini-system-assets/assets/vfx/starburst_stream.webm",
      requirement: { dualWield: true },
    },
    THE_ECLIPSE: {
      name: "The Eclipse",
      tier: 6,
      momentum: 15,
      damage: "(@conviction × 2) + (@hpLost × 0.5) + 3d10",
      narrative: true,
      afterDelay: 0,
      vfx: "modules/omini-system-assets/assets/vfx/eclipse.webm",
    },
  };

  static async executeSwordSkill(actor, skillName, target) {
    const skill = this.SWORD_SKILLS[skillName];
    if (!skill) return null;
    const momentum = actor.getFlag("world", `sao_momentum_${actor.id}`) || 0;
    if (momentum < skill.momentum)
      return ui.notifications.warn(`⚠️ Momentum insuficiente`);

    await actor.setFlag(
      "world",
      `sao_momentum_${actor.id}`,
      momentum - skill.momentum,
    );
    let totalDamage = 0;
    if (skill.hits) {
      for (let i = 0; i < skill.hits; i++) {
        const roll = await new Roll(
          skill.damage.replace(/@atk/g, actor.system.attributes.atk.value),
        ).evaluate();
        totalDamage += roll.total;
        if (game.dice3d) await game.dice3d.showForRoll(roll);
        await new Promise((r) => setTimeout(r, 100));
      }
    } else {
      const roll = await new Roll(
        skill.damage.replace(/@atk/g, actor.system.attributes.atk.value),
      ).evaluate();
      totalDamage = roll.total;
      if (game.dice3d) await game.dice3d.showForRoll(roll);
    }
    if (target)
      await target.actor.update({
        "system.attributes.hp.value": Math.max(
          0,
          target.actor.system.attributes.hp.value - totalDamage,
        ),
      });
    await this._playSwordSkillVFX(actor, skill, target);
    await this._chatSwordSkill(actor, skill, totalDamage);
    return { skill, damage: totalDamage };
  }

  static async attemptParry(defender, attacker, attackData) {
    const momentum =
      defender.getFlag("world", `sao_momentum_${defender.id}`) || 0;
    if (momentum < 2) return { success: false };
    await defender.setFlag(
      "world",
      `sao_momentum_${defender.id}`,
      momentum - 2,
    );

    const defMEN = defender.system.attributes.men?.value || 0;
    const atkMEN = attacker.system.attributes.men?.value || 0;
    const dRoll = await new Roll(`1d100 + ${defMEN * 5}`).evaluate();
    const aRoll = await new Roll(`1d100 + ${atkMEN * 5}`).evaluate();
    if (dRoll.total - aRoll.total >= 0) {
      const exec = await new Roll(
        `1d100 + ${defender.system.attributes.cor.value * 5}`,
      ).evaluate();
      if (exec.total >= (attackData.cd || 40))
        return { success: true, type: "perfect" };
    }
    return { success: false };
  }

  static async _playSwordSkillVFX(actor, skill, target) {
    /* VFX logic */
  }
  static async _chatSwordSkill(actor, skill, damage) {
    /* Chat logic */
  }
}
globalThis.CombatEngine = CombatEngine;
Hooks.once("ready", () => {
  console.log("✅ CombatEngine v4.0 carregado");
});
