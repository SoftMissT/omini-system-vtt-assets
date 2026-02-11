(async()=>{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
const cfg={nome:"Terceira Forma: Barreira da Lua Cheia",jp:"San no Kata: Getsu Heki",tipo:"Reação",cor:"#52FF89",niveis:[{n:1,b:"+2",rd:3,c:2},{n:2,b:"+4",rd:5,c:3},{n:3,b:"+6",rd:8,c:5},{n:4,b:"+8",rd:12,c:7}]};
const lvl=await new Promise(r=>{new Dialog({title:"❄️ Defesa",content:`<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"><h2 style="color:${cfg.cor}">${cfg.nome}</h2>${cfg.niveis.map(n=>`<p style="color:#fff">Nv${n.n}: ${n.b} Bloqueio | Reduz ${n.rd} dano | ${n.c}PC</p>`).join('')}<p style="color:#52FF89;font-size:12px">Bloqueio total = +1PC ou +1Cristal</p></div>`,buttons:{n1:{label:"Nv1",callback:()=>r(0)},n2:{label:"Nv2",callback:()=>r(1)},n3:{label:"Nv3",callback:()=>r(2)},n4:{label:"Nv4",callback:()=>r(3)}}}).render(!0)});
const sel=cfg.niveis[lvl],pc=actor.system.props?.pc?.value??0;
if(pc<sel.c)return ui.notifications.error("❌ PC!");
await actor.update({"system.props.pc.value":pc-sel.c});

// Verifica se bloqueio total (dano reduziu a 0)
const bloqTotal=await Dialog.confirm({title:"Bloqueio Total?",content:"<p>O dano foi reduzido a 0?</p>"});
let novoCris=cris;
let ganhou="";
if(bloqTotal){
  const opcao=await new Promise(r=>{new Dialog({title:"Recompensa do Bloqueio",content:"<p>O que recuperar?</p>",buttons:{pc:{label:"+1 PC",callback:()=>r('pc')},cristal:{label:"+1 Cristal",callback:()=>r('cris')}}}).render(!0)});
  if(opcao==='pc'){await actor.update({"system.props.pc.value":pc-sel.c+1});ganhou="+1 PC";}
  else if(opcao==='cris'&&cris<5){novoCris=cris+1;await actor.update({"system.props.cristais.value":novoCris});ganhou="+1 Cristal";}
}
// Gasta cristal para contra-ataque de oportunidade
const contraAtk=cris>=1?await Dialog.confirm({title:"Gastar 1 Cristal?",content:"<p>Contra-ataque com Vantagem após o bloqueio? (-1 Cristal)</p>"}):false;
if(contraAtk&&novoCris>=1){await actor.update({"system.props.cristais.value":novoCris-1});novoCris-=1;}

const chat=`<div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:2px solid ${cfg.cor};border-radius:12px;padding:15px">
<h2 style="color:${cfg.cor};text-align:center">❄️ ${cfg.nome}</h2><p style="color:#aaa;text-align:center">${cfg.jp}</p>
<div style="background:rgba(0,217,255,0.1);padding:12px;text-align:center;border-radius:8px">
  <div style="font-size:32px;color:#00D9FF;font-weight:bold">${sel.b} Bloqueio</div>
  <div style="color:#52FF89;font-size:14px">Reduz ${sel.rd} de dano</div>
</div>
${bloqTotal?`<div style="background:rgba(255,215,0,0.1);padding:8px;border-left:3px solid #FFD700;margin-top:8px"><strong style="color:#FFD700">✨ BLOQUEIO TOTAL! ${ganhou}</strong></div>`:''}
${contraAtk?`<div style="background:rgba(82,255,137,0.15);padding:8px;border-left:3px solid ${cfg.cor};margin-top:8px"><strong style="color:${cfg.cor}">⚡ CONTRA-ATAQUE com Vantagem! (-1 Cristal)</strong></div>`:''}
<div style="background:rgba(82,255,137,0.06);border:1px solid ${cfg.cor};padding:8px;margin-top:8px;font-size:11px;border-radius:6px">
  <strong style="color:${cfg.cor}">❄️ Cristais: ${novoCris}/5</strong> | +1 Cristal por Bloqueio ok
</div></div>`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
ui.notifications.info(`���️ Barreira: ${sel.b} | Redução: ${sel.rd}`);
})();
