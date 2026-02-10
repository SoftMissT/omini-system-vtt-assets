export class GrimorioReiSabioBehavior {
  constructor(data, actor) { this.data = data; this.actor = actor; }
  async use() {
    ui.notifications.info("Ì≥ñ O Grim√≥rio processa m√∫ltiplas magias simultaneamente.");
    // L√≥gica para reduzir custo de MP global
  }
}
