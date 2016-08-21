
var throne=[];
throne[0]={i:5,j:0};
throne[1]={i:5,j:15};
var hw=50;
var marg=10;
var player="Валерий";
var w = new WORLD();
w.createPlayer(player, [5,0]);
var player_id=0;
w.createPlayer("Инокентий", [10,15]);
w.createPlayer("Александр", [10,5]);
//w.createPlace();
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
		'HUNTER': 'hunter.jpg'
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

	function renderObjectHP(dom_element){
		var hp_strike = dom_element.getElementsByClassName('hp-strike')[0];
		if(!hp_strike){
			hp_strike = document.createElement('div');
			hp_strike.className='hp-strike';
			dom_element.appendChild(hp_strike);
		}
		hp_strike.innerHTML = '';

		if(dom_element.hp){
			var max_hp = 5; //TODO: need max hp fromserver
			var hp = document.createElement('div');
			hp.style.width=(dom_element.hp/max_hp)*hp_strike.clientWidth + 'px'; 
			hp_strike.appendChild(hp);
		}
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
		 	renderElem.max_hp=object.hp;

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

		renderObjectHP(renderElem);
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
				if(arrAll[i].id == elem.internalId && arrAll[i].type == elem.type) 
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
				break;

				case 'CASTLE':
				masM[object.coord[0]][object.coord[1]].style.backgroundColor = "black";
				//player_id=object.player_id;
				//player_id=0;
				//	console.log(object.id)
					//console.log(player_id)
					if (object.player_id==player_id){
						
						var t = document.getElementById("Gold"); 
						t.innerHTML = "Gold : "+object.gold;

						t = document.getElementById("txt"); 
						t.innerHTML = "Стенок осталось : "+object.wall;

						t = document.getElementById("hp"); 
						t.innerHTML = "Здоровье базы : "+object.hp;

						t = document.getElementById("tower"); 
						t.innerHTML = "Количество башен : "+object.tow;

						t = document.getElementById("place"); 
						t.innerHTML = "Количество блоков : "+object.place;
					}
				break;

				default:
					//if(object.type == 'HUNTER')alert(1111);
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

