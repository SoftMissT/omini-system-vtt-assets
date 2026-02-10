export class NucleoGuildaBehavior {
  constructor(data, actor) { this.data = data; this.actor = actor; }
  async use() {
    if (!game.user.isGM) return ui.notifications.warn("Apenas o GM pode fundar territ√≥rios.");
    await canvas.scene.setFlag("omini", "guildOwner", this.actor.name);
    ui.notifications.info(`Ìø∞ Territ√≥rio reivindicado para a guilda de ${this.actor.name}!`);
  }
}
