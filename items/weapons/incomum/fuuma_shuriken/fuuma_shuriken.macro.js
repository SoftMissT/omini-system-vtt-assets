(async () => {
  const actor = canvas.tokens.controlled[0]?.actor;
  if (!actor) return;
  const { FuumaShurikenBehavior } = await import('./FuumaShuriken.js');
  const item = new FuumaShurikenBehavior({}, actor);
  await item.use();
})();
