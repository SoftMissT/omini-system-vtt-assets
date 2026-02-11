/**
 * 🌌 OMNI-SYSTEM: Master Database
 * Source of truth for all legendary items, skills, and meta-data.
 * NOTE: Using type: 'item' for all documents to ensure compatibility with Custom System Builder (CSB).
 */

const OMNI_DB = {
  // --- ARMAS LENDÁRIAS & SACRED GEARS ---
  weapons: [
    {
      name: "Rasgar do Eclipse",
      tier: "Lendário",
      type: "item",
      system: {
        props: {
          itemType: "weapon",
          damage: "1d10",
          passive: "Modo Luz/Trevas",
        },
      },
      img: "icons/weapons/swords/sword-guard-glowing.webp",
    },
    {
      name: "Garra do Hunter-King",
      tier: "Mítico",
      type: "item",
      system: {
        props: {
          itemType: "weapon",
          damage: "1d8",
          passive: "Evolução Dinâmica",
        },
      },
      img: "icons/weapons/claws/claw-ruby.webp",
    },
    {
      name: "True Longinus",
      tier: "Conceito",
      type: "item",
      system: {
        props: {
          itemType: "weapon",
          damage: "3d12",
          passive: "Perfura Deuses",
        },
      },
      img: "icons/weapons/polearms/spear-flamed-white.webp",
    },
    {
      name: "Boosted Gear",
      tier: "Mítico",
      type: "item",
      system: {
        props: { itemType: "weapon", damage: "1d8", passive: "Boost x2 Power" },
      },
      img: "icons/equipment/hand/gauntlet-armored-red.webp",
    },
    {
      name: "Elucidator",
      tier: "Lendário",
      type: "item",
      system: {
        props: { itemType: "weapon", damage: "2d8+Dark", value: 10000000 },
      },
      img: "icons/weapons/swords/sword-fine-black.webp",
    },
    {
      name: "Dark Repulser",
      tier: "Lendário",
      type: "item",
      system: {
        props: { itemType: "weapon", damage: "2d8+Ice", value: 9000000 },
      },
      img: "icons/weapons/swords/sword-fine-blue.webp",
    },
  ],
  // --- SKILLS ---
  skills: [
    {
      name: "Skill: Starburst Stream",
      tier: "Lendário",
      type: "item",
      system: { props: { itemType: "skill", effect: "16 Hits Combo" } },
      img: "icons/magic/light/explosion-star-blue.webp",
    },
    {
      name: "Skill: The Eclipse",
      tier: "Mítico",
      type: "item",
      system: { props: { itemType: "skill", effect: "27 Hits Ultimate" } },
      img: "icons/magic/unholy/orb-dark-swirl.webp",
    },
    {
      name: "Skill: Shadow Extraction",
      tier: "Conceito",
      type: "item",
      system: { props: { itemType: "skill", effect: "Ergue Exército" } },
      img: "icons/magic/death/undead-skeleton-hand-purple.webp",
    },
  ],
  // --- MATERIAIS ---
  materials: [
    {
      name: "Ætherium",
      tier: "Raro",
      type: "item",
      system: { props: { itemType: "material", effect: "+1 Slot Skill" } },
      img: "icons/commodities/materials/ore-crystalline-blue.webp",
    },
    {
      name: "Stygian Steel",
      tier: "Épico",
      type: "item",
      system: { props: { itemType: "material", effect: "Sangue Sombrio" } },
      img: "icons/commodities/materials/ore-black.webp",
    },
    {
      name: "Hiiirokane",
      tier: "Lendário",
      type: "item",
      system: { props: { itemType: "material", effect: "Dano Solar" } },
      img: "icons/commodities/materials/ore-gold.webp",
    },
  ],
  // --- SHOP ---
  shop: [
    {
      name: "Poção de HP (Grande)",
      tier: "Comum",
      type: "item",
      system: {
        props: {
          itemType: "consumable",
          value: 500,
          effect: "Recupera 500 HP",
        },
      },
      img: "icons/consumables/potions/potion-tube-corked-red.webp",
    },
    {
      name: "Ticket Gacha",
      tier: "Raro",
      type: "item",
      system: { props: { itemType: "ticket", value: 5000 } },
      img: "icons/commodities/currency/coin-gold-diamond.webp",
    },
  ],
  // --- PETS ---
  pets: [
    {
      name: "Igris (Cavaleiro)",
      tier: "Lendário",
      type: "item",
      system: { props: { itemType: "pet" } },
      img: "icons/creatures/humanoids/knight-armored-purple.webp",
    },
    {
      name: "Kaiser (Dragão)",
      tier: "Mítico",
      type: "item",
      system: { props: { itemType: "pet" } },
      img: "icons/creatures/dragons/dragon-head-blue.webp",
    },
  ],
};

window.OMNI_DB = OMNI_DB;
