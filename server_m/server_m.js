function WORLD(){
var throne=[];
throne[0]=[5,0];
throne[1]=[5,15];
var fieldSize = {heigth:10,width:15};
var all = [];
var id = -1;
var hpBase=10;
var gold=20;


this.start = function(){
//Старт таймера	
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
	this.taget=target;
	this.damage=damage;
	this.coolDown=coolDown;
	this.hp=hp;
	this.flagCD=coolDown;
	
  	this.die = function(){
		if (this.hp<1){
			gold=gold+1;
		}

		if ((coord[0]==target[0]) && (coord[1]==target[1])){
			hpBase=hpBase-1;
		}
		this.id=-1;
  	}
    this.move(){
    	if (flagCD==coolDown){
			var grid = new PF.Grid(fieldSize.heigth+1, fieldSize.width+1); 
			var finder = new PF.AStarFinder();

			for (k=0;k<=arrAll.length-1;k++){
					if (arrWall[k].type=="PLACE"){
  						grid.setWalkableAt(arrAll[k].coord[0], arrAll[k].coord[1], false);
  					}
   			}

			var path = finder.findPath(target[0]+1, target[1]+1, coord[0], coord[1], grid);
			var i=0;
			path.forEach(function(c){
				i++;
			});
			coord[0]=path[i-2][0];
			coord[1]=path[i-2][1];
			if (((coord[0]==target[0]) && (coord[1]==target[1])) || (this.hp<1))
			this.die.call(this);
			flagCd=0;
		} else {flagCd++;}
	}
}


function createOrk(){
	id=id+1;
	all.push(new Ork(id,"ORK",throne[1],throne[0],false,3,5));
	//Добавить орка в общий массив (id,координаты объекта, координаты цели, урон, кулдаун, hp)
}

function Place(id,type,coord,target,damage,coolDown,hp){
	this.id=id;
	this.type=type;
	this.coord=coord;
	this.taget=false;
	this.damage=false;
	this.coolDown=false;
	this.hp=false;
}

function createPlace(){
	for (var i=0;i<=fieldSize.heigth;i++){
		for (var j=0;j<=fieldSize.width;j++){
			if (((i+j)<=9)&&((i+j)>=1)&&(i>j)) {
				id=id+1;
				arrAll.push(new Place(id,"PLACE",[i,j],false,false,false,false));
			}
		}
	}
}	
