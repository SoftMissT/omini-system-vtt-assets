(async () => {
  const actor = canvas.tokens.controlled[0]?.actor || game.user.character;
  if (!actor) return ui.notifications.error("❌!");
  const cfg = {
    nome: "Décima Primeira Forma: Calmaria",
    jp: "Jū Ichi no Kata: Nagi",
    tipo: "Reação",
    cor: "#048ABF",
    niveis: [
      { n: 2, anula: 4, bloq: "+8", dur: 4, c: 6 },
      { n: 3, anula: 6, bloq: "+8", dur: 4, c: 9 },
      { n: 4, anula: 10, bloq: "+8", dur: 4, c: 15 },
    ],
  };
  const nivel = actor.system.props?.nivel?.value || 1;
  if (nivel < 14) return ui.notifications.error("❌ Requer nível 14+!");
  const lvl = await new Promise((r) => {
    new Dialog({
      title: "��� CALMARIA",
      content: `<div style="background:#0a0a0f;padding:15px;border:3px solid ${cfg.cor}"><h2 style="color:#00D9FF">${cfg.nome}</h2><p style="color:#FFD700">⚠️ DEFESA ABSOLUTA</p>${cfg.niveis.map((n) => `<p>Nv${n.n}: Anula ${n.anula} ataques | ${n.bloq} bloq ${n.dur}t | ${n.c}PC</p>`).join("")}</div>`,
      buttons: {
        n2: { label: "Nv2", callback: () => r(0) },
        n3: { label: "Nv3", callback: () => r(1) },
        n4: { label: "Nv4", callback: () => r(2) },
      },
    }).render(!0);
  });
  const sel = cfg.niveis[lvl],
    pc = actor.system.props?.pc?.value || 0;
  if (pc < sel.c) return ui.notifications.error("❌!");
  await actor.update({ "system.props.pc.value": pc - sel.c });
  const chat = `<div style="background:linear-gradient(135deg,#0a0a0f,#1a1a2e);border:3px solid #00D9FF;border-radius:12px;padding:15px;box-shadow:0 0 30px rgba(0,217,255,0.5)"><h2 style="color:#00D9FF;text-align:center;text-shadow:0 0 15px #00D9FF">���️ ${cfg.nome} ���️</h2><p style="color:#aaa;text-align:center;font-style:italic">${cfg.jp}</p><div style="background:rgba(0,217,255,0.2);padding:15px;border-radius:8px;text-align:center"><div style="font-size:42px;color:#00D9FF;font-weight:bold;text-shadow:0 0 20px #00D9FF">ANULA ${sel.anula}</div><div style="color:#aaa">+${sel.bloq} Bloqueio por ${sel.dur} turnos</div></div><div style="background:rgba(0,217,255,0.2);padding:10px;margin-top:10px;border-left:4px solid #00D9FF"><strong style="color:#00D9FF">�� TRANQUILIDADE ABSOLUTA</strong><br>Para qualquer ataque frontal | Velocidade imperceptível</div></div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: chat,
  });
  ui.notifications.info(`���️ CALMARIA ATIVADA`);
})();
