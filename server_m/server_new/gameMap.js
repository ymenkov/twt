
function GameMap(width, height){
	var me = this;
	me.width = width;
	me.height = height;

	allBlocks = [];

	me.addBlock = function(coordinate){

	}

	me.removeBlock = function(coordinate){
		
	}

	function findObjectsInArray(array, param, value){
		var reaz = [];
		for(var i=0; i<array.length; i++)
			if(array[i][param]==value)
				reaz.push(array[i]);
		return reaz;
	}

	me.findPathToCoordinate = function(from, to,all_obj){

		var grid = new PF.Grid(me.width, me.height); 
		var finder = new PF.AStarFinder();

		var objects = findObjectsInArray(all_obj, 'block', true);
		objects.forEach(function(obj){ 
			if(obj && obj.coord != to )
				grid.setWalkableAt(obj.coord[0], obj.coord[1], false);
		});

		return finder.findPath(from[0], from[1], to[0], to[1], grid);
	}

	me.findFreeSpace = function(longAwayCoordinate){
		//TODO - need for find CASTLE long away coordinate
	}

	me.checkPointToFree = function(coordinate){
		return true;
	}
}