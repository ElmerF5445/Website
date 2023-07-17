/*
	DL_Javascript.js
	This file contains all the JavaScript functionality for Doodle Launcher
*/

/* ESSENTIAL CODE */
var VersionTitle = "English Society";
var VersionNumber = "1.0";
var ContinuityVersionNumber = "1.0"
var BuildNumber = 0;
var CopyrightTitle = "Content By ElmerF 2023";
var ELMSUIVersion = "1.5";
var CompilationDate = "December 1, 2022";
var path = window.location.pathname;
var PageName = path.split("/").pop();
var enable_Dev_Counter = true;

var dev_debug_ElementOutlines = 0;

/* Page Properties */
var pageProperty_MenuName = "English Society"; // Refers to the name displayed on the main menu
var pageProperty_PageTitle = "Articles"; // Refers to the page name to be displayed
var pageProperty_enableGreetings = 0; // Refers to whether the greeting text is to be updated or not
var pageProperty_enableSidebar = 0; // Refers to whether the sidebar and sidebar toggle will be used
var pageProperty_enableCategoryLabelIcons = 0; // Refers to whether the icons besides category tabs should appear
var pageProperty_lockSidebar = 0; // Refers to whether the sidebar will have a contracted and expanded state or a closed and open-fixed-size state
var pageProperty_enableStatusBar = 0; // Refers to whether the status bar at the right side of the header will be shown
var pageProperty_enableClockScreen = 0; // Refers to whether the session screen should appear
var pageProperty_useProfileSystem = 0; // Refers to whether the page will use the profile system introduced in Doodle Launcher
var pageProperty_useSettingsSystem = 0; // Refers to whether the page will use the personalized settings system. Disabling will set all properties to default and :root values
var pageProperty_sidebarExpandedWidth = 250; // Refers to the width of the sidebar when expanded. Requires pageProperty_enableStatusBar = 1
var pageProperty_sidebarCompactedWidth = 50; // Refers to the width of the sidebar when compacted. Requires pageProperty_enableStatusBar = 1
var pageProperty_backgroundState = 0; // Refers to the state of the background for the page. 0 = Solid color, BGColor-General value will be used; 1 = Wallpaper, BG-WallpaperImg will be used; 2 = Wallpaper is shown with blur effect, BG-WallpaperImg, BGColor-Opacitated, and Element-BackdropBlur will be used
var pageProperty_enableCategoryNavigation = 0; // Refers to whether the page uses the category navigation system to generate the sidebar links
var pageProperty_pageIcon = "placeholder.png"; // Refers to the icon that will be displayed on the header, favicon, and loading screen
var pageProperty_enableLoadingScreen = 1; // Refers whether the loading screen will be displayed
var pageProperty_mainContentWidth = 100; // Refers to the width (in %) of the main content div (.Page_MainContent). The value sets to 100% when the window size is set to small.
var pageProperty_enableHeader = 1; // Refers to whether the header will be displayed in the page
var pageProperty_sidebarMoveContent = 0; // Refers to whether the main content moves when the sidebar is opened
var pageProperty_enableQuickSearch = 0; // Refers to whether to display the quick search bar when Ctrl + Shift is pressed.
var pageProperty_quickSearch_addTopPadding = 1; // Refers to whether the quick search bar will have a top padding to give space to the Header element. If pageProperty_enableHeader is set to 0, this property is set to 0.


var Behavior_EnableBlurEffects;
var Behavior_DisplayTimeAndDate;
var Behavior_DisplayBattery;
var Behavior_DisplayInternetStatus;
var Behavior_NotifyForUpdates;
var Behavior_DisplayCategoryNavigation;
var Behavior_DisplaySearchBar;
var Behavior_DisplaySearchBar_PreferredEngine;
var Behavior_DisplayToasts;
var Behavior_DisplayGreetings;
var Behavior_DisplayGreetings_DisplayName;
var Behavior_DisplayGreetings_DisplayName_Text;
var Behavior_SE_CloseWindowAfterAction;
var Behavior_SE_ClearFieldsAfterCreation;
var Appearance_Behavior_BlurHomeWallpaper;


function OnloadTasks(){
	startTime();
	startDate();
	displayDay();
	// close_LoadingScreen();
	sessionCheck();
	var path = window.location.pathname;
	var PageName = path.split("/").pop();
	console.log("Welcome to "+VersionTitle+" "+VersionNumber+" ("+ContinuityVersionNumber+"). Copyright "+CopyrightTitle);
	generate_Launcher_HeaderButtons(PageName);
	console.log("Setting page properties for page '" + PageName + "'...");
	switch (PageName){
		case "ES_Template_2.html":
			pageProperty_pageIcon = "ES_JC.png";
			pageProperty_MenuName = "Journalism Committee";
			pageProperty_PageTitle = "Article";
		break;
		
	}
	generate_Launcher_NavigationList();
	SetPageProperties();
}



