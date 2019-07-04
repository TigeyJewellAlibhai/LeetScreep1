var variables = require('variables');
var creepTek = require('creep');

module.exports = {
    create: function(body,name,spawn){
        spawn.createCreep(body, name,{role: 'defender'});
        //creep.moveTo(Game.flags.Guardpost1);
    },

    run: function(creep,roomName){
        var hostiles = variables.findHostiles(roomName);
        if(hostiles.length > 0) {
            creep.moveTo(hostiles[0]);
            creep.attack(hostiles[0]);
        }
        else{
            //console.log(creepTek.findClosestFlag(creep));
            creep.moveTo(creepTek.findClosestFlag(creep));
        }

    }
};