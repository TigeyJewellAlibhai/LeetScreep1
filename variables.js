
var allies = ['FrostBird347'];
var towerReserve = 750;
var rampartMin = 75000;
var wallMin = 125000;

module.exports = {
    getAllies: function(){return allies;},
    getTowerReserve: function(){return towerReserve},

    getTowers: function(room){
        var towers = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        return towers;
    },
    getLowTower: function(room){
        var towers = room.find(FIND_MY_STRUCTURES, {filter: ((s) => s.structureType == STRUCTURE_TOWER && s.energy <= towerReserve)});
        if(towers[0] != undefined){
            return towers[0];
        }
        var towers = room.find(FIND_MY_STRUCTURES, {filter: ((s) => s.structureType == STRUCTURE_TOWER)});
        if(towers[0] != undefined){
            return towers[0];
        }
    },

    getRamparts: function(room){
        var ramparts = room.find(FIND_STRUCTURES, {filter: ((s) => s.structureType == STRUCTURE_RAMPART)});
        return ramparts;
    },

    getLowRampart: function(room){
        var ramparts = room.find(FIND_STRUCTURES, {filter: ((s) => s.structureType == STRUCTURE_RAMPART && s.hits < rampartMin)});
        return ramparts[0];
    },
    
    getLowestRampart: function(room){
        var ramparts = room.find(FIND_STRUCTURES, {filter: ((s) => s.structureType == STRUCTURE_RAMPART && s.hits < 1000)});
        return ramparts[0];
    },

    getWalls: function(room){
        var walls = room.find(FIND_STRUCTURES, {filter: ((s) => s.structureType == STRUCTURE_WALL)});
        return walls;
    },

    getLowWalls: function(room){
        var walls = room.find(FIND_STRUCTURES, {filter: ((s) => s.structureType == STRUCTURE_WALL && s.hits < wallMin)});
        return walls[0];
    },

    findHostiles: function(room){
        var otherCreeps = room.find(FIND_HOSTILE_CREEPS, {filter:((c) => allies.indexOf(c.owner.username) == -1)});
        //var otherCreeps = room.find(FIND_HOSTILE_CREEPS);

        return otherCreeps;
    },

    anyHostiles: function(room){
        if(findHostiles(room).length > 0){
            return true;
        }
        else{
            return false;
        }
    },

    harvestFromMiner: function(creep, sourceNum) {
        let sources = creep.room.find(FIND_MY_CREEPS, {filter: (c) => c.memory.role == 'miner'});// && c.memory.working == 'true'});
        if (sources.length != 0) {
            sources = _.sortBy(sources, (s) => s.pos.getRangeTo(Game.spawns.Spawn1));
            var source = sources[sourceNum];
            if (source == undefined) {
                source = sources[0];
            }
            creep.moveTo(source);
            var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: ((s) => s.structureType == STRUCTURE_CONTAINER)});

            if (_.sum(container.store) > 0 && container.pos.inRangeTo(creep.pos, 2) == true) {
                creep.withdraw(container, RESOURCE_ENERGY, creep.energyCapacityAvailable);
            }
        } else {
            let sources = creep.room.find(FIND_SOURCES);
            sources = _.sortBy(sources, (s) => -s.pos.getRangeTo(Game.spawns.Spawn1));
            var source = sources[sourceNum];
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
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

    makeTrade: function(roomName){
        if (roomName.terminal) {
            if (roomName.terminal.store[RESOURCE_ENERGY] >= 20000) {
                var orders = Game.market.getAllOrders(order => order.resourceType == RESOURCE_ENERGY &&
                    order.type == ORDER_BUY &&
                    Game.market.calcTransactionCost(10000, roomName.name, order.roomName) < 20000);
                //console.log('Energy buy orders found: ' + orders.length);
                orders.sort(function(a,b){return b.price - a.price;});
                if (orders[0].price > 0.0065) {
                    var cost = Game.market.calcTransactionCost(10000, roomName.name, orders[0].roomName);
                    var result = Game.market.deal(orders[0].id, 10000, roomName.name);
                    if (result == 0) {
                        console.log('Energy sale of 10000 units completed at ' + orders[0].price + 'C per unit and a transaction fee of ' + cost + 'units');
                    }
                }
                else{
                    console.log('Transaction failed: highest price is ' + orders[0].price);
                }
            }
        }
    },

    partCalc: function(part){
      switch(part){
          case MOVE:
              return 50;
          case WORK:
              return 100;
          case CARRY:
              return 50;
          case ATTACK:
              return 80;
          case RANGED_ATTACK:
              return 150;
          case HEAL:
              return 250;
          case CLAIM:
              return 600;
          case TOUGH:
              return 10;
      }
    },

    smartSpawn: function(role, distribution, roomSpawn, fraction){
        var cost = 0;
        for(let i = 0; i < distribution.length; i++){
            cost = cost + this.partCalc(distribution[i]);
        };
        //return cost;
        var energyNow = roomSpawn.room.energyAvailable;
        var energyCap = roomSpawn.room.energyCapacityAvailable;
        var multiplier = energyNow/energyCap;
        var diff = fraction - 1;
        var final = (multiplier * diff) + 1;
        var numParts = Math.floor((energyNow/final) / cost );
        var result = [];
        for(let x = 0; x < distribution.length; x++){
            for(let y = 0; y < numParts; y++){
                result.push(distribution[x]);
            }
        };
        //return result;

        roomSpawn.createCreep(result,undefined,{role: role, working: false});
    }
};



