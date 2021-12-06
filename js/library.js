function MediaUtil() {
	this.xs = 0; // 418px
	this.sm = 1; // 600px
	this.md = 2; // 1024px
	this.lg = 3; // 1440px
	this.xl = 4; // 1920px
	this.maxMedias = [
		window.matchMedia('(max-width:418px)'),
		window.matchMedia('(max-width:600px)'),
		window.matchMedia('(max-width:1024px)'),
		window.matchMedia('(max-width:1440px)'),
		window.matchMedia('(max-width:1920px)')
	]
	this.minMedias = [
		window.matchMedia('(min-width:418px)'),
		window.matchMedia('(min-width:600px)'),
		window.matchMedia('(min-width:1024px)'),
		window.matchMedia('(min-width:1440px)'),
		window.matchMedia('(min-width:1920px)')
	]
	this.addMaxWidthListener = function(index, fun) {
		this.maxMedias[index].addListener(fun);
		fun();
	}
	this.addMinWidthListener = function(index, fun) {
		this.minMedias[index].addListener(fun)
		fun();
	}
	this.addAllMaxWidthListener = function(fun) {
		for (let i = 0; i < 5; i++) {
			this.maxMedias[i].addListener(fun);
		}
		fun();
	}
	this.addAllMinWidthListener = function(fun) {
		for (let i = 0; i < 5; i++) {
			this.minMedias[i].addListener(fun);
		}
		fun();
	}
}

function HTMLClassUtil() {
	this.hasClass = function(obj, clazz) {
		let reg = new RegExp("\\b" + clazz + "\\b");
		return reg.test(obj.className);
	}
	this.add = function(obj, clazz) {
		if (obj == undefined || obj.className == undefined) return;
		if (!this.hasClass(obj, clazz)) {
			obj.className += " " + clazz;
		}
	}
	this.remove = function(obj, clazz) {
		if (obj == undefined || obj.className == undefined) return;
		let reg = new RegExp("\\b" + clazz + "\\b");
		if (this.hasClass(obj, clazz)) {
			obj.className = obj.className.replace(reg, "");
		}
	}
	this.toggle = function(obj, clazz) {
		if (this.hasClass(obj, clazz)) {
			this.remove(obj, clazz);
		} else {
			this.add(obj, clazz);
		}
	}
}

function CookieUtil() {
	this.path = "/";
	this.addCookie = function(name, value, time) {
		let strSec = this.getSec(time);
		let exp = new Date();
		exp.setTime(exp.getTime() + strSec * 1);
		document.cookie = name + "=" + value + "; expires=" + exp.toGMTString() + "; path=" + this.path;
	}
	this.addCookieAndPath = function(name, value, time, path) {
		this.path = path;
		let strSec = this.getSec(time);
		let exp = new Date();
		exp.setTime(exp.getTime() + strSec * 1);
		document.cookie = name + "=" + value + "; expires=" + exp.toGMTString() + "; path=" + this.path;
	}
	this.getCookie = function(name) {
		let strCookies = document.cookie;
		let array = strCookies.split(';');
		for (let i = 0; i < array.length; i++) {
			let item = array[i].replace(" ", "").split('=');
			if (item[0] == name) return item[1];
		}
		return null;
	}
	this.delCookie = function(name) {
		let exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var restul = this.getCookie(name);
		if (restul != null) {
			document.cookie = name + "=" + "value" + "; expires=" + exp.toGMTString();
		}
	}
	this.getSec = function(str) {
		var str1 = str.substr(0, str.length - 1); //时间数值 
		var str2 = str.substr(str.length - 1, 1); //时间单位
		if (str2 == "s") {
			return str1 * 1000;
		} else if (str2 == "m") {
			return str1 * 60 * 1000;
		} else if (str2 == "h") {
			return str1 * 60 * 60 * 1000;
		} else if (str2 == "d") {
			return str1 * 24 * 60 * 60 * 1000;
		} else if (str2 == "M") {
			return str1 * 31 * 24 * 60 * 60 * 1000;
		} else if (str2 == "y") {
			return str1 * 365 * 24 * 60 * 60 * 1000;
		}
	}
}

