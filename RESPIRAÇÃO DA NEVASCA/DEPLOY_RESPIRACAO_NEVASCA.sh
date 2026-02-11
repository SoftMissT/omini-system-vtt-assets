#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# RESPIRAÇÃO DA NEVASCA — DEPLOYMENT COMPLETO
# MAKO-SYN05 THE HEPTAGON | 15 Formas + Sistema Cristais (0-5)
# Cor: #52FF89 | Yeonhwa Jung
# ═══════════════════════════════════════════════════════════════

echo "❄️ ═══════════════════════════════════════════════════════════════"
echo "❄️ RESPIRAÇÃO DA NEVASCA — DEPLOYMENT COMPLETO"
echo "❄️ 15 Formas + 2 Fluxos + Sistema Cristais de Gelo"
echo "❄️ ═══════════════════════════════════════════════════════════════"

mkdir -p macros

# ─────────────────────────────────────────────────────────────
# PASSIVA HARDCODED: DANÇA DAS LÂMINAS DE GEADA
# ─────────────────────────────────────────────────────────────
# cristais: actor.system.props.cristais.value (0-5)
# CD = 10 + Math.floor(nivel/2) + espirito
# Hipotermia: -3m mov por 1 rodada
# Cristalizar: +ESP dano vs alvos com Hipotermia
# Crítico = Congelamento Parcial (Imóvel) + Cristalizar maximizado
# 2 cristais: +1.5m mov, Imune AO de alvos c/ Hipotermia
# 4 cristais: 1d6 Frio ao atravessar inimigo
# 5 cristais: Rajada da Nevasca (3 ataques, dobra mov)
# Ganho +1: Acertar c/ Hipotermia | Esquiva/Bloq ok | Mover 4.5m longe
# Perda: -2 Fogo | -3 Agarrado | Zera: Atordoado/Inconsciente
# ─────────────────────────────────────────────────────────────

# ═══════════════════════════════════════════════════════════════
# 01 — CORTE DE VENDAVAL GELADO
# ═══════════════════════════════════════════════════════════════
cat &gt; "macros/01_corte_vendaval.js" &lt;&lt; 'EOF'
(async()=&gt;{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
// ── PASSIVA: DANÇA DAS LÂMINAS DE GEADA ──
const cris=actor.system.props?.cristais?.value??0;
const esp=actor.system.props?.espirito?.value??0;
const nivel=actor.system.props?.nivel?.value??1;
const CD=10+Math.floor(nivel/2)+esp;
const estCris=cris&gt;=5?"⚡ OLHO DA TEMPESTADE":cris&gt;=4?"💎 Valsa Cortante":cris&gt;=2?"🌀 Passo Gélido":"🔵 Acumulando";
const cfg={nome:"Primeira Forma: Corte de Vendaval Gelado",jp:"Ichi no Kata: Hyofu Giri",tipo:"Ação Padrão",cor:"#52FF89",niveis:[{n:1,d:"1d8",c:2},{n:2,d:"1d10",c:3},{n:3,d:"1d12",c:4},{n:4,d:"2d8",c:6}]};
const lvl=await new Promise(r=&gt;{new Dialog({title:"❄️ Nível",content:`
&lt;div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor};border-radius:8px"&gt;
  &lt;h2 style="color:${cfg.cor};text-align:center"&gt;${cfg.nome}&lt;/h2&gt;
  &lt;p style="color:#aaa;text-align:center;font-style:italic"&gt;${cfg.jp}&lt;/p&gt;
  ${cfg.niveis.map(n=&gt;`&lt;p style="color:#fff"&gt;&lt;strong style="color:${cfg.cor}"&gt;Nv${n.n}:&lt;/strong&gt; ${n.d} Frio | ${n.c}PC&lt;/p&gt;`).join('')}
  &lt;hr style="border-color:${cfg.cor}"&gt;
  &lt;p style="color:#52FF89;font-size:12px"&gt;&lt;strong&gt;Cristais:&lt;/strong&gt; ${cris}/5 | ${estCris} | CD ${CD}&lt;/p&gt;
  &lt;p style="color:#aaa;font-size:11px"&gt;+ESP Dano vs Hipotermia | Crítico = Congelamento&lt;/p&gt;
&lt;/div&gt;`,
buttons:{n1:{label:"Nv1(2PC)",callback:()=&gt;r(0)},n2:{label:"Nv2(3PC)",callback:()=&gt;r(1)},n3:{label:"Nv3(4PC)",callback:()=&gt;r(2)},n4:{label:"Nv4(6PC)",callback:()=&gt;r(3)}}}).render(!0)});
const sel=cfg.niveis[lvl],pc=actor.system.props?.pc?.value??0;
if(pc&lt;sel.c)return ui.notifications.error(`❌ PC: ${sel.c}|Tem: ${pc}`);

// Pergunta se houve movimento 3m+ (bônus Patinação Ofensiva)
const patinou=await Dialog.confirm({title:"Patinação Ofensiva?",content:"&lt;p&gt;Percorreu pelo menos 3m antes do ataque?&lt;/p&gt;"});
// Pergunta se alvo tem Hipotermia (bônus Cristalizar)
const hipotermia=await Dialog.confirm({title:"Alvo com Hipotermia?",content:"&lt;p&gt;O alvo está sob efeito de Hipotermia?&lt;/p&gt;"});

const corpo=actor.system.props?.corpo?.value??0;
const bonusCrist=hipotermia?(cris&gt;=5?`${esp}+1d6`:String(esp)):0;
const formula=`${sel.d}+${corpo}${hipotermia?`+${bonusCrist}`:''}`;
const roll=await new Roll(formula).evaluate();
game.dice3d&&await game.dice3d.showForRoll(roll,game.user,!0);

// Ganho de cristal se acertou alvo com Hipotermia
let novoCris=cris;
if(hipotermia&&cris&lt;5){novoCris=cris+1;}
await actor.update({"system.props.pc.value":pc-sel.c,"system.props.cristais.value":novoCris});

const chat=`&lt;div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:2px solid ${cfg.cor};border-radius:12px;padding:15px;box-shadow:0 0 20px rgba(82,255,137,0.25)"&gt;
&lt;h2 style="color:${cfg.cor};text-align:center;text-shadow:0 0 10px ${cfg.cor}"&gt;❄️ ${cfg.nome}&lt;/h2&gt;
&lt;p style="color:#aaa;text-align:center;font-style:italic"&gt;${cfg.jp}&lt;/p&gt;
&lt;div style="background:rgba(82,255,137,0.08);padding:12px;border-radius:8px;text-align:center;margin:10px 0"&gt;
  &lt;div style="font-size:36px;color:#FFD700;font-weight:bold;text-shadow:0 0 10px #FFD700"&gt;${roll.total}&lt;/div&gt;
  &lt;div style="color:#52FF89;font-size:12px"&gt;${formula} | Frio${hipotermia?' + Cristalizar':''}&lt;/div&gt;
&lt;/div&gt;
&lt;div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0"&gt;
  &lt;div style="background:rgba(255,215,0,0.08);padding:6px;border-radius:5px;text-align:center"&gt;&lt;div style="color:#FFD700;font-size:11px"&gt;Tipo&lt;/div&gt;&lt;div style="color:#fff;font-size:13px"&gt;${cfg.tipo}&lt;/div&gt;&lt;/div&gt;
  &lt;div style="background:rgba(255,43,74,0.08);padding:6px;border-radius:5px;text-align:center"&gt;&lt;div style="color:#FF2B4A;font-size:11px"&gt;Custo&lt;/div&gt;&lt;div style="color:#fff;font-size:13px"&gt;${sel.c} PC&lt;/div&gt;&lt;/div&gt;
&lt;/div&gt;
${patinou?`&lt;div style="background:rgba(82,255,137,0.1);padding:7px;border-left:3px solid ${cfg.cor};margin-top:8px"&gt;&lt;strong style="color:${cfg.cor}"&gt;⚡ Patinação: +2 Acerto&lt;/strong&gt;&lt;/div&gt;`:''}
&lt;div style="background:rgba(82,255,137,0.1);padding:7px;border-left:3px solid ${cfg.cor};margin-top:8px"&gt;
  &lt;strong style="color:${cfg.cor}"&gt;🌫️ Nevoeiro:&lt;/strong&gt; Cristais nos olhos = Cegueira Parcial 1 turno&lt;br&gt;
  &lt;strong style="color:#aaa"&gt;Hipotermia:&lt;/strong&gt; Alvo -3m deslocamento 1 rodada
&lt;/div&gt;
&lt;div style="background:rgba(82,255,137,0.06);border:1px solid ${cfg.cor};border-radius:6px;padding:8px;margin-top:8px;font-size:11px"&gt;
  &lt;strong style="color:${cfg.cor}"&gt;❄️ Cristais: ${novoCris}/5&lt;/strong&gt; ${hipotermia&&novoCris&gt;cris?'&lt;span style="color:#FFD700"&gt;(+1!)&lt;/span&gt;':''} | ${estCris}&lt;br&gt;
  &lt;span style="color:#aaa"&gt;CD ${CD} | 2+:+1.5m | 4+:1d6 passagem | 5: Rajada&lt;/span&gt;
&lt;/div&gt;
&lt;/div&gt;`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
if(game.modules.get("sequencer")?.active&&canvas.tokens.controlled[0])
  new Sequence().effect().file("jb2a.ice_spikes.single.blue").atLocation(canvas.tokens.controlled[0]).scale(0.8).duration(1200).play().catch(()=&gt;{});
ui.notifications.info(`❄️ Vendaval: ${roll.total} | Cristais: ${novoCris}/5`);
})();
EOF
echo "✅ 01/15 — Corte de Vendaval Gelado"

