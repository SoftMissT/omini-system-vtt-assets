(async()=>{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("‚ùå Token!");
const prod=actor.system.props?.prodigios?.value??0;
const bonusDano=Math.floor(prod/10),bonusAcerto=Math.floor(prod/20);
const armasAtivas=prod>=100?"4 Fam√≠lias":prod>=60?"3 Fam√≠lias":prod>=30?"2 Fam√≠lias":"1 Fam√≠lia";
const cfg={nome:"D√©cima Primeira Forma: Tempestade do Javali",jp:"J≈´ichi no Kata ‚Äî Inoshishi no Arashi",tipo:"Completa",cor:"#6F3A9C",animal:"Ì∞ó JAVALI (Katana Serrilhada)",niveis:[{n:1,d:"3x1d8",c:5},{n:2,d:"3x1d10",c:6},{n:3,d:"3x1d12",c:7},{n:4,d:"3x2d8",c:8}]};
const lvl=await new Promise(r=>{new Dialog({title:"‚ö° Rodopio Devastador",content:`<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"><h2 style="color:${cfg.cor}">${cfg.nome}</h2>${cfg.niveis.map(n=>`<p style="color:#fff">Nv${n.n}: ${n.d} √°rea 3m | ${n.c}PC</p>`).join('')}<p style="color:#FF2B4A;font-size:12px">Ìπ∏ TR COR CD 15 ou Sangramento 2d4√ó3t</p></div>`,buttons:{n1:{label:"Nv1",callback:()=>r(0)},n2:{label:"Nv2",callback:()=>r(1)},n3:{label:"Nv3",callback:()=>r(2)},n4:{label:"Nv4",callback:()=>r(3)}}}).render(!0)});
const sel=cfg.niveis[lvl],pc=actor.system.props?.pc?.value??0;
if(pc<sel.c)return ui.notifications.error("‚ùå PC!");
const corpo=actor.system.props?.corpo?.value??0;
const dadoBase=sel.d.includes('2d8')?`2d8`:`1d${sel.d.includes('d12')?12:sel.d.includes('d10')?10:8}`;
const r1=await new Roll(`${dadoBase}+${corpo}+${bonusDano}`).evaluate();
const r2=await new Roll(`${dadoBase}+${corpo}+${bonusDano}`).evaluate();
const r3=await new Roll(`${dadoBase}+${corpo}+${bonusDano}`).evaluate();
game.dice3d&&(await game.dice3d.showForRoll(r1,game.user,!0),await game.dice3d.showForRoll(r2,game.user,!0),await game.dice3d.showForRoll(r3,game.user,!0));
const total=r1.total+r2.total+r3.total;
// +10 por combo 3 hits
const novoProd=Math.min(prod+10,999);
await actor.update({"system.props.pc.value":pc-sel.c,"system.props.prodigios.value":novoProd});
const novoBonus=Math.floor(novoProd/10),novoAcerto=Math.floor(novoProd/20);
const chat=`<div style="background:linear-gradient(135deg,#0a0a0f,#1a1a2e);border:2px solid ${cfg.cor};border-radius:12px;padding:15px;box-shadow:0 0 25px rgba(111,58,156,0.5)">
<h2 style="color:${cfg.cor};text-align:center">‚ö° ${cfg.nome}</h2><p style="color:#aaa;text-align:center">${cfg.jp}</p>
<div style="background:rgba(111,58,156,0.15);padding:12px;text-align:center">
  <div style="font-size:42px;color:#FFD700;font-weight:bold;text-shadow:0 0 15px #FFD700">${total}</div>
  <div style="color:#aaa;font-size:12px">${r1.total}+${r2.total}+${r3.total}</div>
</div>
<div style="background:rgba(255,43,74,0.2);padding:8px;border-left:4px solid #FF2B4A;margin-top:10px">
  <strong style="color:#FF2B4A">Ìπ∏ SANGRAMENTO</strong> ‚Äî TR COR CD 15 ou 2d4/turno √ó 3 turnos<br>
  <strong style="color:#A855F7">${cfg.animal}</strong> ‚Äî +4 dano vs alvos j√° sangrando
</div>
<div style="background:rgba(168,85,247,0.15);border:2px solid #A855F7;padding:10px;margin-top:10px;border-radius:6px">
  <strong style="color:#FFD700">‚ö° +10 Prod√≠gios (Combo 3 hits!)</strong><br>
  <strong style="color:#A855F7">ÌºÄ Mandala: ${novoProd} Prod√≠gios</strong><br>
  <span style="color:#aaa">+${novoBonus} Dano | +${novoAcerto} Acerto | ${novoProd>=100?"4 Fam√≠lias":novoProd>=60?"3 Fam√≠lias":novoProd>=30?"2 Fam√≠lias":"1 Fam√≠lia"}</span>
</div></div>`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
game.modules.get("sequencer")?.active&&canvas.tokens.controlled[0]&&new Sequence().effect().file("jb2a.spinning_blades.dark_purple").atLocation(canvas.tokens.controlled[0]).scale(1.5).duration(2500).play().catch(()=>{});
ui.notifications.info(`Ì∞ó Tempestade: ${total} | Prod: ${novoProd}`);
})();
