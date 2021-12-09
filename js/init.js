//初始化页面用
//  https://cdnjs.cloudflare.com/ajax/libs/ jquery/3.6.0/jquery.min.js
//  https://cdn.bootcdn.net/ajax/libs/      jquery/3.6.0/jquery.min.js
//  https://cdn.jsdelivr.net/npm/           jquery@3.6.0/dist/jquery.min.js
function LoadPagerDomain() {
	this.supplier = "";
	this.url = "";
	this.defaultSupplier = "bootcdn";
	this.defaultUrl = "https://cdn.bootcdn.net/ajax/libs/";
	this.pc = 0;
	this.next = 0;
	this.merge = 0;
	this.rootFlag = false;
	this.beforFlag = false;
	this.beforErrorFlag = false;
	this.loadFlag = false;
	this.loadErrorFlag = false;
	this.afterFlag = false;
	this.afterErrorFlag = false;
	this.syncFlag = false;
	this.syncErrorFlag = false;
	this.mergeFlag = false;
	this.mergeErrorFlag = false;
	this.data = "";
	this.urlJson = [{
		"name": "cdnjs",
		"testUrl": "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js",
		"url": "https://cdnjs.cloudflare.com/ajax/libs/"
	}, {
		"name": "bootcdn",
		"testUrl": "https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js",
		"url": "https://cdn.bootcdn.net/ajax/libs/"
	}, {
		"name": "jsdelivr",
		"testUrl": "https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js",
		"url": "https://cdn.jsdelivr.net/npm/"
	}];
	this.actionJson = [{
		"name": "library.js",
		"local": "js/library.js"
	}, {
		"name": "main.css",
		"local": "css/main.css"
	}, {
		"name": "main.js",
		"local": "js/main.js"
	}, {
		"name": "jquery.js",
		"cdnjs": "jquery/3.6.0/jquery.min.js",
		"bootcdn": "jquery/3.6.0/jquery.min.js",
		"jsdelivr": "jquery@3.6.0/dist/jquery.min.js"
	}, {
		"name": "font-awesome.css",
		"cdnjs": "font-awesome/4.7.0/css/font-awesome.min.css",
		"bootcdn": "font-awesome/4.7.0/css/font-awesome.min.css",
		"jsdelivr": "font-awesome@4.7.0/css/font-awesome.min.css"
	}, {
		"name": "mdui.css",
		"cdnjs": "mdui/1.0.2/css/mdui.min.css",
		"bootcdn": "mdui/1.0.2/css/mdui.min.css",
		"jsdelivr": "mdui@1.0.2/dist/css/mdui.min.css"
	}, {
		"name": "mdui.js",
		"cdnjs": "mdui/1.0.2/js/mdui.min.js",
		"bootcdn": "mdui/1.0.2/js/mdui.min.js",
		"jsdelivr": "mdui@1.0.2/dist/js/mdui.min.js"
	}, {
		"name": "prism.css",
		"cdnjs": "prism/1.24.1/themes/prism.min.css",
		"bootcdn": "prism/1.24.1/themes/prism.min.css",
		"jsdelivr": "prismjs@1.24.1/themes/prism.css"
	}, {
		"name": "prism.js",
		"cdnjs": "prism/1.24.1/prism.min.js",
		"bootcdn": "prism/1.24.1/prism.min.js",
		"jsdelivr": "prismjs@1.24.1/prism.min.js"
	}, {
		"name": "prism-core.js",
		"cdnjs": "prism/1.24.1/components/prism-core.min.js",
		"bootcdn": "prism/1.24.1/components/prism-core.min.js",
		"jsdelivr": "prismjs@1.24.1/components/prism-core.min.js"
	}, {
		"name": "prism-bash.js",
		"cdnjs": "prism/1.24.1/components/prism-bash.min.js",
		"bootcdn": "prism/1.24.1/components/prism-bash.min.js",
		"jsdelivr": "prismjs@1.24.1/components/prism-bash.min.js"
	}, {
		"name": "prism-markup.js",
		"cdnjs": "prism/1.24.1/components/prism-markup.min.js",
		"bootcdn": "prism/1.24.1/components/prism-markup.min.js",
		"jsdelivr": "prismjs@1.24.1/components/prism-markup.min.js"
	}, {
		"name": "prism-autoloader.js",
		"cdnjs": "prism/1.24.1/plugins/autoloader/prism-autoloader.min.js",
		"bootcdn": "prism/1.24.1/plugins/autoloader/prism-autoloader.min.js",
		"jsdelivr": "prismjs@1.24.1/plugins/autoloader/prism-autoloader.min.js"
	}, {
		"name": "prism-toolbar.css",
		"cdnjs": "prism/1.24.1/plugins/toolbar/prism-toolbar.min.css",
		"bootcdn": "prism/1.24.1/plugins/toolbar/prism-toolbar.min.css",
		"jsdelivr": "prismjs@1.24.1/plugins/toolbar/prism-toolbar.css"
	}, {
		"name": "prism-toolbar.js",
		"cdnjs": "prism/1.24.1/plugins/toolbar/prism-toolbar.min.js",
		"bootcdn": "prism/1.24.1/plugins/toolbar/prism-toolbar.min.js",
		"jsdelivr": "prismjs@1.24.1/plugins/toolbar/prism-toolbar.min.js"
	}, {
		"name": "prism-line-numbers.css",
		"cdnjs": "prism/1.24.1/plugins/line-numbers/prism-line-numbers.min.css",
		"bootcdn": "prism/1.24.1/plugins/line-numbers/prism-line-numbers.min.css",
		"jsdelivr": "prismjs@1.24.1/plugins/line-numbers/prism-line-numbers.css"
	}, {
		"name": "prism-line-numbers.js",
		"cdnjs": "prism/1.24.1/plugins/line-numbers/prism-line-numbers.min.js",
		"bootcdn": "prism/1.24.1/plugins/line-numbers/prism-line-numbers.min.js",
		"jsdelivr": "prismjs@1.24.1/plugins/line-numbers/prism-line-numbers.min.js"
	}, {
		"name": "prism-line-highlight.css",
		"cdnjs": "prism/1.24.1/plugins/line-highlight/prism-line-highlight.min.css",
		"bootcdn": "prism/1.24.1/plugins/line-highlight/prism-line-highlight.min.css",
		"jsdelivr": "prismjs@1.24.1/plugins/line-highlight/prism-line-highlight.css"
	}, {
		"name": "prism-line-highlight.js",
		"cdnjs": "prism/1.24.1/plugins/line-highlight/prism-line-highlight.min.js",
		"bootcdn": "prism/1.24.1/plugins/line-highlight/prism-line-highlight.min.js",
		"jsdelivr": "prismjs@1.24.1/plugins/line-highlight/prism-line-highlight.min.js"
	}, {
		"name": "prism-show-language.js",
		"cdnjs": "prism/1.24.1/plugins/show-language/prism-show-language.min.js",
		"bootcdn": "prism/1.24.1/plugins/show-language/prism-show-language.min.js",
		"jsdelivr": "prismjs@1.24.1/plugins/show-language/prism-show-language.min.js"
	}, {
		"name": "prism-copy-to-clipboard.js",
		"cdnjs": "prism/1.24.1/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js",
		"bootcdn": "prism/1.24.1/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js",
		"jsdelivr": "prismjs@1.24.1/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js"
	}, {
		"name": "tex-chtml-full.js",
		"cdnjs": "mathjax/3.2.0/es5/tex-chtml-full.min.js",
		"bootcdn": "mathjax/3.2.0/es5/tex-chtml-full.min.js",
		"jsdelivr": "mathjax@3.2.0/es5/tex-chtml-full.js"
	}, {
		"name": "tex-svg-full.js",
		"cdnjs": "mathjax/3.2.0/es5/tex-svg-full.min.js",
		"bootcdn": "mathjax/3.2.0/es5/tex-svg-full.min.js",
		"jsdelivr": "mathjax@3.2.0/es5/tex-svg-full.js"
	}, {
		"name": "tex-mml-chtml.js",
		"cdnjs": "mathjax/3.2.0/es5/tex-mml-chtml.min.js",
		"bootcdn": "mathjax/3.2.0/es5/tex-mml-chtml.min.js",
		"jsdelivr": "mathjax@3.2.0/es5/tex-mml-chtml.js"
	}, {
		"name": "",
		"cdnjs": "",
		"bootcdn": "",
		"jsdelivr": ""
	}];
}

