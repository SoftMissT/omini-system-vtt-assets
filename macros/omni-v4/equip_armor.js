/* MACRO: Equipar Armadura */
(async () => {
  const actor = game.user.character;
  if (!actor) return ui.notifications.error('Selecione seu personagem!');

  if (!globalThis.ArmorForge) {
    return ui.notifications.error('ArmorForge não carregado!');
  }

  await ArmorForge.equip(actor);
})();
