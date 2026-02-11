/* MACRO: Ativar Bankai */
(async () => {
  const actor = game.user.character;
  if (!actor) return ui.notifications.error('Selecione seu personagem!');

  if (!globalThis.TransformationEngine) {
    return ui.notifications.error('TransformationEngine não carregado!');
  }

  await TransformationEngine.activate(actor, 'BANKAI');
})();
