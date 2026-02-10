/**
 * ⚔️ OMNI-SYSTEM ITEM DATABASE
 * Extracted from "Lista de Itens, Acessorios, Armas, etc.md"
 * Updated for Custom System Builder (CSB) compatibility.
 */

export const ITEM_DB = [
    // --- ⚔️ UNIQUE & LEGENDARY WEAPONS ---
    {
        name: "Rasgar do Eclipse",
        type: "item",
        img: "modules/omini-system-assets/assets/icons/weapons/sword/icon_sword_legendary.webp",
        system: { props: {
            itemType: "weapon",
            rarity: "legendary",
            type: "sword",
            damage: "1d10/1d8",
            description: "Alterna entre Modo Luz (Radiante) e Modo Trevas (Necrótico/Roubo de Mana). Artespada: Eclipse Total."
        }}
    },
    {
        name: "Garra do Hunter-King",
        type: "item",
        img: "modules/omini-system-assets/assets/icons/weapons/gauntlet/icon_gauntlet_mythic.webp",
        system: { props: {
            itemType: "weapon",
            rarity: "mythic",
            type: "gauntlet",
            damage: "1d8 (Evolutivo)",
            description: "Absorve perks de Bosses derrotados. Artespada: Caçada Suprema."
        }}
    },
    {
        name: "Arco do Vento Entre Mundos",
        type: "item",
        img: "modules/omini-system-assets/assets/icons/weapons/bow/icon_bow_legendary.webp",
        system: { props: {
            itemType: "weapon",
            rarity: "legendary",
            type: "bow",
            damage: "1d10",
            description: "Cria micro-portais ao acertar. Permite teleporte tático."
        }}
    },
    {
        name: "Adagas do Monarca das Sombras",
        type: "item",
        img: "modules/omini-system-assets/assets/icons/weapons/dagger/icon_dagger_mythic.webp",
        system: { props: {
            itemType: "weapon",
            rarity: "mythic",
            type: "dagger",
            damage: "1d6",
            description: "Gera Shadow Stacks. Permite invocar sombras de inimigos derrotados."
        }}
    },
    {
        name: "Espada do Leão Solar",
        type: "item",
        img: "modules/omini-system-assets/assets/icons/weapons/sword/icon_sword_legendary.webp",
        system: { props: {
            itemType: "weapon",
            rarity: "legendary",
            type: "sword",
            damage: "1d10",
            description: "Dano escala com Coragem (HP < 50%). Artespada: Carga do Leão Dourado."
        }}
    },
    {
        name: "Arco dos Galadhrim",
        type: "item",
        img: "modules/omini-system-assets/assets/icons/weapons/bow/icon_bow_mythic.webp",
        system: { props: {
            itemType: "weapon",
            rarity: "mythic",
            type: "bow",
            damage: "1d12",
            description: "Nunca erra alvos em movimento. Flechas perfuram até 3 inimigos."
        }}
    },
    {
        name: "Besta Dragônica",
        type: "item",
        img: "modules/omini-system-assets/assets/icons/weapons/bow/icon_bow_legendary.webp",
        system: { props: {
            itemType: "weapon",
            rarity: "legendary",
            type: "crossbow",
            damage: "2d8",
            description: "Projéteis explosivos. Aceita Munição de Dragão. Sofre Overheat."
        }}
    },
    {
        name: "Espada do Rei Demônio",
        type: "item",
        img: "modules/omini-system-assets/assets/icons/weapons/sword/icon_sword_mythic.webp",
        system: { props: {
            itemType: "weapon",
            rarity: "mythic",
            type: "greatsword",
            damage: "2d6",
            description: "Presença Sombria. Bane inimigos para o Vazio com Artespada Corte do Vazio."
        }}
    },
    {
        name: "Espada Negra de Guts",
        type: "item",
        img: "modules/omini-system-assets/assets/icons/weapons/sword/icon_sword_legendary.webp",
        system: { props: {
            itemType: "weapon",
            rarity: "legendary",
            type: "greatsword",
            damage: "1d20",
            description: "PESADÃO. Ignora RD de inimigos grandes. Causa +1d10 em Fúria."
        }}
    },

    // --- 🏹 SPECIAL ARROWS ---
    { name: "Flecha de Æther", type: "item", system: { props: { itemType: "consumable", rarity: "rare", description: "Ignora escudos mágicos. +1d4 Dano de Força." } } },
    { name: "Flecha Galadrim", type: "item", system: { props: { itemType: "consumable", rarity: "legendary", description: "Nunca quebra. +2 Acerto. Crítico 19-20." } } },
    { name: "Flecha Sombria", type: "item", system: { props: { itemType: "consumable", rarity: "uncommon", description: "Marca o alvo. +1 Acerto contra marcados." } } },
    { name: "Flecha Solar", type: "item", system: { props: { itemType: "consumable", rarity: "rare", description: "+50% dano vs Mortos-vivos. +1d6 Radiante." } } },
    { name: "Flecha Glitch", type: "item", system: { props: { itemType: "consumable", rarity: "epic", description: "Efeito aleatório do Caos (Dano dobrado, Teleporte, Cura, Explosão...)." } } },
    { name: "Flecha Rúnica", type: "item", system: { props: { itemType: "consumable", rarity: "rare", description: "Ativa runa (Fogo, Gelo, Raio) ao impacto." } } },

    // --- 🛡️ ARMOR SETS ---
    { name: "Elmo do Cavaleiro do Mangue", type: "item", system: { props: { itemType: "equipment", rarity: "epic", type: "heavy", description: "Parte do set Cavaleiro do Mangue." } } },
    { name: "Peitoral do Cavaleiro do Mangue", type: "item", system: { props: { itemType: "equipment", rarity: "epic", type: "heavy", description: "Parte do set Cavaleiro do Mangue." } } },
    { name: "Capuz do Assassino Astral", type: "item", system: { props: { itemType: "equipment", rarity: "legendary", type: "light", description: "Parte do set Assassino Astral." } } },
    { name: "Túnica do Assassino Astral", type: "item", system: { props: { itemType: "equipment", rarity: "legendary", type: "light", description: "Parte do set Assassino Astral." } } },
    { name: "Capuz da Transcendência", type: "item", system: { props: { itemType: "equipment", rarity: "mythic", type: "light", description: "Parte do set Transcendence Robes." } } },
    { name: "Túnica da Transcendência", type: "item", system: { props: { itemType: "equipment", rarity: "mythic", type: "light", description: "Parte do set Transcendence Robes." } } },

    // --- 🧱 MATERIALS ---
    { name: "Ætherium", type: "item", system: { props: { itemType: "loot", rarity: "rare", description: "Metal primário. Aumenta slots de skill." } } },
    { name: "Stygian Steel", type: "item", system: { props: { itemType: "loot", rarity: "epic", description: "Metal negro. Aplica Sangue Sombrio." } } },
    { name: "Mithral-Glass", type: "item", system: { props: { itemType: "loot", rarity: "rare", description: "Muito leve. Aumenta agilidade." } } },
    { name: "Void-Orichalc", type: "item", system: { props: { itemType: "loot", rarity: "mythic", description: "Transcendental. Evolui com portador." } } },
    { name: "Hiiirokane", type: "item", system: { props: { itemType: "loot", rarity: "legendary", description: "Metal Solar. Escala com Espírito." } } }
];
