/**
 * 🧬 OMNI-SYSTEM: SYNTHESIS CORE HUD
 * Manages Item/Skill Fusion, Sacrifice, and Evolution.
 */

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

class SynthesisCore extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: "synthesis-core",
    tag: "form",
    window: {
      title: "🧬 Synthesis Core",
      icon: "modules/omini-system-assets/assets/icons/ui/synthesis-icon.webp",
      resizable: false,
      width: 800,
      height: 600,
    },
    position: {
      width: 800,
      height: 600,
    },
    actions: {
      processFusion: SynthesisCore.processFusion,
      clearSlots: SynthesisCore.clearSlots,
    },
  };

  static PARTS = {
    main: {
      template: "modules/omini-system-vtt/templates/huds/synthesis-core.hbs",
    },
    inventory: {
      template:
        "modules/omini-system-vtt/templates/huds/parts/synthesis-inventory.hbs",
    },
  };

  /** @override */
  _configureRenderOptions(options) {
    super._configureRenderOptions(options);
    options.parts = ["main", "inventory"];
  }

  /** @override */
  _onRender(context, options) {
    super._onRender(context, options);

    // Bind Drag & Drop Listeners
    const html = this.element;

    // Slots
    const slots = html.querySelectorAll(".slot-container");
    slots.forEach((slot) => {
      slot.addEventListener("dragover", this._onDragOver.bind(this));
      slot.addEventListener("dragleave", this._onDragLeave.bind(this));
      slot.addEventListener("drop", this._onDrop.bind(this));
    });

    // Inventory Items (if rendered within this app)
    const items = html.querySelectorAll(".item-card");
    items.forEach((item) => {
      item.addEventListener("dragstart", this._onDragStart.bind(this));
    });
  }

  /** @override */
  async _prepareContext(options) {
    // Load Actor Data
    const actor = OmniCore.actor.resolve(game.user);
    const synthData = (await OmniCore.data.get(actor, "synthesis")) || {
      slot1: null,
      slot2: null,
      history: [],
    };

    return {
      actor: actor,
      slots: {
        left: synthData.slot1,
        right: synthData.slot2,
      },
      history: synthData.history.reverse().slice(0, 5), // Last 5 fusions
      canFuse: !!(synthData.slot1 && synthData.slot2),
      inventory: actor.items.filter((i) =>
        ["weapon", "armor", "consumable"].includes(i.type),
      ), // Context for inventory part
    };
  }

  /* ------------------------------------------- */
  /*  Event Listeners & Actions                  */
  /* ------------------------------------------- */

  /* ------------------------------------------- */
  /*  Drag & Drop Implementation                 */
  /* ------------------------------------------- */

  /**
   * Handle Drag Start
   * @param {DragEvent} event
   */
  _onDragStart(event) {
    const li = event.target.closest(".item-card");
    if (!li) return;

    const dragData = {
      type: "Item",
      uuid: li.dataset.uuid,
      id: li.dataset.id,
    };

    event.dataTransfer.setData("text/plain", JSON.stringify(dragData));
  }

  /**
   * Handle Drag Over (Allow Drop)
   * @param {DragEvent} event
   */
  _onDragOver(event) {
    event.preventDefault(); // Necessary to allow dropping
    event.dataTransfer.dropEffect = "copy";
    const slot = event.target.closest(".slot-hex");
    if (slot) slot.classList.add("drag-hover");
  }

  /**
   * Handle Drag Leave
   * @param {DragEvent} event
   */
  _onDragLeave(event) {
    event.preventDefault();
    const slot = event.target.closest(".slot-hex");
    if (slot) slot.classList.remove("drag-hover");
  }

  /**
   * Handle Drop Events (Items dragged into slots)
   * @param {DragEvent} event
   */
  async _onDrop(event) {
    event.preventDefault();
    const slotElement = event.target.closest(".slot-container");
    const slotHex = event.target.closest(".slot-hex");
    if (slotHex) slotHex.classList.remove("drag-hover");

    if (!slotElement) return;

    const slotId = slotElement.dataset.slot; // "slot1" or "slot2"

    let dragData = null;
    try {
      dragData = JSON.parse(event.dataTransfer.getData("text/plain"));
    } catch (e) {
      console.error("Invalid drag data:", e);
      return;
    }

    if (dragData.type !== "Item" || !dragData.uuid) return;

    const item = await fromUuid(dragData.uuid);
    if (!item) return;

    // Save to flags
    const actor = OmniCore.actor.resolve(game.user);
    const currentData = (await OmniCore.data.get(actor, "synthesis")) || {};

    // Prevent same item in both slots (optional, depending on logic)
    if (currentData.slot1?.uuid === item.uuid && slotId === "slot2") {
      ui.notifications.warn("Cannot fuse an item with itself!");
      return;
    }
    if (currentData.slot2?.uuid === item.uuid && slotId === "slot1") {
      ui.notifications.warn("Cannot fuse an item with itself!");
      return;
    }

    const updateData = {};
    updateData[slotId] = {
      id: item.id,
      uuid: item.uuid,
      name: item.name,
      img: item.img,
      system: item.system,
    };

    await OmniCore.data.set(actor, "synthesis", updateData);
    this.render();
  }

  static async processFusion(event, target) {
    console.log("🧬 Initiating Fusion Sequence...");
    // 1. Get Items
    // 2. Calculate Outcome
    // 3. Gemini AI Flavor Text
    // 4. Create New Item
    // 5. Delete Old Items (if not 'copy' mode)
  }

  static async clearSlots(event, target) {
    // Clear flags
    const actor = OmniCore.actor.resolve(game.user);
    await OmniCore.data.set(actor, "synthesis", { slot1: null, slot2: null });
    this.render();
  }
}
globalThis.SynthesisCore = SynthesisCore;
