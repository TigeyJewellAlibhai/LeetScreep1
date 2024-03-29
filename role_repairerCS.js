var creepTek = require('creep');
var roleUpgraderCS = require('role_upgraderCS');
var roleHarvesterCS = require('role_harvesterCS');
var variables = require('variables');


module.exports = {

    create: function(body,name,s){
        s.createCreep(body, name,{role: 'repairerCS', working: false});
    },

    run: function(creep,sourceNum,roomName){
        if(creep.memory.working == true && creep.carry.energy == 0){
            creep.memory.working = false;
        }

        else if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
            creep.memory.working = true;
        }

        if(creep.memory.working == true) {
            var tower = variables.getLowTower(roomName);
            var repairSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART});
            if(tower != undefined && tower.energy < tower.energyCapacity) {
                if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tower);
                }
            }
            else if(repairSite != undefined){
                if(creep.repair(repairSite) == ERR_NOT_IN_RANGE){
                    creep.moveTo(repairSite);
                }
            }
            else {
                if(creep.memory.role == 'repairerCS'){
                    roleHarvesterCS.run(creep);
                }
                else{
                    roleUpgraderCS.run(creep);
                }
            }
            
        }

        else {
            creepTek.harvestFromMiner(creep,sourceNum);
        }
    }
};