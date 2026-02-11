(async()=>{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
const esp=actor.system.props?.espirito?.value??0;
const nivel=actor.system.props?.nivel?.value??1;
const CD=10+Math.floor(nivel/2)+esp;
const cfg={nome:"Décima Forma: Enterro de Avalanche",jp:"Ju no Kata: Petaru Bureido",tipo:"Ação Completa",cor:"#52FF89",niveis:[{n:1,d:"2d6",cone:"6m",c:8},{n:2,d:"2d8",cone:"9m",c:12},{n:3,d:"2d10",cone:"12m",c:16},{n:4,d:"2d12",cone:"15m",c:20}]};
const lvl=await new Promise(r=>{new Dialog({title:"❄️ AVALANCHE",content:`<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"><h2 style="color:${cfg.cor}">${cfg.nome}</h2>${cfg.niveis.map(n=>`<p style="color:#fff">Nv${n.n}: ${n.d} | Cone ${n.cone} | ${n.c}PC</p>`).join('')}<p style="color:#FF2B4A;font-size:12px">Falha CD ${CD}: Dano Total + Congelado (Imóvel 1t)</p><p style="color:#FFD700;font-size:12px">Sucesso: Metade + Hipotermia | +Terreno 3t</p></div>`,buttons:{n1:{label:"Nv1",callback:()=>r(0)},n2:{label:"Nv2",callback:()=>r(1)},n3:{label:"Nv3",callback:()=>r(2)},n4:{label:"Nv4",callback:()=>r(3)}}}).render(!0)});
const sel=cfg.niveis[lvl],pc=actor.system.props?.pc?.value??0;
if(pc<sel.c)return ui.notifications.error(`❌ PC: ${sel.c}|Tem: ${pc}`);
const corpo=actor.system.props?.corpo?.value??0,formula=`${sel.d}+${corpo}`,roll=await new Roll(formula).evaluate();
game.dice3d&&await game.dice3d.showForRoll(roll,game.user,!0);
await actor.update({"system.props.pc.value":pc-sel.c});
const chat=`<div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:3px solid ${cfg.cor};border-radius:12px;padding:15px;box-shadow:0 0 30px rgba(82,255,137,0.35)">
<h2 style="color:${cfg.cor};text-align:center;text-shadow:0 0 15px ${cfg.cor}">❄️ ${cfg.nome} ❄️</h2><p style="color:#aaa;text-align:center">${cfg.jp}</p>
<div style="background:rgba(82,255,137,0.1);padding:15px;text-align:center;border-radius:8px">
  <div style="font-size:42px;color:#FFD700;font-weight:bold">${roll.total}</div>
  <div style="color:#52FF89;font-size:13px">Cone ${sel.cone}</div>
</div>
<div style="background:rgba(0,217,255,0.1);padding:10px;border-left:4px solid #00D9FF;margin-top:10px">
  <strong style="color:#FF2B4A">TR CORPO CD ${CD}</strong><br>
  <span style="color:#FF2B4A">Falha: ${roll.total} dano + CONGELADO (Imóvel 1t)</span><br>
  <span style="color:#FFD700">Sucesso: ${Math.floor(roll.total/2)} dano + Hipotermia</span>
</div>
<div style="background:rgba(82,255,137,0.08);padding:8px;margin-top:8px;border-radius:6px">
  <strong style="color:${cfg.cor}">��� Terreno de Gelo:</strong> 3 rodadas na área<br>
</div>
<div style="background:rgba(82,255,137,0.06);border:1px solid ${cfg.cor};padding:8px;margin-top:8px;font-size:11px;border-radius:6px">
  <strong style="color:${cfg.cor}">❄️ Cristais: ${cris}/5</strong> | CD ${CD}
</div></div>`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
if(game.modules.get("sequencer")?.active&&canvas.tokens.controlled[0])
  new Sequence().effect().file("jb2a.ice_spikes.cone.blue").atLocation(canvas.tokens.controlled[0]).scale(2).duration(3000).play().catch(()=>{});
ui.notifications.warn(`❄️ AVALANCHE: ${roll.total} | Cone ${sel.cone}`);
})();
