export class ArcoLongoBehavior {
  constructor(data, actor) { this.data = data; this.actor = actor; }
  async use(context) {
    if (context.momentum < 3) return ui.notifications.warn("Momentum insuficiente para Cometa Perfurante!");
    ChatMessage.create({ content: `í¿¹ ${this.actor.name} dispara o Cometa Perfurante! (Linha 15m, CD 13)` });
    // InvocaÃ§Ã£o de template de linha e cÃ¡lculo de dano automÃ¡tico em falha
  }
}
