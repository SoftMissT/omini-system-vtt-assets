(async () => {
  const actor = canvas.tokens.controlled[0]?.actor || game.user.character;
  if (!actor) return ui.notifications.error("❌!");
  const cfg = {
    nome: "Quinta Forma: Chuva Abençoada Após a Seca",
    jp: "Go no Kata: Kanten no Jiu",
    tipo: "Ação Especial",
    cor: "#048ABF",
    niveis: [
      { n: 1, d: "2d6", c: 2 },
      { n: 2, d: "2d8", c: 3 },
      { n: 3, d: "2d10", c: 4 },
      { n: 4, d: "3d6", c: 5 },
    ],
  };
  const lvl = await new Promise((r) => {
    new Dialog({
      title: "��� Execução",
      content: `<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"><h2 style="color:${cfg.cor}">${cfg.nome}</h2><p style="color:#aaa">${cfg.jp}</p><p style="color:#FF2B4A"><strong>⚠️ EXECUÇÃO:</strong> Apenas em rendidos/≤25% PV</p>${cfg.niveis.map((n) => `<p>Nv${n.n}: ${n.d} | ${n.c}PC</p>`).join("")}</div>`,
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
    formula = `${sel.d}+${corpo}`,
    roll = await new Roll(formula).evaluate();
  game.dice3d && (await game.dice3d.showForRoll(roll, game.user, !0));
  await actor.update({ "system.props.pc.value": pc - sel.c });
  const chat = `<div style="background:linear-gradient(135deg,#0a0a0f,#1a1a2e);border:2px solid ${cfg.cor};border-radius:12px;padding:15px"><h2 style="color:${cfg.cor};text-align:center">��� ${cfg.nome}</h2><p style="color:#aaa;text-align:center">${cfg.jp}</p><div style="background:rgba(4,138,191,0.1);padding:10px;text-align:center"><div style="font-size:32px;color:#FFD700;font-weight:bold">${roll.total}</div></div><div style="background:rgba(255,43,74,0.2);padding:8px;margin-top:10px;border-left:3px solid #FF2B4A"><strong style="color:#FF2B4A">⚠️ EXECUÇÃO</strong><br>Morte instantânea em rendidos/≤25% PV</div><div style="background:rgba(255,215,0,0.1);padding:8px;margin-top:10px"><strong>���</strong> Golpe de misericórdia indolor</div></div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: chat,
  });
  ui.notifications.warn(`⚠️ Execução: ${roll.total}`);
})();