# ═══════════════════════════════════════════════════════════════
# 02 — RODA DE TURBILHÃO GLACIAL
# ═══════════════════════════════════════════════════════════════
cat &gt; "macros/02_turbilhao_glacial.js" &lt;&lt; 'EOF'
(async()=&gt;{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
const esp=actor.system.props?.espirito?.value??0;
const nivel=actor.system.props?.nivel?.value??1;
const CD=10+Math.floor(nivel/2)+esp;
const cfg={nome:"Segunda Forma: Roda de Turbilhão Glacial",jp:"Ni no Kata: Hyoka Rin",tipo:"Ação Principal",cor:"#52FF89",niveis:[{n:1,d:"2d6",c:3},{n:2,d:"2d8",c:5},{n:3,d:"2d10",c:7},{n:4,d:"3d8",c:10}]};
const lvl=await new Promise(r=&gt;{new Dialog({title:"❄️",content:`&lt;div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"&gt;&lt;h2 style="color:${cfg.cor}"&gt;${cfg.nome}&lt;/h2&gt;${cfg.niveis.map(n=&gt;`&lt;p style="color:#fff"&gt;Nv${n.n}: ${n.d} Perfurante | ${n.c}PC&lt;/p&gt;`).join('')}&lt;p style="color:#52FF89;font-size:12px"&gt;Broca: Ignora RD | CD ${CD} ou Atordoado | +2 Def&lt;/p&gt;&lt;p style="color:#aaa;font-size:11px"&gt;Cristais: ${cris}/5&lt;/p&gt;&lt;/div&gt;`,buttons:{n1:{label:"Nv1",callback:()=&gt;r(0)},n2:{label:"Nv2",callback:()=&gt;r(1)},n3:{label:"Nv3",callback:()=&gt;r(2)},n4:{label:"Nv4",callback:()=&gt;r(3)}}}).render(!0)});
const sel=cfg.niveis[lvl],pc=actor.system.props?.pc?.value??0;
if(pc&lt;sel.c)return ui.notifications.error("❌ PC!");
const corpo=actor.system.props?.corpo?.value??0,formula=`${sel.d}+${corpo}`,roll=await new Roll(formula).evaluate();
game.dice3d&&await game.dice3d.showForRoll(roll,game.user,!0);
await actor.update({"system.props.pc.value":pc-sel.c});
const chat=`&lt;div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:2px solid ${cfg.cor};border-radius:12px;padding:15px;box-shadow:0 0 20px rgba(82,255,137,0.25)"&gt;
&lt;h2 style="color:${cfg.cor};text-align:center"&gt;❄️ ${cfg.nome}&lt;/h2&gt;&lt;p style="color:#aaa;text-align:center"&gt;${cfg.jp}&lt;/p&gt;
&lt;div style="background:rgba(82,255,137,0.08);padding:12px;text-align:center;border-radius:8px"&gt;
  &lt;div style="font-size:36px;color:#FFD700;font-weight:bold"&gt;${roll.total}&lt;/div&gt;
  &lt;div style="color:#52FF89;font-size:12px"&gt;${formula} | Perfurante&lt;/div&gt;
&lt;/div&gt;
&lt;div style="background:rgba(82,255,137,0.1);padding:8px;border-left:3px solid ${cfg.cor};margin-top:10px"&gt;
  &lt;strong style="color:${cfg.cor}"&gt;🌀 Broca:&lt;/strong&gt; Ignora Redução de Dano Física&lt;br&gt;
  &lt;strong style="color:#00D9FF"&gt;🛡️ Guarda Frontal:&lt;/strong&gt; +2 Defesa durante ação&lt;br&gt;
  &lt;strong style="color:#FF2B4A"&gt;⚡ TR COR CD ${CD}&lt;/strong&gt; ou Atordoado
&lt;/div&gt;
&lt;div style="background:rgba(82,255,137,0.06);border:1px solid ${cfg.cor};padding:8px;margin-top:8px;font-size:11px;border-radius:6px"&gt;
  &lt;strong style="color:${cfg.cor}"&gt;❄️ Cristais: ${cris}/5&lt;/strong&gt;&lt;br&gt;
  &lt;span style="color:#aaa"&gt;Hipotermia: Acertos reduzem -3m mov alvo&lt;/span&gt;
&lt;/div&gt;&lt;/div&gt;`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
ui.notifications.info(`❄️ Turbilhão: ${roll.total}`);
})();
EOF
echo "✅ 02/15 — Roda de Turbilhão Glacial"

# ═══════════════════════════════════════════════════════════════
# 03 — BARREIRA DA LUA CHEIA (Reação)
# ═══════════════════════════════════════════════════════════════
cat &gt; "macros/03_barreira_lua.js" &lt;&lt; 'EOF'
(async()=&gt;{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
const cfg={nome:"Terceira Forma: Barreira da Lua Cheia",jp:"San no Kata: Getsu Heki",tipo:"Reação",cor:"#52FF89",niveis:[{n:1,b:"+2",rd:3,c:2},{n:2,b:"+4",rd:5,c:3},{n:3,b:"+6",rd:8,c:5},{n:4,b:"+8",rd:12,c:7}]};
const lvl=await new Promise(r=&gt;{new Dialog({title:"❄️ Defesa",content:`&lt;div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"&gt;&lt;h2 style="color:${cfg.cor}"&gt;${cfg.nome}&lt;/h2&gt;${cfg.niveis.map(n=&gt;`&lt;p style="color:#fff"&gt;Nv${n.n}: ${n.b} Bloqueio | Reduz ${n.rd} dano | ${n.c}PC&lt;/p&gt;`).join('')}&lt;p style="color:#52FF89;font-size:12px"&gt;Bloqueio total = +1PC ou +1Cristal&lt;/p&gt;&lt;/div&gt;`,buttons:{n1:{label:"Nv1",callback:()=&gt;r(0)},n2:{label:"Nv2",callback:()=&gt;r(1)},n3:{label:"Nv3",callback:()=&gt;r(2)},n4:{label:"Nv4",callback:()=&gt;r(3)}}}).render(!0)});
const sel=cfg.niveis[lvl],pc=actor.system.props?.pc?.value??0;
if(pc&lt;sel.c)return ui.notifications.error("❌ PC!");
await actor.update({"system.props.pc.value":pc-sel.c});

// Verifica se bloqueio total (dano reduziu a 0)
const bloqTotal=await Dialog.confirm({title:"Bloqueio Total?",content:"&lt;p&gt;O dano foi reduzido a 0?&lt;/p&gt;"});
let novoCris=cris;
let ganhou="";
if(bloqTotal){
  const opcao=await new Promise(r=&gt;{new Dialog({title:"Recompensa do Bloqueio",content:"&lt;p&gt;O que recuperar?&lt;/p&gt;",buttons:{pc:{label:"+1 PC",callback:()=&gt;r('pc')},cristal:{label:"+1 Cristal",callback:()=&gt;r('cris')}}}).render(!0)});
  if(opcao==='pc'){await actor.update({"system.props.pc.value":pc-sel.c+1});ganhou="+1 PC";}
  else if(opcao==='cris'&&cris&lt;5){novoCris=cris+1;await actor.update({"system.props.cristais.value":novoCris});ganhou="+1 Cristal";}
}
// Gasta cristal para contra-ataque de oportunidade
const contraAtk=cris&gt;=1?await Dialog.confirm({title:"Gastar 1 Cristal?",content:"&lt;p&gt;Contra-ataque com Vantagem após o bloqueio? (-1 Cristal)&lt;/p&gt;"}):false;
if(contraAtk&&novoCris&gt;=1){await actor.update({"system.props.cristais.value":novoCris-1});novoCris-=1;}

const chat=`&lt;div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:2px solid ${cfg.cor};border-radius:12px;padding:15px"&gt;
&lt;h2 style="color:${cfg.cor};text-align:center"&gt;❄️ ${cfg.nome}&lt;/h2&gt;&lt;p style="color:#aaa;text-align:center"&gt;${cfg.jp}&lt;/p&gt;
&lt;div style="background:rgba(0,217,255,0.1);padding:12px;text-align:center;border-radius:8px"&gt;
  &lt;div style="font-size:32px;color:#00D9FF;font-weight:bold"&gt;${sel.b} Bloqueio&lt;/div&gt;
  &lt;div style="color:#52FF89;font-size:14px"&gt;Reduz ${sel.rd} de dano&lt;/div&gt;
&lt;/div&gt;
${bloqTotal?`&lt;div style="background:rgba(255,215,0,0.1);padding:8px;border-left:3px solid #FFD700;margin-top:8px"&gt;&lt;strong style="color:#FFD700"&gt;✨ BLOQUEIO TOTAL! ${ganhou}&lt;/strong&gt;&lt;/div&gt;`:''}
${contraAtk?`&lt;div style="background:rgba(82,255,137,0.15);padding:8px;border-left:3px solid ${cfg.cor};margin-top:8px"&gt;&lt;strong style="color:${cfg.cor}"&gt;⚡ CONTRA-ATAQUE com Vantagem! (-1 Cristal)&lt;/strong&gt;&lt;/div&gt;`:''}
&lt;div style="background:rgba(82,255,137,0.06);border:1px solid ${cfg.cor};padding:8px;margin-top:8px;font-size:11px;border-radius:6px"&gt;
  &lt;strong style="color:${cfg.cor}"&gt;❄️ Cristais: ${novoCris}/5&lt;/strong&gt; | +1 Cristal por Bloqueio ok
&lt;/div&gt;&lt;/div&gt;`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
ui.notifications.info(`🛡️ Barreira: ${sel.b} | Redução: ${sel.rd}`);
})();
EOF
echo "✅ 03/15 — Barreira da Lua Cheia"

