(async () => {
  const actor = canvas.tokens.controlled[0]?.actor || game.user.character;
  if (!actor) return ui.notifications.error("❌!");
  const cfg = {
    nome: "Quarta Forma: Maré Crescente",
    jp: "Shi no Kata: Uchishio",
    tipo: "Ação Padrão",
    cor: "#048ABF",
    niveis: [
      { n: 1, d: "3x1d4", c: 3 },
      { n: 2, d: "3x1d6", c: 4 },
      { n: 3, d: "3x1d8", c: 5 },
      { n: 4, d: "3x1d10", c: 6 },
    ],
  };
  const lvl = await new Promise((r) => {
    new Dialog({
      title: "���",
      content: `<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"><h2 style="color:${cfg.cor}">${cfg.nome}</h2>${cfg.niveis.map((n) => `<p>Nv${n.n}: ${n.d} | ${n.c}PC</p>`).join("")}</div>`,
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
  const corpo = actor.system.props?.corpo?.value || 0,
    dadoBase = sel.d.split("x")[1],
    r1 = await new Roll(`${dadoBase}+${corpo}`).evaluate(),
    r2 = await new Roll(`${dadoBase}+${corpo}`).evaluate(),
    r3 = await new Roll(`${dadoBase}+${corpo}`).evaluate(),
    total = r1.total + r2.total + r3.total;
  game.dice3d &&
    (await game.dice3d.showForRoll(r1, game.user, !0),
    await game.dice3d.showForRoll(r2, game.user, !0),
    await game.dice3d.showForRoll(r3, game.user, !0));
  await actor.update({ "system.props.pc.value": pc - sel.c });
  const chat = `<div style="background:linear-gradient(135deg,#0a0a0f,#1a1a2e);border:2px solid ${cfg.cor};border-radius:12px;padding:15px"><h2 style="color:${cfg.cor};text-align:center">��� ${cfg.nome}</h2><div style="background:rgba(4,138,191,0.1);padding:10px;text-align:center"><div style="font-size:32px;color:#FFD700;font-weight:bold">${total}</div><div style="color:#aaa">${r1.total}+${r2.total}+${r3.total}</div></div><div style="background:rgba(4,138,191,0.2);padding:8px;margin-top:10px"><strong>⚡</strong> 3 golpes consecutivos</div><div style="background:rgba(255,215,0,0.1);padding:8px;margin-top:10px"><strong>��</strong> Cascata/Correnteza/Vórtice</div></div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: chat,
  });
  ui.notifications.info(`��� ${total}`);
})();
