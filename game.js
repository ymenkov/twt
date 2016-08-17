var throne=[];
throne[0]={i:5,j:0};
throne[1]={i:5,j:15};
var arrOrc=[];
var arrTower=[];
var arrWall = [];
var arrPlace = [];
var arrInterval = [];
var id=-1;
var stenaAc=1;
var place = 2;
var tower=2;
var gold = 20;
var hpB = 10;
var hw=50;
var marg=10;
var masM = new Array(11);
for (var k=0; k<=masM.length-1; k++) {
	masM[k] = new Array(16);
}

m5();


//orcCreate();
//
//orcCreate();

function start(){
	//dostr();
    orcCreate();

	 stenaAc=0;
	 setInterval(function(){
	 	orcCreate();
	 }, 2000);
	//console.log(

}


function buyPlace(){
if (gold>=10){
	gold = gold - 10;
	place=place+1;
	var t = document.getElementById("place"); 
	t.innerHTML = "Количество блоков : "+place;
	t = document.getElementById("Gold"); 
	t.innerHTML = "Gold : "+gold;
}

}

function buyTower(){
if (gold>=10){
	gold = gold - 10;
	tower=tower+1;
	var t = document.getElementById("tower"); 
	t.innerHTML = "Количество башен : "+tower;
	t = document.getElementById("Gold"); 
	t.innerHTML = "Gold : "+gold;
}

}


var stena=30;
function orcCreate(){
      	var elem=document.createElement('img');
     	elem.src='photo.jpg';
     	//id=id+1;
     	var elem1=document.createElement('div');
     	elem1.style.transition="all 1s";
     	document.getElementById('pic').appendChild(elem1).appendChild(elem);
     	arrOrc.push(new Ork(throne[1].i,(throne[1].j-1),elem1,id));
    	//document.getElementById('pic').appendChild(elem);
    	var elem2=document.createElement('div');
    	elem2.style.height="7px";
    	elem2.style.width="50px";
    	elem2.style.backgroundColor="red";
    	elem2.style.bottom="0";
    	document.getElementById('pic').appendChild(elem1).appendChild(elem2);
    	var elem2=document.createElement('div');
    	elem2.style.height="7px";
    	elem2.style.width="50px";
    	elem2.style.backgroundColor="green";
    	elem2.style.bottom="0";
    	document.getElementById('pic').appendChild(elem1).appendChild(elem2);
		arrInterval.push(setInterval(arrOrc[arrOrc.length-1].move.bind(arrOrc[arrOrc.length-1]),600));
		arrOrc[arrOrc.length-1].render();		
        
}




function Wall(i,j){
	this.i=i;
	this.j=j;
}

function Place(i,j){
	this.i=i;
	this.j=j;
}

function kappa(event){
	if ((stena!=0) && (event.target.style.backgroundColor=="white")&&(stenaAc==1)) { //Stena
		event.target.style.backgroundColor ="rgb(28, 28, 28)";
		stena--;
		for (var i=0;i<=10;i++){
					for (var j=0;j<=15;j++){
						if (masM[i][j]==event.target) {
								arrWall.push(new Wall(i,j));
						}
					}
		}				
		var t = document.getElementById("txt"); 
		t.innerHTML = "Стенок осталось : "+stena;
	}

		if (stenaAc==3){   //PLACE
			for (var i=0;i<=10;i++){
					for (var j=0;j<=15;j++){
						if (masM[i][j]==event.target) {
							//alert(masM[i][j-1].style.backgroundColor);
							if (((j>0)&&(searchPlace(i,j-1)))||((i>0)&&(searchPlace(i-1,j)))||((j<15)&&(searchPlace(i,j+1)))||((i<10)&&(searchPlace(i+1,j)))){
									if(place>0){
										arrPlace.push(new Place(i,j));
										event.target.style.backgroundColor ="rgb(128, 128, 128)";
										place=place-1;
										
										var t = document.getElementById("place"); 
										t.innerHTML = "Количество блоков : "+place;
									}	
							}
						}
					}
			}
		}



			if (stenaAc==2){ //TOWER
			for (var i=0;i<=10;i++){
					for (var j=0;j<=15;j++){
						if (masM[i][j]==event.target) {
							if((searchPlace(i,j)) && (tower>0)){
								arrWall.push(new Wall(i,j));
								var elem=document.createElement('img');
							    elem.src='tower.png';
							    elem.style.left = (j*hw + marg*j+2) + 'px';
	   							elem.style.top = (i*hw + marg*i+2) + 'px';
	   							elem.style.visibility="visible";
							   	document.getElementById('pic').appendChild(elem);
							   	arrTower.push(new Tow(i,j,elem));
								arrInterval.push(setInterval(arrTower[arrTower.length-1].shot.bind(arrTower[arrTower.length-1]),500));
							   	tower=tower-1;
								var t = document.getElementById("tower"); 
								t.innerHTML = "Количество башен : "+tower;
							}
						}
					}
			}
		}
}


function m5(){
	document.getElementById('test').innerHTML = "";
	for (var i=0;i<=10;i++){
		for (var j=0;j<=15;j++){
			var elem=document.createElement('div');
			elem.style.backgroundColor = "white";
		//	alert(throne[0].i); alert(i);
		
			if (((i+j)<=9)&&((i+j)>=1)&&(i>j)) {
				elem.style.backgroundColor = "rgb(128, 128, 128)";
				arrPlace.push(new Place(i,j));
			}

			
			if (((throne[0].i==i) && (throne[0].j==j)) || ((throne[1].i==i) && (throne[1].j==j))){
					elem.style.backgroundColor = "black";
			}

		
			
			elem.style.left = (j*hw + marg*j) + 'px';
			elem.style.top = (i*hw + marg*i) + 'px';
			elem.style.border = 'outset';
			masM[i][j] = elem;
			document.getElementById('test').onclick = kappa;
			document.getElementById('test').appendChild(elem);
				stena=0;
		}
	}
}