# ═══════════════════════════════════════════════════════════════
# 04 — SAQUE DA NEVASCA (Linha) + FLUXO: DEZEMBRO
# ═══════════════════════════════════════════════════════════════
cat &gt; "macros/04_saque_nevasca.js" &lt;&lt; 'EOF'
(async()=&gt;{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
const esp=actor.system.props?.espirito?.value??0;
const nivel=actor.system.props?.nivel?.value??1;
const CD=10+Math.floor(nivel/2)+esp;
const cfg={nome:"Quarta Forma: Saque da Nevasca",jp:"Shi no Kata: Petaru Doriru",tipo:"Ação Completa",cor:"#52FF89",niveis:[{n:1,d:"1d12",linha:"4.5m",c:4},{n:2,d:"2d8",linha:"6m",c:6},{n:3,d:"3d8",linha:"7.5m",c:8},{n:4,d:"3d10",linha:"9m",c:10}]};
const lvl=await new Promise(r=&gt;{new Dialog({title:"❄️ Linha Perfurante",content:`&lt;div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"&gt;&lt;h2 style="color:${cfg.cor}"&gt;${cfg.nome}&lt;/h2&gt;${cfg.niveis.map(n=&gt;`&lt;p style="color:#fff"&gt;Nv${n.n}: ${n.d} | Linha ${n.linha} | ${n.c}PC&lt;/p&gt;`).join('')}&lt;p style="color:#52FF89;font-size:12px"&gt;Hipotermia automática | Super Armadura | Cristais: ${cris}/5&lt;/p&gt;&lt;/div&gt;`,buttons:{n1:{label:"Nv1",callback:()=&gt;r(0)},n2:{label:"Nv2",callback:()=&gt;r(1)},n3:{label:"Nv3",callback:()=&gt;r(2)},n4:{label:"Nv4",callback:()=&gt;r(3)}}}).render(!0)});
const sel=cfg.niveis[lvl],pc=actor.system.props?.pc?.value??0;
if(pc&lt;sel.c)return ui.notifications.error("❌ PC!");
const corpo=actor.system.props?.corpo?.value??0,formula=`${sel.d}+${corpo}`,roll=await new Roll(formula).evaluate();
game.dice3d&&await game.dice3d.showForRoll(roll,game.user,!0);
await actor.update({"system.props.pc.value":pc-sel.c});

// FLUXO: DEZEMBRO disponível após esta forma
const fluxo=await Dialog.confirm({title:"⚡ FLUXO: DEZEMBRO?",content:`&lt;div style="background:#0a0a0f;padding:10px;border:2px solid #FFD700"&gt;&lt;strong style="color:#FFD700"&gt;FLUXO: DEZEMBRO&lt;/strong&gt;&lt;br&gt;&lt;span style="color:#aaa"&gt;5 Momentum — Explosão 3m ao chegar&lt;/span&gt;&lt;/div&gt;`});
let fluxoMsg='';
if(fluxo){
  const mom=actor.system.props?.momentum?.value??0;
  if(mom&lt;5){fluxoMsg='&lt;div style="background:rgba(255,43,74,0.1);padding:7px;margin-top:8px"&gt;&lt;strong style="color:#FF2B4A"&gt;❌ Momentum insuficiente (5 req)&lt;/strong&gt;&lt;/div&gt;';}
  else{
    await actor.update({"system.props.momentum.value":mom-5});
    fluxoMsg=`&lt;div style="background:rgba(255,215,0,0.15);padding:8px;border-left:3px solid #FFD700;margin-top:8px"&gt;&lt;strong style="color:#FFD700"&gt;💥 FLUXO DEZEMBRO ATIVO!&lt;/strong&gt;&lt;br&gt;&lt;span style="color:#aaa"&gt;Explosão 3m | TR CORPO CD ${CD} ou Derrubado&lt;/span&gt;&lt;/div&gt;`;
  }
}
const chat=`&lt;div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:2px solid ${cfg.cor};border-radius:12px;padding:15px"&gt;
&lt;h2 style="color:${cfg.cor};text-align:center"&gt;❄️ ${cfg.nome}&lt;/h2&gt;&lt;p style="color:#aaa;text-align:center"&gt;${cfg.jp}&lt;/p&gt;
&lt;div style="background:rgba(82,255,137,0.08);padding:12px;text-align:center;border-radius:8px"&gt;
  &lt;div style="font-size:36px;color:#FFD700;font-weight:bold"&gt;${roll.total}&lt;/div&gt;
  &lt;div style="color:#52FF89;font-size:12px"&gt;Linha ${sel.linha}&lt;/div&gt;
&lt;/div&gt;
&lt;div style="background:rgba(82,255,137,0.1);padding:8px;border-left:3px solid ${cfg.cor};margin-top:8px"&gt;
  &lt;strong style="color:${cfg.cor}"&gt;❄️ Hipotermia Automática&lt;/strong&gt; em todos atingidos&lt;br&gt;
  &lt;strong style="color:#00D9FF"&gt;🛡️ Super Armadura:&lt;/strong&gt; Imune Derrubado/Empurrado&lt;br&gt;
  &lt;strong style="color:#aaa"&gt;Termina ao final da linha&lt;/strong&gt;
&lt;/div&gt;
${fluxoMsg}
&lt;div style="background:rgba(82,255,137,0.06);border:1px solid ${cfg.cor};padding:8px;margin-top:8px;font-size:11px;border-radius:6px"&gt;
  &lt;strong style="color:${cfg.cor}"&gt;❄️ Cristais: ${cris}/5&lt;/strong&gt; | CD ${CD}
&lt;/div&gt;&lt;/div&gt;`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
if(game.modules.get("sequencer")?.active&&canvas.tokens.controlled[0])
  new Sequence().effect().file("jb2a.ice_spikes.line.blue").atLocation(canvas.tokens.controlled[0]).scale(1.2).duration(1800).play().catch(()=&gt;{});
ui.notifications.info(`❄️ Saque: ${roll.total}`);
})();
EOF
echo "✅ 04/15 — Saque da Nevasca (+Fluxo: Dezembro)"

# ═══════════════════════════════════════════════════════════════
# 05 — DANÇA DA LUA E GELO (3 ataques) + FLUXO: CORRIDA DO LUAR
# ═══════════════════════════════════════════════════════════════
cat &gt; "macros/05_danca_lua_gelo.js" &lt;&lt; 'EOF'
(async()=&gt;{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
const cfg={nome:"Quinta Forma: Dança da Lua e Gelo",jp:"Go no Kata: Gekphyo no Mai",tipo:"Ação Bônus",cor:"#52FF89",niveis:[{n:1,d:"1d6",c:5},{n:2,d:"1d8",c:7},{n:3,d:"1d10",c:9},{n:4,d:"1d12",c:12}]};
const lvl=await new Promise(r=&gt;{new Dialog({title:"❄️ 3 Cortes",content:`&lt;div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"&gt;&lt;h2 style="color:${cfg.cor}"&gt;${cfg.nome}&lt;/h2&gt;${cfg.niveis.map(n=&gt;`&lt;p style="color:#fff"&gt;Nv${n.n}: 3×${n.d} | ${n.c}PC&lt;/p&gt;`).join('')}&lt;p style="color:#52FF89;font-size:12px"&gt;Acerto +2 = Flutuação (Imóvel)&lt;/p&gt;&lt;p style="color:#FFD700;font-size:11px"&gt;Fluxo: Corrida do Luar disponível após&lt;/p&gt;&lt;/div&gt;`,buttons:{n1:{label:"Nv1",callback:()=&gt;r(0)},n2:{label:"Nv2",callback:()=&gt;r(1)},n3:{label:"Nv3",callback:()=&gt;r(2)},n4:{label:"Nv4",callback:()=&gt;r(3)}}}).render(!0)});
const sel=cfg.niveis[lvl],pc=actor.system.props?.pc?.value??0;
if(pc&lt;sel.c)return ui.notifications.error("❌ PC!");
const corpo=actor.system.props?.corpo?.value??0,f=`${sel.d}+${corpo}`;
const r1=await new Roll(f).evaluate(),r2=await new Roll(f).evaluate(),r3=await new Roll(f).evaluate();
game.dice3d&&(await game.dice3d.showForRoll(r1,game.user,!0),await game.dice3d.showForRoll(r2,game.user,!0),await game.dice3d.showForRoll(r3,game.user,!0));
const total=r1.total+r2.total+r3.total;
await actor.update({"system.props.pc.value":pc-sel.c});

// FLUXO: CORRIDA DO LUAR
const fluxo=cris&gt;=2?await Dialog.confirm({title:"⚡ FLUXO: CORRIDA DO LUAR?",content:`&lt;div style="background:#0a0a0f;padding:10px;border:2px solid #FFD700"&gt;&lt;strong style="color:#FFD700"&gt;FLUXO: CORRIDA DO LUAR&lt;/strong&gt;&lt;br&gt;&lt;span style="color:#aaa"&gt;Gasta 2 Cristais — Dash 3m + 1d10 Frio passagem&lt;/span&gt;&lt;/div&gt;`}):false;
let fluxoMsg='';
if(fluxo){
  const dashRoll=await new Roll("1d10").evaluate();
  game.dice3d&&await game.dice3d.showForRoll(dashRoll,game.user,!0);
  const novoCris=Math.max(cris-2,0);
  await actor.update({"system.props.cristais.value":novoCris});
  fluxoMsg=`&lt;div style="background:rgba(255,215,0,0.15);padding:8px;border-left:3px solid #FFD700;margin-top:8px"&gt;&lt;strong style="color:#FFD700"&gt;🌙 CORRIDA DO LUAR!&lt;/strong&gt;&lt;br&gt;&lt;span style="color:#52FF89"&gt;Dash 3m | ${dashRoll.total} Dano Frio na passagem | -2 Cristais&lt;/span&gt;&lt;/div&gt;`;
}
const chat=`&lt;div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:2px solid ${cfg.cor};border-radius:12px;padding:15px"&gt;
&lt;h2 style="color:${cfg.cor};text-align:center"&gt;❄️ ${cfg.nome}&lt;/h2&gt;&lt;p style="color:#aaa;text-align:center"&gt;${cfg.jp}&lt;/p&gt;
&lt;div style="background:rgba(82,255,137,0.08);padding:12px;text-align:center;border-radius:8px"&gt;
  &lt;div style="font-size:36px;color:#FFD700;font-weight:bold"&gt;${total}&lt;/div&gt;
  &lt;div style="color:#aaa;font-size:12px"&gt;${r1.total} + ${r2.total} + ${r3.total}&lt;/div&gt;
&lt;/div&gt;
&lt;div style="background:rgba(82,255,137,0.1);padding:8px;border-left:3px solid ${cfg.cor};margin-top:8px"&gt;
  &lt;strong style="color:${cfg.cor}"&gt;🌙 Flutuação:&lt;/strong&gt; Acerto +2 = Flutuando (Impedido agir/mover)
&lt;/div&gt;
${fluxoMsg}
&lt;div style="background:rgba(82,255,137,0.06);border:1px solid ${cfg.cor};padding:8px;margin-top:8px;font-size:11px;border-radius:6px"&gt;
  &lt;strong style="color:${cfg.cor}"&gt;❄️ Cristais: ${fluxo?Math.max(cris-2,0):cris}/5&lt;/strong&gt;
&lt;/div&gt;&lt;/div&gt;`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
ui.notifications.info(`❄️ Dança: ${total}`);
})();
EOF
echo "✅ 05/15 — Dança da Lua e Gelo (+Fluxo: Corrida do Luar)"

