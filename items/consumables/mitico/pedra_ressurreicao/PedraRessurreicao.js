export class PedraRessurreicaoBehavior {
  constructor(data, actor) { this.data = data; this.actor = actor; }
  async use(targetToken) {
    if (!targetToken) return ui.notifications.warn("Selecione o corpo do aliado!");
    await targetToken.actor.update({ "system.attributes.hp.value": targetToken.actor.system.attributes.hp.max });
    await targetToken.document.update({ "overlayEffect": null });
    ui.notifications.info(`✨ ${targetToken.name} foi ressuscitado!`);
  }
}
