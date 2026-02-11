/* MACRO: Manifestar Incarnation */
(async () => {
  const actor = game.user.character;
  if (!actor) return ui.notifications.error('Selecione seu personagem!');

  if (!globalThis.IncarnationEngine) {
    return ui.notifications.error('IncarnationEngine não carregado!');
  }

  const choice = await Dialog.wait({
    title: 'Incarnation',
    content: '<p>Escolha a manifestação:</p>',
    buttons: {
      enhance: { label: 'Enhance Armament', callback: () => 'ENHANCE_ARMAMENT' },
      release: { label: 'Release Recollection', callback: () => 'RELEASE_RECOLLECTION' },
      fourth: { label: 'Fourth Wall', callback: () => 'FOURTH_WALL' }
    }
  });

  if (choice) {
    await IncarnationEngine.manifest(actor, choice);
  }
})();
