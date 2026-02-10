export class ExplosionBehavior {
  constructor(data, actor) { this.data = data; this.actor = actor; }
  async use() {
    ui.notifications.warn("í´¥ EXPLOSION!!");
    const templateData = {
      t: "circle",
      user: game.user.id,
      distance: 20,
      direction: 0,
      x: 0,
      y: 0,
      fillColor: "#FF0000"
    };
    // O sistema aguardaria o clique do jogador para posicionar
    canvas.scene.createEmbeddedDocuments("MeasuredTemplate", [templateData]);
  }
}