//prism.min.css  default  (默认)灰
//prism-dark.min.css  dark 褐
//prism-funky.min.css funky 隐藏主题
//prism-okaidia.min.css  okaidia 黑背景彩
//prism-twilight.min.css twilight 黑背景土褐
//prism-coy.min.css  coy 条纹
//prism-solarizedlight.min.css  solarizedlight 暖
//prism-tomorrow.min.css  tomorrow 黑背景紫
function CodeTheme() {
	this.nameList = ["default", "dark", "funky", "okaidia", "twilight", "coy", "solarizedlight", "tomorrow"];
	this.cssList = ["prism.min.css", "prism-dark.min.css", "prism-funky.min.css", "prism-okaidia.min.css",
		"prism-twilight.min.css", "prism-coy.min.css", "prism-solarizedlight.min.css", "prism-tomorrow.min.css"
	];
	this.linkList = $("link"); //css link list
	this.getCss = function(name) {
		for (let i = 0; i < this.nameList.length; i++) {
			if (this.nameList[i] == name) {
				return this.cssList[i];
			}
		}
		return this.cssList[0];
	}
	this.cut = function(name) {
		for (let i = 0; i < this.linkList.length; i++) {
			let items = this.linkList[i]["href"].split("/");
			for (let j = items.length - 1; j >= 0; j--) {
				if (items[j - 1] == "themes") {
					$(this.linkList[i]).attr("href", this.linkList[i]["href"].replace(items[j], this.getCss(name)));
				}
			}
		}
	}
}

function DarkSkin() {
	this.htmlClassUtil = new HTMLClassUtil();
	this.codeTheme = new CodeTheme();
	this.body = $("body"); //页面
	this.idHeader = $("#header"); //头部
	this.idBody = $("#body"); //内容
	this.pager = $("#body .pager"); //分页器
	this.idFooter = $("#footer"); //页脚
	this.on = function() {
		this.htmlClassUtil.add(this.body[0], "mdui-theme-layout-dark");
		this.htmlClassUtil.add(this.body[0], "mdui-theme-accent-deep-purple");
		this.htmlClassUtil.add(this.idBody[0], "mdui-color-grey-800");
		if (this.pager.length > 0) this.htmlClassUtil.add(this.pager[0], "pager-theme-dark");
		this.body.attr("skin", "dark");
		this.codeTheme.cut("okaidia");
	}
	this.off = function() {
		this.htmlClassUtil.remove(this.body[0], "mdui-theme-layout-dark");
		this.htmlClassUtil.remove(this.body[0], "mdui-theme-accent-deep-purple");
		this.htmlClassUtil.remove(this.idBody[0], "mdui-color-grey-800");
		if (this.pager.length > 0) this.htmlClassUtil.remove(this.pager[0], "pager-theme-dark");
		this.body.removeAttr("skin");
	}
	this.toggle = function() {
		if (this.body.attr("skin") == "dark") {
			this.off();
		} else {
			this.on();
		}
	}
}

function IndigoSkin() {
	this.htmlClassUtil = new HTMLClassUtil();
	this.codeTheme = new CodeTheme();
	this.body = $("body"); //页面
	this.idHeader = $("#header"); //头部
	this.idBody = $("#body"); //内容
	this.pager = $("#body .pager"); //分页器
	this.idFooter = $("#footer"); //页脚
	this.on = function() {
		this.htmlClassUtil.add(this.body[0], "mdui-theme-primary-indigo");
		this.htmlClassUtil.add(this.body[0], "mdui-theme-accent-indigo");
		this.htmlClassUtil.add(this.body[0], "body-grey");
		if (this.pager.length > 0) this.htmlClassUtil.add(this.pager[0], "pager-theme-indigo");
		this.body.attr("skin", "indigo");
		this.codeTheme.cut("coy");
	}
	this.off = function() {
		this.htmlClassUtil.remove(this.body[0], "mdui-theme-primary-indigo");
		this.htmlClassUtil.remove(this.body[0], "mdui-theme-accent-indigo");
		this.htmlClassUtil.remove(this.body[0], "body-grey");
		if (this.pager.length > 0) this.htmlClassUtil.remove(this.pager[0], "pager-theme-indigo");
		this.body.removeAttr("skin");
	}
	this.toggle = function() {
		if (this.body.attr("skin") == "indigo") {
			this.off();
		} else {
			this.on();
		}
	}
}

