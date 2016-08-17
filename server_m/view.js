
var throne=[];
throne[0]={i:5,j:0};
throne[1]={i:5,j:15};
var hw=50;
var marg=10;
var w = new WORLD();
w.createPlace();
arrAll = w.getAll();
var v = new VIEW();
v.render();
var arrAll = [];


function searchPlace(i,j){
	for (var k=0;k<=arrAll.length-1;k++){
		if ((arrAll[k].type=="PLACE") && (arrAll[k].coord[0]==i)&&(arrAll[k].coord[1]==j)){
			return true;
		}
	}
	return false;
}




function VIEW(){
	var allObject = [];
	this.render = function(){
		document.getElementById('test').innerHTML = "";
		for (var i=0;i<=10;i++){
			for (var j=0;j<=15;j++){
				var elem=document.createElement('div');
				elem.style.backgroundColor = "white";
				if (searchPlace(i,j)) {
					elem.style.backgroundColor = "rgb(128, 128, 128)";
				}
				if (((throne[0].i==i) && (throne[0].j==j)) || ((throne[1].i==i) && (throne[1].j==j))){
						elem.style.backgroundColor = "black";
				}
				elem.style.left = (j*hw + marg*j) + 'px';
				elem.style.top = (i*hw + marg*i) + 'px';
				elem.style.border = 'outset';
				document.getElementById('test').appendChild(elem);
			}
		}
	}

	this.searchRepeat = function (id){
		for (var m=0;m<=allObject.length-1;m++){
			for (var k=0;k<=arrAll.length-1;k++){
				if (arrAll[k].id==allObject[m].id){
					return m;
				}
			}
		}
		return null;
	}


	function infObj(id,type,coord,target,damage,hp,elem){
		this.id=id;
		this.type=type;
		this.coord=coord;
		this.taget=target;
		this.damage=damage;
		//this.coolDown=coolDown;
		this.hp=hp;
		this.elem=elem;
	}

	this.objectInMap = function (){
		arrAll = w.getAll();
		for (var k=0;k<=arrAll.length-1;k++){
			if ((arrAll[k].type=="ORK")&&(arrAll[k].id!=0)){
				//alert(this.searchRepeat(arrAll[k].id)[1]);
				var ch = this.searchRepeat(arrAll[k].id);
				x=arrAll[k].coord[0];
				y=arrAll[k].coord[1];
				if(ch===null){
					var elem=document.createElement('img');
				 	elem.src='photo.jpg';
				 	var elem1=document.createElement('div');
				 	elem1.style.transition="all 1s";
				 	document.getElementById('pic').appendChild(elem1).appendChild(elem);
				 	elem.style.visibility="visible";
			   		elem.style.left = (y*hw + marg*y) + 'px';
			   		elem.style.top = (x*hw + marg*x) + 'px';
			   		allObject.push(new infObj(arrAll[k].id,arrAll[k].type,arrAll[k].coord,arrAll[k].target,arrAll[k].damage,arrAll[k].hp,elem));
				} else {
					if (arrAll[k].id==0){
						document.getElementById('pic').removeChild(allObject[ch].elem);
					}
					allObject[ch].coord=arrAll[k].coord;
					allObject[ch].elem.style.left = (y*hw + marg*y) + 'px';
			   		allObject[ch].elem.style.top = (x*hw + marg*x) + 'px';
				}
			}
		}
			
	}

	setInterval(this.objectInMap.bind(this), 1000);


}