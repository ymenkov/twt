
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

	function findObjectById(id){
		for(var i=0; i<allObject.length;i++){
			if(allObject[i].internalId == id)
				return allObject[i];
		}
		return false;
	}

	function renderOrk(orkObj){
		var orkElem = findObjectById(orkObj.id)
		var x = orkObj.coord[0];
		var y = orkObj.coord[1];
		
		if(!orkElem){

			var picture=document.createElement('img');
		 	picture.src='photo.jpg';
		 	picture.style.visibility="visible";

		 	var newOrkElem=document.createElement('div');
		 	newOrkElem.style.transition="all 1s";
		 	newOrkElem.internalId = orkObj.id;
		 	newOrkElem.gameType='ORK';

		 	document.getElementById('pic')
		 		.appendChild(newOrkElem)
		 		.appendChild(picture);

			allObject.push(newOrkElem);
			orkElem = newOrkElem;
		}

		orkElem.style.left=(y*hw + marg*y) + 'px';
		orkElem.style.top=(x*hw + marg*x) + 'px';
	}

	function removeIfDie(arrAll, allObject){
		allObject.forEach(function(elem, num){
			for(var i=0; i<arrAll.length; i++){
				if(arrAll[i].id == elem.internalId) 
					return true;
			}
			if(elem.gameType == 'ORK'){
				elem.parentNode.removeChild(elem);
				allObject.splice(num,1);
			}
		});
	}

	this.objectInMap = function (){
		arrAll = w.getAll();
		console.dir(arrAll);
		removeIfDie(arrAll, allObject);

		for (var k=0;k<arrAll.length;k++){
			switch (arrAll[k].type){
				case 'ORK':
					renderOrk(arrAll[k]);
					break;

				default:
					//renderDefault();
					break;
			}

		}
			
	}

	setInterval(this.objectInMap.bind(this), 100);


}