(async () => {
  const actor = canvas.tokens.controlled[0]?.actor;
  if (!actor) return;
  const { BalestraBehavior } = await import('./Balestra.js');
  const item = new BalestraBehavior({}, actor);
  await item.use({ momentum: 1 });
})();
