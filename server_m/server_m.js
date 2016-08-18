function WORLD(){
	var throne=[];
	throne[0]={i:5,j:0};
	throne[1]={i:5,j:15};
	var fieldSize = {heigth:10,width:15};
	var all = [];
	var id = 0;
	var hpBase=10;
	var gold=20;
	var wall=10;
	var place=2;
	var tow=2;


	this.getAll = function(){
		return all.filter(function(obj){
			return obj.hp!="del";
		});
	}

	this.start = function(){
	//Старт таймера	
	setInterval(function(){all[0]=new information;}.bind(this),100);

	createOrk();
	}

	this.addTower = function(){
	//добавить башню
	}

	
	function information(){
		this.type="INFO";
		this.gold=gold;
		this.hpBase=hpBase;
		this.wall=wall;
		this.tow=tow;
		this.place=place;
	}


	function Ork(id,type,coord,target,damage,coolDown,hp){
		this.id=id;
		this.type=type;
		this.coord=coord;
		this.target=target;
		this.damage=damage;
		this.coolDown=coolDown;
		this.hp=hp;
		this.flagCD=coolDown;
		
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
		    	if (this.flagCD==this.coolDown){
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
					this.flagCd=0;
					if (((this.coord[0]==this.target[0]) && (this.coord[1]==this.target[1])) || (this.hp<1)){
						this.die.call(this);
					}
					
					} else {this.flagCd++;alert(123)}
				}
		}
	}


	function createOrk(){
		id=id+1;
		var target = [throne[0].i,throne[0].j];
		var coord = [throne[1].i,throne[1].j];
		var newOrk = new Ork(id,"ORK",coord,target,false,50,5);
		console.log(newOrk);
		all.push(newOrk);
		setInterval(newOrk.move.bind(newOrk),600);
		
		//Добавить орка в общий массив (id,координаты объекта, координаты цели, урон, кулдаун, hp)
	}

	function placeWall(id,type,coord,target,damage,coolDown,hp){
		this.id=id;
		this.type=type;
		this.coord=coord;
		this.target=false;
		this.damage=false;
		this.coolDown=false;
		this.hp=false;
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

	function Tower (id,type,coord,attackTarget,damage,coolDown,hp){
		this.id=id;
		this.type=type;
		this.coord=coord;
		this.attackTarget=attackTarget;
		this.damage=damage;
		this.coolDown=coolDown;
		this.hp=hp;

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

	this.createWall = function (i,j){
		if ((gold>9) && (wall>0)){
		id=id+1;
		wall=wall-1;
		all.push(new placeWall(id,"WALL",[i,j],false,false,false,false));
		}
	}

	function searchPlace(i,j){
		for (var k=0;k<=all.length-1;k++){
			if ((all[k].type=="PLACE") && (all[k].coord[0]==i)&&(all[k].coord[1]==j)){
				return true;
			}
		}
		return false;
	}

	this.createTower = function (i,j){
		if (((gold>9) || (tow>0))&&(searchPlace(i,j))){
		if (tow>0){tow=tow-1}else{gold=gold-10;}
		id=id+1;
		var newTower = new Tower(id,"TOWER",[i,j],false,1,2,10);
		all.push(newTower);
		all.push(new placeWall(id,"NOT",[i,j],false,false,false,false));
		setInterval(newTower.shot.bind(newTower),1000);
		}
	}

	this.addPlace=function(i,j){
		if (((j>0)&&(searchPlace(i,j-1)))||((i>0)&&(searchPlace(i-1,j)))||((j<15)&&(searchPlace(i,j+1)))||((i<10)&&(searchPlace(i+1,j)))){
			if (((gold>9) || (place>0))){
				if (place>0){place=place-1}else{gold=gold-10;}
				id=id+1;
				//alert(1);
				all.push(new placeWall(id,"PLACE",[i,j],false,false,false,false));
			}
		}
	}
	
}