function DeepPurpleSkin() {
	this.htmlClassUtil = new HTMLClassUtil();
	this.codeTheme = new CodeTheme();
	this.body = $("body"); //页面
	this.idHeader = $("#header"); //头部
	this.idBody = $("#body"); //内容
	this.pager = $("#body .pager"); //分页器
	this.idFooter = $("#footer"); //页脚
	this.on = function() {
		this.htmlClassUtil.add(this.body[0], "mdui-theme-primary-deep-purple");
		this.htmlClassUtil.add(this.body[0], "mdui-theme-accent-deep-purple");
		this.htmlClassUtil.add(this.body[0], "body-grey");
		if (this.pager.length > 0) this.htmlClassUtil.add(this.pager[0], "pager-theme-deep-pupler");
		this.body.attr("skin", "deep-purple");
		this.codeTheme.cut("default");
	}
	this.off = function() {
		this.htmlClassUtil.remove(this.body[0], "mdui-theme-primary-deep-purple");
		this.htmlClassUtil.remove(this.body[0], "mdui-theme-accent-deep-purple");
		this.htmlClassUtil.remove(this.body[0], "body-grey");
		if (this.pager.length > 0) this.htmlClassUtil.remove(this.pager[0], "pager-theme-deep-pupler");
		this.body.removeAttr("skin");
	}
	this.toggle = function() {
		if (this.body.attr("skin") == "deep-purple") {
			this.off();
		} else {
			this.on();
		}
	}
}

function PurpleSkin() {
	this.htmlClassUtil = new HTMLClassUtil();
	this.codeTheme = new CodeTheme();
	this.body = $("body"); //页面
	this.idHeader = $("#header"); //头部
	this.idBody = $("#body"); //内容
	this.pager = $("#body .pager"); //分页器
	this.idFooter = $("#footer"); //页脚
	this.on = function() {
		this.htmlClassUtil.add(this.body[0], "mdui-theme-primary-purple");
		this.htmlClassUtil.add(this.body[0], "mdui-theme-accent-purple");
		this.htmlClassUtil.add(this.body[0], "body-grey");
		if (this.pager.length > 0) this.htmlClassUtil.add(this.pager[0], "pager-theme-pupler");
		this.body.attr("skin", "purple");
		this.codeTheme.cut("coy");
	}
	this.off = function() {
		this.htmlClassUtil.remove(this.body[0], "mdui-theme-primary-purple");
		this.htmlClassUtil.remove(this.body[0], "mdui-theme-accent-purple");
		this.htmlClassUtil.remove(this.body[0], "body-grey");
		if (this.pager.length > 0) this.htmlClassUtil.remove(this.pager[0], "pager-theme-pupler");
		this.body.removeAttr("skin");
	}
	this.toggle = function() {
		if (this.body.attr("skin") == "purple") {
			this.off();
		} else {
			this.on();
		}
	}
}

function SkyspacesSkin() {
	this.htmlClassUtil = new HTMLClassUtil();
	this.codeTheme = new CodeTheme();
	this.body = $("body"); //页面
	this.idHeader = $("#header"); //头部
	this.idBody = $("#body"); //内容
	this.pager = $("#body .pager"); //分页器
	this.idFooter = $("#footer"); //页脚
	this.on = function() {
		this.htmlClassUtil.add(this.body[0], "skyspaces-body");
		this.htmlClassUtil.add(this.body[0], "mdui-theme-accent-light-blue");
		if (this.pager.length > 0) this.htmlClassUtil.add(this.pager[0], "pager-theme-skyspaces");
		this.body.attr("skin", "skyspaces");
		this.codeTheme.cut("default");
	}
	this.off = function() {
		this.htmlClassUtil.remove(this.body[0], "skyspaces-body");
		this.htmlClassUtil.remove(this.body[0], "mdui-theme-accent-light-blue");
		if (this.pager.length > 0) this.htmlClassUtil.remove(this.pager[0], "pager-theme-skyspaces");
		this.body.removeAttr("skin");
	}
	this.toggle = function() {
		if (this.body.attr("skin") == "skyspaces") {
			this.off();
		} else {
			this.on();
		}
	}
}

