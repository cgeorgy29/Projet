fs = require('fs');
function saveWorld(context){
    console.log("Saving world for user: ", context.user)
    fs.writeFile("userworlds/" + context.user + "-world.json", JSON.stringify(context.world), err => {
        if (err) {
            console.error("Error saving world: ", err)
            throw new Error("Error saving world coté serveur: ", err)
        }
    }
    )
    
}
module.exports = {
    Query: {
        getWorld: (parent, args, context) => {
            saveWorld(context);
            return context.world;
        }
    },
    Mutation: {
    }
};