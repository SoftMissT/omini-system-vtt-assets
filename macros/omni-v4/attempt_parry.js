/* MACRO: Tentar Parry */
(async () => {
  const defender = game.user.character;
  
  if (!defender) return ui.notifications.error('Selecione seu personagem!');

  if (!globalThis.CombatEngine) {
    return ui.notifications.error('CombatEngine não carregado!');
  }

  // Simular ataque (normalmente viria do GM)
  const attackData = {
    cd: 60, // Dificuldade do ataque
    damage: 15 // Dano do ataque
  };

  // Pedir alvo do atacante
  const target = game.user.targets.first();
  if (!target) return ui.notifications.warn('Selecione o atacante!');

  const result = await CombatEngine.attemptParry(defender, target.actor, attackData);
  
  if (result.success && result.type === 'perfect') {
    ui.notifications.notify('💥 PARRY PERFEITO! Contra-ataque disponível!');
  }
})();
