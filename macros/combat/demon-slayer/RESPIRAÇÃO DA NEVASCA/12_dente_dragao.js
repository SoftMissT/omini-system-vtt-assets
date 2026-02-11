(async()=>{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
const cfg={nome:"Décima Segunda Forma: Dente do Dragão",jp:"Ju Ni no Kata: Ryuto",tipo:"Ação Padrão",cor:"#52FF89",niveis:[{n:1,d:"1d4",c:2},{n:2,d:"1d8",c:6},{n:3,d:"1d10",c:8},{n:4,d:"1d12",c:10}]};
const lvl=await new Promise(r=>{new Dialog({title:"❄️ Estocada Perfeita",content:`<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"><h2 style="color:${cfg.cor}">${cfg.nome}</h2>${cfg.niveis.map(n=>`<p style="color:#fff">Nv${n.n}: ${n.d} | ${n.c}PC | Alcance 6m</p>`).join('')}<p style="color:#FFD700;font-size:12px">Crítico 18-20 → Silenciado 1 turno</p><p style="color:#52FF89;font-size:12px">Vantagem contra Bloqueio | Cristais: ${cris}/5</p></div>`,buttons:{n1:{label:"Nv1",callback:()=>r(0)},n2:{label:"Nv2",callback:()=>r(1)},n3:{label:"Nv3",callback:()=>r(2)},n4:{label:"Nv4",callback:()=>r(3)}}}).render(!0)});
const sel=cfg.niveis[lvl],pc=actor.system.props?.pc?.value??0;
if(pc<sel.c)return ui.notifications.error("❌ PC!");
const corpo=actor.system.props?.corpo?.value??0,formula=`${sel.d}+${corpo}`,roll=await new Roll(formula).evaluate();
game.dice3d&&await game.dice3d.showForRoll(roll,game.user,!0);
// Verifica crítico 18-20
const dadoResult=roll.terms[0]?.results?.[0]?.result??0;
const eCritico=dadoResult>=18;
await actor.update({"system.props.pc.value":pc-sel.c});
const chat=`<div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:2px solid ${cfg.cor};border-radius:12px;padding:15px">
<h2 style="color:${cfg.cor};text-align:center">❄️ ${cfg.nome}</h2><p style="color:#aaa;text-align:center">${cfg.jp}</p>
<div style="background:rgba(82,255,137,0.08);padding:12px;text-align:center;border-radius:8px">
  <div style="font-size:36px;color:#FFD700;font-weight:bold">${roll.total}</div>
  <div style="color:#52FF89;font-size:12px">Alcance 6m | Perfurante</div>
</div>
${eCritico?`<div style="background:rgba(255,215,0,0.2);padding:8px;text-align:center;margin-top:8px;border:2px solid #FFD700;border-radius:6px"><strong style="color:#FFD700;font-size:16px">⚡ CRÍTICO! (${dadoResult}) → SILENCIADO 1 turno</strong></div>`:''}
<div style="background:rgba(82,255,137,0.1);padding:8px;border-left:3px solid ${cfg.cor};margin-top:8px">
  <strong style="color:${cfg.cor}">���️ Quebra-Guarda:</strong> Vantagem contra Bloqueio<br>
  <strong style="color:#FFD700">Crítico 18-20:</strong> Silenciado (sem respirações/cânticos)
</div>
<div style="background:rgba(82,255,137,0.06);border:1px solid ${cfg.cor};padding:8px;margin-top:8px;font-size:11px;border-radius:6px">
  <strong style="color:${cfg.cor}">❄️ Cristais: ${cris}/5</strong>
</div></div>`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
ui.notifications.info(`❄️ Dente do Dragão: ${roll.total}${eCritico?' | ⚡ CRÍTICO!':''}`);
})();