function SetPageProperties(){
	
	
	if (pageProperty_enableHeader == 0){
		document.getElementById("pageElement_Header").style.display = "none";
		document.getElementById("pageElement_Content").style.marginTop = "0px";
		document.getElementById("pageElement_Content").style.height = "100%";
		pageProperty_enableSidebar = 0;
		pageProperty_quickSearch_addTopPadding = 0;
		console.log("pageProperty_enableHeader is disabled; pageProperty_enableSidebar is disabled; pageProperty_quickSearch_addTopPadding is disabled");
	}
	
	var SetPageProperties_Header_SidebarToggleValue = "50px";
	var SetPageProperties_Header_StatusBarValue = "auto";
	var SetPageProperties_Header_Value;
	if (pageProperty_enableSidebar == 0){
		document.getElementById("pageElement_Header_SidebarToggle").style.visibility = "hidden";
		document.getElementById("pageElement_Sidebar").style.display = "none";
		console.log("pageProperty_enableSidebar is disabled");
		document.getElementById("pageElement_Content").style.marginLeft = "0px";
		document.getElementById("pageElement_Content").style.marginLeft = "0px";
		
		
		SetPageProperties_Header_SidebarToggleValue = "0px";
		document.getElementById("pageElement_Content").style.gridTemplateColumns = "0px 1fr";
		console.log("Sidebar is disabled");
	}
	
	if (pageProperty_lockSidebar == 1){
		document.getElementById("pageElement_Sidebar").style.width = "0px";
		document.getElementById("pageElement_Content").style.marginLeft = "0px"
		console.log("Sidebar is locked");
	}
	
	SetPageProperties_Header_Value = SetPageProperties_Header_SidebarToggleValue + " auto 1fr "+SetPageProperties_Header_StatusBarValue;
	document.getElementById("pageElement_Header").style.gridTemplateColumns = SetPageProperties_Header_Value;
	
	if (pageProperty_enableHeader == 0){
		document.getElementById("pageElement_Header").style.display = "none";
		document.getElementById("pageElement_Content").style.marginTop = "0px";
		pageProperty_enableSidebar = 0;
	}
	
	
	if (pageProperty_backgroundState == 0){
		var stylesheet = document.querySelector('.MainPage');
		stylesheet.style.setProperty("background-image", "none");
		var stylesheet2 = document.querySelector(':root');
		stylesheet2.style.setProperty("--BG-WallpaperImg", "none");
	}
	if (pageProperty_backgroundState == 2){
		document.getElementById("pageElement_BlurBG").style.display = "block";
		console.log("pageProperty_backgroundState has been set to background blur");
	}
	
	document.getElementById("pageElement_Header_MainMenu_Textbox_Content_PageName").innerHTML = pageProperty_MenuName;
	
	document.getElementById("Header_PageNavi_Title").innerHTML = pageProperty_PageTitle;
	document.getElementById("Header_MainMenu_PageName_Text").innerHTML = pageProperty_PageTitle;
	
	
	document.getElementById("pageElement_favicon").setAttribute("href", "Assets/Icons/"+pageProperty_pageIcon);
	document.getElementById("Header_PageIcon").src = "Assets/Icons/"+pageProperty_pageIcon;
	document.getElementById("Header_MainMenu_PageName_Icon").src = "Assets/Icons/"+pageProperty_pageIcon;
	
	document.getElementById("Page_MainContent").style.width = pageProperty_mainContentWidth + "%";
	
	console.log("Page properties has been set successfully");
	check_WindowSize_test();
	set_Version_General();
	
}

function generate_Launcher_NavigationList(){
	let navigationListItems = ["Old UI", "Home", "Shortcut Editor", "Settings", "Pomodoro Timer", "Watermark Applier", "Template V1", "Shortcut Editor Dev"]; //Launcher navigation text
	let navigationListItems_Link = ["file:///C:/Users/Elmer%20Jr%20G%20Felisilda/Documents/HTML%20Projects/Doodle%20Launcher/DL_Main.html", "DL_Main.html", "DL_ShortcutEditor.html", "DL_Settings.html", "DL_PomodoroTimer.html", "WA_Main.html", "DL_Template_V1.html", "DL_ShortcutEditor_Dev.html"]; //Launcher navigation links
	let navigationListItems_Icon = ["favicon_old.png", "favicon_old.png", "favicon_old.png", "favicon_old.png", "favicon_old.png", "favicon_old.png", "favicon_old.png", "favicon_old.png"];
	
	for (var i = 0; i < navigationListItems.length; i++) {
		var navigationListItems_Select = navigationListItems[i]; //Contains the selected pagenavi text
		var navigationListItems_Link_Select = navigationListItems_Link[i]; //Contains the selected pagenavi link
		
		//Attaches to the page
		var listItemLink = document.createElement('a'); //Creates an a element
		listItemLink.href = navigationListItems_Link_Select; //Adds the link
		listItemLink.setAttribute("id", "pageElement_PageNaviList_Item_"+i); //Adds an id to attach the text
		document.getElementById("pageElement_MainMenu_NavigationList").appendChild(listItemLink); //Attaches the a element to the page navi element
		
		var listItemLink_Div = document.createElement('div');
		listItemLink_Div.classList.add("Header_MainMenu_Navigation_Item");
		listItemLink_Div.setAttribute("id", "pageElement_PageNaviList_Item_Div_"+i);
		document.getElementById("pageElement_PageNaviList_Item_"+i).appendChild(listItemLink_Div);
		
		listItemLink_Icon = document.createElement('img');
		listItemLink_Icon.src = "Assets/Icons/"+ navigationListItems_Icon[i];
		listItemLink_Icon.classList.add("Header_MainMenu_Navigation_Item_Icon");
		document.getElementById("pageElement_PageNaviList_Item_Div_"+i).appendChild(listItemLink_Icon);
		
		var listItemLink_Text = document.createElement('p'); //Creates a text p element
		listItemLink_Text.innerHTML = navigationListItems_Select; //Sets text to selected page navi text
		listItemLink_Text.classList.add("Header_MainMenu_Navigation_Item_Text"); //Adds the styling to the object
		document.getElementById("pageElement_PageNaviList_Item_Div_"+i).appendChild(listItemLink_Text); //Attaches object to the a object
	}
	
	
}

