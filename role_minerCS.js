module.exports = {

    create: function(body,name){
        Game.spawns.Spawn1.createCreep(body, name,{role: 'minerCS', working: false});
    },

    run: function(creep){

        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        //let sources = creep.room.find(FIND_SOURCES);
        //sources = _.sortBy(sources, (s) => -s.pos.getRangeTo(Game.spawns.Spawn1));
        //var source = sources[0];
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
        if (creep.pos.findInRange(FIND_SOURCES,1) > 0){
            creep.memory.working = true;
        }
    }
};