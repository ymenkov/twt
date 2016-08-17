function WORLD(){
var throne=[];
throne[0]={i:5,j:0};
throne[1]={i:5,j:15};
var all = [];
var id = -1;
this.start = function(){
//Старт таймера	
}

this.addTower = function(){
//добавить башню
}

this.addPlace = function(){
//добавить место под башню
}

function createOrk(){
	//arrOrc.push(new Ork(throne[1].i,(throne[1].j-1),elem1,id));
	id=id+1;
	all.push(new Ork(id,throne[1].i,throne[1],throne[0].i,throne[0],2,3);
	//Добавить орка в общий массив (id,координаты спавна, координаты цели, урон, кулдаун)

}


}