export class SonicLeapBehavior {
  constructor(data, actor) { this.data = data; this.actor = actor; }
  async use() {
    const token = canvas.tokens.controlled[0];
    if (token) {
        // Lógica de teleporte visual/movimento rápido
        ui.notifications.info(`${this.actor.name} executa Sonic Leap!`);
    }
  }
}
