/* ═══════════════════════════════════════════════════════════════
 * OMNI-SYSTEM v4.0 - INCARNATION ENGINE
 * Sistema de Vontade que quebra regras da realidade
 * Inspiração: SAO Alicization, ORV Fourth Wall, TBATE Will
 * Autor: MAKO-SYN05 [CARDINAL + GOHAN]
 * ═══════════════════════════════════════════════════════════════ */

export class IncarnationEngine {

  // ─────────────────────────────────────────────────────────────
  // TIPOS DE INCARNATION
  // ─────────────────────────────────────────────────────────────
  static TYPES = {
    WEAPON_FULL_CONTROL: {
      name: 'Controle Total de Arma',
      cost: 5,
      effect: 'ignore_durability',
      desc: 'Arma nunca quebra durante combate'
    },
    ENHANCE_ARMAMENT: {
      name: 'Enhance Armament',
      cost: 10,
      effect: 'elemental_imbue',
      desc: 'Imbui arma com elemento do ambiente'
    },
    RELEASE_RECOLLECTION: {
      name: 'Release Recollection',
      cost: 50,
      effect: 'reality_override',
      desc: 'Libera memória primordial da arma'
    },
    FOURTH_WALL: {
      name: 'Fourth Wall (ORV)',
      cost: 30,
      effect: 'meta_knowledge',
      desc: 'Vê a narrativa como ela é'
    },
    NEGATIVE_INCARNATION: {
      name: 'Incarnação Negativa',
      cost: 0,
      effect: 'fear_debuff',
      desc: 'Dúvida materializa fracasso'
    }
  };

  // ─────────────────────────────────────────────────────────────
  // ESTADO DE INCARNATION
  // ─────────────────────────────────────────────────────────────
  static async getState(actor) {
    const data = actor.getFlag('world', `sao_incarnation_${actor.id}`) || {
      conviction: 50, // 0-100
      activeManifestations: [],
      negativeStack: 0
    };
    return data;
  }

  static async setState(actor, data) {
    await actor.setFlag('world', `sao_incarnation_${actor.id}`, data);
  }

  // ─────────────────────────────────────────────────────────────
  // MANIFESTAR INCARNATION
  // ─────────────────────────────────────────────────────────────
  static async manifest(actor, type, target = null) {
    const config = this.TYPES[type];
    if (!config) {
      ui.notifications.error(`❌ Tipo de Incarnation desconhecido: ${type}`);
      return null;
    }

    const state = await this.getState(actor);

    // Validar Conviction
    if (state.conviction < config.cost) {
      ui.notifications.warn(`⚠️ Conviction insuficiente (${state.conviction}/${config.cost})`);
      return null;
    }

    // Teste de manifestação (Roll de convicção vs dificuldade)
    const roll = await new Roll('1d100').evaluate();
    const dc = 100 - state.conviction; // Quanto maior a conviction, menor a DC

    if (game.dice3d) await game.dice3d.showForRoll(roll);

    if (roll.total >= dc) {
      // Sucesso
      await this._applyEffect(actor, config, target);
      
      // Deduzir Conviction
      state.conviction = Math.max(0, state.conviction - config.cost);
      state.activeManifestations.push(type);
      await this.setState(actor, state);

      // Chat message
      await this._chatSuccess(actor, config);

      // Evento
      Hooks.call('omniCore.incarnation.manifested', { actor, type, config });

      return { success: true, type, config };

    } else {
      // Falha: Incarnação Negativa
      await this._applyNegative(actor);
      await this._chatFailure(actor, config);

      return { success: false, type };
    }
  }

  // ─────────────────────────────────────────────────────────────
  // APLICAR EFEITO
  // ─────────────────────────────────────────────────────────────
  static async _applyEffect(actor, config, target) {
    switch (config.effect) {
      case 'ignore_durability':
        await actor.setFlag('world', 'weapon_immortal', true);
        break;

      case 'elemental_imbue':
        await this._enhanceArmament(actor);
        break;

      case 'reality_override':
        await this._releaseRecollection(actor, target);
        break;

      case 'meta_knowledge':
        await this._fourthWall(actor);
        break;
    }
  }

