export class ForjaPortatilBehavior {
  constructor(data, actor) { this.data = data; this.actor = actor; }
  async use() {
    ui.notifications.info("í´¥ Forja aberta! Arraste itens para reparar.");
    // LÃ³gica para abrir macro de Item Piles ou Crafting
  }
}
