/**
 * ═══════════════════════════════════════════════════════════════════
 * OMNI-SYSTEM - HUNTER HUD v103.0 (GOD ENGINE UPDATE)
 * THE HEPTAGON — MAKO-SYN05
 * ═══════════════════════════════════════════════════════════════════
 * NOVIDADES v103:
 * ✅ Phase 2 Limit Break (níveis 21-999 MMO Scale)
 * ✅ Ascension Locks (trava XP nos níveis 10, 20, 50, 99)
 * ✅ Dual-Check Crítico: Margem de Instinto + Fio da Abertura técnico
 * ✅ Pre-Roll Bonus Scanner (log automático de bônus ativos)
 * ✅ Incarnation Gauge visual (bar 0-100% + botão Milagre ≥80%)
 * ✅ Cosmo Engine (queima 1d10+ESP, risco de sobrecarga)
 * ✅ Núcleo de Origem (Stage I-VII tracker)
 * ✅ Integridade Espiritual (Caminho Sol & Sombra)
 * ✅ Resiliência da Arma (durabilidade dinâmica)
 * ✅ Aba Progressão (XP Combat/Fable/Skill + Ascensão)
 * ✅ OmniDataManager expandido: calculateXP, checkAscension, scanBonuses
 * ═══════════════════════════════════════════════════════════════════
 */

