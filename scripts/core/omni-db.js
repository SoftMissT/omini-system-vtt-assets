/**
 * 🌌 OMNI-SYSTEM: Master Database
 * Source of truth for all legendary items, skills, and meta-data.
 * NOTE: Using type: 'item' for all documents to ensure compatibility with Custom System Builder (CSB).
 *
 * ⚠️ AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Run 'node scripts/utils/update-omni-db.js' to regenerate
 */

const OMNI_DB = {
  "weapons": [
    {
      "name": "Kunai",
      "tier": "Comum",
      "type": "item",
      "system": {
        "props": {
          "itemType": "weapons",
          "description": "Adagas táticas de arremesso.",
          "base": {
            "damage": 4,
            "range": "9m",
            "crit": 18,
            "type": "perfurante"
          },
          "scaling": {
            "men": 0.5
          },
          "effects": [
            {
              "type": "active",
              "name": "Distração",
              "momentum": 1,
              "description": "Reduz defesa do inimigo para aliados."
            }
          ],
          "meta": {
            "stackable": true,
            "max_stack": 20,
            "value": 50
          }
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Tomahawk",
      "tier": "Comum",
      "type": "item",
      "system": {
        "props": {
          "itemType": "weapons",
          "description": "Machadinha balanceada para combate corpo a corpo ou arremesso.",
          "base": {
            "damage": 5,
            "range": "1.5m-9m",
            "crit": 17,
            "type": "cortante"
          },
          "scaling": {
            "cor": 1
          },
          "effects": [
            {
              "type": "active",
              "name": "Quebra-Postura",
              "momentum": 1,
              "description": "-2 na Defesa do inimigo até o fim do turno."
            },
            {
              "type": "passive",
              "name": "Arremesso Destruidor",
              "description": "Dano dobrado contra objetos/escudos."
            }
          ],
          "meta": {
            "stackable": true,
            "max_stack": 3,
            "value": 200,
            "weight": 1.5
          }
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Manopla do Lag",
      "tier": "Épico",
      "type": "item",
      "system": {
        "props": {
          "description": "Ao acertar, aumenta o 'Ping' do inimigo. O alvo age com atraso de 1 turno.",
          "effects": [
            {
              "type": "onHit",
              "name": "High Ping",
              "description": "Alvo perde a próxima ação (Stun via Lag)."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Necronomicon (Cópia)",
      "tier": "Épico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "weapons",
          "description": "Uma cópia imperfeita do livro dos mortos. Permite reanimar esqueletos básicos.",
          "summon": "Esqueleto Guerreiro (x2)",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Sabaki",
      "tier": "Épico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "weapons",
          "description": "Pistolas modificadas automáticas com cadência de tiro sobrenatural.",
          "base": {
            "damage": 4,
            "range": "12m",
            "crit": 19,
            "type": "perfurante"
          },
          "scaling": {
            "men": 0.5
          },
          "effects": [
            {
              "type": "active",
              "name": "Rajada",
              "momentum": 3,
              "description": "Ação Completa. Cone 6m. CD Uso: 1 Combate."
            },
            {
              "type": "passive",
              "name": "Munição UV",
              "description": "Impede regeneração de PV por 1 turno."
            }
          ],
          "meta": {
            "value": 5000,
            "weight": 4
          }
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Balestra",
      "tier": "UC",
      "type": "item",
      "system": {
        "props": {
          "itemType": "weapons",
          "description": "Mecanismo de gatilho e polias reforçadas para disparos de alta pressão.",
          "base": {
            "damage": 5,
            "range": "20m",
            "crit": 20,
            "type": "perfurante"
          },
          "scaling": {
            "cor": 0.5
          },
          "effects": [
            {
              "type": "active",
              "name": "Disparo de Impacto",
              "momentum": 1,
              "description": "Ignora RD e empurra o alvo 1,5m."
            },
            {
              "type": "passive",
              "name": "Recarga Pesada",
              "description": "Exige Ação de Movimento para recarregar."
            }
          ],
          "meta": {
            "value": 650,
            "weight": 5
          }
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Fuuma Shuriken",
      "tier": "UC",
      "type": "item",
      "system": {
        "props": {
          "itemType": "weapons",
          "description": "Uma shuriken gigante de quatro pontas dobráveis, projetada para mutilação em área.",
          "base": {
            "damage": 6,
            "range": "12m",
            "crit": 19,
            "type": "cortante"
          },
          "scaling": {
            "men": 0.5
          },
          "requirements": {
            "level": 3
          },
          "effects": [
            {
              "type": "passive",
              "name": "Corte Passante",
              "description": "Se houver inimigo atrás do alvo em linha reta, realize segundo ataque com -2 no acerto."
            }
          ],
          "meta": {
            "stackable": true,
            "max_stack": 5,
            "value": 450,
            "weight": 2
          }
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Pistolas Gêmeas",
      "tier": "UC",
      "type": "item",
      "system": {
        "props": {
          "itemType": "weapons",
          "description": "Duas pistolas de cano curto banhadas em água benta e chumbo solar.",
          "base": {
            "damage": 4,
            "range": "9m",
            "crit": 19,
            "type": "perfurante"
          },
          "scaling": {
            "men": 0.5
          },
          "effects": [
            {
              "type": "active",
              "name": "Gatilho Rápido",
              "description": "Dispara ambas as armas com -2 no acerto."
            },
            {
              "type": "passive",
              "name": "Perseguição",
              "description": "Sem penalidades por movimento."
            }
          ],
          "meta": {
            "value": 800,
            "weight": 4
          }
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Revólver",
      "tier": "UC",
      "type": "item",
      "system": {
        "props": {
          "itemType": "weapons",
          "description": "Arma de tambor confiável e de saque rápido.",
          "base": {
            "damage": 4,
            "range": "15m",
            "crit": 18,
            "type": "perfurante"
          },
          "scaling": {
            "men": 0.5
          },
          "effects": [
            {
              "type": "active",
              "name": "Fan the Hammer",
              "description": "Até 2 ataques com uma Ação Principal (Desvantagem no 2º)."
            }
          ],
          "meta": {
            "value": 900,
            "weight": 2
          }
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Adagas do Monarca",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "itemType": "weapons",
          "description": "Adagas gêmeas que permitem a extração de sombras de inimigos derrotados.",
          "effects": [
            {
              "type": "onHit",
              "name": "Shadow Extraction",
              "description": "10% de chance de paralisar o alvo por medo."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Cajado da Árvore do Mundo",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "itemType": "weapons",
          "description": "Feito de um galho de Yggdrasil. Aumenta a potência de magias de cura e natureza.",
          "heal_bonus": "+100%",
          "mp_regen": "10/turno",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Garra do Hunter-King",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "itemType": "weapons",
          "description": "Uma garra metálica que se funde ao braço do usuário e evolui com o sangue dos inimigos.",
          "base": {
            "damage": 10,
            "evolution_rank": 1,
            "exp": 0
          },
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Rasgar do Eclipse",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "itemType": "weapons",
          "description": "Uma lâmina que alterna entre os estados de Luz e Sombra (Dual Mode).",
          "base": {
            "damage": 12,
            "type": "variável"
          },
          "effects": [
            {
              "type": "active",
              "name": "Dual Mode",
              "description": "Alterna entre dano radiante e necrótico."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Tadai-Hō",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "itemType": "weapons",
          "description": "Canhão portátil experimental que dispara projéteis explosivos de Nichirin.",
          "base": {
            "damage": 7,
            "range": "12m (Área)",
            "crit": 20,
            "type": "contundente/explosão"
          },
          "scaling": {
            "cor": 1
          },
          "effects": [
            {
              "type": "active",
              "name": "Disparo de Salto",
              "momentum": 1,
              "description": "Lança usuário 6m. Inimigos adjacentes Derrubados."
            },
            {
              "type": "active",
              "name": "Mira Satélite",
              "momentum": 3,
              "description": "Dano 8 fixo em raio de 4,5m no próximo turno."
            }
          ],
          "meta": {
            "value": 15000,
            "weight": 15
          }
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Absolute Demise",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "description": "A foice que encerra conceitos. Se corta, o conceito deixa de existir.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Aeon Balor",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "description": "Olho divino que processa o futuro e anula habilidades inimigas.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Alphecca Tyrant",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "description": "Pregos dimensionais que fixam a realidade e o destino do alvo.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Annihilation Maker",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "description": "A capacidade de criar monstros a partir da sombra do usuário.",
          "summon_limit": "Based on Level",
          "effects": [
            {
              "type": "active",
              "name": "Create Beast",
              "description": "Invoca um monstro Tier equivalente ao MP gasto."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Canis Lykaon",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "weapons",
          "description": "Um par de sombras vivas que se manifestam como lobos devoradores.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Dimension Lost",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "weapons",
          "description": "Capaz de envolver países inteiros em uma névoa dimensional impenetrável.",
          "base": {
            "area": "Global/Mapa",
            "type": "conceitual"
          },
          "effects": [
            {
              "type": "active",
              "name": "Névoa do Vazio",
              "description": "Cria uma barreira que impede teleporte e visão externa."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Glitch Blade (Erro de Compilação)",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "weapons",
          "description": "Uma espada que muda de forma e dano a cada ataque. O sistema não consegue renderizá-la corretamente.",
          "damage": "Varies",
          "type": "Random",
          "effects": [
            {
              "type": "onHit",
              "name": "RNG Damage",
              "description": "Rola 1d6 para definir o tipo de dano (Fogo, Gelo, Raio, Void, Force, Psychic)."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Grimório do Rei Sábio",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "weapons",
          "description": "Um livro flutuante que contém todas as magias elementais do mundo. Permite 'Multicast'.",
          "base": {
            "damage": 0,
            "type": "magic"
          },
          "cast_speed": "+50%",
          "effects": [
            {
              "type": "passive",
              "name": "Omni-Element",
              "description": "O usuário pode alterar o elemento de qualquer magia à vontade."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Innovate Clear",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "description": "Um cajado que permite criar uma dimensão de bolso (Housing Instance) com regras próprias.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Nereid Kyrie",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "description": "Tridente que governa os mares e a fluidez do mana.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Regulus Nemea",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "weapons",
          "description": "Machado de batalha imbuído com a alma do Leão de Nemeia.",
          "effects": [
            {
              "type": "active",
              "name": "Earthquake Shake",
              "description": "Racha o solo em um raio de 30m."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Sephiroth Graal",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "description": "Cálice da vida eterna. Permite a ressurreição absoluta e manipulação de almas.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Star Buster Star Blaster",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "description": "Armas de fogo que disparam matéria estelar comprimida.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "True Longinus",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "description": "A Lança do Destino original. Causa dano absoluto a divindades.",
          "damage": "10d10 + Divine",
          "penetration": "100%",
          "effects": [
            {
              "type": "active",
              "name": "Truth Seek",
              "description": "O ataque nunca erra e ignora imunidades."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Unknown Dictator",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "description": "Controla máquinas e autômatos em escala global.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Arco Longo",
      "tier": "Raro",
      "type": "item",
      "system": {
        "props": {
          "itemType": "weapons",
          "description": "Arco assimétrico de alta tensão, forjado em madeira de Nichirin flexível.",
          "base": {
            "damage": 5,
            "range": "30m",
            "crit": 19,
            "type": "perfurante"
          },
          "scaling": {
            "cor": 1
          },
          "requirements": {
            "level": 8,
            "stats": {
              "cor": 13
            }
          },
          "effects": [
            {
              "type": "active",
              "name": "Cometa Perfurante",
              "momentum": 3,
              "description": "Linha de 15m. Teste de Esquiva CD 13. Falha = Crítico Automático."
            }
          ],
          "meta": {
            "value": 2200,
            "weight": 3
          }
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Escopeta Cano Duplo",
      "tier": "Raro",
      "type": "item",
      "system": {
        "props": {
          "itemType": "weapons",
          "description": "Arma de dispersão brutal com dois canos paralelos de grosso calibre.",
          "base": {
            "damage": 6,
            "range": "Cone 6m",
            "crit": 20,
            "type": "perfurante"
          },
          "scaling": {
            "cor": 0.5
          },
          "effects": [
            {
              "type": "active",
              "name": "Dispersão à Queima-Roupa",
              "description": "Cone de 6m. Reflexos CD 14 ou Dano Total."
            }
          ],
          "meta": {
            "value": 1800,
            "weight": 6
          }
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Ono & Mangual",
      "tier": "Raro",
      "type": "item",
      "system": {
        "props": {
          "itemType": "weapons",
          "description": "Um machado de guerra em uma ponta e uma esfera de ferro espinhosa na outra, conectados por uma longa corrente de Nichirin puro.",
          "base": {
            "damage": 9,
            "range": "4.5m",
            "crit": 20,
            "type": "cortante/contundente"
          },
          "scaling": {
            "cor": 1
          },
          "requirements": {
            "level": 5,
            "stats": {
              "cor": 12
            }
          },
          "effects": [
            {
              "type": "passive",
              "name": "Zona de Impacto",
              "description": "Ameaça 4.5m ao redor para ataques de oportunidade."
            },
            {
              "type": "active",
              "name": "Esmagamento Duplo",
              "momentum": 3,
              "description": "Dois ataques, ignora escudos e chance de derrubar."
            }
          ],
          "meta": {
            "stackable": false,
            "value": 1500,
            "weight": 8
          }
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Rifle",
      "tier": "Raro",
      "type": "item",
      "system": {
        "props": {
          "itemType": "weapons",
          "description": "Rifle de ferrolho com luneta de precisão.",
          "base": {
            "damage": 8,
            "range": "60m",
            "crit": 19,
            "type": "perfurante"
          },
          "scaling": {
            "men": 0.5
          },
          "effects": [
            {
              "type": "passive",
              "name": "Atirador de Elite",
              "description": "Sem movimento: Alcance 120m e Crítico 18-20."
            }
          ],
          "meta": {
            "value": 2500,
            "weight": 7
          }
        }
      },
      "img": "icons/svg/item-bag.svg"
    }
  ],
  "armors": [
    {
      "name": "Escudo Tela Azul (BSOD)",
      "tier": "Épico",
      "type": "item",
      "system": {
        "props": {
          "description": "Um escudo retangular brilhando com a tela fatal de erro.",
          "ac": 4,
          "rd": 4,
          "effects": [
            {
              "type": "reaction",
              "name": "Fatal Error",
              "description": "Atacante sofre 2d8 psíquico ao acertar o escudo."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Peitoral do Dragão",
      "tier": "Épico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "armors",
          "description": "Forjado com escamas de dragão vermelho, emite um calor constante.",
          "ac": 8,
          "rd": 5,
          "fire_res": "50%",
          "effects": [
            {
              "type": "passive",
              "name": "Coração do Dragão",
              "description": "+2 de Força enquanto equipado."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Escudo de Hihi'irokane",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "itemType": "armors",
          "description": "Um escudo redondo que reflete a luz solar com intensidade ofuscante.",
          "ac": 5,
          "rd": 5,
          "effects": [
            {
              "type": "active",
              "name": "Reflexo Solar",
              "description": "Cega inimigos em um cone de 9m por 1 rodada."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Luvas de Aço Estígio",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "itemType": "armors",
          "description": "Manoplas de metal negro que parecem absorver a luz ambiente.",
          "ac": 2,
          "rd": 3,
          "effects": [
            {
              "type": "onHit",
              "name": "Toque do Abismo",
              "description": "Ataques desarmados ou com armas de proximidade causam +1d6 de dano necrótico."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Capa Texture Missing",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "description": "Uma capa com padrão xadrez rosa e preto. O sistema não consegue renderizar o usuário.",
          "effects": [
            {
              "type": "passive",
              "name": "Invisibilidade Real",
              "description": "+10 em Furtividade. Imune a detecção mágica."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Elmo do Monarca",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "armors",
          "description": "Um elmo fechado que brilha com uma chama roxa interna. O portador vê através das sombras.",
          "ac": 5,
          "rd": 10,
          "effects": [
            {
              "type": "passive",
              "name": "Sovereign Vision",
              "description": "Imunidade a cegueira e visão no escuro mágica (30m)."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    }
  ],
  "accessories": [
    {
      "name": "Botas Silenciosas",
      "tier": "UC",
      "type": "item",
      "system": {
        "props": {
          "itemType": "accessories",
          "description": "Botas feitas de couro de Morcego Sombrio que anulam o som dos passos.",
          "modifiers": {
            "stealth": 2
          },
          "effects": [
            {
              "type": "passive",
              "name": "Passo Etéreo",
              "description": "Vantagem em testes de Furtividade ao se mover em sombras."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Cartão de Acesso Admin",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "description": "Abre qualquer porta, baú ou barreira mágica. Ignora testes de Ladinagem (CD 99+).",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Botas de Noclip (Debug)",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "description": "Permite atravessar paredes e objetos sólidos como se não existissem.",
          "effects": [
            {
              "type": "passive",
              "name": "Phasing",
              "description": "Ignora colisão de muros."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Anel de Mana Infinito",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "accessories",
          "description": "Conecta o usuário diretamente à Leyline do planeta. A regeneração de mana supera o gasto.",
          "effects": [
            {
              "type": "passive",
              "name": "Infinito",
              "description": "Regenera 100% do MP no início de cada turno."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Olho do Sobrevivente",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "accessories",
          "description": "Uma relíquia que permite ver a 'barra de vida' e os 'pontos fracos' de qualquer entidade.",
          "effects": [
            {
              "type": "passive",
              "name": "True Vision",
              "description": "Ignora invisibilidade, ilusões e revela fraquezas elementais."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Telos Karma",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "description": "Um espelho retrovisor da realidade. Permite forçar um reroll em qualquer teste (Aliado ou Inimigo).",
          "uses": "3/day",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    }
  ],
  "consumables": [
    {
      "name": "Antídoto",
      "tier": "Comum",
      "type": "item",
      "system": {
        "props": {
          "itemType": "consumables",
          "description": "Uma poção amarga que neutraliza venenos básicos.",
          "effects": [],
          "meta": {
            "stackable": true,
            "max_stack": 30,
            "value": 200
          }
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Kit de Reparo",
      "tier": "Comum",
      "type": "item",
      "system": {
        "props": {
          "itemType": "consumables",
          "description": "Ferramentas básicas para restaurar a durabilidade de equipamentos.",
          "effects": [],
          "meta": {
            "stackable": true,
            "max_stack": 5,
            "value": 800
          }
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Pergaminho de Habilidade",
      "tier": "Épico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "consumables",
          "description": "Um pergaminho antigo que ensina uma técnica temporária aleatória.",
          "effects": [],
          "meta": {
            "stackable": false,
            "value": 5000
          }
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Cristal de Cura",
      "tier": "Incomum",
      "type": "item",
      "system": {
        "props": {
          "itemType": "consumables",
          "description": "Um cristal verde que libera energia vital ao ser quebrado.",
          "effects": [],
          "meta": {
            "stackable": true,
            "max_stack": 20,
            "value": 500
          }
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Mapa de Masmorra",
      "tier": "Incomum",
      "type": "item",
      "system": {
        "props": {
          "itemType": "consumables",
          "description": "Um mapa detalhado que revela os arredores da masmorra atual.",
          "effects": [],
          "meta": {
            "stackable": false,
            "value": 1200
          }
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Poção de Mana",
      "tier": "Incomum",
      "type": "item",
      "system": {
        "props": {
          "itemType": "consumables",
          "description": "Uma poção azul efervescente que restaura mana.",
          "effects": [],
          "meta": {
            "stackable": true,
            "max_stack": 20,
            "value": 450
          }
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Pílula de Reset de Build",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "description": "Zera todos os pontos de atributo e skills para redistribuição.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Fragmento de Código Fonte",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "description": "Matéria-prima pura do universo. Usado para criar itens 'Custom' ou 'Cheat'.",
          "effects": [],
          "meta": {
            "value": 999999
          }
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Pedra de Ressurreição",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "consumables",
          "description": "Item de drop único de boss de evento. Permite reviver um jogador se usado em até 10 segundos após a morte.",
          "effects": [],
          "meta": {
            "stackable": false,
            "value": 0
          }
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Pergaminho de Rollback",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "description": "Força o servidor a voltar no tempo. Reseta a cena inteira para o estado inicial.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Bússola Mágica",
      "tier": "Raro",
      "type": "item",
      "system": {
        "props": {
          "itemType": "consumables",
          "description": "Uma bússola que aponta para a localização do Boss de Andar.",
          "effects": [],
          "meta": {
            "stackable": false,
            "value": 2500
          }
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Cristal de Teleporte",
      "tier": "Raro",
      "type": "item",
      "system": {
        "props": {
          "itemType": "consumables",
          "description": "Um cristal azul que brilha intensamente ao ser ativado, transportando o usuário para a cidade mais próxima.",
          "effects": [],
          "meta": {
            "stackable": true,
            "max_stack": 10,
            "value": 1500
          }
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Vírus Logic Bomb",
      "tier": "Raro",
      "type": "item",
      "system": {
        "props": {
          "description": "Uma granada de dados. Causa dano massivo a Construtos, Golens e Máquinas.",
          "damage": "10d10 (Tech)",
          "radius": "6m",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Gis de Ragout Rabbit (Rank S)",
      "tier": "Raro",
      "type": "item",
      "system": {
        "props": {
          "itemType": "consumables",
          "description": "Comida de luxo feita com a carne do raríssimo coelho Ragout. Concede buffs massivos por 4 horas.",
          "buff": {
            "all_stats": 2,
            "exp_rate": 1.1
          },
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    }
  ],
  "skills": [
    {
      "name": "Horizontal",
      "tier": "Comum",
      "type": "item",
      "system": {
        "props": {
          "itemType": "skills",
          "description": "Um corte lateral básico mas eficiente.",
          "rank": 1,
          "momentumCost": 1,
          "delay": "0.5s",
          "effects": [
            {
              "type": "active",
              "name": "Corte Simples",
              "description": "Causa dano da arma + bônus de Destreza."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Relâmpago em Cadeia",
      "tier": "Épico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "skills",
          "description": "Um raio que salta entre até 5 inimigos.",
          "damage": "8d6 (Elétrico)",
          "jump_range": "4.5m",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Gravidade Zero",
      "tier": "Épico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "skills",
          "description": "Anula a gravidade em uma área, fazendo inimigos flutuarem e perderem o controle.",
          "cost": "50 MP",
          "duration": "3 rodadas",
          "effects": [
            {
              "type": "active",
              "name": "Levitação Forçada",
              "description": "Inimigos falham automaticamente em testes de Destreza."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Vorpal Strike",
      "tier": "Épico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "skills",
          "description": "Uma estocada pesada de longo alcance com o dobro do comprimento da lâmina.",
          "rank": 9,
          "momentumCost": 4,
          "delay": "2.5s",
          "effects": [
            {
              "type": "active",
              "name": "Alcance Estendido",
              "description": "Dano massivo em linha reta de 3m. Ignora 50% da armadura."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Sonic Leap",
      "tier": "UC",
      "type": "item",
      "system": {
        "props": {
          "itemType": "skills",
          "description": "Uma estocada descendente em alta velocidade vinda do ar.",
          "rank": 5,
          "momentumCost": 2,
          "delay": "1.0s",
          "effects": [
            {
              "type": "active",
              "name": "Avanço Aéreo",
              "description": "Salta até 6m e ataca com vantagem."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Barreira Absoluta",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "itemType": "skills",
          "description": "Uma cúpula geométrica impenetrável que dura 1 turno. Imune a todo dano.",
          "cost": "100 MP",
          "cooldown": "Long Rest",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Explosion",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "itemType": "skills",
          "description": "A magia ofensiva suprema. Causa dano massivo em uma área gigantesca, mas exaure o usuário.",
          "cost": "Todo o MP Restante",
          "damage": "20d10 + MP Gasto",
          "effects": [
            {
              "type": "active",
              "name": "Detonação",
              "description": "Raio de 20m. Destrói terreno."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Gate",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "itemType": "skills",
          "description": "Abre um portal para qualquer local conhecido ou marcado.",
          "cost": "200 MP",
          "capacity": "Ilimitada enquanto aberto",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Ferreiro Rúnico",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "itemType": "skills",
          "description": "Mestre na criação e fusão de itens mágicos. Permite extrair runas de equipamentos.",
          "fusion_success_rate": "+25%",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Star Splash",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "itemType": "skills",
          "description": "Um combo de 8 golpes de alta velocidade que parece uma constelação.",
          "rank": 10,
          "momentumCost": 5,
          "delay": "4.0s",
          "effects": [
            {
              "type": "active",
              "name": "Combo Estelar",
              "description": "Realiza 8 rolagens de ataque. Se 4+ acertarem, o alvo fica Atordoado."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Predador do Vazio",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "itemType": "skills",
          "description": "Evolução passiva para Pets do tipo Sombra. Aumenta o dano contra entidades dimensionais.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Mestre das Espadas Duplas",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "skills",
          "description": "A habilidade única concedida ao jogador com o tempo de reação mais rápido.",
          "atk_speed": "+50%",
          "double_hit_chance": "100%",
          "effects": [
            {
              "type": "passive",
              "name": "Dual Wield Mastery",
              "description": "Permite usar duas espadas de uma mão simultaneamente sem penalidades."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Monarca das Sombras",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "skills",
          "description": "Domínio absoluto sobre a morte e o exército de sombras.",
          "rank": "SSS",
          "effects": [
            {
              "type": "active",
              "name": "Shadow Extraction",
              "description": "Transforma inimigos derrotados em soldados de sombra."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Guardião do Tempo",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "skills",
          "description": "Permite manipular o fluxo temporal em pequena escala.",
          "effects": [
            {
              "type": "active",
              "name": "Rebobinar Momento",
              "description": "Reverte HP/MP para o estado de 3 segundos atrás."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Campeão",
      "tier": "Raro",
      "type": "item",
      "system": {
        "props": {
          "itemType": "skills",
          "description": "Foco em força bruta e precisão crítica.",
          "crit_range": "18-20 (Lv3), 17-20 (Lv10)",
          "effects": [
            {
              "type": "passive",
              "name": "Atleta Superior",
              "description": "Escalada e natação igual a caminhada. Salto dobrado."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Grand Heal",
      "tier": "Raro",
      "type": "item",
      "system": {
        "props": {
          "itemType": "skills",
          "description": "Cria um santuário de luz que cura todos os aliados na área.",
          "heal": "4d8 + Wis",
          "area": "6m Raio",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    }
  ],
  "classes": [
    {
      "name": "Debug",
      "type": "item",
      "system": {
        "props": {
          "description": "",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Reescrita de Código",
      "type": "item",
      "system": {
        "props": {
          "description": "",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Dentes do Submundo",
      "type": "item",
      "system": {
        "props": {
          "description": "",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Lobo de Ferro",
      "type": "item",
      "system": {
        "props": {
          "description": "",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "APM Overflow",
      "type": "item",
      "system": {
        "props": {
          "description": "",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Estado de Inércia",
      "type": "item",
      "system": {
        "props": {
          "description": "",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Metavisão de Combate",
      "type": "item",
      "system": {
        "props": {
          "description": "",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Fenda Incinerante",
      "type": "item",
      "system": {
        "props": {
          "description": "",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Prisma de Rejeição",
      "type": "item",
      "system": {
        "props": {
          "description": "",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Quimera das Sombras",
      "type": "item",
      "system": {
        "props": {
          "description": "",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Promoção de Peça",
      "type": "item",
      "system": {
        "props": {
          "description": "",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Sacrifício do Peão",
      "type": "item",
      "system": {
        "props": {
          "description": "",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    }
  ],
  "pets": [
    {
      "name": "Cubo Companheiro (Glitched)",
      "tier": "Raro",
      "type": "item",
      "system": {
        "props": {
          "description": "Um cubo com um coração que atravessa o chão as vezes.",
          "hp": "Invulnerável",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Tank",
      "tier": "Raro",
      "type": "item",
      "system": {
        "props": {
          "itemType": "pets",
          "description": "Um urso colossal blindado, focado em defesa e carga.",
          "hp_bonus": 50,
          "inventory_slots": 10,
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    }
  ],
  "mounts": [
    {
      "name": "Dragão de Ossos",
      "tier": "Épico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "mounts",
          "description": "Esqueleto reanimado de um wyvern ancestral.",
          "speed": "12m (Voo)",
          "fear_aura": true,
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Grifo de Aço",
      "tier": "Épico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "mounts",
          "description": "Autômato voador blindado.",
          "speed": "16m (Voo)",
          "rd": 5,
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Pesadelo das Sombras",
      "tier": "Épico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "mounts",
          "description": "Um corcel negro com crina de fogo azul e cascos que queimam o chão.",
          "speed": "15m",
          "capacity": 1,
          "effects": [
            {
              "type": "passive",
              "name": "Atropelar",
              "description": "Dano de fogo ao passar por inimigos (2d6)."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Carruagem Fantasma",
      "tier": "UC",
      "type": "item",
      "system": {
        "props": {
          "itemType": "mounts",
          "description": "Transporte etéreo que atravessa paredes (com risco).",
          "speed": "12m",
          "capacity": 4,
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Fenrir",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "itemType": "mounts",
          "description": "Lobo gigante das neves, capaz de carregar 3 pessoas.",
          "speed": "14m",
          "climb": "14m",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Pégaso de Cristal",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "itemType": "mounts",
          "description": "Um cavalo alado feito de prismas refratores. Deixa um rastro de arco-íris.",
          "speed": "18m (Voo)",
          "capacity": 2,
          "effects": [
            {
              "type": "toggle",
              "name": "Montar: Voo Prismático",
              "description": "Concede Voo 18m e imunidade a Terreno Difícil."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Leviatã das Nuvens",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "mounts",
          "description": "Uma baleia voadora gigantesca que serve como base móvel para a guilda.",
          "speed": "Slow",
          "capacity": "Guilda Inteira",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Lobo Sombrio Devorador de Almas",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "mounts",
          "description": "Uma entidade de sombra que se sincroniza com a alma do mestre.",
          "base": {
            "dps_bonus": "120%",
            "def_pierce": "80%"
          },
          "special": "Frenesi Dimensional (100 stacks)",
          "effects": [
            {
              "type": "onHit",
              "name": "Fragmento de Alma",
              "description": "Ganha 1 stack por acerto. Em 100, triplica o dano por 5s."
            },
            {
              "type": "passive",
              "name": "Salto Dimensional",
              "description": "Flanqueio instantâneo em ambientes de Vazio."
            }
          ],
          "meta": {
            "tradeable": false,
            "value": 0
          }
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Trono Flutuante do Monarca",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "mounts",
          "description": "Um trono de obsidiana e ouro que levita. O usuário não anda, ele impera.",
          "speed": "9m (Hover)",
          "defense_bonus": "+5 CA",
          "effects": [
            {
              "type": "aura",
              "name": "Presença Real",
              "description": "Inimigos num raio de 9m devem testar Vontade ou ficam Amedrontados."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Moto Magitech Light-Speed",
      "tier": "Raro",
      "type": "item",
      "system": {
        "props": {
          "itemType": "mounts",
          "description": "Veículo de duas rodas movido a cristais de mana.",
          "speed": "24m (Estrada)",
          "noise": "Alto",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Unicórnio da Floresta Eterna",
      "tier": "Raro",
      "type": "item",
      "system": {
        "props": {
          "itemType": "mounts",
          "description": "Criatura pura que cura quem a monta.",
          "effects": [
            {
              "type": "passive",
              "name": "Aura de Pureza",
              "description": "Regenera 1d4 HP por turno montado."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    }
  ],
  "summons": [
    {
      "name": "Chama do Rei dos Gigantes",
      "tier": "Épico",
      "type": "item",
      "system": {
        "props": {
          "description": "Fogo primordial que nunca apaga.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Fragmento do Soberano de Ferro",
      "tier": "Épico",
      "type": "item",
      "system": {
        "props": {
          "description": "Controla todo o metal no campo de batalha.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Coração de Baran",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "description": "O núcleo do Rei dos Demônios do Relâmpago.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Eco Espectral da Memória",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "itemType": "summons",
          "description": "Um fantasma que se alimenta da sanidade dos inimigos.",
          "effects": [
            {
              "type": "aura",
              "name": "Desespero Sutil",
              "description": "-15% Atk Speed para inimigos."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Vontade do Monarca de Gelo",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "description": "Congela o conceito de movimento em um raio de 100m.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Abismo Dracônico da Ruína",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "description": "Dragão de escamas negras que devora o espaço-tempo.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Cria do Tempo Primordial",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "summons",
          "description": "Uma pequena criatura alada que manipula o fluxo do tempo ao redor do mestre.",
          "burst_bonus": "500%",
          "cd_reduction": "50%",
          "effects": [
            {
              "type": "active",
              "name": "Rebobinar Momento",
              "description": "Reverte HP/MP/Posição de 3s atrás."
            },
            {
              "type": "passive",
              "name": "Paradoxo Temporal",
              "description": "Cria uma cópia do jogador por 10s."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Essência do Arquiteto",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "description": "Concede acesso temporário ao código-fonte do Sistema.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Lâmina de Beru",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "description": "A garra do Rei Formiga, capaz de retalhar a própria luz.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Olho de Kamish",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "description": "A maior calamidade da humanidade. O medo paralisa todos os níveis inferiores.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    }
  ],
  "materials": [
    {
      "name": "Nichirin de Obsidiana",
      "tier": "Épico",
      "type": "item",
      "system": {
        "props": {
          "description": "Variação rara do minério Nichirin, focado em absorção de escuridão.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Stygian Steel",
      "tier": "Épico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "materials",
          "description": "Aço negro extraído do submundo. Ressoa com a alma do portador.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Runic Iron",
      "tier": "UC",
      "type": "item",
      "system": {
        "props": {
          "itemType": "materials",
          "description": "Ferro comum gravado com runas básicas de condutividade mágica.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Ætherium",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "itemType": "materials",
          "description": "Metal estelar translúcido que brilha com luz própria. Harmoniza mana.",
          "effects": [],
          "meta": {
            "stackable": true,
            "max_stack": 99,
            "value": 5000
          }
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Hihi'irokane",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "description": "O lendário 'ouro carmesim' que brilha como o sol.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Névoa Eterna",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "description": "Material gasoso estabilizado em núcleos de cristal. Concede intangibilidade.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Void-Orichalc",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "materials",
          "description": "Metal que não deveria existir. Consome a luz e o espaço ao seu redor.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Aço de Sangue",
      "tier": "Raro",
      "type": "item",
      "system": {
        "props": {
          "description": "Aço forjado em sacrifício. Escala com a vitalidade do usuário.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Mithral-Glass",
      "tier": "Raro",
      "type": "item",
      "system": {
        "props": {
          "itemType": "materials",
          "description": "Transparente como vidro, mas resistente como mithral. Ideal para armaduras leves.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Soulglass",
      "tier": "Raro",
      "type": "item",
      "system": {
        "props": {
          "description": "Cristal que armazena memórias e fragmentos de consciência.",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    }
  ],
  "housing": [
    {
      "name": "Forja Portátil de Hefesto",
      "tier": "Épico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "housing",
          "description": "Uma bigorna rúnica em miniatura que se expande. Permite reparar itens em qualquer lugar.",
          "repair_cost": "-50%",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Totem Sentinela",
      "tier": "Épico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "housing",
          "description": "Uma torre mágica que ataca invasores automaticamente.",
          "range": "20m",
          "damage": "3d8 (Fogo)",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Pedra de Retorno à Base",
      "tier": "UC",
      "type": "item",
      "system": {
        "props": {
          "itemType": "housing",
          "description": "Teleporta o usuário para o Núcleo da Guilda após 10 segundos de canalização.",
          "cast_time": "10s",
          "cooldown": "1h",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Quadro de Missões Mágico",
      "tier": "UC",
      "type": "item",
      "system": {
        "props": {
          "itemType": "housing",
          "description": "Atualiza automaticamente com missões diárias do sistema.",
          "effects": [
            {
              "type": "interactive",
              "name": "Daily Quests",
              "description": "Clique para receber uma missão aleatória."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Bandeira da Conquista",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "itemType": "housing",
          "description": "Estandarte que inspira moral. Pode ser carregado ou plantado no chão.",
          "aura_radius": "30m",
          "effects": [
            {
              "type": "aura",
              "name": "Moral Elevada",
              "description": "Imunidade a Medo para aliados num raio de 30m."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Mesa Tática Holomapa",
      "tier": "Lendário",
      "type": "item",
      "system": {
        "props": {
          "itemType": "housing",
          "description": "Exibe o mapa-múndi em tempo real, mostrando a localização de membros da guilda.",
          "effects": [
            {
              "type": "passive",
              "name": "Coordenação",
              "description": "Permite comunicação global entre membros."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Muda de Yggdrasil",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "housing",
          "description": "Uma pequena árvore sagrada. Gera 1 Fruto de Yggdrasil (Cura Total) a cada 7 dias reais.",
          "production": "1 Fruto/semana",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Núcleo da Guilda (Lapis Lazuli)",
      "tier": "Mítico",
      "type": "item",
      "system": {
        "props": {
          "itemType": "housing",
          "description": "Um cristal flutuante massivo que define a posse de um território. Se destruído, a guilda perde a base.",
          "hp": 5000,
          "defense": 20,
          "effects": [
            {
              "type": "aura",
              "name": "Domínio Absoluto",
              "description": "Membros da guilda na área ganham +2 em todos os testes."
            }
          ],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Baú Dimensional Compartilhado",
      "tier": "Raro",
      "type": "item",
      "system": {
        "props": {
          "itemType": "housing",
          "description": "O inventário deste baú é acessível por qualquer outro baú dimensional da mesma guilda.",
          "slots": 50,
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    },
    {
      "name": "Cápsula de Regeneração",
      "tier": "Raro",
      "type": "item",
      "system": {
        "props": {
          "itemType": "housing",
          "description": "Cama tecnológica/mágica que acelera a cura em 200%.",
          "regen_rate": "2x",
          "effects": [],
          "meta": {}
        }
      },
      "img": "icons/svg/item-bag.svg"
    }
  ],
  "npcs": [],
  "backgrounds": [],
  "maps": []
};

window.OMNI_DB = OMNI_DB;
