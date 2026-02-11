(async () => {
  const actor = canvas.tokens.controlled[0]?.actor || game.user.character;
  if (!actor) return ui.notifications.error("❌!");
  const cfg = {
    nome: "Décima Primeira Forma: Pomar Eterno",
    jp: "Jū Ichi no Kata: Eien no Kajuen",
    tipo: "Ação Completa (Sustentada)",
    cor: "#A6535A",
    niveis: [
      { n: 1, raio: "3m", c: 6, r: 1 },
      { n: 2, raio: "4.5m", c: 7, r: 1 },
      { n: 3, raio: "6m", c: 8, r: 2 },
      { n: 4, raio: "9m", c: 10, r: 2 },
    ],
  };
  const lvl = await new Promise((r) => {
    new Dialog({
      title: "��� Santuário",
      content: `<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"><h2 style="color:${cfg.cor}">${cfg.nome}</h2>${cfg.niveis.map((n) => `<p>Nv${n.n}: Raio ${n.raio} | ${n.c}PC+${n.r}Raiz</p>`).join("")}<p style="color:#aaa">Duração: 3 rodadas</p></div>`,
      buttons: {
        n1: { label: "Nv1", callback: () => r(0) },
        n2: { label: "Nv2", callback: () => r(1) },
        n3: { label: "Nv3", callback: () => r(2) },
        n4: { label: "Nv4", callback: () => r(3) },
      },
    }).render(!0);
  });
  const sel = cfg.niveis[lvl],
    pc = actor.system.props?.pc?.value || 0,
    raizes = actor.system.props?.raizes?.value || 0;
  if (pc < sel.c || raizes < sel.r)
    return ui.notifications.error("❌ Recursos!");
  await actor.update({
    "system.props.pc.value": pc - sel.c,
    "system.props.raizes.value": raizes - sel.r,
  });
  const chat = `<div style="background:linear-gradient(135deg,#0a0a0f,#1a1a2e);border:3px solid #2EFF7A;border-radius:12px;padding:15px;box-shadow:0 0 30px rgba(46,255,122,0.3)"><h2 style="color:#2EFF7A;text-align:center;text-shadow:0 0 15px #2EFF7A">��� ${cfg.nome} ���</h2><div style="background:rgba(46,255,122,0.2);padding:15px;text-align:center"><div style="font-size:32px;color:#2EFF7A;font-weight:bold">Raio ${sel.raio}</div><div style="color:#aaa">Duração: 3 rodadas</div></div><div style="background:rgba(46,255,122,0.2);padding:10px;margin-top:10px;border-left:4px solid #2EFF7A"><strong style="color:#2EFF7A">���️ SANTUÁRIO</strong><br>Aliados: RD 2 + Imunidade Medo<br>Inimigos: Terreno Difícil</div></div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: chat,
  });
  ui.notifications.info("��� Pomar Eterno ativo!");
})();