# ═══════════════════════════════════════════════════════════════
# 06 — LABIRINTO DE GELO (Campo, sem níveis)
# ═══════════════════════════════════════════════════════════════
cat &gt; "macros/06_labirinto_gelo.js" &lt;&lt; 'EOF'
(async()=&gt;{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
const esp=actor.system.props?.espirito?.value??0;
const nivel=actor.system.props?.nivel?.value??1;
const CD=10+Math.floor(nivel/2)+esp;
const pc=actor.system.props?.pc?.value??0;
const mom=actor.system.props?.momentum?.value??0;
if(pc&lt;8||mom&lt;4)return ui.notifications.error(`❌ Requer 8PC e 4 Momentum! (PC:${pc} Mom:${mom})`);

const confirma=await Dialog.confirm({title:"❄️ Labirinto de Gelo",content:`&lt;div style="background:#0a0a0f;padding:15px;border:2px solid #52FF89"&gt;&lt;h2 style="color:#52FF89;text-align:center"&gt;Sexta Forma: Labirinto de Gelo&lt;/h2&gt;&lt;p style="color:#aaa"&gt;Raio 6m | 3 Turnos&lt;br&gt;&lt;strong style="color:#52FF89"&gt;8 PC + 4 Momentum&lt;/strong&gt;&lt;/p&gt;&lt;/div&gt;`});
if(!confirma)return;
await actor.update({"system.props.pc.value":pc-8,"system.props.momentum.value":mom-4});

const chat=`&lt;div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:3px solid #52FF89;border-radius:12px;padding:15px;box-shadow:0 0 30px rgba(82,255,137,0.3)"&gt;
&lt;h2 style="color:#52FF89;text-align:center;text-shadow:0 0 15px #52FF89"&gt;❄️ LABIRINTO DE GELO ❄️&lt;/h2&gt;
&lt;p style="color:#aaa;text-align:center"&gt;Roku no Kata: Hyoketsu Meikyu&lt;/p&gt;
&lt;div style="background:rgba(82,255,137,0.1);padding:15px;text-align:center;border-radius:8px"&gt;
  &lt;div style="font-size:28px;color:#52FF89;font-weight:bold"&gt;Raio 6m Ativo&lt;/div&gt;
  &lt;div style="color:#aaa"&gt;Duração: 3 Turnos&lt;/div&gt;
&lt;/div&gt;
&lt;div style="background:rgba(82,255,137,0.1);padding:10px;border-left:4px solid #52FF89;margin-top:10px"&gt;
  &lt;strong style="color:#52FF89"&gt;Para Você:&lt;/strong&gt; +3m Movimento na área&lt;br&gt;
  &lt;strong style="color:#FF2B4A"&gt;Para Inimigos:&lt;/strong&gt; Terreno Difícil (custo dobrado)&lt;br&gt;
  &lt;strong style="color:#FFD700"&gt;Teste Equilíbrio:&lt;/strong&gt; TR CORPO CD ${CD} ao sair ou Derrubado
&lt;/div&gt;
&lt;div style="background:rgba(82,255,137,0.06);border:1px solid #52FF89;padding:8px;margin-top:8px;font-size:11px;border-radius:6px"&gt;
  &lt;strong style="color:#52FF89"&gt;❄️ Cristais: ${cris}/5&lt;/strong&gt; | Estático ou Móvel com usuário
&lt;/div&gt;&lt;/div&gt;`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
if(game.modules.get("sequencer")?.active&&canvas.tokens.controlled[0])
  new Sequence().effect().file("jb2a.ice_spikes.ring.blue").atLocation(canvas.tokens.controlled[0]).scale(2.5).duration(3000).play().catch(()=&gt;{});
ui.notifications.info("❄️ Labirinto de Gelo ativado! (3 turnos)");
})();
EOF
echo "✅ 06/15 — Labirinto de Gelo"

# ═══════════════════════════════════════════════════════════════
# 07 — VÓRTICE ABSOLUTO (Puxão)
# ═══════════════════════════════════════════════════════════════
cat &gt; "macros/07_vortice_absoluto.js" &lt;&lt; 'EOF'
(async()=&gt;{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
const esp=actor.system.props?.espirito?.value??0;
const nivel=actor.system.props?.nivel?.value??1;
const CD=10+Math.floor(nivel/2)+esp;
const cfg={nome:"Sétima Forma: Vórtice Absoluto",jp:"Shichi no Kata: Zettai Uzumaki",tipo:"Ação Padrão",cor:"#52FF89",niveis:[{n:1,d:"1d8",puxao:"3m",c:4},{n:2,d:"1d10",puxao:"4.5m",c:6},{n:3,d:"1d12",puxao:"6m",c:8},{n:4,d:"2d8",puxao:"9m",c:10}]};
const lvl=await new Promise(r=&gt;{new Dialog({title:"❄️ Vórtice",content:`&lt;div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"&gt;&lt;h2 style="color:${cfg.cor}"&gt;${cfg.nome}&lt;/h2&gt;${cfg.niveis.map(n=&gt;`&lt;p style="color:#fff"&gt;Nv${n.n}: ${n.d} + Puxão ${n.puxao} | ${n.c}PC&lt;/p&gt;`).join('')}&lt;p style="color:#52FF89;font-size:12px"&gt;TR CORPO CD ${CD} ou Puxado até adjacente&lt;/p&gt;&lt;/div&gt;`,buttons:{n1:{label:"Nv1",callback:()=&gt;r(0)},n2:{label:"Nv2",callback:()=&gt;r(1)},n3:{label:"Nv3",callback:()=&gt;r(2)},n4:{label:"Nv4",callback:()=&gt;r(3)}}}).render(!0)});
const sel=cfg.niveis[lvl],pc=actor.system.props?.pc?.value??0;
if(pc&lt;sel.c)return ui.notifications.error("❌ PC!");
const corpo=actor.system.props?.corpo?.value??0,formula=`${sel.d}+${corpo}`,roll=await new Roll(formula).evaluate();
game.dice3d&&await game.dice3d.showForRoll(roll,game.user,!0);
await actor.update({"system.props.pc.value":pc-sel.c});
const chat=`&lt;div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:2px solid ${cfg.cor};border-radius:12px;padding:15px"&gt;
&lt;h2 style="color:${cfg.cor};text-align:center"&gt;❄️ ${cfg.nome}&lt;/h2&gt;&lt;p style="color:#aaa;text-align:center"&gt;${cfg.jp}&lt;/p&gt;
&lt;div style="background:rgba(82,255,137,0.08);padding:12px;text-align:center;border-radius:8px"&gt;
  &lt;div style="font-size:36px;color:#FFD700;font-weight:bold"&gt;${roll.total}&lt;/div&gt;
  &lt;div style="color:#52FF89;font-size:12px"&gt;+ Puxão ${sel.puxao}&lt;/div&gt;
&lt;/div&gt;
&lt;div style="background:rgba(82,255,137,0.1);padding:8px;border-left:3px solid ${cfg.cor};margin-top:8px"&gt;
  &lt;strong style="color:#FF2B4A"&gt;TR CORPO CD ${CD}&lt;/strong&gt; ou Puxado até adjacente&lt;br&gt;
  &lt;strong style="color:#FFD700"&gt;💥 Colisão:&lt;/strong&gt; Dano extra se baterem uns nos outros
&lt;/div&gt;
&lt;div style="background:rgba(82,255,137,0.06);border:1px solid ${cfg.cor};padding:8px;margin-top:8px;font-size:11px;border-radius:6px"&gt;
  &lt;strong style="color:${cfg.cor}"&gt;❄️ Cristais: ${cris}/5&lt;/strong&gt;
&lt;/div&gt;&lt;/div&gt;`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
ui.notifications.info(`❄️ Vórtice: ${roll.total} | Puxão: ${sel.puxao}`);
})();
EOF
echo "✅ 07/15 — Vórtice Absoluto"

