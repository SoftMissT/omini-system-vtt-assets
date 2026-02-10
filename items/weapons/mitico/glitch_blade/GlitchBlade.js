export class GlitchBladeBehavior {
  constructor(data, actor) { this.data = data; this.actor = actor; }
  async use() {
    const types = ["fire", "cold", "lightning", "force", "necrotic", "radiant"];
    const randomType = types[Math.floor(Math.random() * types.length)];
    ui.notifications.info(`í±¾ Glitch Blade causou dano de [${randomType.toUpperCase()}]!`);
  }
}
