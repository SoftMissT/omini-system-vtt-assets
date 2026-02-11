/**
 * Omini System - Asset Library
 * Main Entry Point
 */

// import { SynthesisCore } from "./huds/synthesis-core.js";
// import { RadarPlayerHUD } from "./radar/radar-player.js";
// import { CharacterSheetJJK } from "./huds/jjk-character-sheet.js";
// import { AbsoluteDetectionMatrix } from "./radar/absolute-detection-matrix.js";
// import { GMControlHUD } from "./radar/radar-gm-control.js";
import { OmniDbLoader } from "./utils/db-loader.js";

Hooks.once("init", () => {
  console.log("🌌 OMNI-SYSTEM | Initializing...");

  // Register settings
  game.settings.register("world", "sao_radar_system_event", {
    name: "Radar Active Signal",
    scope: "world",
    config: false,
    type: Object,
    default: { active: false },
  });
});

Hooks.once("ready", async () => {
  console.log("🌌 OMNI-SYSTEM | Ready.");

  // Initializate Database
  await OmniDbLoader.load();

  // TEST BUTTON (Temporary) - Adds a button to the Token Layer controls
  Hooks.on("getSceneControlButtons", (controls) => {
    const tokenControls = controls.find((c) => c.name === "token");
    if (tokenControls) {
      tokenControls.tools.push({
        name: "omni-synthesis",
        title: "Open Synthesis Core",
        icon: "fas fa-dna",
        button: true,
        onClick: () => {
          new SynthesisCore().render(true);
        },
      });

      tokenControls.tools.push({
        name: "omni-radar-player",
        title: "Open Radar (Player)",
        icon: "fas fa-satellite-dish",
        button: true,
        onClick: () => {
          const actor = game.user.character;
          if (actor) new RadarPlayerHUD(actor).render(true);
          else ui.notifications.warn("Selecione um personagem primeiro!");
        },
      });

      tokenControls.tools.push({
        name: "jjk-sheet",
        title: "Open JJK Sheet",
        icon: "fas fa-scroll",
        button: true,
        onClick: () => {
          const actor =
            game.user.character || canvas.tokens.controlled[0]?.actor;
          if (actor) new CharacterSheetJJK(actor).render(true);
          else
            ui.notifications.warn("Selecione um personagem ou token primeiro!");
        },
      });

      tokenControls.tools.push({
        name: "adm-matrix",
        title: "Open ADM Matrix",
        icon: "fas fa-eye",
        button: true,
        onClick: () => {
          new AbsoluteDetectionMatrix().render(true);
        },
      });

      if (game.user.isGM) {
        tokenControls.tools.push({
          name: "adm-gm-control",
          title: "Radar GM Control",
          icon: "fas fa-terminal",
          button: true,
          onClick: () => {
            new GMControlHUD().render(true);
          },
        });
      }
    }
  });
});

/**
 * Dice So Nice Configuration
 * Registra texturas customizadas se o módulo estiver ativo
 */
Hooks.once("diceSoNiceReady", (dice3d) => {
  // Exemplo de como registrar um sistema de dados customizado
  /*
    dice3d.addSystem({id: "omini", name: "Omini System"}, "preferred");
    dice3d.addDicePreset({
      type: "d20",
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "OMINI"],
      system: "omini"
    });
    */
  console.log("Omini System Assets | Dice So Nice integration ready");
});