  // ─────────────────────────────────────────────────────────────
  // ENHANCE ARMAMENT (SAO Alicization)
  // ─────────────────────────────────────────────────────────────
  static async _enhanceArmament(actor) {
    const elements = {
      fire: { name: '🔥 Thermal', damage: '1d6[fire]', color: '#ff4400' },
      ice: { name: '❄️ Cryogenic', damage: '1d6[cold]', color: '#00ddff' },
      wind: { name: '💨 Aerial', damage: '1d4[slashing]', color: '#ccffcc' },
      light: { name: '✨ Luminous', damage: '1d6[radiant]', color: '#ffffff' }
    };

    const choice = await Dialog.wait({
      title: 'System Call: Enhance Armament',
      content: '<p>Escolha o elemento para drenar do ambiente:</p>',
      buttons: {
        fire: { label: 'Thermal', callback: () => 'fire' },
        ice: { label: 'Cryogenic', callback: () => 'ice' },
        wind: { label: 'Aerial', callback: () => 'wind' },
        light: { label: 'Luminous', callback: () => 'light' }
      }
    });

    if (!choice) return;
    const el = elements[choice];

    // Aplicar Active Effect
    await actor.createEmbeddedDocuments('ActiveEffect', [{
      name: `Enhance: ${el.name}`,
      icon: 'icons/magic/fire/weapon-enchant.webp',
      changes: [{
        key: 'system.bonuses.mwak.damage',
        mode: 2,
        value: el.damage
      }],
      duration: { turns: 5 }
    }]);

    // VFX
    if (game.modules.get('sequencer')?.active) {
      try {
        const { Sequence } = await import('/modules/sequencer/scripts/module.js');
        await new Sequence()
          .effect()
          .file(`modules/omini-system-assets/assets/vfx/enhance_${choice}.webm`)
          .atLocation(actor)
          .tint(el.color)
          .attachTo(actor)
          .play();
      } catch (error) {
        console.warn('[Incarnation] VFX error:', error);
      }
    }

    // Chat
    await ChatMessage.create({
      content: `
        <div style="border: 2px solid ${el.color}; padding: 10px; border-radius: 8px;">
          <h3>SYSTEM CALL: ENHANCE ARMAMENT!</h3>
          <p>A arma foi revestida com elemento <strong>${el.name}</strong>.</p>
          <p>+${el.damage} de dano.</p>
        </div>
      `
    });
  }

  // ─────────────────────────────────────────────────────────────
  // RELEASE RECOLLECTION (SAO Alicization)
  // ─────────────────────────────────────────────────────────────
  static async _releaseRecollection(actor, target) {
    // Confirmar risco
    const confirm = await Dialog.confirm({
      title: '⚠️ AVISO DE DURABILIDADE',
      content: '<p>Release Recollection consumirá <strong>50% da Durabilidade</strong> da arma. Se falhar, a arma pode quebrar. Continuar?</p>'
    });

    if (!confirm) return;

    // Input do comando
    const chant = await Dialog.prompt({
      title: 'Memória da Arma',
      content: "<p>Recite a memória (Ex: 'Floresça, Rosa Azul'):</p><input type='text'/>",
      callback: html => html.find('input').val()
    });

    if (!chant) return;

    // Efeito massivo de AoE
    const targets = canvas.tokens.placeables.filter(t => {
      const dist = canvas.grid.measureDistance(actor.token, t);
      return dist <= 30 && t.id !== actor.token?.id && t.actor.type === 'npc';
    });

    // Aplicar congelamento/paralisia em massa
    for (const t of targets) {
      await t.actor.createEmbeddedDocuments('ActiveEffect', [{
        name: 'Release Recollection: Congelamento',
        icon: 'icons/magic/water/ice-cube.webp',
        changes: [{
          key: 'system.attributes.movement.walk',
          mode: 0,
          value: 0
        }],
        duration: { rounds: 3 }
      }]);
    }

    // VFX global
    if (game.modules.get('sequencer')?.active) {
      try {
        const { Sequence } = await import('/modules/sequencer/scripts/module.js');
        await new Sequence()
          .effect()
          .file('modules/omini-system-assets/assets/vfx/ice_field_massive.webm')
          .atLocation(actor)
          .scale(10)
          .belowTokens()
          .duration(5000)
          .play();
      } catch (error) {
        console.warn('[Incarnation] VFX error:', error);
      }
    }

    // Chat
    await ChatMessage.create({
      content: `
        <div style="background: linear-gradient(to right, #000044, #00ccff); color: white; padding: 15px; border: 2px solid white; border-radius: 8px;">
          <h2>RELEASE RECOLLECTION</h2>
          <p><em>"${chant}!!"</em></p>
          <p>A realidade foi reescrita pela memória da arma. ${targets.length} alvos afetados.</p>
        </div>
      `
    });
  }

