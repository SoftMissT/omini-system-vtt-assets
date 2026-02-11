(async()=>{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");

// ── PASSIVA: MANDALA DOS DOZE ESPÍRITOS (hardcoded) ──
const prod=actor.system.props?.prodigios?.value??0;
const bonusDano=Math.floor(prod/10);
const bonusAcerto=Math.floor(prod/20);
const armasAtivas=prod>=100?"4 Famílias":prod>=60?"3 Famílias":prod>=30?"2 Famílias":"1 Família";

const cfg={nome:"Primeira Forma: Corrida do Rato",jp:"Ichi no Kata — Nezumi no Shissō",tipo:"Padrão",cor:"#6F3A9C",animal:"��� RATO (Rapieira)",niveis:[{n:1,d:"1d6",c:2},{n:2,d:"1d8",c:3},{n:3,d:"1d10",c:4},{n:4,d:"2d6",c:5}]};

const lvl=await new Promise(r=>{new Dialog({title:"⚡ Nível",content:`
<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor};border-radius:8px">
  <h2 style="color:${cfg.cor};text-align:center">${cfg.nome}</h2>
  <p style="color:#aaa;text-align:center;font-style:italic">${cfg.jp}</p>
  ${cfg.niveis.map(n=>`<p style="color:#fff"><strong style="color:${cfg.cor}">Nv${n.n}:</strong> ${n.d}+COR | ${n.c}PC</p>`).join('')}
  <hr style="border-color:${cfg.cor}">
  <p style="color:#A855F7;font-size:12px"><strong>Prodígios:</strong> ${prod} | +${bonusDano} dano | +${bonusAcerto} acerto | ${armasAtivas}</p>
</div>`,
buttons:{n1:{label:"Nv1(2PC)",callback:()=>r(0)},n2:{label:"Nv2(3PC)",callback:()=>r(1)},n3:{label:"Nv3(4PC)",callback:()=>r(2)},n4:{label:"Nv4(5PC)",callback:()=>r(3)}}}).render(!0)});

const sel=cfg.niveis[lvl],pc=actor.system.props?.pc?.value??0;
if(pc<sel.c)return ui.notifications.error(`❌ PC: ${sel.c} | Tem: ${pc}`);

const corpo=actor.system.props?.corpo?.value??0;
const formula=`${sel.d}+${corpo}+${bonusDano}`;
const roll=await new Roll(formula).evaluate();
game.dice3d&&await game.dice3d.showForRoll(roll,game.user,!0);

// Ganho +5 Prodígios (ativar forma)
const novoProd=Math.min(prod+5,999);
await actor.update({"system.props.pc.value":pc-sel.c,"system.props.prodigios.value":novoProd});

const chat=`<div style="background:linear-gradient(135deg,#0a0a0f,#1a1a2e);border:2px solid ${cfg.cor};border-radius:12px;padding:15px;box-shadow:0 0 20px rgba(111,58,156,0.4)">
<h2 style="color:${cfg.cor};text-align:center;text-shadow:0 0 10px ${cfg.cor}">⚡ ${cfg.nome}</h2>
<p style="color:#aaa;text-align:center;font-style:italic">${cfg.jp}</p>
<div style="background:rgba(111,58,156,0.15);padding:12px;border-radius:8px;text-align:center;margin:10px 0">
  <div style="font-size:36px;color:#FFD700;font-weight:bold;text-shadow:0 0 10px #FFD700">${roll.total}</div>
  <div style="color:#aaa;font-size:12px">${formula}</div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0">
  <div style="background:rgba(255,215,0,0.1);padding:8px;border-radius:6px;text-align:center"><div style="color:#FFD700;font-size:11px">Tipo</div><div style="color:#fff;font-weight:bold">${cfg.tipo}</div></div>
  <div style="background:rgba(255,43,74,0.1);padding:8px;border-radius:6px;text-align:center"><div style="color:#FF2B4A;font-size:11px">Custo</div><div style="color:#fff;font-weight:bold">${sel.c} PC</div></div>
</div>
<div style="background:rgba(111,58,156,0.2);padding:8px;border-left:3px solid ${cfg.cor};margin-top:10px">
  <strong style="color:${cfg.cor}">⚡ Efeito:</strong> Se acertar, +1 Acerto até fim do próximo turno<br>
  <strong style="color:#A855F7">${cfg.animal}</strong> ativado — Ação Bônus extra após atacar
</div>
<div style="background:rgba(168,85,247,0.1);border:1px solid #A855F7;border-radius:6px;padding:8px;margin-top:10px;font-size:11px">
  <strong style="color:#A855F7">��� Mandala: ${novoProd} Prodígios</strong><br>
  <span style="color:#aaa">+${bonusDano} Dano | +${bonusAcerto} Acerto | ${armasAtivas} ativas</span>
</div>
</div>`;

await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
if(game.modules.get("sequencer")?.active&&canvas.tokens.controlled[0])
  new Sequence().effect().file("jb2a.magic_missile.purple").atLocation(canvas.tokens.controlled[0]).scale(0.6).duration(1000).play().catch(()=>{});
ui.notifications.info(`⚡ Corrida do Rato | Dano: ${roll.total} | Prodígios: ${novoProd}`);
})();