function generate_Launcher_HeaderButtons(pageName){
	let Generator_HeaderButtons_Text = [];
	let Generator_HeaderButtons_Icon = [];
	let Generator_HeaderButtons_ID = [];
	let Generator_HeaderButtons_OnclickAction = [];
	switch (pageName){
		case "DL_Template_V1.html":
			Generator_HeaderButtons_Text = ["Button 1", "Button 2", "Button 3", "Button 4", "Button 5", "Button 6"];
			Generator_HeaderButtons_Icon = ["Assets/Icons/placeholder.png", "Assets/Icons/placeholder.png", "Assets/Icons/placeholder.png", "Assets/Icons/placeholder.png", "Assets/Icons/placeholder.png", "Assets/Icons/placeholder.png"];
			Generator_HeaderButtons_ID = ["", "", "", "", "", ""];
			Generator_HeaderButtons_OnclickAction = ["toggle_SearchBar()", "toggle_Sidebar_CategoryNavigation()", "", "", "", ""];
			var Generator_DisplayInHeader = true;
		break;
		case "DL_Main.html":
			Generator_HeaderButtons_Text = ["Internet search"];
			Generator_HeaderButtons_Icon = ["Assets/Icons/placeholder.png"];
			Generator_HeaderButtons_ID = [""];
			Generator_HeaderButtons_OnclickAction = ["toggle_SearchBar()"];
			var Generator_DisplayInHeader = false;
		break;
		case "DL_ShortcutEditor_Dev.html":
			Generator_HeaderButtons_Text = ["Add Item", "Re-order categories", "Re-order shortcuts", "How to use"];
			Generator_HeaderButtons_Icon = ["Assets/Icons/placeholder.png", "Assets/Icons/placeholder.png", "Assets/Icons/placeholder.png", "Assets/Icons/placeholder.png"];
			Generator_HeaderButtons_ID = ["AddItem", "SwapList_Category", "Swaplist_Shortcut", "Tutorial_ShortcutEditor"];
			Generator_HeaderButtons_OnclickAction = ["open_Subwindow(this.id)", "open_Subwindow(this.id)", "open_Subwindow(this.id)", "open_Subwindow(this.id)"];
			var Generator_DisplayInHeader = true;
		break;
		case "DL_Settings.html":
			Generator_HeaderButtons_Text = ["Save changes"];
			Generator_HeaderButtons_Icon = ["Assets/Icons/icon_ExperimentalFeature.png"];
			Generator_HeaderButtons_ID = [""];
			Generator_HeaderButtons_OnclickAction = ["Settings_ApplyChanges()"];
			var Generator_DisplayInHeader = true;
		break;
		case "WA_Main.html":
			Generator_HeaderButtons_Text = ["Take Screenshot", "Import File Names", "Import Watermark Names" , "Change Image", "Change Watermark", "Reset"];
			Generator_HeaderButtons_Icon = ["Assets/Icons/placeholder.png", "Assets/Icons/placeholder.png", "Assets/Icons/placeholder.png", "Assets/Icons/placeholder.png", "Assets/Icons/placeholder.png", "Assets/Icons/placeholder.png"];
			Generator_HeaderButtons_ID = ["", "", "", "", "", ""];
			Generator_HeaderButtons_OnclickAction = ["generateImage()", "open_Subwindow('ImportFileNames')", "open_Subwindow('ImportWatermarkNames')", "open_Subwindow('ChangeImageFile')", "open_Subwindow('ChangeWatermarkFile')", "WA_Reset()"];
			var Generator_DisplayInHeader = true;
		break;
	}
	
	for (a = 0; a != Generator_HeaderButtons_ID.length; a++){
		if (Generator_HeaderButtons_ID[a] == ""){
			Generator_HeaderButtons_ID[a] = "Header_Button_NoSpecifiedID_"+a;
		}
	}
	
	if(Generator_DisplayInHeader == true){
		for (a = 0; a != Generator_HeaderButtons_Text.length; a++){
			//Attaches to the page
			var listItemLink_Div = document.createElement('div');
			listItemLink_Div.classList.add("Header_Content_Button");
			listItemLink_Div.setAttribute("id", Generator_HeaderButtons_ID[a]);
			listItemLink_Div.setAttribute("onclick", Generator_HeaderButtons_OnclickAction[a]);
			document.getElementById("pageElement_Header_Actions").appendChild(listItemLink_Div);
			
			listItemLink_Icon = document.createElement('img');
			listItemLink_Icon.src = Generator_HeaderButtons_Icon[a];
			listItemLink_Icon.classList.add("Header_Content_Button_Icon");
			document.getElementById(Generator_HeaderButtons_ID[a]).appendChild(listItemLink_Icon);
			
			var listItemLink_Text = document.createElement('h3'); //Creates a text p element
			listItemLink_Text.innerHTML = Generator_HeaderButtons_Text[a]; //Sets text to selected page navi text
			listItemLink_Text.classList.add("Header_Content_Button_Text"); //Adds the styling to the object
			document.getElementById(Generator_HeaderButtons_ID[a]).appendChild(listItemLink_Text); //Attaches object to the a object
		}
	}
	
	for (i = 0; i != Generator_HeaderButtons_Text.length; i++){		
		//Attaches to the page
		var listItemLink_Div = document.createElement('div');
		listItemLink_Div.classList.add("Header_MainMenu_Navigation_Item");
		listItemLink_Div.setAttribute("id", "pageElement_PageActionsList_Item_Div_"+i);
		listItemLink_Div.setAttribute("onclick", Generator_HeaderButtons_OnclickAction[i]);
		document.getElementById("pageElement_PageActionsList").appendChild(listItemLink_Div);
		
		listItemLink_Icon = document.createElement('img');
		listItemLink_Icon.src = Generator_HeaderButtons_Icon[i];
		listItemLink_Icon.classList.add("Header_MainMenu_Navigation_Item_Icon");
		document.getElementById("pageElement_PageActionsList_Item_Div_"+i).appendChild(listItemLink_Icon);
		
		var listItemLink_Text = document.createElement('p'); //Creates a text p element
		listItemLink_Text.innerHTML = Generator_HeaderButtons_Text[i]; //Sets text to selected page navi text
		listItemLink_Text.classList.add("Header_MainMenu_Navigation_Item_Text"); //Adds the styling to the object
		document.getElementById("pageElement_PageActionsList_Item_Div_"+i).appendChild(listItemLink_Text); //Attaches object to the a object
	}
	
}

function tabs_DisplayFirstPage(){
	if (document.querySelectorAll(".Tab_Container") != null){
		var Tab_Container = document.querySelectorAll(".Tab_Container");
		for (a = 1; a != Tab_Container.length; a++){
			Tab_Container[a].style.display = "none";
			
		}
	}
}

