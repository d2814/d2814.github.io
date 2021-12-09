/* init page*/
var mediaUtil = new MediaUtil();
var classUtil = new HTMLClassUtil();
var cookieUtil = new CookieUtil();//load cookie util object



/* search */
var search = new Search();
for(let i = 0; i < search.searchBtnList.length; i++){
	search.searchBtnList[i].addEventListener("click",function() {
		search.searchDialog.toggle();
	});
}
search.searchForm[0].addEventListener('open.mdui.dialog', function() {
	search.searchTab.handleUpdate();
	search.searchInputInit();
});
search.searchForm[0].addEventListener('close.mdui.dialog', function() {
	search.searchTab.handleUpdate();
	search.searchInputDestory();
});
function subSearch(){
	if(search.searchInput.attr("stauts") != "init") return;
	if(search.searchInput.val() == "") return;
	search.progressStauts(search.getCurrentTableName(),null);
	let date = new Date();
	let h = "t=" + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
	$.ajax({
		url : '/search.json?' + h,
		dataType : 'json',
		type : 'get',
		success : callback
	})
	function callback(data){
		let currentTableName = search.getCurrentTableName();
		let findText = search.searchInput.val();
		search.clearTableData(currentTableName);
		for(let i = 0; i < data.length; i++){
			let text = (currentTableName != "accurate")?data[i][currentTableName]:data[i]['title'] + data[i]['content'];
			if(text.indexOf(findText) > -1){
				search.insertTableData(currentTableName,data[i]);
			}
		}
		search.progressStauts(currentTableName,"success");
	}
}
search.searchInput[0].addEventListener("input", subSearch);//!ie
search.searchInput[0].addEventListener("propertychange", subSearch);//ie
/* search */

/* menu */
var leftDrawer = new mdui.Drawer('#left-drawer');
document.getElementById("left-menu-btn").onclick = function(){
	leftDrawer.toggle();
}
$(".mdui-toolbar")[0].addEventListener("unpin.mdui.headroom",function(){
	if($(".mdui-drawer")[0] != undefined)
		classUtil.add($(".mdui-drawer")[0],"mdui-drawer-full-height");
});
$(".mdui-toolbar")[0].addEventListener("pin.mdui.headroom",function(){
	if($(".mdui-drawer")[0] != undefined)
		classUtil.remove($(".mdui-drawer")[0],"mdui-drawer-full-height");
});

if($("#catalogueBtn").length > 0){
	var catalogue = new Catalogue();
	$("#catalogueBtn")[0].addEventListener("click",function(){
		console.log($("#catalogueBtn").attr("stauts"));
		if($("#catalogueBtn").attr("stauts") == "on" || $("#catalogueBtn").attr("stauts") == undefined){
			catalogue.toggle();
		}
		$("#catalogueBtn").attr("stauts","on");
		setTimeout(function(){
			$("#catalogueBtn").attr("stauts","off");
			leftDrawer.open();
		},600);
	});
}
/* menu */

/* skin */
var skin = new Skin();//load skin object
//get default skin
var defaultSkin = (cookieUtil.getCookie("skin") != null)? cookieUtil.getCookie("skin") : skin.defaultSkinName;
//except dark mode skin fun
function switchSkin(){
	let switchSkin = $(this).attr("skin");
	let currentSkin = $("body").attr("skin");
	let lang = $("html").attr("lang");
	if(currentSkin != "dark"){
		$("body").attr("oldSkin",currentSkin);//record current skin to oldSkin
		skin.skinListFor(currentSkin, "off");//off current skin
		skin.switchListClassFor(currentSkin,"remove","mdui-list-item-active");//off current skin button
		skin.skinListFor(switchSkin, "on");//on new skin
		skin.switchListClassFor(switchSkin,"add","mdui-list-item-active");//on new skin button
		cookieUtil.addCookie("skin",switchSkin,"1y");//set skin to cookie
		skin.setFooterSkinText(switchSkin);
	}else{
		let data = [{lang:"zh-CN",msg:"请关闭夜间模式再尝试切换皮肤！"},
					{lang:"en-US",msg:"Please turn off night mode and try switching skin again!"}];
		let snackbarUtil = new SnackbarUtil();
		snackbarUtil.on(data,"top");
	}
}
//dark mode fun
function switchDarkSkin(){
	let currentSkin = $("body").attr("skin");
	let dark = new DarkSkin();
	if(currentSkin != "dark"){//open dark mode
		$("body").attr("oldSkin",currentSkin);//record current skin to oldSkin
		skin.skinListFor(currentSkin, "off");//off current skin
		cookieUtil.addCookie("oldSkin",currentSkin,"3h");//will current skin write oldSkin cookie
		dark.on();//dark mode open
		cookieUtil.addCookie("skin","dark","3h");//dark mode set cookie
		skin.setFooterSkinText("dark");
	}else{//close dark mode
		let oldSkin = (cookieUtil.getCookie("oldSkin") != null) ? cookieUtil.getCookie("oldSkin"):$("body").attr("oldSkin");
		dark.off();//dark mode closed
		skin.skinListFor(oldSkin, "on");//Restore historical skin 'oldSkin'
		cookieUtil.addCookie("skin",oldSkin,"1y");//write cookie
		cookieUtil.delCookie("oldSkin");//delete oldSkin
		skin.setFooterSkinText(oldSkin);
	}
}
//read cookies and initail skin
for(let i = 0; i < skin.skinNameList.length; i++){
	if(skin.skinNameList[i] == defaultSkin && defaultSkin != "dark"){//not dark mode load skin
		skin.skinListFor(skin.skinNameList[i], "on");//test
		skin.switchListClassFor(skin.skinNameList[i],"add","mdui-list-item-active");
	}else if(skin.skinNameList[i] == defaultSkin && defaultSkin == "dark"){//dark mode load dark skin
		skin.skinListFor(skin.skinNameList[i], "on");
		$(skin.skinSwitchDarkList[0]).attr("checked","checked");
	}
	if(i < skin.skinNameList.length - 1){//give skin button set listener
		$(skin.skinSwitchList[i]).attr("skin",skin.skinNameList[i]);
		skin.skinSwitchList[i].addEventListener("click",switchSkin);
	}
	if(i == skin.skinNameList.length - 1)//give dark skin button set listener
		skin.skinSwitchDarkList[0].addEventListener("click",switchDarkSkin);
}
skin.setFooterSkinText(defaultSkin);
/* skin */

