/**
 * 🧠 OMNI-CORE v13.351+
 * Central Nervous System for Omni-System Ecosystem
 */

class OmniCore {
  static ID = 'omini-system';
  static VERSION = '1.0.0';

  /**
   * Event Bus Wrapper
   */
  static events = {
    emit: (eventName, payload) => {
      console.log(`[OMNI-CORE] Emitting: ${eventName}`, payload);
      Hooks.call(`omniCore.${eventName}`, payload);
    },
    on: (eventName, callback) => {
      Hooks.on(`omniCore.${eventName}`, callback);
    },
    off: (eventName, callback) => {
      Hooks.off(`omniCore.${eventName}`, callback);
    }
  };

  /**
   * Data Synchronization & Persistence
   */
  static data = {
    _debounceTimers: {},

    /**
     * Get data from actor flags
     * @param {Actor} actor 
     * @param {string} key - Macro/module key (e.g., 'synthesis')
     * @returns {Object}
     */
    get: (actor, key) => {
      if (!actor) return null;
      return actor.getFlag('world', `sao_${key}_${actor.id}`) || {};
    },

    /**
     * Set data to actor flags with debounce
     * @param {Actor} actor 
     * @param {string} key 
     * @param {Object} data 
     * @param {number} delay - default 800ms
     */
    set: async (actor, key, data, delay = 800) => {
      if (!actor) return;
      
      const timerKey = `${actor.id}_${key}`;
      
      if (OmniCore.data._debounceTimers[timerKey]) {
        clearTimeout(OmniCore.data._debounceTimers[timerKey]);
      }

      return new Promise((resolve) => {
        OmniCore.data._debounceTimers[timerKey] = setTimeout(async () => {
          try {
            await actor.setFlag('world', `sao_${key}_${actor.id}`, data);
            
            OmniCore.events.emit(`dataUpdated.${key}`, { 
              actorId: actor.id, 
              data 
            });
            
            // Visual feedback could go here
            ui.notifications.info(`Dados salvos: ${key}`);
            resolve(true);
          } catch (error) {
            console.error(`[OMNI-CORE] Save failed for ${key}:`, error);
            ui.notifications.error(`Erro ao salvar dados de ${key}`);
            resolve(false);
          }
          delete OmniCore.data._debounceTimers[timerKey];
        }, delay);
      });
    },

    /**
     * Clear specific data
     */
    clear: async (actor, key) => {
      if (!actor) return;
      await actor.unsetFlag('world', `sao_${key}_${actor.id}`);
    }
  };

  /**
   * Actor Resolution Protocol
   */
  static actor = {
    resolve: async () => {
      // 1. Selected Token
      const tokens = canvas.tokens.controlled;
      if (tokens.length === 1) return tokens[0].actor;

      // 2. Assigned Character
      const userChar = game.user.character;
      if (userChar) return userChar;

      // 3. GM Selection (if applicable)
      if (game.user.isGM) {
        // Simple fallback for GM if no token selected
        // In a real scenario, this might open a dialog
        // For now, return null to force selection
        ui.notifications.warn("[OMNI-CORE] Selecione um token ou vincule um personagem.");
        return null;
      }

      ui.notifications.error("[OMNI-CORE] Nenhum personagem encontrado.");
      return null;
    }
  };

  /**
   * Initialization
   */
  static init() {
    console.log(`%c OMNI-SYSTEM v${OmniCore.VERSION} | SYSTEMS ONLINE `, 'background: #000; color: #FFD700; font-size: 20px; font-weight: bold;');
    
    // Register settings
    game.settings.register(OmniCore.ID, "gemini_api_key", {
      name: "Gemini API Key",
      hint: "API Key for AI Content Generation",
      scope: "world",
      config: true,
      type: String,
      default: ""
    });

    // Initialize Subsystems
    OmniCore.events.emit('coreReady', { timestamp: Date.now() });
  }
}

// Expose to global scope
window.OmniCore = OmniCore;

// Hook into Foundry
Hooks.once('ready', OmniCore.init);
