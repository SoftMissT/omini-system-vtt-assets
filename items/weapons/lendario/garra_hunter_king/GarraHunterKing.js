export class GarraHunterKingBehavior {
  constructor(data, actor) { this.data = data; this.actor = actor; }
  async onKill(target) {
    let exp = this.data.stats.exp + 1;
    if (exp >= 100) {
      this.data.stats.evolution_rank += 1;
      ui.notifications.info("Ì∂Å A Garra do Hunter-King EVOLUIU!");
    }
    await this.actor.updateOwnedItem({ _id: this.data._id, "stats.exp": exp });
  }
}