  // ─────────────────────────────────────────────────────────────
  // FOURTH WALL (ORV)
  // ─────────────────────────────────────────────────────────────
  static async _fourthWall(actor) {
    await actor.createEmbeddedDocuments('ActiveEffect', [{
      name: 'Fourth Wall',
      icon: 'icons/magic/perception/eye-tendrils-pink.webp',
      changes: [
        {
          key: 'flags.world.meta_vision',
          mode: 5,
          value: true
        },
        {
          key: 'system.attributes.men.value',
          mode: 2,
          value: 5
        }
      ],
      duration: { rounds: 5 }
    }]);

    await ChatMessage.create({
      content: `
        <div style="background: #000; color: #fff; border: 2px solid #9C27B0; padding: 1em; border-radius: 8px;">
          <h3 style="color: #9C27B0;">「 Fourth Wall 」</h3>
          <p>A narrativa se revela. Você vê além do que deveria ser possível.</p>
        </div>
      `
    });
  }

  // ─────────────────────────────────────────────────────────────
  // INCARNÇÃO NEGATIVA (FALHA)
  // ─────────────────────────────────────────────────────────────
  static async _applyNegative(actor) {
    const state = await this.getState(actor);
    state.negativeStack = (state.negativeStack || 0) + 1;
    await this.setState(actor, state);

    await actor.createEmbeddedDocuments('ActiveEffect', [{
      name: 'Incarnação Negativa',
      icon: 'icons/magic/unholy/barrier-shield-glowing-pink.webp',
      changes: [
        {
          key: 'system.attributes.def.value',
          mode: 2,
          value: -2 * state.negativeStack
        },
        {
          key: 'flags.world.fear_debuff',
          mode: 5,
          value: true
        }
      ],
      duration: { rounds: 3 }
    }]);
  }

  // ─────────────────────────────────────────────────────────────
  // CHAT MESSAGES
  // ─────────────────────────────────────────────────────────────
  static async _chatSuccess(actor, config) {
    const content = `
      <div style="background: linear-gradient(135deg, #1a0a3a 0%, #3a0a5a 100%); border: 2px solid #A855F7; padding: 1em; border-radius: 8px; color: white;">
        <h3 style="margin: 0; color: #A855F7;">✨ INCARNATION MANIFESTED</h3>
        <p><strong>${config.name}</strong></p>
        <p style="font-size: 0.9em;">${config.desc}</p>
      </div>
    `;

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content
    });
  }

  static async _chatFailure(actor, config) {
    const content = `
      <div style="background: #1a0a0a; border: 2px solid #666; padding: 1em; border-radius: 8px; color: #aaa;">
        <h3 style="margin: 0; color: #666;">💀 Incarnação Falhou</h3>
        <p>Tentativa: <strong>${config.name}</strong></p>
        <p style="color: #FF2B4A;">Incarnação Negativa ativada</p>
      </div>
    `;

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content
    });
  }

  // ─────────────────────────────────────────────────────────────
  // RECUPERAR CONVICTION
  // ─────────────────────────────────────────────────────────────
  static async recoverConviction(actor, amount) {
    const state = await this.getState(actor);
    state.conviction = Math.min(100, state.conviction + amount);
    await this.setState(actor, state);

    ui.notifications.info(`✨ Conviction recuperada: +${amount} (${state.conviction}/100)`);
  }
}

// ═══════════════════════════════════════════════════════════════
// EXPORTAR PARA ESCOPO GLOBAL
// ═══════════════════════════════════════════════════════════════
globalThis.IncarnationEngine = IncarnationEngine;

Hooks.once('ready', () => {
  console.log('✅ IncarnationEngine v4.0 carregado');
});
