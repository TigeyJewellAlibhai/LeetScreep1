var variables = require('variables');
var creepTek = require('creep');
var roleRepairerCS = require('role_repairerCS');

module.exports = {
    create: function(body,name,spawn){
        spawn.createCreep(body, name,{role: 'attacker', working: false});
        //creep.moveTo(Game.flags.Guardpost1);
    },

    run: function(creep) {

        //creep.moveTo(RoomPosition(10,10,'W42S2'));
        //creep.moveTo(Game.flags.Attack1);
        //creep.moveTo(Game.flags.Attack1);
        var roomName = creep.room;

        if(Game.flags.Attack1.room != roomName) {
            console.log('ye');
            creep.moveTo(Game.flags.Attack1);
        }

        else {
            var hostiles = roomName.find(FIND_HOSTILE_CREEPS, {filter: (c) => variables.getAllies.indexOf(c.owner.username) == -1});
            if (hostiles.length > 0) {
                console.log('err');
                creep.moveTo(hostiles[0]);
                creep.attack(hostiles[0]);
            }
            else if(creep.room.controller.owner.username != 'Tigris360'){
                if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.controller);
                }
            }
            else {
                if (creep.memory.working == true && creep.carry.energy == 0) {
                    creep.memory.working = false;
                } else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
                    creep.memory.working = true;
                }

                if (creep.memory.working == true) {

                    var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                    if (constructionSite != undefined) {
                        if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(constructionSite);
                        }
                    } else {
                        roleRepairerCS.run(creep, 0 , creep.room);
                    }

                } else {
                    let sources = roomName.find(FIND_SOURCES);
                    //sources = _.sortBy(sources, (s) => -s.pos.getRangeTo(roomName.spawns[0]));
                    var source = sources[0];
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }
            }
        }



    }
};