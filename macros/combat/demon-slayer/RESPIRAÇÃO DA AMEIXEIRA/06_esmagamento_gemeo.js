(async () => {
  const actor = canvas.tokens.controlled[0]?.actor || game.user.character;
  if (!actor) return ui.notifications.error("❌!");
  const cfg = {
    nome: "Sexta Forma: Esmagamento Gêmeo",
    jp: "Roku no Kata: Sōgo Assatsu",
    tipo: "Ação Padrão",
    cor: "#A6535A",
    niveis: [
      { n: 1, d: "2x1d4", c: 3 },
      { n: 2, d: "2x1d6", c: 4 },
      { n: 3, d: "2x1d8", c: 5 },
      { n: 4, d: "2x1d10", c: 7 },
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
    total = r1.total + r2.total;
  game.dice3d &&
    (await game.dice3d.showForRoll(r1, game.user, !0),
    await game.dice3d.showForRoll(r2, game.user, !0));
  await actor.update({ "system.props.pc.value": pc - sel.c });
  const chat = `<div style="background:linear-gradient(135deg,#0a0a0f,#1a1a2e);border:2px solid ${cfg.cor};border-radius:12px;padding:15px"><h2 style="color:${cfg.cor};text-align:center">��� ${cfg.nome}</h2><div style="background:rgba(166,83,90,0.1);padding:10px;text-align:center"><div style="font-size:32px;color:#FFD700;font-weight:bold">${total}</div><div style="color:#aaa">${r1.total}+${r2.total}</div></div><div style="background:rgba(166,83,90,0.2);padding:8px;margin-top:10px"><strong>⚡ Quebra-Guarda:</strong> 2º ataque ignora bloqueio se 1º defendido</div></div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: chat,
  });
  ui.notifications.info(`��� ${total}`);
})();