# ═══════════════════════════════════════════════════════════════
# 08 — CEIFADOR DA GEADA (Consome Cristais)
# ═══════════════════════════════════════════════════════════════
cat &gt; "macros/08_ceifador_geada.js" &lt;&lt; 'EOF'
(async()=&gt;{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
if(cris&lt;1)return ui.notifications.error("❌ Requer ao menos 1 Cristal!");
const hipok=await Dialog.confirm({title:"Requisito",content:"&lt;p&gt;Alvo com &lt;strong&gt;Hipotermia&lt;/strong&gt; ou &lt;strong&gt;Congelado&lt;/strong&gt;?&lt;/p&gt;"});
if(!hipok)return ui.notifications.warn("⚠️ Requer Hipotermia ou Congelamento!");
const cfg={nome:"Oitava Forma: Ceifador da Geada",jp:"Hachi no Kata: Shimo no Karite",tipo:"Ação Completa",cor:"#52FF89",niveis:[{n:1,d:"2d8",c:5},{n:2,d:"2d10",c:7},{n:3,d:"2x2d10",c:10},{n:4,d:"6x1d10",c:14}]};
const lvl=await new Promise(r=&gt;{new Dialog({title:"❄️ EXECUÇÃO",content:`&lt;div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"&gt;&lt;h2 style="color:${cfg.cor}"&gt;${cfg.nome}&lt;/h2&gt;${cfg.niveis.map(n=&gt;`&lt;p style="color:#fff"&gt;Nv${n.n}: ${n.d} + ${cris}d8 (Cristais) | ${n.c}PC&lt;/p&gt;`).join('')}&lt;p style="color:#FF2B4A;font-size:12px"&gt;Consome TODOS os Cristais (${cris}×+1d8)&lt;/p&gt;&lt;p style="color:#52FF89;font-size:11px"&gt;Abate → Explosão 2d6 raio 1.5m&lt;/p&gt;&lt;/div&gt;`,buttons:{n1:{label:"Nv1",callback:()=&gt;r(0)},n2:{label:"Nv2",callback:()=&gt;r(1)},n3:{label:"Nv3",callback:()=&gt;r(2)},n4:{label:"Nv4",callback:()=&gt;r(3)}}}).render(!0)});
const sel=cfg.niveis[lvl],pc=actor.system.props?.pc?.value??0;
if(pc&lt;sel.c)return ui.notifications.error("❌ PC!");
const corpo=actor.system.props?.corpo?.value??0;
// Rolagem base
let dBase=sel.d;
if(sel.d.includes('x')){dBase=sel.d.replace(/(\d+)x(\w+)/,(_,m,d)=&gt;Array(parseInt(m)).fill(d).join('+'));}
const rollBase=await new Roll(`${dBase}+${corpo}`).evaluate();
game.dice3d&&await game.dice3d.showForRoll(rollBase,game.user,!0);
// Cristais extras (+1d8 each)
let bonusCrist=0;
for(let i=0;i&lt;cris;i++){const rc=await new Roll("1d8").evaluate();bonusCrist+=rc.total;}
const total=rollBase.total+bonusCrist;
await actor.update({"system.props.pc.value":pc-sel.c,"system.props.cristais.value":0});
const chat=`&lt;div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:3px solid ${cfg.cor};border-radius:12px;padding:15px;box-shadow:0 0 30px rgba(82,255,137,0.4)"&gt;
&lt;h2 style="color:${cfg.cor};text-align:center;text-shadow:0 0 15px ${cfg.cor}"&gt;❄️ ${cfg.nome} ❄️&lt;/h2&gt;&lt;p style="color:#aaa;text-align:center"&gt;${cfg.jp}&lt;/p&gt;
&lt;div style="background:rgba(82,255,137,0.1);padding:15px;text-align:center;border-radius:8px"&gt;
  &lt;div style="font-size:44px;color:#FFD700;font-weight:bold;text-shadow:0 0 20px #FFD700"&gt;${total}&lt;/div&gt;
  &lt;div style="color:#52FF89;font-size:13px"&gt;Base: ${rollBase.total} + Cristais: ${bonusCrist} (${cris}×1d8)&lt;/div&gt;
&lt;/div&gt;
&lt;div style="background:rgba(82,255,137,0.1);padding:8px;border-left:4px solid ${cfg.cor};margin-top:10px"&gt;
  &lt;strong style="color:${cfg.cor}"&gt;❄️ Cristais consumidos:&lt;/strong&gt; ${cris} → 0&lt;br&gt;
  &lt;strong style="color:#FF2B4A"&gt;💥 Abate → Explosão 2d6&lt;/strong&gt; em raio 1.5m
&lt;/div&gt;
&lt;div style="background:rgba(255,43,74,0.1);border:1px solid #FF2B4A;padding:8px;margin-top:8px;border-radius:6px;font-size:11px"&gt;
  &lt;strong style="color:#FF2B4A"&gt;Cristais: 0/5&lt;/strong&gt; (consumidos pelo golpe)
&lt;/div&gt;&lt;/div&gt;`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
if(game.modules.get("sequencer")?.active&&canvas.tokens.controlled[0])
  new Sequence().effect().file("jb2a.ice_spikes.single.blue").atLocation(canvas.tokens.controlled[0]).scale(2.5).duration(2500).play().catch(()=&gt;{});
ui.notifications.warn(`❄️ CEIFADOR: ${total} | Cristais zerados!`);
})();
EOF
echo "✅ 08/15 — Ceifador da Geada"

# ═══════════════════════════════════════════════════════════════
# 09 — ILUSÃO DE GRANIZO (Reação / Esquiva)
# ═══════════════════════════════════════════════════════════════
cat &gt; "macros/09_ilusao_granizo.js" &lt;&lt; 'EOF'
(async()=&gt;{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
const cfg={nome:"Nona Forma: Ilusão de Granizo",jp:"Ku no Kata: Mizore Ashi",tipo:"Reação",cor:"#52FF89",niveis:[{n:1,esq:"+2",c:2},{n:2,esq:"+3",c:3},{n:3,esq:"+6",c:5},{n:4,esq:"+8",c:7}]};
const lvl=await new Promise(r=&gt;{new Dialog({title:"❄️ Ilusão",content:`&lt;div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"&gt;&lt;h2 style="color:${cfg.cor}"&gt;${cfg.nome}&lt;/h2&gt;${cfg.niveis.map(n=&gt;`&lt;p style="color:#fff"&gt;Nv${n.n}: ${n.esq} Esquiva | ${n.c}PC&lt;/p&gt;`).join('')}&lt;p style="color:#52FF89;font-size:12px"&gt;Estátua 1PV explode: Hipotermia + 1d6 Frio&lt;/p&gt;&lt;p style="color:#FFD700;font-size:11px"&gt;Preserva Cristais de perda neste turno&lt;/p&gt;&lt;/div&gt;`,buttons:{n1:{label:"Nv1",callback:()=&gt;r(0)},n2:{label:"Nv2",callback:()=&gt;r(1)},n3:{label:"Nv3",callback:()=&gt;r(2)},n4:{label:"Nv4",callback:()=&gt;r(3)}}}).render(!0)});
const sel=cfg.niveis[lvl],pc=actor.system.props?.pc?.value??0;
if(pc&lt;sel.c)return ui.notifications.error("❌ PC!");
// Ganho +1 Cristal por esquiva ok
let novoCris=Math.min(cris+1,5);
await actor.update({"system.props.pc.value":pc-sel.c,"system.props.cristais.value":novoCris});
const chat=`&lt;div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:2px solid ${cfg.cor};border-radius:12px;padding:15px"&gt;
&lt;h2 style="color:${cfg.cor};text-align:center"&gt;❄️ ${cfg.nome}&lt;/h2&gt;&lt;p style="color:#aaa;text-align:center"&gt;${cfg.jp}&lt;/p&gt;
&lt;div style="background:rgba(0,217,255,0.1);padding:12px;text-align:center;border-radius:8px"&gt;
  &lt;div style="font-size:32px;color:#00D9FF;font-weight:bold"&gt;${sel.esq} Esquiva&lt;/div&gt;
&lt;/div&gt;
&lt;div style="background:rgba(82,255,137,0.1);padding:8px;border-left:3px solid ${cfg.cor};margin-top:8px"&gt;
  &lt;strong style="color:#00D9FF"&gt;👻 Estátua de Gelo (1PV)&lt;/strong&gt; criada no local&lt;br&gt;
  &lt;strong style="color:${cfg.cor}"&gt;💥 Se destruída:&lt;/strong&gt; Hipotermia + 1d6 Frio ao atacante&lt;br&gt;
  &lt;strong style="color:#FFD700"&gt;🛡️ Preserva Cristais&lt;/strong&gt; de perda neste turno
&lt;/div&gt;
&lt;div style="background:rgba(82,255,137,0.06);border:1px solid ${cfg.cor};padding:8px;margin-top:8px;font-size:11px;border-radius:6px"&gt;
  &lt;strong style="color:${cfg.cor}"&gt;❄️ Cristais: ${novoCris}/5&lt;/strong&gt; &lt;span style="color:#FFD700"&gt;(+1 Esquiva!)&lt;/span&gt;
&lt;/div&gt;&lt;/div&gt;`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
ui.notifications.info(`❄️ Ilusão: ${sel.esq} | Cristais: ${novoCris}/5`);
})();
EOF
echo "✅ 09/15 — Ilusão de Granizo"

