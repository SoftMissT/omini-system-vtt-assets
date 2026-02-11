/**
 * ═══════════════════════════════════════════════════════════════════════
 * 🧿 JJK CHARACTER SHEET — OMNI-SYSTEM Integration
 * ═══════════════════════════════════════════════════════════════════════
 * Versão: 1.0.0
 * Blueprint: [OMNI-SYSTEM FOUNDRY VTT]
 * ═══════════════════════════════════════════════════════════════════════
 */

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

class CharacterSheetJJK extends HandlebarsApplicationMixin(ApplicationV2) {
  constructor(actor, options = {}) {
    super(options);
    this.actor = actor;
    this._saveTimeout = null;
  }

  static DEFAULT_OPTIONS = {
    id: "jjk-character-sheet",
    classes: ["omni-system", "jjk-sheet"],
    tag: "div",
    window: {
      title: "🔮 Ficha de Feiticeiro Jujutsu",
      icon: "fas fa-scroll",
      minimizable: true,
      resizable: true,
    },
    position: {
      width: 800,
      height: 600,
    },
    actions: {
      syncEnergy: CharacterSheetJJK.prototype._onSyncEnergy,
      toggleRCT: CharacterSheetJJK.prototype._onToggleRCT,
      toggleHeavenly: CharacterSheetJJK.prototype._onToggleHeavenly,
      expandDomain: CharacterSheetJJK.prototype._onExpandDomain,
      saveData: CharacterSheetJJK.prototype._onSaveData,
    },
  };

  static PARTS = {
    main: {
      template: "modules/omini-system-vtt/templates/jjk/character-sheet.hbs",
      scrollable: [".sheet-body"],
    },
  };

  // ── Prepara Contexto ──────────────────────────────────────────────────
  async _prepareContext(options) {
    const data = this.actor.getFlag(
      "world",
      `sao_jjk_sheet_${this.actor.id}`,
    ) || {
      energy: 100,
      maxEnergy: 100,
      technique: "Nenhuma",
      domain: "Não Desbloqueado",
      rct: false,
      heavenlyRestriction: false,
      rank: "Grau 4",
    };

    return {
      actor: this.actor,
      system: this.actor.system,
      jjk: data,
      isGM: game.user.isGM,
    };
  }

  // ── Listeners ──────────────────────────────────────────────────────────
  _onRender(context, options) {
    const html = this.element;

    // Bind auto-save indicators
    this._saveIndicator = html.querySelector(".autosave-indicator");

    // Adicionar listeners para campos inputs
    html.querySelectorAll("[data-field]").forEach((el) => {
      el.addEventListener("change", (e) => this._onFieldChange(e));
    });
  }

  // ── Ações ──────────────────────────────────────────────────────────────

  _onFieldChange(event) {
    const field = event.currentTarget.dataset.field;
    const value =
      event.currentTarget.type === "checkbox"
        ? event.currentTarget.checked
        : event.currentTarget.value;

    this._scheduleSave(field, value);
  }

  _scheduleSave(field, value) {
    clearTimeout(this._saveTimeout);
    if (this._saveIndicator) {
      this._saveIndicator.textContent = "Digitando...";
      this._saveIndicator.style.color = "#FFD700";
    }

    this._saveTimeout = setTimeout(async () => {
      const currentData =
        this.actor.getFlag("world", `sao_jjk_sheet_${this.actor.id}`) || {};
      foundry.utils.setProperty(currentData, field, value);

      await this.actor.setFlag(
        "world",
        `sao_jjk_sheet_${this.actor.id}`,
        currentData,
      );

      if (this._saveIndicator) {
        this._saveIndicator.textContent = "Salvo ✔";
        this._saveIndicator.style.color = "#2EFF7A";
      }

      this.render();
    }, 800);
  }

  async _onSyncEnergy(event, target) {
    const actor = this.actor;
    const currentData = actor.getFlag("world", `sao_jjk_sheet_${actor.id}`);

    // Exemplo de sincronização com atributo de inteligência ou sabedoria do sistema base
    const newMax = (actor.system.abilities?.int?.value || 10) * 10;

    await actor.setFlag("world", `sao_jjk_sheet_${actor.id}`, {
      ...currentData,
      maxEnergy: newMax,
      energy: newMax,
    });

    ui.notifications.info("Energia Amaldiçoada sincronizada!");
    this.render();
  }

  async _onToggleRCT(event, target) {
    const currentData = this.actor.getFlag(
      "world",
      `sao_jjk_sheet_${this.actor.id}`,
    );
    await this.actor.setFlag("world", `sao_jjk_sheet_${this.actor.id}`, {
      ...currentData,
      rct: !currentData.rct,
    });
    this.render();
  }

  async _onToggleHeavenly(event, target) {
    const currentData = this.actor.getFlag(
      "world",
      `sao_jjk_sheet_${this.actor.id}`,
    );
    const newValue = !currentData.heavenlyRestriction;

    await this.actor.setFlag("world", `sao_jjk_sheet_${this.actor.id}`, {
      ...currentData,
      heavenlyRestriction: newValue,
    });

    if (newValue) {
      ui.notifications.warn(
        "Restrição Celestial Ativa: Energia Amaldiçoada zerada.",
      );
    }

    this.render();
  }

  async _onExpandDomain(event, target) {
    const currentData = this.actor.getFlag(
      "world",
      `sao_jjk_sheet_${this.actor.id}`,
    );

    if (currentData.energy < 50) {
      return ui.notifications.error(
        "Energia Amaldiçoada insuficiente para expansão!",
      );
    }

    // Emitir evento para o Radar
    Hooks.call("omniCore.radar.eventPlaced", {
      type: "special",
      position: canvas.tokens.get(this.actor.getActiveTokens()[0]?.id)
        ?.center || { x: 0, y: 0 },
      targetId: "all",
      message: `🌌 EXPANSÃO DE DOMÍNIO: ${currentData.domain}`,
      autoExpire: 60000,
    });

    ui.notifications.info(`Domínio Expandido: ${currentData.domain}`);
  }

  async _onSaveData(event, target) {
    // Forçar salvamento manual
    this.render();
    ui.notifications.info("Ficha JJK atualizada.");
  }

  async _onClose(options) {
    clearTimeout(this._saveTimeout);
    await super._onClose(options);
  }
}

// Registro global
window.CharacterSheetJJK = CharacterSheetJJK;
