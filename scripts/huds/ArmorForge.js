/* ═══════════════════════════════════════════════════════════════
 * OMNI-SYSTEM v4.0 - ARMOR FORGE
 * Sistema de Armaduras com 4 classes + Enchantments
 * Inspiração: RPGs clássicos + BDO/Lineage
 * Autor: MAKO-SYN05 [AKENO + SINON]
 * ═══════════════════════════════════════════════════════════════ */

export class ArmorForge {

  // ─────────────────────────────────────────────────────────────
  // CLASSES DE ARMADURA
  // ─────────────────────────────────────────────────────────────
  static ARMOR_CLASSES = {
    LIGHT: {
      name: 'Leve (Couro/Tecido)',
      ac: 1,
      rd: 0, // Reduction Damage
      dodge: 2,
      moveSpeed: 0,
      passive: 'Fluxo Livre (Primeira esquiva sem delay)',
      icon: 'icons/equipment/chest/leather-jerkin-brown.webp',
      weight: 'light'
    },
    MEDIUM: {
      name: 'Média (Malha/Placas Leves)',
      ac: 3,
      rd: 1,
      dodge: 0,
      moveSpeed: 0,
      passive: 'Equilíbrio (Converte bloqueio em parry)',
      icon: 'icons/equipment/chest/breastplate-metal-scaled.webp',
      weight: 'medium'
    },
    HEAVY: {
      name: 'Pesada (O-Yoroi/Full Plate)',
      ac: 5,
      rd: 3,
      dodge: -2,
      moveSpeed: -3,
      passive: 'Fortaleza (Imune a knockdown comum)',
      icon: 'icons/equipment/chest/plate-armor-steel.webp',
      weight: 'heavy'
    },
    CONCEPTUAL: {
      name: 'Conceitual (Vestes Espirituais)',
      ac: 'dynamic', // Baseado em ESPÍRITO
      rd: 0,
      dodge: 0,
      moveSpeed: 0,
      passive: 'Fé (Se duvidar, defesa = 0)',
      icon: 'icons/equipment/chest/robe-collared-purple.webp',
      weight: 'none',
      requirement: { esp: 5 }
    }
  };

  // ─────────────────────────────────────────────────────────────
  // EQUIPAR ARMADURA
  // ─────────────────────────────────────────────────────────────
  static async equip(actor) {
    const choice = await Dialog.wait({
      title: '⚔️ Equipar Armadura',
      content: `
        <div style="padding: 1em;">
          <p style="margin-bottom: 1em;">Selecione o tipo de chassi defensivo:</p>
          <div style="display: grid; gap: 0.5em;">
            ${this._renderArmorOptions()}
          </div>
        </div>
      `,
      buttons: {
        light: { label: 'Leve', callback: () => 'LIGHT' },
        medium: { label: 'Média', callback: () => 'MEDIUM' },
        heavy: { label: 'Pesada', callback: () => 'HEAVY' },
        conceptual: { label: 'Conceitual', callback: () => 'CONCEPTUAL' }
      }
    });

    if (!choice) return;

    const armor = this.ARMOR_CLASSES[choice];

    // Validar requisitos
    if (armor.requirement) {
      const esp = actor.system.attributes.esp?.value || 0;
      if (esp < armor.requirement.esp) {
        ui.notifications.error(`❌ Requer ESPÍRITO ${armor.requirement.esp}`);
        return;
      }
    }

    // Calcular AC
    const cor = actor.system.attributes.cor?.value || 0;
    let finalAC = 8 + cor;

    if (armor.ac === 'dynamic') {
      const esp = actor.system.attributes.esp?.value || 0;
      finalAC += esp;
    } else {
      finalAC += armor.ac;
    }

    // Atualizar ator
    await actor.update({
      'system.attributes.ac.value': finalAC
    });

    // Salvar flags
    await actor.setFlag('world', `sao_armor_${actor.id}`, {
      type: choice,
      config: armor,
      equippedAt: Date.now()
    });

    await actor.setFlag('world', 'damage_reduction', armor.rd);

    // Aplicar Active Effect
    const changes = [];

    if (armor.dodge !== 0) {
      changes.push({
        key: 'system.attributes.ac.bonus',
        mode: 2,
        value: armor.dodge
      });
    }

    if (armor.moveSpeed !== 0) {
      changes.push({
        key: 'system.attributes.movement.walk',
        mode: 2,
        value: armor.moveSpeed
      });
    }

    if (changes.length > 0) {
      await actor.createEmbeddedDocuments('ActiveEffect', [{
        name: `Armadura: ${armor.name}`,
        icon: armor.icon,
        changes,
        disabled: false
      }]);
    }

    // Chat message
    await this._chatEquip(actor, armor, finalAC);

    // Evento
    Hooks.call('omniCore.armor.equipped', { actor, armor, ac: finalAC });
  }

