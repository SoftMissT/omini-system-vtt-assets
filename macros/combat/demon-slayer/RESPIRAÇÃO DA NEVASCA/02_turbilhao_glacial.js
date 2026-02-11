(async()=>{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
const esp=actor.system.props?.espirito?.value??0;
const nivel=actor.system.props?.nivel?.value??1;
const CD=10+Math.floor(nivel/2)+esp;
const cfg={nome:"Segunda Forma: Roda de Turbilhão Glacial",jp:"Ni no Kata: Hyoka Rin",tipo:"Ação Principal",cor:"#52FF89",niveis:[{n:1,d:"2d6",c:3},{n:2,d:"2d8",c:5},{n:3,d:"2d10",c:7},{n:4,d:"3d8",c:10}]};
const lvl=await new Promise(r=>{new Dialog({title:"❄️",content:`<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"><h2 style="color:${cfg.cor}">${cfg.nome}</h2>${cfg.niveis.map(n=>`<p style="color:#fff">Nv${n.n}: ${n.d} Perfurante | ${n.c}PC</p>`).join('')}<p style="color:#52FF89;font-size:12px">Broca: Ignora RD | CD ${CD} ou Atordoado | +2 Def</p><p style="color:#aaa;font-size:11px">Cristais: ${cris}/5</p></div>`,buttons:{n1:{label:"Nv1",callback:()=>r(0)},n2:{label:"Nv2",callback:()=>r(1)},n3:{label:"Nv3",callback:()=>r(2)},n4:{label:"Nv4",callback:()=>r(3)}}}).render(!0)});
const sel=cfg.niveis[lvl],pc=actor.system.props?.pc?.value??0;
if(pc<sel.c)return ui.notifications.error("❌ PC!");
const corpo=actor.system.props?.corpo?.value??0,formula=`${sel.d}+${corpo}`,roll=await new Roll(formula).evaluate();
game.dice3d&&await game.dice3d.showForRoll(roll,game.user,!0);
await actor.update({"system.props.pc.value":pc-sel.c});
const chat=`<div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:2px solid ${cfg.cor};border-radius:12px;padding:15px;box-shadow:0 0 20px rgba(82,255,137,0.25)">
<h2 style="color:${cfg.cor};text-align:center">❄️ ${cfg.nome}</h2><p style="color:#aaa;text-align:center">${cfg.jp}</p>
<div style="background:rgba(82,255,137,0.08);padding:12px;text-align:center;border-radius:8px">
  <div style="font-size:36px;color:#FFD700;font-weight:bold">${roll.total}</div>
  <div style="color:#52FF89;font-size:12px">${formula} | Perfurante</div>
</div>
<div style="background:rgba(82,255,137,0.1);padding:8px;border-left:3px solid ${cfg.cor};margin-top:10px">
  <strong style="color:${cfg.cor}">��� Broca:</strong> Ignora Redução de Dano Física<br>
  <strong style="color:#00D9FF">���️ Guarda Frontal:</strong> +2 Defesa durante ação<br>
  <strong style="color:#FF2B4A">⚡ TR COR CD ${CD}</strong> ou Atordoado
</div>
<div style="background:rgba(82,255,137,0.06);border:1px solid ${cfg.cor};padding:8px;margin-top:8px;font-size:11px;border-radius:6px">
  <strong style="color:${cfg.cor}">❄️ Cristais: ${cris}/5</strong><br>
  <span style="color:#aaa">Hipotermia: Acertos reduzem -3m mov alvo</span>
</div></div>`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
ui.notifications.info(`❄️ Turbilhão: ${roll.total}`);
})();
