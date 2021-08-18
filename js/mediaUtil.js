function MediaUtil(){
	this.xs = 0; // 418px
	this.sm = 1; // 768px
	this.md = 2; // 992px
	this.lg = 3; // 1200px
	this.maxMedias = [
		window.matchMedia('(max-width:418px)'),
		window.matchMedia('(max-width:768px)'),
		window.matchMedia('(max-width:992px)'),
		window.matchMedia('(max-width:1200px)')
	]
	this.minMedias = [
		window.matchMedia('(min-width:418px)'),
		window.matchMedia('(min-width:768px)'),
		window.matchMedia('(min-width:992px)'),
		window.matchMedia('(min-width:1200px)')
	]
	this.addMaxWidthListener = function(index,fun){
		this.maxMedias[index].addListener(fun);
	}
	this.addMinWidthListener = function(index,fun){
		this.minMedias[index].addListener(fun)
	}
	this.addAllMaxWidthListener = function(fun){
		for(let i = 0;i < 4; i++){
			this.maxMedias[i].addListener(fun);
		}
	}
	this.addAllMinWidthListener = function(fun){
		for(let i = 0;i < 4; i++){
			this.minMedias[i].addListener(fun);
		}
	}
}