(async () => {
  // ═══════════════════════════════════════════════════════════════════
  // 1. SELEÇÃO DE ATOR — TOKEN FRIENDLY
  // ═══════════════════════════════════════════════════════════════════
  const getActor = () => {
    if (canvas?.tokens?.controlled?.[0]?.actor)
      return canvas.tokens.controlled[0].actor;
    if (game.user.character) return game.user.character;
    return null;
  };
  const actor = getActor();
  if (!actor)
    return ui.notifications.warn(
      "⚠️ Nenhuma ficha vinculada. Selecione um token.",
    );
  const APP_ID = `omni-hunter-hud-${actor.id}`;
  const existing = foundry.applications.instances?.get(APP_ID);
  if (existing) {
    await existing.close();
  }

  // ═══════════════════════════════════════════════════════════════════
  // 2. DATA MANAGER v103 — EXPANDIDO COM NOVOS MÉTODOS
  // ═══════════════════════════════════════════════════════════════════
  class OmniDataManager {
    constructor(actor) {
      this.actor = actor;
      this.flag = `omni_v102_${actor.id}`; // mesma flag = migração automática
      this._pendingSave = null;
    }

    get data() {
      const defaults = {
        version: "103.0",
        core: {
          hp: { v: 20, m: 20 },
          mp: { v: 10, m: 10 },
          stamina: { v: 10, m: 10 },
          momentum: { v: 10, m: 10 },
        },
        attr: { corpo: 1, mente: 1, espirito: 1 },
        combat: {
          ca: { base: 10, bonus: 0 },
          parry: { phase: 0, last_result: null },
          attack: { base_dmg: "1d8", mastery: 0 },
          crit_margin: 20,
        },
        pericias: {
          bonus_corpo: {
            acerto: 0,
            bloqueio: 0,
            esquiva: 0,
            iniciativa: 0,
            r_fisica: 0,
            atletismo: 0,
            acrobacia: 0,
            furtividade: 0,
            romper: 0,
            sobrecarga: 0,
            tr_fisico: 0,
            forca: 0,
          },
          bonus_mente: {
            percepcao: 0,
            medicina: 0,
            finta: 0,
            investigacao: 0,
            conhecimento: 0,
            tatica: 0,
            calma: 0,
            persuasao: 0,
            enganacao: 0,
            treino_mental: 0,
            intimidacao_m: 0,
          },
          bonus_espirito: {
            determinacao: 0,
            r_espiritual: 0,
            intimidacao_e: 0,
            foco: 0,
            conviccao: 0,
            meditacao: 0,
            sobrevivencia: 0,
            tr_espiritual: 0,
            vontade: 0,
          },
        },
        equipment: {
          head: null,
          chest: null,
          hands: null,
          legs: null,
          feet: null,
          main_hand: null,
          off_hand: null,
          ring1: null,
          ring2: null,
          acc: null,
        },
        hotbar: [null, null, null, null, null, null, null, null],
        inventory: [
          {
            id: "pot1",
            name: "Poção HP",
            qtd: 5,
            icon: "icons/consumables/potions/potion-red-common.webp",
            type: "consumable",
          },
          {
            id: "wep1",
            name: "Espada Inicial",
            qtd: 1,
            icon: "icons/weapons/swords/sword-iron.webp",
            type: "weapon",
            dmg: "1d6",
          },
        ],
        status: {
          buffs: [],
          debuffs: [],
          passivas: [
            {
              name: "Determinação de Ferro",
              desc: "Resistência a Medo",
              active: true,
            },
            { name: "Sentido de Caçador", desc: "+2 Percepção", active: true },
          ],
          conditions: [],
        },
        // [v103] INCARNATION
        incarnation: { valor: 50, active: true, collapsed: false, recovery: 0 },
        // [v103] COSMO
        cosmo: { current: 0, active_sense: "Nenhum", limit: 0 },
        // [v103] NÚCLEO DE ORIGEM
        nucleus: {
          stage: 0,
          color: "Preto",
          active: false,
          pressure: 0,
          evolution_points: 0,
          anchor_active: true,
          stages: [
            "Preto",
            "Vermelho",
            "Laranja",
            "Amarelo",
            "Prata",
            "Branco",
            "Púrpura",
          ],
        },
        // [v103] INTEGRIDADE ESPIRITUAL
        integridade: { valor: 80, conflito_acumulado: 0 },
        // [v103] PROGRESSÃO
        progression: {
          phase: 1,
          level: 1,
          origem: "humano",
          xp_combat: 0,
          xp_fable: 0,
          xp_skill: 0,
          ascended: { 10: true, 20: true, 50: true, 99: true },
        },
        // [v103] RESILIÊNCIA DA ARMA
        weapon_res: { current: 100, max: 100 },
        // [v103] SKILL TREE
        skills_tree: [],
        persona: {
          name: this.actor.name,
          class: "Hunter",
          level: 1,
          img: this.actor.img,
          origin: "Humano",
          rank: "Aspirante",
        },
        ui: { activeTab: "combate" },
      };
      const saved = this.actor.getFlag("world", this.flag) || {};
      const d = foundry.utils.mergeObject(defaults, saved, {
        insertKeys: true,
        insertValues: true,
        overwrite: true,
      });
      if (!Array.isArray(d.inventory)) d.inventory = defaults.inventory;
      if (!Array.isArray(d.hotbar)) d.hotbar = defaults.hotbar;
      if (!d.combat?.ca) d.combat.ca = defaults.combat.ca;
      if (!d.pericias) d.pericias = defaults.pericias;
      if (!d.status) d.status = defaults.status;
      if (!Array.isArray(d.status?.buffs)) d.status.buffs = [];
      if (!Array.isArray(d.status?.debuffs)) d.status.debuffs = [];
      if (!Array.isArray(d.status?.passivas))
        d.status.passivas = defaults.status.passivas;
      if (!Array.isArray(d.skills_tree)) d.skills_tree = [];
      return d;
    }

    async save(newData) {
      await this.actor.setFlag("world", this.flag, newData);
    }
    debouncedSave(newData) {
      clearTimeout(this._pendingSave);
      this._pendingSave = setTimeout(async () => {
        await this.actor.setFlag("world", this.flag, newData);
      }, 400);
    }
    async update(path, val) {
      const d = this.data;
      foundry.utils.setProperty(d, path, val);
      await this.save(d);
    }
    updateDebounced(path, val) {
      const d = this.data;
      foundry.utils.setProperty(d, path, val);
      this.debouncedSave(d);
    }

    // ─────────────────────────────────────────────────────────────────
    // [SINON] calculateXP() — Retorna XP necessário para próximo nível
    // Phase 1 (1-20): (Level^2) * 100
    // Phase 2 (21-999): (Level^3) * 500
    // ─────────────────────────────────────────────────────────────────
    calculateXP(level) {
      if (level <= 20) return Math.pow(level, 2) * 100;
      return Math.pow(level, 3) * 500;
    }

    getTotalXP(d) {
      return (
        d.progression.xp_combat +
        d.progression.xp_fable +
        d.progression.xp_skill
      );
    }

    getXPProgress(d) {
      const lvl = d.progression.level;
      const total = this.getTotalXP(d);
      const needed = this.calculateXP(lvl);
      const prev = lvl > 1 ? this.calculateXP(lvl - 1) : 0;
      const inThisLevel = total - prev;
      const needed_this = needed - prev;
      const pct = Math.min(
        100,
        Math.max(0, Math.floor((inThisLevel / needed_this) * 100)),
      );
      return {
        current: inThisLevel,
        needed: needed_this,
        pct,
        canLevel: inThisLevel >= needed_this,
      };
    }

    // ─────────────────────────────────────────────────────────────────
    // [SINON] checkAscension() — Verifica locks de Ascensão
    // Trava nos níveis 10, 20, 50, 99 se não ascendeu
    // ─────────────────────────────────────────────────────────────────
    ASCENSION_CAPS = [10, 20, 50, 99];

    checkAscension(d) {
      const lvl = d.progression.level;
      if (this.ASCENSION_CAPS.includes(lvl)) {
        const key = String(lvl);
        if (d.progression.ascended[key] === false) {
          return { locked: true, cap: lvl };
        }
      }
      return { locked: false, cap: null };
    }

    async grantAscension(level) {
      const d = this.data;
      d.progression.ascended[String(level)] = true;
      await this.save(d);
      ChatMessage.create({
        content: `
            <div style="border:2px solid #FFD700;padding:12px;background:#0a0a0f;text-align:center;">
                <h2 style="color:#FFD700;margin:0;">⚡ ASCENSÃO CONCEDIDA</h2>
                <p style="color:#00D9FF;">Nível ${level} desbloqueado pelo Mestre</p>
            </div>`,
      });
    }

    async tryLevelUp(app) {
      const d = this.data;
      const ascCheck = this.checkAscension(d);
      if (ascCheck.locked) {
        ui.notifications.warn(
          `⚠️ TESTE DE ASCENSÃO DISPONÍVEL — Nível ${ascCheck.cap} bloqueado!`,
        );
        ChatMessage.create({
          content: `
                <div style="border:2px solid #FF2B4A;padding:10px;background:#0a0a0f;">
                    <b style="color:#FF2B4A;">⚠️ TESTE DE ASCENSÃO DISPONÍVEL</b><br>
                    <span style="color:#AAA;">${d.persona.name} atingiu o cap de Nível ${ascCheck.cap}. O Mestre deve conceder a Ascensão.</span>
                </div>`,
        });
        return false;
      }
      const xpCheck = this.getXPProgress(d);
      if (!xpCheck.canLevel) {
        ui.notifications.info(
          `XP insuficiente (${xpCheck.current}/${xpCheck.needed_this})`,
        );
        return false;
      }
      const oldLevel = d.progression.level;
      d.progression.level++;
      d.persona.level = d.progression.level;
      const newLevel = d.progression.level;
      d.progression.phase = newLevel > 20 ? 2 : 1;
      this.recalcHP(d);
      await this.save(d);
      ui.notifications.info(`🎉 Level Up! ${oldLevel} → ${newLevel}`);
      ChatMessage.create({
        content: `
            <div style="border:2px solid #FFD700;padding:12px;background:#0a0a0f;text-align:center;">
                <h2 style="color:#FFD700;">🎉 LEVEL UP!</h2>
                <p style="color:#00D9FF;">${d.persona.name}: Nível ${oldLevel} → <b style="color:#FFD700;">${newLevel}</b></p>
                <p style="color:#888;">Phase: ${d.progression.phase === 2 ? "⚡ LIMIT BREAK" : "Hashira"}</p>
            </div>`,
      });
      if (app?.render) app.render();
      return true;
    }

    // [SINON] Recalcula HP seguindo fórmula Blueprint
    recalcHP(d) {
      const ORIGENS = {
        humano: { pv: 8, pc: 6 },
        meio_oni: { pv: 10, pc: 4 },
        linhagem_solar: { pv: 6, pc: 8 },
        hibrido_lua: { pv: 7, pc: 7 },
      };
      const PICOS = [4, 8, 12, 16, 19, 20];
      const base = ORIGENS[d.progression.origem] || ORIGENS.humano;
      const cor = d.attr.corpo;
      const esp = d.attr.espirito;
      const modCor = Math.floor((cor - 10) / 2);
      const modEsp = Math.floor((esp - 10) / 2);
      const level = d.progression.level;

      if (level <= 20) {
        // Phase 1: Hashira (fórmula Calejamento + Iluminação)
        let pv = base.pv + modCor;
        let pc = base.pc + modEsp;
        for (let lvl = 2; lvl <= level; lvl++) {
          if (PICOS.includes(lvl)) {
            pv += base.pv + cor + esp;
            pc += base.pc + cor + esp;
          } else {
            pv += 6 + modCor;
            pc += 6 + modEsp;
          }
        }
        d.core.hp.m = pv;
        d.core.mp.m = pc;
      } else {
        // Phase 2: Limit Break MMO
        const prevPV = d.core.hp.m;
        d.core.hp.m = prevPV + 50 + modCor * 10;
        d.core.mp.m = d.core.mp.m + 30 + modEsp * 10;
      }
    }

    // ─────────────────────────────────────────────────────────────────
    // [SINON] scanBonuses() — Pre-Roll Scanner
    // Lê actor.system.props (CSB) + flags para bônus ativos
    // ─────────────────────────────────────────────────────────────────
    scanBonuses(d, rollType = "attack") {
      const bonuses = [];
      const props = this.actor.system?.props || {};
      const cor = d.attr.corpo;
      const esp = d.attr.espirito;

      // Concentração (+2 COR se ativa via prop CSB)
      if (props.concentracao_ativa || d.combat?.concentracao) {
        bonuses.push({
          label: "Concentração Total",
          value: 2,
          attr: "COR",
          color: "#00D9FF",
        });
      }

      // Núcleo de Origem — Rank bonuses
      const nucleusStage = d.nucleus?.stage || 0;
      if (nucleusStage >= 1 && d.nucleus?.active) {
        // Stage I (Preto): +2 Iniciativa/Percepção
        if (rollType === "percepcao" || rollType === "iniciativa") {
          bonuses.push({
            label: "Núcleo Preto (Stage I)",
            value: 2,
            attr: "Percepção",
            color: "#888888",
          });
        }
        // Stage II (Vermelho / Mizunoto): +4 Dano Fixo
        if (
          nucleusStage >= 2 &&
          (rollType === "attack" || rollType === "damage")
        ) {
          bonuses.push({
            label: "Núcleo Vermelho (Stage II)",
            value: 4,
            attr: "Dano",
            color: "#FF2B4A",
          });
        }
        // Stage III (Laranja / Mizunoe): +3 Defesa
        if (
          nucleusStage >= 3 &&
          (rollType === "esquiva" || rollType === "bloqueio")
        ) {
          bonuses.push({
            label: "Núcleo Laranja (Stage III)",
            value: 3,
            attr: "Defesa",
            color: "#FF8C00",
          });
        }
        // Stage IV (Amarelo / Kanoto): RD 2
        if (nucleusStage >= 4) {
          bonuses.push({
            label: "Núcleo Amarelo (Stage IV)",
            value: 2,
            attr: "RD",
            color: "#FFD700",
          });
        }
        // Stage V (Prata / Hinoto): +4 Acerto
        if (nucleusStage >= 5 && rollType === "attack") {
          bonuses.push({
            label: "Núcleo Prata (Stage V)",
            value: 4,
            attr: "Acerto",
            color: "#C0C0C0",
          });
        }
        // Stage VI (Branco / Kinoe): RD 4
        if (nucleusStage >= 6) {
          bonuses.push({
            label: "Núcleo Branco (Stage VI)",
            value: 4,
            attr: "RD",
            color: "#FFFFFF",
          });
        }
      }

      // Armadura Passivas
      const chest = d.equipment?.chest;
      if (chest?.type === "leve" && rollType === "esquiva") {
        bonuses.push({
          label: "Armadura Leve",
          value: 2,
          attr: "Esquiva",
          color: "#2EFF7A",
        });
      }
      if (chest?.type === "media") {
        bonuses.push({
          label: "Armadura Média",
          value: 1,
          attr: "RD",
          color: "#A0A0A0",
        });
      }
      if (chest?.type === "pesada") {
        bonuses.push({
          label: "Armadura Pesada",
          value: 3,
          attr: "RD",
          color: "#808080",
        });
      }

      // Incarnation > 80%: sucesso automático disponível
      if (d.incarnation?.valor >= 80 && !d.incarnation?.collapsed) {
        bonuses.push({
          label: "✨ INCARNATION (Milagre Disponível)",
          value: 0,
          attr: "Auto-Sucesso",
          color: "#A855F7",
        });
      }

      // Integridade: penalidade se < 20
      if (d.integridade?.valor < 20) {
        bonuses.push({
          label: "⚠️ Dissonância Pulmonar",
          value: -2,
          attr: "PC",
          color: "#FF2B4A",
        });
      }

      return bonuses;
    }

    buildBonusLog(d, rollType) {
      const bonuses = this.scanBonuses(d, rollType);
      if (bonuses.length === 0) return "";
      const lines = bonuses
        .map(
          (b) =>
            `<div style="color:${b.color};font-size:11px;padding:2px 0;">
                ✨ BÔNUS ATIVO: <b>${b.value >= 0 ? "+" : ""}${b.value || "∞"}</b> ${b.attr} — <em>${b.label}</em>
            </div>`,
        )
        .join("");
      return `<div style="border:1px solid #2A2F3E;padding:6px;background:#111;margin-top:6px;border-radius:4px;">${lines}</div>`;
    }
  }

  const sys = new OmniDataManager(actor);

  // ═══════════════════════════════════════════════════════════════════
  // 3. CSS — MANHWA DARK + NOVOS COMPONENTES v103
  // ═══════════════════════════════════════════════════════════════════
  const CSS_ID = "omni-hud-style-v103";
  if (!document.getElementById(CSS_ID)) {
    const style = document.createElement("style");
    style.id = CSS_ID;
    style.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&family=Exo+2:wght@400;600;900&display=swap');
:root {
    --gold:#FFD700;--dark:#0A0E1A;--blue:#00D9FF;--purple:#A855F7;
    --red:#FF2B4A;--green:#2EFF7A;--mid:#151922;--border:#2A2F3E;
    --text:#CDD6F4;--orange:#FF8C00;--silver:#C0C0C0;
}
.omni-root{display:grid;grid-template-columns:210px 1fr 56px;grid-template-rows:52px 1fr;
    height:100%;min-height:640px;background:var(--dark);color:var(--text);
    font-family:'Rajdhani',sans-serif;font-size:13px;overflow:hidden;user-select:none;}
.o-left{grid-column:1;grid-row:1/3;background:#0D1117;border-right:2px solid var(--gold);
    display:flex;flex-direction:column;gap:10px;padding:12px;overflow-y:auto;}
.av-wrap{width:100%;aspect-ratio:3/4;background:#000 center/cover no-repeat;
    border:2px solid var(--gold);box-shadow:0 0 12px rgba(255,215,0,.25);
    cursor:pointer;position:relative;overflow:hidden;}
.av-wrap:hover::after{content:'📷 Trocar';position:absolute;inset:0;background:rgba(0,0,0,.7);
    display:flex;align-items:center;justify-content:center;font-size:11px;color:var(--gold);}
.o-name{text-align:center;}
.o-name h2{margin:0;color:var(--gold);font-family:'Exo 2';font-size:15px;}
.o-name small{color:#666;font-size:10px;}
.attr-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;}
.attr-cell{background:#1A2030;border:1px solid var(--border);text-align:center;padding:5px 2px;
    border-radius:4px;cursor:pointer;transition:.15s;}
.attr-cell:hover{border-color:var(--blue);}
.attr-cell small{display:block;font-size:9px;color:#666;font-weight:700;}
.attr-cell b{font-size:18px;color:var(--blue);font-family:'Orbitron';}
.attr-cell .mod{font-size:11px;color:#888;}
.ca-block{background:#0a0f1a;border:2px solid var(--blue);border-radius:6px;padding:8px;
    text-align:center;box-shadow:0 0 8px rgba(0,217,255,.2);}
.ca-block small{font-size:9px;color:var(--blue);font-weight:700;letter-spacing:1px;}
.ca-value{font-size:32px;font-family:'Orbitron';color:#FFF;font-weight:900;line-height:1;}
.ca-block .ca-sub{font-size:10px;color:#555;margin-top:2px;}
.momentum-block{background:#1a1500;border:1px solid #554400;border-radius:6px;
    padding:8px;text-align:center;margin-top:auto;}
.momentum-block small{font-size:9px;color:#AAA;}
.momentum-val{font-size:24px;color:var(--gold);font-weight:900;font-family:'Orbitron';}
.btn-row{display:flex;gap:4px;margin-top:4px;}
.btn-sm{flex:1;background:#222;color:#FFF;border:1px solid #444;padding:4px;cursor:pointer;
    border-radius:3px;font-size:14px;transition:.15s;}
.btn-sm:hover{background:#333;border-color:var(--gold);}
.o-header{grid-column:2;grid-row:1;background:#0D1117;border-bottom:2px solid var(--border);
    display:flex;align-items:center;gap:0;padding:0 8px;overflow:hidden;}
.hbar-item{flex:1;text-align:center;padding:4px 2px;}
.hbar-item span{display:block;font-size:9px;color:#555;font-weight:700;letter-spacing:.5px;text-transform:uppercase;}
.hbar-item b{font-size:15px;font-family:'Orbitron';}
.hbar-div{width:1px;height:30px;background:var(--border);}
.o-main{grid-column:2;grid-row:2;background:#0F1419;display:flex;flex-direction:column;overflow:hidden;}
.tab-pane{flex:1;padding:16px;overflow-y:auto;display:none;animation:fadeSlide .18s ease;}
.tab-pane.active{display:block;}
@keyframes fadeSlide{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
.o-nav{grid-column:3;grid-row:1/3;background:#0D1117;border-left:1px solid var(--border);
    display:flex;flex-direction:column;align-items:center;padding-top:10px;gap:6px;}
.nav-btn{width:44px;height:44px;background:#1A1F2E;border:1px solid var(--border);color:#555;
    display:flex;align-items:center;justify-content:center;font-size:17px;cursor:pointer;
    transition:.15s;border-radius:4px;position:relative;}
.nav-btn:hover{color:var(--gold);border-color:var(--gold);background:#222;}
.nav-btn.active{background:#111;color:var(--gold);border-color:var(--gold);box-shadow:0 0 8px rgba(255,215,0,.3);}
.nav-btn .nav-tip{display:none;position:absolute;right:52px;top:50%;transform:translateY(-50%);
    background:#111;border:1px solid var(--gold);color:var(--gold);padding:3px 8px;border-radius:4px;
    font-size:10px;white-space:nowrap;font-family:'Rajdhani';pointer-events:none;z-index:100;}
.nav-btn:hover .nav-tip{display:block;}
.sec-title{font-family:'Orbitron';color:var(--gold);border-bottom:1px solid var(--border);
    margin-bottom:12px;padding-bottom:6px;font-size:11px;letter-spacing:1px;}
.res-bar-wrap{margin-bottom:10px;}
.res-bar-label{display:flex;justify-content:space-between;margin-bottom:3px;font-size:11px;}
.res-bar{height:16px;background:#1A1A2E;border:1px solid var(--border);border-radius:3px;overflow:hidden;position:relative;}
.res-bar-fill{height:100%;transition:width .3s ease;}
.res-bar-text{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
    font-size:10px;color:#FFF;font-weight:700;text-shadow:0 0 4px #000;}
.omni-input{background:#1A1F2E;border:1px solid var(--border);color:var(--text);padding:4px 6px;
    font-family:'Rajdhani';font-size:13px;border-radius:3px;width:100%;box-sizing:border-box;}
.omni-input:focus{outline:none;border-color:var(--gold);}
.stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px;}
.stat-card{background:#1A1F2E;border:1px solid var(--border);border-radius:4px;padding:8px;text-align:center;}
.stat-card small{font-size:9px;color:#555;font-weight:700;letter-spacing:.5px;text-transform:uppercase;}
.stat-card .sv{font-size:20px;font-family:'Orbitron';font-weight:900;}
.stat-card .sv.hp{color:var(--red);}
.stat-card .sv.mp{color:var(--blue);}
.stat-card .sv.sta{color:var(--green);}
.stat-card .sv.mom{color:var(--gold);}
.stat-edit{display:flex;align-items:center;gap:4px;margin-top:4px;}
.stat-edit input{width:50px;text-align:center;}
/* INCARNATION */
.inc-bar-wrap{margin:8px 0;}
.inc-bar{height:20px;background:#1A1A2E;border:1px solid var(--purple);border-radius:3px;overflow:hidden;position:relative;}
.inc-bar-fill{height:100%;transition:width .5s ease;}
.inc-bar-text{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
    font-size:10px;color:#FFF;font-weight:700;}
.inc-miracle-btn{width:100%;background:linear-gradient(90deg,#4A0080,#A855F7);
    border:2px solid var(--purple);color:#FFF;padding:8px;cursor:pointer;
    font-family:'Orbitron';font-size:11px;border-radius:4px;margin-top:6px;
    box-shadow:0 0 12px rgba(168,85,247,.4);transition:.2s;}
.inc-miracle-btn:hover{box-shadow:0 0 20px rgba(168,85,247,.7);}
.inc-miracle-btn:disabled{opacity:.3;cursor:default;}
/* COSMO */
.cosmo-num{font-size:48px;font-family:'Orbitron';font-weight:900;text-align:center;
    text-shadow:0 0 20px currentColor;line-height:1;padding:10px 0;}
/* NÚCLEO */
.nucleus-stage{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0;}
.ns-dot{width:32px;height:32px;border-radius:50%;border:2px solid #333;cursor:pointer;
    transition:.2s;display:flex;align-items:center;justify-content:center;font-size:10px;
    font-weight:700;}
.ns-dot.active{box-shadow:0 0 10px currentColor;border-color:currentColor;}
/* INTEGRIDADE */
.integr-bar{height:24px;background:#1A1A2E;border:1px solid var(--border);border-radius:3px;overflow:hidden;position:relative;}
.integr-fill{height:100%;transition:width .5s;}
.integr-text{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
    font-size:11px;color:#FFF;font-weight:700;}
/* RESILIÊNCIA */
.res-states{display:flex;gap:6px;margin-top:6px;}
.res-state-btn{flex:1;padding:4px;text-align:center;font-size:10px;font-weight:700;
    border-radius:3px;border:1px solid;cursor:pointer;transition:.15s;}
/* PROGRESSÃO */
.xp-bar{height:18px;background:#1A1A2E;border:1px solid var(--gold);border-radius:3px;overflow:hidden;position:relative;margin:8px 0;}
.xp-fill{height:100%;background:linear-gradient(90deg,#554400,var(--gold));transition:width .5s;}
.xp-text{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
    font-size:10px;color:#FFF;font-weight:700;}
.xp-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin:10px 0;}
.xp-card{background:#1A1F2E;border:1px solid var(--border);border-radius:4px;padding:8px;text-align:center;}
.xp-card small{font-size:9px;color:#555;font-weight:700;text-transform:uppercase;}
.xp-card b{display:block;font-size:16px;font-family:'Orbitron';color:var(--gold);}
.ascension-alert{background:#1a0505;border:2px solid var(--red);border-radius:6px;padding:10px;text-align:center;margin:10px 0;}
/* EQUIP SLOTS */
.equip-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px;}
.equip-slot{background:#1A1F2E;border:2px dashed var(--border);border-radius:4px;padding:8px;
    text-align:center;cursor:pointer;min-height:60px;display:flex;flex-direction:column;
    align-items:center;justify-content:center;transition:.2s;}
.equip-slot.filled{border-style:solid;border-color:var(--gold);}
.equip-slot:hover{border-color:var(--blue);}
.equip-slot img{width:36px;height:36px;object-fit:contain;}
.equip-slot-label{font-size:9px;color:#444;font-weight:700;letter-spacing:.5px;text-transform:uppercase;}
.equip-slot-name{font-size:11px;color:var(--text);margin-top:2px;}
/* HOTBAR */
.hotbar-row{display:flex;gap:4px;}
.hotbar-slot{width:48px;height:48px;background:#1A1F2E;border:2px dashed var(--border);
    border-radius:4px;display:flex;align-items:center;justify-content:center;
    cursor:pointer;transition:.2s;position:relative;overflow:hidden;}
.hotbar-slot.filled{border-style:solid;border-color:var(--gold);}
.hotbar-slot:hover{border-color:var(--blue);}
.hotbar-slot img{width:40px;height:40px;object-fit:contain;}
.hotbar-slot .slot-num{position:absolute;top:1px;left:3px;font-size:9px;color:#555;font-weight:700;}
/* PERÍCIAS */
.peri-group{margin-bottom:14px;}
.peri-group-title{font-family:'Orbitron';font-size:10px;font-weight:700;letter-spacing:1px;margin-bottom:6px;padding:4px 6px;border-radius:3px;}
.peri-row{display:flex;align-items:center;gap:6px;margin-bottom:4px;padding:3px 6px;
    background:#1A1F2E;border-radius:3px;cursor:pointer;transition:.15s;}
.peri-row:hover{background:#222;border-left:2px solid var(--gold);}
.peri-name{flex:1;font-size:12px;}
.peri-bonus-input{width:40px;text-align:center;font-size:12px;}
/* SKILL TREE */
.skill-drop-area{min-height:80px;border:2px dashed var(--purple);border-radius:6px;padding:10px;
    text-align:center;color:#555;margin-bottom:10px;transition:.2s;}
.skill-drop-area.dragover{border-color:var(--gold);background:rgba(255,215,0,.05);}
.skill-cards{display:grid;grid-template-columns:1fr 1fr;gap:6px;}
.skill-card{background:#1A1F2E;border:1px solid var(--purple);border-radius:6px;padding:8px;
    cursor:pointer;transition:.2s;position:relative;}
.skill-card:hover{border-color:var(--gold);box-shadow:0 0 8px rgba(255,215,0,.2);}
.skill-card img{width:32px;height:32px;float:left;margin-right:8px;}
.skill-card-name{font-size:12px;font-weight:700;color:var(--text);}
.skill-card-type{font-size:10px;color:#555;}
.skill-card-remove{position:absolute;top:4px;right:4px;background:none;border:none;
    color:#555;cursor:pointer;font-size:12px;}
.skill-card-remove:hover{color:var(--red);}
/* INVENTÁRIO */
.inv-row{display:flex;align-items:center;gap:8px;padding:6px;background:#1A1F2E;
    border-radius:4px;margin-bottom:4px;cursor:pointer;transition:.15s;}
.inv-row:hover{background:#222;}
.inv-row img{width:28px;height:28px;object-fit:contain;}
.inv-name{flex:1;font-size:12px;}
.inv-qtd{font-size:11px;color:#888;}
/* STATUS PILLS */
.status-pills{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;}
.spill{padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;
    cursor:pointer;border:1px solid;transition:.15s;}
.spill.buff{background:rgba(46,255,122,.1);border-color:var(--green);color:var(--green);}
.spill.debuff{background:rgba(255,43,74,.1);border-color:var(--red);color:var(--red);}
.spill.passiva{background:rgba(0,217,255,.1);border-color:var(--blue);color:var(--blue);}
/* DUAL CRIT BADGE */
.crit-badge{display:inline-block;padding:2px 6px;border-radius:3px;font-size:10px;font-weight:700;}
.crit-badge.instinto{background:rgba(255,215,0,.2);border:1px solid var(--gold);color:var(--gold);}
.crit-badge.tecnico{background:rgba(168,85,247,.2);border:1px solid var(--purple);color:var(--purple);}
.fio-label{color:var(--purple);font-size:11px;font-weight:700;}
/* GENERAL BUTTONS */
.btn-action{background:#1A1F2E;border:1px solid var(--border);color:var(--text);padding:6px 12px;
    cursor:pointer;border-radius:4px;font-family:'Rajdhani';font-size:13px;transition:.15s;text-align:center;}
.btn-action:hover{border-color:var(--gold);color:var(--gold);}
.btn-action.primary{background:rgba(255,215,0,.1);border-color:var(--gold);color:var(--gold);}
.btn-action.primary:hover{background:rgba(255,215,0,.2);box-shadow:0 0 8px rgba(255,215,0,.3);}
.btn-action.danger{border-color:var(--red);color:var(--red);}
.btn-action.danger:hover{background:rgba(255,43,74,.1);}
.btn-action.blue{border-color:var(--blue);color:var(--blue);}
.btn-action.blue:hover{background:rgba(0,217,255,.1);}
.full-btn{width:100%;display:block;margin-bottom:6px;}
`;
    document.head.appendChild(style);
  }

  // ═══════════════════════════════════════════════════════════════════
  // 4. HTML BUILDERS — TODAS AS ABAS
  // ═══════════════════════════════════════════════════════════════════

  function buildHeader(d) {
    const modCor = Math.floor((d.attr.corpo - 10) / 2);
    const modEsp = Math.floor((d.attr.espirito - 10) / 2);
    const modMen = Math.floor((d.attr.mente - 10) / 2);
    const caTotal = d.combat.ca.base + d.combat.ca.bonus;
    return `
    <div class="o-header">
        <div class="hbar-item"><span>PV</span><b style="color:#FF2B4A">${d.core.hp.v}/${d.core.hp.m}</b></div>
        <div class="hbar-div"></div>
        <div class="hbar-item"><span>PC</span><b style="color:#00D9FF">${d.core.mp.v}/${d.core.mp.m}</b></div>
        <div class="hbar-div"></div>
        <div class="hbar-item"><span>STA</span><b style="color:#2EFF7A">${d.core.stamina.v}/${d.core.stamina.m}</b></div>
        <div class="hbar-div"></div>
        <div class="hbar-item"><span>CA</span><b style="color:#FFD700">${caTotal}</b></div>
        <div class="hbar-div"></div>
        <div class="hbar-item"><span>LEVEL</span><b style="color:#A855F7">${d.progression.level}</b></div>
        <div class="hbar-div"></div>
        <div class="hbar-item"><span>FASE</span><b style="font-size:11px;color:${d.progression.phase === 2 ? "#FF8C00" : "#888"}">${d.progression.phase === 2 ? "⚡LB" : "Hash."}</b></div>
    </div>`;
  }

  function buildLeft(d) {
    const mod = (v) => (v >= 0 ? "+" : "") + Math.floor((v - 10) / 2);
    const caTotal = d.combat.ca.base + d.combat.ca.bonus;
    const intColor =
      d.integridade.valor >= 80
        ? "#FFD700"
        : d.integridade.valor >= 45
          ? "#2EFF7A"
          : d.integridade.valor >= 20
            ? "#FF8C00"
            : "#FF2B4A";
    const nucColors = [
      "#888888",
      "#FF2B4A",
      "#FF8C00",
      "#FFD700",
      "#C0C0C0",
      "#FFFFFF",
      "#A855F7",
    ];
    const nucColor = nucColors[d.nucleus.stage] || "#444";
    return `
    <div class="av-wrap" data-action="change-avatar" style="background-image:url('${d.persona.img}')"></div>
    <div class="o-name">
        <h2>${d.persona.name}</h2>
        <small>${d.persona.class} — ${d.persona.rank}</small>
        <small style="display:block;color:${d.progression.phase === 2 ? "#FF8C00" : "#555"}">
            ${d.progression.phase === 2 ? "⚡ LIMIT BREAK" : "Hashira Path"}
        </small>
    </div>
    <div class="attr-row">
        <div class="attr-cell" data-action="roll-attr" data-attr="corpo">
            <small>CORPO</small><b>${d.attr.corpo}</b><div class="mod">${mod(d.attr.corpo)}</div>
        </div>
        <div class="attr-cell" data-action="roll-attr" data-attr="mente">
            <small>MENTE</small><b>${d.attr.mente}</b><div class="mod">${mod(d.attr.mente)}</div>
        </div>
        <div class="attr-cell" data-action="roll-attr" data-attr="espirito">
            <small>ESPÍRITO</small><b>${d.attr.espirito}</b><div class="mod">${mod(d.attr.espirito)}</div>
        </div>
    </div>
    <div class="ca-block">
        <small>CLASSE DE ARMADURA</small>
        <div class="ca-value">${caTotal}</div>
        <div class="ca-sub">Base ${d.combat.ca.base} + Bônus ${d.combat.ca.bonus}</div>
    </div>
    <!-- INTEGRIDADE ESPIRITUAL mini -->
    <div style="margin-top:4px;">
        <div style="font-size:9px;color:${intColor};font-weight:700;letter-spacing:.5px;">INTEGRIDADE ESPIRITUAL</div>
        <div class="integr-bar" style="margin-top:3px;">
            <div class="integr-fill" style="width:${d.integridade.valor}%;background:${intColor};"></div>
            <div class="integr-text">${d.integridade.valor}/100</div>
        </div>
    </div>
    <!-- NÚCLEO mini badge -->
    <div style="margin-top:4px;text-align:center;">
        <div style="font-size:9px;color:#555;font-weight:700;letter-spacing:.5px;">NÚCLEO DE ORIGEM</div>
        <div style="font-size:11px;margin-top:2px;color:${nucColor};font-weight:700;">
            ${d.nucleus.active ? "⚡" : "○"} Stage ${d.nucleus.stage} — ${d.nucleus.stages?.[d.nucleus.stage] || "Inativo"}
        </div>
    </div>
    <div class="momentum-block">
        <small>MOMENTUM</small>
        <div class="momentum-val">${d.core.momentum.v}</div>
        <div class="btn-row">
            <button class="btn-sm" data-action="momentum-add">+</button>
            <button class="btn-sm" data-action="momentum-use">−</button>
        </div>
    </div>`;
  }

  function buildTabCombate(d) {
    const modCor = Math.floor((d.attr.corpo - 10) / 2);
    const modEsp = Math.floor((d.attr.espirito - 10) / 2);
    const incColor =
      d.incarnation.valor >= 80
        ? "#A855F7"
        : d.incarnation.valor >= 50
          ? "#6A35A0"
          : "#333";
    const incFill = `linear-gradient(90deg,#3A0070,${d.incarnation.valor >= 80 ? "#FFD700" : "#A855F7"})`;
    const cosmoLimit = (d.attr.espirito + d.attr.corpo) * 2;
    const cosmoOverload = d.cosmo.current > cosmoLimit;
    const cosmoColor = cosmoOverload
      ? "#FF2B4A"
      : d.cosmo.current >= 50
        ? "#FFD700"
        : d.cosmo.current >= 20
          ? "#00D9FF"
          : "#888";
    const cosmoSense =
      d.cosmo.current >= 50
        ? "⚡ 8° Sentido (Arayashiki)"
        : d.cosmo.current >= 20
          ? "🌀 7° Sentido (Vantagem)"
          : "Normal";
    const resColor =
      d.weapon_res.current >= 60
        ? "#00D9FF"
        : d.weapon_res.current >= 30
          ? "#FF8C00"
          : "#FF2B4A";
    const resPct = Math.max(
      0,
      Math.min(100, (d.weapon_res.current / d.weapon_res.max) * 100),
    );
    const resState =
      d.weapon_res.current >= 60
        ? "Íntegra"
        : d.weapon_res.current >= 30
          ? "Fadigada"
          : d.weapon_res.current > 0
            ? "⚠️ Crítica"
            : "💀 Quebrada";
    return `
    <div class="sec-title">⚔️ COMBATE — AÇÕES</div>
    <div class="stat-grid">
        <button class="btn-action primary" data-action="roll-attack" style="grid-column:span 2">⚔️ ATACAR (d20)</button>
        <button class="btn-action blue" data-action="roll-damage">💥 DANO (${d.combat.attack.base_dmg})</button>
        <button class="btn-action" data-action="roll-esquiva">🌀 ESQUIVA</button>
        <button class="btn-action" data-action="roll-bloqueio">🛡️ BLOQUEIO</button>
        <button class="btn-action" data-action="roll-parry">⚡ PARRY</button>
    </div>
    <div style="display:flex;gap:6px;margin-bottom:10px;align-items:center;">
        <div style="font-size:11px;color:#555;">Margem Crit:</div>
        <input class="omni-input" type="number" style="width:50px;"
            data-path="combat.crit_margin" value="${d.combat.crit_margin}">
        <div style="font-size:11px;color:#555;">Dano Base:</div>
        <input class="omni-input" type="text" style="width:70px;"
            data-path="combat.attack.base_dmg" value="${d.combat.attack.base_dmg}">
    </div>

    <div class="sec-title">🌌 INCARNATION — MOTOR DA VONTADE</div>
    <div class="inc-bar-wrap">
        <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
            <span style="font-size:11px;color:#A855F7;font-weight:700;">Convicção</span>
            <span style="font-size:11px;color:${incColor};font-weight:700;">${d.incarnation.valor}% ${d.incarnation.collapsed ? "[COLAPSO]" : ""}</span>
        </div>
        <div class="inc-bar">
            <div class="inc-bar-fill" style="width:${d.incarnation.valor}%;background:${incFill};"></div>
            <div class="inc-bar-text">${d.incarnation.valor}%</div>
        </div>
    </div>
    <div style="display:flex;gap:4px;margin-bottom:6px;flex-wrap:wrap;">
        <button class="btn-action" data-action="inc-vitoria" style="font-size:11px;">✅ Vitória (+10%)</button>
        <button class="btn-action danger" data-action="inc-dano" style="font-size:11px;">💥 Dano (−5%)</button>
        <button class="btn-action danger" data-action="inc-medo" style="font-size:11px;">😨 Medo (−20%)</button>
        <button class="btn-action danger" data-action="inc-aliado" style="font-size:11px;">💔 Aliado (−15%)</button>
    </div>
    <button class="inc-miracle-btn" data-action="inc-milagre"
        ${d.incarnation.valor < 80 || d.incarnation.collapsed ? "disabled" : ""}>
        ✨ SOBRESCREVER REALIDADE ${d.incarnation.valor < 80 ? "(Req: 80%)" : ""}
    </button>

    <div class="sec-title" style="margin-top:12px;">🔥 O COSMO</div>
    <div class="cosmo-num" style="color:${cosmoColor}">${d.cosmo.current}</div>
    <div style="text-align:center;font-size:11px;color:${cosmoColor};margin-bottom:8px;">
        ${cosmoSense} | Limite: ${cosmoLimit}${cosmoOverload ? ` <span style="color:#FF2B4A;">⚠️ SOBRECARGA!</span>` : ""}
    </div>
    <div class="res-bar" style="margin-bottom:8px;border-color:#00D9FF;">
        <div class="res-bar-fill" style="width:${Math.min(100, (d.cosmo.current / Math.max(1, cosmoLimit)) * 100)}%;background:${cosmoColor};"></div>
        <div class="res-bar-text">${d.cosmo.current}/${cosmoLimit}</div>
    </div>
    <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:10px;">
        <button class="btn-action primary full-btn" data-action="cosmo-burn">🔥 Queimar (+1d10+ESP)</button>
        <button class="btn-action blue" data-action="cosmo-atom" style="flex:1;font-size:11px;">⚛️ Destruição Atômica (−5)</button>
        <button class="btn-action" data-action="cosmo-speed" style="flex:1;font-size:11px;">⚡ Velocidade (−10)</button>
        <button class="btn-action danger" data-action="cosmo-reset" style="font-size:11px;">↺</button>
    </div>

    <div class="sec-title">🛡️ RESILIÊNCIA DA ARMA</div>
    <div class="res-bar-wrap">
        <div class="res-bar-label">
            <span style="color:${resColor};font-weight:700;">${resState}</span>
            <span style="color:${resColor};">${d.weapon_res.current}/${d.weapon_res.max}</span>
        </div>
        <div class="res-bar" style="border-color:${resColor};">
            <div class="res-bar-fill" style="width:${resPct}%;background:${resColor};"></div>
        </div>
    </div>
    <div class="res-states">
        <button class="btn-action" data-action="res-ataque" style="font-size:10px;">Ataque (−1)</button>
        <button class="btn-action" data-action="res-bloqueio" style="font-size:10px;">Bloqueio (−8)</button>
        <button class="btn-action danger" data-action="res-crit" style="font-size:10px;">Erro Crit (−12)</button>
        <button class="btn-action blue" data-action="res-repair" style="font-size:10px;">↺ Reparar</button>
    </div>`;
  }

  function buildTabPericias(d) {
    const groups = [
      {
        key: "bonus_corpo",
        label: "CORPO",
        color: "#FF2B4A",
        skills: [
          "acerto",
          "bloqueio",
          "esquiva",
          "iniciativa",
          "r_fisica",
          "atletismo",
          "acrobacia",
          "furtividade",
          "romper",
          "sobrecarga",
          "tr_fisico",
          "forca",
        ],
      },
      {
        key: "bonus_mente",
        label: "MENTE",
        color: "#00D9FF",
        skills: [
          "percepcao",
          "medicina",
          "finta",
          "investigacao",
          "conhecimento",
          "tatica",
          "calma",
          "persuasao",
          "enganacao",
          "treino_mental",
          "intimidacao_m",
        ],
      },
      {
        key: "bonus_espirito",
        label: "ESPÍRITO",
        color: "#A855F7",
        skills: [
          "determinacao",
          "r_espiritual",
          "intimidacao_e",
          "foco",
          "conviccao",
          "meditacao",
          "sobrevivencia",
          "tr_espiritual",
          "vontade",
        ],
      },
    ];
    const skillLabel = (s) =>
      s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return groups
      .map(
        (g) => `
        <div class="peri-group">
            <div class="peri-group-title" style="background:${g.color}22;color:${g.color};">▶ ${g.label}</div>
            ${g.skills
              .map(
                (sk) => `
                <div class="peri-row" data-action="roll-pericia" data-group="${g.key}" data-skill="${sk}">
                    <span class="peri-name">${skillLabel(sk)}</span>
                    <input class="omni-input peri-bonus-input" type="number"
                        data-path="pericias.${g.key}.${sk}"
                        value="${d.pericias[g.key][sk] || 0}"
                        onclick="event.stopPropagation()">
                </div>`,
              )
              .join("")}
        </div>`,
      )
      .join("");
  }

  function buildTabEquipamento(d) {
    const slotLabel = {
      head: "Cabeça",
      chest: "Peito",
      hands: "Mãos",
      legs: "Pernas",
      feet: "Pés",
      main_hand: "Mão Princ.",
      off_hand: "Mão Sec.",
      ring1: "Anel 1",
      ring2: "Anel 2",
      acc: "Acessório",
    };
    const slotIcon = {
      head: "👒",
      chest: "🛡️",
      hands: "🧤",
      legs: "👖",
      feet: "👢",
      main_hand: "⚔️",
      off_hand: "🔰",
      ring1: "💍",
      ring2: "💍",
      acc: "📿",
    };
    const slotsHtml = Object.entries(slotLabel)
      .map(([key, label]) => {
        const item = d.equipment[key];
        return `<div class="equip-slot${item ? " filled" : ""}" data-slot="${key}" data-action="equip-slot">
            ${
              item
                ? `<img src="${item.img || "icons/svg/mystery-man.svg"}">
                      <div class="equip-slot-name">${item.name}</div>`
                : `<div style="font-size:20px">${slotIcon[key]}</div>
                      <div class="equip-slot-label">${label}</div>`
            }
        </div>`;
      })
      .join("");
    const hotbarHtml = d.hotbar
      .map(
        (item, i) => `
        <div class="hotbar-slot${item ? " filled" : ""}" data-hotbar="${i}" data-action="hotbar-slot">
            <span class="slot-num">${i + 1}</span>
            ${item ? `<img src="${item.img || "icons/svg/mystery-man.svg"}" title="${item.name}">` : ""}
        </div>`,
      )
      .join("");
    return `
    <div class="sec-title">🗡️ SLOTS DE EQUIPAMENTO</div>
    <div class="equip-grid">${slotsHtml}</div>
    <div class="sec-title">⚡ HOTBAR</div>
    <div class="hotbar-row">${hotbarHtml}</div>`;
  }

  function buildTabStatus(d) {
    const nucColors = [
      "#888",
      "#FF2B4A",
      "#FF8C00",
      "#FFD700",
      "#C0C0C0",
      "#FFF",
      "#A855F7",
    ];
    const stageNames = [
      "Preto",
      "Vermelho",
      "Laranja",
      "Amarelo",
      "Prata",
      "Branco",
      "Púrpura",
    ];
    const stageBonus = [
      "+2 Iniciativa/Percepção",
      "+4 Dano Fixo",
      "+3 Defesa (Bloqueio/Esquiva)",
      "RD 2 Permanente",
      "+4 Teste de Ataque",
      "RD 4 Permanente",
      "Margem Crítico −1",
    ];
    const integColor =
      d.integridade.valor >= 80
        ? "#FFD700"
        : d.integridade.valor >= 45
          ? "#2EFF7A"
          : d.integridade.valor >= 20
            ? "#FF8C00"
            : "#FF2B4A";
    const integState =
      d.integridade.valor >= 80
        ? "⭐ PARAGON"
        : d.integridade.valor >= 45
          ? "Equilíbrio"
          : d.integridade.valor >= 20
            ? "⚠️ Degradação"
            : "💀 Crítico";
    const buffsHtml = d.status.buffs.length
      ? d.status.buffs
          .map(
            (b, i) =>
              `<span class="spill buff" data-action="remove-buff" data-idx="${i}">✅ ${b.name} ✕</span>`,
          )
          .join("")
      : '<span style="color:#333;font-size:11px;">Nenhum buff ativo</span>';
    const debuffsHtml = d.status.debuffs.length
      ? d.status.debuffs
          .map(
            (b, i) =>
              `<span class="spill debuff" data-action="remove-debuff" data-idx="${i}">❌ ${b.name} ✕</span>`,
          )
          .join("")
      : '<span style="color:#333;font-size:11px;">Nenhum debuff ativo</span>';
    const passivasHtml = d.status.passivas
      .map(
        (p, i) => `
        <div style="display:flex;align-items:center;gap:8px;padding:6px;background:#1A1F2E;border-radius:4px;margin-bottom:4px;">
            <span style="font-size:16px;cursor:pointer;" data-action="toggle-passiva" data-idx="${i}">${p.active ? "✅" : "○"}</span>
            <div style="flex:1;"><div style="font-size:12px;font-weight:700;${p.active ? "color:#00D9FF;" : "color:#555;"}">${p.name}</div>
                <div style="font-size:10px;color:#555;">${p.desc}</div></div>
        </div>`,
      )
      .join("");
    return `
    <div class="sec-title">☀️ INTEGRIDADE ESPIRITUAL — Caminho Sol & Sombra</div>
    <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
        <span style="font-size:11px;font-weight:700;color:${integColor};">${integState}</span>
        <span style="font-size:11px;color:#555;">Conflito: ${d.integridade.conflito_acumulado}</span>
    </div>
    <div class="integr-bar" style="height:28px;border-color:${integColor};">
        <div class="integr-fill" style="width:${d.integridade.valor}%;background:${integColor};"></div>
        <div class="integr-text">${d.integridade.valor}/100</div>
    </div>
    <div style="display:flex;gap:4px;margin-top:6px;margin-bottom:12px;flex-wrap:wrap;">
        <button class="btn-action" data-action="integr-add" style="font-size:11px;">✨ Ato Nobre (+5)</button>
        <button class="btn-action danger" data-action="integr-sub" style="font-size:11px;">⚠️ Conflito (−5)</button>
        <button class="btn-action danger" data-action="integr-ritual" style="font-size:11px;">🎲 Ritual do Julgamento</button>
    </div>

    <div class="sec-title">🔮 NÚCLEO DE ORIGEM — Stage ${d.nucleus.stage}</div>
    <div class="nucleus-stage">
        ${stageNames
          .map(
            (
              name,
              i,
            ) => `<div class="ns-dot${i <= d.nucleus.stage && d.nucleus.stage > 0 ? " active" : ""}"
            style="background:${i <= (d.nucleus.stage > 0 ? d.nucleus.stage - 1 : 0) ? nucColors[i] + "44" : "#111"};
                   color:${nucColors[i]};border-color:${i < d.nucleus.stage || (d.nucleus.active && i === d.nucleus.stage) ? nucColors[i] : "#333"};"
            title="Stage ${i + 1}: ${name}">${i + 1}</div>`,
          )
          .join("")}
    </div>
    <div style="background:#1A1F2E;border-radius:4px;padding:8px;margin-bottom:6px;">
        <div style="font-size:11px;font-weight:700;color:${nucColors[d.nucleus.stage] || "#444"};">
            Stage ${d.nucleus.stage}: ${stageNames[d.nucleus.stage] || "Inativo"}
        </div>
        <div style="font-size:11px;color:#888;margin-top:2px;">${stageBonus[d.nucleus.stage] || "Sem bônus ainda"}</div>
        <div style="font-size:11px;color:#555;margin-top:2px;">Pressão: ${d.nucleus.pressure} | Âncora: ${d.nucleus.anchor_active ? "✅" : "❌"}</div>
        <div style="font-size:10px;color:#444;">Evolução: ${d.nucleus.evolution_points}/10 pts</div>
    </div>
    <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:12px;">
        <button class="btn-action${d.nucleus.active ? "" : " primary"}" data-action="nucleus-toggle">
            ${d.nucleus.active ? "⏹ Desativar" : "⚡ ATIVAR NÚCLEO"}
        </button>
        <button class="btn-action blue" data-action="nucleus-advance" style="font-size:11px;">Stage ↑</button>
    </div>

    <div class="sec-title">✅ BUFFS ATIVOS</div>
    <div class="status-pills" style="margin-bottom:6px;">${buffsHtml}</div>
    <div style="display:flex;gap:4px;margin-bottom:12px;">
        <input class="omni-input" id="buff-input" placeholder="Nome do buff..." style="flex:1;">
        <button class="btn-action blue" data-action="add-buff">+ Buff</button>
    </div>

    <div class="sec-title">❌ DEBUFFS ATIVOS</div>
    <div class="status-pills" style="margin-bottom:6px;">${debuffsHtml}</div>
    <div style="display:flex;gap:4px;margin-bottom:12px;">
        <input class="omni-input" id="debuff-input" placeholder="Nome do debuff..." style="flex:1;">
        <button class="btn-action danger" data-action="add-debuff">+ Debuff</button>
    </div>

    <div class="sec-title">🔵 PASSIVAS</div>
    ${passivasHtml}
    <button class="btn-action full-btn" data-action="add-passiva" style="margin-top:6px;">+ Passiva</button>`;
  }

  function buildTabInventario(d) {
    const invHtml = d.inventory.length
      ? d.inventory
          .map(
            (item, i) => `
        <div class="inv-row" data-action="use-item" data-idx="${i}">
            <img src="${item.icon || "icons/svg/mystery-man.svg"}">
            <span class="inv-name">${item.name}</span>
            <span class="inv-qtd">x${item.qtd}</span>
            <button class="btn-action danger" style="padding:2px 6px;font-size:11px;"
                data-action="remove-item" data-idx="${i}">✕</button>
        </div>`,
          )
          .join("")
      : '<div style="color:#333;font-size:12px;text-align:center;padding:20px;">Inventário vazio</div>';
    return `
    <div class="sec-title">🎒 INVENTÁRIO</div>
    ${invHtml}`;
  }

  function buildTabProgressao(d) {
    const xpInfo = sys.getXPProgress(d);
    const ascCheck = sys.checkAscension(d);
    const totalXP = sys.getTotalXP(d);
    const nextXP = sys.calculateXP(d.progression.level);
    const rankMap = {
      1: "Aspirante",
      2: "Mizunoto",
      3: "Mizunoto-Vet",
      4: "Mizunoe",
      5: "Mizunoe-Vet",
      6: "Kanoto",
      7: "Kanoto-Vet",
      8: "Kanoe",
      9: "Kanoe-Vet",
      10: "Tsuchinoto",
      11: "Tsuchinoto-Vet",
      12: "Tsuchinoe",
      13: "Tsuchinoe-Vet",
      14: "Hinoto",
      15: "Hinoe",
      16: "Kinoto",
      17: "Kinoto-Vet",
      18: "Kinoe",
      19: "Kinoe-Vet",
      20: "Hashira",
    };
    const caps = sys.ASCENSION_CAPS;
    return `
    <div class="sec-title">📈 PROGRESSÃO — ${d.progression.phase === 2 ? "⚡ LIMIT BREAK (21-999)" : "HASHIRA PATH (1-20)"}</div>
    <div style="background:#1A1F2E;border-radius:6px;padding:12px;margin-bottom:12px;text-align:center;">
        <div style="font-size:11px;color:#555;font-weight:700;letter-spacing:1px;">NÍVEL ATUAL</div>
        <div style="font-size:48px;font-family:'Orbitron';font-weight:900;color:${d.progression.phase === 2 ? "#FF8C00" : "#FFD700"};line-height:1;">${d.progression.level}</div>
        <div style="font-size:12px;color:#888;">${rankMap[d.progression.level] || "Além dos Registros"}</div>
        ${d.progression.phase === 2 ? `<div style="font-size:11px;color:#FF8C00;margin-top:4px;">⚡ LIMITE QUEBRADO</div>` : ""}
    </div>
    ${
      ascCheck.locked
        ? `
    <div class="ascension-alert">
        <div style="color:#FF2B4A;font-family:'Orbitron';font-size:13px;font-weight:700;">⚠️ TESTE DE ASCENSÃO DISPONÍVEL</div>
        <div style="color:#888;font-size:11px;margin-top:4px;">Nível ${ascCheck.cap} requer Ascensão do Mestre para continuar.</div>
    </div>`
        : ""
    }
    <div class="sec-title">✨ EXPERIÊNCIA</div>
    <div class="xp-bar">
        <div class="xp-fill" style="width:${xpInfo.pct}%;"></div>
        <div class="xp-text">${xpInfo.current.toLocaleString()} / ${xpInfo.needed.toLocaleString()} XP (${xpInfo.pct}%)</div>
    </div>
    <div class="xp-grid">
        <div class="xp-card"><small>XP COMBATE</small><b>${d.progression.xp_combat.toLocaleString()}</b></div>
        <div class="xp-card"><small>XP FÁBULA</small><b>${d.progression.xp_fable.toLocaleString()}</b></div>
        <div class="xp-card"><small>XP SKILL</small><b>${d.progression.xp_skill.toLocaleString()}</b></div>
    </div>
    <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:12px;">
        <button class="btn-action primary" data-action="levelup" style="flex:2;">⬆️ LEVEL UP</button>
        <button class="btn-action blue" data-action="add-xp-combat" style="flex:1;font-size:11px;">+XP Combate</button>
        <button class="btn-action" data-action="add-xp-fable" style="flex:1;font-size:11px;">+XP Fábula</button>
        <button class="btn-action" data-action="add-xp-skill" style="flex:1;font-size:11px;">+XP Skill</button>
    </div>
    <div class="sec-title">🔒 BREAKPOINTS DE ASCENSÃO</div>
    ${caps
      .map(
        (cap) => `
        <div style="display:flex;align-items:center;gap:8px;padding:6px 8px;background:#1A1F2E;
             border-radius:4px;margin-bottom:4px;border-left:3px solid ${d.progression.ascended[cap] ? "#2EFF7A" : "#FF2B4A"};">
            <span style="font-size:16px;">${d.progression.ascended[cap] ? "✅" : "🔒"}</span>
            <div style="flex:1;font-size:12px;font-weight:700;color:${d.progression.ascended[cap] ? "#2EFF7A" : "#FF2B4A"};">
                Nível ${cap} — ${d.progression.ascended[cap] ? "Ascensão Concedida" : "Aguardando Ascensão"}
            </div>
            ${!d.progression.ascended[cap] ? `<button class="btn-action blue" data-action="grant-ascension" data-cap="${cap}" style="font-size:10px;">GM: Conceder</button>` : ""}
        </div>`,
      )
      .join("")}`;
  }

  function buildTabPersona(d) {
    const origens = ["humano", "meio_oni", "linhagem_solar", "hibrido_lua"];
    const origemLabel = {
      humano: "Humano",
      meio_oni: "Meio-Oni",
      linhagem_solar: "Linhagem Solar",
      hibrido_lua: "Híbrido Lua",
    };
    return `
    <div class="sec-title">👤 PERSONA</div>
    <div style="display:flex;gap:8px;margin-bottom:10px;">
        <div style="flex:1;">
            <div style="font-size:10px;color:#555;margin-bottom:3px;">NOME</div>
            <input class="omni-input" data-path="persona.name" value="${d.persona.name}">
        </div>
        <div style="flex:1;">
            <div style="font-size:10px;color:#555;margin-bottom:3px;">CLASSE</div>
            <input class="omni-input" data-path="persona.class" value="${d.persona.class}">
        </div>
    </div>
    <div style="display:flex;gap:8px;margin-bottom:10px;">
        <div style="flex:1;">
            <div style="font-size:10px;color:#555;margin-bottom:3px;">ORIGEM</div>
            <select class="omni-input" data-path="progression.origem">
                ${origens.map((o) => `<option value="${o}"${d.progression.origem === o ? " selected" : ""}>${origemLabel[o]}</option>`).join("")}
            </select>
        </div>
        <div style="flex:1;">
            <div style="font-size:10px;color:#555;margin-bottom:3px;">RANK</div>
            <input class="omni-input" data-path="persona.rank" value="${d.persona.rank}">
        </div>
    </div>
    <div class="sec-title">📊 ATRIBUTOS</div>
    ${["corpo", "mente", "espirito"]
      .map(
        (attr) => `
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
            <div style="width:70px;font-size:11px;font-weight:700;color:#888;text-transform:uppercase;">${attr}</div>
            <input class="omni-input" type="number" style="width:60px;text-align:center;"
                data-path="attr.${attr}" value="${d.attr[attr]}" min="1" max="30">
            <div style="font-size:13px;color:#00D9FF;">
                ${Math.floor((d.attr[attr] - 10) / 2) >= 0 ? "+" : ""}${Math.floor((d.attr[attr] - 10) / 2)}
            </div>
        </div>`,
      )
      .join("")}
    <button class="btn-action primary full-btn" data-action="recalc-hp" style="margin-top:8px;">⚡ Recalcular PV/PC pelo Nível</button>
    <div class="sec-title">🖼️ AVATAR</div>
    <div style="display:flex;gap:8px;align-items:flex-start;">
        <div style="width:80px;height:100px;background:#000 center/cover no-repeat;border:1px solid var(--gold);"
             style="background-image:url('${d.persona.img}')"></div>
        <div style="flex:1;">
            <div style="font-size:10px;color:#555;margin-bottom:3px;">URL DA IMAGEM</div>
            <input class="omni-input" data-path="persona.img" value="${d.persona.img}" style="font-size:10px;">
        </div>
    </div>`;
  }

  function buildTabConfig(d) {
    return `
    <div class="sec-title">⚙️ CONFIGURAÇÕES</div>
    <div style="margin-bottom:12px;">
        <div style="font-size:10px;color:#555;margin-bottom:3px;">HP BASE (Combate)</div>
        <div style="display:flex;gap:4px;">
            <input class="omni-input" type="number" style="width:60px;" data-path="core.hp.v" value="${d.core.hp.v}">
            <span style="align-self:center;color:#555;">/</span>
            <input class="omni-input" type="number" style="width:60px;" data-path="core.hp.m" value="${d.core.hp.m}">
        </div>
    </div>
    <div style="margin-bottom:12px;">
        <div style="font-size:10px;color:#555;margin-bottom:3px;">PC BASE (Concentração)</div>
        <div style="display:flex;gap:4px;">
            <input class="omni-input" type="number" style="width:60px;" data-path="core.mp.v" value="${d.core.mp.v}">
            <span style="align-self:center;color:#555;">/</span>
            <input class="omni-input" type="number" style="width:60px;" data-path="core.mp.m" value="${d.core.mp.m}">
        </div>
    </div>
    <div style="margin-bottom:12px;">
        <div style="font-size:10px;color:#555;margin-bottom:3px;">CA BASE + BÔNUS</div>
        <div style="display:flex;gap:4px;">
            <input class="omni-input" type="number" style="width:60px;" data-path="combat.ca.base" value="${d.combat.ca.base}">
            <span style="align-self:center;color:#555;">+</span>
            <input class="omni-input" type="number" style="width:60px;" data-path="combat.ca.bonus" value="${d.combat.ca.bonus}">
        </div>
    </div>
    <div style="margin-bottom:12px;">
        <div style="font-size:10px;color:#555;margin-bottom:3px;">RESILIÊNCIA DA ARMA (Atual/Máx)</div>
        <div style="display:flex;gap:4px;">
            <input class="omni-input" type="number" style="width:60px;" data-path="weapon_res.current" value="${d.weapon_res.current}">
            <span style="align-self:center;color:#555;">/</span>
            <input class="omni-input" type="number" style="width:60px;" data-path="weapon_res.max" value="${d.weapon_res.max}">
        </div>
    </div>
    <button class="btn-action danger full-btn" data-action="reset-all">⚠️ RESETAR TUDO (mantem Origem)</button>`;
  }

  function buildSkillTree(d) {
    const skillsHtml = d.skills_tree.length
      ? `
        <div class="skill-cards">
            ${d.skills_tree
              .map(
                (sk, i) => `
                <div class="skill-card" data-action="use-skill" data-idx="${i}">
                    <img src="${sk.img || "icons/svg/mystery-man.svg"}" style="width:32px;height:32px;float:left;margin-right:8px;">
                    <button class="skill-card-remove" data-action="remove-skill" data-idx="${i}">✕</button>
                    <div class="skill-card-name">${sk.name}</div>
                    <div class="skill-card-type">${sk.type || "Skill"}</div>
                </div>`,
              )
              .join("")}
        </div>`
      : '<div style="color:#333;font-size:11px;text-align:center;padding:10px;">Nenhuma skill equipada</div>';
    return `
    <div class="sec-title">🌳 ÁRVORE DE HABILIDADES</div>
    <div class="skill-drop-area" id="skill-drop-zone">
        🎯 Arraste uma Skill do compêndio aqui
    </div>
    ${skillsHtml}`;
  }

  // ═══════════════════════════════════════════════════════════════════
  // 5. APPLICATION V2 — FOUNDRY VTT v13 READY
  // ═══════════════════════════════════════════════════════════════════
  class HunterHUDv103 extends foundry.applications.api.ApplicationV2 {
    static DEFAULT_OPTIONS = {
      id: APP_ID,
      window: {
        title: "⚡ HUNTER HUD v103",
        resizable: true,
        minimizable: true,
      },
      position: { width: 820, height: 660, top: 60, left: 80 },
    };

    constructor() {
      super();
    }

    _buildHTML(d) {
      const tabs = [
        { id: "combate", icon: "⚔️", tip: "Combate" },
        { id: "pericias", icon: "🎯", tip: "Perícias" },
        { id: "skills", icon: "🌳", tip: "Skills" },
        { id: "equipamento", icon: "🗡️", tip: "Equip." },
        { id: "status", icon: "🔮", tip: "Status" },
        { id: "inventario", icon: "🎒", tip: "Invent." },
        { id: "progressao", icon: "📈", tip: "Prog." },
        { id: "persona", icon: "👤", tip: "Persona" },
        { id: "config", icon: "⚙️", tip: "Config" },
      ];
      const activeTab = d.ui.activeTab || "combate";
      const navHtml = tabs
        .map(
          (t) =>
            `<div class="nav-btn${t.id === activeTab ? " active" : ""}" data-tab="${t.id}">
                ${t.icon}<span class="nav-tip">${t.tip}</span>
            </div>`,
        )
        .join("");
      const tabContent = {
        combate: buildTabCombate(d),
        pericias: buildTabPericias(d),
        skills: buildSkillTree(d),
        equipamento: buildTabEquipamento(d),
        status: buildTabStatus(d),
        inventario: buildTabInventario(d),
        progressao: buildTabProgressao(d),
        persona: buildTabPersona(d),
        config: buildTabConfig(d),
      };
      const panesHtml = tabs
        .map(
          (t) =>
            `<div class="tab-pane${t.id === activeTab ? " active" : ""}" id="pane-${t.id}">${tabContent[t.id] || ""}</div>`,
        )
        .join("");
      return `<div class="omni-root">
            <div class="o-left">${buildLeft(d)}</div>
            ${buildHeader(d)}
            <div class="o-main">${panesHtml}</div>
            <div class="o-nav">${navHtml}</div>
        </div>`;
    }

    async _renderHTML(context, options) {
      const d = sys.data;
      const el = document.createElement("div");
      el.innerHTML = this._buildHTML(d);
      return el.firstElementChild;
    }

    _replaceHTML(result, content, options) {
      content.innerHTML = "";
      content.appendChild(result);
      this._activateListeners(content);
    }

    async _onRender(context, options) {
      this._activateListeners(this.element);
      this._activateDragDrop(this.element);
    }

    _activateListeners(html) {
      // NAV TABS
      html.querySelectorAll(".nav-btn[data-tab]").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const tab = btn.dataset.tab;
          await sys.update("ui.activeTab", tab);
          html
            .querySelectorAll(".nav-btn")
            .forEach((b) => b.classList.remove("active"));
          html
            .querySelectorAll(".tab-pane")
            .forEach((p) => p.classList.remove("active"));
          btn.classList.add("active");
          const pane = html.querySelector(`#pane-${tab}`);
          if (pane) pane.classList.add("active");
        });
      });

      // DEBOUNCED INPUTS (text/number que mudam em blur)
      html
        .querySelectorAll(
          "input.omni-input[data-path], select.omni-input[data-path]",
        )
        .forEach((inp) => {
          inp.addEventListener("change", () => {
            const raw = inp.type === "number" ? Number(inp.value) : inp.value;
            sys.updateDebounced(inp.dataset.path, raw);
          });
        });

      // ALL DATA-ACTION BUTTONS
      html.querySelectorAll("[data-action]").forEach((el) => {
        el.addEventListener("click", (ev) => this._onAction(ev, html));
      });

      // PERÍCIAS — click na row rola (não no input)
      html
        .querySelectorAll('.peri-row[data-action="roll-pericia"]')
        .forEach((row) => {
          row.addEventListener("click", (ev) => {
            if (ev.target.closest("input")) return;
            this._rollPericia(row.dataset.group, row.dataset.skill);
          });
        });
    }

    async _onAction(ev, html) {
      ev.preventDefault();
      ev.stopPropagation();
      const el = ev.currentTarget;
      const action = el.dataset.action;
      const d = sys.data;

      switch (action) {
        // ── MOMENTUM ──
        case "momentum-add": {
          const v = Math.min(d.core.momentum.m, d.core.momentum.v + 1);
          await sys.update("core.momentum.v", v);
          this.render();
          break;
        }
        case "momentum-use": {
          const v = Math.max(0, d.core.momentum.v - 1);
          await sys.update("core.momentum.v", v);
          this.render();
          break;
        }
        // ── ROLLS ──
        case "roll-attack":
          await this._rollAttack(html);
          break;
        case "roll-damage":
          await this._rollDamage(html);
          break;
        case "roll-esquiva":
          await this._rollDefense("esquiva", html);
          break;
        case "roll-bloqueio":
          await this._rollDefense("bloqueio", html);
          break;
        case "roll-parry":
          await this._rollParry(html);
          break;
        case "roll-attr":
          await this._rollAttr(el.dataset.attr, html);
          break;
        // ── INCARNATION ──
        case "inc-vitoria":
          await this._incChange(10, "Vitória");
          this.render();
          break;
        case "inc-dano":
          await this._incChange(-5, "Dano Sofrido");
          this.render();
          break;
        case "inc-medo":
          await this._incChange(-20, "Medo");
          this.render();
          break;
        case "inc-aliado":
          await this._incChange(-15, "Perda de Aliado");
          this.render();
          break;
        case "inc-milagre":
          await this._useMilagre();
          this.render();
          break;
        // ── COSMO ──
        case "cosmo-burn":
          await this._cosmoBurn();
          this.render();
          break;
        case "cosmo-atom":
          await this._cosmoUse(5, "Destruição Atômica");
          this.render();
          break;
        case "cosmo-speed":
          await this._cosmoUse(10, "Velocidade Cósmica");
          this.render();
          break;
        case "cosmo-reset": {
          await sys.update("cosmo.current", 0);
          this.render();
          break;
        }
        // ── RESILIÊNCIA ──
        case "res-ataque":
          await this._resDegrade(1, "Ataque Normal");
          this.render();
          break;
        case "res-bloqueio":
          await this._resDegrade(8, "Bloqueio de Impacto");
          this.render();
          break;
        case "res-crit":
          await this._resDegrade(12, "Erro Crítico");
          this.render();
          break;
        case "res-repair": {
          await sys.update("weapon_res.current", d.weapon_res.max);
          this.render();
          break;
        }
        // ── PROGRESSÃO ──
        case "levelup":
          await sys.tryLevelUp(this);
          this.render();
          break;
        case "grant-ascension": {
          const cap = Number(el.dataset.cap);
          if (game.user.isGM) {
            await sys.grantAscension(cap);
            this.render();
          } else
            ui.notifications.warn("Apenas o Mestre pode conceder Ascensão.");
          break;
        }
        case "add-xp-combat":
          await this._addXP("combat");
          break;
        case "add-xp-fable":
          await this._addXP("fable");
          break;
        case "add-xp-skill":
          await this._addXP("skill");
          break;
        // ── INTEGRIDADE ──
        case "integr-add":
          await this._integrChange(5, "Ato Nobre");
          this.render();
          break;
        case "integr-sub":
          await this._integrChange(-5, "Conflito");
          this.render();
          break;
        case "integr-ritual":
          await this._integridadeRitual();
          this.render();
          break;
        // ── NÚCLEO ──
        case "nucleus-toggle": {
          await sys.update("nucleus.active", !d.nucleus.active);
          this.render();
          break;
        }
        case "nucleus-advance": {
          const next = Math.min(6, d.nucleus.stage + 1);
          await sys.update("nucleus.stage", next);
          this.render();
          break;
        }
        // ── STATUS PILLS ──
        case "add-buff": {
          const inp = html.querySelector("#buff-input");
          if (!inp?.value) break;
          const nd = sys.data;
          nd.status.buffs.push({ name: inp.value });
          await sys.save(nd);
          inp.value = "";
          this.render();
          break;
        }
        case "add-debuff": {
          const inp = html.querySelector("#debuff-input");
          if (!inp?.value) break;
          const nd = sys.data;
          nd.status.debuffs.push({ name: inp.value });
          await sys.save(nd);
          inp.value = "";
          this.render();
          break;
        }
        case "remove-buff": {
          const nd = sys.data;
          nd.status.buffs.splice(Number(el.dataset.idx), 1);
          await sys.save(nd);
          this.render();
          break;
        }
        case "remove-debuff": {
          const nd = sys.data;
          nd.status.debuffs.splice(Number(el.dataset.idx), 1);
          await sys.save(nd);
          this.render();
          break;
        }
        case "toggle-passiva": {
          const nd = sys.data;
          nd.status.passivas[Number(el.dataset.idx)].active ^= true;
          await sys.save(nd);
          this.render();
          break;
        }
        case "add-passiva": {
          const name = await this._prompt(
            "Nova Passiva",
            "Nome da passiva:",
            "Passiva",
          );
          if (!name) break;
          const desc = await this._prompt("Descrição", "Descrição:", "");
          const nd = sys.data;
          nd.status.passivas.push({ name, desc: desc || "", active: true });
          await sys.save(nd);
          this.render();
          break;
        }
        // ── INVENTÁRIO ──
        case "use-item":
          await this._useItem(Number(el.dataset.idx));
          break;
        case "remove-item": {
          const nd = sys.data;
          nd.inventory.splice(Number(el.dataset.idx), 1);
          await sys.save(nd);
          this.render();
          break;
        }
        // ── SKILLS ──
        case "use-skill":
          await this._useSkill(Number(el.dataset.idx));
          break;
        case "remove-skill": {
          const nd = sys.data;
          nd.skills_tree.splice(Number(el.dataset.idx), 1);
          await sys.save(nd);
          this.render();
          break;
        }
        // ── PERSONA ──
        case "recalc-hp": {
          const nd = sys.data;
          sys.recalcHP(nd);
          await sys.save(nd);
          this.render();
          ui.notifications.info("✅ PV/PC recalculados!");
          break;
        }
        case "reset-all": {
          const confirm = await this._confirmDialog(
            "⚠️ Resetar Tudo?",
            "Isso apaga todos os dados da ficha. Confirmar?",
          );
          if (confirm) {
            await actor.unsetFlag("world", sys.flag);
            this.render();
          }
          break;
        }
      }
    }

    // ─────────────────────────────────────────────────────────────────
    // [SINON] DUAL-CHECK CRÍTICO + PRE-ROLL BONUS SCANNER
    // ─────────────────────────────────────────────────────────────────
    async _rollAttack(html) {
      const d = sys.data;
      const modCor = Math.floor((d.attr.corpo - 10) / 2);
      const bonuses = sys.scanBonuses(d, "attack");
      const totalBonus = bonuses.reduce(
        (sum, b) => sum + (Number(b.value) || 0),
        0,
      );
      const bonusLog = sys.buildBonusLog(d, "attack");

      const r = await new Roll(`1d20 + ${modCor} + ${totalBonus}`).evaluate();
      const natural = r.terms[0].results[0].result;

      // [SINON] DUAL-CHECK — Instinto ou Técnico
      const critMargin = d.combat.crit_margin || 20;
      const isCritInstinto = natural >= critMargin;

      // Target info para Fio da Abertura
      const target = game.user.targets.first();
      const targetAC =
        target?.actor?.system?.attributes?.ac?.value ||
        target?.actor?.getFlag?.("world", "omni_v102_" + target.actor.id)
          ?.combat?.ca?.base ||
        0;
      const isCritTecnico = targetAC > 0 && r.total >= targetAC + 10;

      const isCrit = isCritInstinto || isCritTecnico;
      let critLabel = "";
      if (isCritInstinto)
        critLabel += `<span class="crit-badge instinto">⚡ CRÍTICO DE INSTINTO (${natural}≥${critMargin})</span> `;
      if (isCritTecnico)
        critLabel += `<span class="crit-badge tecnico">🔮 FIO DA ABERTURA (${r.total}≥CA+10)</span>`;

      // VFX Fio da Abertura
      if (isCritTecnico && game.modules.get("sequencer")?.active) {
        new Sequence()
          .effect()
          .atLocation(canvas.tokens.controlled[0])
          .file("jb2a.sword_attack.02.white")
          .scale(0.5)
          .waitUntilFinished(-500)
          .play();
      }

      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor }),
        content: `
            <div style="border:2px solid ${isCrit ? "#FFD700" : "#2A2F3E"};padding:10px;background:#0a0a0f;border-radius:6px;">
                <div style="font-family:'Orbitron',sans-serif;font-size:14px;font-weight:700;color:${isCrit ? "#FFD700" : "#CDD6F4"};">
                    ⚔️ ${isCrit ? "CRÍTICO!" : "ATAQUE"} — Total: <b>${r.total}</b>
                </div>
                <div style="font-size:11px;color:#888;margin-top:4px;">
                    d20 (${natural}) + COR (${modCor}) + Bônus (${totalBonus}) = ${r.total}
                </div>
                ${isCrit ? `<div style="margin-top:6px;">${critLabel}</div>` : ""}
                ${isCritTecnico ? `<div class="fio-label" style="margin-top:4px;">→ Ignora RD + adiciona MOD_ESP ao dano final</div>` : ""}
                ${bonusLog}
            </div>`,
      });
    }

    async _rollDamage(html) {
      const d = sys.data;
      const modEsp = Math.floor((d.attr.espirito - 10) / 2);
      const bonuses = sys.scanBonuses(d, "damage");
      const bonusFlat = bonuses.reduce(
        (sum, b) => sum + (Number(b.value) || 0),
        0,
      );
      const bonusLog = sys.buildBonusLog(d, "damage");
      const formula = `${d.combat.attack.base_dmg} + ${bonusFlat}`;
      const r = await new Roll(formula).evaluate();
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor }),
        content: `
            <div style="border:2px solid #FF2B4A;padding:10px;background:#0a0a0f;border-radius:6px;">
                <div style="font-family:'Orbitron',sans-serif;font-size:16px;color:#FF2B4A;font-weight:900;">
                    💥 DANO: ${r.total}
                </div>
                <div style="font-size:11px;color:#888;">${formula}</div>
                ${bonusLog}
            </div>`,
      });
    }

    async _rollDefense(type, html) {
      const d = sys.data;
      const modCor = Math.floor((d.attr.corpo - 10) / 2);
      const modEsp = Math.floor((d.attr.espirito - 10) / 2);
      const mod = type === "esquiva" ? modCor : modCor;
      const bonuses = sys.scanBonuses(d, type);
      const bonusFlat = bonuses.reduce(
        (sum, b) => sum + (Number(b.value) || 0),
        0,
      );
      const bonusLog = sys.buildBonusLog(d, type);
      const label = type === "esquiva" ? "🌀 ESQUIVA" : "🛡️ BLOQUEIO";
      const color = type === "esquiva" ? "#2EFF7A" : "#00D9FF";
      const r = await new Roll(`1d20 + ${mod} + ${bonusFlat}`).evaluate();
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor }),
        content: `
            <div style="border:2px solid ${color};padding:10px;background:#0a0a0f;border-radius:6px;">
                <div style="font-family:'Orbitron',sans-serif;font-size:14px;font-weight:700;color:${color};">
                    ${label}: ${r.total}
                </div>
                <div style="font-size:11px;color:#888;">1d20(${r.terms[0].results[0].result}) + ${mod + bonusFlat}</div>
                ${bonusLog}
            </div>`,
      });
    }

    async _rollParry(html) {
      const d = sys.data;
      const modCor = Math.floor((d.attr.corpo - 10) / 2);
      const bonuses = sys.scanBonuses(d, "bloqueio");
      const bonusFlat = bonuses.reduce(
        (sum, b) => sum + (Number(b.value) || 0),
        0,
      );
      const r = await new Roll(`1d20 + ${modCor} + ${bonusFlat}`).evaluate();
      const natural = r.terms[0].results[0].result;
      const isCritParry = natural >= (d.combat.crit_margin || 20);
      if (isCritParry) {
        const nd = sys.data;
        nd.combat.parry = { phase: 1, last_result: "crit" };
        await sys.save(nd);
      }
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor }),
        content: `
            <div style="border:2px solid ${isCritParry ? "#FFD700" : "#00D9FF"};padding:10px;background:#0a0a0f;border-radius:6px;">
                <div style="font-family:'Orbitron',sans-serif;font-size:14px;font-weight:700;color:${isCritParry ? "#FFD700" : "#00D9FF"};">
                    ⚡ PARRY: ${r.total} ${isCritParry ? "— CONTRA-ATAQUE LIVRE!" : ""}
                </div>
                ${isCritParry ? `<div style="color:#A855F7;font-size:11px;margin-top:4px;">✨ Parry Perfeito — Próximo ataque usa lógica Fio da Abertura</div>` : ""}
            </div>`,
      });
    }

    async _rollAttr(attrKey, html) {
      const d = sys.data;
      const val = d.attr[attrKey] || 10;
      const mod = Math.floor((val - 10) / 2);
      const label = {
        corpo: "⚡ CORPO",
        mente: "🧠 MENTE",
        espirito: "🔮 ESPÍRITO",
      }[attrKey];
      const color = { corpo: "#FF2B4A", mente: "#00D9FF", espirito: "#A855F7" }[
        attrKey
      ];
      const r = await new Roll(`1d20 + ${mod}`).evaluate();
      const nat = r.terms[0].results[0].result;
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor }),
        content: `
            <div style="border:2px solid ${color};padding:10px;background:#0a0a0f;border-radius:6px;">
                <div style="font-family:'Orbitron',sans-serif;font-size:14px;font-weight:700;color:${color};">
                    ${label}: ${r.total} ${nat === 20 ? "✨ NAT 20!" : nat === 1 ? "💀 FALHA CRÍTICA" : ""}
                </div>
                <div style="font-size:11px;color:#888;">1d20(${nat}) ${mod >= 0 ? "+" : ""}${mod}</div>
            </div>`,
      });
    }

    async _rollPericia(group, skill) {
      const d = sys.data;
      const attrMap = {
        bonus_corpo: "corpo",
        bonus_mente: "mente",
        bonus_espirito: "espirito",
      };
      const attrVal = d.attr[attrMap[group]] || 10;
      const attrMod = Math.floor((attrVal - 10) / 2);
      const periBonus = d.pericias[group][skill] || 0;
      const label = skill
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      const r = await new Roll(`1d20 + ${attrMod} + ${periBonus}`).evaluate();
      const nat = r.terms[0].results[0].result;
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor }),
        content: `
            <div style="border:2px solid #2A2F3E;padding:8px;background:#0a0a0f;border-radius:6px;">
                <div style="font-size:13px;font-weight:700;color:#CDD6F4;">🎯 ${label}: <span style="color:#FFD700;">${r.total}</span></div>
                <div style="font-size:11px;color:#555;">1d20(${nat}) + attr(${attrMod}) + per(${periBonus})</div>
            </div>`,
      });
    }

    // ─────────────────────────────────────────────────────────────────
    // [SINON] INCARNATION LOGIC
    // ─────────────────────────────────────────────────────────────────
    async _incChange(delta, reason) {
      const d = sys.data;
      const prev = d.incarnation.valor;
      const next = Math.max(0, Math.min(100, prev + delta));
      d.incarnation.valor = next;
      if (next <= 0) d.incarnation.collapsed = true;
      await sys.save(d);
      await ChatMessage.create({
        content: `<div style="border:1px solid #A855F7;padding:6px;background:#0a0a0f;font-size:11px;">
                <span style="color:#A855F7;font-weight:700;">⚡ INCARNATION</span> ${reason}: 
                <b style="color:${delta > 0 ? "#2EFF7A" : "#FF2B4A"}">${delta > 0 ? "+" : ""}${delta}%</b>
                → ${next}%${next >= 80 ? ' <span style="color:#FFD700;">✨ MILAGRE DISPONÍVEL</span>' : ""}
            </div>`,
      });
    }

    async _useMilagre() {
      const d = sys.data;
      if (d.incarnation.valor < 80 || d.incarnation.collapsed) return;
      d.incarnation.collapsed = true;
      d.incarnation.recovery = 3; // rodadas para recuperar
      await sys.save(d);
      await ChatMessage.create({
        content: `<div style="border:3px solid #FFD700;padding:14px;background:#0a0a0f;text-align:center;">
                <div style="font-family:'Orbitron',sans-serif;font-size:18px;font-weight:900;color:#FFD700;">
                    ✨ SOBRESCREVER REALIDADE
                </div>
                <div style="color:#A855F7;font-size:12px;margin-top:6px;">
                    ${actor.name} manifestou sua Convicção absoluta.<br>
                    <b>Próximo teste: Sucesso Automático.</b>
                </div>
            </div>`,
      });
    }

    // ─────────────────────────────────────────────────────────────────
    // [SINON] COSMO ENGINE
    // ─────────────────────────────────────────────────────────────────
    async _cosmoBurn() {
      const d = sys.data;
      const modEsp = Math.floor((d.attr.espirito - 10) / 2);
      const r = await new Roll(`1d10 + ${modEsp}`).evaluate();
      const gain = r.total;
      const prev = d.cosmo.current;
      const next = prev + gain;
      const limit = (d.attr.espirito + d.attr.corpo) * 2;
      d.cosmo.current = next;
      d.cosmo.active_sense =
        next >= 50 ? "8° Sentido" : next >= 20 ? "7° Sentido" : "Nenhum";
      const overload = next > limit;
      await sys.save(d);
      if (overload) {
        const excess = next - limit;
        await ChatMessage.create({
          content: `
                <div style="border:3px solid #FF2B4A;padding:10px;background:#0a0a0f;text-align:center;">
                    <div style="color:#FF2B4A;font-family:'Orbitron';font-size:14px;font-weight:700;">⚠️ SOBRECARGA CÓSMICA</div>
                    <div style="color:#888;font-size:11px;">Cosmo ${prev} + ${gain} = ${next} (limite: ${limit})</div>
                    <div style="color:#FF2B4A;font-size:12px;margin-top:4px;">💥 Dano Real: <b>${excess} PV</b></div>
                </div>`,
        });
        const hpNew = Math.max(0, d.core.hp.v - excess);
        await sys.update("core.hp.v", hpNew);
      } else {
        await ChatMessage.create({
          content: `
                <div style="border:2px solid #00D9FF;padding:8px;background:#0a0a0f;">
                    <span style="color:#00D9FF;font-weight:700;">⚛️ COSMO +${gain}</span> (${prev}→${next})
                    ${next >= 50 ? '<span style="color:#FFD700;"> ⚡ 8° SENTIDO ATIVO</span>' : ""}
                </div>`,
        });
      }
    }

    async _cosmoUse(cost, label) {
      const d = sys.data;
      if (d.cosmo.current < cost) {
        ui.notifications.warn(
          `Cosmo insuficiente (${d.cosmo.current}/${cost})`,
        );
        return;
      }
      d.cosmo.current = Math.max(0, d.cosmo.current - cost);
      await sys.save(d);
      await ChatMessage.create({
        content: `<div style="border:1px solid #00D9FF;padding:6px;background:#0a0a0f;font-size:11px;">
            <span style="color:#00D9FF;">⚛️ ${label}</span> — Cosmo −${cost} (→${d.cosmo.current})</div>`,
      });
    }

    // ─────────────────────────────────────────────────────────────────
    // [SINON] RESILIÊNCIA DA ARMA
    // ─────────────────────────────────────────────────────────────────
    async _resDegrade(amount, reason) {
      const d = sys.data;
      const prev = d.weapon_res.current;
      const next = Math.max(0, prev - amount);
      await sys.update("weapon_res.current", next);
      const states = ["Quebrada", "Crítica", "Crítica", "Fadigada"];
      const state =
        next === 0
          ? "💀 Quebrada!"
          : next < 30
            ? "⚠️ Crítica"
            : next < 60
              ? "Fadigada"
              : "Normal";
      await ChatMessage.create({
        content: `
            <div style="border:1px solid #888;padding:6px;background:#0a0a0f;font-size:11px;">
                <span style="color:#888;">🛡️ RESILIÊNCIA</span> ${reason}: −${amount} (${prev}→${next}) — ${state}
                ${next === 0 ? '<br><b style="color:#FF2B4A;">ARMA QUEBRADA! Exaustão Crítica.</b>' : ""}
            </div>`,
      });
      if (next === 0) {
        const nd = sys.data;
        nd.incarnation.collapsed = true;
        await sys.save(nd);
      }
    }

    // ─────────────────────────────────────────────────────────────────
    // [SINON] INTEGRIDADE ESPIRITUAL
    // ─────────────────────────────────────────────────────────────────
    async _integrChange(delta, reason) {
      const d = sys.data;
      const next = Math.max(0, Math.min(100, d.integridade.valor + delta));
      if (delta < 0) d.integridade.conflito_acumulado += Math.abs(delta);
      d.integridade.valor = next;
      await sys.save(d);
    }

    async _integridadeRitual() {
      const d = sys.data;
      const r = await new Roll("1d100").evaluate();
      const result = r.total <= d.integridade.valor ? "SUCESSO" : "FALHA";
      const delta = result === "SUCESSO" ? 10 : -10;
      await this._integrChange(delta, "Ritual do Julgamento");
      await ChatMessage.create({
        content: `
            <div style="border:2px solid #FFD700;padding:10px;background:#0a0a0f;text-align:center;">
                <div style="font-family:'Orbitron';font-size:14px;color:${result === "SUCESSO" ? "#2EFF7A" : "#FF2B4A"};">
                    ☯️ RITUAL DO JULGAMENTO — ${result}
                </div>
                <div style="color:#888;font-size:11px;">1d100 = ${r.total} vs Integridade ${d.integridade.valor}</div>
                <div style="font-size:12px;color:${delta > 0 ? "#2EFF7A" : "#FF2B4A"};">${delta > 0 ? "+" : ""}${delta} Integridade</div>
            </div>`,
      });
    }

    // ─────────────────────────────────────────────────────────────────
    // [SINON] XP + ITENS + SKILLS
    // ─────────────────────────────────────────────────────────────────
    async _addXP(type) {
      const amount = await Dialog.prompt({
        title: `+XP ${type}`,
        content: `<label>Quantidade de XP:<br><input type="number" name="xp" value="100" style="width:100%;"></label>`,
        callback: (html) =>
          Number(html[0].querySelector("[name=xp]").value) || 0,
        rejectClose: false,
      });
      if (!amount) return;
      const key = `progression.xp_${type}`;
      const d = sys.data;
      const current = foundry.utils.getProperty(d, key) || 0;
      await sys.update(key, current + amount);
      ui.notifications.info(`+${amount} XP ${type}!`);
      this.render();
    }

    async _useItem(idx) {
      const d = sys.data;
      const item = d.inventory[idx];
      if (!item) return;
      if (item.type === "consumable" && item.qtd > 0) {
        if (item.name.includes("HP") || item.name.includes("Poção HP")) {
          const heal = 10;
          const newHP = Math.min(d.core.hp.m, d.core.hp.v + heal);
          await sys.update("core.hp.v", newHP);
          d.inventory[idx].qtd--;
          await sys.save(sys.data);
          await ChatMessage.create({
            content: `<div style="border:1px solid #2EFF7A;padding:6px;background:#0a0a0f;font-size:11px;">
                    <span style="color:#2EFF7A;">💊 ${item.name}</span> — +${heal} PV (→${newHP})</div>`,
          });
        }
        this.render();
      }
    }

    async _useSkill(idx) {
      const d = sys.data;
      const sk = d.skills_tree[idx];
      if (!sk) return;
      const item = await fromUuid(sk.uuid).catch(() => null);
      if (item?.system?.formula || sk.formula) {
        const formula = item?.system?.formula || sk.formula || "1d8";
        const modEsp = Math.floor((d.attr.espirito - 10) / 2);
        const r = await new Roll(`${formula} + ${modEsp}`).evaluate();
        await ChatMessage.create({
          content: `
                <div style="border:2px solid #A855F7;padding:8px;background:#0a0a0f;border-radius:6px;">
                    <div style="font-family:'Orbitron';font-size:13px;font-weight:700;color:#A855F7;">
                        🌳 ${sk.name}: ${r.total}
                    </div>
                    <div style="font-size:11px;color:#555;">${formula}+ESP(${modEsp})</div>
                </div>`,
        });
      }
    }

    // ─────────────────────────────────────────────────────────────────
    // [SOFT_MIST] DRAG & DROP — SKILLS + EQUIPAMENTO
    // ─────────────────────────────────────────────────────────────────
    _activateDragDrop(html) {
      // SKILL TREE drop zone
      const dropZone = html.querySelector("#skill-drop-zone");
      if (dropZone) {
        dropZone.addEventListener("dragover", (e) => {
          e.preventDefault();
          dropZone.classList.add("dragover");
        });
        dropZone.addEventListener("dragleave", () =>
          dropZone.classList.remove("dragover"),
        );
        dropZone.addEventListener("drop", async (e) => {
          e.preventDefault();
          dropZone.classList.remove("dragover");
          try {
            const raw = e.dataTransfer.getData("text/plain");
            const dd = JSON.parse(raw);
            const item = await fromUuid(dd.uuid);
            if (!item) return;
            const nd = sys.data;
            nd.skills_tree.push({
              uuid: dd.uuid,
              name: item.name,
              img: item.img,
              type: item.type,
              formula: item.system?.formula || "1d6",
            });
            await sys.save(nd);
            this.render();
            ui.notifications.info(`✅ ${item.name} adicionada à Árvore!`);
          } catch (err) {
            console.warn("[OMNI v103] Drop erro:", err);
          }
        });
      }

      // EQUIPMENT SLOTS
      html.querySelectorAll(".equip-slot[data-slot]").forEach((slot) => {
        slot.addEventListener("dragover", (e) => {
          e.preventDefault();
          slot.style.borderColor = "#FFD700";
        });
        slot.addEventListener("dragleave", () => (slot.style.borderColor = ""));
        slot.addEventListener("drop", async (e) => {
          e.preventDefault();
          slot.style.borderColor = "";
          try {
            const raw = e.dataTransfer.getData("text/plain");
            const dd = JSON.parse(raw);
            const item = await fromUuid(dd.uuid);
            if (!item) return;
            const nd = sys.data;
            nd.equipment[slot.dataset.slot] = {
              uuid: dd.uuid,
              name: item.name,
              img: item.img,
              type: item.type,
            };
            await sys.save(nd);
            this.render();
          } catch (err) {
            console.warn("[OMNI v103] Equip drop erro:", err);
          }
        });
        slot.addEventListener("contextmenu", async (e) => {
          e.preventDefault();
          const nd = sys.data;
          nd.equipment[slot.dataset.slot] = null;
          await sys.save(nd);
          this.render();
        });
      });

      // HOTBAR SLOTS
      html.querySelectorAll(".hotbar-slot[data-hotbar]").forEach((slot) => {
        slot.addEventListener("dragover", (e) => {
          e.preventDefault();
          slot.style.borderColor = "#FFD700";
        });
        slot.addEventListener("dragleave", () => (slot.style.borderColor = ""));
        slot.addEventListener("drop", async (e) => {
          e.preventDefault();
          slot.style.borderColor = "";
          try {
            const raw = e.dataTransfer.getData("text/plain");
            const dd = JSON.parse(raw);
            const item = await fromUuid(dd.uuid);
            if (!item) return;
            const nd = sys.data;
            nd.hotbar[Number(slot.dataset.hotbar)] = {
              uuid: dd.uuid,
              name: item.name,
              img: item.img,
            };
            await sys.save(nd);
            this.render();
          } catch (err) {}
        });
        slot.addEventListener("contextmenu", async (e) => {
          e.preventDefault();
          const nd = sys.data;
          nd.hotbar[Number(slot.dataset.hotbar)] = null;
          await sys.save(nd);
          this.render();
        });
        slot.addEventListener("click", async () => {
          const nd = sys.data;
          const it = nd.hotbar[Number(slot.dataset.hotbar)];
          if (!it) return;
          const item = await fromUuid(it.uuid).catch(() => null);
          if (item?.sheet) item.sheet.render(true);
        });
      });
    }

    // UTILITY
    async _prompt(title, label, def = "") {
      return Dialog.prompt({
        title,
        rejectClose: false,
        content: `<label>${label}<br><input name="v" value="${def}" style="width:100%;"></label>`,
        callback: (html) => html[0].querySelector("[name=v]").value,
      });
    }

    async _confirmDialog(title, content) {
      return new Promise((resolve) => {
        new Dialog({
          title,
          content,
          buttons: {
            yes: { label: "Confirmar", callback: () => resolve(true) },
            no: { label: "Cancelar", callback: () => resolve(false) },
          },
          default: "no",
          close: () => resolve(false),
        }).render(true);
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // 6. RENDER — LANÇA O HUD
  // ═══════════════════════════════════════════════════════════════════
  const hud = new HunterHUDv103();
  await hud.render({ force: true });
})(); // fim IIFE
