/* MACRO: Executar Sword Skill */
(async () => {
  const actor = game.user.character;
  const target = game.user.targets.first();
  
  if (!actor) return ui.notifications.error('Selecione seu personagem!');
  if (!target) return ui.notifications.warn('Selecione um alvo!');

  if (!globalThis.CombatEngine) {
    return ui.notifications.error('CombatEngine não carregado!');
  }

  // Dialog de escolha
  const skills = ['LINEAR', 'VORPAL_STRIKE', 'HORIZONTAL_SQUARE', 'STARBURST_STREAM'];
  
  const choice = await Dialog.wait({
    title: 'Sword Skill',
    content: '<p>Escolha a skill:</p>',
    buttons: {
      linear: { label: 'Linear', callback: () => 'LINEAR' },
      vorpal: { label: 'Vorpal Strike', callback: () => 'VORPAL_STRIKE' },
      square: { label: 'Horizontal Square', callback: () => 'HORIZONTAL_SQUARE' },
      starburst: { label: 'Starburst Stream', callback: () => 'STARBURST_STREAM' }
    }
  });

  if (choice) {
    await CombatEngine.executeSwordSkill(actor, choice, target);
  }
})();
