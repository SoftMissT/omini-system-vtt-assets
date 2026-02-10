/**
 * Omini System - Asset Library
 * Main Entry Point
 */

Hooks.once('init', async function() {
    console.log('Omini System Assets | Initializing...');
});

Hooks.once('ready', async function() {
    console.log('Omini System Assets | Ready');
});

/**
 * Dice So Nice Configuration
 * Registra texturas customizadas se o módulo estiver ativo
 */
Hooks.once('diceSoNiceReady', (dice3d) => {
    // Exemplo de como registrar um sistema de dados customizado
    /*
    dice3d.addSystem({id: "omini", name: "Omini System"}, "preferred");
    dice3d.addDicePreset({
      type: "d20",
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "OMINI"],
      system: "omini"
    });
    */
    console.log('Omini System Assets | Dice So Nice integration ready');
});
