(async()=>{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
const cfg={nome:"Nona Forma: Ilusão de Granizo",jp:"Ku no Kata: Mizore Ashi",tipo:"Reação",cor:"#52FF89",niveis:[{n:1,esq:"+2",c:2},{n:2,esq:"+3",c:3},{n:3,esq:"+6",c:5},{n:4,esq:"+8",c:7}]};
const lvl=await new Promise(r=>{new Dialog({title:"❄️ Ilusão",content:`<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"><h2 style="color:${cfg.cor}">${cfg.nome}</h2>${cfg.niveis.map(n=>`<p style="color:#fff">Nv${n.n}: ${n.esq} Esquiva | ${n.c}PC</p>`).join('')}<p style="color:#52FF89;font-size:12px">Estátua 1PV explode: Hipotermia + 1d6 Frio</p><p style="color:#FFD700;font-size:11px">Preserva Cristais de perda neste turno</p></div>`,buttons:{n1:{label:"Nv1",callback:()=>r(0)},n2:{label:"Nv2",callback:()=>r(1)},n3:{label:"Nv3",callback:()=>r(2)},n4:{label:"Nv4",callback:()=>r(3)}}}).render(!0)});
const sel=cfg.niveis[lvl],pc=actor.system.props?.pc?.value??0;
if(pc<sel.c)return ui.notifications.error("❌ PC!");
// Ganho +1 Cristal por esquiva ok
let novoCris=Math.min(cris+1,5);
await actor.update({"system.props.pc.value":pc-sel.c,"system.props.cristais.value":novoCris});
const chat=`<div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:2px solid ${cfg.cor};border-radius:12px;padding:15px">
<h2 style="color:${cfg.cor};text-align:center">❄️ ${cfg.nome}</h2><p style="color:#aaa;text-align:center">${cfg.jp}</p>
<div style="background:rgba(0,217,255,0.1);padding:12px;text-align:center;border-radius:8px">
  <div style="font-size:32px;color:#00D9FF;font-weight:bold">${sel.esq} Esquiva</div>
</div>
<div style="background:rgba(82,255,137,0.1);padding:8px;border-left:3px solid ${cfg.cor};margin-top:8px">
  <strong style="color:#00D9FF">��� Estátua de Gelo (1PV)</strong> criada no local<br>
  <strong style="color:${cfg.cor}">��� Se destruída:</strong> Hipotermia + 1d6 Frio ao atacante<br>
  <strong style="color:#FFD700">��️ Preserva Cristais</strong> de perda neste turno
</div>
<div style="background:rgba(82,255,137,0.06);border:1px solid ${cfg.cor};padding:8px;margin-top:8px;font-size:11px;border-radius:6px">
  <strong style="color:${cfg.cor}">❄️ Cristais: ${novoCris}/5</strong> <span style="color:#FFD700">(+1 Esquiva!)</span>
</div></div>`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
ui.notifications.info(`❄️ Ilusão: ${sel.esq} | Cristais: ${novoCris}/5`);
})();
