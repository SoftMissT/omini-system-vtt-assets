/* ═══════════════════════════════════════════════════════════════
 * OMNI-SYSTEM v4.0 - RADAR CORE EXPANDED
 * Absolute Detection Matrix - 3 Layers de Percepção
 * Inspiração: Solo Leveling, Demon Slayer, Omniscient Reader
 * Autor: MAKO-SYN05 [CARDINAL + MAKO]
 * ═══════════════════════════════════════════════════════════════ */

export class RadarCoreExpanded {

  constructor() {
    this.radarRange = 50;
    this.scanInterval = null;
    this.layers = {
      physical: { active: true, range: 0, color: '#00BCD4' },
      spiritual: { active: false, range: 0, color: '#9C27B0' },
      conceptual: { active: false, range: 0, color: '#F44336' }
    };
    this.counts = {};
  }

  // ─────────────────────────────────────────────────────────────
  // INICIALIZAR RADAR
  // ─────────────────────────────────────────────────────────────
  async init(actor) {
    this.actor = actor;

    // Calcular ranges por layer
    const MEN = actor.system.attributes.men?.value || 0;
    const ESP = actor.system.attributes.esp?.value || 0;
    const LEVEL = actor.system.attributes.level?.value || 1;

    this.layers.physical.range = MEN * 5;
    this.layers.spiritual.range = ESP * 10;
    this.layers.conceptual.range = Infinity;

    // Desbloquear layers
    if (ESP >= 3) this.layers.spiritual.active = true;
    if (LEVEL >= 14) {
      const hasQuest = actor.getFlag('world', 'perception_quest_complete');
      if (hasQuest) this.layers.conceptual.active = true;
    }

    // UI
    await this._createRadarUI();

    // Iniciar scan automático
    this.scanInterval = setInterval(() => this._scan(), 2000);

    console.log('✅ Radar ADM inicializado:', this.layers);
  }

  // ─────────────────────────────────────────────────────────────
  // CRIAR UI DO RADAR
  // ─────────────────────────────────────────────────────────────
  async _createRadarUI() {
    const html = `
      <div id="adm-radar" style="
        position: fixed;
        top: 80px;
        right: 20px;
        width: 300px;
        background: rgba(10, 10, 15, 0.95);
        border: 2px solid #00BCD4;
        border-radius: 8px;
        padding: 15px;
        font-family: 'Orbitron', monospace;
        z-index: 1000;
        box-shadow: 0 0 20px rgba(0, 188, 212, 0.5);
      ">
        <div style="border-bottom: 1px solid #00BCD4; padding-bottom: 10px; margin-bottom: 10px;">
          <h3 style="margin: 0; color: #00BCD4; text-align: center;">
            👁️ ABSOLUTE DETECTION MATRIX
          </h3>
          <p style="margin: 5px 0 0 0; font-size: 0.8em; color: #666; text-align: center;">
            v1.0 - OMNISCIENT PROTOCOL
          </p>
        </div>

        <!-- LAYERS -->
        <div id="adm-layers" style="margin-bottom: 10px;">
          <button data-layer="physical" class="adm-layer-btn active" style="background: ${this.layers.physical.color};">
            🌐 FÍSICO (${this.layers.physical.range}m)
          </button>
          <button data-layer="spiritual" class="adm-layer-btn ${this.layers.spiritual.active ? '' : 'locked'}" style="background: ${this.layers.spiritual.color};">
            ${this.layers.spiritual.active ? '🔮 ESPIRITUAL' : '🔒 BLOQUEADO'} (${this.layers.spiritual.range}m)
          </button>
          <button data-layer="conceptual" class="adm-layer-btn ${this.layers.conceptual.active ? '' : 'locked'}" style="background: ${this.layers.conceptual.color};">
            ${this.layers.conceptual.active ? '👁️ CONCEITUAL' : '🔒 BLOQUEADO'} (∞)
          </button>
        </div>

        <!-- RADAR CANVAS -->
        <div id="adm-canvas" style="
          width: 100%;
          height: 250px;
          background: #000;
          border: 1px solid #00BCD4;
          position: relative;
          overflow: hidden;
        ">
          <div id="adm-blips"></div>
        </div>

        <!-- STATS -->
        <div id="adm-stats" style="margin-top: 10px; font-size: 0.85em; color: #aaa;">
          <div id="adm-counts">Scanning...</div>
        </div>

        <!-- THREAT LIST -->
        <div id="adm-threats" style="margin-top: 10px; max-height: 150px; overflow-y: auto;">
          <h4 style="color: #F44336; margin: 0 0 5px 0; font-size: 0.9em;">⚠️ AMEAÇAS ATIVAS</h4>
          <div id="adm-threat-list"></div>
        </div>
      </div>

      <style>
        .adm-layer-btn {
          width: 100%;
          padding: 8px;
          margin: 3px 0;
          border: none;
          border-radius: 4px;
          color: white;
          font-family: 'Orbitron', monospace;
          cursor: pointer;
          font-size: 0.85em;
        }
        .adm-layer-btn.locked {
          background: #333 !important;
          cursor: not-allowed;
          opacity: 0.5;
        }
        .adm-layer-btn.active {
          box-shadow: 0 0 10px currentColor;
        }
        .adm-blip {
          position: absolute;
          border-radius: 50%;
          transition: all 0.3s;
        }
        .adm-blip.neutral {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.6);
          animation: pulse-slow 2s infinite;
        }
        .adm-blip.hostile {
          width: 10px;
          height: 10px;
          background: #F44336;
          box-shadow: 0 0 8px #F44336;
          animation: pulse-fast 1.5s infinite;
        }
        .adm-blip.elite {
          width: 14px;
          height: 14px;
          background: #9C27B0;
          box-shadow: 0 0 10px #9C27B0;
          border: 2px solid #fff;
          animation: glow 2s infinite;
        }
        .adm-blip.legendary {
          width: 18px;
          height: 18px;
          background: linear-gradient(135deg, #F44336, #9C27B0);
          box-shadow: 0 0 15px #FFD700;
          border: 2px solid #FFD700;
          animation: rotate-glow 3s infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        @keyframes pulse-fast {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 10px #9C27B0; }
          50% { box-shadow: 0 0 20px #9C27B0; }
        }
        @keyframes rotate-glow {
          0% { transform: rotate(0deg); box-shadow: 0 0 15px #FFD700; }
          50% { box-shadow: 0 0 30px #FFD700; }
          100% { transform: rotate(360deg); box-shadow: 0 0 15px #FFD700; }
        }
      </style>
    `;

    $('body').append(html);

    // Event listeners
    $('.adm-layer-btn').on('click', (e) => {
      const layer = $(e.currentTarget).data('layer');
      if (!this.layers[layer].active) return;
      
      $('.adm-layer-btn').removeClass('active');
      $(e.currentTarget).addClass('active');
    });
  }

