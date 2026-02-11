(async()=>{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
const esp=actor.system.props?.espirito?.value??0;
const nivel=actor.system.props?.nivel?.value??1;
const CD=10+Math.floor(nivel/2)+esp;
const cfg={nome:"Sétima Forma: Vórtice Absoluto",jp:"Shichi no Kata: Zettai Uzumaki",tipo:"Ação Padrão",cor:"#52FF89",niveis:[{n:1,d:"1d8",puxao:"3m",c:4},{n:2,d:"1d10",puxao:"4.5m",c:6},{n:3,d:"1d12",puxao:"6m",c:8},{n:4,d:"2d8",puxao:"9m",c:10}]};
const lvl=await new Promise(r=>{new Dialog({title:"❄️ Vórtice",content:`<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"><h2 style="color:${cfg.cor}">${cfg.nome}</h2>${cfg.niveis.map(n=>`<p style="color:#fff">Nv${n.n}: ${n.d} + Puxão ${n.puxao} | ${n.c}PC</p>`).join('')}<p style="color:#52FF89;font-size:12px">TR CORPO CD ${CD} ou Puxado até adjacente</p></div>`,buttons:{n1:{label:"Nv1",callback:()=>r(0)},n2:{label:"Nv2",callback:()=>r(1)},n3:{label:"Nv3",callback:()=>r(2)},n4:{label:"Nv4",callback:()=>r(3)}}}).render(!0)});
const sel=cfg.niveis[lvl],pc=actor.system.props?.pc?.value??0;
if(pc<sel.c)return ui.notifications.error("❌ PC!");
const corpo=actor.system.props?.corpo?.value??0,formula=`${sel.d}+${corpo}`,roll=await new Roll(formula).evaluate();
game.dice3d&&await game.dice3d.showForRoll(roll,game.user,!0);
await actor.update({"system.props.pc.value":pc-sel.c});
const chat=`<div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:2px solid ${cfg.cor};border-radius:12px;padding:15px">
<h2 style="color:${cfg.cor};text-align:center">❄️ ${cfg.nome}</h2><p style="color:#aaa;text-align:center">${cfg.jp}</p>
<div style="background:rgba(82,255,137,0.08);padding:12px;text-align:center;border-radius:8px">
  <div style="font-size:36px;color:#FFD700;font-weight:bold">${roll.total}</div>
  <div style="color:#52FF89;font-size:12px">+ Puxão ${sel.puxao}</div>
</div>
<div style="background:rgba(82,255,137,0.1);padding:8px;border-left:3px solid ${cfg.cor};margin-top:8px">
  <strong style="color:#FF2B4A">TR CORPO CD ${CD}</strong> ou Puxado até adjacente<br>
  <strong style="color:#FFD700">��� Colisão:</strong> Dano extra se baterem uns nos outros
</div>
<div style="background:rgba(82,255,137,0.06);border:1px solid ${cfg.cor};padding:8px;margin-top:8px;font-size:11px;border-radius:6px">
  <strong style="color:${cfg.cor}">❄️ Cristais: ${cris}/5</strong>
</div></div>`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
ui.notifications.info(`❄️ Vórtice: ${roll.total} | Puxão: ${sel.puxao}`);
})();
