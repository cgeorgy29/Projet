fs = require('fs');
function saveWorld(context){
    //console.log("Saving world for user: ", context.user)
    fs.writeFile("userworlds/" + context.user + "-world.json", JSON.stringify(context.world), err => {
        if (err) {
            console.error("Error saving world: ", err)
            throw new Error("Error saving world coté serveur: ", err)
        }
    }
    )
}

function calcArgent(context){
    var now = Date.now();
    var deltaTime = now - parseInt(context.world.lastupdate);

    context.world.products.forEach(produit => {
        if (produit.timeleft > 0){
            if (deltaTime <= produit.timeleft){
                produit.timeleft -= deltaTime;
                if (produit.timeleft <= 0){
                        produit.timeleft = 0;
                        context.world.money += produit.revenu * produit.quantite;
                        contexte.world.score += produit.revenu * produit.quantite;
                    }
            }
            else {
                if (produit.managerUnlocked){
                    //calcul nb de fois que le produit a produit
                    let nbfois = Math.floor(deltaTime / produit.timeleft);
                    produit.timeleft = produit.vitesse - (deltaTime % produit.timeleft);
                    context.world.money += produit.revenu * produit.quantite * nbfois;
                    contexte.world.score += produit.revenu * produit.quantite * nbfois;
                }
                else {
                    produit.timeleft = 0;
                    context.world.money += produit.revenu * produit.quantite;
                    contexte.world.score += produit.revenu * produit.quantite;
                }
            }
           
        }
        saveWorld(context);
    }
    )
    context.world.lastupdate = now;
    saveWorld(context);
    return context.world.money;
}

module.exports = {
    Query: {
        getWorld: (parent, args, context) => {
            calcArgent(context);
            saveWorld(context);
            return context.world;
        }
    },
    Mutation: {
        acheterQtProduit(parent, args, context) {
            calcArgent(context);
            var produit = context.world.products.find(produit => produit.id == args.id);
            if(!produit){
                throw new Error(`Le produit avec l'id ${args.id} n'existe pas`)
            }
            if (args.quantite == 0){
                return produit;
            }
            let coutR = produit.cout * (1- Math.pow(produit.croissance, args.quantite)) / (1 - produit.croissance)
            if (context.world.money < coutR){
                throw new Error("Pas assez d'argent")
            }
            context.world.money -= coutR;
            produit.quantite += args.quantite;
            produit.cout = produit.cout * Math.pow(produit.croissance, args.quantite);
            saveWorld(context);
            return produit;
        },
        
        lancerProductionProduit(parent, args, context) {
            calcArgent(context);
            var produit = context.world.products.find(produit => produit.id == args.id);
            if(!produit){
                throw new Error(`Le produit avec l'id ${args.id} n'existe pas`)
            }
            produit.timeleft = produit.vitesse;
            saveWorld(context);
            return produit;
        },

        engagerManager(parent, args, context) {
            calcArgent(context);
            var manager = context.world.managers.find(manager => manager.name == args.name);
            if(!manager){
                throw new Error(`Le manager avec le nom ${args.name} n'existe pas`)
            }
            if (context.world.money < manager.cout){
                throw new Error("Pas assez d'argent")
            }
            var produit = context.world.products.find(produit => produit.id == manager.idcible);
            if(!produit){
                throw new Error(`Le produit avec l'id ${manager.idcible} n'existe pas`)
            }
            manager.unlocked = true;
            produit.managerUnlocked = true;
            context.world.money -= manager.cout;
            saveWorld(context);
            return manager;
        }
    }
};