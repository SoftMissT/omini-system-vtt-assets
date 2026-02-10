export class AdminKeyBehavior {
  constructor(data, actor) { this.data = data; this.actor = actor; }
  async use() {
    ui.notifications.info("Ì¥ë [ADMIN MODE] Abrindo todas as portas pr√≥ximas...");
    const doors = canvas.walls.doors;
    // L√≥gica para abrir portas na cena
  }
}
