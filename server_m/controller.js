var statusController=0;

function CONTROLLER(){
	this.kappa = function(event){
		if(statusController==0){
			for (var i=0;i<=10;i++){
				for (var j=0;j<=15;j++){
					if (masM[i][j]==event.target) {
							w.createWall(i,j);
					}
				}

			}
		}
		if(statusController==1){
			for (var i=0;i<=10;i++){
				for (var j=0;j<=15;j++){
					if (masM[i][j]==event.target) {
							w.createTower(i,j);
					}
				}

			}
		}
	}
}