function WORLD(){
	var throne=[];
	throne[0]={i:5,j:15};
	throne[1]={i:5,j:15};
	var fieldSize = {heigth:10,width:15};
	var all = [];
	var id = 0;
	var jsonType;

	var players = [];

	this.createPlayer = function(name, coordinate){
		var new_player = {
			type: "PLAYER",
			id: id++,
			name: name,
			coord:coordinate,
			tow:2,
			place:2,
			wall:3,
			gold:20
		}; 
		players.push(new_player);

		//all.push(new Castle(id,"CASTLE",coordinate,new_player.id,10,2,2,5,20,name));
		//function OBJECT(id,type,coord,target,damage,coolDown,hp,player_id,enemy,info){
		all.push(new OBJECT(id,"CASTLE",coordinate,false,false,false,10,new_player.id,false,new_player));
		all[all.length-1].buildCastle();
		this.start(new_player.id);


	}
	

	this.getAll = function(){
		return all.filter(function(obj){
			return obj.hp!="del";
		});
	}

	this.start = function(player_id){
	//Старт таймера	
	//setInterval(function(){all.push(new information)}.bind(this),100);
	var jsonType = JSON.parse(data);
		console.log(jsonType[0].name)
	setInterval(function(){createOrk(player_id);}.bind(this),5000);
	}
	

	function OBJECT(id,type,coord,target,damage,coolDown,hp,player_id,enemy,info,radiusAttack){
		this.id=id;
		this.type=type;
		this.coord=coord;
		this.target=target;
		this.damage=damage;
		this.coolDown=coolDown;
		this.hp=hp;
		this.player_id=player_id;
		this.enemy=enemy;
		this.attackTarget; // указывается внутри функций
		this.info=info;
		this.radiusAttack=radiusAttack;
		var flagCD=coolDown;
		
	  	this.die = function(){
	  		var k = searchCastle(this.enemy);
	  		
			if (this.hp<1){
				all[k].info.gold=all[k].info.gold+1;
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
		   			
		   			var seo = searchEnemy(this.coord,this.player_id,"ORK");
		   			
		   			target1 = seo.coord;
		   			//alert(target1)
					var path = finder.findPath(target1[0], target1[1], this.coord[0], this.coord[1], grid);
					var i=0;
					path.forEach(function(c){
						i++;
					});
					if (i>this.radiusAttack+1){
						this.coord[0]=path[i-2][0];
						this.coord[1]=path[i-2][1];
					}
					flagCD=0;

					if ((((Math.abs(this.coord[0]-target1[0]))<this.radiusAttack) && ((Math.abs(this.coord[1]-target1[1]))<this.radiusAttack)) || (this.hp<1)){
						this.attackTarget=seo.id;
						seo.hp=seo.hp-this.damage;
						//alert((Math.abs(this.coord[0]-target1[0])))
						//this.die.call(this);
					}
					
					} else {flagCD++;}
				}

		}

		this.shot = function(){

			for (var i=0;i<=all.length-1;i++){
	         	if 	((all[i].type=="ORK")&&(all[i].hp!="del")&&((Math.abs(all[i].coord[0]-this.coord[0]))<3)&&((Math.abs(all[i].coord[1]-this.coord[1]))<3)&&(all[i].player_id!=this.player_id))
	         	{
	         	//	alert(all[i].id)
	         		this.attackTarget=all[i].id;
	         		all[i].hp=all[i].hp-this.damage;
	         		break;
	         	}
	        }

		}

		this.buildCastle=function(){

			for (var i=0;i<=10;i++){
				for(var j=0;j<=15;j++){
					if ((Math.abs((i-this.coord[0]))<3)&&(Math.abs((j-this.coord[1])))<3){
						if ((i==this.coord[0])&&(j==this.coord[1])){}else{
							id=id+1;
							all.push(new placeWall(id,"PLACE",[i,j],player_id));
						}
							
					}
				}
			}	
		}.bind(this);
	}

	function searchEnemy(coord,player_id,type){
		var k=0;
		var m = coord[0]+coord[1];
		var ch=1000;
		for (var i=0;i<=all.length-1;i++){
			if ((all[i].player_id!=player_id) &&(all[i].type==type)&&(all[i].hp!="del")){
				if (Math.abs(m-(all[i].coord[0]+all[i].coord[1]))<ch){
					ch=Math.abs(m-(all[i].coord[0]+all[i].coord[1]));
					k=i;
				}
			}
		}
		//	alert(all[k].coord);
		return all[k];
	}

	this.createHunter=function(player_id,coord){
		id=id+1;
		var newHunter = new OBJECT(id,"HUNTER",coord,false,1,3,5,player_id,false,false,3);
		all.push(newHunter);
		setInterval(newHunter.hunterAttack.bind(newHunter),100);
	}


	function createOrk(player_id){
		id=id+1;
		var spc=all[searchCastle(player_id)].coord;
		var enemy=searchEnemy(spc,player_id,"CASTLE");
		var target = enemy.coord;
		var coord = [spc[0],spc[1]];
		var newOrk = new OBJECT(id,"ORK",coord,target,false,6,5,player_id,enemy.player_id,false,false);
		all.push(newOrk);
		setInterval(newOrk.move.bind(newOrk),100);
	}

	this.createTower = function (i,j,player_id){
		
		var k = all[searchCastle(player_id)];

		if (((k.info.gold>9) || (k.info.tow>0))&&(searchPlace(i,j,player_id))){

		if (k.info.tow>0){k.info.tow=k.info.tow-1}else{k.info.gold=k.info.gold-10;}
		id=id+1;
		var newTower = new OBJECT(id,"TOWER",[i,j],false,1,6,10,player_id,false,false,false);
		
		//var newOrk = new OBJECT(id,"ORK",coord,target,false,6,5,player_id,enemy.id,false);
		//alert(newTower)
		all.push(newTower);

		id=id+1;
		all.push(new placeWall(id,"NOT",[i,j],player_id));
		setInterval(newTower.shot.bind(newTower),1000);
		}
	}

	function placeWall(id,type,coord,player_id){
		this.id=id;
		this.type=type;
		this.coord=coord;
		this.player_id=player_id;
	}


	this.createWall = function (i,j,player_id){
		var k = all[searchCastle(player_id)];
		if (k.info.wall>0){
		id=id+1;
		k.info.wall=k.info.wall-1;
		all.push(new placeWall(id,"WALL",[i,j],player_id));
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

	this.addPlace=function(i,j,player_id){
		var k = all[searchCastle(player_id)];
		if (((j>0)&&(searchPlace(i,j-1,player_id)))||((i>0)&&(searchPlace(i-1,j,player_id)))||((j<15)&&(searchPlace(i,j+1,player_id)))||((i<10)&&(searchPlace(i+1,j,player_id)))){
			if (((k.info.gold>9) || (k.info.place>0))){
				if (k.info.place>0){k.info.place=k.info.place-1}else{k.info.gold=k.info.gold-10;}
				id=id+1;
				all.push(new placeWall(id,"PLACE",[i,j],player_id));
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
