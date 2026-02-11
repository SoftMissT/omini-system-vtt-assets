// ═══════════════════════════════════════════════════════════
// 👤 OMNI-SYSTEM: NPC FACTORY (PROD-v4.0)
// ═══════════════════════════════════════════════════════════
// [SOFT_MIST] - NPCs com diálogo e quest flags
// [GOHAN] - Balanceamento v4.0 Integrado + CSB Linker
// [AKENO] - UI premium Manhwa Dark

const createNPC = async (config) => {
  const factionColors = {
    friendly: "#2EFF7A",
    neutral: "#FFD700",
    wary: "#FFA500",
    hostile: "#FF2B4A",
  };

  const dialogues = {
    merchant: {
      greeting: "Bem-vindo à minha loja! Tenho mercadorias raras...",
      trade: "Vejo que você tem bom olho. Posso fazer um desconto...",
      farewell: "Volte sempre! Novos itens chegam toda semana.",
    },
    // ... more dialogues can be expanded
  };

  const level = config.level;
  const con = 10 + level / 2; // Atributo base presumido para NPCs

  // [GOHAN] - HP Formula Phase 1/2
  let hp;
  if (level <= 20) {
    const picosBonus = Math.floor(level / 4) * (con * 5);
    hp = 50 + con * level + picosBonus;
  } else {
    const hpAt20 = 50 + con * 20 + 5 * con * 5;
    hp = hpAt20 + (level - 20) * (50 + con * 10);
  }

  const typeMult = { merchant: 1.2, quest: 1.0, trainer: 1.5, rival: 2.0 };
  const mult = typeMult[config.type] || 1.0;

  const stats = {
    hp: Math.floor(hp * mult),
    mana: Math.floor(50 * level * mult),
    atk: Math.floor((50 + level * 15) * mult),
    def: Math.floor((30 + level * 8) * mult),
    spd: Math.floor(10 + level / 2),
  };

  const npcData = {
    name: config.name,
    type: "npc",
    img: "icons/svg/mystery-man.svg",
    system: {
      level: level,
      props: {
        role: config.type,
        title: config.title,
        hp: stats.hp,
        hp_max: stats.hp,
        mana: stats.mana,
        mana_max: stats.mana,
        atk: stats.atk,
        def: stats.def,
        spd: stats.spd,
      },
      faction: {
        alignment: config.faction,
        color: factionColors[config.faction],
        reputation:
          config.faction === "friendly"
            ? 100
            : config.faction === "neutral"
              ? 0
              : config.faction === "wary"
                ? -50
                : -100,
      },
    },
    flags: {
      world: {
        omni_v102_npc: true,
        omni_v102_data: {
          created_at: Date.now(),
          con_base: con,
        },
      },
    },
  };

  // [SINON] - CSB Integration
  const template = game.items.find(
    (i) => i.name === "OMNI_NPC_TEMPLATE" && i.type === "template",
  );
  if (template) npcData.system.template = template.id;

  const npc = await Actor.create(npcData);
  if (!npc) return ui.notifications.error("Erro ao criar NPC!");

  // [MAKO] - Compendium Macro
  if (config.toCompendium) {
    const macroName = `Spawn ${npc.name}`;
    const commandText = `
(async () => {
    const data = ${JSON.stringify(npcData, null, 2)};
    const actor = await Actor.create(data);
    ui.notifications.info(\`NPC \${actor.name} materializado!\`);
    actor.sheet.render(true);
})();`;

    let pack =
      game.packs.get("world.omini-macros") ||
      game.packs.get("omini-system-vtt-assets.omini-macros");
    if (!pack && game.user.isGM) {
      pack = await CompendiumCollection.createCompendium({
        name: "omini-macros",
        label: "OMNI Generated Macros",
        type: "Macro",
      });
    }

    if (pack) {
      const macro = await Macro.create({
        name: macroName,
        type: "script",
        command: commandText,
        img: npc.img,
      });
      await pack.importDocument(macro);
    }
  }

  ui.notifications.info(`✅ NPC ${npc.name} criado!`);
  npc.sheet.render(true);
};

// [AKENO] - UI Synthesis
(async () => {
  const content = `
  <style>
    .omni-factory { 
      background: #0a0a0f; 
      color: #fff; 
      padding: 15px; 
      font-family: 'Rajdhani', sans-serif;
      border: 1px solid #00D9FF;
      border-radius: 5px;
    }
    .omni-factory .form-group { 
      margin-bottom: 15px; 
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .omni-factory label { 
      color: #00D9FF; 
      font-weight: bold; 
      font-size: 1.1em;
      line-height: 1.6;
    }
    .omni-factory input, .omni-factory select { 
      background: #151520; 
      color: #fff; 
      border: 1px solid #333; 
      padding: 8px;
      border-radius: 4px;
      font-size: 1em;
    }
    .omni-factory h2 {
      margin-top: 0;
      color: #FFD700;
      text-transform: uppercase;
      border-bottom: 2px solid #FFD700;
      padding-bottom: 5px;
      margin-bottom: 15px;
      letter-spacing: 2px;
    }
    .checkbox-group {
      flex-direction: row !important;
      align-items: center;
      gap: 10px !important;
    }
  </style>
  <div class="omni-factory">
    <h2>🧬 NPC CREATOR</h2>
    <div class="form-group">
      <label>Nome do Personagem</label>
      <input type="text" id="name" placeholder="Ex: Kirito" value="Novo NPC">
    </div>
    <div class="form-group">
      <label>Título / Ofício</label>
      <input type="text" id="title" placeholder="Ex: Espadachim Negro" value="Habitante">
    </div>
    <div class="form-group">
      <label>Nível</label>
      <input type="number" id="level" value="1" min="1">
    </div>
    <div class="form-group">
      <label>Função</label>
      <select id="type">
        <option value="merchant">Comerciante</option>
        <option value="quest">Doador de Quests</option>
        <option value="trainer">Treinador</option>
        <option value="rival">Rival</option>
      </select>
    </div>
    <div class="form-group">
      <label>Facção</label>
      <select id="faction">
        <option value="friendly">Amigo</option>
        <option value="neutral" selected>Neutro</option>
        <option value="hostile">Inimigo</option>
      </select>
    </div>
    <div class="form-group checkbox-group">
      <input type="checkbox" id="toCompendium" checked>
      <label>Gerar Macro de Invocação</label>
    </div>
  </div>`;

  const config = await Dialog.wait({
    title: "🌌 OMNI-SYSTEM | Gerador de NPCs",
    content: content,
    buttons: {
      create: {
        icon: '<i class="fas fa-magic"></i>',
        label: "Materializar",
        callback: (html) => {
          const level = parseInt(html.find("#level").val()) || 1;
          const type = html.find("#type").val();

          // [GOHAN] - Multipliers from docs
          const typeMult = {
            merchant: 1.2,
            quest: 1.0,
            trainer: 1.5,
            rival: 2.0,
          };
          const mult = typeMult[type] || 1.0;

          return {
            name: html.find("#name").val(),
            title: html.find("#title").val(),
            level: level,
            type: type,
            faction: html.find("#faction").val(),
            toCompendium: html.find("#toCompendium").is(":checked"),
            stats: {
              hp: Math.floor(100 * level * mult),
              mana: Math.floor(50 * level * mult),
              atk: Math.floor(10 * level * mult),
              def: Math.floor(8 * level * mult),
              spd: Math.floor(10 + level / 2),
            },
          };
        },
      },
      cancel: {
        icon: '<i class="fas fa-times"></i>',
        label: "Abortar",
      },
    },
    default: "create",
  });

  if (config) {
    await createNPC(config);
  }
})();
