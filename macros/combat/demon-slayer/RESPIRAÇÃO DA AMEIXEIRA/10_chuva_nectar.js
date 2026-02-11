(async () => {
  const actor = canvas.tokens.controlled[0]?.actor || game.user.character;
  if (!actor) return ui.notifications.error("❌!");
  const cfg = {
    nome: "Décima Forma: Chuva de Néctar Curativo",
    jp: "Jū no Kata: Kanro no Ame",
    tipo: "Ação Especial",
    cor: "#A6535A",
    niveis: [
      { n: 1, cura: "1d6", c: 3 },
      { n: 2, cura: "1d8", c: 4 },
      { n: 3, cura: "1d10", c: 5 },
      { n: 4, cura: "2d8", c: 7 },
    ],
  };
  const lvl = await new Promise((r) => {
    new Dialog({
      title: "��� Cura",
      content: `<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"><h2 style="color:${cfg.cor}">${cfg.nome}</h2>${cfg.niveis.map((n) => `<p>Nv${n.n}: ${n.cura} | ${n.c}PC</p>`).join("")}<p style="color:#FFD700">⚡ Gastar 1 Raiz = +ESP mod</p></div>`,
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
  const raizes = actor.system.props?.raizes?.value || 0;
  const gastarRaiz =
    raizes >= 1
      ? await Dialog.confirm({
          title: "Gastar 1 Raiz?",
          content: "<p>+Modificador ESP na cura!</p>",
        })
      : false;
  const espirito = actor.system.props?.espirito?.value || 0,
    formula = sel.cura,
    roll = await new Roll(formula).evaluate();
  let curaTotal = roll.total;
  if (gastarRaiz) {
    curaTotal += espirito;
    await actor.update({ "system.props.raizes.value": raizes - 1 });
  }
  game.dice3d && (await game.dice3d.showForRoll(roll, game.user, !0));
  await actor.update({ "system.props.pc.value": pc - sel.c });
  const chat = `<div style="background:linear-gradient(135deg,#0a0a0f,#1a1a2e);border:2px solid ${cfg.cor};border-radius:12px;padding:15px"><h2 style="color:${cfg.cor};text-align:center">��� ${cfg.nome}</h2><div style="background:rgba(46,255,122,0.1);padding:10px;text-align:center"><div style="font-size:32px;color:#2EFF7A;font-weight:bold">+${curaTotal} PV</div>${gastarRaiz ? '<div style="color:#FFD700;font-size:14px">+ESP (1 Raiz)</div>' : ""}</div><div style="background:rgba(46,255,122,0.2);padding:8px;margin-top:10px"><strong>⚡</strong> Remove 1 Status (Sangramento/Veneno Leve)</div></div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: chat,
  });
  ui.notifications.info(`��� Cura: ${curaTotal}`);
})();
