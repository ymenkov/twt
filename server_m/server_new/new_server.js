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
	"hp": 1000,
	"price": 100,
	"moveTargets": ["CASTLE", "HUNTER"],
	"attackTargets": ["CASTLE", "HUNTER"],
	"damage": 100,
	"moveSpeed": 1,
	"attackSpeed": 1,
	"attackRadius": 2
}];

function World(width, height, gameObjects){

	var me = this;

	var all_obj = [];
	var players = [];
	var playerId = 0;
	var timerId = null;
	var id = 0;

	me.gameObjects = gameObjects;
	me.gameMap = new GameMap(width, height);

	me.getAll = function(){
		return all_obj.filter(function(obj){ return obj.hp != 'del' }).map(function(obj){ 
				return {
					type: obj.type,
					id: obj.id,
					coord: obj.coord,
					player_id: obj.playerId,
					hp: obj.hp,
					attackTarget: obj.attackTarget,
					moveAnimation: obj.moveAnimation
				} 
			});
	}

	me.getPlayers = function(){ return players }

	me.createPlayer = function(name, coordinate){ 
		var new_player = {
			type: "PLAYER",
			die: false,
			id: playerId++,
			name: name,
			coord:coordinate,
			tow:2,
			place:2,
			wall:3,
			gold:20
		}; 
		
		players.push(new_player);
		me.createObject('CASTLE', new_player.id, coordinate);
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
			var gameObj = this;
			this.moveCoolDown -= 100;
			if(!this.moveCoolDown){
				this.moveCoolDown = (1000/this.moveSpeed).toFixed(0);

				var targets = this.getMoveTargets(all_obj);
				if(targets.length){
					targets = targets.map(function(t){ 
						return { coord: t.coord, path: me.gameMap.findPathToCoordinate(gameObj.coord, t.coord)} 
					});
					targets.sort(function(a,b){ return a.path.length > b.path.length });
					
					this.moveAnimation = [ this.coord, targets[0].path[1] ];
					this.coord = targets[0].path[1] || targets[0].path[0];
					delete targets;
				}
			}
		}

		this.getMoveTargets = function(all_obj){
			var targets = [];
			for(var i =0; i<all_obj.length; i++)
				if(~this.moveTargets.indexOf(all_obj[i].type) && this.playerId != all_obj[i].playerId)
					targets.push({ coord: all_obj[i].coord, hp: all_obj[i].hp });
			return targets.filter(function(target){
				return target.hp!="del";
			});	
		}

		this.attack = function(all_obj){
			var gameObj = this;
				this.attackCoolDown -= 100;
			if(!this.attackCoolDown){
				this.attackCoolDown = (1000/this.attackSpeed).toFixed(0);
				var attackTargets=gameObj.getAttackTarget(all_obj,gameObj.attackTargets,gameObj.attackRadius,1,gameObj.coord);
			
				attackTargets.forEach(function(target){
					target.hp-=gameObj.damage;
					if (target.hp<=0){target.hp="del";}
				});
				delete attackTargets;

			}


		}

		this.getAttackTarget = function(all_obj,attackTypes,radius,targetNumb,coord){
			targets = all_obj.filter(function(target){
				return ~attackTypes.indexOf(target.type);
			})

			targets = targets.filter(function(target){
				if (((Math.abs(target.coord[0]-coord[0]))<radius)&&((Math.abs(target.coord[1]-coord[1]))<radius)){
					return true;
				}
				return false;
			})

			targets = targets.filter(function(target){
				return target.hp!="del";
			})

			return targets.slice(0,targetNumb); 
		}
	}

	me.buyObject = function(type, playerId, coordinate){ 
		var config = findObjectInArray(gameObjects, 'type', type);
		var player = findObjectInArray(players, 'id', playerId);
		if( config && player && gameMap.checkPointToFree(coordinate) ){
			if(player.gold >= config.price){
				player.gold -= config.price;
				me.createObject(type, playerId, coordinate, config);
			}
		}
	};

	me.createObject = function(type, playerId, coordinate, conf){ 
		var config = conf || findObjectInArray(gameObjects, 'type', type);
		if(config){
			var new_obj = all_obj.push(new gameObject(++id, type, playerId, coordinate, config));
			return new_obj;
		}
		return false;
	};

	function worldInterval(){
		all_obj.forEach(function(game_Object){
			if(game_Object.hp!='del'){
				game_Object.move.call(game_Object, all_obj);
				game_Object.attack.call(game_Object, all_obj);
			}
		});
	}

	me.startWorld = function(){
		timerId = setInterval( worldInterval.bind(me), 100 );
	}

	me.pauseWorld = function(){
		clearInterval(timerId);
	}

	/////////////////////////
	// other functions

	function findObjectInArray(array, param, value){
		for(var i=0; i<array.length; i++)
			if(array[i][param]==value)
				return array[i];
		return false;
	}
}