# ═══════════════════════════════════════════════════════════════
# 10 — ENTERRO DE AVALANCHE (Cone Massivo)
# ═══════════════════════════════════════════════════════════════
cat &gt; "macros/10_enterro_avalanche.js" &lt;&lt; 'EOF'
(async()=&gt;{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
const esp=actor.system.props?.espirito?.value??0;
const nivel=actor.system.props?.nivel?.value??1;
const CD=10+Math.floor(nivel/2)+esp;
const cfg={nome:"Décima Forma: Enterro de Avalanche",jp:"Ju no Kata: Petaru Bureido",tipo:"Ação Completa",cor:"#52FF89",niveis:[{n:1,d:"2d6",cone:"6m",c:8},{n:2,d:"2d8",cone:"9m",c:12},{n:3,d:"2d10",cone:"12m",c:16},{n:4,d:"2d12",cone:"15m",c:20}]};
const lvl=await new Promise(r=&gt;{new Dialog({title:"❄️ AVALANCHE",content:`&lt;div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"&gt;&lt;h2 style="color:${cfg.cor}"&gt;${cfg.nome}&lt;/h2&gt;${cfg.niveis.map(n=&gt;`&lt;p style="color:#fff"&gt;Nv${n.n}: ${n.d} | Cone ${n.cone} | ${n.c}PC&lt;/p&gt;`).join('')}&lt;p style="color:#FF2B4A;font-size:12px"&gt;Falha CD ${CD}: Dano Total + Congelado (Imóvel 1t)&lt;/p&gt;&lt;p style="color:#FFD700;font-size:12px"&gt;Sucesso: Metade + Hipotermia | +Terreno 3t&lt;/p&gt;&lt;/div&gt;`,buttons:{n1:{label:"Nv1",callback:()=&gt;r(0)},n2:{label:"Nv2",callback:()=&gt;r(1)},n3:{label:"Nv3",callback:()=&gt;r(2)},n4:{label:"Nv4",callback:()=&gt;r(3)}}}).render(!0)});
const sel=cfg.niveis[lvl],pc=actor.system.props?.pc?.value??0;
if(pc&lt;sel.c)return ui.notifications.error(`❌ PC: ${sel.c}|Tem: ${pc}`);
const corpo=actor.system.props?.corpo?.value??0,formula=`${sel.d}+${corpo}`,roll=await new Roll(formula).evaluate();
game.dice3d&&await game.dice3d.showForRoll(roll,game.user,!0);
await actor.update({"system.props.pc.value":pc-sel.c});
const chat=`&lt;div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:3px solid ${cfg.cor};border-radius:12px;padding:15px;box-shadow:0 0 30px rgba(82,255,137,0.35)"&gt;
&lt;h2 style="color:${cfg.cor};text-align:center;text-shadow:0 0 15px ${cfg.cor}"&gt;❄️ ${cfg.nome} ❄️&lt;/h2&gt;&lt;p style="color:#aaa;text-align:center"&gt;${cfg.jp}&lt;/p&gt;
&lt;div style="background:rgba(82,255,137,0.1);padding:15px;text-align:center;border-radius:8px"&gt;
  &lt;div style="font-size:42px;color:#FFD700;font-weight:bold"&gt;${roll.total}&lt;/div&gt;
  &lt;div style="color:#52FF89;font-size:13px"&gt;Cone ${sel.cone}&lt;/div&gt;
&lt;/div&gt;
&lt;div style="background:rgba(0,217,255,0.1);padding:10px;border-left:4px solid #00D9FF;margin-top:10px"&gt;
  &lt;strong style="color:#FF2B4A"&gt;TR CORPO CD ${CD}&lt;/strong&gt;&lt;br&gt;
  &lt;span style="color:#FF2B4A"&gt;Falha: ${roll.total} dano + CONGELADO (Imóvel 1t)&lt;/span&gt;&lt;br&gt;
  &lt;span style="color:#FFD700"&gt;Sucesso: ${Math.floor(roll.total/2)} dano + Hipotermia&lt;/span&gt;
&lt;/div&gt;
&lt;div style="background:rgba(82,255,137,0.08);padding:8px;margin-top:8px;border-radius:6px"&gt;
  &lt;strong style="color:${cfg.cor}"&gt;🧊 Terreno de Gelo:&lt;/strong&gt; 3 rodadas na área&lt;br&gt;
&lt;/div&gt;
&lt;div style="background:rgba(82,255,137,0.06);border:1px solid ${cfg.cor};padding:8px;margin-top:8px;font-size:11px;border-radius:6px"&gt;
  &lt;strong style="color:${cfg.cor}"&gt;❄️ Cristais: ${cris}/5&lt;/strong&gt; | CD ${CD}
&lt;/div&gt;&lt;/div&gt;`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
if(game.modules.get("sequencer")?.active&&canvas.tokens.controlled[0])
  new Sequence().effect().file("jb2a.ice_spikes.cone.blue").atLocation(canvas.tokens.controlled[0]).scale(2).duration(3000).play().catch(()=&gt;{});
ui.notifications.warn(`❄️ AVALANCHE: ${roll.total} | Cone ${sel.cone}`);
})();
EOF
echo "✅ 10/15 — Enterro de Avalanche"

# ═══════════════════════════════════════════════════════════════
# 11 — CORAÇÃO DE GELO (Purificação, sem níveis)
# ═══════════════════════════════════════════════════════════════
cat &gt; "macros/11_coracao_gelo.js" &lt;&lt; 'EOF'
(async()=&gt;{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
const pc=actor.system.props?.pc?.value??0;
if(cris&lt;3)return ui.notifications.error(`❌ Requer 3 Cristais! (Tem: ${cris})`);
if(pc&lt;10)return ui.notifications.error(`❌ PC: 10|Tem: ${pc}`);
const confirma=await Dialog.confirm({title:"❄️ Coração de Gelo",content:`&lt;div style="background:#0a0a0f;padding:15px;border:2px solid #52FF89"&gt;&lt;h2 style="color:#52FF89;text-align:center"&gt;Décima Primeira Forma&lt;/h2&gt;&lt;p style="color:#aaa;text-align:center"&gt;10 PC + 3 Cristais&lt;/p&gt;&lt;p style="color:#2EFF7A;text-align:center"&gt;Remove: Sangramento, Veneno, Queimadura&lt;br&gt;Confusão, Medo&lt;/p&gt;&lt;/div&gt;`});
if(!confirma)return;
await actor.update({"system.props.pc.value":pc-10,"system.props.cristais.value":cris-3});
const chat=`&lt;div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:3px solid #00D9FF;border-radius:12px;padding:15px;box-shadow:0 0 30px rgba(0,217,255,0.3)"&gt;
&lt;h2 style="color:#00D9FF;text-align:center;text-shadow:0 0 15px #00D9FF"&gt;❄️ Décima Primeira Forma: Coração de Gelo ❄️&lt;/h2&gt;
&lt;p style="color:#aaa;text-align:center"&gt;Ju Ichi no Kata: Hyonagi&lt;/p&gt;
&lt;div style="background:rgba(0,217,255,0.1);padding:15px;text-align:center;border-radius:8px"&gt;
  &lt;div style="font-size:28px;color:#2EFF7A;font-weight:bold"&gt;PURIFICAÇÃO&lt;/div&gt;
  &lt;div style="color:#aaa;font-size:13px"&gt;Temperatura corporal → Abaixo de zero&lt;/div&gt;
&lt;/div&gt;
&lt;div style="background:rgba(46,255,122,0.1);padding:10px;border-left:4px solid #2EFF7A;margin-top:10px"&gt;
  &lt;strong style="color:#2EFF7A"&gt;✨ Removido:&lt;/strong&gt;&lt;br&gt;
  🩸 Sangramento | ☠️ Veneno | 🔥 Queimadura&lt;br&gt;
  🌀 Confusão | 😨 Medo
&lt;/div&gt;
&lt;div style="background:rgba(0,217,255,0.06);border:1px solid #00D9FF;padding:8px;margin-top:8px;font-size:11px;border-radius:6px"&gt;
  &lt;strong style="color:#00D9FF"&gt;❄️ Cristais: ${cris-3}/5&lt;/strong&gt; (-3 Cristais)
&lt;/div&gt;&lt;/div&gt;`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
ui.notifications.info("❄️ Purificação completa!");
})();
EOF
echo "✅ 11/15 — Coração de Gelo"

