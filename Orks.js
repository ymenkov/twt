function checkToFree(coord){
	var i = coord[0];
	var j = coord[1];
 for (k=0;k<=arrWall.length-1;k++){
   if ((arrWall[k].i==i)&&(arrWall[k].j==j)){
   	return false;
   }
 }
 return true;
}


function checkToFreeArray(){
	for(var i = 0; i< arguments.length; i++){
		if( !checkToFree(arguments[i][0], arguments[i][1]) )
			return false;
	}
	return true;
}

function searchPlace(i,j){
 for (k=0;k<=arrPlace.length-1;k++){
   if ((arrPlace[k].i==i)&&(arrPlace[k].j==j)){
   	return true;
   }
 }
 return false;
}

function searchW(i,j){
 for (k=0;k<=arrWay.length-1;k++){
   if ((arrWay[k][0]==i)&&(arrWay[k][1]==j)){
   	return false;
   }
 }
 return true;
}
var arrWay = [];
var hpStart=10;
var viz  =0;
var stopRek=0;
function searchWay(coord, target_coord, parent_obj){
		//var arrPut = arguments[2] || [];
		var x = arguments[0][0];
		var y = arguments[0][1];
		elem1=this.elem;
   	 	var up =[x-1,y];
   	 	var down =[x+1,y];
   	 	var left =[x,y-1];
   	 	var right =[x,y+1];
   	 	var target = arguments[1];
		
   	 	if (((x==target[0])&&(y==target[1])) && !stopRek){
				stopRek=1;
				while(parent_obj.parent_obj.parent_obj.parent_obj){
					//console.dir(parent_obj.coord);
					masM[parent_obj.coord[0]][parent_obj.coord[1]].style.backgroundColor="blue";
					parent_obj = parent_obj.parent_obj;
				}
				return parent_obj;
			//alert(parent_obj.coord);

   		}
		
   	 		else {

	 			if(stopRek)return;

   	 			if (searchW(x,y)){
		   	 		arrWay.push([x,y]);  //Прйденные клетки (все)
		   	 		var objParent = {coord:coord, parent_obj: parent_obj};
		   	 		if ((x>0)&&checkToFree(up)){ //если х > 0, то можно чекать сверху, есть ли там стенка
		   	 			var rez = searchWay(up,target,objParent); 
		   	 			if(rez) return rez;
		   	 		}
		   	 		if (((x<10)&&checkToFree(down))){
		   	 			var rez = searchWay(down,target,objParent);
		   	 			if(rez) return rez;
		   	 		
		   	 		}
		   	 		if (((y>0)&&checkToFree(left))){
		   	 			
		   	 			var rez = searchWay(left,target,objParent); 
		   	 			if(rez) return rez;
		   	 		}
		   	 		if (((y<15)&&checkToFree(right))){
		   	 			
		   	 			var rez = searchWay(right,target,objParent); 
		   	 			if(rez) return rez;
		   	 		}
		   	 	}
   	 		}	 

   	 		return false;

}



function Ork(x,y,elem,id){
	this.id=id;
  	this.j = y;
  	this.i= x;
  	this.elem=elem;
  	this.canGoLeft=1;
  	this.canGoUp=1;
  	this.hp=hpStart;

  	this.die = function(){
		if (this.hp<1){
			gold=gold+1;
			t = document.getElementById("Gold"); 
			t.innerHTML = "Gold : "+gold;
		}

		if ((this.i==throne[0].i) && (this.j==throne[0].j)){
			hpB=hpB-1;
			t = document.getElementById("hp"); 
			t.innerHTML = "Здоровье базы : "+hpB;
		}

		document.getElementById('pic').removeChild(this.elem);
	//	searchDelInterval(this.elem);
		this.elem=null;
  	}

  	this.render = function(){
  		this.elem.style.visibility="visible";
   		this.elem.style.left = (this.j*hw + marg*this.j) + 'px';
   		this.elem.style.top = (this.i*hw + marg*this.i) + 'px';
  	}

	this.move = function(){	

		if(this.elem!=null){

	   	 	//var x =	this.i++;
	   	 	//var y =	this.j++;	

		///////////////////////////////////////////////
			//var grid = new PF.Grid(16, 11);
		

			var grid = new PF.Grid(11, 16); 
			var finder = new PF.AStarFinder();
			//console.dir(grid);
			for (k=0;k<=arrWall.length-1;k++){
  				grid.setWalkableAt(arrWall[k].i, arrWall[k].j, false);
   			}
			var path = finder.findPath(throne[0].i, throne[0].j, this.i, this.j, grid);
			//console.dir( path );
			var i=0;
			path.forEach(function(c){
			//	masM[c[0]][c[1]].style.backgroundColor="blue";
				i++;
			});
			//alert(path[i-2]);
			this.i=path[i-2][0];
			this.j=path[i-2][1];

		///////////////////////////////////////////////
			  			if (((this.i==throne[0].i) && (this.j==throne[0].j)) || (this.hp<1))
				this.die.call(this);
	   		else 
   				this.render.call(this);
	   	

		}
	}
}