

function World(){

	var me = this;

	var all_obj = [];
	var players = [];
	var timerId = null;
	var id = 0;

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

	me.createWorld = function(width, height){ };
	me.createPlayer = function(name, coordinate){ };

	function gameObject(id, type, playerId, coordinate, config){
		this.id=id;
		this.type=type; // тип объекта
		this.coord=coordinate; // координаты объекта
		this.playerId = playerId;

		this.hp=config.hp;
		this.moveTargets=config.moveTargets;
		this.attackTargets=config.attackTargets;
		this.damage=config.damage;
		this.speedMove=config.speedMove;
		this.speedDamage=config.speedDamage;
		this.radiusAttack = config.radiusAttack;

		this.attackTarget = false;

		this.move = function(){

		}

		this.attack = function(){

		}

		this.getMoveTarget = function(){

		}

		this.getAttackTarget = function(){
			
		}
	}

	me.createObject = function(type, playerId, coordinate){ 
		var config = findConfigInJson(type);
		all_obj.push(new gameObject(++id, type, playerId, coordinate, config));
	};

	function worldInterval(){
		all_obj.forEach(function(game_Object){
			game_Object.move(game_Object.getMoveTarget(all_obj));
			game_Object.attack(game_Object.getAttackTarget(all_obj));
		});
	}

	me.startWorld = function(){
		timerId = setInterval( me.worldInterval.bind(me), 100 );
	}
}


var w = new World();

w.createWorld(30,30);
w.createPlayer('name', [0,0]);
w.createObject('type', 1, [1,1]);