function trigger_ChangeTab_test(ID){
	var Tab_Container = document.querySelectorAll(".Tab_Container");
	var Sidebar_Icon = document.querySelectorAll(".Sidebar_Item_Icon");
	var Sidebar_Letters = document.querySelectorAll(".Sidebar_Item_Letter");
	for (a = 0; a != Tab_Container.length; a++){
		Tab_Container[a].style.display = "none";
		
	}
	for (b = 0; b != Sidebar_Icon.length; b++){
		Sidebar_Icon[b].style.backgroundColor = "var(--BGColor-Buttons)";
	}
	for (c = 0; c != Sidebar_Letters.length; c++){
		Sidebar_Letters[c].style.backgroundColor = "var(--BGColor-Buttons)";
	}
	var selectedTab = document.getElementById("tab_"+ID);
	selectedTab.style.display = "block";
	selectedTab.style.animationName = "opening_pageTab";
	selectedTab.style.animationDuration = "0.3s";
	selectedTab.style.animationFillMode = "forwards";
	var selectedIcon = document.getElementById("tabIcon_"+ID);
	selectedIcon.style.backgroundColor = "var(--Accent-Color)";
}

var windowSizePreset = "normal";
var windowDeviceType = "Desktop";
window.addEventListener('resize', check_WindowSize_test);
let details = navigator.userAgent;
let regexp = /android|iphone|kindle|ipad/i;
let isMobileDevice = regexp.test(details);
function check_WindowSize_test(){
	var Content = document.getElementById("pageElement_Content");
	var MainContent = document.getElementById("Page_MainContent");
	var Header = document.getElementById("pageElement_Header");
	var Header_PageTitle = document.getElementById("Header_PageNavi_Title");
	var Header_Buttons = document.querySelectorAll(".Header_Content_Button");
	var Header_Buttons_Text = document.querySelectorAll(".Header_Content_Button_Text");
	var Header_StatusTray_Clock = document.getElementById("pageElement_Header_Clock");
	var Header_StatusTray_Battery = document.getElementById("pageElement_Header_Battery");
	var Sidebar = document.getElementById("pageElement_Sidebar");
	var MainMenu = document.getElementById("pageElement_Header_MainMenu_Textbox");
	var MainMenu_PageName = document.getElementById("Header_MainMenu_PageName");
	var StatusMenu = document.getElementById("pageElement_Header_StatusTray_Textbox");
	var Subwindows = document.querySelectorAll(".Subwindow");
	var Modals = document.querySelectorAll(".Modal");
	var Footer_VersionTitle = document.getElementById("pageElement_Footer_VersionTitle");
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;
	if (windowWidth < 750){ //Small size
		windowSizePreset = "small";
		} else { //Normal size
		windowSizePreset = "normal";
	}
	
	MainMenu.style.maxHeight = windowHeight-90 + "px";
	StatusMenu.style.maxHeight = windowHeight-90 + "px";
	
	
	// Desktop
	if(windowSizePreset == "small"){
		if (windowWidth < 400){
			for (a = 0; a < Header_Buttons.length; a++){
				Header_Buttons[a].style.display = "none";
			}
		} else {
			for (a = 0; a < Header_Buttons.length; a++){
				Header_Buttons[a].style.display = "grid";
			}
		}
		MainContent.style.width = "100%";
		MainContent.style.marginLeft = "3%";
		Header_PageTitle.style.display = "none";
		Header_StatusTray_Clock.style.display = "none";
		Header_StatusTray_Battery.style.display = "none";
		for (a = 0; a < Header_Buttons_Text.length; a++){
			Header_Buttons_Text[a].style.display = "none";
		}
		MainMenu.style.width = "85%";
		StatusMenu.style.width = "85%";
		StatusMenu.style.float = "left";
		StatusMenu.style.left = "20px";
		
		if (pageProperty_enableSidebar == 1){
			Content.style.width = "calc(100% - 50px)";
			if (pageProperty_lockSidebar == 1){
				Content.style.width = "100%";
			}
		} else {
			Content.style.width = "100%";
		}
		for (a = 0; a < Subwindows.length; a++){
			Subwindows[a].style.margin = "0";
			Subwindows[a].style.minWidth = "100%";
			Subwindows[a].style.minHeight = "100%";
		}
		for (a = 0; a < Modals.length; a++){
			Modals[a].style.margin = "0";
			Modals[a].style.minWidth = "100%";
			Modals[a].style.minHeight = "100%";
		}
		Footer_VersionTitle.style.display = "none";
		MainMenu_PageName.style.display = "flex";
	} else if (windowSizePreset == "normal"){
		MainContent.style.width = pageProperty_mainContentWidth + "%";
		MainContent.style.marginLeft = "10%";
		Header_PageTitle.style.display = "block";
		Header_StatusTray_Clock.style.display = "block";
		Header_StatusTray_Battery.style.display = "block";
		for (a = 0; a < Header_Buttons_Text.length; a++){
			Header_Buttons_Text[a].style.display = "block";
		}
		MainMenu.style.width = "350px";
		StatusMenu.style.width = "350px";
		StatusMenu.style.float = "right";
		StatusMenu.style.left = "";
		if (pageProperty_enableSidebar == 1){
			Content.style.width = "calc(100% - 50px)";
			if (pageProperty_lockSidebar == 1){
				Content.style.width = "100%";
			}
		} else {
			Content.style.width = "100%";
		}
		// Content.style.width = "100%";
		for (a = 0; a < Subwindows.length; a++){
			Subwindows[a].style.margin = "auto";
			Subwindows[a].style.minWidth = "0%";
			Subwindows[a].style.minHeight = "0%";
		}
		for (a = 0; a < Modals.length; a++){
			Modals[a].style.margin = "auto";
			Modals[a].style.minWidth = "0%";
			Modals[a].style.minHeight = "0%";
		}
		Footer_VersionTitle.style.display = "flex";
		MainMenu_PageName.style.display = "none";
	}
	
	/* // Mobile
	if (windowSizePreset == "normal" && isMobileDevice == true){
		Header.style.height = "100px";
		Content.style.marginTop = "100px";
		Sidebar.style.marginTop = "100px";
		Sidebar.style.width = "100px";
		pageProperty_sidebarExpandedWidth = 500;
		pageProperty_sidebarCompactedWidth = 100;
		document.getElementById("Header_PageNavi_Title").style.fontSize = "50px";
	} else {
	
	} */
	
	
}

/*document.onkeypress = function (f) {
    //space = space || window.event;
	toggle_Category_All();
};*/

