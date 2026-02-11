(async()=>{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
const pc=actor.system.props?.pc?.value??0;
if(cris<3)return ui.notifications.error(`❌ Requer 3 Cristais! (Tem: ${cris})`);
if(pc<10)return ui.notifications.error(`❌ PC: 10|Tem: ${pc}`);
const confirma=await Dialog.confirm({title:"❄️ Coração de Gelo",content:`<div style="background:#0a0a0f;padding:15px;border:2px solid #52FF89"><h2 style="color:#52FF89;text-align:center">Décima Primeira Forma</h2><p style="color:#aaa;text-align:center">10 PC + 3 Cristais</p><p style="color:#2EFF7A;text-align:center">Remove: Sangramento, Veneno, Queimadura<br>Confusão, Medo</p></div>`});
if(!confirma)return;
await actor.update({"system.props.pc.value":pc-10,"system.props.cristais.value":cris-3});
const chat=`<div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:3px solid #00D9FF;border-radius:12px;padding:15px;box-shadow:0 0 30px rgba(0,217,255,0.3)">
<h2 style="color:#00D9FF;text-align:center;text-shadow:0 0 15px #00D9FF">❄️ Décima Primeira Forma: Coração de Gelo ❄️</h2>
<p style="color:#aaa;text-align:center">Ju Ichi no Kata: Hyonagi</p>
<div style="background:rgba(0,217,255,0.1);padding:15px;text-align:center;border-radius:8px">
  <div style="font-size:28px;color:#2EFF7A;font-weight:bold">PURIFICAÇÃO</div>
  <div style="color:#aaa;font-size:13px">Temperatura corporal → Abaixo de zero</div>
</div>
<div style="background:rgba(46,255,122,0.1);padding:10px;border-left:4px solid #2EFF7A;margin-top:10px">
  <strong style="color:#2EFF7A">✨ Removido:</strong><br>
  ��� Sangramento | ☠️ Veneno | ��� Queimadura<br>
  ��� Confusão | ��� Medo
</div>
<div style="background:rgba(0,217,255,0.06);border:1px solid #00D9FF;padding:8px;margin-top:8px;font-size:11px;border-radius:6px">
  <strong style="color:#00D9FF">❄️ Cristais: ${cris-3}/5</strong> (-3 Cristais)
</div></div>`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
ui.notifications.info("❄️ Purificação completa!");
})();