# ═══════════════════════════════════════════════════════════════
# 12 — DENTE DO DRAGÃO (Perfurante, alcance 6m)
# ═══════════════════════════════════════════════════════════════
cat &gt; "macros/12_dente_dragao.js" &lt;&lt; 'EOF'
(async()=&gt;{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
const cfg={nome:"Décima Segunda Forma: Dente do Dragão",jp:"Ju Ni no Kata: Ryuto",tipo:"Ação Padrão",cor:"#52FF89",niveis:[{n:1,d:"1d4",c:2},{n:2,d:"1d8",c:6},{n:3,d:"1d10",c:8},{n:4,d:"1d12",c:10}]};
const lvl=await new Promise(r=&gt;{new Dialog({title:"❄️ Estocada Perfeita",content:`&lt;div style="background:#0a0a0f;padding:15px;border:2px solid ${cfg.cor}"&gt;&lt;h2 style="color:${cfg.cor}"&gt;${cfg.nome}&lt;/h2&gt;${cfg.niveis.map(n=&gt;`&lt;p style="color:#fff"&gt;Nv${n.n}: ${n.d} | ${n.c}PC | Alcance 6m&lt;/p&gt;`).join('')}&lt;p style="color:#FFD700;font-size:12px"&gt;Crítico 18-20 → Silenciado 1 turno&lt;/p&gt;&lt;p style="color:#52FF89;font-size:12px"&gt;Vantagem contra Bloqueio | Cristais: ${cris}/5&lt;/p&gt;&lt;/div&gt;`,buttons:{n1:{label:"Nv1",callback:()=&gt;r(0)},n2:{label:"Nv2",callback:()=&gt;r(1)},n3:{label:"Nv3",callback:()=&gt;r(2)},n4:{label:"Nv4",callback:()=&gt;r(3)}}}).render(!0)});
const sel=cfg.niveis[lvl],pc=actor.system.props?.pc?.value??0;
if(pc&lt;sel.c)return ui.notifications.error("❌ PC!");
const corpo=actor.system.props?.corpo?.value??0,formula=`${sel.d}+${corpo}`,roll=await new Roll(formula).evaluate();
game.dice3d&&await game.dice3d.showForRoll(roll,game.user,!0);
// Verifica crítico 18-20
const dadoResult=roll.terms[0]?.results?.[0]?.result??0;
const eCritico=dadoResult&gt;=18;
await actor.update({"system.props.pc.value":pc-sel.c});
const chat=`&lt;div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:2px solid ${cfg.cor};border-radius:12px;padding:15px"&gt;
&lt;h2 style="color:${cfg.cor};text-align:center"&gt;❄️ ${cfg.nome}&lt;/h2&gt;&lt;p style="color:#aaa;text-align:center"&gt;${cfg.jp}&lt;/p&gt;
&lt;div style="background:rgba(82,255,137,0.08);padding:12px;text-align:center;border-radius:8px"&gt;
  &lt;div style="font-size:36px;color:#FFD700;font-weight:bold"&gt;${roll.total}&lt;/div&gt;
  &lt;div style="color:#52FF89;font-size:12px"&gt;Alcance 6m | Perfurante&lt;/div&gt;
&lt;/div&gt;
${eCritico?`&lt;div style="background:rgba(255,215,0,0.2);padding:8px;text-align:center;margin-top:8px;border:2px solid #FFD700;border-radius:6px"&gt;&lt;strong style="color:#FFD700;font-size:16px"&gt;⚡ CRÍTICO! (${dadoResult}) → SILENCIADO 1 turno&lt;/strong&gt;&lt;/div&gt;`:''}
&lt;div style="background:rgba(82,255,137,0.1);padding:8px;border-left:3px solid ${cfg.cor};margin-top:8px"&gt;
  &lt;strong style="color:${cfg.cor}"&gt;🗡️ Quebra-Guarda:&lt;/strong&gt; Vantagem contra Bloqueio&lt;br&gt;
  &lt;strong style="color:#FFD700"&gt;Crítico 18-20:&lt;/strong&gt; Silenciado (sem respirações/cânticos)
&lt;/div&gt;
&lt;div style="background:rgba(82,255,137,0.06);border:1px solid ${cfg.cor};padding:8px;margin-top:8px;font-size:11px;border-radius:6px"&gt;
  &lt;strong style="color:${cfg.cor}"&gt;❄️ Cristais: ${cris}/5&lt;/strong&gt;
&lt;/div&gt;&lt;/div&gt;`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
ui.notifications.info(`❄️ Dente do Dragão: ${roll.total}${eCritico?' | ⚡ CRÍTICO!':''}`);
})();
EOF
echo "✅ 12/15 — Dente do Dragão"

# ═══════════════════════════════════════════════════════════════
# 13 — NÉVOA ESPECTRAL (Sustentada, 2PC/turno)
# ═══════════════════════════════════════════════════════════════
cat &gt; "macros/13_nevoa_espectral.js" &lt;&lt; 'EOF'
(async()=&gt;{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
const pc=actor.system.props?.pc?.value??0;
if(pc&lt;2)return ui.notifications.error("❌ 2 PC mínimo!");

const acao=await new Promise(r=&gt;{new Dialog({title:"❄️ Névoa Espectral",content:`&lt;div style="background:#0a0a0f;padding:15px;border:2px solid #52FF89"&gt;&lt;h2 style="color:#52FF89;text-align:center"&gt;Décima Terceira Forma: Névoa Espectral&lt;/h2&gt;&lt;p style="color:#aaa;text-align:center"&gt;Ju San no Kata: Tsuiseki&lt;/p&gt;&lt;p style="color:#52FF89"&gt;2 PC por turno para manter&lt;br&gt;+4 Defesa vs AO | +2 Dano após Dash→Ataque&lt;/p&gt;&lt;p style="color:#aaa;font-size:12px"&gt;PC atual: ${pc}&lt;/p&gt;&lt;/div&gt;`,buttons:{ativar:{label:"Ativar (2PC)",callback:()=&gt;r('ativar')},manter:{label:"Manter (2PC)",callback:()=&gt;r('manter')},encerrar:{label:"Encerrar",callback:()=&gt;r('encerrar')}}}).render(!0)});

if(acao==='encerrar'){await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:`&lt;div style="background:#0a0a0f;border:2px solid #52FF89;border-radius:8px;padding:10px;text-align:center"&gt;&lt;strong style="color:#52FF89"&gt;❄️ Névoa Espectral encerrada&lt;/strong&gt;&lt;/div&gt;`});return;}
await actor.update({"system.props.pc.value":pc-2});
const chat=`&lt;div style="background:linear-gradient(135deg,#0a0a0f,#0d1a1a);border:2px solid #52FF89;border-radius:12px;padding:15px"&gt;
&lt;h2 style="color:#52FF89;text-align:center"&gt;❄️ Névoa Espectral ${acao==='ativar'?'ATIVADA':'MANTIDA'}&lt;/h2&gt;
&lt;p style="color:#aaa;text-align:center"&gt;Ju San no Kata: Tsuiseki&lt;/p&gt;
&lt;div style="background:rgba(82,255,137,0.08);padding:10px;text-align:center;border-radius:8px"&gt;
  &lt;div style="font-size:24px;color:#00D9FF;font-weight:bold"&gt;+4 Defesa vs AO&lt;/div&gt;
  &lt;div style="color:#52FF89;font-size:14px"&gt;+2 Dano Impacto após Dash→Ataque&lt;/div&gt;
&lt;/div&gt;
&lt;div style="background:rgba(82,255,137,0.06);border:1px solid #52FF89;padding:8px;margin-top:8px;font-size:11px;border-radius:6px"&gt;
  &lt;strong style="color:#52FF89"&gt;❄️ Cristais: ${cris}/5&lt;/strong&gt; | -2PC/turno
&lt;/div&gt;&lt;/div&gt;`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
ui.notifications.info(`❄️ Névoa: ${acao} | PC: ${pc-2}`);
})();
EOF
echo "✅ 13/15 — Névoa Espectral"

# ═══════════════════════════════════════════════════════════════
# 14 — DOMÍNIO DO ZERO ABSOLUTO (Requer 5 Cristais, sem consumir)
# ═══════════════════════════════════════════════════════════════
cat &gt; "macros/14_dominio_zero.js" &lt;&lt; 'EOF'
(async()=&gt;{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
const esp=actor.system.props?.espirito?.value??0;
const pc=actor.system.props?.pc?.value??0;
if(cris&lt;5)return ui.notifications.error(`❌ Requer 5 Cristais! (Tem: ${cris})`);
if(pc&lt;15)return ui.notifications.error(`❌ PC: 15|Tem: ${pc}`);
const confirma=await Dialog.confirm({title:"⚡ ZERO ABSOLUTO",content:`&lt;div style="background:#0a0a0f;padding:15px;border:3px solid #52FF89"&gt;&lt;h2 style="color:#52FF89;text-align:center"&gt;DOMÍNIO DO ZERO ABSOLUTO&lt;/h2&gt;&lt;p style="color:#FFD700;text-align:center"&gt;15 PC | 3 Rodadas&lt;/p&gt;&lt;p style="color:#aaa"&gt;Cristais NÃO são consumidos&lt;br&gt;+1 Cristal automático/turno&lt;br&gt;Todos inimigos (9m) = Hipotermia automática&lt;br&gt;Resistência dano = MOD ESP (${esp})&lt;/p&gt;&lt;/div&gt;`});
if(!confirma)return;
await actor.update({"system.props.pc.value":pc-15});
const chat=`&lt;div style="background:linear-gradient(135deg,#0a0a0f,#051f12);border:4px solid #52FF89;border-radius:14px;padding:20px;box-shadow:0 0 50px rgba(82,255,137,0.5)"&gt;
&lt;h2 style="color:#52FF89;text-align:center;text-shadow:0 0 20px #52FF89;font-size:26px"&gt;❄️ DOMÍNIO DO ZERO ABSOLUTO ❄️&lt;/h2&gt;
&lt;p style="color:#aaa;text-align:center"&gt;Ju Shi no Kata: Zettai Reikaku&lt;/p&gt;
&lt;div style="background:rgba(82,255,137,0.15);padding:18px;text-align:center;border-radius:10px;margin:15px 0"&gt;
  &lt;div style="font-size:32px;color:#52FF89;font-weight:bold;text-shadow:0 0 20px #52FF89"&gt;ATIVO — 3 RODADAS&lt;/div&gt;
&lt;/div&gt;
&lt;div style="background:rgba(82,255,137,0.1);padding:12px;border-left:5px solid #52FF89;margin-top:10px"&gt;
  &lt;strong style="color:#52FF89"&gt;❄️ Orbes Infinitos:&lt;/strong&gt; +1 Cristal/turno automático&lt;br&gt;
  &lt;strong style="color:#FF2B4A"&gt;🥶 Frio Penetrante:&lt;/strong&gt; Todos inimigos (9m) = Hipotermia/turno&lt;br&gt;
  &lt;strong style="color:#00D9FF"&gt;🛡️ Armadura de Gelo:&lt;/strong&gt; RD ${esp} contra TODO dano
&lt;/div&gt;
&lt;div style="background:rgba(82,255,137,0.08);border:2px solid #52FF89;padding:10px;margin-top:10px;border-radius:6px;text-align:center"&gt;
  &lt;strong style="color:#FFD700;font-size:14px"&gt;❄️ Cristais: ${cris}/5 (mantidos)&lt;/strong&gt;
&lt;/div&gt;&lt;/div&gt;`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
if(game.modules.get("sequencer")?.active&&canvas.tokens.controlled[0])
  new Sequence().effect().file("jb2a.ice_spikes.ring.blue").atLocation(canvas.tokens.controlled[0]).scale(4).duration(5000).play().catch(()=&gt;{});
ui.notifications.warn("❄️ ZERO ABSOLUTO ATIVO! (3 rodadas)");
})();
EOF
echo "✅ 14/15 — Domínio do Zero Absoluto"