function Skin() {
	this.htmlClassUtil = new HTMLClassUtil();
	this.skinSwitchDarkList = $("#left-tab1 .mdui-switch input"); //夜间模式按钮
	this.skinSwitchList = $("#left-tab2 .mdui-list .mdui-list-item"); //皮肤按钮
	this.skinNameList = ["indigo", "deep-purple", "purple", "skyspaces", "dark"]; //皮肤名称列表 注意:dark放最后
	this.skinList = [new IndigoSkin(), new DeepPurpleSkin(), new PurpleSkin(), new SkyspacesSkin(),
new DarkSkin()]; //皮肤对应名称实体对象
	this.defaultSkinName = "indigo"; //默认皮肤
	this.skinListFor = function(skinName, method) { //操作皮肤开/关/交换
		for (let i = 0; i < this.skinNameList.length; i++) {
			if (this.skinNameList[i] == skinName) {
				switch (method) {
					case "on":
						this.skinList[i].on();
						break;
					case "off":
						this.skinList[i].off();
						break;
					case "toggle":
						this.skinList[i].toggle();
						break;
					default:
						console.log("skin not function!");
						break;
				}
			}
		}
	}
	this.switchListFor = function(skinName, method, parameter, value) { //操作选项属性
		for (let i = 0; i < this.skinSwitchList.length; i++) {
			if (this.skinNameList[i] == skinName && method == "add") {
				$(this.skinSwitchList[i]).attr(parameter, value);
			} else if (this.skinNameList[i] == skinName && method == "remove") {
				$(this.skinSwitchList[i]).removeAttr(parameter);
			}
		}
	}
	this.switchListClassFor = function(skinName, method, clazz) { //操作选项Class属性
		for (let i = 0; i < this.skinSwitchList.length; i++) {
			if (this.skinNameList[i] == skinName && method == "add") {
				this.htmlClassUtil.add(this.skinSwitchList[i], clazz);
			} else if (this.skinNameList[i] == skinName && method == "remove") {
				this.htmlClassUtil.remove(this.skinSwitchList[i], clazz);
			}
		}
	}
	this.setFooterSkinText = function(skinName) {
		$($("#footer .skin")[0]).html("");
		$($("#footer .skin")[0]).append(skinName);
	}
}

function SnackbarUtil() {
	this.lang = $("html").attr("lang");
	this.defaultLang = "en-US";
	this.getDefaultMsg = function(obj) {
		for (let i = 0; i < obj.length; i++) {
			if (obj[i]['lang'] == this.defaultLang) {
				return obj[i]['msg'];
			}
		}
	}
	this.getMsg = function(obj) {
		for (let i = 0; i < obj.length; i++) {
			if (obj[i]['lang'] == this.lang) {
				return obj[i]['msg'];
			}
			if (i == obj.length - 1) {
				return this.getDefaultMsg(obj);
			}
		}
		return "error: " + obj;
	}
	this.on = function(obj, pos) {
		let msg = this.getMsg(obj);
		mdui.snackbar({
			message: msg,
			position: pos
		});
	}
}

