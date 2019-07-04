var creepTek = require('creep');
module.exports = {

    create: function(body,name,spawn){
        spawn.createCreep(body, name,{role: 'upgraderCS', working: false});
    },

    run: function(creep,sourceNum){

        if(creep.memory.working == true && creep.carry.energy == 0){
            creep.memory.working = false;
        }

        else if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
            creep.memory.working = true;
        }

        if(creep.memory.working == true) {
            var controller = creep.room.controller;
            creep.moveTo(controller);
            if(creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller);
            }

        }

        else {
            creepTek.harvestFromMiner(creep,sourceNum);
        }
    }
};