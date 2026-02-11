(async()=>{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("‚ùå Token!");
const prod=actor.system.props?.prodigios?.value??0;
const bonusDano=Math.floor(prod/10),bonusAcerto=Math.floor(prod/20);
const armasAtivas=prod>=100?"4 Fam√≠lias":prod>=60?"3 Fam√≠lias":prod>=30?"2 Fam√≠lias":"1 Fam√≠lia";
const cfg={nome:"S√©tima Forma: Parede do Carneiro",jp:"Shichi no Kata ‚Äî Hitsuji no Kabe",tipo:"B√¥nus",cor:"#6F3A9C",animal:"Ì∞è CARNEIRO (Tonfas)",niveis:[{n:1,d:"1d8",c:3},{n:2,d:"1d10",c:4},{n:3,d:"2d8",c:5},{n:4,d:"2d10",c:6}]};
const lvl=await new Promise(r=>{new Dialog({title:"‚ö° Defesa Ofensiva",content:`<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"><h2 style="color:${cfg.cor}">${cfg.nome}</h2>${cfg.niveis.map(n=>`<p style="color:#fff">Nv${n.n}: ${n.d} | ${n.c}PC</p>`).join('')}<p style="color:#00D9FF;font-size:12px">Ìª°Ô∏è 50% dano at√© pr√≥x. turno</p></div>`,buttons:{n1:{label:"Nv1",callback:()=>r(0)},n2:{label:"Nv2",callback:()=>r(1)},n3:{label:"Nv3",callback:()=>r(2)},n4:{label:"Nv4",callback:()=>r(3)}}}).render(!0)});
const sel=cfg.niveis[lvl],pc=actor.system.props?.pc?.value??0;
if(pc<sel.c)return ui.notifications.error("‚ùå PC!");
const corpo=actor.system.props?.corpo?.value??0,formula=`${sel.d}+${corpo}+${bonusDano}`,roll=await new Roll(formula).evaluate();
game.dice3d&&await game.dice3d.showForRoll(roll,game.user,!0);
const novoProd=Math.min(prod+5,999);
await actor.update({"system.props.pc.value":pc-sel.c,"system.props.prodigios.value":novoProd});
const chat=`<div style="background:linear-gradient(135deg,#0a0a0f,#1a1a2e);border:2px solid ${cfg.cor};border-radius:12px;padding:15px">
<h2 style="color:${cfg.cor};text-align:center">‚ö° ${cfg.nome}</h2><p style="color:#aaa;text-align:center">${cfg.jp}</p>
<div style="background:rgba(111,58,156,0.15);padding:12px;text-align:center">
  <div style="font-size:36px;color:#FFD700;font-weight:bold">${roll.total}</div>
</div>
<div style="background:rgba(0,217,255,0.15);padding:8px;border-left:3px solid #00D9FF;margin-top:10px">
  <strong style="color:#00D9FF">Ìª°Ô∏è ESCUDO ATIVO:</strong> Recebe 50% dano at√© pr√≥x. turno<br>
  <strong style="color:#A855F7">${cfg.animal}</strong> ‚Äî +2 Def passiva | Vantagem vs derrubado
</div>
<div style="background:rgba(168,85,247,0.1);border:1px solid #A855F7;padding:8px;margin-top:10px;font-size:11px;border-radius:6px">
  <strong style="color:#A855F7">ÌºÄ Mandala: ${novoProd} Prod√≠gios</strong><br>
  <span style="color:#aaa">+${bonusDano} Dano | +${bonusAcerto} Acerto | ${armasAtivas}</span>
</div></div>`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
ui.notifications.info(`Ìª°Ô∏è Parede do Carneiro | ${roll.total}`);
})();
