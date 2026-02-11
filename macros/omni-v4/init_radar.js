/* MACRO: Iniciar Radar ADM */
(async () => {
  const actor = game.user.character;
  if (!actor) return ui.notifications.error('Selecione seu personagem!');

  if (!globalThis.RadarCoreExpanded) {
    return ui.notifications.error('RadarCoreExpanded não carregado!');
  }

  const radar = new RadarCoreExpanded();
  await radar.init(actor);
  
  ui.notifications.info('👁️ Absolute Detection Matrix - ONLINE');
})();
