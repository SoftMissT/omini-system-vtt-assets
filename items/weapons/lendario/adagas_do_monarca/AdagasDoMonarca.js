export class AdagasDoMonarcaBehavior {
  constructor(data, actor) { this.data = data; this.actor = actor; }
  async use() {
    ChatMessage.create({ content: `í¼‘ ${this.actor.name} retalha as sombras com as Adagas do Monarca!` });
  }
}