let keysPressed = {}; 
document.addEventListener('keydown', (event) => {
	keysPressed[event.key] = true;
	
	if (keysPressed['Control'] && event.key == 'q') {
		toggle_Category_All();
		
	}
	//if (PageName == "DL_ShortcutEditor.html"){
	if (keysPressed['Control'] && event.key == ' ') {
		if(PageName == "WA_Main.html"){
			generateImage();
			} else {
			if(document.getElementById("subwindow_AddItem").style.display == "none"){
				open_Subwindow("AddItem");
				} else {
				close_Subwindow("AddItem");
			}
		}
		
	}
	if (keysPressed['Control'] && event.key == 'b') {
		if (pageProperty_enableClockScreen == 1){
			open_SessionScreen();
		}
	}
	if (keysPressed['Control'] && event.key == 'ArrowRight') {
		if (pageProperty_enableSidebar == 1){
			toggle_Sidebar();
		}
		
	}
	if (keysPressed['Control'] && event.key == '.') {
		if(PageName == "WA_Main.html"){
			WA_Next_Image();
		} 
	}
	if (keysPressed['Control'] && event.key == ',') {
		if(PageName == "WA_Main.html"){
			WA_Previous_Image();
		}
	}
	
	if (keysPressed['Control'] && event.key == 'CapsLock') {
		if(PageName == "WA_Main.html"){
			WA_Reset();
		}
	}
	
	if (keysPressed['Control'] && event.key == 'Shift') {
		if(pageProperty_enableQuickSearch == 1){
			toggle_SearchBar();
		}
	}
	
	if (keysPressed['Control'] && event.key == 'i') {
		trigger_Open_ExperimentSelector();
		
	}
	
	
	if (keysPressed['Control'] && event.key == 'Alt') {
		if (dev_debug_ElementOutlines == 0){
			var stylesheet = document.querySelector(':root');
			stylesheet.style.setProperty("--Debug-ElementOutline", "solid red");
			dev_debug_ElementOutlines = 1;
			console.log("Outlines on");
			} else if (dev_debug_ElementOutlines == 1){
			var stylesheet = document.querySelector(':root');
			stylesheet.style.setProperty("--Debug-ElementOutline", "none");
			dev_debug_ElementOutlines = 0;
			console.log("Outlines off");
		}
	}
	
	
	if (keysPressed['Escape']){
		if (subwindow_activeSubwindow != "none"){
			close_Subwindow(subwindow_activeSubwindow);
		}
		
	}
	
	/*if (keysPressed['Enter'] && (document.getElementById("pageElement_SearchQuery") === document.activeElement)){
		search_Query("headerMain");
		let keysPressed = {};
		}
		
		if (keysPressed['Enter'] && (document.getElementById("pageElement_SearchQuery2") === document.activeElement)){
		search_Query("headerMenu");
		let keysPressed = {};
		}
		
		if (keysPressed['Enter'] && (document.getElementById("pageElement_SearchQuery_3") === document.activeElement)){
		search_Query("toggleable");
		let keysPressed = {};
	}*/
	
	/*var searchBar1 = document.querySelector('.Header_QuickSearchBar_Input');
		if(searchBar1 === document.activeElement){
		if (keysPressed['Enter']) {
		search_Query("headerMain");	
		}
	}*/
	
	/*var searchBar2 = document.querySelector('.Header_QuickSearchBar_Input2');
		if(searchBar2 === document.activeElement){
		if (keysPressed['Enter']) {
		search_Query("headerMenu");	
		}
	}*/
	
	/*var searchBar3 = document.querySelector('.ToggleableSearchBar_SearchBar_Input');
		if(searchBar3 === document.activeElement){
		if (keysPressed['Enter']) {
		search_Query("toggleable");	
		}
	}*/
	//}
});

document.addEventListener('keyup', (event) => {
	delete keysPressed[event.key];
});


//Toggle sidebar
var Sidebar_State = "Contracted";
function toggle_Sidebar(){
	var Sidebar = document.getElementById("pageElement_Content");
	var toggle_Sidebar_GridTemplateColumns = "50px 1fr";
	if (pageProperty_enableSidebar == 1){
		if (pageProperty_lockSidebar == 0){
			if (Sidebar_State == "Contracted"){
				document.getElementById("pageElement_Sidebar").style.width = pageProperty_sidebarExpandedWidth + "px";
				if (pageProperty_sidebarMoveContent == 1){
					document.getElementById("pageElement_Content").style.marginLeft = pageProperty_sidebarExpandedWidth + "px";
				}
				Sidebar_State = "Expanded";
			} else if (Sidebar_State == "Expanded"){
				document.getElementById("pageElement_Sidebar").style.width = pageProperty_sidebarCompactedWidth +"px";
				document.getElementById("pageElement_Content").style.marginLeft = "50px";
				// var toggle_Sidebar_GridTemplateColumns = "50px 1fr";
				Sidebar_State = "Contracted";
			}
		} else if (pageProperty_lockSidebar == 1){
			if (Sidebar_State == "Contracted"){
				document.getElementById("pageElement_Sidebar").style.width = pageProperty_sidebarExpandedWidth + "px";
				if (pageProperty_sidebarMoveContent == 1){
					document.getElementById("pageElement_Content").style.marginLeft = pageProperty_sidebarExpandedWidth + "px";
				}
				Sidebar_State = "Expanded";
			} else if (Sidebar_State == "Expanded"){
				document.getElementById("pageElement_Sidebar").style.width = "0px";
				document.getElementById("pageElement_Content").style.marginLeft = "0px";
				Sidebar_State = "Contracted";
			}
		}
		// document.getElementById("pageElement_Content").style.gridTemplateColumns = toggle_Sidebar_GridTemplateColumns;
	}
}

