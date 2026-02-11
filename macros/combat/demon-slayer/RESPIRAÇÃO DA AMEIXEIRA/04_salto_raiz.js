(async () => {
  const actor = canvas.tokens.controlled[0]?.actor || game.user.character;
  if (!actor) return ui.notifications.error("❌!");
  const cfg = {
    nome: "Quarta Forma: Salto da Raiz Profunda",
    jp: "Shi no Kata: Shin no Ne",
    tipo: "Ação Movimento",
    cor: "#A6535A",
    niveis: [
      { n: 1, mov: "9m", c: 2 },
      { n: 2, mov: "12m", c: 3 },
      { n: 3, mov: "15m", c: 4 },
      { n: 4, mov: "18m", c: 5 },
    ],
  };
  const lvl = await new Promise((r) => {
    new Dialog({
      title: "��� Salto",
      content: `<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"><h2 style="color:${cfg.cor}">${cfg.nome}</h2>${cfg.niveis.map((n) => `<p>Nv${n.n}: ${n.mov} | ${n.c}PC</p>`).join("")}<p style="color:#FF2B4A">⚠️ Zera Raízes ao mover!</p></div>`,
      buttons: {
        n1: { label: "Nv1", callback: () => r(0) },
        n2: { label: "Nv2", callback: () => r(1) },
        n3: { label: "Nv3", callback: () => r(2) },
        n4: { label: "Nv4", callback: () => r(3) },
      },
    }).render(!0);
  });
  const sel = cfg.niveis[lvl],
    pc = actor.system.props?.pc?.value || 0;
  if (pc < sel.c) return ui.notifications.error("❌!");
  await actor.update({
    "system.props.pc.value": pc - sel.c,
    "system.props.raizes.value": 0,
  });
  const chat = `<div style="background:linear-gradient(135deg,#0a0a0f,#1a1a2e);border:2px solid ${cfg.cor};border-radius:12px;padding:15px"><h2 style="color:${cfg.cor};text-align:center">��� ${cfg.nome}</h2><div style="background:rgba(166,83,90,0.1);padding:10px;text-align:center"><div style="font-size:32px;color:#00D9FF;font-weight:bold">${sel.mov}</div></div><div style="background:rgba(166,83,90,0.2);padding:8px;margin-top:10px"><strong>⚡</strong> Ignora terreno | Inimigos adjacentes: desvantagem próx. ataque</div><div style="background:rgba(255,43,74,0.1);padding:8px;margin-top:10px"><strong>⚠️</strong> Raízes zeradas (movimento >1.5m)</div></div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: chat,
  });
  ui.notifications.warn("⚠️ Raízes zeradas!");
})();
