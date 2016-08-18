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
			id: id++,
			gold: 20,
			name: name,
			coord:coordinate
		}; 
		players.push(new_player);

		//this.createCastle(new_player.id, coordinate);
		//var newCastle = new Castle(id,"CASTLE",coordinate,new_player.id,10);
		//all.push(newCastle);
		all.push(new Castle(id,"CASTLE",coordinate,new_player.id,10));
		all[all.length-1].buildCastle();
		this.start(new_player.id);

	}

	function Castle(id,type,coord,player_id,hp){
		this.id=id;
		this.type=type;
		this.coord=coord;
		this.player_id=player_id;
		this.hp=hp;
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
			console.log(all)	
			}.bind(this);
		}
	

	this.getAll = function(){
		return all.filter(function(obj){
			return obj.hp!="del";
		});
	}

	this.start = function(player_id){
	//Старт таймера	
	setInterval(function(){all.push(new information)}.bind(this),100);
	setInterval(function(){createOrk(player_id);}.bind(this),2000);
	}
	
	function information(){
		this.type="INFO";
		this.gold=gold;
		this.hpBase=hpBase;
		this.wall=wall;
		this.tow=tow;
		this.place=place;
	}


	function Ork(id,type,coord,target,damage,coolDown,hp,player_id){
		this.id=id;
		this.type=type;
		this.coord=coord;
		this.target=target;
		this.damage=damage;
		this.coolDown=coolDown;
		this.hp=hp;
		this.player_id=player_id;
		var flagCD=coolDown;
		
	  	this.die = function(){
			if (this.hp<1){
				gold=gold+1;
			}

			if ((this.coord[0]==this.target[0]) && (this.coord[1]==this.target[1])){
				hpBase=hpBase-1;
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
	}

	function searchPlayerCoord(player_id){
		for (var i=0;i<=players.length-1;i++){
			if (players[i].id==player_id){
				return players[i].coord;
			}
		}
	}

	function searchEnemy(player_id){
		for (var i=0;i<=players.length-1;i++){
			if (players[i].id!=player_id){
				return players[i].coord;
			}
		}
	}


	function createOrk(player_id){
		id=id+1;
		var spc=searchPlayerCoord(player_id);
		var enemy=searchEnemy(player_id);
		var target = enemy;
		var coord = [spc[0],spc[1]];
		var newOrk = new Ork(id,"ORK",coord,target,false,6,5,player_id);
		console.log(newOrk);
		all.push(newOrk);
		setInterval(newOrk.move.bind(newOrk),100);
		
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

	function Tower (id,type,coord,attackTarget,damage,coolDown,hp,player_id){
		this.id=id;
		this.type=type;
		this.coord=coord;
		this.attackTarget=attackTarget;
		this.damage=damage;
		this.coolDown=coolDown;
		this.hp=hp;
		this.player_id=player_id;

		this.shot = function(){
			for (var i=0;i<=all.length-1;i++){
	         	if 	((all[i].type=="ORK")&&(all[i].hp!="del")&&((Math.abs(all[i].coord[0]-this.coord[0]))<3)&&((Math.abs(all[i].coord[1]-this.coord[1]))<3))
	         	{
	         		this.attackTarget=all[i].id;
	         		all[i].hp=all[i].hp-this.damage;
	         		break;
	         	}
	        }

		}
	}	

	this.createWall = function (i,j,player_id){
		if ((gold>9) && (wall>0)){
		id=id+1;
		wall=wall-1;
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
		if (((gold>9) || (tow>0))&&(searchPlace(i,j,player_id))){
		if (tow>0){tow=tow-1}else{gold=gold-10;}
		id=id+1;
		var newTower = new Tower(id,"TOWER",[i,j],false,1,2,10,player_id);
		all.push(newTower);
		all.push(new placeWall(id,"NOT",[i,j],false,false,false,false));
		setInterval(newTower.shot.bind(newTower),1000);
		}
	}

	this.addPlace=function(i,j,player_id){
		if (((j>0)&&(searchPlace(i,j-1,player_id)))||((i>0)&&(searchPlace(i-1,j,player_id)))||((j<15)&&(searchPlace(i,j+1,player_id)))||((i<10)&&(searchPlace(i+1,j,player_id)))){
			if (((gold>9) || (place>0))){
				if (place>0){place=place-1}else{gold=gold-10;}
				id=id+1;
				all.push(new placeWall(id,"PLACE",[i,j],false,false,false,false,player_id));
			}
		}
	}
	
}
