export class CriaTempoBehavior {
  constructor(data, actor) { this.data = data; this.actor = actor; }
  async use() {
    ui.notifications.info("⏳ Fluxo Temporal Acelerado! Cooldowns reduzidos em 50%.");
    // Lógica de redução de CD global
  }
}
