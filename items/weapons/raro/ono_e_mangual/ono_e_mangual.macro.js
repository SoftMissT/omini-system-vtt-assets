(async () => {
  const actor = canvas.tokens.controlled[0]?.actor || game.user.character;
  if (!actor) return ui.notifications.error("Token não selecionado!");
  const { OnoEMangualBehavior } = await import('./OnoEMangual.js');
  const item = new OnoEMangualBehavior({}, actor);
  await item.use({ momentum: 3 });
})();
