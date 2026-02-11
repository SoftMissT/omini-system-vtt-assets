(async () => {
  const actor = canvas.tokens.controlled[0]?.actor || game.user.character;
  if (!actor) return ui.notifications.error("❌ Token!");
  const cfg = {
    nome: "Primeira Forma: Dança da Ameixeira de Somei",
    jp: "Ichi no Kata: Somei no Mai",
    tipo: "Reação",
    cor: "#A6535A",
    niveis: [
      { n: 1, def: "+2", c: 2 },
      { n: 2, def: "+4", c: 3 },
      { n: 3, def: "+6", c: 5 },
      { n: 4, def: "+8", c: 7 },
    ],
  };
  const lvl = await new Promise((r) => {
    new Dialog({
      title: "��� Proteção",
      content: `<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor};border-radius:8px"><h2 style="color:${cfg.cor};text-align:center">${cfg.nome}</h2><p style="color:#aaa;text-align:center;font-style:italic">${cfg.jp}</p>${cfg.niveis.map((n) => `<p style="color:#fff"><strong style="color:${cfg.cor}">Nível ${n.n}:</strong> Defesa ${n.def} | ${n.c}PC</p>`).join("")}<hr style="border-color:${cfg.cor}"><p style="color:#FFD700;font-size:12px"><strong>Passiva:</strong> Raízes da Resiliência<br><em style="color:#aaa">Raízes: ${actor.system.props?.raizes?.value || 0}/5</em></p></div>`,
      buttons: {
        n1: { label: "Nv1(2PC)", callback: () => r(0) },
        n2: { label: "Nv2(3PC)", callback: () => r(1) },
        n3: { label: "Nv3(5PC)", callback: () => r(2) },
        n4: { label: "Nv4(7PC)", callback: () => r(3) },
      },
    }).render(!0);
  });
  const sel = cfg.niveis[lvl],
    pc = actor.system.props?.pc?.value || 0;
  if (pc < sel.c) return ui.notifications.error("❌ PC!");
  await actor.update({ "system.props.pc.value": pc - sel.c });
  const raizes = actor.system.props?.raizes?.value || 0;
  if (raizes < 5) {
    await actor.update({ "system.props.raizes.value": raizes + 1 });
    ui.notifications.info("��� +1 Raiz (Proteção bem-sucedida)");
  }
  const chat = `<div style="background:linear-gradient(135deg,#0a0a0f,#1a1a2e);border:2px solid ${cfg.cor};border-radius:12px;padding:15px;box-shadow:0 0 20px rgba(166,83,90,0.3)"><h2 style="color:${cfg.cor};text-align:center;text-shadow:0 0 10px ${cfg.cor}">�� ${cfg.nome}</h2><p style="color:#aaa;text-align:center;font-style:italic">${cfg.jp}</p><div style="background:rgba(166,83,90,0.1);padding:10px;text-align:center"><div style="font-size:32px;color:#00D9FF;font-weight:bold">${sel.def} Defesa</div><div style="color:#aaa">Aliado Protegido</div></div><div style="background:rgba(166,83,90,0.2);padding:8px;margin-top:10px;border-left:3px solid ${cfg.cor}"><strong style="color:${cfg.cor}">⚡ Efeito:</strong> Se errar, aliado ganha +2 acerto (Encorajado)</div><div style="background:rgba(255,215,0,0.1);padding:8px;margin-top:10px;font-size:11px"><strong style="color:#FFD700">��� Raízes: ${raizes + 1}/5</strong><br><span style="color:#aaa">+1 Defesa (Solo Sagrado) | Cobertura para aliados</span></div></div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: chat,
  });
  ui.notifications.info("���️ Proteção ativa!");
})();
