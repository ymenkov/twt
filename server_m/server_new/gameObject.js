function GameObject(id, type, playerId, coordinate, config){
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
					return { coord: t.coord, path: gameMap.findPathToCoordinate(this.coord, t.coord)} 
				});
				targets.sort(function(a,b){ return a.path.length > b.path.length });
				
				this.moveAnimation = [this.coord, targets[0].path.[1]];
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