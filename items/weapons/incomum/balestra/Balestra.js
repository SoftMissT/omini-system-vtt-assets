export class BalestraBehavior {
  constructor(data, actor) { this.data = data; this.actor = actor; }
  async use(context) {
    ChatMessage.create({ content: `í¾¯ ${this.actor.name} dispara a Balestra! Impacto ignora RD.` });
    // LÃ³gica para ignorar Damage Reduction e aplicar Push de 1.5m
  }
}
