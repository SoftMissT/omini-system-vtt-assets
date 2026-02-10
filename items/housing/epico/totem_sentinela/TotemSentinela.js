export class TotemSentinelaBehavior {
  constructor(data, actor) { this.data = data; this.actor = actor; }
  async use() {
    ui.notifications.info("Ìª°Ô∏è Totem implantado!");
    // L√≥gica para spawnar o Token 'Totem' na posi√ß√£o do cursor
    const tokenData = {
      name: "Totem Sentinela",
      img: "icons/magic/symbols/totem-fire.webp",
      x: canvas.mousePosition.x,
      y: canvas.mousePosition.y
    };
    await canvas.scene.createEmbeddedDocuments("Token", [tokenData]);
  }
}
