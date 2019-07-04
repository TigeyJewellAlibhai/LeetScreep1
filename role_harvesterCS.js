var creepTek = require('creep');
module.exports = {

    create: function(body,name,s){
        s.createCreep(body, name,{role: 'harvesterCS', working: false});
    },

    run: function(creep,sourceNum){
        if(creep.memory.working == true && creep.carry.energy == 0){
            creep.memory.working = false;
        }

        else if(creep.memory.working == false && creep.carry.energy >= creep.carryCapacity-10){
            creep.memory.working = true;
        }

        if(creep.memory.working == true) {
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: (s) => s.structureType != STRUCTURE_TOWER && s.structureType != STRUCTURE_LINK && s.energy < s.energyCapacity});
            if(structure != undefined && creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structure);
            }
            else if(structure == undefined){
                var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_STORAGE /*&& s.store < s.storeCapacity*/});
                if(structure != undefined && creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
            
            //else{
            //    var controller = creep.room.controller;
            //    creep.moveTo(controller);
            //    if(creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
            //        creep.moveTo(controller);
            //    }
            //}
        }

        else {
            creepTek.harvestFromMiner(creep,sourceNum);
        }
    }
};