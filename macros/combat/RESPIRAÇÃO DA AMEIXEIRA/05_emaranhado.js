(async () => {
  const actor = canvas.tokens.controlled[0]?.actor || game.user.character;
  if (!actor) return ui.notifications.error("❌!");
  const cfg = {
    nome: "Quinta Forma: Emaranhado de Mil Raízes",
    jp: "Go no Kata: Sen no Ne no Motsure",
    tipo: "Ação Bônus",
    cor: "#A6535A",
    niveis: [
      { n: 1, alvos: "1", c: 2 },
      { n: 2, alvos: "2", c: 3 },
      { n: 3, alvos: "3", c: 4 },
      { n: 4, alvos: "Todos 3m", c: 6 },
    ],
  };
  const lvl = await new Promise((r) => {
    new Dialog({
      title: "��� Enraizar",
      content: `<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"><h2 style="color:${cfg.cor}">${cfg.nome}</h2>${cfg.niveis.map((n) => `<p>Nv${n.n}: ${n.alvos} alvos | ${n.c}PC</p>`).join("")}</div>`,
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
  await actor.update({ "system.props.pc.value": pc - sel.c });
  const chat = `<div style="background:linear-gradient(135deg,#0a0a0f,#1a1a2e);border:2px solid ${cfg.cor};border-radius:12px;padding:15px"><h2 style="color:${cfg.cor};text-align:center">��� ${cfg.nome}</h2><div style="background:rgba(166,83,90,0.1);padding:10px;text-align:center"><div style="font-size:28px;color:#A6535A;font-weight:bold">${sel.alvos}</div><div style="color:#aaa">Alvos Enraizados</div></div><div style="background:rgba(166,83,90,0.2);padding:8px;margin-top:10px"><strong>⚡</strong> Status: Enraizado (Movimento 0, pode agir) 1 turno<br>TR CORPO CD 13 nega</div></div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: chat,
  });
  ui.notifications.info("��� Enraizamento!");
})();