//Toggle categories
function toggle_Category(catID){ //Gets the id of the element that runs the function and stores it in catID
	var categoryID = catID; //Set value of categoryID to the value of catID
	var container = document.getElementById("content_"+categoryID); //The id of the div container of the category
	var containerArrow = document.getElementById("arrow_"+categoryID); //The id of the arrow icon of the category
	
	var selectedCSSObject = categoryID.replace('category_','');
	
	container.style.animationName = "tabOpening"; //Opening animation
	container.style.animationDuration = "var(--Element-Transition-Delay)"; //Animation duration
	if (container.style.display != "none"){ //If the container is not closed
		container.style.animationName = "tabClosing"; //Closing animation
		container.style.animationFillMode = "forwards";
		container.style.animationDuration = "0.3s";
		setTimeout( function() { container.style.display = "none";}, 300);
		containerArrow.src = "Assets/Icons/icon_downArrow.png"	//Change arrow icon
		} else { //If the container is closed
		container.style.display = "block"; //then open it
		container.style.animationName = "tabOpening"; //Opening animation
		container.style.animationDuration = "0.3s"; //Animation duration
		containerArrow.src = "Assets/Icons/icon_upArrow.png" //Change arrow icon
	}
	
	
}

//Toggle all categories
var categoryToggleAll = 1;

function toggle_Category_All(){
	//var categoryID = document.querySelectorAll('[id^="category_"]');
	//console.log(categoryID);
	//var categoryCount = document.querySelectorAll('[id^="category_"]').length;
	//console.log(categoryCount);
	var Category = document.querySelectorAll(".Category_Content_Container");
	var categorySelect_Toggle = document.querySelectorAll(".Category_Label_Toggle");
	if (categoryToggleAll == 1){ //Hide all
		for (var a = 0; a < Category.length; a++) {			
			var categorySelect = Category[a];
			
			categorySelect.style.display = "none";
			
			var categorySelect_Toggle = Category[a];
			categorySelect_Toggle.src = "Assets/Icons/icon_downArrow.png"
			
			if(a == (Category.length - 1)){
				categoryToggleAll = 0;
			}
			
		}
		
		} else { //Show all
		for (var a = 0; a < Category.length; a++) {			
			var categorySelect = Category[a];
			categorySelect.style.display = "block";
			categorySelect.style.animationName = "tabOpening"; //Opening animation
			categorySelect.style.animationDuration = "var(--Element-Transition-Delay)";
			
			var categorySelect_Toggle = Category[a];
			categorySelect_Toggle.src = "Assets/Icons/icon_downArrow.png"
			
			if(a == (Category.length - 1)){
				categoryToggleAll = 1;
			}
		}
	}
}

var subwindow_activeSubwindow;
function open_Subwindow(ID){
	document.getElementById("pageElement_Subwindows").style.display = "flex";
	document.getElementById("pageElement_Subwindows").style.opacity = "100%";
	var subwindowElement = document.getElementById("subwindow_"+ID);
	subwindowElement.style.display = "block";
	subwindowElement.style.animationFillMode = "forwards";
	subwindowElement.style.animationName = "opening_Subwindow";
	subwindowElement.style.animationDuration = "0.3s";
	subwindow_activeSubwindow = ID;
}

function close_Subwindow(ID){
	document.getElementById("pageElement_Subwindows").style.opacity = "0%";
	var subwindowElement = document.getElementById("subwindow_"+ID);
	subwindowElement.style.animationName = "closing_Subwindow";
	subwindowElement.style.animationDuration = "0.3s";
	subwindowElement.style.animationFillMode = "forwards";
	subwindow_activeSubwindow = "none";
	setTimeout(function(){subwindowElement.style.display = "none"; document.getElementById("pageElement_Subwindows").style.display = "none";}, 300);
	
}

function trigger_toggle_Textbox(ID){
	var textboxID = document.getElementById(ID + "_Textbox");
	var textboxContentsID = document.getElementById(ID + "_Textbox_Content");
	if (textboxID.style.display == "none"){
		textboxID.style.display = "block";
		textboxID.style.animationFillMode = "forwards";
		textboxID.style.animationName = "open_Textbox";
		textboxID.style.animationDuration = "var(--Element-Transition-Delay)";
		
		textboxContentsID.style.display = "block";
		textboxContentsID.style.animationFillMode = "forwards";
		textboxContentsID.style.animationName = "open_Textbox_Contents";
		textboxContentsID.style.animationDuration = "var(--Element-Transition-Delay)";
		textboxContentsID.style.animationDelay= "0.21s";
		} else {
		// textboxID.style.display = "none";
		textboxID.style.animationFillMode = "forwards";
		textboxID.style.animationName = "close_Textbox";
		textboxID.style.animationDuration = "var(--Element-Transition-Delay)";
		setTimeout(function(){textboxID.style.display = "none";}, 500);
		
		// textboxContentsID.style.display = "none";
		textboxContentsID.style.animationFillMode = "forwards";
		textboxContentsID.style.animationName = "close_Textbox_Contents";
		textboxContentsID.style.animationDuration = "0.3s";
		textboxContentsID.style.opacity = "0%";
		setTimeout(function(){textboxContentsID.style.display = "none";}, 200);
	}
	
	
}


