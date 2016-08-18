function CONTROLLER(){
	this.kappa = function(){
		for (var i=0;i<=10;i++){
			for (var j=0;j<=15;j++){
				if (masM[i][j]==event.target) {
						w.createWall(i,j);
				}
			}

		}
	}
}