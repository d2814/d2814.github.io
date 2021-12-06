//  https://cdnjs.cloudflare.com/ajax/libs/ jquery/3.6.0/jquery.min.js
//  https://cdn.bootcdn.net/ajax/libs/      jquery/3.6.0/jquery.min.js
//  https://cdn.jsdelivr.net/npm/           jquery@3.6.0/dist/jquery.min.js
function LoadPagerDomain() {
	this.supplier = "";
	this.url = "";
	this.flag = false;
	this.loadFlag = false;
	this.loadErrorFlag = false;
	this.urlJson = [{
		"name": "cdnjs",
		"api": "https://api.cdnjs.com/",
		"testUrl": "https://api.cdnjs.com/libraries/mdui",
		"url": "https://cdnjs.cloudflare.com/ajax/libs/"
	}, {
		"name": "bootcdn",
		"api": "https://api.bootcdn.cn/",
		"testUrl": "https://api.bootcdn.cn/libraries/mdui.min.json",
		"url": "https://cdn.bootcdn.net/ajax/libs/"
	}, {
		"name": "jsdelivr",
		"testUrl": "https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js",
		"url": "https://cdn.jsdelivr.net/npm/"
	}];
	this.actionJson = [{
		"name": "font-awesome.css",
		"uri": "font-awesome/4.7.0/css/font-awesome.min.css",
		"npmUri": "font-awesome@4.7.0/css/font-awesome.min.css"
	}, {
		"name": "mdui.css",
		"uri": "mdui/1.0.2/css/mdui.min.css",
		"npmUri": "mdui@1.0.2/dist/css/mdui.min.css"
	}, {
		"name": "mdui.js",
		"uri": "mdui/1.0.2/js/mdui.min.js",
		"npmUri": "mdui@1.0.2/dist/js/mdui.min.js"
	}, {
		"name": "prism.css",
		"uri": "prism/1.24.1/themes/prism.min.css",
		"npmUri": "prismjs@1.24.1/themes/prism.css"
	}, {
		"name": "prism.js",
		"uri": "prism/1.24.1/prism.min.js",
		"npmUri": "prismjs@1.24.1/prism.min.js"
	}, {
		"name": "prism-core.js",
		"uri": "prism/1.24.1/components/prism-core.min.js",
		"npmUri": "prismjs@1.24.1/components/prism-core.min.js"
	}, {
		"name": "prism-autoloader.js",
		"uri": "prism/1.24.1/plugins/autoloader/prism-autoloader.min.js",
		"npmUri": "prismjs@1.24.1/plugins/autoloader/prism-autoloader.min.js"
	}, {
		"name": "prism-toolbar.css",
		"uri": "prism/1.24.1/plugins/toolbar/prism-toolbar.min.css",
		"npmUri": "prismjs@1.24.1/plugins/toolbar/prism-toolbar.css"
	}, {
		"name": "prism-toolbar.js",
		"uri": "prism/1.24.1/plugins/toolbar/prism-toolbar.min.js",
		"npmUri": "prismjs@1.24.1/plugins/toolbar/prism-toolbar.min.js"
	}, {
		"name": "prism-line-numbers.css",
		"uri": "prism/1.24.1/plugins/line-numbers/prism-line-numbers.min.css",
		"npmUri": "prismjs@1.24.1/plugins/line-numbers/prism-line-numbers.css"
	}, {
		"name": "prism-line-numbers.js",
		"uri": "prism/1.24.1/plugins/line-numbers/prism-line-numbers.min.js",
		"npmUri": "prismjs@1.24.1/plugins/line-numbers/prism-line-numbers.min.js"
	}, {
		"name": "prism-line-highlight.css",
		"uri": "prism/1.24.1/plugins/line-highlight/prism-line-highlight.min.css",
		"npmUri": "prismjs@1.24.1/plugins/line-highlight/prism-line-highlight.css"
	}, {
		"name": "prism-line-highlight.js",
		"uri": "prism/1.24.1/plugins/line-highlight/prism-line-highlight.min.js",
		"npmUri": "prismjs@1.24.1/plugins/line-highlight/prism-line-highlight.min.js"
	}, {
		"name": "prism-show-language.js",
		"uri": "prism/1.24.1/plugins/show-language/prism-show-language.min.js",
		"npmUri": "prismjs@1.24.1/plugins/show-language/prism-show-language.min.js"
	}, {
		"name": "prism-copy-to-clipboard.js",
		"uri": "prism/1.24.1/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js",
		"npmUri": "prismjs@1.24.1/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js"
	}, {
		"name": "",
		"uri": "",
		"npmUri": ""
	}];
}

function LoadPagerService(head,body) {
	this.domain = new LoadPagerDomain();
	this.head = head;
	this.body = body;
	this.initRootUrl = function() {
		domain = this.domain;
		urlJson = domain.urlJson;
		for (let i = 0; i < urlJson.length; i++) {
			$.ajax({
				cache: false,
				url: urlJson[i]['testUrl'],
				dataType: 'json',
				type: 'get',
				processData: false,
				timeout: 10000,
				complete: back
			});
			function back(data) {
				if (!domain.flag && data.status == 200) {
					domain.flag = true;
					domain.supplier = urlJson[i]['name'];
					domain.url = urlJson[i]['url'];
				}
			}
		}
	}
	this.getSourceUrl = function(name){
		let actionJson = this.domain.actionJson;
		let uri = "";
		for(let i = 0; i < actionJson.length; i++){
			if(actionJson[i]['name'] == name && this.domain.supplier == "jsdelivr"){
				uri = actionJson[i]['npmUri'];
			}else if(actionJson[i]['name'] == name){
				uri = actionJson[i]['uri'];
			}
		}
		return this.domain.url + uri;
	}
	this.loadJS = function(actionList){
		setTimeout(function(actionList,thisObj){
			if(thisObj.domain.flag && actionList != undefined){
				console.log("扩展库开始加载!");
				console.log(thisObj.domain);
				$.getScript("js/library.js",function(resp,status){
					if(status != "success"){
						thisObj.domain.loadErrorFlag = true;
					}
				});
				for(let i = 0; i < actionList.length; i++){
					let url = thisObj.getSourceUrl(actionList[i]);
					if(actionList[i].indexOf("css") != -1){
						thisObj.head.append($('<link rel="stylesheet" href="' + url + '" />')[0]);
					}else if(actionList[i].indexOf("js") != -1){
						$.getScript(url,function(resp,status){
							let last = actionList.length - 1;
							if(status == "success" && i == last){
								thisObj.domain.loadFlag = true;
							}else{
								thisObj.domain.loadErrorFlag = true;
							}
						});
					}
				}
				console.log("扩展库加载完成!")
			}else if(actionList != undefined){
				thisObj.loadJS(actionList);
			}
		},100,actionList,this);
	}
	this.loadPager = function(actionList){
		setTimeout(function(actionList,thisObj){
			if(thisObj.domain.loadFlag && actionList != undefined){
				console.log("开始初始化页面！")
				$.ajax({
					type: "get",
					url: "js/main.js",
					dataType: "script"
				})
				console.log("初始化页面完成！")
			}else if(actionList != undefined){
				thisObj.loadPager(actionList);
			}
		},200,actionList,this);
	}
	this.init = function (actionList){
		this.initRootUrl();//get frist url
		this.loadJS(actionList);//load js
		if(!this.domain.loadErrorFlag){
			this.loadPager(actionList);//init pager
		}else{
			this.init(actionList);
			console.log("扩展加载失败，等待重试！");
		}
	}
}