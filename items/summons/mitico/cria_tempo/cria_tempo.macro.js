(async () => {
  const actor = canvas.tokens.controlled[0]?.actor;
  const { CriaTempoBehavior } = await import('./CriaTempo.js');
  new CriaTempoBehavior({}, actor).use();
})();
