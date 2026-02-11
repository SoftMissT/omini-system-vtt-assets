(async()=>{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
const pc=actor.system.props?.pc?.value??0;
if(pc<2)return ui.notifications.error("❌ 2 PC mínimo!");

const acao=await new Promise(r=>{new Dialog({title:"❄️ Névoa Espectral",content:`<div style="background:#0a0a0f;padding:15px;border:2px solid #52FF89"><h2 style="color:#52FF89;text-align:center">Décima Terceira Forma: Névoa Espectral</h2><p style="color:#aaa;text-align:center">Ju San no Kata: Tsuiseki</p><p style="color:#52FF89">2 PC por turno para manter<br>+4 Defesa vs AO | +2 Dano após Dash→Ataque</p><p style="color:#aaa;font-size:12px">PC atual: ${pc}</p></div>`,buttons:{ativar:{label:"Ativar (2PC)",callback:()=>r('ativar')},manter:{label:"Manter (2PC)",callback:()=>r('manter')},encerrar:{label:"Encerrar",callback:()=>r('encerrar')}}}).render(!0)});

if(acao==='encerrar'){await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:`<div style="background:#0a0a0f;border:2px solid #52FF89;border-radius:8px;padding:10px;text-align:center"><strong style="color:#52FF89">❄️ Névoa Espectral encerrada</strong></div>`});return;}
await actor.update({"system.props.pc.value":pc-2});
const chat=`<div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:2px solid #52FF89;border-radius:12px;padding:15px">
<h2 style="color:#52FF89;text-align:center">❄️ Névoa Espectral ${acao==='ativar'?'ATIVADA':'MANTIDA'}</h2>
<p style="color:#aaa;text-align:center">Ju San no Kata: Tsuiseki</p>
<div style="background:rgba(82,255,137,0.08);padding:10px;text-align:center;border-radius:8px">
  <div style="font-size:24px;color:#00D9FF;font-weight:bold">+4 Defesa vs AO</div>
  <div style="color:#52FF89;font-size:14px">+2 Dano Impacto após Dash→Ataque</div>
</div>
<div style="background:rgba(82,255,137,0.06);border:1px solid #52FF89;padding:8px;margin-top:8px;font-size:11px;border-radius:6px">
  <strong style="color:#52FF89">❄️ Cristais: ${cris}/5</strong> | -2PC/turno
</div></div>`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
ui.notifications.info(`❄️ Névoa: ${acao} | PC: ${pc-2}`);
})();