# ═══════════════════════════════════════════════════════════════
# 15 — O DRAGÃO LEVANTA A CABEÇA (ULTIMATE)
# ═══════════════════════════════════════════════════════════════
cat &gt; "macros/15_dragao_levanta.js" &lt;&lt; 'EOF'
(async()=&gt;{
const actor=canvas.tokens.controlled[0]?.actor||game.user.character;
if(!actor)return ui.notifications.error("❌ Token!");
const cris=actor.system.props?.cristais?.value??0;
const pc=actor.system.props?.pc?.value??0;
const mom=actor.system.props?.momentum?.value??0;
if(pc&lt;10)return ui.notifications.error(`❌ PC: 10|Tem: ${pc}`);
if(mom&lt;4)return ui.notifications.error(`❌ Momentum: 4|Tem: ${mom}`);

const confirma=await Dialog.confirm({title:"🐉 DRAGÃO LEVANTA A CABEÇA",content:`&lt;div style="background:#0a0a0f;padding:20px;border:3px solid #52FF89"&gt;&lt;h2 style="color:#52FF89;text-align:center"&gt;Ju Go no Kata: Hiryu no Atama&lt;/h2&gt;&lt;p style="color:#FFD700;text-align:center"&gt;10 PC + 4 Momentum&lt;/p&gt;&lt;p style="color:#aaa"&gt;4d10 Frio + 2× Cristais consumidos&lt;br&gt;Ignora Bloqueio/Aparar — alvo DEVE Esquivar&lt;br&gt;&lt;br&gt;&lt;strong style="color:#FF2B4A"&gt;Falha → Gastar 5 Cristais + 5 Mom + 5 PV = +10 bônus&lt;/strong&gt;&lt;/p&gt;&lt;p style="color:#52FF89"&gt;Cristais atuais: ${cris}/5&lt;/p&gt;&lt;/div&gt;`});
if(!confirma)return;

const corpo=actor.system.props?.corpo?.value??0;
const bonusCristais=cris*2;
const formula=`4d10+${corpo}+${bonusCristais}`;
const roll=await new Roll(formula).evaluate();
game.dice3d&&await game.dice3d.showForRoll(roll,game.user,!0);
await actor.update({"system.props.pc.value":pc-10,"system.props.momentum.value":mom-4,"system.props.cristais.value":0});

// Verificar se falhou e quer usar reroll supremo
const falhou=await Dialog.confirm({title:"Ataque falhou?",content:`&lt;div style="background:#0a0a0f;padding:10px;border:2px solid #FF2B4A"&gt;&lt;p style="color:#FF2B4A"&gt;&lt;strong&gt;Usar TODOS os recursos?&lt;/strong&gt;&lt;br&gt;5 Cristais + 5 Mom + 5 PV → +10 bônus e rolar novamente&lt;/p&gt;&lt;/div&gt;`});
let finalMsg='';
if(falhou){
  const momAtual=actor.system.props?.momentum?.value??0;
  const pvAtual=actor.system.props?.pv?.value??0;
  const crisAtual=actor.system.props?.cristais?.value??0;
  if(crisAtual&gt;=5&&momAtual&gt;=5&&pvAtual&gt;5){
    const roll2=await new Roll(`4d10+${corpo}+${bonusCristais}+10`).evaluate();
    game.dice3d&&await game.dice3d.showForRoll(roll2,game.user,!0);
    await actor.update({"system.props.cristais.value":0,"system.props.momentum.value":momAtual-5,"system.props.pv.value":pvAtual-5});
    finalMsg=`&lt;div style="background:rgba(255,215,0,0.2);padding:10px;margin-top:10px;border:2px solid #FFD700;border-radius:6px;text-align:center"&gt;&lt;strong style="color:#FFD700;font-size:18px"&gt;⚡ DRAGÃO MUDA TRAJETÓRIA!&lt;/strong&gt;&lt;br&gt;&lt;div style="font-size:32px;color:#FFD700"&gt;${roll2.total}&lt;/div&gt;&lt;span style="color:#aaa"&gt;+10 bônus | -5Cris -5Mom -5PV&lt;/span&gt;&lt;/div&gt;`;
  }else{finalMsg='&lt;div style="background:rgba(255,43,74,0.1);padding:8px;margin-top:8px"&gt;&lt;strong style="color:#FF2B4A"&gt;❌ Recursos insuficientes para reroll&lt;/strong&gt;&lt;/div&gt;';}
}

const chat=`&lt;div style="background:linear-gradient(135deg,#0a0a0f,#051f12);border:4px solid #FFD700;border-radius:14px;padding:20px;box-shadow:0 0 50px rgba(255,215,0,0.4)"&gt;
&lt;h2 style="color:#52FF89;text-align:center;text-shadow:0 0 20px #52FF89;font-size:24px"&gt;🐉 O DRAGÃO LEVANTA A CABEÇA 🐉&lt;/h2&gt;
&lt;p style="color:#aaa;text-align:center;font-style:italic"&gt;Ju Go no Kata: Hiryu no Atama&lt;/p&gt;
&lt;div style="background:rgba(82,255,137,0.1);padding:18px;text-align:center;border-radius:10px;margin:15px 0"&gt;
  &lt;div style="font-size:48px;color:#52FF89;font-weight:bold;text-shadow:0 0 25px #52FF89"&gt;${roll.total}&lt;/div&gt;
  &lt;div style="color:#aaa;font-size:13px"&gt;${formula} | 4d10 + 2×${cris} Cristais&lt;/div&gt;
&lt;/div&gt;
&lt;div style="background:rgba(82,255,137,0.1);padding:12px;border-left:5px solid #52FF89;margin-top:10px"&gt;
  &lt;strong style="color:#52FF89"&gt;🐉 Ignora Bloqueio/Aparar/Escudos&lt;/strong&gt;&lt;br&gt;
  &lt;strong style="color:#FF2B4A"&gt;Alvo DEVE Esquivar!&lt;/strong&gt;&lt;br&gt;
  &lt;span style="color:#aaa"&gt;Cristais bônus: ${cris}×2 = +${bonusCristais} dano&lt;/span&gt;
&lt;/div&gt;
${finalMsg}
&lt;div style="background:rgba(255,43,74,0.15);padding:10px;margin-top:10px;border:2px solid #FF2B4A;border-radius:6px;text-align:center"&gt;
  &lt;strong style="color:#FF2B4A"&gt;❄️ Cristais zerados após o golpe&lt;/strong&gt;
&lt;/div&gt;&lt;/div&gt;`;
await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:chat});
if(game.modules.get("sequencer")?.active&&canvas.tokens.controlled[0])
  new Sequence().effect().file("jb2a.divine_smite.blue").atLocation(canvas.tokens.controlled[0]).scale(3.5).duration(4000).fadeIn(300).fadeOut(800).play().catch(()=&gt;{});
ui.notifications.warn(`🐉 DRAGÃO: ${roll.total} | Cristais zerados!`);
})();
EOF
echo "✅ 15/15 — O Dragão Levanta a Cabeça (ULTIMATE)"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "❄️ DEPLOYMENT COMPLETO — RESPIRAÇÃO DA NEVASCA"
echo "═══════════════════════════════════════════════════════════════"
echo "📦 15 Macros Stand-Alone | 4 Níveis + Formas Únicas"
echo "❄️ Sistema Dança das Lâminas de Geada hardcoded"
echo "🐉 CD Dinâmica: 10 + Nível/2 + ESP (calculada por macro)"
echo ""
echo "SISTEMA DE CRISTAIS (actor.system.props.cristais.value):"
echo "  +1: Acertar c/ Hipotermia | Esquiva/Bloqueio ok | Mov 4.5m"
echo "  -2: Dano de Fogo | -3: Agarrado"
echo "  Zera: Atordoado / Inconsciente"
echo "  2 Cristais: +1.5m mov | Imune AO vs Hipotermia"
echo "  4 Cristais: 1d6 Frio ao atravessar inimigo"
echo "  5 Cristais: Rajada da Nevasca (3 ataques, dobra mov)"
echo ""
echo "FORMAS COM INTERAÇÕES ESPECIAIS:"
echo "  04 + Fluxo: Dezembro (5 Mom → Explosão 3m)"
echo "  05 + Fluxo: Corrida do Luar (2 Cristais → Dash 1d10)"
echo "  08 Ceifador: Consome TODOS cristais (+1d8 cada)"
echo "  14 Zero Absoluto: Requer 5 Cristais, NÃO consome"
echo "  15 Dragão: 4d10 + 2×Cristais | Reroll supremo"
echo ""
echo "Para AntiGravity:"
echo "  bash DEPLOY_RESPIRACAO_NEVASCA.sh"
echo "═══════════════════════════════════════════════════════════════"
