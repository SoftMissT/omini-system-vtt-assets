export class FuumaShurikenBehavior {
  constructor(data, actor) { this.data = data; this.actor = actor; }
  async use(context = {}) {
    ChatMessage.create({ content: `í¼€ ${this.actor.name} arremessa uma Fuuma Shuriken! Verificando Corte Passante...` });
    if (context.secondaryTarget) {
      // LÃ³gica de ataque adicional com penalidade de -2
    }
  }
}
