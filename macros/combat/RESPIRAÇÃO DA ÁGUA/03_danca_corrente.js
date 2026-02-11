(async () => {
  const actor = canvas.tokens.controlled[0]?.actor || game.user.character;
  if (!actor) return ui.notifications.error("❌ Token!");
  const cfg = {
    nome: "Terceira Forma: Dança da Corrente Rápida",
    jp: "San no Kata: Ryūryū Mai",
    tipo: "Ação Completa",
    cor: "#048ABF",
    niveis: [
      { n: 1, d: "2x1d4", c: 3, mov: "4.5m" },
      { n: 2, d: "2x1d6", c: 4, mov: "6m" },
      { n: 3, d: "2x1d8", c: 5, mov: "7.5m" },
      { n: 4, d: "2x1d10", c: 6, mov: "9m" },
    ],
  };
  const lvl = await new Promise((r) => {
    new Dialog({
      title: "���",
      content: `<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"><h2 style="color:${cfg.cor}">${cfg.nome}</h2><p style="color:#aaa">${cfg.jp}</p>${cfg.niveis.map((n) => `<p><strong>Nv${n.n}:</strong> ${n.d} | ${n.c}PC | ${n.mov}</p>`).join("")}</div>`,
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
  if (pc < sel.c) return ui.notifications.error("❌ PC!");
  const corpo = actor.system.props?.corpo?.value || 0,
    dadoBase = sel.d.split("x")[1],
    roll1 = await new Roll(`${dadoBase}+${corpo}`).evaluate(),
    roll2 = await new Roll(`${dadoBase}+${corpo}`).evaluate(),
    total = roll1.total + roll2.total;
  game.dice3d &&
    (await game.dice3d.showForRoll(roll1, game.user, !0),
    await game.dice3d.showForRoll(roll2, game.user, !0));
  await actor.update({ "system.props.pc.value": pc - sel.c });
  const chat = `<div style="background:linear-gradient(135deg,#0a0a0f,#1a1a2e);border:2px solid ${cfg.cor};border-radius:12px;padding:15px"><h2 style="color:${cfg.cor};text-align:center">��� ${cfg.nome}</h2><p style="color:#aaa;text-align:center">${cfg.jp}</p><div style="background:rgba(4,138,191,0.1);padding:10px;text-align:center"><div style="font-size:32px;color:#FFD700;font-weight:bold">${total}</div><div style="color:#aaa;font-size:12px">${roll1.total} + ${roll2.total}</div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><div style="background:rgba(255,215,0,0.1);padding:8px;text-align:center"><div style="color:#FFD700">Tipo</div><div style="color:#fff">${cfg.tipo}</div></div><div style="background:rgba(255,43,74,0.1);padding:8px;text-align:center"><div style="color:#FF2B4A">Custo</div><div style="color:#fff">${sel.c}PC</div></div></div><div style="background:rgba(4,138,191,0.2);padding:8px;margin-top:10px"><strong>⚡</strong> Movimento ${sel.mov} | Sem AO</div><div style="background:rgba(255,215,0,0.1);padding:8px;margin-top:10px"><strong style="color:#FFD700">��� Passiva</strong> Cascata/Correnteza/Vórtice</div></div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: chat,
  });
  ui.notifications.info(`��� ${total}`);
})();
