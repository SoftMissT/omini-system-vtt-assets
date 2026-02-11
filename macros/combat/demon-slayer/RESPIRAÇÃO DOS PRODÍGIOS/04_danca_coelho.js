(async()=>{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const prod=actor.system.props?.prodigios?.value??0;
const bonusDano=Math.floor(prod/10),bonusAcerto=Math.floor(prod/20);
const armasAtivas=prod>=100?"4 Famílias":prod>=60?"3 Famílias":prod>=30?"2 Famílias":"1 Família";
const cfg={nome:"Quarta Forma: Dança Lunar do Coelho",jp:"Shi no Kata — Usagi no Tsuki Odori",tipo:"Padrão",cor:"#6F3A9C",animal:"��� COELHO (Chakram)",niveis:[{n:1,d:"1d10",c:3},{n:2,d:"2d6",c:3},{n:3,d:"2d8",c:4},{n:4,d:"2d10",c:5}]};
const lvl=await new Promise(r=>{new Dialog({title:"⚡",content:`<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"><h2 style="color:${cfg.cor}">${cfg.nome}</h2>${cfg.niveis.map(n=>`<p style="color:#fff">Nv${n.n}: ${n.d} | ${n.c}PC</p>`).join('')}<p style="color:#FFD700;font-size:12px">⚡ Posição elevada = +1 dado extra!</p><p style="color:#A855F7;font-size:12px">Prodígios: ${prod}</p></div>`,buttons:{n1:{label:"Nv1",callback:()=>r(0)},n2:{label:"Nv2",callback:()=>r(1)},n3:{label:"Nv3",callback:()=>r(2)},n4:{label:"Nv4",callback:()=>r(3)}}}).render(!0)});
const sel=cfg.niveis[lvl],pc=actor.system.props?.pc?.value??0;
if(pc<sel.c)return ui.notifications.error("❌ PC!");
const elevado=await Dialog.confirm({title:"Posição Elevada?",content:"<p>Saltando de plataforma/altura?</p>"});
const corpo=actor.system.props?.corpo?.value??0;
const dadoExtra=elevado?(lvl>=3?`+2${sel.d.slice(sel.d.indexOf('d'))}`:`+${sel.d.slice(sel.d.indexOf('d'))}`):'+0';
const formula=`${sel.d}+${corpo}+${bonusDano}${elevado?dadoExtra:''}`;
const roll=await new Roll(formula).evaluate();
game.dice3d&&await game.dice3d.showForRoll(roll,game.user,!0);
const novoProd=Math.min(prod+5,999);
await actor.update({"system.props.pc.value":pc-sel.c,"system.props.prodigios.value":novoProd});
const chat=`<div style="background:linear-gradient(135deg,#0a0a0f,#1a1a2e);border:2px solid ${cfg.cor};border-radius:12px;padding:15px">
<h2 style="color:${cfg.cor};text-align:center">⚡ ${cfg.nome}</h2><p style="color:#aaa;text-align:center">${cfg.jp}</p>
<div style="background:rgba(111,58,156,0.15);padding:12px;text-align:center">
  <div style="font-size:36px;color:#FFD700;font-weight:bold">${roll.total}</div>
  ${elevado?'<div style="color:#00D9FF;font-size:14px">��� QUEDA LUNAR +dano extra</div>':''}
</div>
<div style="background:rgba(111,58,156,0.2);padding:8px;border-left:3px solid ${cfg.cor};margin-top:10px">
  <strong style="color:#A855F7">${cfg.animal}</strong> — Alcance 9m com retorno<br>
  <strong style="color:${cfg.cor}">⚡ Elevado:</strong> +${lvl>=3?2:1} dado de dano extra
</div>
<div style="background:rgba(168,85,247,0.1);border:1px solid #A855F7;padding:8px;margin-top:10px;font-size:11px;border-radius:6px">
  <strong style="color:#A855F7">��� Mandala: ${novoProd} Prodígios</strong><br>
  <span style="color:#aaa">+${bonusDano} Dano | +${bonusAcerto} Acerto | ${armasAtivas}</span>
</div></div>`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
ui.notifications.info(`⚡ ${roll.total}`);
})();
