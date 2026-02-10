export class LoboSombrioBehavior {
  constructor(data, actor) { this.data = data; this.actor = actor; }
  async use() {
    let stacks = this.actor.getFlag('omini', 'lobo_stacks') || 0;
    stacks++;
    if (stacks >= 100) {
      ui.notifications.info("í°º LOBO SOMBRIO: FRENESI DIMENSIONAL ATIVADO!");
      stacks = 0;
    }
    await this.actor.setFlag('omini', 'lobo_stacks', stacks);
  }
}
