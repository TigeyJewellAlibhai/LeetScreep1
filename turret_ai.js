var variables = require('variables');
var globalCount = 0;

module.exports = {
    towerDefense: function(roomName){
        var towers = variables.getTowers(roomName);
        for (let name in Game.creeps) {
            // get the creep object
            var creep = Game.creeps[name];
            if (creep.hits < creep.hitsMax && creep.memory.role == 'defender') {
                towers.forEach(tower => tower.heal(creep));
                console.log(roomName.name + " TOWER STATUS: HEAL UNITS");
            }
        }
        var hostiles = variables.findHostiles(roomName);
        if(hostiles.length > 0) {
            //var username = hostiles[0].owner.username;
            //Game.notify(`User ${username} spotted in room ${roomName}`);
            towers.forEach(tower => tower.attack(hostiles[0]));
        }
    },

    towerPassive: function(roomName){

        var towers = variables.getTowers(roomName);
        var returnable = false;

        //----------------------- CONSOLE STATUS MESSAGE ----------------------------
        //globalCount += 1;
        //if (globalCount == 7) {var returnable = true; globalCount = 0;}

        for (let name in Game.creeps) {
            // get the creep object
            var creep = Game.creeps[name];
            if (creep.hits < creep.hitsMax) {
                towers.forEach(tower => tower.heal(creep));
                if(returnable){console.log(roomName + "TOWER STATUS: HEAL UNITS")};
            }
        }


        for(var i in towers){
            if(towers[i].energy > variables.getTowerReserve()){

                //Find the closest damaged Structure
                var closestDamagedStructure = towers[i].pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART});
                var closestDamagedRampart = variables.getLowRampart(roomName);
                var closestWorstRampart = variables.getLowestRampart(roomName);
                var closestDamagedWall = variables.getLowWalls(roomName);
                if(closestWorstRampart != undefined) {
                    towers[i].repair(closestWorstRampart);
                    //if(returnable){console.log(roomName.name + " TOWER STATUS: BUILD RAMPARTS")};
                }
                else if(closestDamagedRampart != undefined) {
                    towers[i].repair(closestDamagedRampart);
                    //if(returnable){console.log(roomName.name + " TOWER STATUS: REPAIR RAMPARTS")};
                }
                else if(closestDamagedWall != undefined) {
                    towers[i].repair(closestDamagedWall);
                    //if(returnable){console.log(roomName.name + " TOWER STATUS: REPAIR WALLS")};
                }
                else if(closestDamagedStructure) {
                    towers[i].repair(closestDamagedStructure);
                    //if(returnable){console.log(roomName.name + " TOWER STATUS: REPAIR BUILDINGS")};
                }
            }
        }
    }
};