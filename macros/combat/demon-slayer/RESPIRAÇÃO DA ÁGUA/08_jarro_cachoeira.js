(async () => {
  const actor = canvas.tokens.controlled[0]?.actor || game.user.character;
  if (!actor) return ui.notifications.error("❌!");
  const cfg = {
    nome: "Oitava Forma: Jarro de Cachoeira",
    jp: "Hachi no Kata: Takitsubo",
    tipo: "Ação Bônus",
    cor: "#048ABF",
    niveis: [
      { n: 1, d1: "1d10", d2: "2d8", c: 4 },
      { n: 2, d1: "1d12", d2: "2d10", c: 5 },
      { n: 3, d1: "2d8", d2: "3d6", c: 6 },
      { n: 4, d1: "2d10", d2: "3d8", c: 7 },
    ],
  };
  const lvl = await new Promise((r) => {
    new Dialog({
      title: "���",
      content: `<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"><h2 style="color:${cfg.cor}">${cfg.nome}</h2>${cfg.niveis.map((n) => `<p>Nv${n.n}: ${n.d1} ou ${n.d2} (caído) | ${n.c}PC</p>`).join("")}</div>`,
      buttons: {
        n1: { label: "Nv1", callback: () => r(0) },
        n2: { label: "Nv2", callback: () => r(1) },
        n3: { label: "Nv3", callback: () => r(2) },
        n4: { label: "Nv4", callback: () => r(3) },
      },
    }).render(!0);
  });
  const sel = cfg.niveis[lvl];
  const caido = await Dialog.confirm({
    title: "Alvo Caído/Atordoado?",
    content: "<p>O alvo está caído ou atordoado?</p>",
  });
  const pc = actor.system.props?.pc?.value || 0;
  if (pc < sel.c) return ui.notifications.error("❌!");
  const corpo = actor.system.props?.corpo?.value || 0,
    dadoUsar = caido ? sel.d2 : sel.d1,
    formula = `${dadoUsar}+${corpo}`,
    roll = await new Roll(formula).evaluate();
  game.dice3d && (await game.dice3d.showForRoll(roll, game.user, !0));
  await actor.update({ "system.props.pc.value": pc - sel.c });
  const chat = `<div style="background:linear-gradient(135deg,#0a0a0f,#1a1a2e);border:2px solid ${cfg.cor};border-radius:12px;padding:15px"><h2 style="color:${cfg.cor};text-align:center">��� ${cfg.nome}</h2><div style="background:rgba(4,138,191,0.1);padding:10px;text-align:center"><div style="font-size:32px;color:#FFD700;font-weight:bold">${roll.total}</div><div style="color:#aaa">${caido ? "DOBRADO (Caído/Atordoado)" : "Normal"}</div></div><div style="background:rgba(4,138,191,0.2);padding:8px;margin-top:10px"><strong>⚡</strong> Corte vertical | x2 vs caídos</div></div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: chat,
  });
  ui.notifications.info(`��� ${roll.total}`);
})();