function LoadPagerService() {
	//全局数据
	this.domain = new LoadPagerDomain();
	//获取CDN节点提供商 内部函数
	this.root = false;
	this.getRootUrl = function() {
		if(this.root){return;}
		this.root = true;
		domain = this.domain;
		urlJson = domain.urlJson;
		for (let i = 0; i < urlJson.length; i++) {
			let xhr = new XMLHttpRequest();
			xhr.open('GET',urlJson[i]['testUrl'] + "?t=" + new Date().getTime());
			xhr.send();
			xhr.onreadystatechange = function(){
				if(!domain.rootFlag && xhr.readyState == 4 && xhr.status == 200){
					domain.rootFlag = true;
					domain.supplier = urlJson[i]['name'];
					domain.url = urlJson[i]['url'];
					console.log("CDN获取成功：" + urlJson[i]['name']);
				}
			}
		}
	}
	//默认CDN节点提供商（备用） 内部函数
	this.getDefaultRootUrl = function() {
		this.domain.rootFlag = true;
		this.domain.supplier = this.domain.defaultSupplier;
		this.domain.url = this.domain.defaultUrl;
		console.log("默认CDN设置成功：" + this.domain.defaultSupplier);
	}
	//根据文件名获取资源链接 内部函数
	this.getSourceUri = function(name){
		let actionJson = this.domain.actionJson;
		let supplier = this.domain.supplier;
		let url = this.domain.url;
		for(let i = 0; i < actionJson.length; i++){
			if(actionJson[i]['name'] != name && i == actionJson.length - 1){url = "";}
			if(actionJson[i]['name'] != name){continue;}
			if(actionJson[i][supplier] != undefined && actionJson[i][supplier] != ""){
				url = url + actionJson[i][supplier];
				break;
			}else if(actionJson[i]['local'] != undefined && actionJson[i]['local'] != ""){
				let base = document.getElementsByTagName("base")[0];
				if(base != undefined){
					url = base.href + actionJson[i]['local'];
				}else{
					url = "/" + actionJson[i]['local'];
				}
				break;
			}
		}
		return url;
	}
	//dom中创建link(外部文件方式) 内部函数
	this.createCss = function(name,mode,url,fun) {
		let link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = url;
		if(mode == "async"){link.async = "async";}
		link.onload = link.onreadystatechange = function(){
			if(!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete'){
				fun();
				this.onload = this.onreadystatechange = null;
			}
		}
		document.head.appendChild(link);
	}
	//dom中创建script(外部文件方式) 内部函数
	this.createJs = function(name,mode,url,fun) {
		let script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url;
		if(mode == "async"){script.async = "async";}
		script.onload = script.onreadystatechange = function(){
			if(!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete'){
				fun();
				this.onload = this.onreadystatechange = null;
			}
		}
		document.body.appendChild(script);
	}
	//dom中创建script(内联方式) 内部函数
	this.createJsWithText = function(text) {
		let script = document.createElement("script");
		script.type = "text/javascript";
		script.innerText = text;
		document.body.appendChild(script);
	}
	//根据文件名加载资源（JS/CSS）内部函数
	this.loadSource = function (name,mode,fun){
		let url = this.getSourceUri(name);
		if(url == ""){console.log("[ERROR] 未找到" + name + "对应地址!");}
		if(name.indexOf("css") != -1){
			this.createCss(name,mode,url,fun);
		}else if(name.indexOf("js") != -1){
			this.createJs(name,mode,url,fun);
		}
	}
	//根据文件名同步（顺序加载）方式加载资源（JS/CSS） 内部函数
	this.syncLoadSource = function(name,key,len) {
		setTimeout(function(name,key,len,thisObj){
			if(thisObj.domain.next != key){thisObj.syncLoadSource(name,key,len);return;}
			thisObj.loadSource(name,"sync",function(){
				console.log(name + "加载完成！")
				thisObj.domain.next += 1;
				if(thisObj.domain.next == len){
					thisObj.domain.syncFlag = true;
					thisObj.domain.next = 0;
				}
			});
		},200,name,key,len,this);
	}
	//根据文件名ajax方式获取资源并自定义回调处理（JS） 内部函数
	this.ajaxLoadSource = function(name,fun) {
		let url = this.getSourceUri(name);
		if(url == ""){console.log("[ERROR] 未找到" + name + "对应地址!");}
		let xhr = new XMLHttpRequest();
		xhr.open('GET',url);
		xhr.send();
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				fun(xhr.response);
			}
		}
	}
	//根据文件名同步（顺序加载）ajax方式获取资源（JS） 内部函数
	this.ajaxLoadMergeSource = function(name,key,len) {
		setTimeout(function(name,key,len,thisObj){
			if(thisObj.domain.merge != key){thisObj.ajaxLoadMergeSource(name,key,len);return;}
			thisObj.ajaxLoadSource(name,function(resp){
				console.log(name + "存储完成！");
				thisObj.domain.merge += 1;
				let temp = thisObj.domain.data;
				thisObj.domain.data = temp + resp;
				if(thisObj.domain.merge == len){
					thisObj.domain.mergeFlag = true;
					thisObj.domain.merge = 0;
					// window.eval(thisObj.domain.data);
					thisObj.createJsWithText(thisObj.domain.data);
					thisObj.domain.data = null;
				}
			});
		},200,name,key,len,this);
	}
	//根据列表内（JS.CSS）加载文件  执行优先级：先  内/外部函数
	//不建议直接调用此函数，如必须 需要先获取rooturl
	this.befor = function (actionList,mode,index){
		if(actionList == undefined || actionList.length == 0){this.domain.beforFlag = true;return;}
		setTimeout(function(actionList,thisObj){
			console.log("befor等待资源中!");
			if(index > 60){thisObj.domain.beforErrorFlag = true;return;}
			if(!thisObj.domain.rootFlag){thisObj.befor(actionList,mode,index+1);return;}
			console.log("befor开始加载!");
			for(let i = 0; i < actionList.length; i++){
				thisObj.loadSource(actionList[i],mode,function(){
					thisObj.domain.pc += 1;
					if(thisObj.domain.pc == actionList.length){
						thisObj.domain.beforFlag = true;
						thisObj.domain.pc = 0;
					}
				});
			}
		},100,actionList,this)
	}
	//根据列表内（JS.CSS）加载文件  执行优先级：中  内/外部函数
	//不建议直接调用此函数，如必须 需要先获取rooturl,在执行befor (不需要执行befor调用时给空数组)
	this.load = function (actionList,mode,index){
		if(actionList == undefined || actionList.length == 0){this.domain.loadFlag = true;return;}
		setTimeout(function(actionList,thisObj){
			console.log("load等待资源中!");
			if(index > 60){thisObj.domain.loadErrorFlag = true;return;}
			if(!thisObj.domain.rootFlag){thisObj.load(actionList,mode,index+1);return;}
			if(!thisObj.domain.beforFlag){thisObj.load(actionList,mode,index+1);return;}
			console.log("load开始加载!");
			for(let i = 0; i < actionList.length; i++){
				thisObj.loadSource(actionList[i],mode,function(){
					thisObj.domain.pc += 1;
					if(thisObj.domain.pc == actionList.length){
						thisObj.domain.loadFlag = true;
						thisObj.domain.pc = 0;
					}
				});
			}
		},150,actionList,this)
	}
	//根据列表内（JS.CSS）加载文件  执行优先级：后  内/外部函数
	//不建议直接调用此函数，如必须 需要先获取rooturl,在执行befor和load (不需要执行befor/load调用时给空数组)
	this.after = function (actionList,mode,index){
		if(actionList == undefined || actionList.length == 0){this.domain.afterFlag = true;return;}
		setTimeout(function(actionList,thisObj){
			console.log("after等待资源中!");
			if(index > 60){thisObj.domain.afterErrorFlag = true;return;}
			if(!thisObj.domain.rootFlag){thisObj.after(actionList,mode,index+1);return;}
			if(!thisObj.domain.beforFlag){thisObj.after(actionList,mode,index+1);return;}
			if(!thisObj.domain.loadFlag){thisObj.after(actionList,mode,index+1);return;}
			console.log("after开始加载!");
			for(let i = 0; i < actionList.length; i++){
				thisObj.loadSource(actionList[i],mode,function(){
					thisObj.domain.pc += 1;
					if(thisObj.domain.pc == actionList.length){
						thisObj.domain.afterFlag = true;
						thisObj.domain.pc = 0;
					}
				});
			}
		},200,actionList,this)
	}
	//根据列表内（JS.CSS）同步（列表文件顺序）加载文件  执行优先级：最后  内/外部函数
	//不建议直接调用此函数，如必须 需要先获取rooturl,在执行befor和load和after (不需要执行befor/load/after调用时给空数组)
	this.syncLoad = function (actionList,index){
		if(actionList == undefined || actionList.length == 0){this.domain.syncFlag = true;return;}
		setTimeout(function(actionList,thisObj){
			console.log("sync等待资源中!");
			if(index > 60){thisObj.domain.syncErrorFlag = true;return;}
			if(!thisObj.domain.rootFlag){thisObj.syncLoad(actionList,index+1);return;}
			if(!thisObj.domain.beforFlag){thisObj.syncLoad(actionList,index+1);return;}
			if(!thisObj.domain.loadFlag){thisObj.syncLoad(actionList,index+1);return;}
			if(!thisObj.domain.afterFlag){thisObj.syncLoad(actionList,index+1);return;}
			console.log("sync开始加载!");
			for(let i = 0; i < actionList.length; i++){
				thisObj.syncLoadSource(actionList[i],i,actionList.length);
			}
		},250,actionList,this);
	}
	//根据列表内（JS）合并后加载到script标签内  执行优先级：无  内/外部函数
	//不建议直接调用此函数，如必须 需要先获取rooturl
	this.syncMergeLoad = function(actionList,index){
		if(actionList == undefined || actionList.length == 0){return;}
		setTimeout(function(actionList,thisObj){
			console.log("syncMerge等待资源中!");
			if(index > 60){thisObj.domain.syncErrorFlag = true;return;}
			if(!thisObj.domain.rootFlag){thisObj.syncMergeLoad(actionList,index+1);return;}
			console.log("syncMerge开始加载!");
			for(let i = 0;i < actionList.length; i++){
				thisObj.ajaxLoadMergeSource(actionList[i],i,actionList.length);
			}
		},150,actionList,this);
	}
	this.checkLoad = function(){
		let rf = this.domain.rootFlag;
		let bf = this.domain.beforFlag;
		let lf = this.domain.loadFlag;
		let af = this.domain.afterFlag;
		let sf = this.domain.syncFlag;
		if(rf && bf && lf && af && sf){return true;}
		return false;
	}
	this.checkMergeLoad = function(){
		let rf = this.domain.rootFlag;
		let mf = this.domain.mergeFlag
		if(rf && mf){return true;}
		return false;
	}
	//加载器（将需要加载的JS/CSS通过数组传入，4个优先级，最后为同步（顺序）加载）  外部函数
	//参数    beforList  loadList  afterList  syncList（同步）
	//优先级     1           2         3         4
	//优先级最高数组先执行
	this.init = false;
	this.initLoad = function(beforList,loadList,afterList,syncList){
		if(this.init){console.log("initLoad方法已加载！如需再次使用请创建新对象！");return;}
		this.init = true;
		if(this.domain.supplier == ""){this.getRootUrl();}
		this.befor(beforList,"async",0);
		this.load(loadList,"async",0);
		this.after(afterList,"async",0);
		this.syncLoad(syncList,0);
		setTimeout(function(beforList,loadList,afterList,syncList,thisObj){
			if(thisObj.checkLoad()){console.log("加载JS/CSS完成！");return;}
			thisObj.init = false;
			thisObj.initLoad(beforList,loadList,afterList,syncList);
		},15000,beforList,loadList,afterList,syncList,this);
	}
	//合并JS加载器  外部函数
	//将数组内JS文件合并后加载并执行
	//无优先级
	this.merge = false;
	this.megreLoad = function(actionList){
		if(this.merge){console.log("megreLoad方法已加载！如需再次使用请创建新对象！");return;}
		this.merge = true;
		if(this.domain.supplier == ""){this.getRootUrl();}
		this.syncMergeLoad(actionList,0);
		setTimeout(function(actionList,thisObj){
			if(thisObj.checkMergeLoad()){console.log("加载合并JS完成！");return;}
			thisObj.merge = false;
			thisObj.megreLoad(actionList);
		},15000,actionList,this);
	}
}