  // ─────────────────────────────────────────────────────────────
  // ENCHANTMENTS (UPGRADE DE ARMADURA)
  // ─────────────────────────────────────────────────────────────
  static ENCHANTMENTS = {
    FIRE_RESIST: {
      name: 'Resistência ao Fogo',
      cost: 500,
      effect: { type: 'resist', element: 'fire', value: 5 }
    },
    SHADOW_BLEND: {
      name: 'Fusão com Sombras',
      cost: 1000,
      effect: { type: 'stealth', bonus: 5 }
    },
    REGENERATION: {
      name: 'Regeneração Lenta',
      cost: 1500,
      effect: { type: 'heal', perTurn: 2 }
    },
    THORNS: {
      name: 'Espinhos Retaliantes',
      cost: 800,
      effect: { type: 'reflect', damage: '1d4' }
    }
  };

  static async applyEnchantment(actor, enchantType) {
    const enchant = this.ENCHANTMENTS[enchantType];
    if (!enchant) {
      ui.notifications.error(`❌ Enchantment desconhecido: ${enchantType}`);
      return null;
    }

    // Validar recursos (gold/materials)
    const gold = actor.system.currency?.gp || 0;
    if (gold < enchant.cost) {
      ui.notifications.warn(`⚠️ Gold insuficiente (${gold}/${enchant.cost})`);
      return null;
    }

    // Deduzir custo
    await actor.update({
      'system.currency.gp': gold - enchant.cost
    });

    // Aplicar efeito
    const changes = [];

    switch (enchant.effect.type) {
      case 'resist':
        changes.push({
          key: `system.traits.dr.value.${enchant.effect.element}`,
          mode: 2,
          value: enchant.effect.value
        });
        break;

      case 'stealth':
        changes.push({
          key: 'system.skills.ste.bonus',
          mode: 2,
          value: enchant.effect.bonus
        });
        break;

      case 'heal':
        // Implementar regen via hook
        Hooks.on('updateCombat', async (combat) => {
          if (combat.combatant?.actor?.id === actor.id) {
            const currentHP = actor.system.attributes.hp.value;
            const maxHP = actor.system.attributes.hp.max;
            const newHP = Math.min(maxHP, currentHP + enchant.effect.perTurn);
            await actor.update({ 'system.attributes.hp.value': newHP });
          }
        });
        break;

      case 'reflect':
        // Flag para processing manual
        await actor.setFlag('world', 'thorns_damage', enchant.effect.damage);
        break;
    }

    if (changes.length > 0) {
      await actor.createEmbeddedDocuments('ActiveEffect', [{
        name: `Enchantment: ${enchant.name}`,
        icon: 'icons/magic/symbols/rune-sigil-red.webp',
        changes
      }]);
    }

    // Chat
    await this._chatEnchant(actor, enchant);

    return enchant;
  }

  // ─────────────────────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────────────────────
  static _renderArmorOptions() {
    return Object.entries(this.ARMOR_CLASSES).map(([key, armor]) => {
      const reqText = armor.requirement ? ` (REQ: ESP ${armor.requirement.esp})` : '';
      return `
        <div style="padding: 0.5em; background: rgba(0,0,0,0.3); border-radius: 4px;">
          <strong>${armor.name}</strong>${reqText}<br>
          <span style="font-size: 0.85em; color: #aaa;">
            AC: +${armor.ac === 'dynamic' ? 'ESP' : armor.ac} | RD: ${armor.rd} | Dodge: ${armor.dodge >= 0 ? '+' : ''}${armor.dodge}
          </span><br>
          <em style="font-size: 0.8em; color: #FFD700;">${armor.passive}</em>
        </div>
      `;
    }).join('');
  }

  static async _chatEquip(actor, armor, finalAC) {
    const content = `
      <div style="background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2a 100%); border: 2px solid #00D9FF; padding: 1em; border-radius: 8px; color: white;">
        <h3 style="margin: 0 0 0.5em 0; color: #00D9FF;">⚔️ ARMADURA EQUIPADA</h3>
        <p><strong>Tipo:</strong> ${armor.name}</p>
        <p><strong>AC Total:</strong> ${finalAC}</p>
        <p><strong>Redução de Dano:</strong> ${armor.rd}</p>
        <p style="color: #FFD700; font-size: 0.9em; margin-top: 0.5em;">
          <em>${armor.passive}</em>
        </p>
      </div>
    `;

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content
    });
  }

  static async _chatEnchant(actor, enchant) {
    const content = `
      <div style="background: #1a0a3a; border: 2px solid #A855F7; padding: 1em; border-radius: 8px; color: white;">
        <h3 style="margin: 0 0 0.5em 0; color: #A855F7;">✨ ENCHANTMENT APLICADO</h3>
        <p><strong>${enchant.name}</strong></p>
        <p style="font-size: 0.9em; color: #aaa;">Custo: ${enchant.cost} GP</p>
      </div>
    `;

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content
    });
  }
}

// ═══════════════════════════════════════════════════════════════
// EXPORTAR PARA ESCOPO GLOBAL
// ═══════════════════════════════════════════════════════════════
globalThis.ArmorForge = ArmorForge;

Hooks.once('ready', () => {
  console.log('✅ ArmorForge v4.0 carregado');
});
