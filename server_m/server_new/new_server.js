
var gameObjects = [{
	"type": "CASTLE",
	"hp": 1000,
	"price": 1000,
	"moveTargets": false,
	"attackTargets": ["ORK", "HUNTER"],
	"damage": 20,
	"moveSpeed": 0,
	"attackSpeed": 1,
	"attackRadius": 4
}, {
	"type": "ORK",
	"hp": 100,
	"price": 100,
	"moveTargets": ["CASTLE", "HUNTER"],
	"attackTargets": ["CASTLE", "HUNTER"],
	"damage": 20,
	"moveSpeed": 1,
	"attackSpeed": 1,
	"attackRadius": 1
}];

function World(width, height, gameObjects){

	var me = this;

	var all_obj = [];
	var players = [];
	var timerId = null;
	var id = 0;

	me.gameObjects = gameObjects;
	me.worldWidth = width;
	me.worldHeight = height;

	me.getAll = function(){
		return all_obj
			.filter(function(obj){ return obj.hp != 'del' })
			.map(function(obj){ 
				return {
					id: obj.id,
					coord: obj.coord,
					playerId: obj.playerId,
					hp: obj.hp,
					attackTarget: obj.attackTarget
				} 
			});
	}

	me.getPlayers = function(){ return players }

	me.createPlayer = function(name, coordinate){ 
		var new_player = {
			type: "PLAYER",
			die: false,
			id: id++,
			name: name,
			coord:coordinate,
			tow:2,
			place:2,
			wall:3,
			gold:20
		}; 
		
		players.push(new_player);
		me.createObject('CASTLE', new_player.id, coordinate).buildCastle();
	};	

	function gameObject(id, type, playerId, coordinate, config){
		this.id=id;
		this.type=type; // тип объекта
		this.coord=coordinate; // координаты объекта
		this.playerId = playerId;

		this.hp=config.hp;
		this.moveTargets=config.moveTargets || [];
		this.attackTargets=config.attackTargets || [];
		this.damage=config.damage;
		this.moveSpeed=config.moveSpeed;
		this.attackSpeed=config.attackSpeed;
		this.attackRadius = config.attackRadius;
		this.attackTarget = false;

		this.attackCoolDown = (1000/this.attackSpeed).toFixed(0);
		this.moveCoolDown = (1000/this.moveSpeed).toFixed(0);

		this.move = function(all_obj){
			this.moveCoolDown -= 100;
			if(!this.moveCoolDown){
				this.moveCoolDown = (1000/this.moveSpeed).toFixed(0);

				var targets = this.getMoveTargets(all_obj);
				if(new_targets.length){
					targets = targets.map(function(t){ 
						return { coord: t.coord, path: ux.findPathToCoordinate(this.coord, t.coord)} 
					});
					targets.sort(function(a,b){ return a.path.length > b.path.length });
					
					this.coord = targets[0].path.[1];
					remove targets;
				}
			}
		}

		this.getMoveTargets = function(all_obj){
			var targets = [];
			for(var i =0; i<all_obj.length; i++)
				if(~this.moveTargets.indexOf(all_obj[i].type))
					targets.push({ coord: all_obj[i].coordinate });
			return targets;	
		}

		this.attack = function(){

		}

		this.getAttackTarget = function(){
			
		}
	}

	function findConfigInGameObjects(type){
		for(var i=0; i<me.gameObjects.length; i++)
			if(me.gameObjects[i].type==type)
				return me.gameObjects[i];
		return false;
	}

	me.createObject = function(type, playerId, coordinate){ 
		var config = findConfigInGameObjects(type);
		if(config){
			var new_obj = all_obj.push(new gameObject(++id, type, playerId, coordinate, config));
			return new_obj;
		}
		return false;
	};

	function worldInterval(){
		all_obj.forEach(function(game_Object){
			game_Object.move(all_obj);
			game_Object.attack(all_obj);
		});
	}

	me.startWorld = function(){
		timerId = setInterval( worldInterval.bind(me), 100 );
	}

	me.pauseWorld = function(){
		clearInterval(timerId);
	}
}


