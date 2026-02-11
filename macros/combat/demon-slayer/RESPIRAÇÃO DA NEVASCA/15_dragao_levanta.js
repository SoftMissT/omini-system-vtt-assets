(async()=>{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("‚ùå Token!");
const cris=actor.system.props?.cristais?.value??0;
const pc=actor.system.props?.pc?.value??0;
const mom=actor.system.props?.momentum?.value??0;
if(pc<10)return ui.notifications.error(`‚ùå PC: 10|Tem: ${pc}`);
if(mom<4)return ui.notifications.error(`‚ùå Momentum: 4|Tem: ${mom}`);

const confirma=await Dialog.confirm({title:"Ì∞â DRAG√ÉO LEVANTA A CABE√áA",content:`<div style="background:#0a0a0f;padding:20px;border:3px solid #52FF89"><h2 style="color:#52FF89;text-align:center">Ju Go no Kata: Hiryu no Atama</h2><p style="color:#FFD700;text-align:center">10 PC + 4 Momentum</p><p style="color:#aaa">4d10 Frio + 2√ó Cristais consumidos<br>Ignora Bloqueio/Aparar ‚Äî alvo DEVE Esquivar<br><br><strong style="color:#FF2B4A">Falha ‚Üí Gastar 5 Cristais + 5 Mom + 5 PV = +10 b√¥nus</strong></p><p style="color:#52FF89">Cristais atuais: ${cris}/5</p></div>`});
if(!confirma)return;

const corpo=actor.system.props?.corpo?.value??0;
const bonusCristais=cris*2;
const formula=`4d10+${corpo}+${bonusCristais}`;
const roll=await new Roll(formula).evaluate();
game.dice3d&&await game.dice3d.showForRoll(roll,game.user,!0);
await actor.update({"system.props.pc.value":pc-10,"system.props.momentum.value":mom-4,"system.props.cristais.value":0});

// Verificar se falhou e quer usar reroll supremo
const falhou=await Dialog.confirm({title:"Ataque falhou?",content:`<div style="background:#0a0a0f;padding:10px;border:2px solid #FF2B4A"><p style="color:#FF2B4A"><strong>Usar TODOS os recursos?</strong><br>5 Cristais + 5 Mom + 5 PV ‚Üí +10 b√¥nus e rolar novamente</p></div>`});
let finalMsg='';
if(falhou){
  const momAtual=actor.system.props?.momentum?.value??0;
  const pvAtual=actor.system.props?.pv?.value??0;
  const crisAtual=actor.system.props?.cristais?.value??0;
  if(crisAtual>=5&&momAtual>=5&&pvAtual>5){
    const roll2=await new Roll(`4d10+${corpo}+${bonusCristais}+10`).evaluate();
    game.dice3d&&await game.dice3d.showForRoll(roll2,game.user,!0);
    await actor.update({"system.props.cristais.value":0,"system.props.momentum.value":momAtual-5,"system.props.pv.value":pvAtual-5});
    finalMsg=`<div style="background:rgba(255,215,0,0.2);padding:10px;margin-top:10px;border:2px solid #FFD700;border-radius:6px;text-align:center"><strong style="color:#FFD700;font-size:18px">‚ö° DRAG√ÉO MUDA TRAJET√ìRIA!</strong><br><div style="font-size:32px;color:#FFD700">${roll2.total}</div><span style="color:#aaa">+10 b√¥nus | -5Cris -5Mom -5PV</span></div>`;
  }else{finalMsg='<div style="background:rgba(255,43,74,0.1);padding:8px;margin-top:8px"><strong style="color:#FF2B4A">‚ùå Recursos insuficientes para reroll</strong></div>';}
}

const chat=`<div style="background:linear-gradient(135deg,#0a0a0f,#051f12);border:4px solid #FFD700;border-radius:14px;padding:20px;box-shadow:0 0 50px rgba(255,215,0,0.4)">
<h2 style="color:#52FF89;text-align:center;text-shadow:0 0 20px #52FF89;font-size:24px">Ì∞â O DRAG√ÉO LEVANTA A CABE√áA Ì∞â</h2>
<p style="color:#aaa;text-align:center;font-style:italic">Ju Go no Kata: Hiryu no Atama</p>
<div style="background:rgba(82,255,137,0.1);padding:18px;text-align:center;border-radius:10px;margin:15px 0">
  <div style="font-size:48px;color:#52FF89;font-weight:bold;text-shadow:0 0 25px #52FF89">${roll.total}</div>
  <div style="color:#aaa;font-size:13px">${formula} | 4d10 + 2√ó${cris} Cristais</div>
</div>
<div style="background:rgba(82,255,137,0.1);padding:12px;border-left:5px solid #52FF89;margin-top:10px">
  <strong style="color:#52FF89">Ì∞â Ignora Bloqueio/Aparar/Escudos</strong><br>
  <strong style="color:#FF2B4A">Alvo DEVE Esquivar!</strong><br>
  <span style="color:#aaa">Cristais b√¥nus: ${cris}√ó2 = +${bonusCristais} dano</span>
</div>
${finalMsg}
<div style="background:rgba(255,43,74,0.15);padding:10px;margin-top:10px;border:2px solid #FF2B4A;border-radius:6px;text-align:center">
  <strong style="color:#FF2B4A">‚ùÑÔ∏è Cristais zerados ap√≥s o golpe</strong>
</div></div>`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
if(game.modules.get("sequencer")?.active&&canvas.tokens.controlled[0])
  new Sequence().effect().file("jb2a.divine_smite.blue").atLocation(canvas.tokens.controlled[0]).scale(3.5).duration(4000).fadeIn(300).fadeOut(800).play().catch(()=>{});
ui.notifications.warn(`Ì∞â DRAG√ÉO: ${roll.total} | Cristais zerados!`);
})();
