//layui js初始化
layui.use(['element', 'layer', 'util'], function(){
	  var element = layui.element
	  ,layer = layui.layer
	  ,util = layui.util
	  ,$ = layui.$;	

layui.use('carousel', function(){
	    var carousel = layui.carousel;
	    //建造实例
	    carousel.render({
	      elem: '#banner'
	      ,width: '96%' //设置容器宽度
	      ,arrow: 'always' //始终显示箭头
	      //,anim: 'updown' //切换动画方式
	    });
	  });

layui.use('laypage', function(){
	    var laypage = layui.laypage;
	    
	    //执行一个laypage实例
	    laypage.render({
	      elem: 'pager' //注意，这里的 test1 是 ID，不用加 # 号
	      ,count: 50 //数据总数，从服务端得到
	    });
	  }); 
	  
//媒体查询工具加载
var mediaUtil = new MediaUtil();
	  
//菜单初始化
let menus = $(".layui-side .layui-nav-item");//全部菜单项
	let uls = $(".layui-side ul");//菜单
	let bodys = $(".layui-body");//主体内容
	var leftMenu = new LeftMenu(menus,uls,bodys,50);
	leftMenu.init();
	  
	  
//菜单监听
mediaUtil.addAllMaxWidthListener(function(){
		let medias = new MediaUtil().maxMedias;//媒体查询器
		if(medias[0].matches){
			console.log('<=418'); //do something...
		}else if(medias[1].matches){
			console.log('>418 & <=768'); // do something...
			leftMenu.upMenu();
			leftMenu.leftBody(200,3);
		}else if(medias[2].matches){
			console.log('>768 & <=992'); // do something...
			leftMenu.upMenu();
			leftMenu.leftBody(200,3);
		}else if(medias[3].matches){
			console.log('> 992 & <=1200'); // do something...
			leftMenu.downMenu();
			leftMenu.rightBody(200,3);
		}else {
			console.log('>1200');
			leftMenu.downMenu();
			leftMenu.rightBody(200,3);
		}
	});
	
	
  //头部事件
	  util.event('lay-header-event', {
	    menuLeft: function(othis){
	      // layer.msg('展开左侧菜单的操作', {icon: 0});
		  let menus = $(".layui-side .layui-nav-item");//全部菜单项
		  let uls = $(".layui-side ul");//菜单
		  let bodys = $(".layui-body");//主体内容
		  if($(uls[0]).attr("status") == "up"){
			  leftMenu.downMenu();
			  if(parseInt($("body").css("width")) > 992) leftMenu.rightBody(200,3);
		  }else{
			  leftMenu.upMenu();
			  if(parseInt($("body").css("width")) > 992) leftMenu.leftBody(200,3);
		  }
	    }
	    ,menuRight: function(){
	      layer.open({
	        type: 1
	        ,title: '设置'
	        ,content: '<div style="padding: 15px;">处理右侧面板的操作</div>'
	        ,area: ['200px', '50%']
	        ,offset: 'rt' //右上角
	        ,anim: 5
	        ,shadeClose: true
	        ,scrollbar: false
	      });
	    }
	  });
	  
	});