var toast_Count = 1;
function trigger_createToast(type){
	/* if (document.getElementById("button_PageNavi_textbox").style.display == "block"){
		document.getElementById("pageElement_ToastDrawer").style.paddingTop = "400px";
		} else {
		document.getElementById("pageElement_ToastDrawer").style.paddingTop = "75px";
	} */
	if (Behavior_DisplayToasts == true){
		var toast_Div = document.createElement('div');
		toast_Div.classList.add("ToastNotif_Toast");
		toast_Div.setAttribute("id", "toast_Div_"+toast_Count);
		toast_Div.setAttribute("onclick", "trigger_closeToast(this.id)");
		toast_Div.style.transform = "translateX(-100%)";
		toast_Div.style.animationName = "opening_ToastNotif";
		toast_Div.style.animationDuration = "0.3s";
		toast_Div.style.animationFillMode = "forwards";
		setTimeout(function(){
			toast_Div.style.animationName = "closing_ToastNotif";
			toast_Div.style.animationDuration = "0.3s";
			toast_Div.style.animationFillMode = "forwards";
			setTimeout(function(){
				toast_Div.style.display = "none";
			}, 300);
		}, 3000);
		var toast_Icon = document.createElement('img');
		toast_Icon.classList.add("ToastNotif_Toast_Icon");
		toast_Icon.setAttribute("id", "toast_Icon_"+toast_Count);
		document.getElementById("pageElement_ToastDrawer").appendChild(toast_Div);
		
		var toast_Title = document.createElement('h1');
		toast_Title.classList.add("ToastNotif_Toast_Title");
		
		var toast_Subtitle = document.createElement('p');
		toast_Subtitle.classList.add("ToastNotif_Toast_URL");
		switch(type){
			case "success":
			toast_Icon.setAttribute("src", "Assets/Icons/icon_linkAdded.png");
			toast_Title.innerHTML = "I am success";
			toast_Subtitle.innerHTML = "LMAO its SuccessToastYT he's roasty toasty who would've thought it would make the news papers LMAO LOL FR FR TBH";
			break;
			case "failed":
			toast_Icon.setAttribute("src", "Assets/Icons/icon_linkError.png");
			toast_Title.innerHTML = "Fail :(";
			toast_Subtitle.innerHTML = "uncooked toast";
			break;
			case "SE_FormNotFilled": //When not all of the required fields are filled
			toast_Icon.setAttribute("src", "Assets/Icons/icon_linkError.png");
			toast_Title.innerHTML = "Item not added";
			toast_Subtitle.innerHTML = "Make sure that you've filled all of the required fields";
			break;
			case "SE_CategoryCreated": //When a category in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/icon_linkAdded.png");
			toast_Title.innerHTML = "Category added";
			toast_Subtitle.innerHTML = "Category named '"+SE_CreateItem_categoryTitle+"' has been created.";
			break;
			case "SE_ShortcutCreated": //When a shortcut in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/icon_linkAdded.png");
			toast_Title.innerHTML = "Shortcut added";
			toast_Subtitle.innerHTML = "Shortcut named '"+SE_CreateItem_ShortcutText+"' with a URL of '"+SE_CreateItem_ShortcutURL+"' has been created.";
			break;
			case "Settings_FileNotFound": //When a shortcut in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/icon_error.png");
			toast_Title.innerHTML = "Error";
			toast_Subtitle.innerHTML = "We couldn't find the file you're referring to. Double check the file name, type, and make sure it is in the Assets/Background folder.";
			break;
			case "Settings_SaveSuccess": //When a shortcut in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/icon_check.png");
			toast_Title.innerHTML = "Settings saved";
			toast_Subtitle.innerHTML = "Settings have been successfully saved and applied.";
			break;
			case "ShortcutEditor_ListUpdated": //When a shortcut in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/icon_check.png");
			toast_Title.innerHTML = "List updated";
			toast_Subtitle.innerHTML = "Changes had been saved.";
			break;
			case "ShortcutEditor_CopiedToClipboard": //When a shortcut in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/icon_changelog.png");
			toast_Title.innerHTML = "Copied!";
			toast_Subtitle.innerHTML = "Text has been copied to the clipboard.";
			break;
			case "SearchBar_NoQuery": //When a shortcut in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/icon_Search.png");
			toast_Title.innerHTML = "Search not made";
			toast_Subtitle.innerHTML = "Type something in the search bar to do the search.";
			break;
			case "Presets_Set": //When a shortcut in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/icon_check.png");
			toast_Title.innerHTML = "Preset applied";
			toast_Subtitle.innerHTML = "The selected preset has been successfully applied to the values table. Click 'Save Settings' to save changes.";
			break;
			case "Settings_FormEmpty": //When a shortcut in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/icon_error.png");
			toast_Title.innerHTML = "Error";
			toast_Subtitle.innerHTML = "The input box required is empty.";
			break;
			case "LaunchCategory_Before":
			toast_Icon.setAttribute("src", "Assets/Icons/icon_others.png");
			toast_Title.innerHTML = "Launching...";
			toast_Subtitle.innerHTML = "Your shortcuts should be opening on their new tabs now.";
			break;
			case "LaunchCategory_After":
			toast_Icon.setAttribute("src", "Assets/Icons/icon_others.png");
			toast_Title.innerHTML = "Shortcuts launched";
			toast_Subtitle.innerHTML = "All shortcuts from the category has been opened.";
			break;
			case "ShortcutEditor_InvalidCharacter": //When a shortcut in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/icon_error.png");
			toast_Title.innerHTML = "Error";
			toast_Subtitle.innerHTML = "The character ';' is not accepted.";
			break;
			case "NotImplemented": //When a shortcut in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/favicon.png");
			toast_Title.innerHTML = "Not available";
			toast_Subtitle.innerHTML = "This feature is not implemented properly yet.";
			break;
			case "WA_ProcessingImage": //When a shortcut in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/icon_schedules.png");
			toast_Title.innerHTML = "Processing Image...";
			toast_Subtitle.innerHTML = "Your image is being processed. Please wait...";
			break;
			case "WA_ProcessingFinished": //When a shortcut in Shortcut Editor is successfully created
			toast_Icon.setAttribute("src", "Assets/Icons/icon_check.png");
			toast_Title.innerHTML = "Processing Finished";
			toast_Subtitle.innerHTML = "The image has been processed. You can now save it.";
			break;
			case "dev_EnableCounter":
			toast_Icon.setAttribute("src", "Assets/Icons/icon_check.png");
			toast_Title.innerHTML = "Dev Counter Enabled";
			toast_Subtitle.innerHTML = "Enabled";
			break;
			case "dev_EnableCounter":
			toast_Icon.setAttribute("src", "Assets/Icons/icon_close.png");
			toast_Title.innerHTML = "Dev Counter Disabled";
			toast_Subtitle.innerHTML = "Disabled";
			break;
		}
		document.getElementById("toast_Div_"+toast_Count).appendChild(toast_Icon);
		document.getElementById("toast_Div_"+toast_Count).appendChild(toast_Title);
		document.getElementById("toast_Div_"+toast_Count).appendChild(toast_Subtitle);
		toast_Count++;
	}
}

function trigger_closeToast(id){
	toast_Div = document.getElementById(id);
	toast_Div.style.animationName = "closing_ToastNotif";
	toast_Div.style.animationDuration = "0.3s";
	toast_Div.style.animationFillMode = "forwards";
	setTimeout(function(){
		toast_Div.style.display = "none";
	}, 300);
	
}


