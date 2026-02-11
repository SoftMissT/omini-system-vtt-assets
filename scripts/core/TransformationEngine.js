/* ═══════════════════════════════════════════════════════════════
 * OMNI-SYSTEM v4.0 - TRANSFORMATION ENGINE
 * Unifica: Bankai, KI, Cosmo, Expansão de Domínio
 * Autor: MAKO-SYN05 [SINON]
 * ═══════════════════════════════════════════════════════════════ */

class TransformationEngine {
  static TYPES = {
    BANKAI: {
      name: "Bankai",
      cost: { type: "reiatsu", percent: 0.7 },
      multiplier: { min: 5, max: 10 },
      duration: { rounds: 10 },
      vfx: "modules/omini-system-assets/assets/vfx/bankai_blast.webm",
      sfx: "modules/omini-system-assets/assets/audio/bankai_scream.ogg",
      color: "#ff0000",
      command: "BANKAI",
    },
    KAIOKEN: {
      name: "Kaioken",
      cost: { type: "hp", perTurn: true },
      multiplier: { min: 2, max: 20 },
      duration: { rounds: Infinity },
      vfx: "modules/omini-system-assets/assets/vfx/aura_charge.webm",
      color: "#ff0000",
    },
    SSJ: {
      name: "Super Saiyan",
      cost: { type: "ki", percent: 0.5, perTurn: 0.15 },
      multiplier: { base: 50 },
      duration: { rounds: Infinity },
      vfx: "modules/omini-system-assets/assets/vfx/aura_charge.webm",
      color: "#ffff00",
      requirement: { trigger: "emotional" },
    },
    COSMO: {
      name: "Cosmo",
      cost: { type: "burn", dynamic: true },
      limit: "overload",
      vfx: "modules/omini-system-assets/assets/vfx/cosmo_aura.webm",
      color: "#00ddff",
    },
    DOMAIN_EXPANSION: {
      name: "Expansão de Domínio",
      cost: { type: "cursed_energy", percent: 0.8 },
      effect: "sure_hit",
      duration: { rounds: 5 },
      vfx: "modules/omini-system-assets/assets/vfx/domain_barrier_up.webm",
      sfx: "modules/omini-system-assets/assets/audio/domain_expansion_chant.ogg",
      template: true,
    },
  };

  static async activate(actor, transformationType) {
    const config = this.TYPES[transformationType];
    if (!config) {
      ui.notifications.error(
        `❌ Transformação desconhecida: ${transformationType}`,
      );
      return null;
    }

    const canAfford = await this._validateCost(actor, config.cost);
    if (!canAfford) {
      ui.notifications.warn(`⚠️ Recursos insuficientes para ${config.name}`);
      return null;
    }

    if (config.command) {
      const command = await Dialog.prompt({
        title: `LIBERAÇÃO: ${config.name}`,
        content: `
          <div style="text-align:center; background: ${config.color}; padding: 1em; border-radius: 8px;">
            <h2 style="color: white; text-shadow: 0 0 10px black;">${config.command}</h2>
            <p style="color: white;">Digite o nome verdadeiro da transformação:</p>
            <input type="text" id="command-input" style="width: 100%; text-align: center; font-size: 1.2em;" />
          </div>
        `,
        callback: (html) => html.find("#command-input").val(),
      });

      if (!command || command.toLowerCase() !== config.name.toLowerCase()) {
        ui.notifications.error("A transformação rejeitou o comando.");
        return null;
      }
    }

    await this._deductCost(actor, config.cost);
    const effectData = await this._buildEffect(
      actor,
      config,
      transformationType,
    );
    await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
    await this._playEffects(actor, config);
    await this._chatMessage(actor, config);

    Hooks.call(`omniCore.transformation.${transformationType.toLowerCase()}`, {
      actor,
      config,
    });

    await actor.setFlag("world", `sao_transformation_${actor.id}`, {
      type: transformationType,
      startedAt: Date.now(),
      config,
    });

    return effectData;
  }

