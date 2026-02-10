(async () => {
  const actor = canvas.tokens.controlled[0]?.actor;
  if (!actor) return;
  const { ArcoLongoBehavior } = await import('./ArcoLongo.js');
  const item = new ArcoLongoBehavior({}, actor);
  await item.use({ momentum: 3 });
})();
