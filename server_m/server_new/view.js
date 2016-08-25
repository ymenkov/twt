
var throne=[];
throne[0]={i:5,j:0};
throne[1]={i:5,j:15};
var hw=50;
var marg=10;
var player="Валерий";

var w = new World(11,16, gameObjects);
w.startWorld();

w.createPlayer(player, [0,0]);
//w.createObject('ORK', 0, [1,1]);

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
		'HUNTER': 'hunter.jpg',
		'CASTLE' : 'castle.png'
	};

	var colors = [
		'#4250CD', '#CD4742', '#CCCD42', '#CD42B3', '#42CCCD', 
		'#42CD4E', '#FFFFFF', '#000000'
	];

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

	function findObjectById(id, type){
		for(var i=0; i<allObject.length;i++){
			if(allObject[i].internalId == id)
				if(allObject[i].type == type)
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
			var max_hp = dom_element.max_hp; 
			var hp = document.createElement('div');
			hp.style.width=((dom_element.hp/max_hp)*hp_strike.clientWidth).toFixed(0) + 'px'; 
			hp_strike.appendChild(hp);
		}
	}

	function generateColor(id){
		return colors[id] || 'white';
	}

	function renderObject(object, image){
		var renderElem = findObjectById(object.id, object.type); //ищем элемент среди созданных
		var x = object.coord[0];
		var y = object.coord[1];
		
		if(!renderElem){ //Если элемент не создан - добавляем
		 	renderElem = document.createElement('div');
		 	renderElem.className = 'game-object';
		 	renderElem.style.transition="all 1s";
		 	renderElem.internalId = object.id;
		 	renderElem.type=object.type;
		 	renderElem.max_hp=object.hp;

		 	if(object.player_id !== undefined){
		 		renderElem.style.backgroundColor = generateColor(object.player_id);
		 		renderElem.style.zIndex = 101;
		 	}

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
			//f(elem.type == 'ORK'){
				elem.parentNode.removeChild(elem);
				allObject.splice(num,1);
			//}
		});
	}

	this.objectInMap = function (){
		arrAll = w.getAll(player_id);

		removeIfDie(arrAll, allObject);
		arrAll.forEach(function(object){
			switch (object.type){
				case 'PLAYER':
					var t = document.getElementById("Gold"); 
					t.innerHTML = "Gold : "+object.gold;
				break;

				case 'WALL' :
				//	masM[object.coord[0]][object.coord[1]].style.backgroundColor ="rgb(28, 28, 28)";
					rendO();
				break;

				case 'PLACE' :
				if (masM[object.coord[0]][object.coord[1]].style.backgroundColor!="black"){
					masM[object.coord[0]][object.coord[1]].style.backgroundColor = "rgb(128, 128, 128)";
					}
				break;

				case 'CASTLE':
					masM[object.coord[0]][object.coord[1]].style.backgroundColor = generateColor(object.player_id);//"black";
					rendO();
					break;

				default:
					rendO();
					break;

					function rendO(){
						renderObject(object, images[object.type]);
						if(object.attackTarget){
							var target_obj = findObjectById(object.attackTarget, 'ORK'); //TODO - need target ID from server
							if(target_obj)
							renderAttackAnimation(object.type, object.coord, target_obj.coord);
						}
					}
			}

		});	
	}


	setInterval(this.objectInMap.bind(this), 100);

}

