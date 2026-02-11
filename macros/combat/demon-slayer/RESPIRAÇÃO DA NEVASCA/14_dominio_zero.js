(async()=>{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
const esp=actor.system.props?.espirito?.value??0;
const pc=actor.system.props?.pc?.value??0;
if(cris<5)return ui.notifications.error(`❌ Requer 5 Cristais! (Tem: ${cris})`);
if(pc<15)return ui.notifications.error(`❌ PC: 15|Tem: ${pc}`);
const confirma=await Dialog.confirm({title:"⚡ ZERO ABSOLUTO",content:`<div style="background:#0a0a0f;padding:15px;border:3px solid #52FF89"><h2 style="color:#52FF89;text-align:center">DOMÍNIO DO ZERO ABSOLUTO</h2><p style="color:#FFD700;text-align:center">15 PC | 3 Rodadas</p><p style="color:#aaa">Cristais NÃO são consumidos<br>+1 Cristal automático/turno<br>Todos inimigos (9m) = Hipotermia automática<br>Resistência dano = MOD ESP (${esp})</p></div>`});
if(!confirma)return;
await actor.update({"system.props.pc.value":pc-15});
const chat=`<div style="background:linear-gradient(135deg,#0a0a0f,#051f12);border:4px solid #52FF89;border-radius:14px;padding:20px;box-shadow:0 0 50px rgba(82,255,137,0.5)">
<h2 style="color:#52FF89;text-align:center;text-shadow:0 0 20px #52FF89;font-size:26px">❄️ DOMÍNIO DO ZERO ABSOLUTO ❄️</h2>
<p style="color:#aaa;text-align:center">Ju Shi no Kata: Zettai Reikaku</p>
<div style="background:rgba(82,255,137,0.15);padding:18px;text-align:center;border-radius:10px;margin:15px 0">
  <div style="font-size:32px;color:#52FF89;font-weight:bold;text-shadow:0 0 20px #52FF89">ATIVO — 3 RODADAS</div>
</div>
<div style="background:rgba(82,255,137,0.1);padding:12px;border-left:5px solid #52FF89;margin-top:10px">
  <strong style="color:#52FF89">❄️ Orbes Infinitos:</strong> +1 Cristal/turno automático<br>
  <strong style="color:#FF2B4A">��� Frio Penetrante:</strong> Todos inimigos (9m) = Hipotermia/turno<br>
  <strong style="color:#00D9FF">���️ Armadura de Gelo:</strong> RD ${esp} contra TODO dano
</div>
<div style="background:rgba(82,255,137,0.08);border:2px solid #52FF89;padding:10px;margin-top:10px;border-radius:6px;text-align:center">
  <strong style="color:#FFD700;font-size:14px">❄️ Cristais: ${cris}/5 (mantidos)</strong>
</div></div>`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
if(game.modules.get("sequencer")?.active&&canvas.tokens.controlled[0])
  new Sequence().effect().file("jb2a.ice_spikes.ring.blue").atLocation(canvas.tokens.controlled[0]).scale(4).duration(5000).play().catch(()=>{});
ui.notifications.warn("❄️ ZERO ABSOLUTO ATIVO! (3 rodadas)");
})();
