(async()=>{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
const esp=actor.system.props?.espirito?.value??0;
const nivel=actor.system.props?.nivel?.value??1;
const CD=10+Math.floor(nivel/2)+esp;
const pc=actor.system.props?.pc?.value??0;
const mom=actor.system.props?.momentum?.value??0;
if(pc<8||mom<4)return ui.notifications.error(`❌ Requer 8PC e 4 Momentum! (PC:${pc} Mom:${mom})`);

const confirma=await Dialog.confirm({title:"❄️ Labirinto de Gelo",content:`<div style="background:#0a0a0f;padding:15px;border:2px solid #52FF89"><h2 style="color:#52FF89;text-align:center">Sexta Forma: Labirinto de Gelo</h2><p style="color:#aaa">Raio 6m | 3 Turnos<br><strong style="color:#52FF89">8 PC + 4 Momentum</strong></p></div>`});
if(!confirma)return;
await actor.update({"system.props.pc.value":pc-8,"system.props.momentum.value":mom-4});

const chat=`<div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:3px solid #52FF89;border-radius:12px;padding:15px;box-shadow:0 0 30px rgba(82,255,137,0.3)">
<h2 style="color:#52FF89;text-align:center;text-shadow:0 0 15px #52FF89">❄️ LABIRINTO DE GELO ❄️</h2>
<p style="color:#aaa;text-align:center">Roku no Kata: Hyoketsu Meikyu</p>
<div style="background:rgba(82,255,137,0.1);padding:15px;text-align:center;border-radius:8px">
  <div style="font-size:28px;color:#52FF89;font-weight:bold">Raio 6m Ativo</div>
  <div style="color:#aaa">Duração: 3 Turnos</div>
</div>
<div style="background:rgba(82,255,137,0.1);padding:10px;border-left:4px solid #52FF89;margin-top:10px">
  <strong style="color:#52FF89">Para Você:</strong> +3m Movimento na área<br>
  <strong style="color:#FF2B4A">Para Inimigos:</strong> Terreno Difícil (custo dobrado)<br>
  <strong style="color:#FFD700">Teste Equilíbrio:</strong> TR CORPO CD ${CD} ao sair ou Derrubado
</div>
<div style="background:rgba(82,255,137,0.06);border:1px solid #52FF89;padding:8px;margin-top:8px;font-size:11px;border-radius:6px">
  <strong style="color:#52FF89">❄️ Cristais: ${cris}/5</strong> | Estático ou Móvel com usuário
</div></div>`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
if(game.modules.get("sequencer")?.active&&canvas.tokens.controlled[0])
  new Sequence().effect().file("jb2a.ice_spikes.ring.blue").atLocation(canvas.tokens.controlled[0]).scale(2.5).duration(3000).play().catch(()=>{});
ui.notifications.info("❄️ Labirinto de Gelo ativado! (3 turnos)");
})();
