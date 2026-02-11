(async () => {
  const actor = canvas.tokens.controlled[0]?.actor || game.user.character;
  if (!actor) return ui.notifications.error("❌!");
  const cfg = {
    nome: "Décima Segunda Forma: Colheitor de Raízes Ancestrais",
    jp: "Jū Ni no Kata: Kodai Ne no Karite",
    tipo: "Ação Completa",
    cor: "#A6535A",
    dano: "4d10",
    pc: 12,
    momentum: 5,
    raizes: 5,
  };
  const raizes = actor.system.props?.raizes?.value || 0,
    pc = actor.system.props?.pc?.value || 0,
    mom = actor.system.props?.momentum?.value || 0;
  if (raizes < cfg.raizes) return ui.notifications.error("❌ Requer 5 Raízes!");
  if (pc < cfg.pc || mom < cfg.momentum)
    return ui.notifications.error("❌ Recursos!");
  const confirma = await Dialog.confirm({
    title: "⚠️ FORMA SUPREMA",
    content: `<div style="background:#0a0a0f;padding:20px;border:3px solid ${cfg.cor}"><h2 style="color:${cfg.cor};text-align:center">${cfg.nome}</h2><p style="color:#FF2B4A;font-size:18px;text-align:center"><strong>⚠️ COLHEITOR ANCESTRAL</strong></p><p style="color:#aaa">Consome:<br>• 5 Raízes (TODAS)<br>• 12 PC<br>• 5 Momentum</p><p style="color:#FFD700">Dano: 4d10 raio 6m<br>TR CORPO CD 18 ou Paralisado</p><p style="color:#FF2B4A">Rebote: Exaustão Nível 1</p></div>`,
  });
  if (!confirma) return;
  const corpo = actor.system.props?.corpo?.value || 0,
    formula = `${cfg.dano}+${corpo}`,
    roll = await new Roll(formula).evaluate();
  game.dice3d && (await game.dice3d.showForRoll(roll, game.user, !0));
  await actor.update({
    "system.props.pc.value": pc - cfg.pc,
    "system.props.momentum.value": mom - cfg.momentum,
    "system.props.raizes.value": 0,
  });
  const chat = `<div style="background:linear-gradient(135deg,#0a0a0f,#1a1a2e);border:4px solid #FFD700;border-radius:12px;padding:20px;box-shadow:0 0 40px rgba(255,215,0,0.5)"><h2 style="color:#FFD700;text-align:center;text-shadow:0 0 20px #FFD700;font-size:28px">⚡ ${cfg.nome} ⚡</h2><p style="color:#aaa;text-align:center;font-style:italic;font-size:16px">${cfg.jp}</p><div style="background:rgba(255,215,0,0.2);padding:20px;border-radius:8px;text-align:center;margin:15px 0"><div style="font-size:48px;color:#FFD700;font-weight:bold;text-shadow:0 0 25px #FFD700">${roll.total}</div><div style="color:#aaa;font-size:14px;margin-top:5px">${formula}</div></div><div style="background:rgba(166,83,90,0.3);padding:12px;margin-top:15px;border-left:5px solid ${cfg.cor}"><strong style="color:${cfg.cor};font-size:16px">��� RAÍZES GIGANTES</strong><br><span style="color:#fff;font-size:14px">Raio 6m | TR CORPO CD 18</span><br><span style="color:#FF2B4A">Falha: PARALISADO 1 turno</span><br><span style="color:#FFD700">Sucesso: 50% dano + Enraizado</span></div><div style="background:rgba(255,43,74,0.2);padding:10px;margin-top:10px;border:2px solid #FF2B4A;border-radius:6px"><strong style="color:#FF2B4A">⚠️ REBOTE</strong><br><span style="color:#aaa">Exaustão Nível 1 após uso</span></div></div>`;
  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: chat,
  });
  game.modules.get("sequencer")?.active &&
    canvas.tokens.controlled[0] &&
    new Sequence()
      .effect()
      .file("jb2a.plant_growth.03.ring.4x4.complete.bluepurple")
      .atLocation(canvas.tokens.controlled[0])
      .scale(3)
      .duration(4000)
      .play()
      .catch(() => {});
  ui.notifications.warn(`⚡ COLHEITOR ANCESTRAL: ${roll.total} ⚡`);
})();
