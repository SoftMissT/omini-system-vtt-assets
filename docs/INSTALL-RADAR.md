# 📡 RADAR SYSTEM — Guia de Instalação

**OMNI-SYSTEM v3.1+ | Foundry VTT v13.351+**

---

## 📦 Estrutura de Arquivos

```
modules/omini-system-vtt/
├── scripts/
│   ├── radar-core-refactored.js
│   ├── radar-integration.js
│   └── radar-player.js
├── styles/
│   └── radar-system.css
└── templates/radar/
    ├── gm-control.hbs
    └── player-radar.hbs
```

---

## 🔧 Instalação

### Passo 1: Criar Estrutura de Pastas

```bash
# No diretório do módulo
mkdir -p templates/radar
```

### Passo 2: Copiar Arquivos

Coloque cada arquivo na pasta correta conforme a estrutura acima.

### Passo 3: Registrar no `module.json`

```json
{
  "id": "omini-system-vtt",
  "scripts": [
    "scripts/radar-core-refactored.js",
    "scripts/radar-integration.js",
    "scripts/radar-player.js"
  ],
  "styles": [
    "styles/radar-system.css"
  ],
  "socket": true
}
```

**IMPORTANTE:** Certifique-se de que `"socket": true` está presente para permitir comunicação em tempo real.

### Passo 4: Criar Macros

#### Macro GM: "Radar GM Control"
```javascript
// Tipo: Script
if (!game.user.isGM) {
    return ui.notifications.warn("[RADAR] HUD exclusivo para GM.");
}

const existing = Object.values(ui.windows).find(w => w.id === 'radar-gm-control-hud');
if (existing) {
    existing.close();
} else {
    // new RadarGMControlHUD().render(true); -- TODO: Implement GM HUD Class
}
```

#### Macro Player: "Radar Player"
```javascript
// Tipo: Script
const actor = game.user.character;
if (!actor) {
    return ui.notifications.warn("[RADAR] Você precisa de um personagem.");
}

const existing = Object.values(ui.windows).find(w => w.id === 'radar-player-hud');
if (existing) {
    existing.close();
} else {
    new RadarPlayerHUD(actor).render(true);
}
```

---

## ✅ Verificação

1. Recarregue o Foundry VTT
2. Abra o console (F12)
3. Procure por: `[OMNI-SYSTEM] Radar System online.`
4. Execute as macros para testar

---

## 🎮 Uso

### GM
1. Execute macro "Radar GM Control"
2. Selecione tipo de evento
3. Clique no mapa
4. Configure alvo e mensagem

### Player
1. Execute macro "Radar Player"
2. Monitore sinais no mini-map
3. Receba notificações em tempo real

---

## 🐛 Troubleshooting

**Erro: Template not found**
→ Certifique-se de que `templates/radar/` existe e contém os .hbs

**Socket não funciona**
→ Verifique `"socket": true` no module.json

**CSS não aplicado**
→ Verifique registro em `"styles"` no module.json

---

**Sistema pronto para uso.**
