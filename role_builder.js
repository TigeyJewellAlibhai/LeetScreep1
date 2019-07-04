var creepTek = require('creep');
var roleRepairer = require('role_repairer');

module.exports = {

    create: function(body,name,spawn){
        spawn.createCreep(body, name,{role: 'builder', working: false});
    },

    run: function(creep,sourceNum){
        if(creep.memory.working == true && creep.carry.energy == 0){
            creep.memory.working = false;
        }

        else if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
            creep.memory.working = true;
        }

        if(creep.memory.working == true) {
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES,{filter: (c) => c.structureType == STRUCTURE_CONTAINER});
            if(constructionSite != undefined){
                if(creep.build(constructionSite) == ERR_NOT_IN_RANGE){
                    creep.moveTo(constructionSite);
                }
            }
            else if(creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES) != undefined){
                var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if(creep.build(constructionSite) == ERR_NOT_IN_RANGE){
                    creep.moveTo(constructionSite);
                }
            }
            else {
                roleRepairer.run(creep,0,creep.room);
            }

        }

        else {
            creepTek.harvestFromMiner(creep,sourceNum);
        }
    }
};