export class ElmoMonarcaBehavior {
  constructor(data, actor) { this.data = data; this.actor = actor; }
  async onEquip() {
    await this.actor.addActiveEffect({
      label: "Sovereign Vision",
      changes: [{ key: "data.attributes.senses.darkvision", mode: 2, value: 30 }]
    });
  }
}
