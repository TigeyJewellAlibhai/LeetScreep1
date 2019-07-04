var variables = require('variables');
var spawnDesignator = require('spawn_designator');
var roleMiner = require('role_miner');
var roleHarvesterCS = require('role_harvesterCS');
var roleUpgraderCS = require('role_upgraderCS');
var roleBuilderCS = require('role_builderCS');
var roleRepairerCS = require('role_repairerCS');
var roleAttacker = require('role_attacker');

var roleDefender = require('role_defender');
var turretAI = require('turret_ai');

var minHarvesterCS = 2;
var minUpgraderCS = 3;
var minRepairerCS = 2;
var minBuilderCS = 2;
var minMiners = 2;
var minDefenders = 3;
var minAttackers = 2;


var room1 = Game.spawns.Spawn1.room;
var room2 = Game.spawns.Spawn2.room;
var room3 = Game.spawns.Spawn3.room;
var rooms = [room1];
var allies = ['FrostBird347'];

module.exports.loop = function(){

    for(let name in Memory.creeps){
        if (Game.creeps[name] == undefined){
            delete Memory.creeps[name];
        }
    }
/*
    for (let name in Game.creeps) {

        var creep = Game.creeps[name];

        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        } else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        } else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        } else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        } else if (creep.memory.role == 'harvesterCS') {
            roleHarvesterCS.run(creep, 1);
        } else if (creep.memory.role == 'upgraderCS') {
            roleUpgraderCS.run(creep, 0);
        } else if (creep.memory.role == 'builderCS') {
            roleBuilderCS.run(creep, 1);
        } else if (creep.memory.role == 'repairerCS') {
            roleRepairerCS.run(creep, 0, creep.room);
        } else if (creep.memory.role == 'miner') {
            roleMiner.run(creep);
        } else if (creep.memory.role == 'defender') {
            roleDefender.run(creep, room1);
        } else if (creep.memory.role == 'attacker') {
            roleAttacker.run(creep);
        }
    }
    */

    for (let name in Game.creeps) {

            var creep = Game.creeps[name];

            if (creep.memory.role == 'attacker') {
                roleAttacker.run(creep);
            }
    }

    for(let r in rooms) {

        var hostiles = variables.findHostiles(room1);
        if (hostiles.length > 0) {
            console.log('ENEMIES APPROACHING');
            turretAI.towerDefense(room1);
            roleDefender.create([ATTACK, ATTACK, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH], undefined, room1.find(FIND_MY_SPAWNS)[0]);
        } else {
            turretAI.towerPassive(room1);
        }
        
        var hostiles = variables.findHostiles(room2);
        if (hostiles.length > 0) {
            console.log('ENEMIES APPROACHING');
            turretAI.towerDefense(room2);
            roleDefender.create([ATTACK, ATTACK, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH], undefined, room2.find(FIND_MY_SPAWNS)[0]);
        } else {
            turretAI.towerPassive(room2);
        }
        
        var hostiles = variables.findHostiles(room3);
        if (hostiles.length > 0) {
            console.log('ENEMIES APPROACHING');
            turretAI.towerDefense(room3);
            roleDefender.create([ATTACK, ATTACK, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH], undefined, room3.find(FIND_MY_SPAWNS)[0]);
        } else {
            turretAI.towerPassive(room3);
        }

        //spawnDesignator.runContainerMining(room1);
        //spawnDesignator.runContainerMining(room2);
        spawnDesignator.createContainerMining(room1);
        spawnDesignator.createStandardSmartMining(room2);
        //spawnDesignator.createStandardMining(room2);
        spawnDesignator.createStandardMining(room3);
        variables.makeTrade(room1);
        variables.makeTrade(room2);
        //console.log(variables.smartSpawn([WORK,MOVE,ATTACK]).toString());
    }
},


getNumMiners =  function(){return numMiners;};



