(async()=>{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
const cfg={nome:"Quinta Forma: Dança da Lua e Gelo",jp:"Go no Kata: Gekphyo no Mai",tipo:"Ação Bônus",cor:"#52FF89",niveis:[{n:1,d:"1d6",c:5},{n:2,d:"1d8",c:7},{n:3,d:"1d10",c:9},{n:4,d:"1d12",c:12}]};
const lvl=await new Promise(r=>{new Dialog({title:"❄️ 3 Cortes",content:`<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"><h2 style="color:${cfg.cor}">${cfg.nome}</h2>${cfg.niveis.map(n=>`<p style="color:#fff">Nv${n.n}: 3×${n.d} | ${n.c}PC</p>`).join('')}<p style="color:#52FF89;font-size:12px">Acerto +2 = Flutuação (Imóvel)</p><p style="color:#FFD700;font-size:11px">Fluxo: Corrida do Luar disponível após</p></div>`,buttons:{n1:{label:"Nv1",callback:()=>r(0)},n2:{label:"Nv2",callback:()=>r(1)},n3:{label:"Nv3",callback:()=>r(2)},n4:{label:"Nv4",callback:()=>r(3)}}}).render(!0)});
const sel=cfg.niveis[lvl],pc=actor.system.props?.pc?.value??0;
if(pc<sel.c)return ui.notifications.error("❌ PC!");
const corpo=actor.system.props?.corpo?.value??0,f=`${sel.d}+${corpo}`;
const r1=await new Roll(f).evaluate(),r2=await new Roll(f).evaluate(),r3=await new Roll(f).evaluate();
game.dice3d&&(await game.dice3d.showForRoll(r1,game.user,!0),await game.dice3d.showForRoll(r2,game.user,!0),await game.dice3d.showForRoll(r3,game.user,!0));
const total=r1.total+r2.total+r3.total;
await actor.update({"system.props.pc.value":pc-sel.c});

// FLUXO: CORRIDA DO LUAR
const fluxo=cris>=2?await Dialog.confirm({title:"⚡ FLUXO: CORRIDA DO LUAR?",content:`<div style="background:#0a0a0f;padding:10px;border:2px solid #FFD700"><strong style="color:#FFD700">FLUXO: CORRIDA DO LUAR</strong><br><span style="color:#aaa">Gasta 2 Cristais — Dash 3m + 1d10 Frio passagem</span></div>`}):false;
let fluxoMsg='';
if(fluxo){
  const dashRoll=await new Roll("1d10").evaluate();
  game.dice3d&&await game.dice3d.showForRoll(dashRoll,game.user,!0);
  const novoCris=Math.max(cris-2,0);
  await actor.update({"system.props.cristais.value":novoCris});
  fluxoMsg=`<div style="background:rgba(255,215,0,0.15);padding:8px;border-left:3px solid #FFD700;margin-top:8px"><strong style="color:#FFD700">��� CORRIDA DO LUAR!</strong><br><span style="color:#52FF89">Dash 3m | ${dashRoll.total} Dano Frio na passagem | -2 Cristais</span></div>`;
}
const chat=`<div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:2px solid ${cfg.cor};border-radius:12px;padding:15px">
<h2 style="color:${cfg.cor};text-align:center">❄️ ${cfg.nome}</h2><p style="color:#aaa;text-align:center">${cfg.jp}</p>
<div style="background:rgba(82,255,137,0.08);padding:12px;text-align:center;border-radius:8px">
  <div style="font-size:36px;color:#FFD700;font-weight:bold">${total}</div>
  <div style="color:#aaa;font-size:12px">${r1.total} + ${r2.total} + ${r3.total}</div>
</div>
<div style="background:rgba(82,255,137,0.1);padding:8px;border-left:3px solid ${cfg.cor};margin-top:8px">
  <strong style="color:${cfg.cor}">��� Flutuação:</strong> Acerto +2 = Flutuando (Impedido agir/mover)
</div>
${fluxoMsg}
<div style="background:rgba(82,255,137,0.06);border:1px solid ${cfg.cor};padding:8px;margin-top:8px;font-size:11px;border-radius:6px">
  <strong style="color:${cfg.cor}">❄️ Cristais: ${fluxo?Math.max(cris-2,0):cris}/5</strong>
</div></div>`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
ui.notifications.info(`❄️ Dança: ${total}`);
})();
