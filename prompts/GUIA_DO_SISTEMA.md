# 🌌 OMINI SYSTEM VTT - Guia do Sistema

## 📋 Estrutura do Repositório

Este repositório está organizado para facilitar a manutenção e atualização de itens, skills, classes e outros assets do sistema Omini VTT.

### Estrutura de Pastas

```
omini-system-vtt-assets/
├── items/                    # Arquivos JSON fonte de todos os itens
│   ├── weapons/             # Armas
│   ├── armors/              # Armaduras
│   ├── accessories/         # Acessórios
│   ├── consumables/         # Consumíveis
│   ├── skills/              # Habilidades
│   ├── classes/             # Classes
│   ├── pets/                # Pets
│   ├── mounts/              # Montarias
│   ├── summons/             # Invocações
│   ├── materials/           # Materiais
│   └── housing/             # Habitação
├── packs/                   # Compendiums do Foundry VTT (auto-gerados)
│   ├── weapons/
│   ├── armors/
│   ├── accessories/
│   ├── consumables/
│   ├── skills/
│   ├── classes/
│   ├── pets/
│   ├── mounts/
│   ├── summons/
│   ├── materials/
│   ├── housing/
│   ├── npcs/
│   ├── backgrounds/
│   └── maps/
├── scripts/
│   ├── core/
│   │   └── omni-db.js       # Database principal (AUTO-GERADO)
│   └── utils/
│       ├── db-loader.js     # Carrega DB nos compendiums
│       └── update-omni-db.js # Script de atualização
└── module.json              # Configuração do módulo
```

## 🔄 Como Atualizar o Sistema

### 1. Adicionar ou Editar Itens

1. Navegue até a pasta apropriada em `items/`
2. Crie ou edite o arquivo JSON do item
3. Estrutura básica de um item:

```json
{
  "_id": "omini_weapons_unique_id",
  "name": "Nome do Item",
  "tier": "C|UC|R|E|L|M|X",
  "category": "weapons|armors|skills|etc",
  "description": "Descrição do item",
  "stats": {
    "base": { "damage": 10, "range": "9m", "crit": 18 }
  },
  "effects": [
    {
      "type": "active|passive|onHit",
      "name": "Nome do Efeito",
      "description": "Descrição do efeito"
    }
  ],
  "meta": {
    "stackable": true,
    "max_stack": 20,
    "value": 500
  }
}
```

### 2. Gerar o Database

Após adicionar ou editar itens, execute o script de atualização:

```bash
node scripts/utils/update-omni-db.js
```

Este script irá:
- Varrer todas as pastas em `items/`
- Ler todos os arquivos JSON
- Converter para o formato Foundry VTT
- Atualizar `scripts/core/omni-db.js`

### 3. Deploy no Foundry VTT

O sistema irá automaticamente popular os compendiums quando o módulo for carregado no Foundry VTT.

## 📊 Tiers de Itens

| Código | Nome | Cor |
|--------|------|-----|
| C | Comum | Cinza |
| UC | Incomum | Verde |
| R | Raro | Azul |
| E | Épico | Roxo |
| L | Lendário | Laranja |
| M | Mítico | Rosa |
| X | Conceito | Arco-íris |

## 🎯 Compendiums Disponíveis

O módulo possui os seguintes compendiums separados por tipo:

1. **omini-macros** - Macros do sistema
2. **omini-weapons** - Armas
3. **omini-armors** - Armaduras
4. **omini-accessories** - Acessórios
5. **omini-consumables** - Consumíveis
6. **omini-skills** - Habilidades
7. **omini-classes** - Classes
8. **omini-pets** - Pets & Familiares
9. **omini-mounts** - Montarias
10. **omini-summons** - Invocações
11. **omini-materials** - Materiais
12. **omini-housing** - Habitação
13. **omini-npcs** - NPCs
14. **omini-backgrounds** - Backgrounds
15. **omini-maps** - Mapas

## 🚀 Workflow de Desenvolvimento

1. **Adicionar Itens**
   ```bash
   # Criar ou editar JSONs em items/[categoria]/
   ```

2. **Atualizar Database**
   ```bash
   node scripts/utils/update-omni-db.js
   ```

3. **Testar no Foundry**
   - O módulo irá auto-popular os compendiums
   - Verifique se os itens aparecem corretamente

4. **Commit e Push**
   ```bash
   git add .
   git commit -m "Adiciona novos itens/skills/etc"
   git push origin main
   ```

## 📝 Notas Importantes

- ⚠️ **NUNCA edite `scripts/core/omni-db.js` manualmente** - Este arquivo é auto-gerado
- Sempre use o script `update-omni-db.js` para regenerar o database
- Mantenha a estrutura de pastas organizada
- Use IDs únicos para cada item (`_id`)

## 🔧 Troubleshooting

### Itens não aparecem no Foundry

1. Certifique-se de que executou `node scripts/utils/update-omni-db.js`
2. Verifique se o `omni-db.js` foi atualizado
3. Recarregue o módulo no Foundry VTT

### Erro ao rodar o script

1. Certifique-se de ter Node.js instalado
2. Verifique se está na pasta raiz do projeto
3. Verifique se todos os JSONs têm sintaxe válida

## 📦 Versão Atual

**Versão:** 1.1.0

### Changelog

#### v1.1.0 (Atual)
- ✨ Separação de compendiums por tipo de item
- 🔄 Sistema de auto-populate por categoria
- 📝 Script de atualização automática do database
- 🎯 130 itens carregados no sistema

#### v1.0.2
- 🐛 Correções de bugs
- 📊 Compatibilidade com Foundry v13

## 🌐 Links

- **Repositório:** https://github.com/SoftMissT/omini-system-vtt
- **Issues:** https://github.com/SoftMissT/omini-system-vtt/issues
- **Wiki:** Em breve

---

**Desenvolvido por SoftMissT**
*Com apoio de IAs: Claude, Gemini, Midjourney, ChatGPT*
