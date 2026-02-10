/**
 * Omini System - Asset Library
 * Main Entry Point
 */

import { SynthesisCore } from "./huds/synthesis-core.js";
import { OmniDbLoader } from "./utils/db-loader.js";

Hooks.once("init", () => {
    console.log("🌌 OMNI-SYSTEM | Initializing...");
    
    // Register settings, etc.
});

Hooks.once("ready", async () => {
    console.log("🌌 OMNI-SYSTEM | Ready.");

    // Initializate Database
    await OmniDbLoader.load();

    // TEST BUTTON (Temporary) - Adds a button to the Token Layer controls
    Hooks.on("getSceneControlButtons", (controls) => {
        const tokenControls = controls.find(c => c.name === "token");
        if (tokenControls) {
            tokenControls.tools.push({
                name: "omni-synthesis",
                title: "Open Synthesis Core",
                icon: "fas fa-dna",
                button: true,
                onClick: () => {
                    new SynthesisCore().render(true);
                }
            });
        }
    });
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
