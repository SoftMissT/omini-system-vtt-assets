(async()=>{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
const esp=actor.system.props?.espirito?.value??0;
const nivel=actor.system.props?.nivel?.value??1;
const CD=10+Math.floor(nivel/2)+esp;
const cfg={nome:"Quarta Forma: Saque da Nevasca",jp:"Shi no Kata: Petaru Doriru",tipo:"Ação Completa",cor:"#52FF89",niveis:[{n:1,d:"1d12",linha:"4.5m",c:4},{n:2,d:"2d8",linha:"6m",c:6},{n:3,d:"3d8",linha:"7.5m",c:8},{n:4,d:"3d10",linha:"9m",c:10}]};
const lvl=await new Promise(r=>{new Dialog({title:"❄️ Linha Perfurante",content:`<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"><h2 style="color:${cfg.cor}">${cfg.nome}</h2>${cfg.niveis.map(n=>`<p style="color:#fff">Nv${n.n}: ${n.d} | Linha ${n.linha} | ${n.c}PC</p>`).join('')}<p style="color:#52FF89;font-size:12px">Hipotermia automática | Super Armadura | Cristais: ${cris}/5</p></div>`,buttons:{n1:{label:"Nv1",callback:()=>r(0)},n2:{label:"Nv2",callback:()=>r(1)},n3:{label:"Nv3",callback:()=>r(2)},n4:{label:"Nv4",callback:()=>r(3)}}}).render(!0)});
const sel=cfg.niveis[lvl],pc=actor.system.props?.pc?.value??0;
if(pc<sel.c)return ui.notifications.error("❌ PC!");
const corpo=actor.system.props?.corpo?.value??0,formula=`${sel.d}+${corpo}`,roll=await new Roll(formula).evaluate();
game.dice3d&&await game.dice3d.showForRoll(roll,game.user,!0);
await actor.update({"system.props.pc.value":pc-sel.c});

// FLUXO: DEZEMBRO disponível após esta forma
const fluxo=await Dialog.confirm({title:"⚡ FLUXO: DEZEMBRO?",content:`<div style="background:#0a0a0f;padding:10px;border:2px solid #FFD700"><strong style="color:#FFD700">FLUXO: DEZEMBRO</strong><br><span style="color:#aaa">5 Momentum — Explosão 3m ao chegar</span></div>`});
let fluxoMsg='';
if(fluxo){
  const mom=actor.system.props?.momentum?.value??0;
  if(mom<5){fluxoMsg='<div style="background:rgba(255,43,74,0.1);padding:7px;margin-top:8px"><strong style="color:#FF2B4A">❌ Momentum insuficiente (5 req)</strong></div>';}
  else{
    await actor.update({"system.props.momentum.value":mom-5});
    fluxoMsg=`<div style="background:rgba(255,215,0,0.15);padding:8px;border-left:3px solid #FFD700;margin-top:8px"><strong style="color:#FFD700">�� FLUXO DEZEMBRO ATIVO!</strong><br><span style="color:#aaa">Explosão 3m | TR CORPO CD ${CD} ou Derrubado</span></div>`;
  }
}
const chat=`<div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:2px solid ${cfg.cor};border-radius:12px;padding:15px">
<h2 style="color:${cfg.cor};text-align:center">❄️ ${cfg.nome}</h2><p style="color:#aaa;text-align:center">${cfg.jp}</p>
<div style="background:rgba(82,255,137,0.08);padding:12px;text-align:center;border-radius:8px">
  <div style="font-size:36px;color:#FFD700;font-weight:bold">${roll.total}</div>
  <div style="color:#52FF89;font-size:12px">Linha ${sel.linha}</div>
</div>
<div style="background:rgba(82,255,137,0.1);padding:8px;border-left:3px solid ${cfg.cor};margin-top:8px">
  <strong style="color:${cfg.cor}">❄️ Hipotermia Automática</strong> em todos atingidos<br>
  <strong style="color:#00D9FF">���️ Super Armadura:</strong> Imune Derrubado/Empurrado<br>
  <strong style="color:#aaa">Termina ao final da linha</strong>
</div>
${fluxoMsg}
<div style="background:rgba(82,255,137,0.06);border:1px solid ${cfg.cor};padding:8px;margin-top:8px;font-size:11px;border-radius:6px">
  <strong style="color:${cfg.cor}">❄️ Cristais: ${cris}/5</strong> | CD ${CD}
</div></div>`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
if(game.modules.get("sequencer")?.active&&canvas.tokens.controlled[0])
  new Sequence().effect().file("jb2a.ice_spikes.line.blue").atLocation(canvas.tokens.controlled[0]).scale(1.2).duration(1800).play().catch(()=>{});
ui.notifications.info(`❄️ Saque: ${roll.total}`);
})();
