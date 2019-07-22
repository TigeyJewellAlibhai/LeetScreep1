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
var fullStatus = false;

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


        var hostiles = variables.findHostiles(room1);
        if (hostiles.length > 0) {
            if(hostiles.length < 3) {
                if (variables.fractionDelay(10)) {console.log('THREAT IDENTIFIED');}
                turretAI.towerDefense(room1);
                roleDefender.create([ATTACK, ATTACK, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH], undefined, room1.find(FIND_MY_SPAWNS)[0]);
            }
            else{
                if (variables.fractionDelay(10)) {console.log('SIEGE MODE ENGAGED');}
            }
        } else {
            turretAI.towerPassive(room1);
        }
        
        var hostiles = variables.findHostiles(room2);
        if (hostiles.length > 0) {
            if(variables.fractionDelay(10)){console.log('THREAT IDENTIFIED');}
            turretAI.towerDefense(room2);
            roleDefender.create([ATTACK, ATTACK, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH], undefined, room2.find(FIND_MY_SPAWNS)[0]);
        } else {
            turretAI.towerPassive(room2);
        }
        
        var hostiles = variables.findHostiles(room3);
        if (hostiles.length > 0) {
            if(variables.fractionDelay(10)){console.log('THREAT IDENTIFIED');}
            turretAI.towerDefense(room3);
            roleDefender.create([ATTACK, ATTACK, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH], undefined, room3.find(FIND_MY_SPAWNS)[0]);
        } else {
            turretAI.towerPassive(room3);
        }


        var room1Pop = spawnDesignator.createContainerMining(room1);
        var room2Pop = spawnDesignator.createStandardSmartMining(room2);
        var room3Pop = spawnDesignator.createStandardSmartMining(room3);

        var state = [room1Pop, room2Pop, room3Pop];

        if(variables.fractionDelay(50)) {
            variables.makeTrade(room1);
            variables.makeTrade(room2);
            variables.makeTrade(room3);
        };

        if(fullStatus){
            for(var i in state) {
                console.log(state[i][0] + " POPULATION: " + state[i][1] + "H " + state[i][2] + "U " + state[i][3] + "B " + state[i][4] + "R " + state[i][5] + "MU " + state[i][6] + "MI " + state[i][7] + "D " + state[i][8] + "A");
            }
        }

        fullStatus = false;

        //console.log(variables.smartSpawn([WORK,MOVE,ATTACK]).toString());
},

getStatus = function(){fullStatus = true; return "Loading Status at...";};

getNumMiners =  function(){return numMiners;};



