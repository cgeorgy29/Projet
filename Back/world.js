module.exports = { 
    "name": "Isaac Capitalist", 
    "logo": "icones/world_icon.png", 
    "money": 0, 
    "score": 0, 
    "totalangels": 0, 
    "activeangels": 0, 
    "angelbonus": 2, 
    "lastupdate": 0, 
    "products": [ 
        { 
            "id": 1, 
            "name": "Larry", 
            "logo": "icones/larry.png", 
            "cout": 4, 
            "croissance": 1.07, 
            "revenu": 1, 
            "vitesse": 500, 
            "quantite": 1, 
            "timeleft": 0, 
            "managerUnlocked": false, 
            "palliers": [ 
                { 
                    "name": "Nom du premier palier", 
                    "logo": "icones/premierpalier.jpg", 
                    "seuil": 20, 
                    "idcible": 1, 
                    "ratio": 2, 
                    "typeratio": "vitesse", 
                    "unlocked": "false" 
                }, 
                { 
                    "name": "Nom deuxième palier", 
                    "logo": "icones/deuxiemepalier.jpg", 
                    "seuil": 75, 
                    "idcible": 1, 
                    "ratio": 2, 
                    "typeratio": "vitesse", 
                    "unlocked": "false" 
                }, 
            ]
                
        },
        { 
            "id": 2, 
            "name": "Monstro", 
            "logo": "icones/monstro.png", 
            "cout": 10,
            "croissance": 1.15,
            "revenu": 40,
            "vitesse": 250,
            "quantite": 0,
            "timeleft": 0,
            "managerUnlocked": false,
            "palliers": [
                {
                    "name": "Nom du premier palier",
                    "logo": "icones/premierpalier.jpg",
                    "seuil": 20,
                    "idcible": 2,
                    "ratio": 2,
                    "typeratio": "vitesse",
                    "unlocked": "false"
                },
                {
                    "name": "Nom deuxième palier",
                    "logo": "icones/deuxiemepalier.jpg",
                    "seuil": 75,
                    "idcible": 2,
                    "ratio": 2,
                    "typeratio": "vitesse",
                    "unlocked": "false"
                },
            ]
       }     
    ], 
    "allunlocks": [ 
        { 
            "name": "Basement Boy", 
            "logo": "icones/basementboy.png", 
            "seuil": 30, 
            "idcible": 0, 
            "ratio": 2, 
            "typeratio": "gain", 
            "unlocked": "false" 
        }, 
   ],  
    "upgrades": [ 
        { 
            "name": "Magic Mushrooms", 
            "logo": "icones/magicmushrooms.png", 
            "seuil": 1e3, 
            "idcible": 1, 
            "ratio": 3, 
            "typeratio": "gain", 
            "unlocked": "false" 
        }, 
    ], 
    "angelupgrades": [ 
        { 
            "name": "Angel Sacrifice", 
            "logo": "icones/angel.png", 
            "seuil": 10, 
            "idcible": 0, 
            "ratio": 3, 
            "typeratio": "gain", 
            "unlocked": "false" 
        }, 
    ], 

  
    "managers": [ 
        { 
            "name": "Isaac", 
            "logo": "icones/Isaac.png", 
            "seuil": 10, 
            "idcible": 1, 
            "ratio": 0, 
            "typeratio": "gain", 
            "unlocked": "false" 
        },  
    ] 
};
