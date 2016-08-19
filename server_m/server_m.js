function WORLD(){
	var throne=[];
	throne[0]={i:5,j:15};
	throne[1]={i:5,j:15};
	var fieldSize = {heigth:10,width:15};
	var all = [];
	var id = 0;
	var hpBase=10;
	var gold=20;
	var wall=10;
	var place=2;
	var tow=2;

	var players = [];



	this.createPlayer = function(name, coordinate){
		var new_player = {
			type: "PLAYER",
			id: id++,
			name: name,
			coord:coordinate,
		}; 
		players.push(new_player);

		//this.createCastle(new_player.id, coordinate);
		//var newCastle = new Castle(id,"CASTLE",coordinate,new_player.id,10);
		//all.push(newCastle);
		//		alert(new_player.id);
		
		//all.push(new_player);
		all.push(new Castle(id,"CASTLE",coordinate,new_player.id,10,2,2,5,20,name));
		all[all.length-1].buildCastle();
		this.start(new_player.id);


	}

	function Castle(id,type,coord,player_id,hp,tow,place,wall,gold){
		this.id=id;
		this.type=type;
		this.coord=coord;
		this.player_id=player_id;
		this.hp=hp;
		this.tow=tow;
		this.place=place;
		this.wall=wall;
		this.gold=gold;
		this.name=name;
		this.buildCastle=function(){

			for (var i=0;i<=10;i++){
				for(var j=0;j<=15;j++){
					if ((Math.abs((i-this.coord[0]))<3)&&(Math.abs((j-this.coord[1])))<3){
						if ((i==this.coord[0])&&(j==this.coord[1])){}else{
							id=id+1;
							all.push(new placeWall(id,"PLACE",[i,j],false,false,false,false,player_id));
						}
							
					}
				}
			}	
			}.bind(this);
		}
	

	this.getAll = function(){
		return all.filter(function(obj){
			return obj.hp!="del";
		});
	}

	this.start = function(player_id){
	//Старт таймера	
	//setInterval(function(){all.push(new information)}.bind(this),100);
	setInterval(function(){createOrk(player_id);}.bind(this),5000);
	}
	
	function information(){
		this.type="INFO";
		this.gold=gold;
		this.hpBase=hpBase;
		this.wall=wall;
		this.tow=tow;
		this.place=place;
	}


	function OBJECT(id,type,coord,target,damage,coolDown,hp,player_id,enemy){
		this.id=id;
		this.type=type;
		this.coord=coord;
		this.target=target;
		this.damage=damage;
		this.coolDown=coolDown;
		this.hp=hp;
		this.player_id=player_id;
		this.enemy=enemy;
		this.attackTarget;
		var flagCD=coolDown;
		
	  	this.die = function(){
	  		var k = searchCastle(this.enemy);
	  		
			if (this.hp<1){
				all[k].gold=all[k].gold+1;
			}

			if ((this.coord[0]==this.target[0]) && (this.coord[1]==this.target[1])){
				all[k].hp=all[k].hp-1;
			}
		this.hp="del";
	  	}
	    this.move = function (){
		    if(this.hp!="del"){	
		    	if (flagCD==this.coolDown){
					var grid = new PF.Grid(fieldSize.heigth+1, fieldSize.width+1); 
					var finder = new PF.AStarFinder();

					for (k=0;k<=all.length-1;k++){
							if ((all[k].type=="WALL") || ((all[k].type=="NOT"))){
		  						grid.setWalkableAt(all[k].coord[0], all[k].coord[1], false);
		  					}
		   			}
		   			
		   			
					var path = finder.findPath(this.target[0], this.target[1], this.coord[0], this.coord[1], grid);
					var i=0;
					path.forEach(function(c){
						i++;
					});
					this.coord[0]=path[i-2][0];
					this.coord[1]=path[i-2][1];
					flagCD=0;
					if (((this.coord[0]==this.target[0]) && (this.coord[1]==this.target[1])) || (this.hp<1)){
						//alert(123);
						this.die.call(this);
					}
					
					} else {flagCD++;}
				}
		}

		this.hunterAttack = function (){
			if(this.hp!="del"){	
		    	if (flagCD==this.coolDown){
					var grid = new PF.Grid(fieldSize.heigth+1, fieldSize.width+1); 
					var finder = new PF.AStarFinder();

					for (k=0;k<=all.length-1;k++){
							if ((all[k].type=="WALL") || ((all[k].type=="NOT"))){
		  						grid.setWalkableAt(all[k].coord[0], all[k].coord[1], false);
		  					}
		   			}
		   			alert(this.target);
		   			//this.target = searchEnemyOrk(this.coord,this.player_id);
		   				
					var path = finder.findPath(this.target[0], this.target[1], this.coord[0], this.coord[1], grid);
					var i=0;
					path.forEach(function(c){
						i++;
					});
					this.coord[0]=path[i-2][0];
					this.coord[1]=path[i-2][1];
					flagCD=0;
					if (((this.coord[0]==this.target[0]) && (this.coord[1]==this.target[1])) || (this.hp<1)){
						//alert(123);
						this.die.call(this);
					}
					
					} else {flagCD++;}
				}

		}

		this.shot = function(){

			for (var i=0;i<=all.length-1;i++){
	         	if 	((all[i].type=="ORK")&&(all[i].hp!="del")&&((Math.abs(all[i].coord[0]-this.coord[0]))<3)&&((Math.abs(all[i].coord[1]-this.coord[1]))<3)&&(all[i].player_id!=this.player_id))
	         	{
	         		alert(all[i].id)
	         		this.attackTarget=all[i].id;
	         		all[i].hp=all[i].hp-this.damage;
	         		break;
	         	}
	        }

		}
	}

	function searchEnemyOrk(coord,player_id){
		var m = coord[0]+coord[1];
		var ch=1000;
		for (var i=0;i<=all.length-1;i++){
			if ((all[i].id!=player_id) &&(all[i].type=="ORK")){
				if (Math.abs(m-(all[i].coord[0]+all[i].coord[1]))<ch){
					ch=Math.abs(m-(all[i].coord[0]+all[i].coord[1]));
					k=i;
				}
			}
		}
		return all[k].coord;
	}

	function searchPlayerCoord(player_id){
		for (var i=0;i<=players.length-1;i++){
			if (players[i].id==player_id){
				return players[i].coord;
			}
		}
	}

	function searchEnemyCastle(player_id){
		var k=searchPlayerCoord(player_id);
		var m = k[0]+k[1];
		var ch=1000;
		for (var i=0;i<=players.length-1;i++){
			if (players[i].id!=player_id){
				if (Math.abs(m-(players[i].coord[0]+players[i].coord[1]))<ch){
					ch=Math.abs(m-(players[i].coord[0]+players[i].coord[1]));
					k=i;
				}
			}
		}
		return players[k];
	}

	function createHunter(){
		id=id+1;
		var newHunter = new OBJECT(id,"HUNTER",coord,false,false,10,5,player_id,false);
		all.push(newHunter);
		setInterval(newHunter.hunterAttack.bind(newHunter),100);
	}


	function createOrk(player_id){
		id=id+1;
		var spc=searchPlayerCoord(player_id);
		var enemy=searchEnemyCastle(player_id);
		var target = enemy.coord;
		var coord = [spc[0],spc[1]];
		var newOrk = new OBJECT(id,"ORK",coord,target,false,6,5,player_id,enemy.id,false);
		all.push(newOrk);
		setInterval(newOrk.move.bind(newOrk),100);
	//	createHunter(player_id,spc);

		
		
		//Добавить орка в общий массив (id,координаты объекта, координаты цели, урон, кулдаун, hp)
	}

	function placeWall(id,type,coord,target,damage,coolDown,hp,player_id){
		this.id=id;
		this.type=type;
		this.coord=coord;
		this.target=false;
		this.damage=false;
		this.coolDown=false;
		this.hp=false;
		this.player_id=player_id;
	}

	this.createPlace = function (){
		for (var i=0;i<=fieldSize.heigth;i++){
			for (var j=0;j<=fieldSize.width;j++){
				if (((i+j)<=9)&&((i+j)>=1)&&(i>j)) {
					id=id+1;
					all.push(new placeWall(id,"PLACE",[i,j],false,false,false,false));
				}
			}
		}
	}	

	this.createWall = function (i,j,player_id){
		var k = all[searchCastle(player_id)];
		if (k.wall>0){
		id=id+1;
		k.wall=k.wall-1;
		all.push(new placeWall(id,"WALL",[i,j],false,false,false,false,player_id));
		}
	}

	function searchPlace(i,j,player_id){
		for (var k=0;k<=all.length-1;k++){
			if ((all[k].type=="PLACE") && (all[k].coord[0]==i)&&(all[k].coord[1]==j)&&(player_id==all[k].player_id)){
				return true;
			}
		}
		return false;
	}

	this.createTower = function (i,j,player_id){
		var k = all[searchCastle(player_id)];
		if (((k.gold>9) || (k.tow>0))&&(searchPlace(i,j,player_id))){
		if (k.tow>0){k.tow=k.tow-1}else{k.gold=k.gold-10;}
		id=id+1;
		var newTower = new OBJECT(id,"TOWER",[i,j],false,1,6,10,player_id,false,false);
		//var newTower = new Tower(id,"TOWER",[i,j],false,1,2,10,player_id,false);
		console.log(newTower)
		all.push(newTower);
		all.push(new placeWall(id,"NOT",[i,j],false,false,false,false));
		setInterval(newTower.shot.bind(newTower),1000);
		}
	}

	this.addPlace=function(i,j,player_id){
		var k = all[searchCastle(player_id)];
		if (((j>0)&&(searchPlace(i,j-1,player_id)))||((i>0)&&(searchPlace(i-1,j,player_id)))||((j<15)&&(searchPlace(i,j+1,player_id)))||((i<10)&&(searchPlace(i+1,j,player_id)))){
			if (((k.gold>9) || (k.place>0))){
				if (k.place>0){k.place=k.place-1}else{k.gold=k.gold-10;}
				id=id+1;
				all.push(new placeWall(id,"PLACE",[i,j],false,false,false,false,player_id));
			}
		}
	}

	function searchCastle(player_id){
		for (var k=0;k<=all.length-1;k++){
			if ((all[k].player_id==player_id)&&(all[k].type=="CASTLE")){
				return k;
			}
		}
	}
	
}