window.onscroll = function() {scrollFunction()};
function scrollFunction() {
	pageElement_CornerButtons = document.getElementById("pageElement_CornerButtons");
	if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 20) {
		pageElement_CornerButtons.style.display = "block";
		} else {
		pageElement_CornerButtons.style.display = "none";
	}
}



function trigger_toggleDropdown(ID){	
	var dropdownMenu = document.getElementById("dropdownMenu_"+ID);
	var dropdownButton = document.getElementById(ID);
	var dropdownItems = document.querySelectorAll("[id='dropdownItem_"+ID+"']");	
	if (dropdownMenu.style.display == "none"){
		dropdownMenu.parentElement.style.height = "250px";
		dropdownMenu.style.display = "block";
		dropdownMenu.style.animationName = "opening_Dropdown";
		dropdownMenu.style.animationDuration = "0.3s";
		dropdownMenu.style.animationFillMode = "forwards";
		for (var a = 0; a < dropdownItems.length; a++){
			var dropdownItems_Select = dropdownItems[a];
			dropdownItems_Select.style.animationName = "opening_Dropdown_Items";
			dropdownItems_Select.style.animationDuration = "0.3s";
			dropdownItems_Select.style.animationFillMode = "forwards";
		}
		dropdownButton.style.backgroundColor = "#292930";
		dropdownButton.style.borderTopStyle = "solid";
		dropdownButton.style.borderBottomStyle = "none";
		} else {
		dropdownMenu.parentElement.style.height = "auto";
		dropdownMenu.style.animationName = "closing_Dropdown";
		dropdownMenu.style.animationDuration = "0.3s";
		dropdownMenu.style.animationFillMode = "forwards";
		for (var a = 0; a < dropdownItems.length; a++){
			var dropdownItems_Select = dropdownItems[a];
			dropdownItems_Select.style.animationName = "closing_Dropdown_Items";
			dropdownItems_Select.style.animationDuration = "0.3s";
			dropdownItems_Select.style.animationFillMode = "forwards";
		}
		setTimeout(function(){dropdownMenu.style.display = "none";}, 300);
		dropdownButton.style.backgroundColor = "#121212";
		dropdownButton.style.borderTopStyle = "none";
		dropdownButton.style.borderBottomStyle = "solid";
	}
}

function trigger_dropdownItemSelected(ID, text){
	var trimmedID = ID.slice(13);
	console.log(trimmedID);
	document.getElementById(trimmedID).innerHTML = text;
	trigger_toggleDropdown(trimmedID);
}




// SETTINGS //
function trigger_ChangeTab(ID){
	var Tab_Container = document.querySelectorAll(".Tab_Container");
	var Sidebar_Icon = document.querySelectorAll(".Sidebar_Icon");
	for (a = 0; a != Tab_Container.length; a++){
		Tab_Container[a].style.display = "none";
		
	}
	for (b = 0; b != Sidebar_Icon.length; b++){
		Sidebar_Icon[b].style.backgroundColor = "var(--Menus-BGColor)";
	}
	var selectedTab = document.getElementById(ID+"_Container");
	selectedTab.style.display = "block";
	selectedTab.style.animationName = "opening_pageTab";
	selectedTab.style.animationDuration = "0.3s";
	selectedTab.style.animationFillMode = "forwards";
	var selectedIcon = document.getElementById(ID+"_Icon");
	selectedIcon.style.backgroundColor = "var(--Accent-Color)";
	
	if(PageName == "DL_Settings.html"){
		document.getElementById("pageElement_Tab_Title").style.display = "none";
		document.getElementById("pageElement_Tab_Description").style.display = "none";
		document.getElementById("Settings_Home_Container").style.display = "none";
	}
	if(PageName == "DL_ReminderAndTodoList.html"){
		document.getElementById("pageElement_Tab_Title").style.display = "none";
		document.getElementById("pageElement_Tab_Description").style.display = "none";
	}
	reset_toDefaultAnimations();
}

function set_Version_General(){
	
	document.getElementById("versionTitle").innerHTML = VersionTitle;
	document.getElementById("copyrightTitle").innerHTML = CopyrightTitle;
	document.getElementById("pageElement_SessionScreen_Copyright").innerHTML = VersionTitle+" | "+CopyrightTitle;
	document.getElementById("pageElement_Footer_VersionTitle").innerHTML = VersionTitle;
	document.getElementById("pageElement_Footer_Copyright").innerHTML = CopyrightTitle;
	document.getElementById("pageElement_PageTitle").innerHTML = VersionTitle + " - " + pageProperty_PageTitle;

	// Set loading screen elements visible
	if (pageProperty_enableLoadingScreen == 1){
		document.getElementById("LoadingScreen_UpperSection").style.animationName = "open_LoadingScreen_Elements";
		document.getElementById("LoadingScreen_UpperSection").style.animationDuration = "0.5s";
		document.getElementById("LoadingScreen_UpperSection").style.animationFillMode = "forwards";
		document.getElementById("LoadingScreen_CopyrightSection").style.animationName = "open_LoadingScreen_Elements";
		document.getElementById("LoadingScreen_CopyrightSection").style.animationDuration = "0.5s";
		document.getElementById("LoadingScreen_CopyrightSection").style.animationFillMode = "forwards";
	}
	close_LoadingScreen();
}

function set_Version_Settings(){
	document.getElementById("pageElement_Version_Title").innerHTML = "You are using<br>"+VersionTitle;
	document.getElementById("pageElement_Version_ContinuityVersion").innerHTML = "Continuity version: "+ContinuityVersionNumber;
	document.getElementById("pageElement_Version_BuildNumber").innerHTML = "Build: "+BuildNumber;
	document.getElementById("pageElement_Version_UI").innerHTML = "ELMSUI version: "+ELMSUIVersion;
	document.getElementById("pageElement_Version_CompilationDate").innerHTML = "Release date: "+CompilationDate;
	document.getElementById("pageElement_Version_Copyright").innerHTML = "Copyright "+CopyrightTitle;
}


////////////////////////////////

