var creepTek = require('creep');
module.exports = {

    create: function(body,name,s){
        s.createCreep(body, name,{role: 'multi', working: false});
    },

    runTerminal: function(creep,sourceNum){
        if(creep.memory.working == true && _.sum(creep.carry) == 0){
            creep.memory.working = false;
        }

        else if(creep.memory.working == false && _.sum(creep.carry) >= creep.carryCapacity-10){
            creep.memory.working = true;
        }

        if(creep.memory.working == true) {
            if (creep.carry.energy < creep.carryCapacity - 10) {
                this.runMining(creep);
            } else {
                var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TERMINAL && _.sum(s.store) < s.storeCapacity});
                if (structure != undefined && creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }

                //else{
                //    var controller = creep.room.controller;
                //    creep.moveTo(controller);
                //    if(creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                //        creep.moveTo(controller);
                //    }
                //}
            }
        }

        else {
            if(creepTek.harvestFromStorage(creep, 500000) == false){
                this.runMining(creep);
            }
        }
    },

    runMining: function(creep){
        if(creep.memory.working == true && _.sum(creep.carry) == 0){
            creep.memory.working = false;
        }

        else if(creep.memory.working == false && _.sum(creep.carry) >= creep.carryCapacity-10){
            creep.memory.working = true;
        }

        if(creep.memory.working == true) {
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TERMINAL && _.sum(s.store) < s.storeCapacity});

            //creep.moveTo(structure);
            //console.log(creep.transfer(structure, _.findKey(creep.carry)));

            if(structure != undefined && creep.transfer(structure, _.findKey(creep.carry)) == ERR_NOT_IN_RANGE) {
                console.log('ok');
                creep.moveTo(structure);

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
            creepTek.harvestFromMineral(creep);
        }
    }


};