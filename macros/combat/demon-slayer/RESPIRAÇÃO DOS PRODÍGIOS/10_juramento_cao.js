(async()=>{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("‚ùå Token!");
const prod=actor.system.props?.prodigios?.value??0;
const bonusDano=Math.floor(prod/10),bonusAcerto=Math.floor(prod/20);
const armasAtivas=prod>=100?"4 Fam√≠lias":prod>=60?"3 Fam√≠lias":prod>=30?"2 Fam√≠lias":"1 Fam√≠lia";
const cfg={nome:"D√©cima Forma: Juramento Celeste do C√£o",jp:"J≈´ no Kata ‚Äî Inu no Chikai",tipo:"Rea√ß√£o",cor:"#6F3A9C",animal:"Ì∞ï C√ÉO (Cutelos)",niveis:[{n:1,def:"Intercepta",c:3},{n:2,def:"Intercepta",c:4},{n:3,def:"Intercepta",c:5},{n:4,def:"Intercepta",c:6}]};
const lvl=await new Promise(r=>{new Dialog({title:"‚ö° Rea√ß√£o Leal",content:`<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"><h2 style="color:${cfg.cor}">${cfg.nome}</h2>${cfg.niveis.map(n=>`<p style="color:#fff">Nv${n.n}: Intercepta aliado | ${n.c}PC</p>`).join('')}<p style="color:#00D9FF;font-size:12px">Ìª°Ô∏è Voc√™ absorve o golpe com 50% dano</p></div>`,buttons:{n1:{label:"Nv1",callback:()=>r(0)},n2:{label:"Nv2",callback:()=>r(1)},n3:{label:"Nv3",callback:()=>r(2)},n4:{label:"Nv4",callback:()=>r(3)}}}).render(!0)});
const sel=cfg.niveis[lvl],pc=actor.system.props?.pc?.value??0;
if(pc<sel.c)return ui.notifications.error("‚ùå PC!");
// Ganho +2 por Rea√ß√£o
const novoProd=Math.min(prod+2,999);
await actor.update({"system.props.pc.value":pc-sel.c,"system.props.prodigios.value":novoProd});
const chat=`<div style="background:linear-gradient(135deg,#0a0a0f,#1a1a2e);border:2px solid ${cfg.cor};border-radius:12px;padding:15px">
<h2 style="color:${cfg.cor};text-align:center">‚ö° ${cfg.nome}</h2><p style="color:#aaa;text-align:center">${cfg.jp}</p>
<div style="background:rgba(0,217,255,0.15);padding:15px;text-align:center;border-radius:8px">
  <div style="font-size:36px;color:#00D9FF;font-weight:bold">Ìª°Ô∏è INTERCEPT</div>
  <div style="color:#aaa;font-size:14px">Aliado (3m) protegido ‚Äî voc√™ absorve 50% dano</div>
</div>
<div style="background:rgba(111,58,156,0.2);padding:8px;border-left:3px solid ${cfg.cor};margin-top:10px">
  <strong style="color:#A855F7">${cfg.animal}</strong> ‚Äî Apara golpes de aliados adjacentes
</div>
<div style="background:rgba(168,85,247,0.1);border:1px solid #A855F7;padding:8px;margin-top:10px;font-size:11px;border-radius:6px">
  <strong style="color:#A855F7">ÌºÄ Mandala: ${novoProd} Prod√≠gios (+2 Rea√ß√£o)</strong><br>
  <span style="color:#aaa">+${bonusDano} Dano | +${bonusAcerto} Acerto | ${armasAtivas}</span>
</div></div>`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
ui.notifications.info("Ìª°Ô∏è Juramento ativo!");
})();
