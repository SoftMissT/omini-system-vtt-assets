export class PistolasGemeasBehavior {
  constructor(data, actor) { this.data = data; this.actor = actor; }
  async use() {
    ChatMessage.create({ content: `í´« ${this.actor.name} dispara com as Pistolas GÃªmeas!` });
  }
}
