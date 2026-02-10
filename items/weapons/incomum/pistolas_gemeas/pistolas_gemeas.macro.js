(async () => {
  const actor = canvas.tokens.controlled[0]?.actor;
  if (!actor) return;
  const { PistolasGemeasBehavior } = await import('./PistolasGemeas.js');
  const item = new PistolasGemeasBehavior({}, actor);
  await item.use();
})();
