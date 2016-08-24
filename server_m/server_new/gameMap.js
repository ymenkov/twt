
function GameMap(width, height){
	var me = this;
	me.width = width;
	me.height = height;

	allBlocks = [];

	me.addBlock = function(coordinate){

	}

	me.removeBlock = function(coordinate){
		
	}

	me.findPathToCoordinate = function(from, to){
		var grid = new PF.Grid(me.width, me.height); 
		var finder = new PF.AStarFinder();
		return finder.findPath(from[0], from[1], to[0], to[1], grid);
	}

	me.findFreeSpace = function(longAwayCoordinate){
		//TODO - need for find CASTLE long away coordinate
	}

	me.checkPointToFree = function(coordinate){

	}
}