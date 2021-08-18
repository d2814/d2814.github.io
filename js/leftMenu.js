function LeftMenu(menus,uls,bodys,time){
		this.menus = menus;
		this.uls = uls;
		this.bodys = bodys;
		this.time = time;
		this.left_side = $(".layui-side")[0];//菜单框架
		this.menu_count = menus.length; //菜单选项个数
		this.menu_hight = $(menus[0]).css("height");//菜单选项高度
		this.uls_bg_height = $(uls[0]).css("height");//菜单背景高度   n * 50
		this.init = function(){
			
			if(parseInt($("body").css("width")) < 992){
				if($(this.uls[0]).attr("status") == undefined){
					$(this.uls[0]).attr("status","up");
					$(this.uls[0]).css("height", "0px");
					$(this.left_side).css("visibility","hidden");
				}
				if($(this.bodys[0]).attr("status") == undefined){
					$(bodys[0]).css("left","0px");
					$(this.bodys[0]).attr("status","up");
				}
			}else{
				if($(this.uls[0]).attr("status") == undefined){
					$(this.uls[0]).attr("status","down");
					$(this.left_side).css("visibility","visible");
				}
				if($(this.bodys[0]).attr("status") == undefined){
					$(this.bodys[0]).attr("status","down");
				}
			}
		}
		this.upMenu = function(){
			if($(this.uls[0]).attr("status") == "up") return;
			$(this.uls[0]).attr("status","up");
			setTimeout(function(left_side){$(left_side).css("visibility","hidden")},this.left_side,60 * this.menu_count);
			for(let desc_index = this.menu_count - 1,asc_index = 1; desc_index >= 0; desc_index--, asc_index++){
				let menu_top = (desc_index == this.menu_count - 1)? "0px" : $(this.menus[0]).css("top");
				let menu_new_hight = parseInt(menu_top) - parseInt(this.menu_hight) * (desc_index + 1);
				setTimeout(function(menus,uls,menu_hight){
					//操作选项
					$(menus[desc_index]).css("top", menu_new_hight + "px");
					//操作背景
					let uls_current_bg_height = $(uls[0]).css("height");
					let uls_new_bg_height = parseInt(uls_current_bg_height) - parseInt(menu_hight);
					$(uls[0]).css("height", uls_new_bg_height + "px");
				},this.time * asc_index,this.menus,this.uls,this.menu_hight);
			}
		}
		this.downMenu = function(){
			if($(this.uls[0]).attr("status") == "down") return;
			$(this.uls[0]).attr("status","down");
			$(this.left_side).css("visibility","visible");
			for(let asc_index = 0; asc_index < this.menu_count; asc_index++){
				setTimeout(function(menus,uls,menu_hight){
					//操作选项
					$(menus[asc_index]).css("top","0px")
					//操作背景
					let uls_current_bg_height = $(uls[0]).css("height");
					let uls_new_bg_height = parseInt(uls_current_bg_height) + parseInt(menu_hight);
					$(uls[0]).css("height", uls_new_bg_height + "px");
				},this.time * asc_index,this.menus,this.uls,this.menu_hight);
			}
		}
		this.leftBody = function(width,time){
			if($(this.bodys[0]).attr("status") == "up") return;
			$(this.bodys[0]).attr("status","up");
			for(let i = width, j=1; i >= 0; i--, j++){
				setTimeout(function(){$(bodys[0]).css("left",i + "px"); console.log("leftBody:" + i);},time * j);
			}
		}
		this.rightBody = function(width,time){
			if($(this.bodys[0]).attr("status") == "down") return;
			$(this.bodys[0]).attr("status","down");
			for(let i = 0; i <= width; i++){
				setTimeout(function(){$(bodys[0]).css("left",i + "px"); console.log("rightBody:" + i);},time * i);
			}
		}
	}