  static async _validateCost(actor, cost) {
    if (cost.type === "reiatsu") {
      const current = actor.getFlag("world", "reiatsu_current") || 100;
      return current >= 100 * cost.percent;
    }
    if (cost.type === "ki") {
      const current = actor.system.attributes.ki?.value || 100;
      return current >= 100 * cost.percent;
    }
    if (cost.type === "cursed_energy") {
      const current = actor.system.attributes.cursed_energy?.value || 100;
      return current >= 100 * cost.percent;
    }
    if (cost.type === "hp") {
      return actor.system.attributes.hp.value > 10;
    }
    return true;
  }

  static async _deductCost(actor, cost) {
    if (cost.type === "reiatsu") {
      const current = actor.getFlag("world", "reiatsu_current") || 100;
      await actor.setFlag(
        "world",
        "reiatsu_current",
        current - 100 * cost.percent,
      );
    }
    if (cost.type === "ki") {
      const current = actor.system.attributes.ki.value;
      await actor.update({
        "system.attributes.ki.value": current - 100 * cost.percent,
      });
    }
    if (cost.type === "cursed_energy") {
      const current = actor.system.attributes.cursed_energy.value;
      await actor.update({
        "system.attributes.cursed_energy.value": current - 100 * cost.percent,
      });
    }
  }

  static async _buildEffect(actor, config, type) {
    const changes = [];
    if (config.multiplier) {
      const mult = config.multiplier.base || config.multiplier.min;
      changes.push({
        key: "system.attributes.atk.value",
        mode: 2,
        value: Math.floor(actor.system.attributes.atk.value * (mult / 10)),
      });
      changes.push({
        key: "system.attributes.def.value",
        mode: 2,
        value: Math.floor(actor.system.attributes.def.value * (mult / 10)),
      });
    }
    if (config.effect === "sure_hit") {
      changes.push({ key: "flags.world.sure_hit", mode: 5, value: true });
    }
    return {
      name: `TRANSFORMATION: ${config.name}`,
      icon: "icons/magic/light/explosion-star-glow-yellow.webp",
      changes,
      duration: config.duration,
      flags: { world: { transformation_type: type, original_config: config } },
    };
  }

  static async _playEffects(actor, config) {
    if (!game.modules.get("sequencer")?.active) return;
    try {
      const { Sequence } = await import("/modules/sequencer/scripts/module.js");
      const seq = new Sequence();
      if (config.vfx) {
        seq
          .effect()
          .file(config.vfx)
          .atLocation(actor)
          .scale(3)
          .duration(3000)
          .tint(config.color);
      }
      if (config.sfx) {
        seq.sound().file(config.sfx).volume(0.8);
      }
      await seq.play();
    } catch (error) {
      console.warn("[TransformationEngine] Sequencer error:", error);
    }
  }

  static async _chatMessage(actor, config) {
    const content = `
      <div style="background: linear-gradient(135deg, #000 0%, ${config.color}33 100%); border: 3px solid ${config.color}; border-radius: 8px; padding: 1.5em; text-align: center; color: white;">
        <h1 style="color: ${config.color}; font-family: 'Orbitron', sans-serif; font-size: 2.5em; text-shadow: 0 0 15px ${config.color}; margin: 0 0 0.5em 0;">${config.command || config.name.toUpperCase()}</h1>
        <h2 style="margin: 0 0 1em 0;">${config.name}</h2>
        ${config.multiplier ? `<p style="color: #FFD700;">Poder multiplicado por <strong>x${config.multiplier.base || config.multiplier.min}</strong></p>` : ""}
        ${config.effect ? `<p style="color: #FF2B4A;">Efeito: <strong>${config.effect}</strong></p>` : ""}
      </div>
    `;
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content,
    });
  }
}

globalThis.TransformationEngine = TransformationEngine;
Hooks.once("ready", () => {
  console.log("✅ TransformationEngine v4.0 carregado");
});
