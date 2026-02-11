(async () => {
  const actor = canvas.tokens.controlled[0]?.actor || game.user.character;
  if (!actor) return ui.notifications.error("❌!");
  const cfg = {
    nome: "Sétima Forma: Tempestade de Pétalas Cortantes",
    jp: "Shichi no Kata: Hanabira no Arashi",
    tipo: "Reação",
    cor: "#A6535A",
    niveis: [
      { n: 1, def: "+2", dmg: "1d4", c: 3 },
      { n: 2, def: "+3", dmg: "1d6", c: 4 },
      { n: 3, def: "+5", dmg: "1d8", c: 6 },
      { n: 4, def: "+7", dmg: "1d10", c: 8 },
    ],
  };
  const lvl = await new Promise((r) => {
    new Dialog({
      title: "��� Defesa Ofensiva",
      content: `<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"><h2 style="color:${cfg.cor}">${cfg.nome}</h2>${cfg.niveis.map((n) => `<p>Nv${n.n}: ${n.def} Def | ${n.dmg} Contra | ${n.c}PC</p>`).join("")}</div>`,
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
    formula = `${sel.dmg}+${corpo}`,
    roll = await new Roll(formula).evaluate();
  game.dice3d && (await game.dice3d.showForRoll(roll, game.user, !0));
  await actor.update({ "system.props.pc.value": pc - sel.c });
  const chat = `<div style="background:linear-gradient(135deg,#0a0a0f,#1a1a2e);border:2px solid ${cfg.cor};border-radius:12px;padding:15px"><h2 style="color:${cfg.cor};text-align:center">�� ${cfg.nome}</h2><div style="background:rgba(166,83,90,0.1);padding:10px;text-align:center"><div style="font-size:32px;color:#00D9FF;font-weight:bold">${sel.def} Defesa</div><div style="color:#FFD700;font-size:24px;margin-top:5px">${roll.total} Contra-Ataque</div></div><div style="background:rgba(166,83,90,0.2);padding:8px;margin-top:10px"><strong>⚡</strong> Se atacante errar, sofre ${roll.total} de dano (Corte)</div></div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: chat,
  });
  ui.notifications.info("��� Domo defensivo!");
})();
