export class TronoMonarcaBehavior {
  constructor(data, actor) { this.data = data; this.actor = actor; }
  async use() {
    ui.notifications.info("í±‘ O Monarca ascende ao trono.");
    // Aplica Aura de Medo via Active Effect
  }
}
