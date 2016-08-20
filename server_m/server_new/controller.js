var statusController=0;

function CONTROLLER(){
	this.kappa = function(event){
		if(statusController==0){
			for (var i=0;i<=10;i++){
				for (var j=0;j<=15;j++){
					if (masM[i][j]==event.target) {
							w.createWall(i,j,player_id);
					}
				}

			}
		}
		if(statusController==1){
			for (var i=0;i<=10;i++){
				for (var j=0;j<=15;j++){
					if (masM[i][j]==event.target) {
							//w.createTower(i,j,player_id);
							w.createObject(player_id,"TOWER",[i,j]);
					}
				}

			}
		}

		if(statusController==2){
			for (var i=0;i<=10;i++){
				for (var j=0;j<=15;j++){
					if (masM[i][j]==event.target) {
							w.addPlace(i,j,player_id);
					}
				}

			}
		}
	}
}