/* goTop */
if($("#goTop").length > 0){
	var goTop = $("#goTop")[0];
	$(document).scroll(function(){
		if($(document).scrollTop() > 150){
			goTop.classList.remove("mdui-fab-hide");//show
		}else{
			goTop.classList.add("mdui-fab-hide");//hide
		}
	});
	goTop.addEventListener("click",function(){
		$("body,html").animate({scrollTop:10},350);
	});
}
/* goTop */

/* media */
mediaUtil.addAllMaxWidthListener(function(){
	let htmlClassUtil = new HTMLClassUtil();
	let post = $("#body .post");
	for(let i = 0; i < post.length; i++){
		for(let j = 0; j < 8; j++){
			htmlClassUtil.remove(post[i], "mdui-m-x-" + j);
		}
	}
	for(let i = 0; i < post.length; i++){
		if(mediaUtil.maxMedias[mediaUtil.xs].matches){
			// console.log('<=418');
			htmlClassUtil.add(post[i], "mdui-m-x-0");
		}else if(mediaUtil.maxMedias[mediaUtil.sm].matches){
			// console.log('>418 & <=600');
			htmlClassUtil.add(post[i], "mdui-m-x-0");
		}else if(mediaUtil.maxMedias[mediaUtil.md].matches){
			// console.log('>600 & <=1024');
			htmlClassUtil.add(post[i], "mdui-m-x-1");
		}else if(mediaUtil.maxMedias[mediaUtil.lg].matches){
			// console.log('> 1024 & <=1440');
			htmlClassUtil.add(post[i], "mdui-m-x-4");
		}else if(mediaUtil.maxMedias[mediaUtil.xl].matches){
			// console.log('> 1440 & <=1920');
			htmlClassUtil.add(post[i], "mdui-m-x-6");
		}else {
			// console.log('>1920');
			htmlClassUtil.add(post[i], "mdui-m-x-7");
		}
	}
});
mediaUtil.addAllMaxWidthListener(function(){
	let htmlClassUtil = new HTMLClassUtil();
	let pager = $("#body .pager")[0];
	for(let i = 0; i < 8; i++){
		htmlClassUtil.remove(pager, "mdui-m-x-" + i);
	}
	if(mediaUtil.maxMedias[mediaUtil.xs].matches){
		htmlClassUtil.add(pager, "mdui-m-x-0");
	}else if(mediaUtil.maxMedias[mediaUtil.sm].matches){
		htmlClassUtil.add(pager, "mdui-m-x-0");
	}else if(mediaUtil.maxMedias[mediaUtil.md].matches){
		htmlClassUtil.add(pager, "mdui-m-x-1");
	}else if(mediaUtil.maxMedias[mediaUtil.lg].matches){
		htmlClassUtil.add(pager, "mdui-m-x-6");
	}else if(mediaUtil.maxMedias[mediaUtil.xl].matches){
		htmlClassUtil.add(pager, "mdui-m-x-7");
	}else {
		htmlClassUtil.add(pager, "mdui-m-x-7");
	}
});
/* media */