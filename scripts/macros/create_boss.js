// ═══════════════════════════════════════════════════════════
// 👑 OMNI-SYSTEM: BOSS FACTORY (PROD-v4.0)
// ═══════════════════════════════════════════════════════════
// [GOHAN] - Multiplicadores de Boss v4.0
// Mini: 5x | Boss: 8x | Raid: 15x | World: 30x
// [POWER] - Player Scaling Integrado

const createBoss = async (config) => {
  const level = config.level;
  const players = config.players || 1;
  const type = config.type;

  const typeMults = { mini: 5, boss: 8, raid: 15, world: 30 };
  const mult = typeMults[type] || 1.0;

  // [POWER] - HP Scaling: Base * Mult * (1 + 0.5 * (Players - 1))
  const baseHP = 500 + level * 100;
  const scaledHP = Math.floor(baseHP * mult * (1 + 0.5 * (players - 1)));

  const stats = {
    hp: scaledHP,
    mana: Math.floor(level * 100 * mult),
    atk: Math.floor((40 + level * 10) * mult),
    def: Math.floor((30 + level * 6) * mult),
    spd: Math.floor(12 + level / 2),
  };

  const bossData = {
    name: config.name,
    type: "npc",
    img: "icons/svg/terror.svg",
    system: {
      level: level,
      props: {
        boss_type: type,
        hp: stats.hp,
        mana: stats.mana,
        atk: stats.atk,
        def: stats.def,
        spd: stats.spd,
        players: players,
      },
      phases: [
        { threshold: 1.0, label: "Fase 1: Inicial", atk_mult: 1.0 },
        { threshold: 0.5, label: "Fase 2: Fúria", atk_mult: 1.5 },
        { threshold: 0.2, label: "Fase 3: Última Resistência", atk_mult: 2.0 },
      ],
    },
    flags: {
      world: {
        omni_boss: true,
        type: type,
        created_at: Date.now(),
      },
    },
  };

  const template = game.items.find(
    (i) => i.name === "OMNI_BOSS_TEMPLATE" && i.type === "template",
  );
  if (template) bossData.system.template = template.id;

  const boss = await Actor.create(bossData);
  if (!boss) return;

  if (config.toCompendium) {
    const command = `
(async () => {
    const data = ${JSON.stringify(bossData, null, 2)};
    const actor = await Actor.create(data);
    ui.notifications.info(\`BOSS \${actor.name} [\${data.system.props.boss_type.toUpperCase()}] CHEGOU!\`);
    actor.sheet.render(true);
})();`;

    let pack =
      game.packs.get("world.omini-macros") ||
      game.packs.get("omini-system-vtt-assets.omini-macros");
    if (pack) {
      const macro = await Macro.create({
        name: `Incarner: ${boss.name}`,
        type: "script",
        command: command,
        img: boss.img,
      });
      await pack.importDocument(macro);
    }
  }

  ui.notifications.info(`👑 Boss ${boss.name} materializado com sucesso!`);
  boss.sheet.render(true);
};

(async () => {
  const content = `
  <style>
    .omni-factory { background: #0a0a0f; color: #fff; padding: 15px; font-family: 'Rajdhani', sans-serif; border: 2px solid #FFD700; box-shadow: 0 0 15px rgba(255, 215, 0, 0.2); }
    .omni-factory .form-group { margin-bottom: 12px; display: flex; flex-direction: column; }
    .omni-factory label { color: #FFD700; font-weight: bold; margin-bottom: 5px; line-height: 1.6; font-size: 1.1em;}
    .omni-factory input, .omni-factory select { background: #151520; color: #fff; border: 1px solid #444; padding: 8px; border-radius: 4px;}
    .omni-factory h2 { color: #FFD700; text-transform: uppercase; border-bottom: 2px solid #FFD700; padding-bottom: 5px; margin-bottom: 15px; letter-spacing: 3px; text-shadow: 0 0 10px rgba(255,215,0,0.5); }
  </style>
  <div class="omni-factory">
    <h2>👑 BOSS FACTORY</h2>
    <div class="form-group">
      <label>Identificação do Boss</label>
      <input type="text" id="name" value="Soberano das Sombras">
    </div>
    <div class="form-group" style="display:grid; grid-template-columns: 1fr 1fr; gap: 10px;">
      <div>
        <label>Nível</label>
        <input type="number" id="level" value="10" min="1">
      </div>
      <div>
        <label>Jogadores</label>
        <input type="number" id="players" value="4" min="1">
      </div>
    </div>
    <div class="form-group">
      <label>Magnitude de Desafio</label>
      <select id="type">
        <option value="mini">Mini-Boss (5x)</option>
        <option value="boss" selected>Boss Regional (8x)</option>
        <option value="raid">Raid Boss (15x)</option>
        <option value="world">World Boss (30x)</option>
      </select>
    </div>
    <div class="form-group" style="flex-direction:row; align-items:center; gap:10px; margin-top: 10px;">
      <input type="checkbox" id="toCompendium" checked>
      <label style="margin-bottom:0;">Gerar Artefato de Invocação (Macro)</label>
    </div>
  </div>`;

  const config = await Dialog.wait({
    title: "🌌 OMNI-SYSTEM | Boss Creation Matrix",
    content: content,
    buttons: {
      create: {
        icon: '<i class="fas fa-crown"></i>',
        label: "Manifestar",
        callback: (html) => ({
          name: html.find("#name").val(),
          level: parseInt(html.find("#level").val()) || 1,
          players: parseInt(html.find("#players").val()) || 1,
          type: html.find("#type").val(),
          toCompendium: html.find("#toCompendium").is(":checked"),
        }),
      },
    },
    default: "create",
  });

  if (config) await createBoss(config);
})();
