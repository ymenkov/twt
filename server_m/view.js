
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

	// this.searchRepeat = function (id){
	// 	for (var m=0;m<=allObject.length-1;m++){
	// 		for (var k=0;k<=arrAll.length-1;k++){
	// 			if (arrAll[k].id==allObject[m].id){
	// 				return m;
	// 			}
	// 		}
	// 	}
	// 	return null;
	// }


	// function infObj(id,type,coord,target,damage,hp,elem){
	// 	this.id=id;
	// 	this.type=type;
	// 	this.coord=coord;
	// 	this.taget=target;
	// 	this.damage=damage;
	// 	//this.coolDown=coolDown;
	// 	this.hp=hp;
	// 	this.elem=elem;
	// }

	// this.objectInMap = function (){
	// 	arrAll = w.getAll();
	// 	for (var k=0;k<=arrAll.length-1;k++){
	// 		if ((arrAll[k].type=="ORK")){
	// 			//alert(this.searchRepeat(arrAll[k].id)[1]);
	// 			var ch = this.searchRepeat(arrAll[k].id);
	// 			x=arrAll[k].coord[0];
	// 			y=arrAll[k].coord[1];
	// 			if((ch===null)&&(arrAll[k].hp!="del")){
	// 				var elem=document.createElement('img');
	// 			 	elem.src='photo.jpg';
	// 			 	var elem1=document.createElement('div');
	// 			 	elem1.style.transition="all 1s";
	// 			 	document.getElementById('pic').appendChild(elem1).appendChild(elem);
	// 			 	elem1.style.visibility="visible";
	// 		   		elem1.style.left = (y*hw + marg*y) + 'px';
	// 		   		elem1.style.top = (x*hw + marg*x) + 'px';
	// 		   		allObject.push(new infObj(arrAll[k].id,arrAll[k].type,arrAll[k].coord,arrAll[k].target,arrAll[k].damage,arrAll[k].hp,elem1));
	// 			} else {
	// 				if ((arrAll[k].hp=="del")&&(allObject[ch].hp!="del")){
	// 					document.getElementById('pic').removeChild(allObject[ch].elem);
	// 					allObject[ch].hp="del";
	// 				} else  {
	// 					allObject[ch].coord=arrAll[k].coord;
	// 					allObject[ch].elem.style.left = (y*hw + marg*y) + 'px';
	// 			   		allObject[ch].elem.style.top = (x*hw + marg*x) + 'px';
	// 		   		}
			   		
	// 			}
	// 		}
	// 	}
			
	// }

	function findObjectById(id){
		for(var i=0; i<allObject.length-1;i++){
			if(allObject[i].internalId == id)
				return allObject[i];
		}
		return false;
	}

	function drawOrk(orkObj){
		var orkElem = findObjectById(orkObj.id)
		var x = orkObj.coord[0];
		var y = orkObj.coord[1];
		
		if(!orkElem){
			var picture=document.createElement('img');
		 	picture.src='photo.jpg';
		 	var newOrkElem=document.createElement('div');
		 	newOrkElem.style.transition="all 1s";
		 	document.getElementById('pic')
		 		.appendChild(newOrkElem)
		 		.appendChild(picture);
		 	picture.style.visibility="visible";
		 	newOrkElem.internalId = orkObj.id;

			allObject.push(newOrkElem);
			orkElem = newOrkElem;
		}

		orkElem.style.left=(y*hw + marg*y) + 'px';
		orkElem.style.top=(x*hw + marg*x) + 'px';
	}

	function removeIfDie(arrAll, allObject){
		allObject = allObject.filter(function(elem){
			for(var i=0; i<arrAll.length-1; i++)
				if(arrAll[i].id == elem.internalId) return true;

			return false;
		})
		return true;
	}

	this.objectInMap = function (){
		arrAll = w.getAll();
		removeIfDie(arrAll, allObject);

		for (var k=0;k<=arrAll.length-1;k++){
			switch (arrAll[k].type){
				case 'ORK':
					drawOrk(arrAll[k]);
					break;
			}

		}
			
	}

	setInterval(this.objectInMap.bind(this), 100);


}