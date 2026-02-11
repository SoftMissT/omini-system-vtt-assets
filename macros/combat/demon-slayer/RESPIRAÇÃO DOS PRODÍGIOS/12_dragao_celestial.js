(async()=>{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const prod=actor.system.props?.prodigios?.value??0;
const bonusDano=Math.floor(prod/10),bonusAcerto=Math.floor(prod/20);
const cfg={nome:"Décima Segunda Forma: Renascimento Celestial do Dragão",jp:"Jūni no Kata — Ryū no Saisei",tipo:"Completa",cor:"#6F3A9C",animal:"��� DRAGÃO (Woldo/Glaive)",niveis:[{n:1,d:"4d10",pc:8,mom:2},{n:2,d:"5d10",pc:9,mom:3},{n:3,d:"6d10",pc:10,mom:4},{n:4,d:"8d10",pc:12,mom:5}]};

const lvl=await new Promise(r=>{new Dialog({title:"⚡ FORMA SUPREMA",content:`
<div style="background:#0a0a0f;padding:20px;border:3px solid ${cfg.cor};border-radius:10px;box-shadow:0 0 30px rgba(111,58,156,0.5)">
  <h2 style="color:#FFD700;text-align:center;font-size:22px">��� ${cfg.nome}</h2>
  <p style="color:#aaa;text-align:center;font-style:italic">${cfg.jp}</p>
  <p style="color:#FF2B4A;text-align:center"><strong>⚠️ DANO ESPIRITUAL — Ignora Armadura</strong></p>
  ${cfg.niveis.map(n=>`<p style="color:#fff"><strong style="color:${cfg.cor}">Nv${n.n}:</strong> ${n.d} | ${n.pc}PC + ${n.mom}Mom</p>`).join('')}
  <hr style="border-color:${cfg.cor}">
  <p style="color:#A855F7;font-size:12px"><strong>⚠️ Após uso: Prodígios ZERAM para 0!</strong></p>
  <p style="color:#aaa;font-size:12px">Atual: ${prod} Prodígios (+${bonusDano}Dano/+${bonusAcerto}Acerto)</p>
</div>`,
buttons:{n1:{label:"Nv1 (8PC+2Mom)",callback:()=>r(0)},n2:{label:"Nv2 (9PC+3Mom)",callback:()=>r(1)},n3:{label:"Nv3 (10PC+4Mom)",callback:()=>r(2)},n4:{label:"Nv4 (12PC+5Mom)",callback:()=>r(3)}}}).render(!0)});

const sel=cfg.niveis[lvl];
const pc=actor.system.props?.pc?.value??0;
const mom=actor.system.props?.momentum?.value??0;
if(pc<sel.pc)return ui.notifications.error(`❌ PC: ${sel.pc} | Tem: ${pc}`);
if(mom<sel.mom)return ui.notifications.error(`❌ Momentum: ${sel.mom} | Tem: ${mom}`);

const confirma=await Dialog.confirm({title:"⚠️ RENASCIMENTO CELESTIAL",content:`<div style="background:#0a0a0f;padding:15px;border:2px solid #FFD700"><p style="color:#FF2B4A;font-size:18px;text-align:center"><strong>PRODÍGIOS ZERARÃO APÓS USO!</strong></p><p style="color:#aaa;text-align:center">Atual: ${prod} → 0</p></div>`});
if(!confirma)return;

const corpo=actor.system.props?.corpo?.value??0,formula=`${sel.d}+${corpo}+${bonusDano}`,roll=await new Roll(formula).evaluate();
game.dice3d&&await game.dice3d.showForRoll(roll,game.user,!0);

// Zera Prodígios após uso
await actor.update({"system.props.pc.value":pc-sel.pc,"system.props.momentum.value":mom-sel.mom,"system.props.prodigios.value":0});

const chat=`<div style="background:linear-gradient(135deg,#0a0a0f,#1a1a2e);border:4px solid #FFD700;border-radius:14px;padding:20px;box-shadow:0 0 50px rgba(255,215,0,0.4)">
<h2 style="color:#FFD700;text-align:center;text-shadow:0 0 20px #FFD700;font-size:26px">��� ${cfg.nome} ���</h2>
<p style="color:#aaa;text-align:center;font-style:italic;font-size:15px">${cfg.jp}</p>
<div style="background:rgba(255,215,0,0.15);padding:20px;border-radius:10px;text-align:center;margin:15px 0">
  <div style="font-size:54px;color:#FFD700;font-weight:bold;text-shadow:0 0 30px #FFD700">${roll.total}</div>
  <div style="color:#A855F7;font-size:16px;margin-top:8px">✨ DANO ESPIRITUAL — Ignora Armadura</div>
  <div style="color:#aaa;font-size:12px">${formula}</div>
</div>
<div style="background:rgba(111,58,156,0.3);padding:12px;border-left:5px solid ${cfg.cor};margin-top:10px">
  <strong style="color:${cfg.cor};font-size:15px">��� FUSÃO DE ARSENAL MÁXIMA</strong><br>
  <strong style="color:#A855F7">${cfg.animal}</strong> — Crítico/Abate recupera Movimento<br>
  Maximiza o dano do <strong>próximo ataque</strong>
</div>
<div style="background:rgba(255,43,74,0.2);padding:10px;margin-top:10px;border:2px solid #FF2B4A;border-radius:6px;text-align:center">
  <strong style="color:#FF2B4A;font-size:16px">⚠️ PRODÍGIOS ZERADOS (${prod} → 0)</strong>
</div></div>`;

await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
game.modules.get("sequencer")?.active&&canvas.tokens.controlled[0]&&new Sequence().effect().file("jb2a.divine_smite.dark_purple").atLocation(canvas.tokens.controlled[0]).scale(3).duration(4000).fadeIn(300).fadeOut(800).play().catch(()=>{});
ui.notifications.warn(`��� RENASCIMENTO DO DRAGÃO: ${roll.total} | Prodígios resetados!`);
})();
