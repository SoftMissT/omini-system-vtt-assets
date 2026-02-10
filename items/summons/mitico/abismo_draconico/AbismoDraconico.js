export class AbismoDraconicoBehavior {
  constructor(data, actor) { this.data = data; this.actor = actor; }
  async use() { ui.notifications.error("Ìºå O MAPA EST√Å SENDO CONSUMIDO PELO ABISMO!"); }
}
