function WORLD(){
	var throne=[];
	throne[0]=[5,0];
	throne[1]=[5,15];
	var fieldSize = {heigth:10,width:15};
	var all = [];
	var id = 0;
	var hpBase=10;
	var gold=20;

	this.getAll = function(){
		return all;
	}

	this.start = function(){
	//Старт таймера	
	createOrk();
	}

	this.addTower = function(){
	//добавить башню
	}

	this.addPlace = function(){
	//добавить место под башню
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
							if (all[k].type=="WALL"){
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

					if (((this.coord[0]==this.target[0]) && (this.coord[1]==this.target[1])) || (this.hp<1)){
						this.die.call(this);
					}
					this.flagCd=0;
					} else {this.flagCd++;}
				}
		}
	}


	function createOrk(){
		id=id+1;
		var newOrk = new Ork(id,"ORK",throne[1],throne[0],false,3,5);
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

	function createWall(i,j){
		id=id+1;
		all.push(new placeWall(id,"WALL",[i,j],false,false,false,false));
	}
}
