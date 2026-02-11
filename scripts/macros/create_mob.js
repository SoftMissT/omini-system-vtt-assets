// ═══════════════════════════════════════════════════════════
// 👾 OMNI-SYSTEM: MOB GENERATOR (PROD-v4.0)
// ═══════════════════════════════════════════════════════════
// [GOHAN] - Multiplicadores de Rank v4.0
// Rank: Comum (1x), Elite (2x), Named (3.5x)
// [AKENO] - UI Premium

const createMob = async (config) => {
  const level = config.level;
  const rank = config.rank;

  const rankMults = {
    comum: 1.0,
    elite: 2.0,
    named: 3.5,
  };
  const mult = rankMults[rank] || 1.0;

  // [GOHAN] - Linear scaling Phase 1
  const stats = {
    hp: Math.floor((100 + level * 40) * mult),
    mana: Math.floor((50 + level * 20) * mult),
    atk: Math.floor((15 + level * 5) * mult),
    def: Math.floor((10 + level * 3) * mult),
    spd: Math.floor(
      8 + level / 4 + (rank === "elite" ? 2 : rank === "named" ? 5 : 0),
    ),
  };

  const mobData = {
    name: config.name,
    type: "npc",
    img: "icons/svg/beast.svg",
    system: {
      level: level,
      props: {
        rank: rank,
        hp: stats.hp,
        mana: stats.mana,
        atk: stats.atk,
        def: stats.def,
        spd: stats.spd,
      },
    },
    flags: {
      world: {
        omni_mob: true,
        rank: rank,
        created_at: Date.now(),
      },
    },
  };

  // [SINON] - Link to CSB Template
  const template = game.items.find(
    (i) => i.name === "OMNI_MOB_TEMPLATE" && i.type === "template",
  );
  if (template) mobData.system.template = template.id;

  const mob = await Actor.create(mobData);
  if (!mob) return;

  // [MAKO] - Spawn Macro
  if (config.toCompendium) {
    const command = `
(async () => {
    const data = ${JSON.stringify(mobData, null, 2)};
    const actor = await Actor.create(data);
    ui.notifications.info(\`Mob \${actor.name} [\${data.system.props.rank}] materializado!\`);
    actor.sheet.render(true);
})();`;

    let pack =
      game.packs.get("world.omini-macros") ||
      game.packs.get("omini-system-vtt-assets.omini-macros");
    if (pack) {
      const macro = await Macro.create({
        name: `Spawn: ${mob.name} (${rank})`,
        type: "script",
        command: command,
        img: mob.img,
      });
      await pack.importDocument(macro);
    }
  }

  ui.notifications.info(`👾 Mob ${mob.name} criado!`);
  mob.sheet.render(true);
};

(async () => {
  const content = `
  <style>
    .omni-factory { background: #0a0a0f; color: #fff; padding: 15px; font-family: 'Rajdhani', sans-serif; border: 1px solid #FF2B4A; }
    .omni-factory .form-group { margin-bottom: 12px; display: flex; flex-direction: column; }
    .omni-factory label { color: #FF2B4A; font-weight: bold; margin-bottom: 5px; line-height: 1.4; }
    .omni-factory input, .omni-factory select { background: #151520; color: #fff; border: 1px solid #333; padding: 6px; }
    .omni-factory h2 { color: #FF2B4A; text-transform: uppercase; border-bottom: 2px solid #FF2B4A; padding-bottom: 5px; margin-bottom: 15px; }
  </style>
  <div class="omni-factory">
    <h2>👾 MOB SPAWNER</h2>
    <div class="form-group">
      <label>Nome da Criatura</label>
      <input type="text" id="name" value="Lobo das Sombras">
    </div>
    <div class="form-group">
      <label>Nível</label>
      <input type="number" id="level" value="1" min="1">
    </div>
    <div class="form-group">
      <label>Rank de Perigo</label>
      <select id="rank">
        <option value="comum">Comum (1.0x)</option>
        <option value="elite">Elite (2.0x)</option>
        <option value="named">Nomeado (3.5x)</option>
      </select>
    </div>
    <div class="form-group" style="flex-direction:row; align-items:center; gap:10px;">
      <input type="checkbox" id="toCompendium" checked>
      <label style="margin-bottom:0;">Macro de Compêndio</label>
    </div>
  </div>`;

  const config = await Dialog.wait({
    title: "🌌 OMNI-SYSTEM | Mob Spawner",
    content: content,
    buttons: {
      create: {
        icon: '<i class="fas fa-skull"></i>',
        label: "Spawnar",
        callback: (html) => ({
          name: html.find("#name").val(),
          level: parseInt(html.find("#level").val()) || 1,
          rank: html.find("#rank").val(),
          toCompendium: html.find("#toCompendium").is(":checked"),
        }),
      },
    },
    default: "create",
  });

  if (config) await createMob(config);
})();