  // ─────────────────────────────────────────────────────────────
  // SCAN DO RADAR
  // ─────────────────────────────────────────────────────────────
  async _scan() {
    if (!this.actor?.token) {
      $('#adm-counts').text('⚠️ SEM SINAL - Selecione um token');
      return;
    }

    this.counts = { neutral: 0, hostile: 0, elite: 0, legendary: 0 };
    const threats = [];
    const blips = [];

    const tokens = canvas.tokens.placeables.filter(t => t.id !== this.actor.token.id);

    for (const t of tokens) {
      const dist = canvas.grid.measureDistance(this.actor.token, t);
      const entity = this._classifyEntity(t, dist);

      if (!entity) continue;

      // Adicionar blip
      blips.push(entity);

      // Adicionar ameaça se hostil
      if (entity.threat >= 50) {
        threats.push({ ...entity, distance: dist });
      }
    }

    // Atualizar UI
    this._updateBlips(blips);
    this._updateCounts();
    this._updateThreats(threats);
  }

  // ─────────────────────────────────────────────────────────────
  // CLASSIFICAR ENTIDADE
  // ─────────────────────────────────────────────────────────────
  _classifyEntity(token, distance) {
    const actor = token.actor;
    if (!actor) return null;

    // Layer check
    const activeLayer = $('.adm-layer-btn.active').data('layer') || 'physical';
    const layerRange = this.layers[activeLayer].range;

    if (distance > layerRange && layerRange !== Infinity) return null;

    // Classificação
    let type = 'neutral';
    let killingIntent = 0;
    let threat = 0;

    const typeName = actor.type?.toLowerCase();
    const name = actor.name?.toLowerCase() || '';

    // Layer Física: detecção básica
    if (activeLayer === 'physical') {
      if (typeName === 'npc' || name.includes('enemy')) {
        type = 'hostile';
        killingIntent = Math.floor(Math.random() * 100);
        threat = 50;
        this.counts.hostile++;
      } else {
        type = 'neutral';
        this.counts.neutral++;
      }
    }

    // Layer Espiritual: intenção assassina
    if (activeLayer === 'spiritual') {
      killingIntent = Math.floor(Math.random() * 100);
      
      if (killingIntent > 50) {
        type = 'hostile';
        threat = killingIntent;
        this.counts.hostile++;
      }

      if (name.includes('elite') || name.includes('boss')) {
        type = 'elite';
        threat = 80;
        this.counts.elite++;
      }
    }

    // Layer Conceitual: detecção de bosses/legendários
    if (activeLayer === 'conceptual') {
      if (actor.system?.details?.type?.value === 'boss' || name.includes('legendary')) {
        type = 'legendary';
        threat = 100;
        killingIntent = 95;
        this.counts.legendary++;
      } else if (name.includes('elite')) {
        type = 'elite';
        threat = 80;
        this.counts.elite++;
      }
    }

    return {
      token,
      type,
      killingIntent,
      threat,
      x: token.x,
      y: token.y
    };
  }