function Search() {
	this.searchForm = $("#search-form");
	this.searchDialog = new mdui.Dialog('#search-form');
	this.searchTab = new mdui.Tab('#search-tab');
	this.searchBtnList = $(".search-btn");
	this.searchInput = $("#search-input");
	this.tableNameList = ["title", "content", "accurate"];
	this.tableIDList = ["search-tab1", "search-tab2", "search-tab3"];
	this.tableDataList = $("#search-form .list");
	this.searchInputInit = function() {
		this.searchInput.attr("stauts", "init");
	}
	this.searchInputDestory = function() {
		this.searchInput.removeAttr("stauts");
	}
	this.getCurrentTableName = function() {
		for (let i = 0; i < this.tableNameList.length; i++) {
			let dis = $($("#" + this.tableIDList[i])[0]).css("display");
			if (dis != "none") {
				return this.tableNameList[i];
			}
		}
		return undefined;
	}
	this.getTable = function(tableName) {
		for (let i = 0; i < this.tableNameList.length; i++) {
			if (tableName == this.tableNameList[i]) {
				return $("#" + this.tableIDList[i]);
			}
		}
		return undefined;
	}
	this.getTableData = function(tableName) {
		for (let i = 0; i < this.tableNameList.length; i++) {
			if (tableName == this.tableNameList[i]) {
				return this.tableDataList[i];
			}
		}
	}
	this.insertTableData = function(tableName, data) {
		let findText = this.searchInput.val();
		let textLength = this.searchInput.val().length;
		let tableData = $(this.getTableData(tableName));
		let title = data['title'];
		let content = data['content'];
		let temp = '<span class="find-text">' + findText + '</span>';
		switch (tableName) {
			case "title":
				title = title.replace(eval("/" + findText + "/g"), temp);
				break;
			case "content":
				let index = content.indexOf(findText);
				let begin = (index < 2) ? 0 : index / 2;
				let end = (index + textLength + 100 < content.length) ? index + textLength + 100 : content.length;
				content = content.slice(begin, end);
				content = content.replace(eval("/" + findText + "/g"), temp);
				break;
			case "accurate":
				title = title.replace(eval("/" + findText + "/g"), temp);
				content = content.replace(eval("/" + findText + "/g"), temp);
				break;
		}
		let a = $('<a target="_blank" class="mdui-text-color-theme-text" href="' + data['url'] + '"></a>');
		let td = $('<td><i class="mdui-icon material-icons">&#xe264;</i></td>');
		let tr = $('<tr></tr>');
		a.append(title);
		td.append(a);
		tr.append(td);
		tableData.append(tr);
		if (tableName == "content" || tableName == "accurate") {
			a = $('<a target="_blank" class="mdui-text-color-theme-text" href="' + data['url'] + '"></a>');
			td = $('<td><i class="mdui-icon material-icons">&#xe315;</i></td>');
			tr = $('<tr></tr>');
			a.append(content);
			td.append(a);
			tr.append(td);
			tableData.append(tr);
		}
	}
	this.clearTableData = function(tableName) {
		let tableData = this.getTableData(tableName);
		$(tableData).empty();
	}
	this.progressStauts = function(tableName, code) {
		for (let i = 0; i < this.tableNameList.length; i++) {
			if (tableName == this.tableNameList[i]) {
				let pro = $("#" + this.tableIDList[i] + " .mdui-progress");
				if (code == "success") {
					setTimeout(function(pro) {
						pro.empty();
						pro.append('<div class="mdui-progress-determinate" style="width: 100%;"></div>');
					}, 1200, pro);
				} else {
					pro.empty();
					pro.append('<div class="mdui-progress-indeterminate"></div>');
				}

			}
		}
	}
}

function Catalogue() {
	this.leftMenu = $("#left-menu");
	this.catalogue = $("#catalogue");
	this.show = function() {
		this.catalogue.attr("stauts", "show");
		this.leftMenu.css("display", "none");
		this.catalogue.css("display", "");
	}
	this.hide = function() {
		this.catalogue.removeAttr("stauts");
		this.leftMenu.css("display", "");
		this.catalogue.css("display", "none");
	}
	this.toggle = function() {
		if (this.catalogue.attr("stauts") != "show") {
			this.show();
			let data = [{
					lang: "zh-CN",
					msg: "双击此按钮切换主菜单！"
				},
				{
					lang: "en-US",
					msg: "Double-click the button to switch to main menu!"
				}
			];
			let snackbarUtil = new SnackbarUtil();
			snackbarUtil.on(data, "top");
		} else {
			this.hide();
			let data = [{
					lang: "zh-CN",
					msg: "双击此按钮切换文章目录！"
				},
				{
					lang: "en-US",
					msg: "Double-click the button to switch to article directory!"
				}
			];
			let snackbarUtil = new SnackbarUtil();
			snackbarUtil.on(data, "top");
		}
	}
}