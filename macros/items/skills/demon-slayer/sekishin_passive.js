// SEKISHIN - Sistema de movimento
const lastMove = actor.getFlag('respiracao-pedra','movimento') || 0;
if(lastMove <= 1.5) {
  actor.setFlag('respiracao-pedra','monolito',true);
  const rd = actor.system.attributes.corpo.mod || 0;
  actor.update({"system.defenses.dr_fisica": rd});
  ui.notifications.info(`⛰️ SEKISHIN: RD ${rd}`);
} else {
  actor.setFlag('respiracao-pedra','monolito',false);
  actor.update({"system.defenses.dr_fisica": 0});
}