  // ─────────────────────────────────────────────────────────────
  // ATUALIZAR BLIPS NO CANVAS
  // ─────────────────────────────────────────────────────────────
  _updateBlips(entities) {
    const canvas = $('#adm-canvas');
    const blipsContainer = $('#adm-blips');
    blipsContainer.empty();

    const centerX = canvas.width() / 2;
    const centerY = canvas.height() / 2;
    const scale = 250 / this.radarRange;

    for (const entity of entities) {
      const relX = (entity.x - this.actor.token.x) * scale;
      const relY = (entity.y - this.actor.token.y) * scale;

      const blip = $(`<div class="adm-blip ${entity.type}"></div>`);
      blip.css({
        left: centerX + relX,
        top: centerY + relY
      });

      blip.attr('title', `${entity.token.name} - ${entity.threat}% threat`);

      // Click para selecionar token
      blip.on('click', () => {
        entity.token.control({ releaseOthers: true });
        canvas.animatePan({ x: entity.token.x, y: entity.token.y });
      });

      blipsContainer.append(blip);
    }

    // Adicionar blip do player (centro)
    const playerBlip = $('<div class="adm-blip" style="width: 12px; height: 12px; background: #00BCD4; border: 2px solid #fff;"></div>');
    playerBlip.css({ left: centerX - 6, top: centerY - 6 });
    blipsContainer.append(playerBlip);
  }

  // ─────────────────────────────────────────────────────────────
  // ATUALIZAR CONTADORES
  // ─────────────────────────────────────────────────────────────
  _updateCounts() {
    const html = `
      🟢 Neutro: ${this.counts.neutral || 0}
      🔴 Hostil: ${this.counts.hostile || 0}
      🟣 Elite: ${this.counts.elite || 0}
      ⭐ Legendary: ${this.counts.legendary || 0}
    `;
    $('#adm-counts').html(html);
  }

  // ─────────────────────────────────────────────────────────────
  // ATUALIZAR LISTA DE AMEAÇAS
  // ─────────────────────────────────────────────────────────────
  _updateThreats(threats) {
    const sorted = threats.sort((a, b) => b.threat - a.threat).slice(0, 3);
    
    const html = sorted.map(t => {
      const color = t.threat >= 80 ? '#F44336' : t.threat >= 50 ? '#FF9800' : '#FFC107';
      const icon = t.threat >= 80 ? '🔴' : t.threat >= 50 ? '🟠' : '🟡';
      
      return `
        <div style="background: rgba(0,0,0,0.5); border-left: 4px solid ${color}; padding: 5px; margin: 2px 0; font-size: 0.8em;">
          <strong>${icon} ${t.token.name}</strong><br>
          <span style="color: #aaa;">${t.distance.toFixed(1)}m | Intent: ${t.killingIntent}%</span>
        </div>
      `;
    }).join('');

    $('#adm-threat-list').html(html || '<p style="color: #666; font-size: 0.8em;">Nenhuma ameaça detectada</p>');
  }

  // ─────────────────────────────────────────────────────────────
  // DESTRUIR RADAR
  // ─────────────────────────────────────────────────────────────
  destroy() {
    clearInterval(this.scanInterval);
    $('#adm-radar').remove();
  }
}

// ═══════════════════════════════════════════════════════════════
// EXPORTAR PARA ESCOPO GLOBAL
// ═══════════════════════════════════════════════════════════════
globalThis.RadarCoreExpanded = RadarCoreExpanded;

Hooks.once('ready', () => {
  console.log('✅ RadarCoreExpanded v4.0 carregado');
});
