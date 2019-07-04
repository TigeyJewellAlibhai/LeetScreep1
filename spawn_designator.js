var variables = require('variables');
var roleMiner = require('role_miner');
var roleHarvester = require('role_harvester');
var roleUpgrader = require('role_upgrader');
var roleBuilder = require('role_builder');
var roleRepairer = require('role_repairer');
var roleAttacker = require('role_attacker');
var roleMulti = require('role_multi');

var roleDefender = require('role_defender');
var turretAI = require('turret_ai');

var globalCount = 0;

module.exports = {
    createContainerMining: function (r) {
        var roomSpawn = r.find(FIND_MY_SPAWNS)[0];
        var numHarvester = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.room === roomSpawn.room);
        var numUpgrader = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' && c.room === roomSpawn.room);
        var numBuilder = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.room === roomSpawn.room);
        var numRepairer = _.sum(Game.creeps, (c) => c.memory.role == 'repairer' && c.room === roomSpawn.room);
        var numMiners = _.sum(Game.creeps, (c) => c.memory.role == 'miner' && c.room === roomSpawn.room);
        var numDefenders = _.sum(Game.creeps, (c) => c.memory.role == 'defender' && c.room === roomSpawn.room);
        var numMulti = _.sum(Game.creeps, (c) => c.memory.role == 'multi' && c.room === roomSpawn.room);
        var numAttackers = _.sum(Game.creeps, (c) => c.memory.role == 'attacker');

        for (let name in Game.creeps) {

            var creep = Game.creeps[name];

            if(creep.room === roomSpawn.room) {

                if(creep.memory.role == 'harvester') {
                    roleHarvester.run(creep, 1);
                } else if (creep.memory.role == 'upgrader') {
                    roleUpgrader.run(creep, 0);
                } else if (creep.memory.role == 'builder') {
                    roleBuilder.run(creep, 1);
                } else if (creep.memory.role == 'repairer') {
                    roleRepairer.run(creep, 0, creep.room);
                } else if (creep.memory.role == 'miner') {
                    roleMiner.run(creep);
                } else if (creep.memory.role == 'defender') {
                    roleDefender.run(creep, creep.room);
                } else if (creep.memory.role == 'multi') {
                    roleMulti.runTerminal(creep);
                } else if (creep.memory.role == 'attacker') {
                    roleAttacker.run(creep);
                }
            }
        }


        var roomEnergy = r.energyCapacityAvailable;
        //console.log(roomEnergy);
        if (roomEnergy <= 300) {
            if (numHarvester < 4) {
                roleHarvester.create([WORK, WORK, CARRY, MOVE], undefined, roomSpawn);
            } else if (numUpgrader < 3) {
                roleUpgrader.create([WORK, WORK, CARRY, MOVE], undefined, roomSpawn);
            } else if (numBuilder < 2) {
                roleBuilder.create([WORK, CARRY, CARRY, MOVE], undefined, roomSpawn);
            } else if (numRepairer < 2) {
                roleRepairer.create([WORK, CARRY, CARRY, MOVE], undefined, roomSpawn);
            }
        } else if (roomEnergy <= 800) {
            if (numHarvester < 4) {
                roleHarvester.create([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], undefined, roomSpawn);
            } else if (numUpgrader < 3) {
                roleUpgrader.create([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], undefined, roomSpawn);
            } else if (numBuilder < 2) {
                roleBuilder.create([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], undefined, roomSpawn);
            } else if (numRepairer < 2) {
                roleRepairer.create([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], undefined, roomSpawn);
            } else if (numUpgrader < 5) {
                roleUpgrader.create([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], undefined, roomSpawn);
            }
        } else if (roomEnergy <= 1200) {
            if (numMiners == 0) {
                if (numHarvester < 2) {
                    roleHarvester.create([WORK, WORK, CARRY, MOVE], undefined, roomSpawn);
                } else if (numBuilder < 2) {
                    roleBuilder.create([WORK, WORK, CARRY, MOVE], undefined, roomSpawn);
                } else {
                    roleMiner.create([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE], undefined, roomSpawn);
                }
            } else if (numMiners == 1) {
                if (numHarvester < 1) {
                    roleHarvester.create([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, WORK, MOVE, MOVE, MOVE, MOVE], undefined, roomSpawn)
                } else if (numBuilder < 2) {
                    roleBuilder.create([CARRY, CARRY, CARRY, WORK, WORK, MOVE, MOVE, MOVE, MOVE], undefined, roomSpawn)
                } else if (numRepairer < 1) {
                    roleRepairer.create([CARRY, CARRY, CARRY, WORK, WORK, MOVE, MOVE, MOVE, MOVE], undefined, roomSpawn)
                } else if (numMiners < 2) {
                    roleMiner.create([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE], undefined, roomSpawn);
                }
            } else if (numMiners < 2) {
                roleMiner.create([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE], undefined, roomSpawn);
            }  else if (numHarvester == 0) {
                roleHarvester.create([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], undefined, roomSpawn);
            } else if (numHarvester < 2) {
                roleHarvester.create([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, WORK, MOVE, MOVE, MOVE, MOVE], undefined, roomSpawn)
            } else if (numUpgrader < 3) {
                roleUpgrader.create([CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE], undefined, roomSpawn)
            } else if (numRepairer < 3) {
                roleRepairer.create([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, WORK, MOVE, MOVE, MOVE, MOVE], undefined, roomSpawn)
            } else if (numBuilder < 2) {
                roleBuilder.create([CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE], undefined, roomSpawn)
            } else if (numDefenders < 2) {
                roleDefender.create([ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH], undefined, roomSpawn)
            }
            //else if(numAttackers < 2) {roleAttacker.create([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],undefined, roomSpawn);}
        } else {
            if (numMiners == 0) {
                //console.log('ok');
                if (numHarvester < 2) {
                    roleHarvester.create([WORK, WORK, CARRY, MOVE], undefined, roomSpawn);
                } else if (numBuilder < 1) {
                    roleBuilder.create([WORK, WORK, CARRY, MOVE], undefined, roomSpawn);
                } else {
                    roleMiner.create([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE], undefined, roomSpawn);
                }
            } else if (numMiners == 1) {
                if (numHarvester < 1) {
                    roleHarvester.create([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, WORK, MOVE, MOVE, MOVE, MOVE], undefined, roomSpawn)
                }
                //else if (numBuilderCS < 1) {roleBuilderCS.create([CARRY, CARRY, CARRY, WORK, WORK, MOVE, MOVE, MOVE, MOVE], undefined, roomSpawn)}
                //else if (numRepairerCS < 1) {roleRepairerCS.create([CARRY, CARRY, CARRY, WORK, WORK, MOVE, MOVE, MOVE, MOVE], undefined, roomSpawn)}
                else if (numMiners < 2) {
                    roleMiner.create([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE], undefined, roomSpawn);
                }
            } else if (numMiners < 2) {
                roleMiner.create([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE], undefined, roomSpawn);
            }   else if (numHarvester == 0) {
                roleHarvester.create([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], undefined, roomSpawn);
            } else if (numHarvester < 2) {
                roleHarvester.create([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, roomSpawn)
            }  else if (numRepairer < 1) {
                roleRepairer.create([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, WORK, WORK, MOVE, MOVE, MOVE, MOVE], undefined, roomSpawn)
            } else if (numUpgrader < 2) {
                roleUpgrader.create([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE], undefined, roomSpawn)
            } else if (numBuilder < 2) {
                roleBuilder.create([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE], undefined, roomSpawn)
            } else if (numDefenders < 2) {
                roleDefender.create([ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH], undefined, roomSpawn)
            } else if (numMulti < 1) {
                roleMulti.create([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, roomSpawn);
            }
            //else if(numAttackers < 2) {roleAttacker.create([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],undefined, roomSpawn);}
        }

        //----------------------- CONSOLE STATUS MESSAGE ----------------------------
        globalCount += 1;
        if (globalCount == 7) {
            console.log(
                roomSpawn.room.name + ' ROLE POPULATION: ' + numMiners + 'M ' + numHarvester + 'H ' + numBuilder + 'B ' + numUpgrader + 'U ' + numRepairer + 'R ' + numDefenders + 'D ' + numAttackers + 'A'
            );
            globalCount = 0;
        }
    },

    createStandardMining: function (r) {
        var roomSpawn = r.find(FIND_MY_SPAWNS)[0];
        var numHarvester = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.room === roomSpawn.room);
        var numUpgrader = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' && c.room === roomSpawn.room);
        var numBuilder = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.room === roomSpawn.room);
        var numRepairer = _.sum(Game.creeps, (c) => c.memory.role == 'repairer' && c.room === roomSpawn.room);
        var numMiners = _.sum(Game.creeps, (c) => c.memory.role == 'miner' && c.room === roomSpawn.room);
        var numDefenders = _.sum(Game.creeps, (c) => c.memory.role == 'defender' && c.room === roomSpawn.room);
        var numMulti = _.sum(Game.creeps, (c) => c.memory.role == 'multi' && c.room === roomSpawn.room);
        var numAttackers = _.sum(Game.creeps, (c) => c.memory.role == 'attacker');

        for (let name in Game.creeps) {

            var creep = Game.creeps[name];

            if (creep.memory.role == 'attacker') {
                roleAttacker.run(creep);
            }

            if(creep.room === roomSpawn.room) {

                if (creep.memory.role == 'harvester') {
                    roleHarvester.run(creep, 1);
                } else if (creep.memory.role == 'upgrader') {
                    roleUpgrader.run(creep, 0);
                } else if (creep.memory.role == 'builder') {
                    roleBuilder.run(creep, 1);
                } else if (creep.memory.role == 'repairer') {
                    roleRepairer.run(creep, 0, creep.room);
                } else if (creep.memory.role == 'miner') {
                    roleMiner.run(creep);
                } else if (creep.memory.role == 'defender') {
                    roleDefender.run(creep, creep.room);
                }
            }
        }


        var roomEnergy = r.energyCapacityAvailable;
        //console.log(roomEnergy);
        if (roomEnergy <= 300) {
            if (numHarvester < 4) {
                roleHarvester.create([WORK, WORK, CARRY, MOVE], undefined, roomSpawn);
            } else if (numUpgrader < 3) {
                roleUpgrader.create([WORK, WORK, CARRY, MOVE], undefined, roomSpawn);
            } else if (numBuilder < 2) {
                roleBuilder.create([WORK, CARRY, CARRY, MOVE], undefined, roomSpawn);
            } else if (numRepairer < 2) {
                roleRepairer.create([WORK, CARRY, CARRY, MOVE], undefined, roomSpawn);
            }
        } else if (roomEnergy <= 800) {
            if (numHarvester < 4) {
                roleHarvester.create([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], undefined, roomSpawn);
            } else if (numUpgrader < 3) {
                roleUpgrader.create([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], undefined, roomSpawn);
            } else if (numBuilder < 2) {
                roleBuilder.create([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], undefined, roomSpawn);
            } else if (numRepairer < 2) {
                roleRepairer.create([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], undefined, roomSpawn);
            } else if (numUpgrader < 5) {
                roleUpgrader.create([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], undefined, roomSpawn);
            }
        } else if (roomEnergy <= 1200) {
            if (numHarvester == 0) {
                roleHarvester.create([CARRY, CARRY, WORK, MOVE, MOVE], undefined, roomSpawn);
            } else if (numHarvester < 2) {
                roleHarvester.create([CARRY, CARRY, CARRY, CARRY, WORK, WORK, MOVE, MOVE, MOVE, MOVE], undefined, roomSpawn)
            } else if (numUpgrader < 3) {
                roleUpgrader.create([CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE], undefined, roomSpawn)
            } else if (numRepairer < 3) {
                roleRepairer.create([CARRY, CARRY, CARRY, CARRY, WORK, WORK, MOVE, MOVE, MOVE, MOVE], undefined, roomSpawn)
            } else if (numBuilder < 2) {
                roleBuilder.create([CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE], undefined, roomSpawn)
            } else if (numDefenders < 2) {
                roleDefender.create([ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH], undefined, roomSpawn)
            }
            //else if(numAttackers < 1) {roleAttacker.create([CLAIM,MOVE,MOVE,MOVE,MOVE],undefined, roomSpawn);}
            //else if(numAttackers < 2) {roleAttacker.create([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],undefined, roomSpawn);}
        } else {
            if (numHarvester == 0) {
                roleHarvester.create([CARRY, CARRY, WORK, MOVE, MOVE], undefined, roomSpawn);
            } else if (numHarvester < 2) {
                roleHarvester.create([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE], undefined, roomSpawn)
            }  else if (numRepairer < 1) {
                roleRepairer.create([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE], undefined, roomSpawn)
            } else if (numUpgrader < 2) {
                roleUpgrader.create([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE], undefined, roomSpawn)
            } else if (numBuilder < 2) {
                roleBuilder.create([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE], undefined, roomSpawn)
            } else if (numDefenders < 2) {
                roleDefender.create([ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH], undefined, roomSpawn)
            }
            //else if(numAttackers < 2) {roleAttacker.create([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE],undefined, roomSpawn);}
            //else if(numAttackers < 2) {roleAttacker.create([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],undefined, roomSpawn);}
        }

        //----------------------- CONSOLE STATUS MESSAGE ----------------------------
        globalCount += 1;
        if (globalCount == 7) {
            console.log(
                roomSpawn.room.name + ' ROLE POPULATION: ' + numMiners + 'M ' + numHarvester + 'H ' + numBuilder + 'B ' + numUpgrader + 'U ' + numRepairer + 'R ' + numDefenders + 'D ' + numAttackers + 'A'
            );
            globalCount = 0;
        }
    },

    createStandardSmartMining: function(r){
        var roomSpawn = r.find(FIND_MY_SPAWNS)[0];
        var numHarvester = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.room === roomSpawn.room);
        var numUpgrader = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' && c.room === roomSpawn.room);
        var numBuilder = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.room === roomSpawn.room);
        var numRepairer = _.sum(Game.creeps, (c) => c.memory.role == 'repairer' && c.room === roomSpawn.room);
        var numMiners = _.sum(Game.creeps, (c) => c.memory.role == 'miner' && c.room === roomSpawn.room);
        var numDefenders = _.sum(Game.creeps, (c) => c.memory.role == 'defender' && c.room === roomSpawn.room);
        var numMulti = _.sum(Game.creeps, (c) => c.memory.role == 'multi' && c.room === roomSpawn.room);
        var numAttackers = _.sum(Game.creeps, (c) => c.memory.role == 'attacker');

        for (let name in Game.creeps) {

            var creep = Game.creeps[name];

            if (creep.memory.role == 'attacker') {
                roleAttacker.run(creep);
            }

            if(creep.room === roomSpawn.room) {

                if (creep.memory.role == 'harvester') {
                    roleHarvester.run(creep, 1);
                } else if (creep.memory.role == 'upgrader') {
                    roleUpgrader.run(creep, 0);
                } else if (creep.memory.role == 'builder') {
                    roleBuilder.run(creep, 1);
                } else if (creep.memory.role == 'repairer') {
                    roleRepairer.run(creep, 0, creep.room);
                } else if (creep.memory.role == 'miner') {
                    roleMiner.run(creep);
                } else if (creep.memory.role == 'multi') {
                    roleMulti.runTerminal(creep);
                } else if (creep.memory.role == 'defender') {
                    roleDefender.run(creep, creep.room);
                }
            }
        }

        if(numHarvester < 2){
            variables.smartSpawn('harvester',[WORK,CARRY,CARRY,MOVE],roomSpawn,2);
        }
        else if(numRepairer < 2){
            variables.smartSpawn('repairer',[WORK,CARRY,CARRY,MOVE],roomSpawn,2);
        }
        else if(numUpgrader < 2){
            variables.smartSpawn('upgrader',[WORK,CARRY,CARRY,MOVE],roomSpawn,2);
        }
        else if(numBuilder < 2){
            variables.smartSpawn('builder',[WORK,CARRY,CARRY,MOVE],roomSpawn,2);
        }
        else if(numDefenders < 2){
            variables.smartSpawn('defender',[ATTACK,MOVE,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH],roomSpawn,3);
        }
        else if(numMulti == 0){
            roleMulti.create([CARRY, CARRY, CARRY, CARRY, MOVE], undefined, roomSpawn);
        }

        //----------------------- CONSOLE STATUS MESSAGE ----------------------------
        globalCount += 1;
        if (globalCount == 7) {
            console.log(
                roomSpawn.room.name + ' ROLE POPULATION: ' + numMiners + 'M ' + numHarvester + 'H ' + numBuilder + 'B ' + numUpgrader + 'U ' + numRepairer + 'R ' + numDefenders + 'D ' + numAttackers + 'A'
            );
            globalCount = 0;
        }
    }


};