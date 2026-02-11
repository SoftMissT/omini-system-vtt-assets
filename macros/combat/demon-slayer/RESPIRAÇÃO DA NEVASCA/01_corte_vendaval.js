(async()=>{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
// ── PASSIVA: DANÇA DAS LÂMINAS DE GEADA ──
const cris=actor.system.props?.cristais?.value??0;
const esp=actor.system.props?.espirito?.value??0;
const nivel=actor.system.props?.nivel?.value??1;
const CD=10+Math.floor(nivel/2)+esp;
const estCris=cris>=5?"⚡ OLHO DA TEMPESTADE":cris>=4?"��� Valsa Cortante":cris>=2?"��� Passo Gélido":"��� Acumulando";
const cfg={nome:"Primeira Forma: Corte de Vendaval Gelado",jp:"Ichi no Kata: Hyofu Giri",tipo:"Ação Padrão",cor:"#52FF89",niveis:[{n:1,d:"1d8",c:2},{n:2,d:"1d10",c:3},{n:3,d:"1d12",c:4},{n:4,d:"2d8",c:6}]};
const lvl=await new Promise(r=>{new Dialog({title:"❄️ Nível",content:`
<div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor};border-radius:8px">
  <h2 style="color:${cfg.cor};text-align:center">${cfg.nome}</h2>
  <p style="color:#aaa;text-align:center;font-style:italic">${cfg.jp}</p>
  ${cfg.niveis.map(n=>`<p style="color:#fff"><strong style="color:${cfg.cor}">Nv${n.n}:</strong> ${n.d} Frio | ${n.c}PC</p>`).join('')}
  <hr style="border-color:${cfg.cor}">
  <p style="color:#52FF89;font-size:12px"><strong>Cristais:</strong> ${cris}/5 | ${estCris} | CD ${CD}</p>
  <p style="color:#aaa;font-size:11px">+ESP Dano vs Hipotermia | Crítico = Congelamento</p>
</div>`,
buttons:{n1:{label:"Nv1(2PC)",callback:()=>r(0)},n2:{label:"Nv2(3PC)",callback:()=>r(1)},n3:{label:"Nv3(4PC)",callback:()=>r(2)},n4:{label:"Nv4(6PC)",callback:()=>r(3)}}}).render(!0)});
const sel=cfg.niveis[lvl],pc=actor.system.props?.pc?.value??0;
if(pc<sel.c)return ui.notifications.error(`❌ PC: ${sel.c}|Tem: ${pc}`);

// Pergunta se houve movimento 3m+ (bônus Patinação Ofensiva)
const patinou=await Dialog.confirm({title:"Patinação Ofensiva?",content:"<p>Percorreu pelo menos 3m antes do ataque?</p>"});
// Pergunta se alvo tem Hipotermia (bônus Cristalizar)
const hipotermia=await Dialog.confirm({title:"Alvo com Hipotermia?",content:"<p>O alvo está sob efeito de Hipotermia?</p>"});

const corpo=actor.system.props?.corpo?.value??0;
const bonusCrist=hipotermia?(cris>=5?`${esp}+1d6`:String(esp)):0;
const formula=`${sel.d}+${corpo}${hipotermia?`+${bonusCrist}`:''}`;
const roll=await new Roll(formula).evaluate();
game.dice3d&&await game.dice3d.showForRoll(roll,game.user,!0);

// Ganho de cristal se acertou alvo com Hipotermia
let novoCris=cris;
if(hipotermia&&cris<5){novoCris=cris+1;}
await actor.update({"system.props.pc.value":pc-sel.c,"system.props.cristais.value":novoCris});

const chat=`<div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:2px solid ${cfg.cor};border-radius:12px;padding:15px;box-shadow:0 0 20px rgba(82,255,137,0.25)">
<h2 style="color:${cfg.cor};text-align:center;text-shadow:0 0 10px ${cfg.cor}">❄️ ${cfg.nome}</h2>
<p style="color:#aaa;text-align:center;font-style:italic">${cfg.jp}</p>
<div style="background:rgba(82,255,137,0.08);padding:12px;border-radius:8px;text-align:center;margin:10px 0">
  <div style="font-size:36px;color:#FFD700;font-weight:bold;text-shadow:0 0 10px #FFD700">${roll.total}</div>
  <div style="color:#52FF89;font-size:12px">${formula} | Frio${hipotermia?' + Cristalizar':''}</div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0">
  <div style="background:rgba(255,215,0,0.08);padding:6px;border-radius:5px;text-align:center"><div style="color:#FFD700;font-size:11px">Tipo</div><div style="color:#fff;font-size:13px">${cfg.tipo}</div></div>
  <div style="background:rgba(255,43,74,0.08);padding:6px;border-radius:5px;text-align:center"><div style="color:#FF2B4A;font-size:11px">Custo</div><div style="color:#fff;font-size:13px">${sel.c} PC</div></div>
</div>
${patinou?`<div style="background:rgba(82,255,137,0.1);padding:7px;border-left:3px solid ${cfg.cor};margin-top:8px"><strong style="color:${cfg.cor}">⚡ Patinação: +2 Acerto</strong></div>`:''}
<div style="background:rgba(82,255,137,0.1);padding:7px;border-left:3px solid ${cfg.cor};margin-top:8px">
  <strong style="color:${cfg.cor}">���️ Nevoeiro:</strong> Cristais nos olhos = Cegueira Parcial 1 turno<br>
  <strong style="color:#aaa">Hipotermia:</strong> Alvo -3m deslocamento 1 rodada
</div>
<div style="background:rgba(82,255,137,0.06);border:1px solid ${cfg.cor};border-radius:6px;padding:8px;margin-top:8px;font-size:11px">
  <strong style="color:${cfg.cor}">❄️ Cristais: ${novoCris}/5</strong> ${hipotermia&&novoCris>cris?'<span style="color:#FFD700">(+1!)</span>':''} | ${estCris}<br>
  <span style="color:#aaa">CD ${CD} | 2+:+1.5m | 4+:1d6 passagem | 5: Rajada</span>
</div>
</div>`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
if(game.modules.get("sequencer")?.active&&canvas.tokens.controlled[0])
  new Sequence().effect().file("jb2a.ice_spikes.single.blue").atLocation(canvas.tokens.controlled[0]).scale(0.8).duration(1200).play().catch(()=>{});
ui.notifications.info(`❄️ Vendaval: ${roll.total} | Cristais: ${novoCris}/5`);
})();
