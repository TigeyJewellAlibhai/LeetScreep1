var creepTek = require('creep');
module.exports = {

    create: function(body,name, spawn){
        spawn.createCreep(body, name,{role: 'miner', working: false});
    },

    run: function(creep, room){

        //var source = creepTek.findAvaliableSource(creep);
        var source = creep.pos.findClosestByPath(FIND_SOURCES);

        var container = source.pos.findClosestByPath(FIND_STRUCTURES,{filter: ((s) => s.structureType == STRUCTURE_CONTAINER)});
        if(source.pos.findInRange(container,3) != undefined && creep.pos != container.pos) {
            creep.moveTo(container);
        }
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }


        if(creep.pos.findInRange(FIND_SOURCES,1) != 0){
            creep.memory.working = true;
        }
        else{
            creep.memory.working = false;
        }
    }
}