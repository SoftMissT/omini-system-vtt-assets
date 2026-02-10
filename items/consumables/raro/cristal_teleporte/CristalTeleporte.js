export class CristalTeleporteBehavior {
  constructor(data, actor) { this.data = data; this.actor = actor; }
  async use() {
    ui.notifications.info("🌀 Teleportando para a Cidade...");
    // Integração: Hook para troca de cena/coordenadas
  }
}
