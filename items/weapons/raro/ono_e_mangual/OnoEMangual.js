export class OnoEMangualBehavior {
  constructor(data, actor) { this.data = data; this.actor = actor; }
  async use(context) {
    if (context.momentum < 3) return ui.notifications.warn("Momentum insuficiente para Esmagamento Duplo!");
    const target = game.user.targets.first();
    if (!target) return ui.notifications.warn("Selecione um alvo!");
    // LÃ³gica de ataque duplo
    ChatMessage.create({ content: `í» ï¸ ${this.actor.name} executa Esmagamento Duplo com Ono & Mangual!` });
  }
}
