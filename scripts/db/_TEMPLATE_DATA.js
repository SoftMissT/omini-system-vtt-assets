/**
 * 📝 TEMPLATE DE ITEM
 * Copie este formato para criar novos arquivos de categoria em scripts/db/
 */

export const DATA = [
    {
        name: "Nome do Item",
        type: "item", // ou weapon, equipment, consumable, loot
        img: "modules/omini-system-assets/assets/icons/CATEGORIA/icon_name.webp",
        system: {
            rarity: "common", // common, rare, epic, legendary, mythic
            description: "Descrição completa do item.",
            price: 100, // Valor em Cor
            // Atributos específicos
            damage: "1d8", // Para armas
            defense: 2,    // Para armaduras
        }
    }
];
