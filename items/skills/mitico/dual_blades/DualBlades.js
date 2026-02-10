export class DualBladesBehavior {
  constructor(data, actor) { this.data = data; this.actor = actor; }
  checkDualWield() {
    const weapons = this.actor.items.filter(i => i.type === "weapon" && i.system.equipped);
    return weapons.length === 2;
  }
  async use() {
    if (!this.checkDualWield()) return ui.notifications.warn("Equipe duas espadas para usar esta trilha!");
    ui.notifications.info("⚔️ Estilo de Duas Espadas Ativado!");
  }
}
