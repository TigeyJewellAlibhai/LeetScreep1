

module.exports = {
    harvestFromMiner: function(creep, sourceNum) {
        let sources = creep.room.find(FIND_MY_CREEPS, {filter: (c) => c.memory.role == 'miner'});// && c.memory.working == 'true'});
        if (sources.length != 0) {
            sources = _.sortBy(sources, (s) => s.pos.getRangeTo(Game.spawns.Spawn1));
            var source = sources[sourceNum];
            if (source == undefined) {
                source = sources[0];
            }
            creep.moveTo(source);
            if(creep.pos.getRangeTo(source) < 2) {
                var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: ((s) => s.structureType == STRUCTURE_CONTAINER)});
                //if(container =! undefined) {
                if (/*_.sum(container.store) > 0 &&*/ container.pos.inRangeTo(creep.pos, 2) == true) {
                    creep.withdraw(container, RESOURCE_ENERGY, creep.energyCapacityAvailable);
                }

                /*
                else {
                    let sources = creep.room.find(FIND_SOURCES);
                    sources = _.sortBy(sources, (s) => -s.pos.getRangeTo(creep.room.spawns[0]));
                    var source = sources[sourceNum];
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }
                 */
            }
            //}
        }
        else {
            let sources = creep.room.find(FIND_SOURCES,{filter: (s) => s.energy > 0});
            sources = _.sortBy(sources, (s) => -s.pos.getRangeTo(creep.room.find(FIND_MY_SPAWNS)[0]));
            var source = sources[sourceNum];
            if(source != undefined){
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
            else{
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }
        }

        //else if (creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES) != 0) {
        //if(creep.pos.inRangeTo(creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES),2) == true) {
        //        var dropenergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
        //        if (creep.pickup(dropenergy) == ERR_NOT_IN_RANGE) {
        //creep.moveTo(dropenergy.pos);
        //        }
        //    }
        //    else{
        //        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        //creep.moveTo(source);
        //        }
        //    }
        // }

    },


    harvestFromMineral: function(creep) {
        let sources = creep.room.find(FIND_MY_CREEPS, {filter: (c) => c.memory.role == 'mineral_miner'});// && c.memory.working == 'true'});
        if (sources.length != 0) {
            sources = _.sortBy(sources, (s) => s.pos.getRangeTo(Game.spawns.Spawn1));
            var source = sources[sourceNum];
            if (source == undefined) {
                source = sources[0];
            }
            creep.moveTo(source);
            if(creep.pos.getRangeTo(source) < 2) {
                var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: ((s) => s.structureType == STRUCTURE_CONTAINER)});
                //if(container =! undefined) {
                if (/*_.sum(container.store) > 0 &&*/ container.pos.inRangeTo(creep.pos, 2) == true) {
                    creep.withdraw(container, RESOURCE_ENERGY, creep.energyCapacityAvailable);
                }

                /*
                else {
                    let sources = creep.room.find(FIND_SOURCES);
                    sources = _.sortBy(sources, (s) => -s.pos.getRangeTo(creep.room.spawns[0]));
                    var source = sources[sourceNum];
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }
                 */
            }
            //}
        }
        else {
            let source = creep.pos.findClosestByRange(FIND_MINERALS);
            if (source != undefined) {
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }

    },

    harvestFromStorage: function(creep, minReserve) {
        var source = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_STORAGE && _.sum(s.store) > minReserve});
        if(creep.withdraw(source,RESOURCE_ENERGY,creep.energyCapacityAvailable) == ERR_NOT_IN_RANGE){
            creep.moveTo(source);
        }
        else{
            return false;
        }

    },


    findAvaliableSource: function(creep) {
        var numMiners = _.sum(Game.creeps, (c) => c.memory.role == 'miner' && c.room === creep.room);
        if(!(creep.pos.findInRange(FIND_SOURCES, 1))){
            console.log('ok');
            var source = creep.room.find(FIND_SOURCES, {filter: (s) => s.findInRange(FIND_MY_CREEPS, 2,{filter: (c) => c.memory.role == 'miner' && !(c === creep)}).length == 0})[numMiners];

        }
        else{
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
        }
        return source;
    },

    findClosestFlag: function(creep){
        var flag = creep.pos.findClosestByRange(FIND_FLAGS);
        return flag;
    }

};