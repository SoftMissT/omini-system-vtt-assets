(async () => {
  const actor = canvas.tokens.controlled[0]?.actor || game.user.character;
  if (!actor) return ui.notifications.error("❌ Selecione token!");
  const cfg = {
    nome: "Primeira Forma: Corte d'Água Superficial",
    jp: "Ichi no Kata: Minamo Giri",
    tipo: "Ação Bônus",
    cor: "#048ABF",
    niveis: [
      { n: 1, d: "1d6", c: 1, desc: "Golpe horizontal fluido" },
      { n: 2, d: "1d8", c: 2, desc: "Corte rápido" },
      { n: 3, d: "1d10", c: 4, desc: "Lâmina cortante" },
      { n: 4, d: "2d6", c: 6, desc: "Fluxo mortal" },
    ],
  };
  const lvl = await new Promise((r) => {
    new Dialog({
      title: "��� Nível",
      content: `<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor};border-radius:8px"><h2 style="color:${cfg.cor};text-align:center">${cfg.nome}</h2><p style="color:#aaa;text-align:center;font-style:italic">${cfg.jp}</p>${cfg.niveis.map((n) => `<p style="color:#fff"><strong style="color:${cfg.cor}">Nível ${n.n}:</strong> ${n.d} | ${n.c} PC</p>`).join("")}<hr style="border-color:${cfg.cor}"><p style="color:#FFD700;font-size:12px"><strong>Passiva:</strong> A Lâmina de Mil Formas</p></div>`,
      buttons: {
        n1: { label: "Nv1 (1PC)", callback: () => r(0) },
        n2: { label: "Nv2 (2PC)", callback: () => r(1) },
        n3: { label: "Nv3 (4PC)", callback: () => r(2) },
        n4: { label: "Nv4 (6PC)", callback: () => r(3) },
      },
    }).render(!0);
  });
  const sel = cfg.niveis[lvl],
    pc = actor.system.props?.pc?.value || 0;
  if (pc < sel.c) return ui.notifications.error(`❌ PC: ${sel.c} | Tem: ${pc}`);
  const corpo = actor.system.props?.corpo?.value || 0,
    formula = `${sel.d}+${corpo}`,
    roll = await new Roll(formula).evaluate();
  game.dice3d && (await game.dice3d.showForRoll(roll, game.user, !0));
  await actor.update({ "system.props.pc.value": pc - sel.c });
  const chat = `<div style="background:linear-gradient(135deg,#0a0a0f,#1a1a2e);border:2px solid ${cfg.cor};border-radius:12px;padding:15px;box-shadow:0 0 20px rgba(4,138,191,0.3)"><h2 style="color:${cfg.cor};font-family:Orbitron;text-align:center;text-shadow:0 0 10px ${cfg.cor}">��� ${cfg.nome}</h2><p style="color:#aaa;text-align:center;font-style:italic">${cfg.jp}</p><div style="background:rgba(4,138,191,0.1);padding:10px;border-radius:8px;text-align:center"><div style="font-size:32px;color:#FFD700;font-weight:bold;text-shadow:0 0 10px #FFD700">${roll.total}</div><div style="color:#aaa;font-size:12px">${formula}</div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:10px 0"><div style="background:rgba(255,215,0,0.1);padding:8px;border-radius:6px;text-align:center"><div style="color:#FFD700;font-size:12px">Tipo</div><div style="color:#fff;font-weight:bold">${cfg.tipo}</div></div><div style="background:rgba(255,43,74,0.1);padding:8px;border-radius:6px;text-align:center"><div style="color:#FF2B4A;font-size:12px">Custo</div><div style="color:#fff;font-weight:bold">${sel.c} PC</div></div></div><div style="color:#ccc;font-size:13px">${sel.desc}</div><div style="background:rgba(4,138,191,0.2);padding:8px;border-left:3px solid ${cfg.cor};margin-top:10px"><strong style="color:${cfg.cor}">⚡ Efeito:</strong> +2 acerto se avanço 3m+</div><div style="background:rgba(255,215,0,0.1);border:1px solid #FFD700;border-radius:6px;padding:8px;margin-top:10px;font-size:11px"><strong style="color:#FFD700">��� Passiva: A Lâmina de Mil Formas</strong><br><span style="color:#aaa">Cascata/Correnteza/Vórtice | Refluxo</span></div></div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: chat,
  });
  game.modules.get("sequencer")?.active &&
    canvas.tokens.controlled[0] &&
    new Sequence()
      .effect()
      .file("jb2a.water_splash.blue")
      .atLocation(canvas.tokens.controlled[0])
      .scale(0.8)
      .duration(1500)
      .play()
      .catch(() => {});
  ui.notifications.info(`��� Dano: ${roll.total}`);
})();
