export class TimeGuardianBehavior {
  constructor(data, actor) { this.data = data; this.actor = actor; }
  async use() {
    const history = this.actor.getFlag('omini', 'time_stats_history') || [];
    if (history.length > 0) {
        const lastState = history[0];
        await this.actor.update({ "system.attributes.hp.value": lastState.hp });
        ui.notifications.info("⏳ O tempo flui ao contrário... HP Restaurado!");
    }
  }
}
