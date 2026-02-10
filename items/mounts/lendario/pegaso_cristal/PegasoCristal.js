export class PegasoCristalBehavior {
  constructor(data, actor) { this.data = data; this.actor = actor; }
  async use() {
    const isMounted = this.actor.effects.find(e => e.label === "Montaria: PÃ©gaso");
    if (isMounted) {
      await isMounted.delete();
      ui.notifications.info("í°Ž Desmontou do PÃ©gaso.");
    } else {
      await this.actor.createEmbeddedDocuments("ActiveEffect", [{
        label: "Montaria: PÃ©gaso",
        icon: "icons/creatures/mammals/horse-winged-white.webp",
        changes: [{ key: "system.attributes.movement.fly", mode: 2, value: 18 }]
      }]);
      ui.notifications.info("í°Ž Montou no PÃ©gaso de Cristal!");
    }
  }
}
