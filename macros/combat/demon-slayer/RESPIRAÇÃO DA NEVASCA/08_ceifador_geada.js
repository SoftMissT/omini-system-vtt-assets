(async()=>{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
if(cris<1)return ui.notifications.error("❌ Requer ao menos 1 Cristal!");
const hipok=await Dialog.confirm({title:"Requisito",content:"<p>Alvo com <strong>Hipotermia</strong> ou <strong>Congelado</strong>?</p>"});
if(!hipok)return ui.notifications.warn("⚠️ Requer Hipotermia ou Congelamento!");
const cfg={nome:"Oitava Forma: Ceifador da Geada",jp:"Hachi no Kata: Shimo no Karite",tipo:"Ação Completa",cor:"#52FF89",niveis:[{n:1,d:"2d8",c:5},{n:2,d:"2d10",c:7},{n:3,d:"2x2d10",c:10},{n:4,d:"6x1d10",c:14}]};
const lvl=await new Promise(r=>{new Dialog({title:"❄️ EXECUÇÃO",content:`<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"><h2 style="color:${cfg.cor}">${cfg.nome}</h2>${cfg.niveis.map(n=>`<p style="color:#fff">Nv${n.n}: ${n.d} + ${cris}d8 (Cristais) | ${n.c}PC</p>`).join('')}<p style="color:#FF2B4A;font-size:12px">Consome TODOS os Cristais (${cris}×+1d8)</p><p style="color:#52FF89;font-size:11px">Abate → Explosão 2d6 raio 1.5m</p></div>`,buttons:{n1:{label:"Nv1",callback:()=>r(0)},n2:{label:"Nv2",callback:()=>r(1)},n3:{label:"Nv3",callback:()=>r(2)},n4:{label:"Nv4",callback:()=>r(3)}}}).render(!0)});
const sel=cfg.niveis[lvl],pc=actor.system.props?.pc?.value??0;
if(pc<sel.c)return ui.notifications.error("❌ PC!");
const corpo=actor.system.props?.corpo?.value??0;
// Rolagem base
let dBase=sel.d;
if(sel.d.includes('x')){dBase=sel.d.replace(/(\d+)x(\w+)/,(_,m,d)=>Array(parseInt(m)).fill(d).join('+'));}
const rollBase=await new Roll(`${dBase}+${corpo}`).evaluate();
game.dice3d&&await game.dice3d.showForRoll(rollBase,game.user,!0);
// Cristais extras (+1d8 each)
let bonusCrist=0;
for(let i=0;i<cris;i++){const rc=await new Roll("1d8").evaluate();bonusCrist+=rc.total;}
const total=rollBase.total+bonusCrist;
await actor.update({"system.props.pc.value":pc-sel.c,"system.props.cristais.value":0});
const chat=`<div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:3px solid ${cfg.cor};border-radius:12px;padding:15px;box-shadow:0 0 30px rgba(82,255,137,0.4)">
<h2 style="color:${cfg.cor};text-align:center;text-shadow:0 0 15px ${cfg.cor}">❄️ ${cfg.nome} ❄️</h2><p style="color:#aaa;text-align:center">${cfg.jp}</p>
<div style="background:rgba(82,255,137,0.1);padding:15px;text-align:center;border-radius:8px">
  <div style="font-size:44px;color:#FFD700;font-weight:bold;text-shadow:0 0 20px #FFD700">${total}</div>
  <div style="color:#52FF89;font-size:13px">Base: ${rollBase.total} + Cristais: ${bonusCrist} (${cris}×1d8)</div>
</div>
<div style="background:rgba(82,255,137,0.1);padding:8px;border-left:4px solid ${cfg.cor};margin-top:10px">
  <strong style="color:${cfg.cor}">❄️ Cristais consumidos:</strong> ${cris} → 0<br>
  <strong style="color:#FF2B4A">��� Abate → Explosão 2d6</strong> em raio 1.5m
</div>
<div style="background:rgba(255,43,74,0.1);border:1px solid #FF2B4A;padding:8px;margin-top:8px;border-radius:6px;font-size:11px">
  <strong style="color:#FF2B4A">Cristais: 0/5</strong> (consumidos pelo golpe)
</div></div>`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
if(game.modules.get("sequencer")?.active&&canvas.tokens.controlled[0])
  new Sequence().effect().file("jb2a.ice_spikes.single.blue").atLocation(canvas.tokens.controlled[0]).scale(2.5).duration(2500).play().catch(()=>{});
ui.notifications.warn(`❄️ CEIFADOR: ${total} | Cristais zerados!`);
})();
