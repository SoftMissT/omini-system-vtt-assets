/**
 * 🌌 OMNI-SYSTEM SKILL DATABASE
 * Extracted from "SKILL TREE FRACTAL" Architecture
 */

export const SKILL_DB = [
    // --- NÚCLEO: ESPADACHIM TRANSCENDENTAL ---
    
    // GALHO: Hoshina Style (Kaiju No. 8)
    {
        name: "Hoshina Style: 1st Form - Empty Strike",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/melee/hoshina_1.webp",
        system: {
            tier: 3,
            branch: "Hoshina Style",
            description: "Um corte invisível que atinge o vácuo.",
            rarity: "rare",
            mana_cost: 20,
            cooldown: 5
        }
    },
    {
        name: "Hoshina Style: 2nd Form - Cross Strike",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/melee/hoshina_2.webp",
        system: {
            tier: 3,
            branch: "Hoshina Style",
            description: "Dois cortes simultâneos em cruz.",
            rarity: "rare",
            mana_cost: 30,
            cooldown: 8
        }
    },
    {
        name: "Hoshina Style: 3rd Form - Return Strike",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/melee/hoshina_3.webp",
        system: {
            tier: 4,
            branch: "Hoshina Style",
            description: "Um contra-ataque que usa a força do oponente.",
            rarity: "legendary",
            mana_cost: 40,
            cooldown: 12
        }
    },
    {
        name: "Hoshina Style: 4th Form - Blade Fog",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/melee/hoshina_4.webp",
        system: {
            tier: 4,
            branch: "Hoshina Style",
            description: "Cria uma névoa de cortes que confunde a percepção.",
            rarity: "legendary",
            mana_cost: 50,
            cooldown: 20
        }
    },
    {
        name: "Hoshina Style: 5th Form - Piercing Strike",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/melee/hoshina_5.webp",
        system: {
            tier: 5,
            branch: "Hoshina Style",
            description: "Uma estocada focada em perfuração absoluta.",
            rarity: "legendary",
            mana_cost: 60,
            cooldown: 15
        }
    },
    {
        name: "Hoshina Style: 6th Form - High-Frequency Shred",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/melee/hoshina_6.webp",
        system: {
            tier: 6,
            branch: "Hoshina Style",
            description: "Vibra a lâmina em alta frequência para desintegrar matéria.",
            rarity: "mythic",
            mana_cost: 100,
            cooldown: 30
        }
    },
    {
        name: "Hoshina Style: 7th Form - Soshiro's Custom",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/melee/hoshina_7.webp",
        system: {
            tier: 7,
            branch: "Hoshina Style",
            description: "Combina as 6 formas em um movimento fluido de 777 cortes.",
            rarity: "conceptual",
            mana_cost: 200,
            cooldown: 300,
            lore: "A técnica personalizada de Soshiro Hoshina. Dizem que ele viu a morte e a cortou em 777 pedaços."
        }
    },

    // GALHO: Breaking the Sky Swordmanship (ORV)
    {
        name: "Breaking the Sky Strike",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/melee/breaking_sky_1.webp",
        system: {
            tier: 5,
            branch: "Breaking the Sky",
            description: "Um golpe capaz de partir o céu.",
            rarity: "legendary",
            mana_cost: 80,
            cooldown: 25
        }
    },
    {
        name: "Hundred Steps Godly Fists",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/melee/godly_fists.webp",
        system: {
            tier: 6,
            branch: "Breaking the Sky",
            description: "Cem socos divinos em um instante.",
            rarity: "mythic",
            mana_cost: 120,
            cooldown: 40
        }
    },
    {
        name: "Transcendence Mode",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/buff/transcendence.webp",
        system: {
            tier: 7,
            branch: "Breaking the Sky",
            description: "Entra em estado transcendental, ignorando limites físicos.",
            rarity: "conceptual",
            mana_cost: 150,
            cooldown: 600
        }
    },
    {
        name: "Final Form: Fable Severance",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/melee/fable_severance.webp",
        system: {
            tier: 8,
            branch: "Breaking the Sky",
            description: "Corta a própria história (Fábula) do alvo.",
            rarity: "divine",
            mana_cost: 500,
            cooldown: 3600,
            lore: "Um golpe que não corta apenas carne, mas a narrativa da existência do alvo."
        }
    },

    // GALHO: Dark Heavenly Demon (Solo Max Level Newbie)
    {
        name: "Dark Emperor's Breath",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/magic/dark_breath.webp",
        system: {
            tier: 5,
            branch: "Dark Heavenly Demon",
            description: "Sopro de energia negra destrutiva.",
            rarity: "legendary",
            mana_cost: 70,
            cooldown: 20
        }
    },
    {
        name: "Dark Heaven: Absolute Void",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/magic/absolute_void.webp",
        system: {
            tier: 7,
            branch: "Dark Heavenly Demon",
            description: "Cria um vácuo absoluto que consome luz e som.",
            rarity: "conceptual",
            mana_cost: 250,
            cooldown: 300
        }
    },

    // --- FUSIONS & UNIQUE ---
    {
        name: "Omniscient Blade Emperor",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/fusion/blade_emperor.webp",
        system: {
            tier: 8,
            branch: "Fusion",
            description: "Velocidade de Hoshina + Dano Conceitual de ORV + Domínio de Sombras.",
            rarity: "divine",
            mana_cost: 600,
            cooldown: 7200,
            lore: "Fusão Proibida: Hoshina Style 7th Form + Breaking the Sky Final Form."
        }
    },
    {
        name: "Passo da Divindade Omnisciente",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/fusion/god_step_omni.webp",
        system: {
            tier: 7,
            branch: "Fusion",
            description: "Teleporte instantâneo com previsão de futuro.",
            rarity: "conceptual",
            mana_cost: 200,
            cooldown: 10,
            lore: "Fusão: God Step + Metavision."
        }
    },
    // --- 🌊 WATER BREATHING (Respiração da Água) ---
    {
        name: "Ichi no Kata: Minamo Giri",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/water/form_1.webp",
        system: {
            tier: "tier1",
            category: "breathing",
            description: "Primeira Forma: Corte d'Água Superficial. Golpe horizontal fluido. +2 Acerto após avanço.",
            cost: "1-6 PC",
            damage: "1d6 - 2d6"
        }
    },
    {
        name: "Ni no Kata: Mizu Guruma",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/water/form_2.webp",
        system: {
            tier: "tier1",
            category: "breathing",
            description: "Segunda Forma: Roda d'Água. Salto com giro vertical. Empurra 1.5m.",
            cost: "2-5 PC",
            damage: "1d8 - 2d8"
        }
    },
    {
        name: "San no Kata: Ryūryū Mai",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/water/form_3.webp",
        system: {
            tier: "tier2",
            category: "breathing",
            description: "Terceira Forma: Dança da Corrente Rápida. Não provoca ataques de oportunidade.",
            cost: "3-6 PC",
            damage: "2x 1d4 - 2x 1d10"
        }
    },
    {
        name: "Shi no Kata: Uchishio",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/water/form_4.webp",
        system: {
            tier: "tier2",
            category: "breathing",
            description: "Quarta Forma: Maré Crescente. Cortes consecutivos.",
            cost: "3-6 PC",
            damage: "3x 1d4 - 3x 1d10"
        }
    },
    {
        name: "Go no Kata: Kanten no Jiu",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/water/form_5.webp",
        system: {
            tier: "tier2",
            category: "breathing",
            description: "Quinta Forma: Chuva Abençoada. Morte instantânea em rendidos/low HP.",
            cost: "2-5 PC",
            damage: "2d6 - 3d6 (Mercy)"
        }
    },
    {
        name: "Roku no Kata: Nejire Uzu",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/water/form_6.webp",
        system: {
            tier: "tier2",
            category: "breathing",
            description: "Sexta Forma: Redemoinho. Atordoa inimigos em raio de 3m.",
            cost: "4-7 PC",
            damage: "1d8 - 2d8 (AoE)"
        }
    },
    {
        name: "Shichi no Kata: Shizuku Hamonzuki",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/water/form_7.webp",
        system: {
            tier: "tier3",
            category: "breathing",
            description: "Sétima Forma: Estocada Ondulada. Bloqueio preciso como Reação.",
            cost: "3-6 PC",
            damage: "Defense Only"
        }
    },
    {
        name: "Hachi no Kata: Takitsubo",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/water/form_8.webp",
        system: {
            tier: "tier3",
            category: "breathing",
            description: "Oitava Forma: Jarro de Cachoeira. Dano dobrado em caídos.",
            cost: "4-7 PC",
            damage: "1d10 - 2d10"
        }
    },
    {
        name: "Ku no Kata: Suiryū Shibuki",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/water/form_9.webp",
        system: {
            tier: "tier1", // Movement util
            category: "breathing",
            description: "Nona Forma: Fluxo de Água Caos. Ignora terreno difícil, anda na água.",
            cost: "2-5 PC",
            damage: "-"
        }
    },
    {
        name: "Jū no Kata: Seisei Ruten",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/water/form_10.webp",
        system: {
            tier: "god", // Ultimate
            category: "breathing",
            description: "Décima Forma: Dragão da Mudança. Dano aumenta a cada acerto. Mergulho final devastador.",
            cost: "10-14 PC + Fluxo",
            damage: "Combo + 2d10/3d10"
        }
    },
    {
        name: "Jū Ichi no Kata: Nagi",
        type: "skill",
        img: "modules/omini-system-assets/assets/icons/skills/water/form_11.webp",
        system: {
            tier: "god", // Tomioka Style
            category: "breathing",
            description: "Décima Primeira Forma: Calmaria. Anula ataques completamente.",
            cost: "6-15 PC",
            damage: "Nullify"
        }
    }
];
