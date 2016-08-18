
var throne=[];
throne[0]={i:5,j:0};
throne[1]={i:5,j:15};
var hw=50;
var marg=10;
var w = new WORLD();
w.createPlace();
arrAll = w.getAll();

var c = new CONTROLLER();

var masM = new Array(11);
	for (var k=0; k<=masM.length-1; k++) {
		masM[k] = new Array(16);
	}

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
	var images = {
		'ORK' : 'photo.jpg',
		'TOWER' : 'tower.png',
	};

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
				masM[i][j] = elem;
				//document.getElementById('test')
				elem.onclick = c.kappa;
				//console.log(elem);
				document.getElementById('test').appendChild(elem);
			}
		}
	}

	function findObjectById(id){
		for(var i=0; i<allObject.length;i++){
			if(allObject[i].internalId == id)
				return allObject[i];
		}
		return false;
	}

	function renderObject(object, image){
		var renderElem = findObjectById(object.id); //ищем элемент среди созданных
		var x = object.coord[0];
		var y = object.coord[1];
		
		if(!renderElem){ //Если элемент не создан - добавляем
		 	renderElem = document.createElement('div');
		 	renderElem.style.transition="all 1s";
		 	renderElem.internalId = object.id;
		 	renderElem.type=object.type;

		 	document.getElementById('pic').appendChild(renderElem);
			allObject.push(renderElem);

			if(image){ //Если есть картинка - добавляем ее внутрь элемента
				var picture=document.createElement('img');
			 	picture.src=image;
			 	picture.style.visibility="visible";
			 	renderElem.appendChild(picture);
			}
		}

		//Далее двигаем наш элемент на карте
		renderElem.hp = object.hp;
		renderElem.coord = object.coord;
		renderElem.style.left=(y*hw + marg*y) + 'px';
		renderElem.style.top=(x*hw + marg*x) + 'px';
	}

	function renderAttackAnimation(type, from, to){
		var shot=document.createElement('div');
		shot.setCoordinate = function(x,y){
			this.style.left = y*hw + y*marg+20 + 'px';
	 		this.style.top = x*hw + x*marg +25+ 'px';
	 	}

	 	var parent = document.getElementById('ololo');
	 	parent.appendChild(shot).setCoordinate(from[0], from[1]);

	 	setTimeout(shot.setCoordinate.bind(shot, to[0], to[1]), 100);
	 	setTimeout(parent.removeChild.bind(parent, shot), 1500);
	}

	function removeIfDie(arrAll, allObject){
		allObject.forEach(function(elem, num){
			for(var i=0; i<arrAll.length; i++){
				if(arrAll[i].id == elem.internalId) 
					return true;
			}
			if(elem.type == 'ORK'){
				elem.parentNode.removeChild(elem);
				allObject.splice(num,1);
			}
		});
	}

	this.objectInMap = function (){
		arrAll = w.getAll();
		//console.dir(arrAll);
		removeIfDie(arrAll, allObject);
		arrAll.forEach(function(object){
			switch (object.type){
				case 'WALL' :
					masM[object.coord[0]][object.coord[1]].style.backgroundColor ="rgb(28, 28, 28)";
				break;

				case 'PLACE' :
				if (masM[object.coord[0]][object.coord[1]].style.backgroundColor!="black"){
					masM[object.coord[0]][object.coord[1]].style.backgroundColor = "rgb(128, 128, 128)";
					}
				break;

				case 'INFO' :
					var t = document.getElementById("Gold"); 
					t.innerHTML = "Gold : "+object.gold;

					t = document.getElementById("txt"); 
					t.innerHTML = "Стенок осталось : "+object.wall;

					t = document.getElementById("hp"); 
					t.innerHTML = "Здоровье базы : "+object.hpBase;

					t = document.getElementById("tower"); 
					t.innerHTML = "Количество башен : "+object.tow;

					t = document.getElementById("place"); 
					t.innerHTML = "Количество блоков : "+object.place;

				break;

				default:
					renderObject(object, images[object.type]);
					if(object.attackTarget){
						var target_obj = findObjectById(object.attackTarget);
						if(target_obj)
							renderAttackAnimation(object.type, object.coord, target_obj.coord);
					}
					break;
			}
			// if (object.type=="WALL"){
			// 	masM[object.coord[0]][object.coord[1]].style.backgroundColor ="rgb(28, 28, 28)";
			// } else {
			// 	console.log(object.type);
			// renderObject(object, images[object.type]);
			// }
		});	
	}


	setInterval(this.objectInMap.bind(this), 100);

}

