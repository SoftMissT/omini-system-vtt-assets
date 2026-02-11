(async () => {
  const actor = canvas.tokens.controlled[0]?.actor || game.user.character;
  if (!actor) return ui.notifications.error("❌!");
  const cfg = {
    nome: "Variação: Estocada Ondulada - Curva",
    jp: "Shizuku Hamonzuki - Kyoku",
    tipo: "Reação",
    cor: "#048ABF",
    niveis: [
      { n: 1, red: "1d8", c: 2 },
      { n: 2, red: "1d10", c: 3 },
      { n: 3, red: "1d12", c: 4 },
      { n: 4, red: "2d8", c: 5 },
    ],
  };
  const lvl = await new Promise((r) => {
    new Dialog({
      title: "��� Defesa Projétil",
      content: `<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"><h2 style="color:${cfg.cor}">${cfg.nome}</h2>${cfg.niveis.map((n) => `<p>Nv${n.n}: Reduz ${n.red} | ${n.c}PC</p>`).join("")}</div>`,
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
  const roll = await new Roll(sel.red).evaluate();
  game.dice3d && (await game.dice3d.showForRoll(roll, game.user, !0));
  await actor.update({ "system.props.pc.value": pc - sel.c });
  const chat = `<div style="background:linear-gradient(135deg,#0a0a0f,#1a1a2e);border:2px solid ${cfg.cor};border-radius:12px;padding:15px"><h2 style="color:${cfg.cor};text-align:center">��� ${cfg.nome}</h2><div style="background:rgba(0,217,255,0.2);padding:10px;text-align:center"><div style="font-size:32px;color:#00D9FF;font-weight:bold">-${roll.total}</div><div style="color:#aaa">Redução de dano projétil</div></div><div style="background:rgba(0,217,255,0.2);padding:8px;margin-top:10px"><strong>���️</strong> Se zerar dano, retorna projétil ao atacante!</div></div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: chat,
  });
  ui.notifications.info(`���️ Bloqueio: -${roll.total}`);
})();
