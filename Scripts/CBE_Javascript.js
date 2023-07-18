/*
	DL_Javascript.js
	This file contains all the JavaScript functionality for Doodle Launcher
*/

var VersionTitle = "Doodle Launcher Public Preview 4";
var VersionNumber = "Preview 4";
var ContinuityVersionNumber = "1.15"
var BuildNumber = 4153;
var CopyrightTitle = "Content By ElmerF 2022";
var ELMSUIVersion = "1.4.2";
var CompilationDate = "December 1, 2022";
var path = window.location.pathname;
var PageName = path.split("/").pop();
var enable_Dev_Counter = true;
var enable_Dev_ToggleDivOutlines = true;

// if(enable_Dev_ToggleDivOutlines == true){
// document.getElementsByTagName("div").style.border = "solid white";
// }

var enableGreetings;
var pageProperty_enableGreetings;

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

var pageProperty_PageTitle;

function OnloadTasks_Onboarding(){
	var Onboarding_PageElements = document.querySelectorAll(".Onboarding_Process_Page");
	for (a = 1; a < Onboarding_PageElements.length; a++){
		Onboarding_PageElements[a].style.display = "none";
	}
}
function OnloadTasks(){	
	check_SettingsFileExistence();
	//Settings_LoadAppearance();
	set_Version_General();
	
	sessionCheck();
	startTime();
	startDate();
	displayDay();
	generate_Launcher_NavigationList();
	check_Connection();
	check_WindowSize();
	toggle_Navigator();
	var path = window.location.pathname;
	var PageName = path.split("/").pop();
	console.log("Welcome to "+VersionTitle+" "+VersionNumber+" ("+ContinuityVersionNumber+"). Copyright "+CopyrightTitle);
	generate_Launcher_HeaderButtons(PageName);
	switch (PageName){
		case "DL_Main.html":
			pageProperty_enableGreetings = 1;
			var pageProperty_showSidebarToggle = 0;
			var pageProperty_enableSidebar = 0;
			var pageProperty_enableCategoryLabelIcons = 0;
			var pageProperty_enableTabContainers = 0;
			var pageProperty_showSidebarToggle_CategoryNavigation = 0;
			var pageProperty_enableCategoryNavigation = 0;
			
			pageProperty_PageTitle = "Home";
			check_Version();
			Generator_Render_Categories();
			/*const SE_Array_Category_Index = ["fillerCategory", "TEST_Category_1", "TEST_Category_2", "TEST_Category_3", "Education", "Elmer Elmer", "Socials"];
			localStorage.setItem(key_Index_Category, JSON.stringify(SE_Array_Category_Index));*/
			hide_ToggleableElements();
			setTimeout(start_Animations, 2500);
			enableGreetings = 1;
			
			generate_ProfileSelector();
			if (Appearance_Behavior_BlurHomeWallpaper == true || Appearance_Behavior_BlurHomeWallpaper == "true"){
				document.getElementById("pageElement_WallpaperBlur").style.display = "block";
			} else {
				document.getElementById("pageElement_WallpaperBlur").style.display = "none";
			}
		break;
		case "DL_ShortcutEditor.html":
			pageProperty_enableGreetings = 1;
			var pageProperty_showSidebarToggle = 1;
			var pageProperty_enableSidebar = 1;
			var pageProperty_enableCategoryLabelIcons = 0;
			var pageProperty_enableTabContainers = 0;
			var pageProperty_enableCategoryNavigation = 0;
			var pageProperty_showSidebarToggle_CategoryNavigation = 0;
			pageProperty_PageTitle = "Shortcut Editor";
			//SE_Render_List_TableView();
			Generator_Render_Categories();
			//render_Categories_TableView();
			Generator_Render_Categories_TableView();
			SE_Create_SwapperList();
			SE_Create_SwapperList_Shortcuts();
			setTimeout(start_Animations, 2500);
			SE_CreateDropdown();
		break;
		case "DL_Clock.html":
			pageProperty_enableGreetings = 1;
			var pageProperty_showSidebarToggle = 1;
			var pageProperty_enableSidebar = 1;
			var pageProperty_enableCategoryLabelIcons = 0;
			var pageProperty_enableTabContainers = 0;
			var pageProperty_enableCategoryNavigation = 0;
			var pageProperty_showSidebarToggle_CategoryNavigation = 0;
			pageProperty_PageTitle = "Clock";
		break;
		case "DL_PomodoroTimer.html":
			pageProperty_enableGreetings = 0;
			var pageProperty_showSidebarToggle = 0;
			var pageProperty_enableSidebar = 0;
			var pageProperty_enableCategoryLabelIcons = 0;
			var pageProperty_enableTabContainers = 0;
			var pageProperty_enableCategoryNavigation = 0;
			var pageProperty_showSidebarToggle_CategoryNavigation = 0;
			pageProperty_PageTitle = "Pomodoro Timer";
		break;
		case "DL_Settings.html":
			pageProperty_enableGreetings = 0;
			var pageProperty_showSidebarToggle = 1;
			var pageProperty_enableSidebar = 1;
			var pageProperty_enableCategoryLabelIcons = 0;
			var pageProperty_enableTabContainers = 1;
			var pageProperty_enableCategoryNavigation = 0;
			var pageProperty_showSidebarToggle_CategoryNavigation = 0;
			pageProperty_PageTitle = "Settings";
			Settings_LoadSettingValues();
			set_Version_Settings();
		break;
		case "DL_Settings_Changelogs.html":
			pageProperty_enableGreetings = 0;
			var pageProperty_showSidebarToggle = 0;
			var pageProperty_enableSidebar = 0;
			var pageProperty_enableCategoryLabelIcons = 0;
			var pageProperty_enableTabContainers = 0;
			var pageProperty_enableCategoryNavigation = 1;
			var pageProperty_showSidebarToggle_CategoryNavigation = 0;
			pageProperty_PageTitle = "Changelogs";
		break;
		case "DL_ReminderAndTodoList.html":
			pageProperty_enableGreetings = 0;
			var pageProperty_showSidebarToggle = 0;
			var pageProperty_enableSidebar = 0;
			var pageProperty_enableCategoryLabelIcons = 0;
			var pageProperty_enableTabContainers = 0;
			var pageProperty_enableCategoryNavigation = 0;
			var pageProperty_showSidebarToggle_CategoryNavigation = 0;
			pageProperty_PageTitle = "Tasker";
		break;
	}
	console.log("Setting page properties with the following values: "+pageProperty_showSidebarToggle+" | "+pageProperty_enableCategoryLabelIcons+" | "+pageProperty_enableSidebar+" | "+pageProperty_enableTabContainers);
	/*if (pageProperty_showSidebarToggle_CategoryNavigation == 1){
		document.getElementById("pageElement_Header").style.gridTemplateColumns = "30px auto 1fr auto auto auto"; //Includes the sidebar toggle to the grid
		document.getElementById("pageElement_MainContent").style.paddingLeft = "50px"; //Changes the container padding
		} else {
		document.getElementById("toggle_Sidebar_CategoryNavigation").style.display = "none";
	}*/
	
	/*if (pageProperty_enableCategoryNavigation == 1){
		document.getElementById("pageElement_Sidebar_CategoryNavigation").style.display = "grid"; //Shows the sidebar
		document.getElementById("pageElement_MainContent").style.paddingLeft = "50px"; //Changes the container padding 
		
	}*/
	
	if (pageProperty_showSidebarToggle == 1){
		document.getElementById("pageElement_Header").style.gridTemplateColumns = "30px auto 1fr auto auto auto"; //Includes the sidebar toggle to the grid
		document.getElementById("pageElement_MainContent").style.paddingLeft = "50px"; //Changes the container padding
		console.log("SidebarToggle");
		} else {
		document.getElementById("toggle_Sidebar").style.display = "none";
	}
	if (pageProperty_enableCategoryLabelIcons == 1){
		var Category_Label = document.querySelectorAll(".Category_Label"); //The div for category labels
		var Category_Label_Icon = document.querySelectorAll(".Category_Label_Icon"); //The category icon
		for (var i = 0; i < Category_Label.length; i++) { //Changes the setting of category label div so the icon can appear
			var Label = Category_Label[i];
			var LabelIcon = Category_Label_Icon[i];
			Label.style.gridTemplateColumns = "30px 1fr 30px"; //Changes the label grid arrangement to take into account the icon
			LabelIcon.style.display = "block"; //Makes the label icon visible
		}
	}
	if (pageProperty_enableSidebar == 1){
		document.getElementById("pageElement_Sidebar").style.display = "grid"; //Shows the sidebar
		document.getElementById("pageElement_MainContent").style.paddingLeft = "50px"; //Changes the container padding 
		console.log("Enabled")
	}
	if (pageProperty_enableTabContainers == 1){
		var tabs = document.querySelectorAll(".Tab_Container");
		for(a = 0; a < tabs.length; a++){
			tabs[a].style.display = "none";
		}
	}
	
	console.log(pageProperty_showSidebarToggle_CategoryNavigation);
	console.log(pageProperty_showSidebarToggle);
	
	Settings_CheckSettingFile();
	document.getElementById("button_Update").style.display = "none";
	
	document.getElementById("pageElement_SearchQuery_3").placeholder = "Search using "+Behavior_DisplaySearchBar_PreferredEngine;
	
	if (enable_Dev_Counter == true){
		dev_update_RefreshNumber();
	}
}

function check_Version(){
	var versionFile = localStorage.getItem("DL_Version");
	if (versionFile){ //Version file exists
		versionNumber = localStorage.getItem("DL_Version");
		var versionFile_Count = Object.keys(JSON.parse(localStorage.getItem("DL_Version"))).length;
		var versionNumber = [];
		var versionFile_Data = Object.values(JSON.parse(localStorage.getItem("DL_Version")));
		versionNumber.push(versionFile_Data[0]); //Continuity version number
		versionNumber.push(versionFile_Data[1]); //Build number
		if (versionNumber[1] != null){
			if (versionNumber[1] != BuildNumber){
				console.log(versionNumber[1]);
				console.log("Version file detected. It is not the same as the build number. Displaying update window.");
				document.getElementById("subwindow_UpdateWindow").style.display = "grid";
				const Version = [ContinuityVersionNumber, BuildNumber];
				localStorage.setItem("DL_Version", JSON.stringify(Version));
			}
			} else {
			const Version = [ContinuityVersionNumber, BuildNumber];
			localStorage.setItem("DL_Version", JSON.stringify(Version));
		}
		} else {
		Onboarding_CheckVersion();
	}
	
} 

function apply_pageProperties(){
	document.getElementById("pageElement_Header").style.gridTemplateColumns = "auto 1fr auto auto auto"; //DOESN'T INCLUDE the sidebar toggle to the grid
	document.getElementById("toggle_Sidebar").style.display = "none"; //Hides the sidebar toggle
	console.log("Setting page properties with the following values: "+pageProperty_showSidebarToggle+" | "+pageProperty_enableCategoryLabelIcons+" | "+pageProperty_enableSidebar+" | "+pageProperty_enableTabContainers);
	if (pageProperty_showSidebarToggle == 1){
		document.getElementById("pageElement_Header").style.gridTemplateColumns = "30px auto 1fr auto auto auto"; //Includes the sidebar toggle to the grid
		document.getElementById("pageElement_MainContent").style.paddingLeft = "50px"; //Changes the container padding
	}
	if (pageProperty_enableCategoryLabelIcons == 1){
		var Category_Label = document.querySelectorAll(".Category_Label"); //The div for category labels
		var Category_Label_Icon = document.querySelectorAll(".Category_Label_Icon"); //The category icon
		for (var i = 0; i < Category_Label.length; i++) { //Changes the setting of category label div so the icon can appear
			var Label = Category_Label[i];
			var LabelIcon = Category_Label_Icon[i];
			Label.style.gridTemplateColumns = "30px 1fr 30px"; //Changes the label grid arrangement to take into account the icon
			LabelIcon.style.display = "block"; //Makes the label icon visible
		}
	}
	if (pageProperty_enableSidebar == 1){
		document.getElementById("pageElement_Sidebar").style.display = "grid"; //Shows the sidebar
		document.getElementById("pageElement_MainContent").style.paddingLeft = "50px"; //Changes the container padding 
		console.log(pageProperty_enableSidebar);
	}
	if (pageProperty_enableTabContainers == 1){
		var tabs = document.querySelectorAll(".Tab_Container");
		for(a = 0; a < tabs.length; a++){
			tabs[a].style.display = "none";
		}
	}
}

function apply_Behaviors(){
	if (Behavior_EnableBlurEffects == false){
		var stylesheet = document.querySelector(':root');
		stylesheet.style.setProperty("--Element-BackdropBlur", "blur(0px)");
		} else {
		var stylesheet = document.querySelector(':root');
		stylesheet.style.setProperty("--Element-BackdropBlur", "blur(10px)");
	}
	
	if(Behavior_DisplayTimeAndDate == false){
		document.getElementById("pageElement_Header_Clock").style.display = "none";
		document.getElementById("Clock_Time_2").style.display = "none";
		document.getElementById("Clock_Date_2").style.display = "none";
		} else {
		document.getElementById("pageElement_Header_Clock").style.display = "block";
		document.getElementById("Clock_Time_2").style.display = "block";
		document.getElementById("Clock_Date_2").style.display = "block";
	}
	
	if(Behavior_DisplayBattery == false){
		document.getElementById("pageElement_Header_Battery").style.display = "none";
		document.getElementById("Battery_Level_2").style.display = "none";
		} else {
		document.getElementById("pageElement_Header_Battery").style.display = "block";
		document.getElementById("Battery_Level_2").style.display = "block";
	}
	
	if(Behavior_DisplayInternetStatus == false){
		document.getElementById("button_Wifi").style.display = "none";
		} else {
		document.getElementById("button_Wifi").style.display = "block";
	}
	
	/*if(Behavior_NotifyForUpdates == false){
		document.getElementById("button_Update").style.display = "none";
		} else {
		document.getElementById("button_Update").style.display = "block";
	}*/
	
	if (PageName == "DL_Main.html"){
		if(Behavior_DisplaySearchBar == false){
			document.getElementById("pageElement_QuickSearchBar").style.display = "none";
			} else {
			document.getElementById("pageElement_QuickSearchBar").style.display = "grid";
		}
	}
	
	
	
}

function dev_update_RefreshNumber(){
	var dev_refreshCount;
	var dev_refreshCount_File = localStorage.getItem("dev_DL_refreshCount");
	if (dev_refreshCount_File){ //Selected ite exists
		dev_refreshCount = localStorage.getItem("dev_DL_refreshCount");
		dev_refreshCount++;
		localStorage.setItem("dev_DL_refreshCount", JSON.stringify(dev_refreshCount));
		} else { //Selected item does not exist
		dev_refreshCount = 1;
		localStorage.setItem("dev_DL_refreshCount", JSON.stringify(dev_refreshCount));
	}
	document.getElementById("pageElement_Footer_VersionTitle").innerHTML = VersionTitle+" | Refreshes since 2/20/2022: "+dev_refreshCount;
	
}

function set_Version_General(){
	
	document.getElementById("versionTitle").innerHTML = VersionTitle;
	document.getElementById("copyrightTitle").innerHTML = CopyrightTitle;
	document.getElementById("pageElement_SessionScreen_Copyright").innerHTML = VersionTitle+" | "+CopyrightTitle;
	document.getElementById("pageElement_Footer_VersionTitle").innerHTML = VersionTitle;
	document.getElementById("pageElement_Footer_Copyright").innerHTML = CopyrightTitle;
	
	var path = window.location.pathname;
	var PageName = path.split("/").pop();
	console.log("Welcome to "+VersionTitle+" "+VersionNumber+" ("+ContinuityVersionNumber+"). Copyright "+CopyrightTitle);
	switch (PageName){
		case "DL_Main.html":
		document.getElementById("pageElement_PageTitle").innerHTML = VersionTitle + " - " + "Home";
		break;
		case "DL_ShortcutEditor.html":
		document.getElementById("pageElement_PageTitle").innerHTML = VersionTitle + " - " + "Shortcut Editor";
		break;
		case "DL_Settings.html":
		document.getElementById("pageElement_PageTitle").innerHTML = VersionTitle + " - " + "Settings";
		break;
		case "DL_ReminderAndTodoList.html":
		document.getElementById("pageElement_PageTitle").innerHTML = VersionTitle + " - " + "Tasker";
		break;
		default:
		document.getElementById("pageElement_PageTitle").innerHTML = VersionTitle;
		break;
	}
	
	// Set loading screen elements visible
	document.getElementById("LoadingScreen_UpperSection").style.animationName = "open_LoadingScreen_Elements";
	document.getElementById("LoadingScreen_UpperSection").style.animationDuration = "0.5s";
	document.getElementById("LoadingScreen_UpperSection").style.animationFillMode = "forwards";
	document.getElementById("LoadingScreen_CopyrightSection").style.animationName = "open_LoadingScreen_Elements";
	document.getElementById("LoadingScreen_CopyrightSection").style.animationDuration = "0.5s";
	document.getElementById("LoadingScreen_CopyrightSection").style.animationFillMode = "forwards";
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

function close_LoadingScreen(){
	setTimeout( function() { wait_LoadingScreen(); }, 3000);
	
}

function wait_LoadingScreen(){
	// document.getElementById("LoadingScreen_Text").innerHTML = "Welcome back!";
	var x = document.getElementById("LoadingScreen");
	x.style.animationName = "blurOut";
	x.style.animationDuration = "0.5s";
	x.addEventListener("animationend",remove_LoadingScreen);
}
function remove_LoadingScreen(){
	var x = document.getElementById("LoadingScreen");
	x.parentNode.removeChild(x);
	start_Animations();
}

function check_Connection(){
	if (navigator.onLine) {
		document.getElementById('button_Wifi').src = "Assets/Icons/icon_wifi_online.png";
		document.getElementById('textboxElement_Wifi').innerHTML = "You're connected";
		document.getElementById('pageElement_Connection').innerHTML = "You are connected to the internet. The launcher will function as intended and shortcuts will open properly."
		document.getElementById("pageElement_Connection_Speedtest").style.display = "block";
		} else {
		document.getElementById('button_Wifi').src = "Assets/Icons/icon_wifi_offline.png";
		document.getElementById('textboxElement_Wifi').innerHTML = "No connection";
		document.getElementById('pageElement_Connection').innerHTML = "Since you're not connected to the internet, links will not open properly. Connect to a Wi-Fi network and refresh the page."
		document.getElementById("pageElement_Connection_Speedtest").style.display = "none";
	}
}

function generate_Launcher_NavigationList(){
	let navigationListItems = ["Home", "Shortcut Editor", "Settings", "Pomodoro Timer"]; //Launcher navigation text
	let navigationListItems_Link = ["DL_Main.html", "DL_ShortcutEditor.html", "DL_Settings.html", "DL_PomodoroTimer.html"]; //Launcher navigation links
	
	for (var i = 0; i < navigationListItems.length; i++) {
		var navigationListItems_Select = navigationListItems[i]; //Contains the selected pagenavi text
		var navigationListItems_Link_Select = navigationListItems_Link[i]; //Contains the selected pagenavi link
		
		//Attaches to the page
		var listItemLink = document.createElement('a'); //Creates an a element
		listItemLink.href = navigationListItems_Link_Select; //Adds the link
		listItemLink.setAttribute("id", "pageElement_PageNaviList_Item_"+i); //Adds an id to attach the text
		document.getElementById("pageElement_PageNaviList").appendChild(listItemLink); //Attaches the a element to the page navi element
		
		var listItemLink_Text = document.createElement('p'); //Creates a text p element
		listItemLink_Text.innerHTML = navigationListItems_Select; //Sets text to selected page navi text
		listItemLink_Text.classList.add("Header_PageNavi_Textbox_List_Item"); //Adds the styling to the object
		document.getElementById("pageElement_PageNaviList_Item_"+i).appendChild(listItemLink_Text); //Attaches object to the a object
		
		//Creates the list on the header menu (only appears when the screen is small enough)
		
		//Attaches to the page
		var listItemLink = document.createElement('a'); //Creates an a element
		listItemLink.href = navigationListItems_Link_Select; //Adds the link
		listItemLink.setAttribute("id", "pageElement_PageNaviList_Item_"+i); //Adds an id to attach the text
		document.getElementById("pageElement_Header_Menu_PageNaviList").appendChild(listItemLink); //Attaches the a element to the page navi element
		
		var listItemLink_Text = document.createElement('p'); //Creates a text p element
		listItemLink_Text.innerHTML = navigationListItems_Select; //Sets text to selected page navi text
		listItemLink_Text.classList.add("Header_PageNavi_Textbox_List_Item"); //Adds the styling to the object
		document.getElementById("pageElement_PageNaviList_Item_"+i).appendChild(listItemLink_Text); //Attaches object to the a object
	}
}

function generate_Launcher_HeaderButtons(pageName){
	let Generator_HeaderButtons_Text = [];
	let Generator_HeaderButtons_Icon = [];
	let Generator_HeaderButtons_ID = [];
	let Generator_HeaderButtons_OnclickAction = [];
	switch (pageName){
		case "DL_ShortcutEditor.html":
			Generator_HeaderButtons_Text = ["Add Item", "Re-order categories", "Re-order shortcuts", "How to use"];
			Generator_HeaderButtons_Icon = ["Assets/Icons/icon_ExperimentalFeature.png", "Assets/Icons/icon_ExperimentalFeature.png", "Assets/Icons/icon_ExperimentalFeature.png", "Assets/Icons/icon_ExperimentalFeature.png"];
			Generator_HeaderButtons_ID = ["AddItem", "SwapList_Category", "Swaplist_Shortcut", "Tutorial_ShortcutEditor"];
			Generator_HeaderButtons_OnclickAction = ["open_Subwindow(this.id)", "open_Subwindow(this.id)", "open_Subwindow(this.id)", "open_Subwindow(this.id)"];
		break;
		case "DL_Settings.html":
			Generator_HeaderButtons_Text = ["Save changes"];
			Generator_HeaderButtons_Icon = ["Assets/Icons/icon_ExperimentalFeature.png"];
			Generator_HeaderButtons_ID = [""];
			Generator_HeaderButtons_OnclickAction = ["Settings_ApplyChanges()"];
		break;
	}
	for (a = 0; a != Generator_HeaderButtons_Text.length; a++){
		var HeaderButton_Text = document.createElement('h3');
		HeaderButton_Text.innerHTML = Generator_HeaderButtons_Text[a];
		HeaderButton_Text.classList.add("Header_Buttons_Item");
		HeaderButton_Text.setAttribute("id", Generator_HeaderButtons_ID[a]);
		HeaderButton_Text.setAttribute("onclick", Generator_HeaderButtons_OnclickAction[a]);
		document.getElementById("pageElement_Header_Buttons").appendChild(HeaderButton_Text);
	}
	
	for (a = 0; a != Generator_HeaderButtons_Text.length; a++){
		var HeaderButton_Text = document.createElement('p');
		HeaderButton_Text.innerHTML = Generator_HeaderButtons_Text[a];
		HeaderButton_Text.classList.add("Header_PageNavi_Textbox_List_Item");
		HeaderButton_Text.setAttribute("id", Generator_HeaderButtons_ID[a]);
		HeaderButton_Text.setAttribute("onclick", Generator_HeaderButtons_OnclickAction[a]);
		document.getElementById("pageElement_Header_Menu_PageActions").appendChild(HeaderButton_Text);
	}
}

function hide_ToggleableElements(){
	document.getElementById("pageElement_Toggleable_SearchBar").style.display = "none";
	document.getElementById("pageElement_SessionScreen").style.display = "none";
	document.getElementById("pageElement_SessionScreen").style.display = "none";
	document.getElementById("button_Wifi_textbox").style.display = "none";
	if (PageName == "DL_ShortcutEditor.html"){
		document.getElementById("subwindow_AddItem").style.display = "none";
	}
}

var AnimationFinish = 0;

function start_Animations(){
	var Header_Buttons_Item = document.querySelectorAll(".Header_Buttons_Item");
	var Header_Clock = document.querySelectorAll(".Header_Clock");
	var Header_Battery = document.querySelectorAll(".Header_Battery");
	var Header_RightMenu = document.querySelectorAll("Header_RightMenu");
	var Shortcut_Item = document.querySelectorAll(".Shortcut_Item");
	var Shortcut_Folder = document.querySelectorAll(".Category_Folder_Item");
	var Category = document.querySelectorAll(".Category");
	
	for (var i = 0; i < Header_Buttons_Item.length; i++) {
		var Header_Button_Item = Header_Buttons_Item[i];
		Header_Button_Item.style.transform = "translateY(-100%)";
		Header_Button_Item.style.display = "block";
		Header_Button_Item.style.animationName = "opening_HeaderButtons";
		Header_Button_Item.style.animationDuration = "0.5s";
		var delay = 0.3 + i / 5;
		
		Header_Button_Item.style.animationDelay = delay + "s";
		Header_Button_Item.style.animationFillMode = "forwards";
	}
	for (var a = 0; a < Shortcut_Item.length; a++) {
		var Shortcut_Item_Select = Shortcut_Item[a];
		Shortcut_Item_Select.style.opacity = "0%";
		Shortcut_Item_Select.style.display = "block";
		Shortcut_Item_Select.style.animationName = "opening_ShortcutItems";
		Shortcut_Item_Select.style.animationDuration = "0.5s";
		var delay2 = 0.1 + a / 15;
		
		Shortcut_Item_Select.style.animationDelay = delay2 + "s";
		Shortcut_Item_Select.style.animationFillMode = "forwards";
		if(a == (Shortcut_Item.length - 1)){
			AnimationFinish++;
			check_AnimationFinish();
			console.log("Finished items"+AnimationFinish);
		}
	}
	for (var b = 0; b < Shortcut_Folder.length; b++) {
		var Shortcut_Folder_Select = Shortcut_Folder[b];
		Shortcut_Folder_Select.style.opacity = "0%";
		Shortcut_Folder_Select.style.display = "grid";
		Shortcut_Folder_Select.style.animationName = "opening_ShortcutItems";
		Shortcut_Folder_Select.style.animationDuration = "0.5s";
		var delay3 = 0.1 + b / 15;
		
		Shortcut_Folder_Select.style.animationDelay = delay3 + "s";
		Shortcut_Folder_Select.style.animationFillMode = "forwards";
		if(b == (Shortcut_Folder.length - 1)){
			AnimationFinish++;
			check_AnimationFinish();
			console.log("Finished items"+AnimationFinish);
		}
	}
	
	
	
	
}

function check_AnimationFinish(){
	if(AnimationFinish == 2){
		setTimeout(reset_toDefaultAnimations, 2500);
		console.log("Reset");
	}
}

function reset_toDefaultAnimations(){
	var Shortcut_Item = document.querySelectorAll(".Shortcut_Item");
	var Shortcut_Folder = document.querySelectorAll(".Category_Folder_Item");
	for (var a = 0; a < Shortcut_Item.length; a++) {
		var Shortcut_Item_Select = Shortcut_Item[a];
		Shortcut_Item_Select.style.opacity = "0%";
		Shortcut_Item_Select.style.display = "block";
		Shortcut_Item_Select.style.animationName = "tabOpening";
		Shortcut_Item_Select.style.animationDuration = "0s";
		var delay2 = 0;
		
		Shortcut_Item_Select.style.animationDelay = delay2 + "s";
		Shortcut_Item_Select.style.animationFillMode = "forwards";
	}
	for (var b = 0; b < Shortcut_Folder.length; b++) {
		var Shortcut_Folder_Select = Shortcut_Folder[b];
		Shortcut_Folder_Select.style.opacity = "0%";
		Shortcut_Folder_Select.style.display = "grid";
		Shortcut_Folder_Select.style.animationName = "tabOpening";
		Shortcut_Folder_Select.style.animationDuration = "0s";
		var delay3 = 0;
		
		Shortcut_Folder_Select.style.animationDelay = delay3 + "s";
		Shortcut_Folder_Select.style.animationFillMode = "forwards";
	}
}

var sessionScreenState;
function sessionCheck(){
	if (sessionStorage.getItem("DL2_UserOpened") === null) {
		console.log("Session key does not exist");
		sessionStorage.setItem("DL2_UserOpened", "yes");
		console.log("Added session key");
		sessionScreenState = "visible";
		console.log(sessionScreenState);
		
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();
		today = mm + '/' + dd + '/' + yyyy;
		date = today;
		var d = new Date();
		var n = d.getDay();
		if (n == 0){
			var day = "Sunday";
		}
		if (n == 1){
			var day = "Monday";
		}
		if (n == 2){
			var day = "Tuesday";
		}
		if (n == 3){
			var day = "Wednesday";
		}
		if (n == 4){
			var day = "Thursday";
		}
		if (n == 5){
			var day = "Friday";
		}
		if (n == 6){
			var day = "Saturday";
		}
		} else {
		var SessionScreen = document.getElementById("pageElement_SessionScreen");
		SessionScreen.style.display = "none";
		sessionScreenState = "invisible";
		//start_Animations();
	}
}

function open_SessionScreen(){
	sessionScreenState = "visible";
	var x = document.getElementById("pageElement_SessionScreen");
	x.style.animationName = "open_SessionScreen";
	x.style.animationDuration = "0.3s";
	x.style.animationFillMode = "forwards";
	x.style.display = "block"
	setTimeout(function(){x.style.display = "block"; start_Animations();}, 500);
	
	var shortcutObjects = document.querySelectorAll(".Shortcut_Item");
    for (var a = 0; a < shortcutObjects.length; a++) {
        shortcutObjects[a].style.display = "none";
	}
}

function close_SessionScreen(){
	sessionScreenState = "invisible";
	console.log(sessionScreenState);
	var x = document.getElementById("pageElement_SessionScreen");
	x.style.animationName = "close_SessionScreen";
	x.style.animationDuration = "0.3s";
	x.style.animationFillMode = "forwards";
	setTimeout(function(){x.style.display = "none"; start_Animations();}, 500);
	start_Animations();
	
}

var windowSizePreset = "normal";
var windowDeviceType = "Desktop";
window.addEventListener('resize', check_WindowSize);
function check_WindowSize(){
	windowWidth = window.innerWidth;
	if (windowWidth < 750){ //Small size
		windowSizePreset = "small";
		} else { //Normal size
		windowSizePreset = "normal";
	}
	
	var TitleText = document.querySelectorAll(".Header_Title");
	
	if (windowSizePreset == "small"){
		for (a = 0; a < TitleText.length; a++){
			TitleText[a].style.fontSize = "50px";
		}
	} else if (windowSizePreset == "normal"){
		for (a = 0; a < TitleText.length; a++){
			TitleText[a].style.fontSize = "70px";
		}
	}
	
}

/*document.onkeypress = function (f) {
    //space = space || window.event;
	toggle_Category_All();
};*/
var dev_debug_ElementOutlines = 0;
let keysPressed = {}; 
document.addEventListener('keydown', (event) => {
	keysPressed[event.key] = true;
	
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
	
	if (keysPressed['Control'] && event.key == 'q') {
		toggle_Category_All();
		
	}
	//if (PageName == "DL_ShortcutEditor.html"){
	if (keysPressed['Control'] && event.key == ' ') {
		if(document.getElementById("subwindow_AddItem").style.display == "none"){
			open_Subwindow("AddItem");
			} else {
			close_Subwindow("AddItem");
		}
		
	}
	if (keysPressed['Control'] && event.key == 'b') {
		open_SessionScreen();
		
	}
	if (keysPressed['Control'] && event.key == 'ArrowRight') {
		if(Behavior_DisplayCategoryNavigation == true){
			toggle_Sidebar_CategoryNavigation();
		}
		
	}
	
	if (keysPressed['Control'] && event.key == 'Shift') {
		toggle_SearchBar();
		
	}
	
	if (keysPressed['Control'] && event.key == 'i') {
		trigger_Open_ExperimentSelector();
		
	}
	
	/*if (keysPressed['Control'] && event.key == 'Alt') {
		if (enable_Dev_ToggleDivOutlines == true){
		document.getElementsByClassName("div").style.borderStyle = "solid";
		document.getElementsByClassName("div").style.borderColor = "yellow";
		}
		
	}*/
	
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

/*window.onkeydown= function(singleKeyPress){
	var searchBar2 = document.querySelector('.Header_QuickSearchBar_Input2');
	if(searchBar2 === document.activeElement){
	if(singleKeyPress.keyCode === enter_key){
	search_Query("headerMenu");	
	};
	}
	
	if(singleKeyPress.keyCode === right_arrow)
	{
	alert("Welcome to GeeksForGeeks!");
	};
};*/

//Toggle search bar
function toggle_SearchBar(){
	var SearchBar = document.getElementById("pageElement_Toggleable_SearchBar");
	if (SearchBar.style.display == "none"){
		SearchBar.style.display = "grid";
		SearchBar.style.animationFillMode = "forwards";
		SearchBar.style.animationName = "opening_SearchBar";
		SearchBar.style.animationDuration = "0.3s";
		document.getElementById("pageElement_SearchQuery_3").focus();
		document.getElementById("pageElement_SearchQuery_3").focus();
		document.getElementById("pageElement_SearchQuery_3") === document.activeElement;
		} else {
		SearchBar.style.animationName = "closing_SearchBar";
		SearchBar.style.animationDuration = "0.3s";
		SearchBar.style.animationFillMode = "forwards";
		setTimeout(function(){SearchBar.style.display = "none";}, 300);
	}
}

//Toggle sidebar
function toggle_Sidebar(){
	var Sidebar = document.getElementById("pageElement_Sidebar");
	if (Sidebar.style.width == "50px"){ //Expands the sidebar
		Sidebar.style.width = "320px";
		} else { //Closes the sidebar
		Sidebar.style.width = "50";
	}
}

//Toggle sidebar category navigation
function toggle_Sidebar_CategoryNavigation(){
	var Sidebar = document.getElementById("pageElement_Sidebar_CategoryNavigation");
	if (Sidebar.style.width == "0px"){ //Expands the sidebar
		Sidebar.style.width = "320px";
		Sidebar.style.paddingLeft = "10px";
		} else { //Closes the sidebar
		Sidebar.style.width = "0px";
		Sidebar.style.paddingLeft = "0px";
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
	var subwindowElement = document.getElementById("subwindow_"+ID);
	subwindowElement.style.display = "block";
	subwindowElement.style.animationFillMode = "forwards";
	subwindowElement.style.animationName = "opening_Subwindow";
	subwindowElement.style.animationDuration = "0.3s";
	subwindow_activeSubwindow = ID;
}

function close_Subwindow(ID){
	var subwindowElement = document.getElementById("subwindow_"+ID);
	subwindowElement.style.animationName = "closing_Subwindow";
	subwindowElement.style.animationDuration = "0.3s";
	subwindowElement.style.animationFillMode = "forwards";
	subwindow_activeSubwindow = "none";
	setTimeout(function(){subwindowElement.style.display = "none";}, 300);
	
}

function trigger_Open_SubWindow(ID){
	var subwindowID = ID;
	switch (subwindowID){
		case "launcherupdate":
		var windowElement = document.getElementById("UpdateBox");
		//document.getElementById("WindowContainer").appendChild(x);
		break;
		case "remindersbox":
		var windowElement = document.getElementById("RemindersBox");
		break;
		case "customLinkBox":
		var windowElement = document.getElementById("customLinkBoxContainer");
		break;
		case "removeLinkBox":
		var windowElement = document.getElementById("LinkRemoverBoxContainer");
		case "EditItem":
		var windowElement = document.getElementById("subwindow_EditItem");
		break;
	}
	//Common opening animation
	windowElement.style.display = "block";
	windowElement.style.animationFillMode = "forwards";
	windowElement.style.animationName = "windowOpening";
	windowElement.style.animationDuration = "var(--Element-Transition-Delay)";
}

//Closing mechanism
//Add the element ID in the case statement *add a 2 at the end to differentiate it with the opening trigger
//In the button, add the ID to be used for the function then onclick="trigger_Close_SubWindow(this.id)"
function trigger_Close_SubWindow(ID){
	var subwindowID = ID;
	switch (subwindowID){
		case "launcherupdate2":
		var windowElement = document.getElementById("UpdateBox");
		break;
		case "remindersbox2":
		var windowElement = document.getElementById("RemindersBox");
		break;
		case "customLinkBox2":
		var windowElement = document.getElementById("customLinkBoxContainer");
		break;
		case "removeLinkBox2":
		var windowElement = document.getElementById("LinkRemoverBoxContainer");
		break;
	}
	windowElement.style.animationName = "windowClosing";
	windowElement.style.animationDuration = "var(--Element-Transition-Delay)";
	windowElement.style.animationFillMode = "forwards";
	setTimeout(function(){windowElement.style.display = "none";}, 300);
}

function startTime() {
	const today = new Date();
	let h = today.getHours();
	let m = today.getMinutes();
	let s = today.getSeconds();
	m = checkTime(m);
	s = checkTime(s);
	//var = displayTime;
	
	var displayHour;
	
	switch(h){
		case 0:
		var displayHour = 12;
		break;
		case 13:
		var displayHour = 1;
		break;
		case 14:
		var displayHour = 2;
		break;
		case 15:
		var displayHour = 3;
		break;
		case 16:
		var displayHour = 4;
		break;
		case 17:
		var displayHour = 5;
		break;
		case 18:
		var displayHour = 6;
		break;
		case 19:
		var displayHour = 7;
		break;
		case 20:
		var displayHour = 8;
		break;
		case 21:
		var displayHour = 9;
		break;
		case 22:
		var displayHour = 10;
		break;
		case 23:
		var displayHour = 11;
		break;
		default:
		var displayHour = h;
	}
	if (pageProperty_enableGreetings == 1){
		if(Behavior_DisplayGreetings == true){
			if (h >= 0 && h<=6){
				document.getElementById('pageElement_Greeting').innerHTML = "Good Evening";
			}
			if (h >= 6 && h<=11){
				document.getElementById('pageElement_Greeting').innerHTML = "Good Morning";
			}
			if (h >= 12 && h<=18){
				document.getElementById('pageElement_Greeting').innerHTML = "Good Afternoon";
			}
			if (h >= 19 && h<=24){
				document.getElementById('pageElement_Greeting').innerHTML = "Good Evening";
			}
			if(Behavior_DisplayGreetings_DisplayName == true){
				if (h >= 0 && h<=6){
					document.getElementById('pageElement_Greeting').innerHTML = "Good Evening, "+Behavior_DisplayGreetings_DisplayName_Text;
				}
				if (h >= 6 && h<=11){
					document.getElementById('pageElement_Greeting').innerHTML = "Good Morning, "+Behavior_DisplayGreetings_DisplayName_Text;
				}
				if (h >= 12 && h<=18){
					document.getElementById('pageElement_Greeting').innerHTML = "Good Afternoon, "+Behavior_DisplayGreetings_DisplayName_Text;
				}
				if (h >= 19 && h<=24){
					document.getElementById('pageElement_Greeting').innerHTML = "Good Evening, "+Behavior_DisplayGreetings_DisplayName_Text;
				}
			}
			} else {
			document.getElementById('pageElement_Greeting').style.display = "none";
		}
	}
	
	var AMPM;
	if (h <= 12 && h >= 0){
		var AMPM = "AM";
		} else {
		var AMPM = "PM";
	}
	document.getElementById('Clock_Time').innerHTML =  displayHour + ":" + m + " " + AMPM;
	document.getElementById('Clock_Time_2').innerHTML =  displayHour + ":" + m + " " + AMPM;
	
	// document.getElementById("Sidebar_Clock_Time").innerHTML = displayHour + ":" + m + ":" + s + " "+AMPM;
	
	document.getElementById('Clock_Time_SessionScreen').innerHTML =  displayHour + ":" + m;
	
	
	var battery_level;
	navigator.getBattery()
	.then(function(battery) {
		var battery_level = Math.round((battery.level)*100);
		document.getElementById('Battery_Level').innerHTML =  battery_level+"%";
		document.getElementById('Battery_Level_2').innerHTML =  battery_level+"%";
	});
	
	if (battery_level <= 15){
		document.getElementById('Battery_Level').style.color = "#ff3c19";
	}
	//check_Connection();
	setTimeout(startTime, 1000);
	
}

function checkTime(i) {
	if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
	return i;
}
var date;
function startDate(){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today = mm + '/' + dd + '/' + yyyy;
	date = today;
	//document.write(today);
	//document.getElementById('DateClass').innerHTML =  today;
	displayDay();
}
var day;
function displayDay() {
	var d = new Date();
	var n = d.getDay();
	if (n == 0){
		var day = "Sunday";
	}
	if (n == 1){
		var day = "Monday";
	}
	if (n == 2){
		var day = "Tuesday";
	}
	if (n == 3){
		var day = "Wednesday";
	}
	if (n == 4){
		var day = "Thursday";
	}
	if (n == 5){
		var day = "Friday";
	}
	if (n == 6){
		var day = "Saturday";
	}
	document.getElementById("Clock_Date").innerHTML = day + ", "+ date;
	document.getElementById("Clock_Date_2").innerHTML = day + ", "+ date;
	// document.getElementById("Sidebar_Clock_Date").innerHTML = day + ", "+ date;
	if (sessionScreenState == "visible"){
		document.getElementById("Clock_Date_SessionScreen").innerHTML = day + ", "+ date;
	}
	setTimeout(displayDay, 5000);
}




function formatAMPM(date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
	document.getElementById('ClockClass2').innerHTML =  strTime;
}

/*navigator.getBattery()
	.then(function(battery) {
	var battery_level = Math.round((battery.level)*100);
	document.getElementById('Battery_Level').innerHTML =  battery_level+"%";
});*/

function toggle_Textbox(id){
	var textboxElement = document.getElementById(id+"_textbox");
	if (textboxElement.style.display == "none"){ //Opening
		textboxElement.style.display = "block";
		textboxElement.style.animationFillMode = "forwards";
		textboxElement.style.animationName = "open_Textbox";
		textboxElement.style.animationDuration = "0.3s";
		} else { //Closing
		textboxElement.style.animationName = "close_Textbox";
		textboxElement.style.animationDuration = "0.3s";
		textboxElement.style.animationFillMode = "forwards";
		setTimeout(function(){textboxElement.style.display = "none";}, 500);
	}	
}

function toggle_Sidebar_TimeDate(){
	var textboxElement = document.getElementById("pageElement_Sidebar_TimeDate");
	if (textboxElement.style.display == "none"){ //Opening
		textboxElement.style.display = "grid";
		textboxElement.style.animationFillMode = "forwards";
		textboxElement.style.animationName = "open_Textbox";
		textboxElement.style.animationDuration = "0.3s";
		} else { //Closing
		textboxElement.style.animationName = "close_Textbox";
		textboxElement.style.animationDuration = "0.3s";
		textboxElement.style.animationFillMode = "forwards";
		setTimeout(function(){textboxElement.style.display = "none";}, 500);
	}	
}

function toggle_Navigator(id){
	var NavigatorElement = document.getElementById("button_PageNavi_textbox");
	var NavigatorElementFull = document.getElementById("pageElement_Header_Menu");
	if (windowSizePreset != "small"){ //Normal size
		if (NavigatorElement.style.display == "none"){
			NavigatorElement.style.display = "block";
			NavigatorElement.style.animationFillMode = "forwards";
			NavigatorElement.style.animationName = "opening_Navigator_Container_Normal";
			NavigatorElement.style.animationDuration = "0.3s";
			} else {
			NavigatorElement.style.animationName = "closing_Navigator_Container_Normal";
			NavigatorElement.style.animationDuration = "0.3s";
			NavigatorElement.style.animationFillMode = "forwards";
			setTimeout(function(){NavigatorElement.style.display = "none";}, 300);
		}
		} else { //Small size
		if (NavigatorElementFull.style.display == "none"){
			NavigatorElementFull = document.getElementById("pageElement_Header_Menu");
			NavigatorElementFull.style.display = "block";
			NavigatorElementFull.style.animationFillMode = "forwards";
			NavigatorElementFull.style.animationName = "opening_Navigator_Container_Full";
			NavigatorElementFull.style.animationDuration = "0.3s";
			} else {
			NavigatorElementFull = document.getElementById("pageElement_Header_Menu");
			NavigatorElementFull.style.animationName = "closing_Navigator_Container_Full";
			NavigatorElementFull.style.animationDuration = "0.3s";
			NavigatorElementFull.style.animationFillMode = "forwards";
			setTimeout(function(){NavigatorElementFull.style.display = "none";}, 300);
		}
	}	
}


var SE_CreateItem_categoryTitle; //For SE_CreateItem; Used to display category title on toast notifications
var SE_CreateItem_ShortcutText; //For SE_CreateItem
var SE_CreateItem_ShortcutURL; //For SE_CreateItem
var toast_Count = 1;
function trigger_createToast(type){
	if (document.getElementById("button_PageNavi_textbox").style.display == "block"){
		document.getElementById("pageElement_ToastDrawer").style.paddingTop = "400px";
		} else {
		document.getElementById("pageElement_ToastDrawer").style.paddingTop = "75px";
	}
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


/* window.onscroll = function() {scrollFunction()};
function scrollFunction() {
	pageElement_CornerButtons = document.getElementById("pageElement_CornerButtons");
	if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 20) {
		pageElement_CornerButtons.style.display = "block";
		} else {
		pageElement_CornerButtons.style.display = "none";
	}
} */

function trigger_toggleDropdown(ID){
	var dropdownMenu = document.getElementById("menu_"+ID);
	var dropdownButton = document.getElementById(ID);
	var dropdownItems = document.querySelectorAll(".Input_Dropdown_Item");	
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
		setTimeout(function(){dropdownMenu.style.display = "none";}, 500);
		dropdownButton.style.backgroundColor = "#121212";
	}
}



function search_Query(position){
	var setting_PreferredSearchEngine = Behavior_DisplaySearchBar_PreferredEngine; 
	switch (position){
		case "headerMain":
		var searchQuery = document.getElementById("pageElement_SearchQuery").value;
		document.getElementById("pageElement_SearchQuery").value = "";
		break;
		case "headerMenu":
		var searchQuery = document.getElementById("pageElement_SearchQuery2").value;
		document.getElementById("pageElement_SearchQuery2").value = "";
		break;
		case "toggleable":
		var searchQuery = document.getElementById("pageElement_SearchQuery_3").value;
		document.getElementById("pageElement_SearchQuery_3").value = "";
		break;
	}
	if(searchQuery != ""){
		switch (setting_PreferredSearchEngine){
			case "Ecosia":
			window.open("https://www.ecosia.org/search?method=index&q="+searchQuery);
			break;
			case "Google":
			window.open("http://google.com/search?q="+searchQuery);
			break;
			case "Bing":
			window.open("https://www.bing.com/search?q="+searchQuery);
			break;
			case "DuckDuckGo":
			window.open("https://duckduckgo.com/?q="+searchQuery);
			break;
			case "Yahoo!":
			window.open("https://search.yahoo.com/search?p="+searchQuery);
			break;
		}
		} else {
		trigger_createToast("SearchBar_NoQuery");
	}
}


// Shortcut editor
//var key_Index_Category = "key_Index_Category"; //The key that contains information to create categories
//var key_Selected_Category = "key_Selected_Category"; //The selected category to access
//var key_Content_Category = "key_Content_Category"; //The key that contains the contents of the category selected
//var key_Index_Category_Folder; //The key that contains the information of all the folders in the selected category
//var key_Selected_Category_Folder; //The selected category folder to access
//var key_Content_Category_Folder; //The key that contains the contents of the folder selected

const systemTest_Category = ["Category", "Category 1", "Category 2", "Category 3", "Category 4"]; //For testing only; Creates the category array
localStorage.setItem("systemTest_CategoryIndex", JSON.stringify(systemTest_Category)); //For testing only; Saves the category array

const systemTest_CategoryItem1 = ["Category", "Category 1 Item", "Category 1 Item", "Category 1 Item"]; //For testing only; Creates the category array
localStorage.setItem("Content_Category 1", JSON.stringify(systemTest_CategoryItem1)); //For testing only; Saves the category array
const systemTest_CategoryItem1_URLs = ["Category", "Category 1 Item", "Category 1 Item", "Category 1 Item"]; //For testing only; Creates the category array
localStorage.setItem("Content_URL_Category 1", JSON.stringify(systemTest_CategoryItem1_URLs)); //For testing only; Saves the category array

const systemTest_CategoryItem2 = ["Category", "Category 2 Item", "Category 2 Item", "Category 2 Item"]; //For testing only; Creates the category array
localStorage.setItem("Content_Category 2", JSON.stringify(systemTest_CategoryItem2)); //For testing only; Saves the category array
const systemTest_CategoryItem2_URLs = ["Category", "Category 1 Item", "Category 1 Item", "Category 1 Item"]; //For testing only; Creates the category array
localStorage.setItem("Content_URL_Category 2", JSON.stringify(systemTest_CategoryItem2_URLs)); //For testing only; Saves the category array

const systemTest_CategoryItem3 = ["Category", "Category 3 Item", "Category 3 Item", "Category 3 Item"]; //For testing only; Creates the category array
localStorage.setItem("Content_Category 3", JSON.stringify(systemTest_CategoryItem3)); //For testing only; Saves the category array
const systemTest_CategoryItem3_URLs = ["Category", "Category 1 Item", "Category 1 Item", "Category 1 Item"]; //For testing only; Creates the category array
localStorage.setItem("Content_URL_Category 3", JSON.stringify(systemTest_CategoryItem3_URLs)); //For testing only; Saves the category array

const systemTest_CategoryItem4 = ["Category", "Category 4 Item", "Category 4 Item", "Category 4 Item", "Category 4 Item"]; //For testing only; Creates the category array
localStorage.setItem("Content_Category 4", JSON.stringify(systemTest_CategoryItem4)); //For testing only; Saves the category array
const systemTest_CategoryItem4_URLs = ["Category", "Category 1 Item", "Category 1 Item", "Category 1 Item"]; //For testing only; Creates the category array
localStorage.setItem("Content_URL_Category 4", JSON.stringify(systemTest_CategoryItem4_URLs)); //For testing only; Saves the category array


var key_Index_Category = "DL_CategoryIndex"; //Key that contains the index of categories to be created
const SE_Array_Category_Index = []; //Creates the array of categories
var SE_Category_Index = localStorage.getItem(key_Index_Category);
var SE_Category_Count;
if (SE_Category_Index){
	var SE_Category_Count = Object.keys(JSON.parse(localStorage.getItem(key_Index_Category))).length; //Gets the length of the selected key
	var SE_Category_Data = Object.values(JSON.parse(localStorage.getItem(key_Index_Category)));//Gets the data from selected key and temporarily stores it into variable
	for (a = 0; a != SE_Category_Count; a++){
		SE_Array_Category_Index.push(SE_Category_Data[a]); //Transfers all data from variable into category array
	} 
	console.log("key_Index_Category exists");
	} else { //Selected item does not exist
	SE_Array_Category_Index.push("Category1"); //Adds the item "link" to the category array 
	localStorage.setItem("DL_CategoryIndex", JSON.stringify(SE_Array_Category_Index)); //Saves the category array into the selected key 
	window.location.href = "DL_ShortcutEditor.html";
	location.reload();
	console.log(SE_Array_Category_Index); //Debug
}



var SE_Selected_Key_Items; //Value of the selected key (text)
var SE_Selected_Key_URLs; //Value of the selected key (urls)

let SE_Array_ListText = []; //Creates the list text array
let SE_Array_ListURL = []; //Creates the list url array

//var SE_LinkText_Item = localStorage.getItem(SE_Selected_Key_Items); //Gets data from the selected key and stores it in the variable
//var SE_LinkURL_Item = localStorage.getItem(SE_Selected_Key_URLs); //Gets data from the selected key and stores it in the variable
//console.log(SE_LinkText_Item); //Debug
//console.log(SE_LinkURL_Item); //Debug

var SE_LinkCount; //The total count of the texts in the selected key
var SE_URLCount; //The total count of the urls in the selected key
//Put the contents of an item key to an array

//Check if the selected key exists and store data into the designated array
//For the link texts
/*if (SE_LinkText_Item){ //Selected item exists
	var SE_LinkCount = Object.keys(JSON.parse(localStorage.getItem(SE_Selected_Key_Items))).length; //Gets the length of the selected key
	console.log(SE_LinkCount); //Debug
	var SE_LinkItemData = Object.values(JSON.parse(localStorage.getItem(SE_Selected_Key_Items))); //Gets the data from selected key and temporarily stores it into variable
	for (a = 0; a != SE_LinkCount; a++){
	SE_Array_ListText.push(SE_LinkItemData[a]); //Transfers all data from variable into link array
	}
	console.log(SE_Array_ListText); //Debug
	} else { //Selected item does not exist
	SE_Array_ListText.push("link"); //Adds the item "link" to the link array
	localStorage.setItem(SE_Selected_Key_Items, JSON.stringify(SE_Array_ListText)); //Saves the link array into the selected key
	console.log(SE_Array_ListText); //Debug
}*/

//For the link urls
/*
	if (SE_LinkURL_Item){ //Selected item exists
	var SE_URLCount = Object.keys(JSON.parse(localStorage.getItem(SE_Selected_Key_URLs))).length; //Gets the length of the selected key
	console.log(SE_URLCount); //Debug
	var SE_LinkItemData = Object.values(JSON.parse(localStorage.getItem(SE_Selected_Key_URLs))); //Gets the data from selected key and temporarily stores it into variable
	for (a = 0; a != SE_URLCount; a++){
	SE_Array_ListURL.push(SE_LinkItemData[a]); //Transfers all data from variable into link array
	}
	console.log(SE_Array_ListURL); //Debug
	} else { //Selected item does not exist
	SE_Array_ListURL.push("url"); //Adds the item "url" to the link array
	localStorage.setItem(SE_Selected_Key_Items, JSON.stringify(SE_Array_ListURL)); //Saves the link array into the selected key
	console.log(SE_Array_ListURL); //Debug
}*/

//Builds the category tabs
function render_Categories(){
	if (SE_Category_Count == 1){
		document.getElementById("pageElement_LibraryEmptyNotif").style.display = "block";
	}
	for (a = 1; a != SE_Category_Count; a++){
		var categoryDiv = document.createElement('div'); //Creates the container div element
		categoryDiv.setAttribute("id", "pageElement_CategoryDiv_"+a); //Adds id to div
		categoryDiv.classList.add("Category"); //Adds CSS to div
		document.getElementById("pageElement_ContentContainer").appendChild(categoryDiv);
		
		var categoryLabel = document.createElement('div'); //Creates the label div
		categoryLabel.setAttribute("id", "category_"+a); //Adds id to label
		categoryLabel.setAttribute("onclick", "toggle_Category(this.id)");
		categoryLabel.classList.add("Category_Label"); //Adds CSS to label
		document.getElementById("pageElement_CategoryDiv_"+a).appendChild(categoryLabel);
		
		var categoryLabelText = document.createElement('h1'); //Creates h1 element
		categoryLabelText.classList.add("Category_Label_Text"); //Adds CSS to h1 element
		categoryLabelText.innerHTML = SE_Array_Category_Index[a]; //Adds text
		document.getElementById("category_"+a).appendChild(categoryLabelText);
		
		var categoryLabelImg = document.createElement('img'); //Creates an img element
		categoryLabelImg.src = "Assets/Icons/icon_upArrow.png"; //Sets image source
		categoryLabelImg.setAttribute("id", "arrow_category_"+a); //Adds id to icon
		categoryLabelImg.classList.add("Category_Label_Toggle"); //Adds CSS to toggle
		document.getElementById("category_"+a).appendChild(categoryLabelImg);
		
		var categoryContent = document.createElement('div'); //Creates the content container div
		categoryContent.setAttribute("id", "content_category_"+a); //Adds id to container
		categoryContent.classList.add("Category_Content_Container");
		document.getElementById("pageElement_CategoryDiv_"+a).appendChild(categoryContent);
		
		var categoryShortcuts = document.createElement('div'); //Creates the button container div
		categoryShortcuts.setAttribute("id", "content_categoryButtons_"+a); //Adds id to container
		categoryShortcuts.classList.add("Category_Shortcuts");
		document.getElementById("content_category_"+a).appendChild(categoryShortcuts);
		
		if(PageName == "DL_Main.html"){
			var categoryNavigation_Anchor = document.createElement('a');
			categoryNavigation_Anchor.setAttribute("id", "categoryNavigation_"+a);
			categoryNavigation_Anchor.setAttribute("href", "#pageElement_CategoryDiv_"+a);
			document.getElementById("pageElement_Sidebar_CategoryNavigation").appendChild(categoryNavigation_Anchor);
			
			var categoryNavigation_Text = document.createElement('p');
			categoryNavigation_Text.classList.add("Sidebar_CategoryNavigation_Item");;
			categoryNavigation_Text.innerHTML = SE_Array_Category_Index[a];
			document.getElementById("categoryNavigation_"+a).appendChild(categoryNavigation_Text);
		}
		
	}
	render_Shortcuts();
}

//Builds the shortcut buttons inside the category folder
function render_Shortcuts(){
	//console.log(SE_LinkCount);
	var SE_LinkCount = 0;
	var SE_URLCount = 0;
	console.log(SE_Category_Count);
	for (arrayItem = 1; arrayItem != SE_Category_Count; arrayItem++){ //Loops the code for each category item stored in key_Index_Category
		console.log("========= Category Loop# "+arrayItem);
		var SE_Selected_Key_Items = SE_Array_Category_Index[arrayItem]; //Selects a category item
		SE_Selected_Key_Content = "DL_Content_"+SE_Selected_Key_Items; //This will be used in accessing the data for the selected category
		console.log("SE_Selected_Key_Items: "+SE_Selected_Key_Items); //Debug
		console.log("SE_Selected_Key_Content: "+SE_Selected_Key_Content); //Debug
		
		var SE_LinkCount = Object.keys(JSON.parse(localStorage.getItem(SE_Selected_Key_Content))).length; //Get the total count of content inside the selected key
		console.log("SE_LinkCount: "+SE_LinkCount); //Debug
		console.log("SE_Selected_Key_Content Content: "+localStorage.getItem(SE_Selected_Key_Content)); //Debug
		var SE_LinkItemData = Object.values(JSON.parse(localStorage.getItem(SE_Selected_Key_Content))); //Gets the values from the selected content key and store it temporarily into the variable
		for (a = 1; a != SE_LinkCount; a++){ //Puts all the content of the selected key into the array
			SE_Array_ListText.push(SE_LinkItemData[a]); //Transfers all data from variable into link array
			
		}
		
		SE_Selected_Key_ContentURL = "DL_Content_URL_"+SE_Selected_Key_Items; //This will be used in accessing the data for the selected category
		console.log(SE_Selected_Key_ContentURL);
		var SE_URLCount = Object.keys(JSON.parse(localStorage.getItem(SE_Selected_Key_ContentURL))).length; //Get the total count of content inside the selected key
		console.log("SE_URLCount: "+SE_URLCount);
		var SE_LinkItemURLData = Object.values(JSON.parse(localStorage.getItem(SE_Selected_Key_ContentURL))); //Gets the values from the selected content key and store it temporarily into the variable
		console.log(SE_LinkItemURLData);
		for (b = 1; b != SE_URLCount; b++){ //Puts all the content of the selected key into the array
			SE_Array_ListURL.push(SE_LinkItemURLData[b]); //Transfers all data from variable into link array
			
			
		}
		
		console.log("SE_LinkCount: "+SE_LinkCount);
		console.log("SE_URLCount: "+SE_URLCount);
		
		console.log("SE_Array_ListText: "+SE_Array_ListText); //Debug
		for (linkItem = 0; linkItem != SE_LinkCount - 1; linkItem++){ //Builds the link buttons inside the category tab
			console.log("Processing item: "+SE_Array_ListText[linkItem]);
			var linkAnchor = document.createElement('a'); //Creates the anchor element
			linkAnchor.setAttribute("href", SE_Array_ListURL[linkItem]); //Sets the href link for the item
			linkAnchor.setAttribute("id", "content_categoryButtons_anchor_"+arrayItem+"_"+linkItem); //Sets the id content_categoryButtons_anchor_<category#>_<categoryitem#>
			linkAnchor.setAttribute("target", "_blank"); //Opens a new tab when clicked
			document.getElementById("content_categoryButtons_"+arrayItem).appendChild(linkAnchor); //Attaches to the content container
			
			var linkButton = document.createElement('div'); //Creates the div button element
			linkButton.classList.add("Shortcut_Item"); //Adds CSS to the object
			linkButton.innerHTML = SE_Array_ListText[linkItem]; //Sets text to the selected linkbutton item
			document.getElementById("content_categoryButtons_anchor_"+arrayItem+"_"+linkItem).appendChild(linkButton); //Attaches the button into the content container
			//console.log(linkItem); //Debug
		}
		SE_Array_ListText = [];
		SE_Array_ListURL = [];//Clears the content array
		
	}
}

//Renders the shortcuts into the page screen
//This applies only to the Shortcut Editor page's table view
/*function SE_Render_List_TableView(){
	for (a = 1; a != SE_LinkCount; a++){
	var tableRow = document.createElement('tr'); //Creates table row element
	tableRow.setAttribute("id", "SE_TV_Row_"+a); //Adds id to the table row
	tableRow.classList.add("Table_Row"); //Adds CSS class to the table row
	document.getElementById("pageElement_SE_Table").appendChild(tableRow); //Attaches table row to the page
	
	var tableCell_Name = document.createElement('th'); //Creates a table cell element
	tableCell_Name.innerHTML = SE_Array_ListText[a]; //Sets text to the selected listtext item
	tableCell_Name.classList.add("Table_Cell"); //Adds CSS class to the table cell
	document.getElementById("SE_TV_Row_"+a).appendChild(tableCell_Name); //Attaches to the table row
	
	var tableCell_URL = document.createElement('th'); //Creates a table cell element
	tableCell_URL.innerHTML = SE_Array_ListURL[a]; //Sets text to the selected listtext item
	tableCell_URL.classList.add("Table_Cell"); //Adds CSS class to the table cell
	document.getElementById("SE_TV_Row_"+a).appendChild(tableCell_URL); //Attaches to the table row
	}
}*/


//The type of item to be added
var SE_AddItem_TypeSelected = "select_Shortcut";
//Gets the ID of the selected button
var path = window.location.pathname;
var PageName = path.split("/").pop();
console.log("Welcome to "+VersionTitle+" "+VersionNumber+" ("+ContinuityVersionNumber+"). Copyright "+CopyrightTitle);
/*if (PageName == "DL_ShortcutEditor.html"){
	document.getElementById('section_Category').style.display = "none";
	document.getElementById('section_Folder').style.display = "none";
	document.getElementById('section_Shortcut').style.display = "none";
}*/

function SE_ItemSelection(ID){
	switch(ID){
		case 'select_Category':
		document.getElementById('SE_AddItem_Description').innerHTML = "A category is a toggleable tab that contains your shortcuts.";
		document.getElementById('section_Category').style.display = "grid";
		document.getElementById('section_Folder').style.display = "none";
		document.getElementById('section_Shortcut').style.display = "none";
		break;
		case 'select_Folder':
		document.getElementById('SE_AddItem_Description').innerHTML = "A folder is a list that you can use to group similar shortcuts together in a list form. It is not toggleable.";
		document.getElementById('section_Folder').style.display = "grid";
		document.getElementById('section_Category').style.display = "none";
		document.getElementById('section_Shortcut').style.display = "none";
		break;
		case 'select_Shortcut':
		document.getElementById('SE_AddItem_Description').innerHTML = "A shortcut is a clickable button that will lead to the URL you provided.";
		document.getElementById('section_Shortcut').style.display = "grid";
		document.getElementById('section_Category').style.display = "none";
		document.getElementById('section_Folder').style.display = "none";
		break;
	}
	SE_AddItem_TypeSelected = ID;
	console.log(SE_AddItem_TypeSelected);
}

//Creates the dropdown elements
function SE_CreateDropdown(){
	var CategoryCount = Object.keys(JSON.parse(localStorage.getItem("DL_CategoryIndex"))).length;
	
	/* Create the category index*/
	var Renderer_Category_Array = [];
	var Renderer_Category_Array_Data = Object.values(JSON.parse(localStorage.getItem("DL_CategoryIndex"))); //Stor the category index to a temporary variable
	for (a = 0; a != CategoryCount; a++){ //Puts all the content of the selected key into the array
		Renderer_Category_Array.push(Renderer_Category_Array_Data[a]); 
		//Push the data into the actual array
	}
	
	for (a = 1; a != CategoryCount; a++){
		var dropdown_Folder = document.createElement('p');
		dropdown_Folder.classList.add("Input_Dropdown_Item");
		dropdown_Folder.innerHTML = Renderer_Category_Array[a];
		dropdown_Folder.setAttribute("id", "dropdownItem_Folder"+Renderer_Category_Array[a]);
		dropdown_Folder.setAttribute("onclick", "trigger_dropdownItemSelected(this.id)");
		document.getElementById("menu_dropdownButton_AddItem_Folder").appendChild(dropdown_Folder);
	}
	for (b = 1; b != CategoryCount; b++){
		var dropdown_Shortcut = document.createElement('p');
		dropdown_Shortcut.classList.add("Input_Dropdown_Item");
		dropdown_Shortcut.innerHTML = Renderer_Category_Array[b];
		dropdown_Shortcut.setAttribute("id", "dropdownItem_Shrtct"+Renderer_Category_Array[b]);
		dropdown_Shortcut.setAttribute("onclick", "trigger_dropdownItemSelected(this.id)");
		document.getElementById("menu_dropdownButton_AddItem_Shortcut1").appendChild(dropdown_Shortcut);
	}
	for (c = 1; c != CategoryCount; c++){ // Import shortcuts category selector
		var dropdown_Shortcut = document.createElement('p');
		dropdown_Shortcut.classList.add("Input_Dropdown_Item");
		dropdown_Shortcut.innerHTML = Renderer_Category_Array[c];
		dropdown_Shortcut.setAttribute("id", "dropdownItem_ImpSct"+Renderer_Category_Array[c]);
		dropdown_Shortcut.setAttribute("onclick", "trigger_dropdownItemSelected(this.id)");
		document.getElementById("menu_dropdownButton_Import_Shortcut").appendChild(dropdown_Shortcut);
	}
	for (d = 1; d != CategoryCount; d++){ // Export shortcuts category selector
		var dropdown_Shortcut = document.createElement('p');
		dropdown_Shortcut.classList.add("Input_Dropdown_Item");
		dropdown_Shortcut.innerHTML = Renderer_Category_Array[d];
		dropdown_Shortcut.setAttribute("id", "dropdownItem_ExpSct"+Renderer_Category_Array[d]);
		dropdown_Shortcut.setAttribute("onclick", "trigger_dropdownItemSelected(this.id)");
		document.getElementById("menu_dropdownButton_Export_Shortcut").appendChild(dropdown_Shortcut);
	}
}

function trigger_dropdownItemSelected(ID){
	console.log(ID); //Debug
	var selected_dropdownItem = document.getElementById(ID).textContent; //Gets the content of the clicked dropdown item
	console.log(selected_dropdownItem); //Debug
	var dropdown_List = ID.substr(0, 19); //Gets the ID type of the dropdown container the item belongs in
	console.log(dropdown_List);
	switch (dropdown_List){
		case "dropdownItem_Folder": //The ID type of the container
		document.getElementById("dropdownButton_AddItem_Folder").innerHTML = selected_dropdownItem; //Sets the text of the container to the text of the selected item
		trigger_toggleDropdown("dropdownButton_AddItem_Folder"); //Closes the dropdown menu after the click
		break;
		case "dropdownItem_Shrtct":
		document.getElementById("dropdownButton_AddItem_Shortcut1").innerHTML = selected_dropdownItem;
		trigger_toggleDropdown("dropdownButton_AddItem_Shortcut1");
		break;
		case "dropdownItem_ImgTyp":
		document.getElementById("dropdownButton_ImageType").innerHTML = selected_dropdownItem;
		trigger_toggleDropdown("dropdownButton_ImageType");
		break;
		case "dropdownItem_SeaEng":
		document.getElementById("dropdownButton_SeaEng").innerHTML = selected_dropdownItem;
		trigger_toggleDropdown("dropdownButton_SeaEng");
		case "dropdownItem_SpTest":
		document.getElementById("dropdownButton_SpTest").innerHTML = selected_dropdownItem;
		trigger_toggleDropdown("dropdownButton_SpTest");
		console.log("Optioned");
		break;
		case "dropdownItem_ImpSct":
		document.getElementById("dropdownButton_Import_Shortcut").innerHTML = selected_dropdownItem;
		trigger_toggleDropdown("dropdownButton_Import_Shortcut");
		console.log("Optioned");
		break;
		case "dropdownItem_ExpSct":
		document.getElementById("dropdownButton_Export_Shortcut").innerHTML = selected_dropdownItem;
		trigger_toggleDropdown("dropdownButton_Export_Shortcut");
		console.log("Optioned");
		break;
	}
}

function SE_CreateItem_StringTextTest(){
	var SE_StringTextTest_Score = 1;
	var SE_StringTextTest_Score2 = 1;
	switch (SE_AddItem_TypeSelected){
		case "select_Category":
			SE_CreateItem_categoryTitle = document.getElementById("form_SE_Category").value; //Gets the form answer
			for (a = 1; a < SE_CreateItem_categoryTitle.length; a++){
				console.log("Checking string input character "+a);
				console.log("Read character: "+SE_CreateItem_categoryTitle.charAt(a));
				if (SE_CreateItem_categoryTitle.charAt(a) != ";"){
					console.log("Character clear");
					SE_StringTextTest_Score++;
				} else {
					console.log("Character ';' found");
				}
			}
			console.log("Test score: "+SE_StringTextTest_Score);
			console.log("Length: "+SE_CreateItem_categoryTitle.length);
			if (SE_StringTextTest_Score == SE_CreateItem_categoryTitle.length){
				SE_CreateItem();
			} else {
				trigger_createToast("ShortcutEditor_InvalidCharacter");
			}
		break;
		case "select_Shortcut":
			SE_CreateItem_ShortcutText = document.getElementById("form_SE_Shortcut_Title").value;
			SE_CreateItem_ShortcutURL = document.getElementById("form_SE_Shortcut_URL").value;
			for (a = 1; a < SE_CreateItem_ShortcutText.length; a++){
				console.log("Checking string input character "+a);
				console.log("Read character: "+SE_CreateItem_ShortcutText.charAt(a));
				if (SE_CreateItem_ShortcutText.charAt(a) != ";"){
					console.log("Character clear");
					SE_StringTextTest_Score++;
				} else {
					console.log("Character ';' found");
				}
			}
			for (b = 1; b < SE_CreateItem_ShortcutURL.length; b++){
				console.log("Checking string input character "+b);
				console.log("Read character: "+SE_CreateItem_ShortcutURL.charAt(b));
				if (SE_CreateItem_ShortcutURL.charAt(b) != ";"){
					console.log("Character clear");
					SE_StringTextTest_Score2++;
				} else {
					console.log("Character ';' found");
				}
			}
			console.log("Test1 score: "+SE_StringTextTest_Score);
			console.log("Test2 score: "+SE_StringTextTest_Score2);
			console.log("Length: "+SE_CreateItem_ShortcutText.length);
			if (SE_StringTextTest_Score == SE_CreateItem_ShortcutText.length &&SE_StringTextTest_Score2 == SE_CreateItem_ShortcutURL.length){
				SE_CreateItem();
			} else {
				trigger_createToast("ShortcutEditor_InvalidCharacter");
			}
		break;
	}
}

function SE_CreateItem(){
	//console.log(SE_Array_Category_Index);
	console.log(SE_AddItem_TypeSelected); //Debug
	switch (SE_AddItem_TypeSelected){ //The type of item to be added
		case "select_Category":
		SE_CreateItem_categoryTitle = document.getElementById("form_SE_Category").value; //Gets the form answer
		if (SE_CreateItem_categoryTitle != ""){ //If the form is not empty
			SE_Array_Category_Index.push(SE_CreateItem_categoryTitle); //Add the typed item to the array
			console.log(SE_Array_Category_Index); //Debug
			localStorage.setItem(key_Index_Category, JSON.stringify(SE_Array_Category_Index)); //Saves the updated array to local storage
			
			// Creates the category content key for the created category //
			SE_Array_ListText = []; 
			SE_Array_ListText.push("fillerText");
			localStorage.setItem("DL_Content_"+SE_CreateItem_categoryTitle, JSON.stringify(SE_Array_ListText));
			
			SE_Array_ListURL = [];
			SE_Array_ListURL.push("fillerURL");
			localStorage.setItem("DL_Content_URL_"+SE_CreateItem_categoryTitle, JSON.stringify(SE_Array_ListURL));
			
			document.getElementById("form_SE_Category").value = ""; //Resets the form
			trigger_createToast("SE_CategoryCreated"); //Creates a toast notification
			SE_AddItem_AddElementToPage("Category"); //Renders the category into the page
			} else {
			trigger_createToast("SE_FormNotFilled"); //Creates a toast notification
		}
		break;
		case "select_Shortcut":
		SE_CreateItem_ShortcutText = document.getElementById("form_SE_Shortcut_Title").value;
		SE_CreateItem_ShortcutURL = document.getElementById("form_SE_Shortcut_URL").value;
		SE_CreateItem_InsertInCategory = document.getElementById("dropdownButton_AddItem_Shortcut1").innerText;
		SE_CreateItem_CategoryKey = "DL_Content_"+SE_CreateItem_InsertInCategory;
		SE_CreateItem_CategoryKeyURL = "DL_Content_URL_"+SE_CreateItem_InsertInCategory;
		if ((SE_CreateItem_ShortcutText != "" && SE_CreateItem_ShortcutURL != "") && SE_CreateItem_InsertInCategory != "No selected"){
			if ( SE_CreateItem_InsertInCategory != "No selected"){
				// Resets the link array then loads the contents into the array from the category selected //
				SE_Array_ListText = []; //Resets the array
				var SE_LinkCount = Object.keys(JSON.parse(localStorage.getItem(SE_CreateItem_CategoryKey))).length; //Gets the length of the selected key
				console.log("Total link count is: "+SE_LinkCount); //Debug
				var SE_LinkItemData = Object.values(JSON.parse(localStorage.getItem(SE_CreateItem_CategoryKey))); //Gets the data from selected key and temporarily stores it into variable
				for (a = 0; a != SE_LinkCount; a++){
					SE_Array_ListText.push(SE_LinkItemData[a]); //Transfers all data from variable into link array
				}
				SE_Array_ListText.push(SE_CreateItem_ShortcutText); //Adds the new shortcut to the index
				localStorage.setItem(SE_CreateItem_CategoryKey, JSON.stringify(SE_Array_ListText)); //Saves the updated array to the selected category key
				console.log("New link array: "+SE_Array_ListText);
				
				// Resets the url array then loads the contents into the array from the category selected //
				SE_Array_ListURL = []; //Resets the array
				var SE_URLCount = Object.keys(JSON.parse(localStorage.getItem(SE_CreateItem_CategoryKeyURL))).length; //Gets the length of the selected key
				console.log("Total link count is: "+SE_URLCount); //Debug
				var SE_LinkItemData = Object.values(JSON.parse(localStorage.getItem(SE_CreateItem_CategoryKeyURL))); //Gets the data from selected key and temporarily stores it into variable
				for (a = 0; a != SE_URLCount; a++){
					SE_Array_ListURL.push(SE_LinkItemData[a]); //Transfers all data from variable into link array
				}
				SE_Array_ListURL.push(SE_CreateItem_ShortcutURL); //Adds the new shortcut to the index
				localStorage.setItem(SE_CreateItem_CategoryKeyURL, JSON.stringify(SE_Array_ListURL)); //Saves the updated array to the selected category key
				console.log("New url array: "+SE_Array_ListURL);
				trigger_createToast("SE_ShortcutCreated");
				SE_AddItem_AddElementToPage("Shortcut");
				} else {
				trigger_createToast("SE_FormNotFilled");
			}
			} else {
			trigger_createToast("SE_FormNotFilled"); //Creates a toast notification
		}
	}
}

//Adds the item
function SE_AddItem_AddElementToPage(ItemType){
	switch(ItemType){
		case "Category":
		setTimeout(refresh_ShortcutEditor(), 2000);
		if (Behavior_SE_CloseWindowAfterAction == true){
			close_Subwindow("AddItem");
		}
		if (Behavior_SE_ClearFieldsAfterCreation == true) {
			document.getElementById("form_SE_Category").value = "";
		}
		/*var SE_Category_Count = Object.keys(JSON.parse(localStorage.getItem(key_Index_Category))).length; //Updates the category counter
			
			var a = SE_Category_Count - 1; //Sets variable a to the length of the category counter
			console.log("Updated category length is: "+a); //Debug
			// Code below renders the item in the main page //
			var categoryDiv = document.createElement('div'); //Creates the container div element
			categoryDiv.setAttribute("id", "pageElement_CategoryDiv_"+a); //Adds id to div
			categoryDiv.classList.add("Category"); //Adds CSS to div
			document.getElementById("pageElement_ContentContainer").appendChild(categoryDiv);
			
			var categoryLabel = document.createElement('div'); //Creates the label div
			categoryLabel.setAttribute("id", "category_"+a); //Adds id to label
			categoryLabel.setAttribute("onclick", "toggle_Category(this.id)");
			categoryLabel.classList.add("Category_Label"); //Adds CSS to label
			document.getElementById("pageElement_CategoryDiv_"+a).appendChild(categoryLabel);
			
			var categoryLabelText = document.createElement('h1'); //Creates h1 element
			categoryLabelText.classList.add("Category_Label_Text"); //Adds CSS to h1 element
			categoryLabelText.innerHTML = SE_Array_Category_Index[a]; //Adds text
			document.getElementById("category_"+a).appendChild(categoryLabelText);
			
			var categoryLabelImg = document.createElement('img'); //Creates an img element
			categoryLabelImg.src = "Assets/Icons/icon_upArrow.png"; //Sets image source
			categoryLabelImg.setAttribute("id", "arrow_category_"+a); //Adds id to icon
			categoryLabelImg.classList.add("Category_Label_Toggle"); //Adds CSS to toggle
			document.getElementById("category_"+a).appendChild(categoryLabelImg);
			
			var categoryContent = document.createElement('div'); //Creates the content container div
			categoryContent.setAttribute("id", "content_category_"+a); //Adds id to container
			categoryContent.classList.add("Category_Content_Container");
			document.getElementById("pageElement_CategoryDiv_"+a).appendChild(categoryContent);
			
			var categoryShortcuts = document.createElement('div'); //Creates the button container div
			categoryShortcuts.setAttribute("id", "content_categoryButtons_"+a); //Adds id to container
			categoryShortcuts.classList.add("Category_Shortcuts");
			document.getElementById("content_category_"+a).appendChild(categoryShortcuts);
			// Code below renders the item in the dropdown menus //
			// Renders the item in the dropdown for folders
			var dropdown_Folder = document.createElement('p');
			dropdown_Folder.classList.add("Input_Dropdown_Item");
			dropdown_Folder.innerHTML = SE_Array_Category_Index[a];
			dropdown_Folder.setAttribute("id", "dropdownItem_Folder"+SE_Array_Category_Index[a]);
			dropdown_Folder.setAttribute("onclick", "trigger_dropdownItemSelected(this.id)");
			document.getElementById("menu_dropdownButton_AddItem_Folder").appendChild(dropdown_Folder);
			// Renders the item in the dropdown for shortcuts
			var dropdown_Shortcut = document.createElement('p');
			dropdown_Shortcut.classList.add("Input_Dropdown_Item");
			dropdown_Shortcut.innerHTML = SE_Array_Category_Index[a];
			dropdown_Shortcut.setAttribute("id", "dropdownItem_Shrtct"+SE_Array_Category_Index[a]);
			dropdown_Shortcut.setAttribute("onclick", "trigger_dropdownItemSelected(this.id)");
		document.getElementById("menu_dropdownButton_AddItem_Shortcut1").appendChild(dropdown_Shortcut);*/
		break;
		case "Shortcut":
		//location.reload();
		setTimeout(refresh_ShortcutEditor(), 2000);
		if (Behavior_SE_CloseWindowAfterAction == true){
			close_Subwindow("AddItem");
		}
		if (Behavior_SE_ClearFieldsAfterCreation == true) {
			document.getElementById("form_SE_Shortcut_Title").value = "";
			document.getElementById("form_SE_Shortcut_URL").value = "";
			document.getElementById("dropdownButton_AddItem_Shortcut1").innerText = "No selected";
		}
		/*SE_CreateItem_ShortcutText = document.getElementById("form_SE_Shortcut_Title").value; //Text
			SE_CreateItem_ShortcutURL = document.getElementById("form_SE_Shortcut_URL").value; //URL
			SE_CreateItem_InsertInCategory = document.getElementById("dropdownButton_AddItem_Shortcut1").innerText; //Category the shortcut is being inserted
			SE_CreateItem_CategoryKey = "DL_Content_"+SE_CreateItem_InsertInCategory; //The  key for the category's shortcut text storage
			SE_CreateItem_CategoryKeyURL = "DL_Content_URL_"+SE_CreateItem_InsertInCategory;
			//The key for the category's shortcut url storage
			var SE_Category_Count = Object.keys(JSON.parse(localStorage.getItem(key_Index_Category))).length; 
			
			// Stores the category index to the category array
			var temp_categoryData = Object.values(JSON.parse(localStorage.getItem(key_Index_Category)));
			let temp_categoryArray = [];
			for (a = 0; a != SE_Category_Count; a++){
			temp_categoryArray.push(temp_categoryData[a]); //Transfers all data from variable into category array
			}
			
			SE_Category_Count = temp_categoryArray.length;
			var categoryNumber;
			// Searches the category array for the selected category
			for(categoryLoop = 0; categoryLoop != SE_Category_Count; categoryLoop++){
			if (temp_categoryArray[categoryLoop] == SE_CreateItem_InsertInCategory){
			categoryNumber = categoryLoop;
			categoryLoop = SE_Category_Count;
			}
			}
			
			var shortcutNumber = Object.keys(JSON.parse(localStorage.getItem(SE_CreateItem_CategoryKey))).length + 1; 
			
			var linkAnchor = document.createElement('a'); //Creates the anchor element
			linkAnchor.setAttribute("href", SE_CreateItem_ShortcutURL); //Sets the href link for the item
			linkAnchor.setAttribute("id", "content_categoryButtons_anchor_"+categoryNumber+"_"+shortcutNumber); //Sets the id content_categoryButtons_anchor_<category#>_<categoryitem#>
			document.getElementById("content_categoryButtons_"+categoryNumber).appendChild(linkAnchor); //Attaches to the content container
			console.log("SE_Array_ListURL: "+SE_Array_ListURL);
			var linkButton = document.createElement('div'); //Creates the div button element
			linkButton.classList.add("Shortcut_Item"); //Adds CSS to the object
			linkButton.innerHTML = SE_CreateItem_ShortcutText; //Sets text to the selected linkbutton item
		document.getElementById("content_categoryButtons_anchor_"+categoryNumber+"_"+shortcutNumber).appendChild(linkButton);*/
		break;
	}
}

function SE_Generate_ExportList(){
	var Renderer_Selected_Category = dropdownButton_Export_Shortcut.innerText; //The selected category
	var Renderer_Selected_Category_Name = "DL_Content_"+Renderer_Selected_Category;
	var Renderer_Selected_Category_URL = "DL_Content_URL_"+Renderer_Selected_Category;
	console.log("Renderer_Loop #"+Renderer_SelectedCategoryItem+" | "+Renderer_Selected_Category_Name+" | "+Renderer_Selected_Category_URL);
	
	/* Transfer the shortcut names into the array */
	var Renderer_Shortcut_LinkCount = Object.keys(JSON.parse(localStorage.getItem(Renderer_Selected_Category_Name))).length; //Gets the length of the shortcut key
	var Renderer_Shortcut_LinkArray = [];
	var Renderer_Shortcut_LinkArray_Data = Object.values(JSON.parse(localStorage.getItem(Renderer_Selected_Category_Name))); //Temporarily transfer items into temporary variable
	for (a = 1; a != Renderer_Shortcut_LinkCount; a++){
		Renderer_Shortcut_LinkArray.push(Renderer_Shortcut_LinkArray_Data[a]); //Transfers all data from variable into array
	}
	
	/* Transfer the shortcut URLs into the array */
	var Renderer_Shortcut_URLCount = Object.keys(JSON.parse(localStorage.getItem(Renderer_Selected_Category_URL))).length; //Gets the length of the shortcut key
	var Renderer_Shortcut_URLArray = [];
	var Renderer_Shortcut_URLArray_Data = Object.values(JSON.parse(localStorage.getItem(Renderer_Selected_Category_URL))); //Temporarily transfer items into temporary variable
	for (b = 1; b != Renderer_Shortcut_URLCount; b++){
		Renderer_Shortcut_URLArray.push(Renderer_Shortcut_URLArray_Data[b]); //Transfers all data from variable into array
	}
	var SE_ExportList_Text1 = "";
	for (c = 0; c != Renderer_Shortcut_LinkCount-1; c++){
		
		var SE_ExportList_Text2 = SE_ExportList_Text1.concat("", Renderer_Shortcut_LinkArray[c]+"; "+Renderer_Shortcut_URLArray[c]+";; "); // Previous text
		console.log(SE_ExportList_Text2);
		document.getElementById("pageElement_Export_Text").innerHTML = SE_ExportList_Text2;
		var SE_ExportList_Text1 = SE_ExportList_Text2; // Previous text

	}
}
/* let text = document.getElementById('myText').innerHTML;
  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  } */
function SE_Export_CopyToClipboard(){
	navigator.clipboard.writeText(document.getElementById("pageElement_Export_Text").innerText).then(() => {
	  console.log('Content copied to clipboard');
	  /* Resolved - text copied to clipboard successfully */
	},() => {
	  console.error('Failed to copy');
	  /* Rejected - text failed to copy to the clipboard */
	});
	trigger_createToast("ShortcutEditor_CopiedToClipboard");
}

var SE_ImportList_CharacterArray= [];
var SE_ImportList_MainArray = [];
var SE_ImportList_Shortcut_Name = [];
var SE_ImportList_Shortcut_URL = [];

function SE_Import_ShortcutList(){
	SE_ImportList_CharacterArray= [];
	SE_ImportList_MainArray = [];
	SE_ImportList_Shortcut_Name = [];
	SE_ImportList_Shortcut_URL = [];
	var SE_ImportList_Input = document.getElementById("pageElement_Input_Text").value;
	var SE_ImportList_WordDetect1 = "";
	var SE_ImportList_ReadMode = "Shorcut_Name";
	var SE_ImportList_ReadMode_ChangeDetect;
	/* for (a = 0; a != SE_ImportList_Input.length; a++){
		var SE_ImportList_WordDetect2 = SE_ImportList_WordDetect1.concat("", SE_ImportList_Input.charAt(a));
		if (SE_ImportList_Input.charAt(a) == ";" && SE_ImportList_Input.charAt(a+1) != ";"){
			; detected - Next string is Shortcut URL
			SE_ImportList_ReadMode = "Shortcut_URL";
			
		} else if (SE_ImportList_Input.charAt(a) == ";" && SE_ImportList_Input.charAt(a+1) == ";"){
			;; detected - Next string is Shortcut Name
			SE_ImportList_ReadMode = "Shortcut_Name";
			SE_ImportList_Shortcut_Name.push = SE_ImportList_WordDetect2;
			SE_ImportList_WordDetect2 = "";
		}
		console.log(SE_ImportList_ReadMode);
	} */
	/* for (a = 0; a != SE_ImportList_Input.length; a++){
		var SE_ImportList_WordDetect2 = SE_ImportList_WordDetect1.concat("", SE_ImportList_Input.charAt(a));
		SE_ImportList_WordDetect1 = SE_ImportList_WordDetect2;
		// console.log(SE_ImportList_WordDetect2);
		if (SE_ImportList_Input.charAt(a) == ";"){
			/* SE_ImportList_WordDetect1 == "";
			SE_ImportList_WordDetect2 == "";
			SE_ImportList_MainArray.push(SE_ImportList_WordDetect2);
			console.log(SE_ImportList_MainArray);
			SE_ImportList_WordDetect1 == "";
			SE_ImportList_WordDetect2 == "";
			//console.log("Found");
			
		} 
	} */
	// Separates all characters into their own slots on an array
	for (a = 0; a != SE_ImportList_Input.length; a++){
		SE_ImportList_CharacterArray.push(SE_ImportList_Input.charAt(a));
	}
	// Separates Names to URLs
	for (b = 0; b <= SE_ImportList_CharacterArray.length; b++){
		var SE_ImportList_WordDetect2 = SE_ImportList_WordDetect1.concat("", SE_ImportList_CharacterArray[b]);
		SE_ImportList_WordDetect1 = SE_ImportList_WordDetect2;
		if (SE_ImportList_CharacterArray[b] == ";" && SE_ImportList_CharacterArray[b+1] != ";" && SE_ImportList_CharacterArray[b+2] != " "){
			SE_ImportList_WordDetect3 = SE_ImportList_WordDetect2.replace(';', '');
			if (b != 0){
				SE_ImportList_WordDetect4 = SE_ImportList_WordDetect3.replace(' ', '');
			} else {
				SE_ImportList_WordDetect4 = SE_ImportList_WordDetect3;
			}
			SE_ImportList_Shortcut_Name.push(SE_ImportList_WordDetect4);
			SE_ImportList_WordDetect1 = "";
			SE_ImportList_WordDetect2 = "";
			b++;
		} else if (SE_ImportList_CharacterArray[b] == ";" && SE_ImportList_CharacterArray[b+1] != "; "){
			SE_ImportList_WordDetect3 = SE_ImportList_WordDetect2.replace(';', '');
			SE_ImportList_WordDetect4 = SE_ImportList_WordDetect3.replace(' ', '');
			SE_ImportList_Shortcut_URL.push(SE_ImportList_WordDetect4);
			SE_ImportList_WordDetect1 = "";
			SE_ImportList_WordDetect2 = "";
			b++;
		}
	}
	// Creates shortcut buttons on the selected category
	if (dropdownButton_Import_Shortcut.innerText != "No selected"){
		SE_Array_ListText = []; //Resets the array
		var SE_CreateItem_CategoryKey = "DL_Content_"+dropdownButton_Import_Shortcut.innerText;
		SE_CreateItem_CategoryKeyURL = "DL_Content_URL_"+dropdownButton_Import_Shortcut.innerText;
		var SE_LinkCount = Object.keys(JSON.parse(localStorage.getItem(SE_CreateItem_CategoryKey))).length; //Gets the length of the selected key
		var SE_LinkItemData = Object.values(JSON.parse(localStorage.getItem(SE_CreateItem_CategoryKey))); //Gets the data from selected key and temporarily stores it into variable
		for (a = 0; a != SE_LinkCount; a++){
			SE_Array_ListText.push(SE_LinkItemData[a]); //Transfers all data from variable into link array
		}
		SE_Array_ListURL = []; //Resets the array
		var SE_URLCount = Object.keys(JSON.parse(localStorage.getItem(SE_CreateItem_CategoryKeyURL))).length; //Gets the length of the selected key
		console.log("Total link count is: "+SE_URLCount); //Debug
		var SE_LinkItemData = Object.values(JSON.parse(localStorage.getItem(SE_CreateItem_CategoryKeyURL))); //Gets the data from selected key and temporarily stores it into variable
		for (a = 0; a != SE_URLCount; a++){
			SE_Array_ListURL.push(SE_LinkItemData[a]); //Transfers all data from variable into link array
		}
		
		for (c = 0; c != SE_ImportList_Shortcut_Name.length; c++){
			SE_Array_ListText.push(SE_ImportList_Shortcut_Name[c]);
			SE_Array_ListURL.push(SE_ImportList_Shortcut_URL[c]);
			trigger_createToast("SE_ShortcutCreated");
			SE_CreateItem_ShortcutText = SE_ImportList_Shortcut_Name[c];
			SE_CreateItem_ShortcutURL = SE_ImportList_Shortcut_URL[c];
		}
		
		localStorage.setItem(SE_CreateItem_CategoryKey, JSON.stringify(SE_Array_ListText)); //Saves the updated array to the selected category key
		localStorage.setItem(SE_CreateItem_CategoryKeyURL, JSON.stringify(SE_Array_ListURL)); //Saves the updated array to the selected category key
		refresh_ShortcutEditor();
	} else {
		console.log("ERROR");
	}
}
/* New rendering system */
function Generator_Render_Categories(){
	
	
	var SE_Renderer_Category_Count = Object.keys(JSON.parse(localStorage.getItem("DL_CategoryIndex"))).length;
	console.log("Renderer_CategoryCount: "+SE_Renderer_Category_Count);
	if (SE_Renderer_Category_Count == 1){ //If the category count is 1 (empty), display the notification
		document.getElementById("pageElement_LibraryEmptyNotif").style.display = "block";
		} else {
		document.getElementById("pageElement_LibraryEmptyNotif").style.display = "none";
	}
	for (a = 1; a != SE_Renderer_Category_Count; a++){
		/* Category main container */
		var categoryDiv = document.createElement('div'); //Creates the container div element
		categoryDiv.setAttribute("id", "pageElement_CategoryDiv_"+a); //Adds id to div
		categoryDiv.classList.add("Category"); //Adds CSS to div
		document.getElementById("pageElement_ContentContainer").appendChild(categoryDiv);
		
		/* Label container */
		var categoryLabel = document.createElement('div'); //Creates the label div
		categoryLabel.setAttribute("id", "category_"+a); //Adds id to label
		categoryLabel.setAttribute("onclick", "toggle_Category(this.id)");
		categoryLabel.classList.add("Category_Label"); //Adds CSS to label
		document.getElementById("pageElement_CategoryDiv_"+a).appendChild(categoryLabel);
		
		/* Label Text */
		var categoryLabelText = document.createElement('h1'); //Creates h1 element
		categoryLabelText.classList.add("Category_Label_Text"); //Adds CSS to h1 element
		categoryLabelText.innerHTML = SE_Array_Category_Index[a]; //Adds text
		document.getElementById("category_"+a).appendChild(categoryLabelText);
		
		/* Label Icon (arrow icon) */
		var categoryLabelImg = document.createElement('img'); //Creates an img element
		categoryLabelImg.src = "Assets/Icons/icon_upArrow.png"; //Sets image source
		categoryLabelImg.setAttribute("id", "arrow_category_"+a); //Adds id to icon
		categoryLabelImg.classList.add("Category_Label_Toggle"); //Adds CSS to toggle
		document.getElementById("category_"+a).appendChild(categoryLabelImg);
		
		/* Content container */
		var categoryContent = document.createElement('div'); //Creates the content container div
		categoryContent.setAttribute("id", "content_category_"+a); //Adds id to container
		categoryContent.classList.add("Category_Content_Container");
		document.getElementById("pageElement_CategoryDiv_"+a).appendChild(categoryContent);
		
		/* Shortcuts container */
		var categoryShortcuts = document.createElement('div'); //Creates the button container div
		categoryShortcuts.setAttribute("id", "content_categoryButtons_"+a); //Adds id to container
		categoryShortcuts.classList.add("Category_Shortcuts");
		document.getElementById("content_category_"+a).appendChild(categoryShortcuts);
		
		/* Category navigation sidebar generation */
		if(PageName == "DL_Main.html"){
			var categoryNavigation_Anchor = document.createElement('a');
			categoryNavigation_Anchor.setAttribute("id", "categoryNavigation_"+a);
			categoryNavigation_Anchor.setAttribute("href", "#pageElement_CategoryDiv_"+a);
			document.getElementById("pageElement_Sidebar_CategoryNavigation").appendChild(categoryNavigation_Anchor);
			
			var categoryNavigation_Text = document.createElement('p');
			categoryNavigation_Text.classList.add("Sidebar_CategoryNavigation_Item");;
			categoryNavigation_Text.innerHTML = SE_Array_Category_Index[a];
			document.getElementById("categoryNavigation_"+a).appendChild(categoryNavigation_Text);
			
			var categoryLauncher_Text = document.createElement('p');
			categoryLauncher_Text.classList.add("Category_Launcher_Text");
			categoryLauncher_Text.setAttribute("id", "categoryLauncher_"+a);
			categoryLauncher_Text.setAttribute("onclick", "trigger_launchCategory_Confirmation(this.id)");
			categoryLauncher_Text.innerHTML = SE_Array_Category_Index[a];
			document.getElementById("pageElement_Category_Launcher_List").appendChild(categoryLauncher_Text);
		}
	}
	Generator_Render_Shortcuts();
}

function Generator_Render_Shortcuts(){
	var Renderer_Shortcut_LinkCount = 0;
	var Renderer_Shortcut_URLCount = 0;
	
	var Renderer_Category_Count = Object.keys(JSON.parse(localStorage.getItem("DL_CategoryIndex"))).length;
	console.log("Renderer_CategoryCount: "+Renderer_Category_Count);
	
	/* Create the category index*/
	var Renderer_Category_Array = [];
	var Renderer_Category_Array_Data = Object.values(JSON.parse(localStorage.getItem("DL_CategoryIndex"))); //Stor the category index to a temporary variable
	for (a = 0; a != Renderer_Category_Count; a++){ //Puts all the content of the selected key into the array
		Renderer_Category_Array.push(Renderer_Category_Array_Data[a]); 
		//Push the data into the actual array
	}
	console.log(Renderer_Category_Array);
	/* Render the shortcuts */
	for (Renderer_SelectedCategoryItem = 1; Renderer_SelectedCategoryItem != Renderer_Category_Count; Renderer_SelectedCategoryItem++){ //Loop the code for each category item stored in the category index
		console.log("Renderer_SelectedCategoryItem: " + Renderer_SelectedCategoryItem);
		
		var Renderer_Selected_Category = Renderer_Category_Array[Renderer_SelectedCategoryItem]; //The selected category
		var Renderer_Selected_Category_Name = "DL_Content_"+Renderer_Selected_Category;
		var Renderer_Selected_Category_URL = "DL_Content_URL_"+Renderer_Selected_Category;
		console.log("Renderer_Loop #"+Renderer_SelectedCategoryItem+" | "+Renderer_Selected_Category_Name+" | "+Renderer_Selected_Category_URL);
		
		/* Transfer the shortcut names into the array */
		var Renderer_Shortcut_LinkCount = Object.keys(JSON.parse(localStorage.getItem(Renderer_Selected_Category_Name))).length; //Gets the length of the shortcut key
		var Renderer_Shortcut_LinkArray = [];
		var Renderer_Shortcut_LinkArray_Data = Object.values(JSON.parse(localStorage.getItem(Renderer_Selected_Category_Name))); //Temporarily transfer items into temporary variable
		for (a = 1; a != Renderer_Shortcut_LinkCount; a++){
			Renderer_Shortcut_LinkArray.push(Renderer_Shortcut_LinkArray_Data[a]); //Transfers all data from variable into array
		}
		
		/* Transfer the shortcut URLs into the array */
		var Renderer_Shortcut_URLCount = Object.keys(JSON.parse(localStorage.getItem(Renderer_Selected_Category_URL))).length; //Gets the length of the shortcut key
		var Renderer_Shortcut_URLArray = [];
		var Renderer_Shortcut_URLArray_Data = Object.values(JSON.parse(localStorage.getItem(Renderer_Selected_Category_URL))); //Temporarily transfer items into temporary variable
		for (b = 1; b != Renderer_Shortcut_URLCount; b++){
			Renderer_Shortcut_URLArray.push(Renderer_Shortcut_URLArray_Data[b]); //Transfers all data from variable into array
		}
		
		console.log("Renderer_Shortcut_LinkCount: "+Renderer_Shortcut_LinkCount);
		console.log("Renderer_Shortcut_URLCount: "+Renderer_Shortcut_URLCount);
		
		/* Create the shortcut buttons */
		for (Renderer_Selected_Shortcut = 0; Renderer_Selected_Shortcut != Renderer_Shortcut_LinkCount - 1; Renderer_Selected_Shortcut++){
			var linkAnchor = document.createElement('a'); //Creates the anchor element
			linkAnchor.setAttribute("href", Renderer_Shortcut_URLArray[Renderer_Selected_Shortcut]); //Sets the href link for the item
			linkAnchor.setAttribute("id", "content_categoryButtons_anchor_"+Renderer_SelectedCategoryItem+"_"+Renderer_Selected_Shortcut); //Sets the id content_categoryButtons_anchor_<category#>_<categoryitem#>
			linkAnchor.setAttribute("target", "_blank"); //Opens a new tab when clicked
			document.getElementById("content_categoryButtons_"+Renderer_SelectedCategoryItem).appendChild(linkAnchor); //Attaches to the content container
			
			var linkButton = document.createElement('div'); //Creates the div button element
			linkButton.classList.add("Shortcut_Item"); //Adds CSS to the object
			linkButton.innerHTML = Renderer_Shortcut_LinkArray[Renderer_Selected_Shortcut]; //Sets text to the selected linkbutton item
			document.getElementById("content_categoryButtons_anchor_"+Renderer_SelectedCategoryItem+"_"+Renderer_Selected_Shortcut).appendChild(linkButton); //Attaches the button into the content container
		}
		var Renderer_Shortcut_LinkArray = [];
		var Renderer_Shortcut_URLArray = [];
	}
	setTimeout(reset_toDefaultAnimations, 2500);
}

function Generator_Render_Categories_TableView(){
	var Renderer_Category_Count = Object.keys(JSON.parse(localStorage.getItem("DL_CategoryIndex"))).length;
	console.log("Renderer_CategoryCount: "+Renderer_Category_Count);
	
	/* Create the category index*/
	var Renderer_Category_Array = [];
	var Renderer_Category_Array_Data = Object.values(JSON.parse(localStorage.getItem("DL_CategoryIndex"))); //Stor the category index to a temporary variable
	for (b = 0; b != Renderer_Category_Count; b++){ //Puts all the content of the selected key into the array
		Renderer_Category_Array.push(Renderer_Category_Array_Data[b]); 
		//Push the data into the actual array
	}
	
	/* Generate the category tabs */
	for (a = 1; a != Renderer_Category_Count; a++){
		var categoryDiv = document.createElement('div'); //Creates the container div element
		categoryDiv.setAttribute("id", "pageElement_CategoryDiv_TableView_"+a); //Adds id to div
		categoryDiv.classList.add("Category"); //Adds CSS to div
		document.getElementById("pageElement_ContentContainer_TableView").appendChild(categoryDiv);
		
		var categoryLabel = document.createElement('div'); //Creates the label div
		categoryLabel.setAttribute("id", "categoryTable_"+a); //Adds id to label
		categoryLabel.classList.add("Category_Label_ShortcutEditor_TableView"); //Adds CSS to label
		document.getElementById("pageElement_CategoryDiv_TableView_"+a).appendChild(categoryLabel);
		
		var categoryLabelText = document.createElement('h1'); //Creates h1 element
		categoryLabelText.classList.add("Category_Label_Text"); //Adds CSS to h1 element
		categoryLabelText.innerHTML = Renderer_Category_Array[a]; //Adds text
		document.getElementById("categoryTable_"+a).appendChild(categoryLabelText);
		
		//Edit Icon
		var categoryLabelImg = document.createElement('img'); //Creates an img element
		categoryLabelImg.src = "Assets/Icons/iconNew_edit.png"; //Sets image source
		categoryLabelImg.setAttribute("onclick", "SE_TV_EditCategory(this.parentNode.id)"); //Adds id to icon
		categoryLabelImg.classList.add("Category_Label_Icon_ShortcutEditor_TableView"); //Adds CSS to toggle
		document.getElementById("categoryTable_"+a).appendChild(categoryLabelImg);
		
		//Delete Icon
		var categoryLabelImg = document.createElement('img'); //Creates an img element
		categoryLabelImg.src = "Assets/Icons/iconNew_delete.png"; //Sets image source
		categoryLabelImg.setAttribute("onclick", "SE_TV_OpenConfirm_IdentifyType('Category'), SE_TV_OpenConfirm_DeleteElement(this.parentNode.id)");
		//categoryLabelImg.setAttribute("onclick", "SE_TV_DeleteCategory(this.parentNode.id), SE_TV_OpenConfirm_IdentifyType('Category')");
		categoryLabelImg.classList.add("Category_Label_Icon_ShortcutEditor_TableView"); //Adds CSS to toggle
		document.getElementById("categoryTable_"+a).appendChild(categoryLabelImg);
		
		
		
		var categoryContent = document.createElement('div'); //Creates the content container div
		categoryContent.setAttribute("id", "content_category_"+a); //Adds id to container
		categoryContent.classList.add("Category_Content_Container");
		document.getElementById("pageElement_CategoryDiv_TableView_"+a).appendChild(categoryContent);
	}
	Generator_Render_Shortcuts_TableView();
}

function Generator_Render_Shortcuts_TableView(){
	var Renderer_Category_Count = Object.keys(JSON.parse(localStorage.getItem("DL_CategoryIndex"))).length;
	console.log("Renderer_CategoryCount: "+Renderer_Category_Count);
	
	/* Create the category index*/
	var Renderer_Category_Array = [];
	var Renderer_Category_Array_Data = Object.values(JSON.parse(localStorage.getItem("DL_CategoryIndex"))); //Stor the category index to a temporary variable
	for (b = 0; b != Renderer_Category_Count; b++){ //Puts all the content of the selected key into the array
		Renderer_Category_Array.push(Renderer_Category_Array_Data[b]); 
		//Push the data into the actual array
	}
	
	
	for (Renderer_SelectedCategoryItem = 1; Renderer_SelectedCategoryItem != Renderer_Category_Count; Renderer_SelectedCategoryItem++){ //Loops the code for each category item stored in key_Index_Category
		
		var Renderer_Selected_Category = Renderer_Category_Array[Renderer_SelectedCategoryItem]; //The selected category
		var Renderer_Selected_Category_Name = "DL_Content_"+Renderer_Selected_Category;
		var Renderer_Selected_Category_URL = "DL_Content_URL_"+Renderer_Selected_Category;
		console.log("Renderer_Loop #"+Renderer_SelectedCategoryItem+" | "+Renderer_Selected_Category_Name+" | "+Renderer_Selected_Category_URL);
		
		/* Transfer the shortcut names into the array */
		var Renderer_Shortcut_LinkCount = Object.keys(JSON.parse(localStorage.getItem(Renderer_Selected_Category_Name))).length; //Gets the length of the shortcut key
		var Renderer_Shortcut_LinkArray = [];
		var Renderer_Shortcut_LinkArray_Data = Object.values(JSON.parse(localStorage.getItem(Renderer_Selected_Category_Name))); //Temporarily transfer items into temporary variable
		for (a = 1; a != Renderer_Shortcut_LinkCount; a++){
			Renderer_Shortcut_LinkArray.push(Renderer_Shortcut_LinkArray_Data[a]); //Transfers all data from variable into array
		}
		
		/* Transfer the shortcut URLs into the array */
		var Renderer_Shortcut_URLCount = Object.keys(JSON.parse(localStorage.getItem(Renderer_Selected_Category_URL))).length; //Gets the length of the shortcut key
		var Renderer_Shortcut_URLArray = [];
		var Renderer_Shortcut_URLArray_Data = Object.values(JSON.parse(localStorage.getItem(Renderer_Selected_Category_URL))); //Temporarily transfer items into temporary variable
		for (b = 1; b != Renderer_Shortcut_URLCount; b++){
			Renderer_Shortcut_URLArray.push(Renderer_Shortcut_URLArray_Data[b]); //Transfers all data from variable into array
		}
		
		console.log("Renderer_Shortcut_LinkCount: "+Renderer_Shortcut_LinkCount);
		console.log("Renderer_Shortcut_URLCount: "+Renderer_Shortcut_URLCount);
		
		
		var table = document.createElement('table');
		table.classList.add("ShortcutEditor_Table");
		table.setAttribute("id", "content_table_"+Renderer_SelectedCategoryItem);
		document.getElementById("pageElement_CategoryDiv_TableView_"+Renderer_SelectedCategoryItem).appendChild(table);
		var tableRow = table.insertRow(0);
		tableRow.classList.add("ShortcutEditor_Table_Row");
		var tableCell_Name = tableRow.insertCell(0);
		tableCell_Name.innerHTML = "Shortcut name";
		var tableCell_URL = tableRow.insertCell(1);
		tableCell_URL.innerHTML = "Shortcut URL";
		var tableCell_Ctrls = tableRow.insertCell(2);
		tableCell_Ctrls.classList.add("ShortcutEditor_Table_Ctrl");
		tableCell_Ctrls.innerHTML = "Controls";
		for (Renderer_Selected_Shortcut = 0; Renderer_Selected_Shortcut != Renderer_Shortcut_LinkCount - 1; Renderer_Selected_Shortcut++){ //Builds the link buttons inside the category tab
			
			
			var tableRow = table.insertRow(1);
			tableRow.classList.add("ShortcutEditor_Table_Row");
			tableRow.setAttribute("id", Renderer_Shortcut_LinkArray[Renderer_Selected_Shortcut]);
			
			var tableCell_Name = tableRow.insertCell(0);
			tableCell_Name.innerHTML = Renderer_Shortcut_LinkArray[Renderer_Selected_Shortcut];
			tableCell_Name.classList.add("ShortcutEditor_Table_Cell_Name");
			
			var tableCell_URL = tableRow.insertCell(1);
			tableCell_URL.innerHTML = Renderer_Shortcut_URLArray[Renderer_Selected_Shortcut];
			tableCell_Name.classList.add("ShortcutEditor_Table_Cell_URL");
			
			var tableCell_Ctrls = tableRow.insertCell(2);
			tableCell_Ctrls.classList.add("ShortcutEditor_Table_Ctrl");
			tableCell_Ctrls.setAttribute("id", "content_tableRows_Ctrls_"+Renderer_SelectedCategoryItem);
			
			var tableCell_Ctrls_Peek = document.createElement('img');
			tableCell_Ctrls_Peek.classList.add("ShortcutEditor_Table_Ctrl_Peek");
			tableCell_Ctrls_Peek.setAttribute("src", "Assets/Icons/iconNew_preview.png");
			tableCell_Ctrls_Peek.setAttribute("id", Renderer_Shortcut_URLArray[Renderer_Selected_Shortcut]);
			tableCell_Ctrls_Peek.setAttribute("onclick", "SE_TV_PreviewElement(this.id)");
			document.getElementById("content_tableRows_Ctrls_"+Renderer_SelectedCategoryItem).appendChild(tableCell_Ctrls_Peek);
			
			var tableCell_Ctrls_Edit = document.createElement('img');
			tableCell_Ctrls_Edit.classList.add("ShortcutEditor_Table_Ctrl_Edit");
			tableCell_Ctrls_Edit.setAttribute("src", "Assets/Icons/iconNew_edit.png");
			tableCell_Ctrls_Edit.setAttribute("id", Renderer_SelectedCategoryItem);
			tableCell_Ctrls_Edit.setAttribute("onclick", "SE_TV_EditElement_GetCategoryNumber(this.id), SE_TV_EditElement(parentNode.parentNode.id)");
			document.getElementById("content_tableRows_Ctrls_"+Renderer_SelectedCategoryItem).appendChild(tableCell_Ctrls_Edit);
			
			var tableCell_Ctrls_Delete = document.createElement('img');
			tableCell_Ctrls_Delete.classList.add("ShortcutEditor_Table_Ctrl_Edit");
			tableCell_Ctrls_Delete.setAttribute("src", "Assets/Icons/iconNew_delete.png");
			tableCell_Ctrls_Delete.setAttribute("id", Renderer_SelectedCategoryItem);
			tableCell_Ctrls_Delete.setAttribute("onclick", "SE_TV_DeleteElement_GetCategoryNumber(this.id), SE_TV_OpenConfirm_IdentifyType('Shortcut'), SE_TV_OpenConfirm_DeleteElement(parentNode.parentNode.id)");
			/*tableCell_Ctrls_Delete.setAttribute("onclick", "SE_TV_DeleteElement_GetCategoryNumber(this.id), SE_TV_DeleteElement(parentNode.parentNode.id)");*/
			document.getElementById("content_tableRows_Ctrls_"+Renderer_SelectedCategoryItem).appendChild(tableCell_Ctrls_Delete);
		}
	}
}
// Table View
var SE_EE_CategoryNumber;
function SE_TV_EditElement_GetCategoryNumber(id){ //Gets the category number that the item belongs in through the edit buttons ID
	SE_EE_CategoryNumber = id;
	console.log("Category number: "+SE_EE_CategoryNumber);
	
}
var SE_EE_ItemName;
var SE_EE_CategoryName;
let SE_EE_Array_ListText = ["unusedItem"];
let SE_EE_Array_ListURL = ["unusedItem"];
var SE_EE_Item_Index;
function SE_TV_EditElement(id){
	trigger_Open_SubWindow("EditItem"); //Open the window
	SE_EE_ItemName = id; //Sets the selected item name value to the id given
	document.getElementById("EditItem_SubwindowTitle").innerHTML = "Edit item '"+SE_EE_ItemName+"'"; //Renames the window title
	console.log("Item name: "+SE_EE_ItemName); //Debug
	
	//Get the category name through the category number in category index
	SE_EE_CategoryName = SE_Array_Category_Index[SE_EE_CategoryNumber]; //Sets the variable to the category name in the category index array (this is made when the page loads)
	console.log("Category name: "+SE_EE_CategoryName);
	
	//Access the selected category key and store contents to respective arrays
	/* Names */
	let SE_EE_Array_ListText = ["unusedItem"]; //Array for shortcut names
	var SE_EE_Array_ListText_Count = Object.keys(JSON.parse(localStorage.getItem("DL_Content_"+SE_EE_CategoryName))).length; //Get the total count of content inside the selected key
	var SE_EE_Array_ListText_Data = Object.values(JSON.parse(localStorage.getItem("DL_Content_"+SE_EE_CategoryName))); //Gets the values from the selected content key and store it temporarily into the variable
	for (a = 1; a != SE_EE_Array_ListText_Count; a++){ //Puts all the content of the selected key into the array
		SE_EE_Array_ListText.push(SE_EE_Array_ListText_Data[a]); //Transfers all data from variable into link array
		console.log(SE_EE_Array_ListText);
	}
	console.log("Title list: "+SE_EE_Array_ListText);
	/* URLs */
	let SE_EE_Array_ListURL = ["unusedItem"]; //Array for shortcut urls
	var SE_EE_Array_ListURL_Count = Object.keys(JSON.parse(localStorage.getItem("DL_Content_URL_"+SE_EE_CategoryName))).length; //Get the total count of content inside the selected key
	var SE_EE_Array_ListURL_Data = Object.values(JSON.parse(localStorage.getItem("DL_Content_URL_"+SE_EE_CategoryName))); //Gets the values from the selected content key and store it temporarily into the variable
	for (a = 1; a != SE_EE_Array_ListURL_Count; a++){ //Puts all the content of the selected key into the array
		SE_EE_Array_ListURL.push(SE_EE_Array_ListURL_Data[a]); //Transfers all data from variable into link array
		console.log(SE_EE_Array_ListURL);
	}
	console.log("URL list: "+SE_EE_Array_ListURL);
	//Gets the index number of the selected item on both arrays
	//var SE_EE_Item_Index;
	for (b = 1; b != SE_EE_Array_ListText.length; b++){
		if (SE_EE_Array_ListText[b] == SE_EE_ItemName){ //If the current array item matches with the selected item
			SE_EE_Item_Index = b; //Set the item index to the value of the counter
			console.log("Match found at item "+SE_EE_Item_Index);
		}
	}
	//Displays the item name and url on respective input fields using the obtained index number
	document.getElementById("form_SE_EditItem_Shortcut_Title").value = SE_EE_Array_ListText[SE_EE_Item_Index];
	document.getElementById("form_SE_EditItem_Shortcut_URL").value = SE_EE_Array_ListURL[SE_EE_Item_Index];
	
}

function SE_TV_EditElement_SaveChanges(id){
	//Get the category name through the category number in category index
	SE_EE_CategoryName = SE_Array_Category_Index[SE_EE_CategoryNumber]; //Sets the variable to the category name in the category index array (this is made when the page loads)
	console.log("Category name: "+SE_EE_CategoryName);
	//Get the value of input boxes
	var SE_EE_SC_Text = document.getElementById("form_SE_EditItem_Shortcut_Title").value;
	var SE_EE_SC_URL = document.getElementById("form_SE_EditItem_Shortcut_URL").value;
	//Debug
	console.log(SE_EE_CategoryName);
	console.log(SE_EE_Item_Index);
	/*Shortcut text*/
	//Import data for shortcut text
	let SE_EE_Array_ListText = ["unusedItem"]; //Array for shortcut names
	var SE_EE_Array_ListText_Count = Object.keys(JSON.parse(localStorage.getItem("DL_Content_"+SE_EE_CategoryName))).length; //Get the total count of content inside the selected key
	var SE_EE_Array_ListText_Data = Object.values(JSON.parse(localStorage.getItem("DL_Content_"+SE_EE_CategoryName))); //Gets the values from the selected content key and store it temporarily into the variable
	for (a = 1; a != SE_EE_Array_ListText_Count; a++){ //Puts all the content of the selected key into the array
		SE_EE_Array_ListText.push(SE_EE_Array_ListText_Data[a]); //Transfers all data from variable into link array
		console.log(SE_EE_Array_ListText);
	}
	SE_EE_Array_ListText[SE_EE_Item_Index] = SE_EE_SC_Text; // Changes the selected item with the new value
	//Save the new array to the new category url key
	localStorage.setItem("DL_Content_"+SE_EE_CategoryName, JSON.stringify(SE_EE_Array_ListText));
	/*Shortcut URL*/
	//Import data for shortcut URL
	let SE_EE_Array_ListURL = ["unusedItem"]; //Array for shortcut names
	var SE_EE_Array_ListURL_Count = Object.keys(JSON.parse(localStorage.getItem("DL_Content_URL_"+SE_EE_CategoryName))).length; //Get the total count of content inside the selected key
	var SE_EE_Array_ListURL_Data = Object.values(JSON.parse(localStorage.getItem("DL_Content_URL_"+SE_EE_CategoryName))); //Gets the values from the selected content key and store it temporarily into the variable
	for (a = 1; a != SE_EE_Array_ListURL_Count; a++){ //Puts all the content of the selected key into the array
		SE_EE_Array_ListURL.push(SE_EE_Array_ListURL_Data[a]); //Transfers all data from variable into link array
		console.log(SE_EE_Array_ListURL);
	}
	SE_EE_Array_ListURL[SE_EE_Item_Index] = SE_EE_SC_URL;
	//Save the new array to the new category url key
	localStorage.setItem("DL_Content_URL_"+SE_EE_CategoryName, JSON.stringify(SE_EE_Array_ListURL));
	
	console.log(SE_EE_Array_ListText);
	console.log(SE_EE_Array_ListURL);
	/* Refresh */
	close_Subwindow("EditItem");
	refresh_ShortcutEditor();
}

/* Delete item */
var SE_DE_CategoryNumber;
function SE_TV_DeleteElement_GetCategoryNumber(id){ //Gets the category number that the item belongs in through the edit buttons ID
	SE_DE_CategoryNumber = id;
	console.log("Category number: "+SE_DE_CategoryNumber);
	
}
var SE_DE_ItemName;
var SE_DE_CategoryName;
let SE_DE_Array_ListText = ["unusedItem"];
let SE_DE_Array_ListURL = ["unusedItem"];
var SE_DE_Item_Index;
var SE_DE_SelectedElement;
var SE_DE_SelectedType;

function SE_TV_OpenConfirm_IdentifyType(type){
	SE_DE_SelectedType = type;
}

function SE_TV_OpenConfirm_DeleteElement(selectedID){
	open_Subwindow("Confirmation_DeleteItem");
	if (SE_DE_SelectedType == "Category"){
		categoryNumber = selectedID.substr(14);
		categoryName = SE_Array_Category_Index[categoryNumber];
		document.getElementById("pageElement_Confirmation_DeleteItem").innerHTML = "Are you sure you want to delete "+categoryName+"?";
		} else {
		document.getElementById("pageElement_Confirmation_DeleteItem").innerHTML = "Are you sure you want to delete "+selectedID+"?";
	}
	
	SE_DE_SelectedElement = selectedID;
	
}

function SE_TV_Confirm_DeleteElement(){
	close_Subwindow("Confirmation_DeleteItem");
	if (SE_DE_SelectedType == "Shortcut"){
		SE_TV_DeleteElement(SE_DE_SelectedElement);
		} else if (SE_DE_SelectedType == "Category"){
		SE_TV_DeleteCategory(SE_DE_SelectedElement);
	}
	
}

function SE_TV_DeleteElement(id){
	SE_DE_ItemName = id; //Sets the selected item name value to the id given
	document.getElementById("EditItem_SubwindowTitle").innerHTML = "Edit item '"+SE_DE_ItemName+"'"; //Renames the window title
	console.log("Item name: "+SE_DE_ItemName); //Debug
	
	//Get the category name through the category number in category index
	SE_DE_CategoryName = SE_Array_Category_Index[SE_DE_CategoryNumber]; //Sets the variable to the category name in the category index array (this is made when the page loads)
	console.log("Category name: "+SE_DE_CategoryName);
	
	//Access the selected category key and store contents to respective arrays
	/* Names */
	let SE_DE_Array_ListText = ["unusedItem"]; //Array for shortcut names
	var SE_DE_Array_ListText_Count = Object.keys(JSON.parse(localStorage.getItem("DL_Content_"+SE_DE_CategoryName))).length; //Get the total count of content inside the selected key
	var SE_DE_Array_ListText_Data = Object.values(JSON.parse(localStorage.getItem("DL_Content_"+SE_DE_CategoryName))); //Gets the values from the selected content key and store it temporarily into the variable
	for (a = 1; a != SE_DE_Array_ListText_Count; a++){ //Puts all the content of the selected key into the array
		SE_DE_Array_ListText.push(SE_DE_Array_ListText_Data[a]); //Transfers all data from variable into link array
		console.log(SE_DE_Array_ListText);
	}
	console.log("Title list: "+SE_DE_Array_ListText);
	/* URLs */
	let SE_DE_Array_ListURL = ["unusedItem"]; //Array for shortcut urls
	var SE_DE_Array_ListURL_Count = Object.keys(JSON.parse(localStorage.getItem("DL_Content_URL_"+SE_DE_CategoryName))).length; //Get the total count of content inside the selected key
	var SE_DE_Array_ListURL_Data = Object.values(JSON.parse(localStorage.getItem("DL_Content_URL_"+SE_DE_CategoryName))); //Gets the values from the selected content key and store it temporarily into the variable
	for (a = 1; a != SE_DE_Array_ListURL_Count; a++){ //Puts all the content of the selected key into the array
		SE_DE_Array_ListURL.push(SE_DE_Array_ListURL_Data[a]); //Transfers all data from variable into link array
		console.log(SE_DE_Array_ListURL);
	}
	console.log("URL list: "+SE_DE_Array_ListURL);
	//Gets the index number of the selected item on both arrays
	//var SE_DE_Item_Index;
	for (b = 1; b != SE_DE_Array_ListText.length; b++){
		if (SE_DE_Array_ListText[b] == SE_DE_ItemName){ //If the current array item matches with the selected item
			SE_DE_Item_Index = b; //Set the item index to the value of the counter
			console.log("Match found at item "+SE_DE_Item_Index);
		}
	}
	//Delete the selected item
	console.log(SE_DE_Array_ListText[SE_DE_Item_Index]);
	console.log(SE_DE_Array_ListURL[SE_DE_Item_Index]);
	//console.log(SE_DE_Array_ListText.splice(SE_DE_Item_Index, 1));
	//console.log(SE_DE_Array_ListURL.splice(SE_DE_Item_Index, 1));
	SE_DE_Array_ListText.splice(SE_DE_Item_Index, 1);
	SE_DE_Array_ListURL.splice(SE_DE_Item_Index, 1);
	localStorage.setItem("DL_Content_"+SE_DE_CategoryName, JSON.stringify(SE_DE_Array_ListText));
	localStorage.setItem("DL_Content_URL_"+SE_DE_CategoryName, JSON.stringify(SE_DE_Array_ListURL));
	refresh_ShortcutEditor();
}

function SE_TV_DeleteElement_SaveChanges(id){
	//Get the value of input boxes
	var SE_EE_SC_Text = document.getElementById("form_SE_EditItem_Shortcut_Title").value;
	var SE_EE_SC_URL = document.getElementById("form_SE_EditItem_Shortcut_URL").value;
	//Debug
	console.log(SE_EE_CategoryName);
	console.log(SE_EE_Item_Index);
	/*Shortcut text*/
	//Import data for shortcut text
	let SE_EE_Array_ListText = ["unusedItem"]; //Array for shortcut names
	var SE_EE_Array_ListText_Count = Object.keys(JSON.parse(localStorage.getItem("DL_Content_"+SE_EE_CategoryName))).length; //Get the total count of content inside the selected key
	var SE_EE_Array_ListText_Data = Object.values(JSON.parse(localStorage.getItem("DL_Content_"+SE_EE_CategoryName))); //Gets the values from the selected content key and store it temporarily into the variable
	for (a = 1; a != SE_EE_Array_ListText_Count; a++){ //Puts all the content of the selected key into the array
		SE_EE_Array_ListText.push(SE_EE_Array_ListText_Data[a]); //Transfers all data from variable into link array
		console.log(SE_EE_Array_ListText);
	}
	//Modify the array of shortcut text array
	SE_EE_Array_ListText[SE_EE_Item_Index] = SE_EE_SC_Text;
	//Save the new array to the shortcut text key
	localStorage.setItem("DL_Content_"+SE_EE_CategoryName, JSON.stringify(SE_EE_Array_ListText));
	/*Shortcut URL*/
	//Import data for shortcut URL
	let SE_EE_Array_ListURL = ["unusedItem"]; //Array for shortcut names
	var SE_EE_Array_ListURL_Count = Object.keys(JSON.parse(localStorage.getItem("DL_Content_URL_"+SE_EE_CategoryName))).length; //Get the total count of content inside the selected key
	var SE_EE_Array_ListURL_Data = Object.values(JSON.parse(localStorage.getItem("DL_Content_URL_"+SE_EE_CategoryName))); //Gets the values from the selected content key and store it temporarily into the variable
	for (a = 1; a != SE_EE_Array_ListURL_Count; a++){ //Puts all the content of the selected key into the array
		SE_EE_Array_ListURL.push(SE_EE_Array_ListURL_Data[a]); //Transfers all data from variable into link array
		console.log(SE_EE_Array_ListURL);
	}
	//Modify the array of shortcut URL array
	SE_EE_Array_ListURL[SE_EE_Item_Index] = SE_EE_SC_URL;
	//Save the new array to the shortcut URL key
	localStorage.setItem("DL_Content_URL_"+SE_EE_CategoryName, JSON.stringify(SE_EE_Array_ListURL));
	/* Refresh */
	close_Subwindow("EditItem");
	refresh_ShortcutEditor();
}

function SE_TV_PreviewElement(id){
	window.open(id);
}

/* Edit Category */
var SE_TV_EC_CategoryNumber;
function SE_TV_EditCategory(categoryNumber){
	open_Subwindow("EditCategory");
	SE_TV_EC_CategoryNumber = categoryNumber;
	console.log(categoryNumber);
	console.log(categoryNumber.substr(14));
	
	/* Find the category name from the category array */
	var SE_TV_EC_CategoryName = SE_Array_Category_Index[categoryNumber.substr(14)];
	console.log(SE_TV_EC_CategoryName);
	/* Display to the subwindow */
	document.getElementById("EditCategory_SubwindowTitle").innerHTML = "Edit category '"+SE_TV_EC_CategoryName+"'";
	document.getElementById("form_SE_EditCategory_Name").value = SE_TV_EC_CategoryName;
}

function SE_TV_EditCategory_SaveChanges(){
	var SE_TV_EC_CategoryName = SE_Array_Category_Index[SE_TV_EC_CategoryNumber.substr(14)]
	/* Close subwindow */
	close_Subwindow("EditCategory");
	/* Replace the selected item on the category index array with the new value then save to key index*/
	var SE_TV_EC_NewCategoryName = document.getElementById("form_SE_EditCategory_Name").value;
	SE_Array_Category_Index[SE_TV_EC_CategoryNumber.substr(14)] = SE_TV_EC_NewCategoryName; //Changes the selected item on the array
	localStorage.setItem(key_Index_Category, JSON.stringify(SE_Array_Category_Index)); //Saves changes to the index key
	//Get the value of input boxes
	var SE_EE_SC_Text = document.getElementById("form_SE_EditItem_Shortcut_Title").value;
	var SE_EE_SC_URL = document.getElementById("form_SE_EditItem_Shortcut_URL").value;
	//Import data for shortcut text
	let SE_EC_Array_ListText = ["unusedItem"]; //Array for shortcut names
	var SE_EC_Array_ListText_Count = Object.keys(JSON.parse(localStorage.getItem("DL_Content_"+SE_TV_EC_CategoryName))).length; //Get the total count of content inside the selected key
	var SE_EC_Array_ListText_Data = Object.values(JSON.parse(localStorage.getItem("DL_Content_"+SE_TV_EC_CategoryName))); //Gets the values from the selected content key and store it temporarily into the variable
	for (a = 1; a != SE_EC_Array_ListText_Count; a++){ //Puts all the content of the selected key into the array
		SE_EC_Array_ListText.push(SE_EC_Array_ListText_Data[a]); //Transfers all data from variable into link array
		console.log(SE_EC_Array_ListText);
	}
	//Save the new array to the category text key
	localStorage.setItem("DL_Content_"+SE_TV_EC_NewCategoryName, JSON.stringify(SE_EC_Array_ListText));
	/*Shortcut URL*/
	//Import data for shortcut URL
	let SE_EC_Array_ListURL = ["unusedItem"]; //Array for shortcut names
	var SE_EC_Array_ListURL_Count = Object.keys(JSON.parse(localStorage.getItem("DL_Content_URL_"+SE_TV_EC_CategoryName))).length; //Get the total count of content inside the selected key
	var SE_EC_Array_ListURL_Data = Object.values(JSON.parse(localStorage.getItem("DL_Content_URL_"+SE_TV_EC_CategoryName))); //Gets the values from the selected content key and store it temporarily into the variable
	for (a = 1; a != SE_EC_Array_ListURL_Count; a++){ //Puts all the content of the selected key into the array
		SE_EC_Array_ListURL.push(SE_EC_Array_ListURL_Data[a]); //Transfers all data from variable into link array
		console.log(SE_EC_Array_ListURL);
	}
	//Save the new array to the new category url key
	localStorage.setItem("DL_Content_URL_"+SE_TV_EC_NewCategoryName, JSON.stringify(SE_EC_Array_ListURL));
	//Deletes the old keys
	localStorage.removeItem("DL_Content_"+SE_TV_EC_CategoryName);localStorage.removeItem("DL_Content_URL_"+SE_TV_EC_CategoryName);
	//Refresh the shortcut editor
	refresh_ShortcutEditor();
}


function SE_TV_DeleteCategory(categoryNumber){
	SE_TV_EC_CategoryNumber = categoryNumber;
	console.log(categoryNumber);
	console.log(categoryNumber.substr(14));
	/* Find the category name from the category array */
	var SE_TV_EC_CategoryName = SE_Array_Category_Index[categoryNumber.substr(14)];
	console.log(SE_TV_EC_CategoryName);
	/* Delete category */
	localStorage.removeItem("DL_Content_"+SE_TV_EC_CategoryName);
	localStorage.removeItem("DL_Content_URL_"+SE_TV_EC_CategoryName);
	SE_Array_Category_Index.splice(categoryNumber.substr(14), 1);
	localStorage.setItem(key_Index_Category, JSON.stringify(SE_Array_Category_Index));
	SE_Category_Count--;
	setTimeout(refresh_ShortcutEditor(), 1000);
}


function refresh_ShortcutEditor(){
	/* Normal view */
	var normalView = document.getElementById("pageElement_ContentContainer");
	normalView.parentNode.removeChild(normalView);
	
	var normalViewDiv = document.createElement('div'); //Creates the container div element
	normalViewDiv.setAttribute("id", "pageElement_ContentContainer"); //Adds id to div
	document.getElementById("ShortcutEditor_Tab_NormalView_Container").appendChild(normalViewDiv);	
	
	/* Table view */
	var tableView = document.getElementById("pageElement_ContentContainer_TableView");
	tableView.parentNode.removeChild(tableView);
	
	var tableViewDiv = document.createElement('div'); //Creates the container div element
	tableViewDiv.setAttribute("id", "pageElement_ContentContainer_TableView"); //Adds id to div
	document.getElementById("ShortcutEditor_Tab_TableView_Container").appendChild(tableViewDiv);
	
	/* Dropdown */
	document.getElementById("menu_dropdownButton_AddItem_Shortcut1").innerHTML = ("");
	
	/* Dropdown - Import shortcuts */
	document.getElementById("menu_dropdownButton_Import_Shortcut").innerHTML = ("");
	
	/* Dropdown - Export shortcuts */
	document.getElementById("menu_dropdownButton_Export_Shortcut").innerHTML = ("");
	
	/* Item Swapper Shortcut */
	var list = document.getElementById("pageElement_ShortcutEditor_SwapList_List_Shortcuts");
	list.parentNode.removeChild(list);
	
	var listDiv = document.createElement('div'); //Creates the container div element
	listDiv.setAttribute("id", "pageElement_ShortcutEditor_SwapList_List_Shortcuts"); //Adds id to div
	document.getElementById("pageElement_SwapList_Subwindow_Content").appendChild(listDiv);
	SE_Swapper_Shortcut_SwapStage = 1;
	SE_Swapper_Shortcut_Data_1 = "";
	SE_Swapper_Shortcut_Data_2 = "";
	SE_Swapper_Shortcut_ElementID_1 = 0;
	SE_Swapper_Shortcut_ElementID_2 = 0;
	SE_Swapper_Shortcut_IndexNumber = 0;
	SE_Swappper_Shortcut_Array = [];
	SE_Swappper_Shortcut_URL_Array = [];
	
	SE_Create_SwapperList_Shortcuts();
	// SE_Swapper_SelectItem_Shortcut_Stage1(SE_Swapper_SelectedCategory_RefreshShortcutEditor);
	
	/* Item Swapper Categories */
	
	// Change content
	var list = document.getElementById("pageElement_ShortcutEditor_SwapList_List");
	list.parentNode.removeChild(list);
	
	var listDiv = document.createElement('div'); //Creates the container div element
	listDiv.setAttribute("id", "pageElement_ShortcutEditor_SwapList_List"); //Adds id to div
	document.getElementById("pageElement_SwapList_Subwindow_Content_Category").appendChild(listDiv);	
	SE_Create_SwapperList();
	
	
	
	Generator_Render_Categories();
	Generator_Render_Categories_TableView();
	//render_Categories_TableView();
	SE_CreateDropdown();
	start_Animations_ShortcutEditor();
	//reset_toDefaultAnimations();
	trigger_createToast("ShortcutEditor_ListUpdated");
}

function start_Animations_ShortcutEditor(){
	//var Category = document.querySelectorAll(".Category");
	var Shortcut_Item = document.querySelectorAll(".Shortcut_Item");
	for (var a = 0; a < Shortcut_Item.length; a++) {
		var Shortcut_Item_Select = Shortcut_Item[a];
		Shortcut_Item_Select.style.animationName = "tabOpening";
		Shortcut_Item_Select.style.animationDuration = "0.5s";
		Shortcut_Item_Select.style.animationFillMode = "forwards";
	}
	var Shortcut_Item_Table = document.querySelectorAll(".ShortcutEditor_Table");
	for (var a = 0; a < Shortcut_Item_Table.length; a++) {
		var Shortcut_Item_Table_Select = Shortcut_Item_Table[a];
		Shortcut_Item_Table_Select.style.animationName = "tabOpening";
		Shortcut_Item_Table_Select.style.animationDuration = "0.5s";
		Shortcut_Item_Table_Select.style.animationFillMode = "forwards";
	}
	
}

//let SE_Array_Category_Index = ["fillerData", "Category 1", "Category 2", "Category 3", "Category 4", "Category 5"];
function SE_Create_SwapperList(){
	for (a = 1; a != SE_Array_Category_Index.length; a++){
		var item = document.createElement("p");
		item.classList.add("ShortcutEditor_SwapList_Item");
		item.setAttribute("id", a);
		item.setAttribute("onclick", "SE_Swapper_SelectItem_Category(this.id)");
		item.innerHTML = SE_Array_Category_Index[a];
		document.getElementById("pageElement_ShortcutEditor_SwapList_List").appendChild(item);
	}
}

var SE_Swapper_SwapStage = 1;
var SE_Swapper_Data_1;
var SE_Swapper_Data_2;
var SE_Swapper_ElementID_1;
var SE_Swapper_ElementID_2;
function SE_Swapper_SelectItem_Category(id){
	if (SE_Swapper_SwapStage == 1){
		SE_Swapper_Data_1 = SE_Array_Category_Index[id];
		SE_Swapper_ElementID_1 = id;
		document.getElementById(SE_Swapper_ElementID_1).style.borderLeftWidth = "5px";
		console.log(SE_Swapper_Data_1);
		SE_Swapper_SwapStage = 2;
		} else if (SE_Swapper_SwapStage == 2){
		SE_Swapper_Data_2 = SE_Array_Category_Index[id];
		SE_Swapper_ElementID_2 = id;
		document.getElementById(SE_Swapper_ElementID_2).style.borderLeftWidth = "5px";
		console.log(SE_Swapper_Data_2);
		SE_Swapper_SwapData();
		
	}
}

function SE_Swapper_SwapData(){
	SE_Array_Category_Index[SE_Swapper_ElementID_1] = SE_Swapper_Data_2;
	SE_Array_Category_Index[SE_Swapper_ElementID_2] = SE_Swapper_Data_1;
	console.log(SE_Array_Category_Index);
	SE_Swapper_SwapStage = 1;
	document.getElementById(SE_Swapper_ElementID_1).style.borderLeftWidth = "0px";
	document.getElementById(SE_Swapper_ElementID_2).style.borderLeftWidth = "0px";
	document.getElementById(SE_Swapper_ElementID_1).innerHTML = SE_Swapper_Data_2;
	document.getElementById(SE_Swapper_ElementID_2).innerHTML = SE_Swapper_Data_1;
	localStorage.setItem("DL_CategoryIndex", JSON.stringify(SE_Array_Category_Index));
	refresh_ShortcutEditor();
}

var SE_Swapper_Shortcut_Stage;

function SE_Create_SwapperList_Shortcuts(){
	document.getElementById("pageElement_ShortcutEditor_SwapList_Shortcut_BackToCategorySelection").style.display = "none"
	SE_Swapper_Shortcut_Stage = 1;
	for (a = 1; a != SE_Array_Category_Index.length; a++){
		var item = document.createElement("p");
		item.classList.add("ShortcutEditor_SwapList_Item");
		item.setAttribute("id", a);
		item.setAttribute("onclick", "SE_Swapper_SelectItem_Shortcut_Stage1(this.id)");
		item.innerHTML = SE_Array_Category_Index[a];
		document.getElementById("pageElement_ShortcutEditor_SwapList_List_Shortcuts").appendChild(item);
	}
}

var SE_Swapper_SelectedCategory;
var SE_Swapper_SelectedCategory_RefreshShortcutEditor;
var SE_Swappper_Shortcut_Array = [];
var SE_Swappper_Shortcut_URL_Array = [];

function SE_Swapper_SelectItem_Shortcut_Stage1(id){
	SE_Swapper_Shortcut_Stage = 2;
	
	document.getElementById("pageElement_ShortcutEditor_SwapList_Shortcut_BackToCategorySelection").style.display = "block"
	
	SE_Swapper_SelectedCategory = SE_Array_Category_Index[id];
	
	// Change content
	var list = document.getElementById("pageElement_ShortcutEditor_SwapList_List_Shortcuts");
	list.parentNode.removeChild(list);
	
	var listDiv = document.createElement('div'); //Creates the container div element
	listDiv.setAttribute("id", "pageElement_ShortcutEditor_SwapList_List_Shortcuts"); //Adds id to div
	document.getElementById("pageElement_SwapList_Subwindow_Content").appendChild(listDiv);	
	
	var SE_Swapper_Shortcut_Key = "DL_Content_"+SE_Swapper_SelectedCategory;
	var SE_Swapper_Shortcut_URL_Key = "DL_Content_URL_"+SE_Swapper_SelectedCategory;
	var SE_Swapper_Shortcut_LinkCount = Object.keys(JSON.parse(localStorage.getItem(SE_Swapper_Shortcut_Key))).length; //Gets the length of the shortcut key
	var SE_Swapper_Shortcut_URL_LinkCount = Object.keys(JSON.parse(localStorage.getItem(SE_Swapper_Shortcut_URL_Key))).length; //Gets the length of the shortcut key
	
	
	
	var SE_Swappper_Shortcut_Array_Data = Object.values(JSON.parse(localStorage.getItem(SE_Swapper_Shortcut_Key))); //Temporarily transfer items into temporary variable
	for (a = 0; a != SE_Swapper_Shortcut_LinkCount; a++){
		SE_Swappper_Shortcut_Array.push(SE_Swappper_Shortcut_Array_Data[a]); //Transfers all data from variable into array
	}
	
	var SE_Swappper_Shortcut_URL_Array_Data = Object.values(JSON.parse(localStorage.getItem(SE_Swapper_Shortcut_URL_Key))); //Temporarily transfer items into temporary variable
	for (b = 0; b != SE_Swapper_Shortcut_URL_LinkCount; b++){
		SE_Swappper_Shortcut_URL_Array.push(SE_Swappper_Shortcut_URL_Array_Data[b]); //Transfers all data from variable into array
	}
	
	for (c = 1; c != SE_Swappper_Shortcut_Array.length; c++){
		var item = document.createElement("p");
		item.classList.add("ShortcutEditor_SwapList_Item");
		item.setAttribute("id", "s"+c);
		item.setAttribute("onclick", "SE_Swapper_SelectItem_Shortcut_Stage2(this.id)");
		item.innerHTML = SE_Swappper_Shortcut_Array[c];
		document.getElementById("pageElement_ShortcutEditor_SwapList_List_Shortcuts").appendChild(item);
	}
	document.getElementById("pageElement_SwapList_Shortcut_Instructions").innerHTML = "Click a list item and another to switch positions of the list items.";
	
}

var SE_Swapper_Shortcut_SwapStage = 1;
var SE_Swapper_Shortcut_Data_1;
var SE_Swapper_Shortcut_Data_2;
var SE_Swapper_Shortcut_Data_URL_1;
var SE_Swapper_Shortcut_Data_URL_2;
var SE_Swapper_Shortcut_ElementID_1;
var SE_Swapper_Shortcut_ElementID_2;
var SE_Swapper_Shortcut_IndexNumber;

function SE_Swapper_SelectItem_Shortcut_Stage2(id){
	SE_Swapper_Shortcut_IndexNumber = id.substr(1);
	if (SE_Swapper_Shortcut_SwapStage == 1){
		SE_Swapper_Shortcut_Data_1 = SE_Swappper_Shortcut_Array[SE_Swapper_Shortcut_IndexNumber];
		SE_Swapper_Shortcut_Data_URL_1 = SE_Swappper_Shortcut_URL_Array[SE_Swapper_Shortcut_IndexNumber];
		SE_Swapper_Shortcut_ElementID_1 = id.substr(1);
		document.getElementById("s"+SE_Swapper_Shortcut_ElementID_1).style.borderLeftWidth = "5px";
		console.log(SE_Swapper_Shortcut_Data_1);
		SE_Swapper_Shortcut_SwapStage = 2;
		} else if (SE_Swapper_Shortcut_SwapStage == 2){
		SE_Swapper_Shortcut_Data_2 = SE_Swappper_Shortcut_Array[SE_Swapper_Shortcut_IndexNumber];
		SE_Swapper_Shortcut_Data_URL_2 = SE_Swappper_Shortcut_URL_Array[SE_Swapper_Shortcut_IndexNumber];
		SE_Swapper_Shortcut_ElementID_2 = id.substr(1);
		document.getElementById("s"+SE_Swapper_Shortcut_ElementID_2).style.borderLeftWidth = "5px";
		console.log(SE_Swapper_Shortcut_Data_2);
		SE_Swapper_Shortcut_SwapData();
		
	}
}

function SE_Swapper_Shortcut_SwapData(){
	SE_Swappper_Shortcut_Array[SE_Swapper_Shortcut_ElementID_1] = SE_Swapper_Shortcut_Data_2;
	SE_Swappper_Shortcut_Array[SE_Swapper_Shortcut_ElementID_2] = SE_Swapper_Shortcut_Data_1;
	
	SE_Swappper_Shortcut_URL_Array[SE_Swapper_Shortcut_ElementID_1] = SE_Swapper_Shortcut_Data_URL_2;
	SE_Swappper_Shortcut_URL_Array[SE_Swapper_Shortcut_ElementID_2] = SE_Swapper_Shortcut_Data_URL_1;
	
	
	console.log(SE_Swappper_Shortcut_Array);
	
	document.getElementById("s"+SE_Swapper_Shortcut_ElementID_1).style.borderLeftWidth = "0px";
	document.getElementById("s"+SE_Swapper_Shortcut_ElementID_2).style.borderLeftWidth = "0px";
	document.getElementById("s"+SE_Swapper_Shortcut_ElementID_1).innerHTML = SE_Swapper_Shortcut_Data_2;
	document.getElementById("s"+SE_Swapper_Shortcut_ElementID_2).innerHTML = SE_Swapper_Shortcut_Data_1;
	localStorage.setItem("DL_Content_"+SE_Swapper_SelectedCategory, JSON.stringify(SE_Swappper_Shortcut_Array));
	localStorage.setItem("DL_Content_URL_"+SE_Swapper_SelectedCategory, JSON.stringify(SE_Swappper_Shortcut_URL_Array));
	refresh_ShortcutEditor();
}

function SE_Swapper_Shortcut_GoBackToCategorySelection(){
	// Change content
	var list = document.getElementById("pageElement_ShortcutEditor_SwapList_List_Shortcuts");
	list.parentNode.removeChild(list);
	
	var listDiv = document.createElement('div'); //Creates the container div element
	listDiv.setAttribute("id", "pageElement_ShortcutEditor_SwapList_List_Shortcuts"); //Adds id to div
	document.getElementById("pageElement_SwapList_Subwindow_Content").appendChild(listDiv);	
	
	SE_Swapper_Shortcut_SwapStage = 1;
	SE_Swapper_Shortcut_Data_1 = "";
	SE_Swapper_Shortcut_Data_2 = "";
	SE_Swapper_Shortcut_ElementID_1 = 0;
	SE_Swapper_Shortcut_ElementID_2 = 0;
	SE_Swapper_Shortcut_IndexNumber = 0;
	SE_Swappper_Shortcut_Array = [];
	SE_Swappper_Shortcut_URL_Array = [];
	
	SE_Create_SwapperList_Shortcuts();
}

// Builds the category tabs inside Table View
function render_Categories_TableView(){
	console.log("Generating table view");
	for (a = 1; a != SE_Category_Count; a++){
		var categoryDiv = document.createElement('div'); //Creates the container div element
		categoryDiv.setAttribute("id", "pageElement_CategoryDiv_TableView_"+a); //Adds id to div
		categoryDiv.classList.add("Category"); //Adds CSS to div
		document.getElementById("pageElement_ContentContainer_TableView").appendChild(categoryDiv);
		
		var categoryLabel = document.createElement('div'); //Creates the label div
		categoryLabel.setAttribute("id", "categoryTable_"+a); //Adds id to label
		categoryLabel.classList.add("Category_Label_ShortcutEditor_TableView"); //Adds CSS to label
		document.getElementById("pageElement_CategoryDiv_TableView_"+a).appendChild(categoryLabel);
		
		var categoryLabelText = document.createElement('h1'); //Creates h1 element
		categoryLabelText.classList.add("Category_Label_Text"); //Adds CSS to h1 element
		categoryLabelText.innerHTML = SE_Array_Category_Index[a]; //Adds text
		document.getElementById("categoryTable_"+a).appendChild(categoryLabelText);
		
		//Edit Icon
		var categoryLabelImg = document.createElement('img'); //Creates an img element
		categoryLabelImg.src = "Assets/Icons/iconNew_edit.png"; //Sets image source
		categoryLabelImg.setAttribute("onclick", "SE_TV_EditCategory(this.parentNode.id)"); //Adds id to icon
		categoryLabelImg.classList.add("Category_Label_Icon_ShortcutEditor_TableView"); //Adds CSS to toggle
		document.getElementById("categoryTable_"+a).appendChild(categoryLabelImg);
		
		//Delete Icon
		var categoryLabelImg = document.createElement('img'); //Creates an img element
		categoryLabelImg.src = "Assets/Icons/iconNew_delete.png"; //Sets image source
		categoryLabelImg.setAttribute("onclick", "SE_TV_DeleteCategory(this.parentNode.id)");
		categoryLabelImg.classList.add("Category_Label_Icon_ShortcutEditor_TableView"); //Adds CSS to toggle
		document.getElementById("categoryTable_"+a).appendChild(categoryLabelImg);
		
		
		
		var categoryContent = document.createElement('div'); //Creates the content container div
		categoryContent.setAttribute("id", "content_category_"+a); //Adds id to container
		categoryContent.classList.add("Category_Content_Container");
		document.getElementById("pageElement_CategoryDiv_TableView_"+a).appendChild(categoryContent);
		
		
	}	
	render_Shortcuts_TableView();
}

function render_Shortcuts_TableView(){
	for (arrayItem = 1; arrayItem != SE_Category_Count; arrayItem++){ //Loops the code for each category item stored in key_Index_Category
		console.log("========= Category Loop# "+arrayItem);
		var SE_Selected_Key_Items = SE_Array_Category_Index[arrayItem]; //Selects a category item
		SE_Selected_Key_Content = "DL_Content_"+SE_Selected_Key_Items; //This will be used in accessing the data for the selected category
		console.log("SE_Selected_Key_Items: "+SE_Selected_Key_Items); //Debug
		console.log("SE_Selected_Key_Content: "+SE_Selected_Key_Content); //Debug
		
		var SE_LinkCount = Object.keys(JSON.parse(localStorage.getItem(SE_Selected_Key_Content))).length; //Get the total count of content inside the selected key
		console.log("SE_LinkCount: "+SE_LinkCount); //Debug
		var SE_LinkItemData = Object.values(JSON.parse(localStorage.getItem(SE_Selected_Key_Content))); //Gets the values from the selected content key and store it temporarily into the variable
		for (a = 1; a != SE_LinkCount; a++){ //Puts all the content of the selected key into the array
			SE_Array_ListText.push(SE_LinkItemData[a]); //Transfers all data from variable into link array
			console.log(SE_Array_ListText);
		}
		
		SE_Selected_Key_ContentURL = "DL_Content_URL_"+SE_Selected_Key_Items; //This will be used in accessing the data for the selected category
		console.log(SE_Selected_Key_ContentURL);
		var SE_URLCount = Object.keys(JSON.parse(localStorage.getItem(SE_Selected_Key_ContentURL))).length; //Get the total count of content inside the selected key
		console.log(SE_URLCount);
		var SE_LinkItemURLData = Object.values(JSON.parse(localStorage.getItem(SE_Selected_Key_ContentURL))); //Gets the values from the selected content key and store it temporarily into the variable
		console.log(SE_LinkItemURLData);
		for (b = 1; b != SE_URLCount; b++){ //Puts all the content of the selected key into the array
			SE_Array_ListURL.push(SE_LinkItemURLData[b]); //Transfers all data from variable into link array
			console.log(SE_Array_ListURL);
			
		}
		
		console.log("SE_LinkCount: "+SE_LinkCount);
		console.log("SE_URLCount: "+SE_URLCount);
		var table = document.createElement('table');
		table.classList.add("ShortcutEditor_Table");
		table.setAttribute("id", "content_table_"+arrayItem);
		document.getElementById("pageElement_CategoryDiv_TableView_"+arrayItem).appendChild(table);
		var tableRow = table.insertRow(0);
		tableRow.classList.add("ShortcutEditor_Table_Row");
		var tableCell_Name = tableRow.insertCell(0);
		tableCell_Name.innerHTML = "Shortcut name";
		var tableCell_URL = tableRow.insertCell(1);
		tableCell_URL.innerHTML = "Shortcut URL";
		var tableCell_Ctrls = tableRow.insertCell(2);
		tableCell_Ctrls.classList.add("ShortcutEditor_Table_Ctrl");
		tableCell_Ctrls.innerHTML = "Controls";
		console.log("SE_Array_ListText: "+SE_Array_ListText); //Debug
		for (linkItem = 0; linkItem != SE_LinkCount - 1; linkItem++){ //Builds the link buttons inside the category tab
			console.log("Processing item: "+SE_Array_ListText[linkItem]);
			
			var tableRow = table.insertRow(1);
			tableRow.classList.add("ShortcutEditor_Table_Row");
			tableRow.setAttribute("id", SE_Array_ListText[linkItem]);
			
			var tableCell_Name = tableRow.insertCell(0);
			tableCell_Name.innerHTML = SE_Array_ListText[linkItem];
			tableCell_Name.classList.add("ShortcutEditor_Table_Cell_Name");
			
			var tableCell_URL = tableRow.insertCell(1);
			tableCell_URL.innerHTML = SE_Array_ListURL[linkItem];
			tableCell_Name.classList.add("ShortcutEditor_Table_Cell_URL");
			
			var tableCell_Ctrls = tableRow.insertCell(2);
			tableCell_Ctrls.classList.add("ShortcutEditor_Table_Ctrl");
			tableCell_Ctrls.setAttribute("id", "content_tableRows_Ctrls_"+arrayItem);
			
			var tableCell_Ctrls_Peek = document.createElement('img');
			tableCell_Ctrls_Peek.classList.add("ShortcutEditor_Table_Ctrl_Peek");
			tableCell_Ctrls_Peek.setAttribute("src", "Assets/Icons/iconNew_preview.png");
			tableCell_Ctrls_Peek.setAttribute("id", SE_Array_ListURL[linkItem]);
			tableCell_Ctrls_Peek.setAttribute("onclick", "SE_TV_PreviewElement(this.id)");
			document.getElementById("content_tableRows_Ctrls_"+arrayItem).appendChild(tableCell_Ctrls_Peek);
			
			var tableCell_Ctrls_Edit = document.createElement('img');
			tableCell_Ctrls_Edit.classList.add("ShortcutEditor_Table_Ctrl_Edit");
			tableCell_Ctrls_Edit.setAttribute("src", "Assets/Icons/iconNew_edit.png");
			tableCell_Ctrls_Edit.setAttribute("id", arrayItem);
			tableCell_Ctrls_Edit.setAttribute("onclick", "SE_TV_EditElement_GetCategoryNumber(this.id), SE_TV_EditElement(parentNode.parentNode.id)");
			document.getElementById("content_tableRows_Ctrls_"+arrayItem).appendChild(tableCell_Ctrls_Edit);
			
			var tableCell_Ctrls_Delete = document.createElement('img');
			tableCell_Ctrls_Delete.classList.add("ShortcutEditor_Table_Ctrl_Edit");
			tableCell_Ctrls_Delete.setAttribute("src", "Assets/Icons/iconNew_delete.png");
			tableCell_Ctrls_Delete.setAttribute("id", arrayItem);
			
			tableCell_Ctrls_Delete.setAttribute("onclick", "SE_TV_DeleteElement_GetCategoryNumber(this.id), SE_TV_DeleteElement(parentNode.parentNode.id)");
			document.getElementById("content_tableRows_Ctrls_"+arrayItem).appendChild(tableCell_Ctrls_Delete);
			
			
			/*var tableRow = document.createElement('tr');
				tableRow.classList.add("ShortcutEditor_Table_Row");
				tableRow.setAttribute("id", "content_tableRows_"+arrayItem);
				document.getElementById("content_table_"+arrayItem).appendChild(tableRow);
				
				var tableCell_Name = document.createElement('th');
				tableCell_Name.innerHTML = SE_Array_ListText[linkItem];
				document.getElementById("content_tableRows_"+arrayItem).appendChild(tableCell_Name);
				
				var tableCell_URL = document.createElement('th');
				tableCell_URL.innerHTML = SE_Array_ListURL[linkItem];
				document.getElementById("content_tableRows_"+arrayItem).appendChild(tableCell_URL);
			*/
			/*var tableCell_Ctrls = document.createElement('th');
				tableCell_Ctrls.classList.add("ShortcutEditor_Table_Ctrl");
				tableCell_Ctrls.setAttribute("id", "content_tableRows_Ctrls_"+arrayItem);
				document.getElementById("content_tableRows_"+arrayItem).appendChild(tableCell_Ctrls);
				
				var tableCell_Ctrls_Edit = document.createElement('img');
				tableCell_Ctrls_Edit.classList.add("ShortcutEditor_Table_Ctrl_Edit");
				tableCell_Ctrls_Edit.setAttribute("src", "Assets/Icons/iconNew_edit.png");
				document.getElementById("content_tableRows_Ctrls_"+arrayItem).appendChild(tableCell_Ctrls_Edit);
				
				var tableCell_Ctrls_Delete = document.createElement('img');
				tableCell_Ctrls_Delete.classList.add("ShortcutEditor_Table_Ctrl_Edit");
				tableCell_Ctrls_Delete.setAttribute("src", "Assets/Icons/iconNew_delete.png");
				document.getElementById("content_tableRows_Ctrls_"+arrayItem).appendChild(tableCell_Ctrls_Delete);
			*/
			
		}
		SE_Array_ListText = [];
		SE_Array_ListURL = [];//Clears the content array
		
	}
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

var wallpaperImagePath;

function Settings_DetectImageFile(){
	var rawFileName = document.getElementById("form_Settings_WallpaperName").value;
	var rawFileType = document.getElementById("dropdownButton_ImageType").innerText;
	var combinedFileName = rawFileName + rawFileType;
	console.log(combinedFileName);
	var imagePath = "Assets/Background/"+combinedFileName;
	wallpaperImagePath = imagePath;
	console.log(imagePath);
	console.log("wallpaperImagePath: "+wallpaperImagePath);
	document.getElementById("Settings_WallpaperPreview").src = imagePath;
	document.getElementById("Settings_WallpaperPreview").style.display = "block";
	
}

function Settings_FileNotFound(){
	document.getElementById("Settings_WallpaperPreview").style.display = "none";
	trigger_createToast("Settings_FileNotFound");
}

function Settings_DisplayGreetingName_Check(){
	var Checked_BH_TG_DisplayGreetings_DisplayName = document.getElementById("BH-TG-DisplayGreetings_DisplayName");
	var BH_TG_DisplayGreetings_DisplayName = Checked_BH_TG_DisplayGreetings_DisplayName.checked;
	if (BH_TG_DisplayGreetings_DisplayName == true){
		if (document.getElementById("form_Settings_GreetingName").value == ""){
			trigger_createToast("Settings_FormEmpty");
			close_Subwindow("CustomizeGreetingText");
		}
	}
	close_Subwindow("CustomizeGreetingText");
}

var key_Settings_Appearance = "DL_Settings_Appearance";
var key_Settings_Behaviors = "DL_Settings_Behaviors";
function Settings_ApplyChanges(){
	Settings_DetectImageFile();
	console.log("Setting variable values from input values...");
	// Get the value from input fields and variables
	var appearance_Wallpaper_Img = wallpaperImagePath;
	var rawWallpaperFileName = document.getElementById("form_Settings_WallpaperName").value;
	var WallpaperFileType = document.getElementById("dropdownButton_ImageType").innerHTML; //The value from the dropdown
	var rawWallpaperFileType = ""; //The filtered variable
	for( var i = 0; i < WallpaperFileType.length; i++ ) { //Filters \n and \t from the string
		if( !(WallpaperFileType[i] == '\n' || WallpaperFileType[i] == '\t') ){
		rawWallpaperFileType += WallpaperFileType[i];}
	} //Thanks geeksforgeeks!
	var AP_CL_AccentColor = document.getElementById("AP-CL-AccentColor").value;
	var AP_CL_AccentColor_Hover = document.getElementById("AP-CL-AccentColor-Hover").value;
	var AP_CL_BGColor_General = document.getElementById("AP-CL-BGColor-General").value;
	var AP_CL_HoverColor = document.getElementById("AP-CL-HoverColor").value;
	var AP_CL_BGColor_Menu = document.getElementById("AP-CL-BGColor-Menu").value;
	var AP_CL_BGColor_Subwindow = document.getElementById("AP-CL-BGColor-Subwindow").value;
	var AP_CL_BGColor_Dropdown = document.getElementById("AP-CL-BGColor-Dropdown").value;
	var AP_CL_BGColor_Opacitated = document.getElementById("AP-CL-BGColor-Opacitated").value;
	hexToRgbA(AP_CL_BGColor_Opacitated); //Convert HEX to RGBA
	
	
	function hexToRgbA(hex){
		var c;
		if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
			c= hex.substring(1).split('');
			if(c.length== 3){
				c= [c[0], c[0], c[1], c[1], c[2], c[2]];
			}
			c= '0x'+c.join('');
			AP_CL_BGColor_Opacitated = 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.5)';
		}
	}
	
	var AP_CL_BGColor_ShortcutButton = document.getElementById("AP-CL-BGColor-ShortcutButton").value;
	var AP_CL_BGColor_GeneralButton = document.getElementById("AP-CL-BGColor-GeneralButton").value;
	var AP_CL_BGColor_Input = document.getElementById("AP-CL-BGColor-Input").value;
	var AP_CL_BGColor_Divider = document.getElementById("AP-CL-BGColor-Divider").value;
	var AP_TX_Font_Primary = document.getElementById("AP-TX-Font-Primary").value;
	var AP_TX_Font_Secondary = document.getElementById("AP-TX-Font-Secondary").value;
	var AP_TX_Font_Numbers= document.getElementById("AP-TX-Font-Numbers").value;
	var AP_TX_Font_Color = document.getElementById("AP-TX-Font-Color").value;
	var AP_CL_IconBrightness = document.getElementById("AP-CL-IconBrightness").value;
	var Checked_AP_WP_CB_EnableWallpapers = document.getElementById("AP-WP-CB-EnableWallpapers");
	var AP_WP_CB_EnableWallpapers = Checked_AP_WP_CB_EnableWallpapers.checked;
	// var Checked_AP_WP_CB_BlurHomeWallpaper= document.getElementById("AP-WP-CB-BlurHomeWallpaper");
	// var AP_WP_CB_BlurHomeWallpaper = Checked_AP_WP_CB_BlurHomeWallpaper.checked;
	console.log("Setting values to object...");
	// Set the values to the object
	const Settings_Appearance_Obj = {
		appearance_Wallpaper_Img: appearance_Wallpaper_Img,
		AP_CL_AccentColor: AP_CL_AccentColor,
		AP_CL_AccentColor_Hover: AP_CL_AccentColor_Hover,
		AP_CL_BGColor_General: AP_CL_BGColor_General,
		AP_CL_HoverColor: AP_CL_HoverColor,
		AP_CL_BGColor_Menu: AP_CL_BGColor_Menu,
		AP_CL_BGColor_Subwindow: AP_CL_BGColor_Subwindow,
		AP_CL_BGColor_Dropdown: AP_CL_BGColor_Dropdown,
		AP_CL_BGColor_Opacitated: AP_CL_BGColor_Opacitated,
		AP_CL_BGColor_ShortcutButton: AP_CL_BGColor_ShortcutButton,
		AP_CL_BGColor_GeneralButton: AP_CL_BGColor_GeneralButton,
		AP_CL_BGColor_Input: AP_CL_BGColor_Input,
		AP_CL_BGColor_Divider: AP_CL_BGColor_Divider,
		rawWallpaperFileName: rawWallpaperFileName,
		rawWallpaperFileType: rawWallpaperFileType,
		AP_TX_Font_Primary: AP_TX_Font_Primary,
		AP_TX_Font_Secondary: AP_TX_Font_Secondary,
		AP_TX_Font_Numbers: AP_TX_Font_Numbers,
		AP_TX_Font_Color: AP_TX_Font_Color,
		AP_CL_IconBrightness: AP_CL_IconBrightness,
		AP_WP_CB_EnableWallpapers: AP_WP_CB_EnableWallpapers,
		// AP_WP_CB_BlurHomeWallpaper: AP_WP_CB_BlurHomeWallpaper,
	}
	
	// Behaviors
	//BH: Behavior; TG: Toggle; Checked_: Not saved, the id of the element to be checked; DD: Dropdown
	var Checked_BH_TG_BlurEffects = document.getElementById("BH-TG-BlurEffects");
	var BH_TG_BlurEffects = Checked_BH_TG_BlurEffects.checked;
	var Checked_BH_TG_DisplayTimeAndDate = document.getElementById("BH-TG-DisplayTimeAndDate");
	var BH_TG_DisplayTimeAndDate = Checked_BH_TG_DisplayTimeAndDate.checked;
	var Checked_BH_TG_DisplayBattery = document.getElementById("BH-TG-DisplayBattery");
	var BH_TG_DisplayBattery = Checked_BH_TG_DisplayBattery.checked;
	var Checked_BH_TG_DisplayInternetStatus = document.getElementById("BH-TG-DisplayInternetStatus");
	var BH_TG_DisplayInternetStatus = Checked_BH_TG_DisplayInternetStatus.checked;
	var Checked_BH_TG_NotifyForUpdates = document.getElementById("BH-TG-NotifyForUpdates");
	var BH_TG_NotifyForUpdates = Checked_BH_TG_NotifyForUpdates.checked;
	var Checked_BH_TG_DisplayCategoryNavigation = document.getElementById("BH-TG-DisplayCategoryNavigation");
	var BH_TG_DisplayCategoryNavigation = Checked_BH_TG_DisplayCategoryNavigation.checked;
	
	var Checked_BH_TG_DisplaySearchBar = document.getElementById("BH-TG-DisplaySearchBar");
	var BH_TG_DisplaySearchBar = Checked_BH_TG_DisplaySearchBar.checked;
	var BH_DD_PreferredSearchEngine = document.getElementById("dropdownButton_SeaEng").innerText;
	
	var Checked_BH_TG_DisplayToasts = document.getElementById("BH-TG-DisplayToasts");
	var BH_TG_DisplayToasts = Checked_BH_TG_DisplayToasts.checked;	
	var Checked_BH_TG_DisplayGreetings = document.getElementById("BH-TG-DisplayGreetings");
	var BH_TG_DisplayGreetings = Checked_BH_TG_DisplayGreetings.checked;	
	var Checked_BH_TG_DisplayGreetings_DisplayName = document.getElementById("BH-TG-DisplayGreetings_DisplayName");
	var BH_TG_DisplayGreetings_DisplayName = Checked_BH_TG_DisplayGreetings_DisplayName.checked;	
	var BH_TG_DisplayGreetings_DisplayName_Text = document.getElementById("form_Settings_GreetingName").value;
	
	var Checked_BH_TG_SE_CloseWindowAfterAction= document.getElementById("BH-TG-SE_CloseWindowAfterAction");
	var BH_TG_SE_CloseWindowAfterAction = Checked_BH_TG_SE_CloseWindowAfterAction.checked;	
	var Checked_BH_TG_SE_ClearFieldsAfterCreation = document.getElementById("BH-TG-SE_ClearFieldsAfterCreation");
	var BH_TG_SE_ClearFieldsAfterCreation = Checked_BH_TG_SE_ClearFieldsAfterCreation.checked;	
	
	console.log("Setting values to object...");
	// Set the values to the object
	const Settings_Behavior_Obj = {
		BH_TG_BlurEffects: BH_TG_BlurEffects,
		BH_TG_DisplayTimeAndDate: BH_TG_DisplayTimeAndDate,
		BH_TG_DisplayBattery: BH_TG_DisplayBattery,
		BH_TG_DisplayInternetStatus: BH_TG_DisplayInternetStatus,
		BH_TG_NotifyForUpdates: BH_TG_NotifyForUpdates,
		BH_TG_DisplayCategoryNavigation: BH_TG_DisplayCategoryNavigation,
		BH_TG_DisplaySearchBar: BH_TG_DisplaySearchBar,
		BH_DD_PreferredSearchEngine: BH_DD_PreferredSearchEngine,
		BH_TG_DisplayToasts: BH_TG_DisplayToasts,
		BH_TG_DisplayGreetings: BH_TG_DisplayGreetings,
		BH_TG_DisplayGreetings_DisplayName: BH_TG_DisplayGreetings_DisplayName,
		BH_TG_DisplayGreetings_DisplayName_Text: BH_TG_DisplayGreetings_DisplayName_Text,
		BH_TG_SE_CloseWindowAfterAction: BH_TG_SE_CloseWindowAfterAction,
		BH_TG_SE_ClearFieldsAfterCreation: BH_TG_SE_ClearFieldsAfterCreation,
	}
	
	
	console.log("Saving objects to local storage...");
	window.localStorage.setItem("DL_Settings_Appearance",JSON.stringify(Settings_Appearance_Obj));
	window.localStorage.setItem("DL_Settings_Behaviors",JSON.stringify(Settings_Behavior_Obj));
	
	console.log("Settings have been saved");
	trigger_createToast("Settings_SaveSuccess");
	Settings_LoadAppearance();
	Settings_LoadBehaviors();
}

function Settings_CheckSettingFile(){
	//Check if the appearance settings key exist
	if(localStorage.getItem("DL_Settings_Appearance") == null){
		console.log("DL_Settings_Appearance does not exist. Creating default file.");
		const Settings_Appearance_Obj = {
			appearance_Wallpaper_Img: "url(../Assets/Background/default_New.png)",
			AP_CL_AccentColor: "#cf5520",
			AP_CL_AccentColor_Hover: "#a03d13",
			AP_CL_BGColor_General: "#171010",
			AP_CL_HoverColor: "#242424",
			AP_CL_BGColor_Menu: "#171010",
			AP_CL_BGColor_Subwindow: "#292929",
			AP_CL_BGColor_Dropdown: "#171010",
			AP_CL_BGColor_Opacitated: "rgba(28, 28, 28, 0.5)",
			AP_CL_BGColor_ShortcutButton: "#1E1E24",
			AP_CL_BGColor_GeneralButton: "#1E1E24",
			AP_CL_BGColor_Input: "#121212",
			AP_CL_BGColor_Divider: "#282830",
			rawWallpaperFileName: "default_New",
			rawWallpaperFileType: ".png",
			AP_TX_Font_Primary: "Raleway",
			AP_TX_Font_Secondary: "Roboto",
			AP_TX_Font_Numbers: "Roboto",
			AP_TX_Font_Color: "white",
			AP_CL_IconBrightness: "100",
			AP_WP_CB_EnableWallpapers: true,
			// AP_WP_CB_AP_WP_CB_BlurHomeWallpaper: false,
		}
		window.localStorage.setItem("DL_Settings_Appearance",JSON.stringify(Settings_Appearance_Obj));
		Settings_CheckSettingFile();
		} else {
		Settings_LoadAppearance();
	}
	if(localStorage.getItem("DL_Settings_Appearance") == null){
		console.log("DL_Settings_Behaviors does not exist. Creating default file.");
		const Settings_Behavior_Obj = {
			BH_TG_BlurEffects: true,
			BH_TG_DisplayTimeAndDate: true,
			BH_TG_DisplayBattery: true,
			BH_TG_DisplayInternetStatus: true,
			BH_TG_NotifyForUpdates: true,
			BH_TG_DisplayCategoryNavigation: true,
			BH_TG_DisplaySearchBar: true,
			BH_DD_PreferredSearchEngine: "Ecosia",
			BH_TG_DisplayToasts: BH_TG_DisplayToasts,
			BH_TG_DisplayGreetings: false,
			BH_TG_DisplayGreetings_DisplayName: false,
			BH_TG_DisplayGreetings_DisplayName_Text: "",
			BH_TG_SE_CloseWindowAfterAction: true,
			BH_TG_SE_ClearFieldsAfterCreation: true,
		}
		window.localStorage.setItem("DL_Settings_Behaviors",JSON.stringify(Settings_Behavior_Obj));
		Settings_LoadBehaviors();
		} else {
		Settings_LoadBehaviors();
	}
	Settings_LoadAppearance();
}


function Settings_LoadAppearance(){
	var stylesheet = document.querySelector(':root');
	
	var records = window.localStorage.getItem(key_Settings_Appearance); //searches for the keyAppearance in localStorage
	var data = JSON.parse(localStorage.getItem("DL_Settings_Appearance"));
	var style = Object.values(data);
	
	if (PageName == "DL_Settings.html"){
		document.getElementById("Settings_WallpaperPreview").src = style[0];
	}
	var wallpaperPath = 'url(../'+style[0]+')';
	if (style[20] == true){
		stylesheet.style.setProperty("--BG-WallpaperImg", wallpaperPath);
		} else {
		stylesheet.style.setProperty("--BG-WallpaperImg", "none");
	}
	//stylesheet.style.setProperty("--BG-WallpaperImg", wallpaperPath);
	stylesheet.style.setProperty("--Accent-Color", style[1]);
	stylesheet.style.setProperty("--Accent-Color-Hover", style[2]);
	stylesheet.style.setProperty("--BGColor-General", style[3]);
	stylesheet.style.setProperty("--BGColor-Hover", style[4]);
	stylesheet.style.setProperty("--BGColor-Menus", style[5]);
	stylesheet.style.setProperty("--BGColor-Subwindows", style[6]);
	stylesheet.style.setProperty("--BGColor-Dropdowns", style[7]);
	stylesheet.style.setProperty("--BGColor-Opacitated", style[8]);
	stylesheet.style.setProperty("--BGColor-ShortcutButtons", style[9]);
	stylesheet.style.setProperty("--BGColor-Buttons", style[10]);
	stylesheet.style.setProperty("--BGColor-Input", style[11]);
	stylesheet.style.setProperty("--Color-Dividers", style[12]);
	//13-14 is skipped since it is only needed on the Settings page
	stylesheet.style.setProperty("--Text-Font-Primary", style[15]);
	stylesheet.style.setProperty("--Text-Font-Secondary", style[16]);
	stylesheet.style.setProperty("--Text-Font-Numbers", style[17]);
	stylesheet.style.setProperty("--Text-Color", style[18]);
	var iconBrightness = style[19]/100;
	stylesheet.style.setProperty("--Element-Icon-Brightness", "brightness("+iconBrightness+")");
	Appearance_Behavior_BlurHomeWallpaper = style[21];
	
	
	
	Settings_LoadBehaviors();
}

function Settings_LoadBehaviors(){
	var records = window.localStorage.getItem(key_Settings_Behaviors); //searches for the keyAppearance in localStorage
	var dataSettings = JSON.parse(localStorage.getItem("DL_Settings_Behaviors"));
	var behavior = Object.values(dataSettings);
	
	Behavior_EnableBlurEffects = behavior[0];
	Behavior_DisplayTimeAndDate = behavior[1];
	Behavior_DisplayBattery = behavior[2];
	Behavior_DisplayInternetStatus = behavior[3];
	Behavior_NotifyForUpdates = behavior[4];
	Behavior_DisplayCategoryNavigation = behavior[5];
	Behavior_DisplaySearchBar = behavior[6];
	Behavior_DisplaySearchBar_PreferredEngine = behavior[7];
	Behavior_DisplayToasts = behavior[8];
	Behavior_DisplayGreetings = behavior[9];
	Behavior_DisplayGreetings_DisplayName = behavior[10];
	Behavior_DisplayGreetings_DisplayName_Text = behavior[11];
	Behavior_SE_CloseWindowAfterAction = behavior[12];
	Behavior_SE_ClearFieldsAfterCreation = behavior[13];
	apply_Behaviors();
	
	
}

function Settings_LoadSettingValues(){
	var records = window.localStorage.getItem(key_Settings_Appearance); //searches for the keyAppearance in localStorage
	var data = JSON.parse(localStorage.getItem("DL_Settings_Appearance"));
	var style = Object.values(data);
	
	document.getElementById("Settings_WallpaperPreview").src = style[0];
	document.getElementById("AP-CL-AccentColor").value = style[1];
	document.getElementById("AP-CL-AccentColor-Hover").value = style[2];
	document.getElementById("AP-CL-BGColor-General").value = style[3];
	document.getElementById("AP-CL-HoverColor").value = style[4];
	document.getElementById("AP-CL-BGColor-Menu").value = style[5];
	document.getElementById("AP-CL-BGColor-Subwindow").value = style[6];
	document.getElementById("AP-CL-BGColor-Dropdown").value = style[7];
	document.getElementById("AP-CL-BGColor-Opacitated").value = style[8];
	document.getElementById("AP-CL-BGColor-ShortcutButton").value = style[9];
	document.getElementById("AP-CL-BGColor-GeneralButton").value = style[10];
	document.getElementById("AP-CL-BGColor-Input").value = style[11];
	document.getElementById("AP-CL-BGColor-Divider").value = style[12];
	document.getElementById("form_Settings_WallpaperName").value = style[13];
	document.getElementById("dropdownButton_ImageType").innerHTML = style[14];
	document.getElementById("AP-TX-Font-Primary").value = style[15];
	document.getElementById("AP-TX-Font-Secondary").value = style[16];
	document.getElementById("AP-TX-Font-Numbers").value = style[17];
	document.getElementById("AP-TX-Font-Color").value = style[18];
	document.getElementById("AP-CL-IconBrightness").value = style[19];
	document.getElementById("AP-WP-CB-EnableWallpapers").checked = style[20];
	// document.getElementById("AP-WP-CB-BlurHomeWallpaper").checked = style[21];
	Settings_RangeValueChanged("AP-CL-IconBrightness");
	
	var records = window.localStorage.getItem(key_Settings_Behaviors); //searches for the keyAppearance in localStorage
	var dataSettings = JSON.parse(localStorage.getItem("DL_Settings_Behaviors"));
	var behavior = Object.values(dataSettings);
	
	document.getElementById("BH-TG-BlurEffects").checked = behavior[0];
	document.getElementById("BH-TG-DisplayTimeAndDate").checked = behavior[1];
	document.getElementById("BH-TG-DisplayBattery").checked = behavior[2];
	document.getElementById("BH-TG-DisplayInternetStatus").checked = behavior[3];
	document.getElementById("BH-TG-NotifyForUpdates").checked = behavior[4];
	document.getElementById("BH-TG-DisplayCategoryNavigation").checked = behavior[5];
	document.getElementById("BH-TG-DisplaySearchBar").checked = behavior[6];
	document.getElementById("dropdownButton_SeaEng").innerText = behavior[7];
	document.getElementById("BH-TG-DisplayToasts").checked = behavior[8];
	document.getElementById("BH-TG-DisplayGreetings").checked = behavior[9];
	document.getElementById("BH-TG-DisplayGreetings_DisplayName").checked = behavior[10];
	document.getElementById("form_Settings_GreetingName").value = behavior[11];
	document.getElementById("BH-TG-SE_CloseWindowAfterAction").checked = behavior[12];
	document.getElementById("BH-TG-SE_ClearFieldsAfterCreation").checked = behavior[13];
}

function Settings_LoadPresets(presetID){
	switch (presetID){
		case "lightmode":
		document.getElementById("AP-CL-AccentColor").value = "#a2b4fb";
		document.getElementById("AP-CL-AccentColor-Hover").value = "#4664dd";
		document.getElementById("AP-CL-BGColor-General").value = "#ffffff";
		document.getElementById("AP-CL-HoverColor").value = "#a6a6a6";
		document.getElementById("AP-CL-BGColor-Menu").value = "#cccccc";
		document.getElementById("AP-CL-BGColor-Subwindow").value = "#cccccc";
		document.getElementById("AP-CL-BGColor-Dropdown").value = "#bfbfbf";
		//document.getElementById("AP-CL-BGColor-Opacitated").value = "rgba(28, 28, 28, 0.5)";
		document.getElementById("AP-CL-BGColor-Opacitated").value = "#ffffff";
		
		document.getElementById("AP-CL-BGColor-ShortcutButton").value = "#e6e6e6";
		document.getElementById("AP-CL-BGColor-GeneralButton").value = "#ffffff";
		document.getElementById("AP-CL-BGColor-Input").value = "#c2c2c2";
		document.getElementById("AP-CL-BGColor-Divider").value = "#878787";
		document.getElementById("AP-TX-Font-Color").value = "#3b3b3b";
		document.getElementById("AP-CL-IconBrightness").value = "0";
		document.getElementById("form_Settings_WallpaperName").value = "default_lightmode";
		document.getElementById("dropdownButton_ImageType").innerText = ".jpg";
		document.getElementById("AP-WP-CB-EnableWallpapers").checked = "true";
		break;
		case "darkmode":
		document.getElementById("AP-CL-AccentColor").value = "#cf5520";
		document.getElementById("AP-CL-AccentColor-Hover").value = "#a03d13";
		document.getElementById("AP-CL-BGColor-General").value = "#171010";
		document.getElementById("AP-CL-HoverColor").value = "#242424";
		document.getElementById("AP-CL-BGColor-Menu").value = "#171010";
		document.getElementById("AP-CL-BGColor-Subwindow").value = "#292929";
		document.getElementById("AP-CL-BGColor-Dropdown").value = "#171010";
		//document.getElementById("AP-CL-BGColor-Opacitated").value = "rgba(28, 28, 28, 0.5)";
		document.getElementById("AP-CL-BGColor-Opacitated").value = "#1c1c1c";
		
		document.getElementById("AP-CL-BGColor-ShortcutButton").value = "#1E1E24";
		document.getElementById("AP-CL-BGColor-GeneralButton").value = "#1E1E24";
		document.getElementById("AP-CL-BGColor-Input").value = "#121212";
		document.getElementById("AP-CL-BGColor-Divider").value = "#282830";
		document.getElementById("AP-TX-Font-Color").value = "#FFFFFF";
		document.getElementById("AP-CL-IconBrightness").value = "100";
		document.getElementById("form_Settings_WallpaperName").value = "default_New";
		document.getElementById("dropdownButton_ImageType").innerText = ".png";
		document.getElementById("AP-WP-CB-EnableWallpapers").checked = "true";
		// document.getElementById("AP-WP-CB-BlurHomeWallpaper").checked = "false";
		break;
		case "gardenofwords":
		document.getElementById("AP-CL-AccentColor").value = "#9f4f52";
		document.getElementById("AP-CL-AccentColor-Hover").value = "#9f4f52";
		document.getElementById("AP-CL-BGColor-General").value = "#171010";
		document.getElementById("AP-CL-HoverColor").value = "#242424";
		document.getElementById("AP-CL-BGColor-Menu").value = "#171010";
		document.getElementById("AP-CL-BGColor-Subwindow").value = "#292929";
		document.getElementById("AP-CL-BGColor-Dropdown").value = "#171010";
		//document.getElementById("AP-CL-BGColor-Opacitated").value = "rgba(28, 28, 28, 0.5)";
		document.getElementById("AP-CL-BGColor-Opacitated").value = "#1c1c1c";
		
		document.getElementById("AP-CL-BGColor-ShortcutButton").value = "#1E1E24";
		document.getElementById("AP-CL-BGColor-GeneralButton").value = "#1E1E24";
		document.getElementById("AP-CL-BGColor-Input").value = "#121212";
		document.getElementById("AP-CL-BGColor-Divider").value = "#282830";
		document.getElementById("AP-TX-Font-Color").value = "#FFFFFF";
		document.getElementById("AP-CL-IconBrightness").value = "100";
		document.getElementById("form_Settings_WallpaperName").value = "gardenofwords";
		document.getElementById("dropdownButton_ImageType").innerText = ".jpg";
		document.getElementById("AP-WP-CB-EnableWallpapers").checked = "true";
		break;
		break;
		case "underwater":
		document.getElementById("AP-CL-AccentColor").value = "#bd7b87";
		document.getElementById("AP-CL-AccentColor-Hover").value = "#a05482";
		document.getElementById("AP-CL-BGColor-General").value = "#012754";
		document.getElementById("AP-CL-HoverColor").value = "#03316d";
		document.getElementById("AP-CL-BGColor-Menu").value = "#012754";
		document.getElementById("AP-CL-BGColor-Subwindow").value = "#00305d";
		document.getElementById("AP-CL-BGColor-Dropdown").value = "#004775";
		//document.getElementById("AP-CL-BGColor-Opacitated").value = "rgba(28, 28, 28, 0.5)";
		document.getElementById("AP-CL-BGColor-Opacitated").value = "#011b3c";
		
		document.getElementById("AP-CL-BGColor-ShortcutButton").value = "#00628e";
		document.getElementById("AP-CL-BGColor-GeneralButton").value = "#027cad";
		document.getElementById("AP-CL-BGColor-Input").value = "#00305d";
		document.getElementById("AP-CL-BGColor-Divider").value = "#47c2d4";
		document.getElementById("AP-TX-Font-Color").value = "#FFFFFF";
		document.getElementById("AP-CL-IconBrightness").value = "100";
		document.getElementById("form_Settings_WallpaperName").value = "underwater";
		document.getElementById("dropdownButton_ImageType").innerText = ".jpg";
		document.getElementById("AP-WP-CB-EnableWallpapers").checked = "true";
		break;
		
		
		case "intendedfonts":
		document.getElementById("AP-TX-Font-Primary").value = "Raleway";
		document.getElementById("AP-TX-Font-Secondary").value = "Roboto";
		document.getElementById("AP-TX-Font-Numbers").value = "Roboto";
		break;
	}
	//trigger_createToast("Presets_Set");
	Settings_ApplyChanges();
}

function check_SettingsFileExistence(){
	if(localStorage.getItem("DL_Settings_Appearance") == null || localStorage.getItem("DL_Settings_Behaviors") == null){
		const Settings_Appearance_Obj = {
			appearance_Wallpaper_Img: "Assets/Background/default_New.png",
			AP_CL_AccentColor: "#cf5520",
			AP_CL_AccentColor_Hover: "#a03d13",
			AP_CL_BGColor_General: "#171010",
			AP_CL_HoverColor: "#242424",
			AP_CL_BGColor_Menu: "#171010",
			AP_CL_BGColor_Subwindow: "#292929",
			AP_CL_BGColor_Dropdown: "#171010",
			AP_CL_BGColor_Opacitated: "rgba(28, 28, 28, 0.5)",
			AP_CL_BGColor_ShortcutButton: "#1E1E24",
			AP_CL_BGColor_GeneralButton: "#1E1E24",
			AP_CL_BGColor_Input: "#121212",
			AP_CL_BGColor_Divider: "#282830",
			rawWallpaperFileName: "default_New",
			rawWallpaperFileType: ".png",
			AP_TX_Font_Primary: "Raleway",
			AP_TX_Font_Secondary: "Roboto",
			AP_TX_Font_Numbers: "Roboto",
			AP_TX_Font_Color: "#FFFFFF",
			AP_CL_IconBrightness: "100",
			AP_WP_CB_EnableWallpapers: true,
			// AP_WP_CB_BlurHomeWallpaper: false,
			
		}
		window.localStorage.setItem("DL_Settings_Appearance",JSON.stringify(Settings_Appearance_Obj));
		
		const Settings_Behavior_Obj = {
			BH_TG_BlurEffects: true,
			BH_TG_DisplayTimeAndDate: true,
			BH_TG_DisplayBattery: true,
			BH_TG_DisplayInternetStatus: true,
			BH_TG_NotifyForUpdates: true,
			BH_TG_DisplayCategoryNavigation: true,
			BH_TG_DisplaySearchBar: true,
			BH_DD_PreferredSearchEngine: "Ecosia",
			BH_TG_DisplayToasts: true,
			BH_TG_DisplayGreetings: false,
			BH_TG_DisplayGreetings_DisplayName: false,
			BH_TG_DisplayGreetings_DisplayName_Text: "",
			BH_TG_SE_CloseWindowAfterAction: true,
		}
		window.localStorage.setItem("DL_Settings_Behaviors",JSON.stringify(Settings_Behavior_Obj));
		Settings_LoadAppearance();
	}
	
}

function Settings_RangeValueChanged(id){
	RangeValue = document.getElementById(id).value;
	document.getElementById(id+"_ValueDisplay").innerHTML = RangeValue + "%";
}

function Settings_PrintResult(id){
	var checkbox = document.getElementById(id);
	console.log(checkbox.checked);
	var checkboxStatus = checkbox.checked;
	console.log(checkboxStatus);
	if (checkboxStatus == true){
		console.log("Feature active");
		} else {
		console.log("Feature Inactive");
	}
}

// ONBOARDING //
function begin_OnboardingSequence(){
	var welcomeBox = document.getElementById("Onboarding_Welcome");
	welcomeBox.style.opacity = "0%";
	setTimeout(function(){welcomeBox.style.display = "none";}, 300);
	
	var processBox = document.getElementById("Onboarding_Process");
	processBox.style.display = "block";
	processBox.style.animationName = "opening_Onboarding_Process";
	processBox.style.animationDuration = "0.3s";
	processBox.style.animationFillMode = "forwards";
}

var Onboarding_Page = 1;
function Onboarding_ChangePage(pageAction){
	var OBPage = Onboarding_Page;
	console.log(Onboarding_Page);
	if (pageAction == "Next"){
		Onboarding_Page = Onboarding_Page + 1;
		} else {
		Onboarding_Page = Onboarding_Page - 1;
	}
	console.log(Onboarding_Page);
	var Onboarding_PageElements = document.querySelectorAll(".Onboarding_Process_Page");
	for (a = 0; a < Onboarding_PageElements.length; a++){
		Onboarding_PageElements[a].style.display = "none";
	}
	var Onboarding_PageElements_Current = document.getElementById("Onboarding_Page"+OBPage);
	Onboarding_PageElements_Current.style.display = "grid";
	console.log(Onboarding_Page);
}	

// ONBOARDING NEW //	
var OBPage;

function Onboarding_CheckVersion(){
	if(localStorage.getItem("DL_Version") == null){
		console.log("DL_Version does not exist. Starting Onboarding sequence.");
		resetPage();
	}
}

function resetPage(){
	var x = document.getElementById("pageElement_Onboarding");
	x.style.display = "block";
	hideAllPages();
	OBPage = -1;
	changePagesForward();
	console.log(OBPage);
}

var animation = "opacitateToLeft";

function changePagesForward(animState){
	OBPage = OBPage + 1;
	animation = animState;
	setPage();
	
	
	
}

function changePagesBackward(animState){
	animation = animState;
	OBPage = OBPage - 1;
	setPage();
}

function setAnimationLeft(){
	var animation = "opacitateToLeft";
}

function setAnimationRight(){
	var animation = "opacitateToRight";
}

var animDuration = "0.3s";

function setPage(){
	//document.getElementById('test').innerHTML = OBPage+" "+animation;
	var contentPage0 = document.getElementById('OB_Content_Page0');
	var contentPage1 = document.getElementById('OB_Content_Page1');
	var contentPage2 = document.getElementById('OB_Content_Page2');
	var contentPage3 = document.getElementById('OB_Content_Page3');
	var contentPage4 = document.getElementById('OB_Content_Page4');
	var contentPage5 = document.getElementById('OB_Content_Page5');
	var buttonPage0 = document.getElementById('OB_Button_Page0');
	var buttonPage1 = document.getElementById('OB_Button_Page1');
	switch (OBPage){
		case 0:
		hideAllPages();
		contentPage0.style.display = "block";
		buttonPage0.style.display = "grid";
		contentPage0.style.animationName = animation;
		contentPage0.style.animationDuration = animDuration;
		contentPage0.style.animationFillMode = "forwards";
		break;
		case 1:
		hideAllPages();
		contentPage1.style.display = "block";
		buttonPage1.style.display = "grid";
		contentPage1.style.animationName = animation;
		contentPage1.style.animationDuration = animDuration;
		contentPage1.style.animationFillMode = "forwards";
		break;
		case 2:
		hideAllPages();
		contentPage2.style.display = "block";
		buttonPage1.style.display = "grid";
		contentPage2.style.animationName = animation;
		contentPage2.style.animationDuration = animDuration;
		contentPage2.style.animationFillMode = "forwards";
		break;
		case 3:
		changePagesForward("opacitateToLeft");
		
		break;
		case 4:
		changePagesForward("opacitateToLeft");
		break;
		case 5:
		const Onboarding_Version = [ContinuityVersionNumber, BuildNumber];
		window.localStorage.setItem("DL_Version",JSON.stringify(Onboarding_Version));
		var x = document.getElementById("pageElement_Onboarding");
		x.style.animationName = "blurOut";
		x.style.animationDuration = "0.5s";
		x.addEventListener("animationend",function(){
			var x = document.getElementById("pageElement_Onboarding");
			x.parentNode.removeChild(x);
		start_Animations();});
		hideAllPages();
		contentPage5.style.display = "block";
		buttonPage1.style.display = "grid";
		contentPage5.style.animationName = animation;
		contentPage5.style.animationDuration = animDuration;
		contentPage5.style.animationFillMode = "forwards";
		break;
		/*case 6:
			const Onboarding_Version = ["1.12"];
			window.localStorage.setItem("DL_Version",JSON.stringify(Onboarding_Version));
			var Checked_OB_TransferOldLinks = document.getElementById("OB-TransferOldLinks");
			var OB_TransferOldLinks = Checked_OB_TransferOldLinks.checked;
			if(OB_TransferOldLinks == true){
			window.location.reload();
			} else {
			var x = document.getElementById("pageElement_Onboarding");
			x.style.animationName = "blurOut";
			x.style.animationDuration = "0.5s";
			x.addEventListener("animationend",function(){
			var x = document.getElementById("pageElement_Onboarding");
			x.parentNode.removeChild(x);
			start_Animations();});
			}
		break;*/
	}
}

function hideAllPages(){
	var contentPage0 = document.getElementById('OB_Content_Page0');
	var contentPage1 = document.getElementById('OB_Content_Page1');
	var contentPage2 = document.getElementById('OB_Content_Page2');
	var contentPage3 = document.getElementById('OB_Content_Page3');
	/*var contentPage4 = document.getElementById('OB_Content_Page4');
	var contentPage5 = document.getElementById('OB_Content_Page5');*/
	var buttonPage0 = document.getElementById('OB_Button_Page0');
	var buttonPage1 = document.getElementById('OB_Button_Page1');
	contentPage0.style.display = "none";
	contentPage1.style.display = "none";
	contentPage2.style.display = "none";
	contentPage3.style.display = "none";
	/*contentPage4.style.display = "none";
	contentPage5.style.display = "none";*/
	buttonPage0.style.display = "none";
	buttonPage1.style.display = "none";
}
var Onboarding_TransferOldLinks_Category = 0;
var OB_TransferOldLinks_Progress = 0;
function Onboarding_TransferOldLinks(){
	SE_CreateItem_categoryTitle = "Favorites";
	
	document.getElementById("OB_TransferOldLinks_Processing").innerHTML = "Processing: "+SE_CreateItem_categoryTitle;
	
	SE_Array_Category_Index.push(SE_CreateItem_categoryTitle); //Add the typed item to the array
	console.log(SE_Array_Category_Index); //Debug
	localStorage.setItem(key_Index_Category, JSON.stringify(SE_Array_Category_Index)); //Saves the updated array to local storage
	
	// Creates the category content key for the created category //
	SE_Array_ListText = []; 
	SE_Array_ListText.push("fillerText");
	SE_Array_ListText.push("G12 Notebook");
	SE_Array_ListText.push("LMS Dashboard");
	SE_Array_ListText.push("Microsoft To do");
	SE_Array_ListText.push("Student Mail");
	localStorage.setItem("DL_Content_"+SE_CreateItem_categoryTitle, JSON.stringify(SE_Array_ListText));
	
	SE_Array_ListURL = [];
	SE_Array_ListURL.push("fillerURL");
	SE_Array_ListURL.push("https://1drv.ms/u/s!AtZoHXAgGdYSjWahqqo8L0g8IPiw?e=advU5E");
	SE_Array_ListURL.push("https://mapsaantipolo.net/e/student/dashboard");
	SE_Array_ListURL.push("https://todo.microsoft.com/tasks/");
	SE_Array_ListURL.push("https://mail.google.com/mail/u/4/#inbox");
	localStorage.setItem("DL_Content_URL_"+SE_CreateItem_categoryTitle, JSON.stringify(SE_Array_ListURL));
	SE_CreateItem_categoryTitle = "MAPSA LMS";
	
	document.getElementById("OB_TransferOldLinks_Processing").innerHTML = "Processing: "+SE_CreateItem_categoryTitle;
	
	SE_Array_Category_Index.push(SE_CreateItem_categoryTitle); //Add the typed item to the array
	console.log(SE_Array_Category_Index); //Debug
	localStorage.setItem(key_Index_Category, JSON.stringify(SE_Array_Category_Index)); //Saves the updated array to local storage
	
	// Creates the category content key for the created category //
	SE_Array_ListText = []; 
	SE_Array_ListText.push("fillerText");
	SE_Array_ListText.push("Student Dashboard");
	localStorage.setItem("DL_Content_"+SE_CreateItem_categoryTitle, JSON.stringify(SE_Array_ListText));
	
	SE_Array_ListURL = [];
	SE_Array_ListURL.push("fillerURL");
	SE_Array_ListURL.push("https://mapsaantipolo.net/e/student/dashboard");
	localStorage.setItem("DL_Content_URL_"+SE_CreateItem_categoryTitle, JSON.stringify(SE_Array_ListURL));
	
	SE_CreateItem_categoryTitle = "Messenger";
	
	document.getElementById("OB_TransferOldLinks_Processing").innerHTML = "Processing: "+SE_CreateItem_categoryTitle;
	
	SE_Array_Category_Index.push(SE_CreateItem_categoryTitle); //Add the typed item to the array
	console.log(SE_Array_Category_Index); //Debug
	localStorage.setItem(key_Index_Category, JSON.stringify(SE_Array_Category_Index)); //Saves the updated array to local storage
	
	// Creates the category content key for the created category //
	SE_Array_ListText = []; 
	SE_Array_ListText.push("fillerText");
	SE_Array_ListText.push("12-D GC (with Teachers)");
	SE_Array_ListText.push("12-D GC");
	SE_Array_ListText.push("12-D GC (UCSP)");
	SE_Array_ListText.push("12-D GC (CLE)");
	localStorage.setItem("DL_Content_"+SE_CreateItem_categoryTitle, JSON.stringify(SE_Array_ListText));
	
	SE_Array_ListURL = [];
	SE_Array_ListURL.push("fillerURL");
	SE_Array_ListURL.push("https://www.facebook.com/messages/t/2922418234552841");
	SE_Array_ListURL.push("https://www.facebook.com/messages/t/4892240400791649");
	SE_Array_ListURL.push("https://www.facebook.com/messages/t/4012309995544077");
	SE_Array_ListURL.push("https://www.messenger.com/t/6467320699975645");
	
	localStorage.setItem("DL_Content_URL_"+SE_CreateItem_categoryTitle, JSON.stringify(SE_Array_ListURL));
	
	SE_CreateItem_categoryTitle = "Zoom Meetings";
	
	document.getElementById("OB_TransferOldLinks_Processing").innerHTML = "Processing: "+SE_CreateItem_categoryTitle;
	
	SE_Array_Category_Index.push(SE_CreateItem_categoryTitle); //Add the typed item to the array
	console.log(SE_Array_Category_Index); //Debug
	localStorage.setItem(key_Index_Category, JSON.stringify(SE_Array_Category_Index)); //Saves the updated array to local storage
	
	// Creates the category content key for the created category //
	SE_Array_ListText = []; 
	SE_Array_ListText.push("fillerText");
	SE_Array_ListText.push("Grade 12-D Room");
	SE_Array_ListText.push("Flag Ceremony 1");
	SE_Array_ListText.push("Flag Ceremony 2");
	
	localStorage.setItem("DL_Content_"+SE_CreateItem_categoryTitle, JSON.stringify(SE_Array_ListText));
	
	SE_Array_ListURL = [];
	SE_Array_ListURL.push("fillerURL");
	SE_Array_ListURL.push("https://zoom.us/j/92669269579?pwd=Q2hlYjBxS3FnVzRFWFROQzl1OFZHQT09");
	SE_Array_ListURL.push("https://zoom.us/j/9563203696?pwd=TGd4RDlNYzlIMHFrWldWTVQybWgwdz09");
	SE_Array_ListURL.push("https://zoom.us/j/92595202479?pwd=Qy9ZWEdXOHhBWjVQcXhoU0dUVTc0dz09");
	localStorage.setItem("DL_Content_URL_"+SE_CreateItem_categoryTitle, JSON.stringify(SE_Array_ListURL));
	
	SE_CreateItem_categoryTitle = "Google Mail";
	
	document.getElementById("OB_TransferOldLinks_Processing").innerHTML = "Processing: "+SE_CreateItem_categoryTitle;
	
	SE_Array_Category_Index.push(SE_CreateItem_categoryTitle); //Add the typed item to the array
	console.log(SE_Array_Category_Index); //Debug
	localStorage.setItem(key_Index_Category, JSON.stringify(SE_Array_Category_Index)); //Saves the updated array to local storage
	
	// Creates the category content key for the created category //
	SE_Array_ListText = []; 
	SE_Array_ListText.push("fillerText");
	SE_Array_ListText.push("Student Account");
	SE_Array_ListText.push("Technokids Account");
	SE_Array_ListText.push("Personal Account");
	
	localStorage.setItem("DL_Content_"+SE_CreateItem_categoryTitle, JSON.stringify(SE_Array_ListText));
	
	SE_Array_ListURL = [];
	SE_Array_ListURL.push("fillerURL");
	SE_Array_ListURL.push("https://mail.google.com/mail/u/1/#inbox");
	SE_Array_ListURL.push("https://mail.google.com/mail/u/2/");
	SE_Array_ListURL.push("https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox");
	
	localStorage.setItem("DL_Content_URL_"+SE_CreateItem_categoryTitle, JSON.stringify(SE_Array_ListURL));
	
	SE_CreateItem_categoryTitle = "Cloud Drive";
	
	document.getElementById("OB_TransferOldLinks_Processing").innerHTML = "Processing: "+SE_CreateItem_categoryTitle;
	
	SE_Array_Category_Index.push(SE_CreateItem_categoryTitle); //Add the typed item to the array
	console.log(SE_Array_Category_Index); //Debug
	localStorage.setItem(key_Index_Category, JSON.stringify(SE_Array_Category_Index)); //Saves the updated array to local storage
	
	// Creates the category content key for the created category //
	SE_Array_ListText = []; 
	SE_Array_ListText.push("fillerText");
	SE_Array_ListText.push("Student Account");
	SE_Array_ListText.push("Technokids Account");
	SE_Array_ListText.push("Personal Account");
	
	localStorage.setItem("DL_Content_"+SE_CreateItem_categoryTitle, JSON.stringify(SE_Array_ListText));
	
	SE_Array_ListURL = [];
	SE_Array_ListURL.push("fillerURL");
	SE_Array_ListURL.push("https://drive.google.com/drive/u/1/my-drive");
	SE_Array_ListURL.push("https://drive.google.com/drive/u/2/my-drive");
	SE_Array_ListURL.push("https://onedrive.live.com/?id=root&cid=762022B88C2D57C7");
	
	localStorage.setItem("DL_Content_URL_"+SE_CreateItem_categoryTitle, JSON.stringify(SE_Array_ListURL));
	
	SE_CreateItem_categoryTitle = "Quick Lookup";
	
	document.getElementById("OB_TransferOldLinks_Processing").innerHTML = "Processing: "+SE_CreateItem_categoryTitle;
	
	SE_Array_Category_Index.push(SE_CreateItem_categoryTitle); //Add the typed item to the array
	console.log(SE_Array_Category_Index); //Debug
	localStorage.setItem(key_Index_Category, JSON.stringify(SE_Array_Category_Index)); //Saves the updated array to local storage
	
	// Creates the category content key for the created category //
	SE_Array_ListText = []; 
	SE_Array_ListText.push("fillerText");
	SE_Array_ListText.push("Google");
	SE_Array_ListText.push("Mirriam-Webster Dictionary");
	SE_Array_ListText.push("Scribbr");
	SE_Array_ListText.push("APA Generator");
	
	localStorage.setItem("DL_Content_"+SE_CreateItem_categoryTitle, JSON.stringify(SE_Array_ListText));
	
	SE_Array_ListURL = [];
	SE_Array_ListURL.push("fillerURL");
	SE_Array_ListURL.push("https://google.com");
	SE_Array_ListURL.push("https://www.merriam-webster.com/");
	SE_Array_ListURL.push("https://scribbr.com");
	SE_Array_ListURL.push("https://www.scribbr.com/apa-citation-generator/new/webpage/");
	
	localStorage.setItem("DL_Content_URL_"+SE_CreateItem_categoryTitle, JSON.stringify(SE_Array_ListURL));
	
	SE_CreateItem_categoryTitle = "Other Links - Social Media";
	
	document.getElementById("OB_TransferOldLinks_Processing").innerHTML = "Processing: "+SE_CreateItem_categoryTitle;
	
	SE_Array_Category_Index.push(SE_CreateItem_categoryTitle); //Add the typed item to the array
	console.log(SE_Array_Category_Index); //Debug
	localStorage.setItem(key_Index_Category, JSON.stringify(SE_Array_Category_Index)); //Saves the updated array to local storage
	
	// Creates the category content key for the created category //
	SE_Array_ListText = []; 
	SE_Array_ListText.push("fillerText");
	SE_Array_ListText.push("Facebook Main");
	SE_Array_ListText.push("CH Postal");
	SE_Array_ListText.push("Catsu Playing");
	SE_Array_ListText.push("Dvotion Arise ESports");
	SE_Array_ListText.push("Instagram");
	
	localStorage.setItem("DL_Content_"+SE_CreateItem_categoryTitle, JSON.stringify(SE_Array_ListText));
	
	SE_Array_ListURL = [];
	SE_Array_ListURL.push("fillerURL");
	SE_Array_ListURL.push("https://facebook.com");
	SE_Array_ListURL.push("https://business.facebook.com/latest/home?asset_id=108151328236303&nav_ref=redirect_biz_inbox");
	SE_Array_ListURL.push("https://business.facebook.com/latest/home?asset_id=102129284959102&nav_ref=redirect_biz_inbox");
	SE_Array_ListURL.push("https://business.facebook.com/latest/home?asset_id=111127297867359&nav_ref=redirect_biz_inbox");
	SE_Array_ListURL.push("https://www.instagram.com/");
	
	localStorage.setItem("DL_Content_URL_"+SE_CreateItem_categoryTitle, JSON.stringify(SE_Array_ListURL));
	
	SE_CreateItem_categoryTitle = "Other Links - Miscellaneous";
	
	document.getElementById("OB_TransferOldLinks_Processing").innerHTML = "Processing: "+SE_CreateItem_categoryTitle;
	
	SE_Array_Category_Index.push(SE_CreateItem_categoryTitle); //Add the typed item to the array
	console.log(SE_Array_Category_Index); //Debug
	localStorage.setItem(key_Index_Category, JSON.stringify(SE_Array_Category_Index)); //Saves the updated array to local storage
	
	// Creates the category content key for the created category //
	SE_Array_ListText = []; 
	SE_Array_ListText.push("fillerText");
	SE_Array_ListText.push("levelingsolo.com");
	
	localStorage.setItem("DL_Content_"+SE_CreateItem_categoryTitle, JSON.stringify(SE_Array_ListText));
	
	SE_Array_ListURL = [];
	SE_Array_ListURL.push("fillerURL");
	SE_Array_ListURL.push("https://levelingsolo.com/");
	
	
	localStorage.setItem("DL_Content_URL_"+SE_CreateItem_categoryTitle, JSON.stringify(SE_Array_ListURL));
	
	setTimeout(changePagesForward("opacitateToLeft"), 5000);
	
	
	
	
	
	
	
	
	
	/*//12.5 per category
		Onboarding_TransferOldLinks_Category++;
		switch (Onboarding_TransferOldLinks_Category){
		case 1: //Favorites
		SE_CreateItem_categoryTitle = "Favorites";
		
		document.getElementById("OB_TransferOldLinks_Processing").innerHTML = "Processing: "+SE_CreateItem_categoryTitle;
		
		SE_Array_Category_Index.push(SE_CreateItem_categoryTitle); //Add the typed item to the array
		console.log(SE_Array_Category_Index); //Debug
		localStorage.setItem(key_Index_Category, JSON.stringify(SE_Array_Category_Index)); //Saves the updated array to local storage
		
		// Creates the category content key for the created category //
		SE_Array_ListText = []; 
		SE_Array_ListText.push("fillerText");
		SE_Array_ListText.push("G12 Notebook");
		SE_Array_ListText.push("LMS Dashboard");
		SE_Array_ListText.push("Microsoft To do");
		SE_Array_ListText.push("Student Mail");
		localStorage.setItem("DL_Content_"+SE_CreateItem_categoryTitle, JSON.stringify(SE_Array_ListText));
		
		SE_Array_ListURL = [];
		SE_Array_ListURL.push("fillerURL");
		SE_Array_ListURL.push("https://1drv.ms/u/s!AtZoHXAgGdYSjWahqqo8L0g8IPiw?e=advU5E");
		SE_Array_ListURL.push("https://mapsaantipolo.net/e/student/dashboard");
		SE_Array_ListURL.push("https://todo.microsoft.com/tasks/");
		SE_Array_ListURL.push("https://mail.google.com/mail/u/4/#inbox");
		localStorage.setItem("DL_Content_URL_"+SE_CreateItem_categoryTitle, JSON.stringify(SE_Array_ListURL));
		
		OB_TransferOldLinks_Progress = OB_TransferOldLinks_Progress+12.5;
		document.getElementById("OB_TransferOldLinks_PercentageDone").innerHTML = "Percent done: "+OB_TransferOldLinks_Progress;
		//setTimeout(Onboarding_TransferOldLinks(), Math.floor(Math.random() * 500));
		Onboarding_TransferOldLinks_Category++;
		Onboarding_TransferOldLinks();
		break;
		case 2: //MAPSA LMS
		SE_CreateItem_categoryTitle = "MAPSA LMS";
		
		document.getElementById("OB_TransferOldLinks_Processing").innerHTML = "Processing: "+SE_CreateItem_categoryTitle;
		
		SE_Array_Category_Index.push(SE_CreateItem_categoryTitle); //Add the typed item to the array
		console.log(SE_Array_Category_Index); //Debug
		localStorage.setItem(key_Index_Category, JSON.stringify(SE_Array_Category_Index)); //Saves the updated array to local storage
		
		// Creates the category content key for the created category //
		SE_Array_ListText = []; 
		SE_Array_ListText.push("fillerText");
		SE_Array_ListText.push("Student Dashboard");
		localStorage.setItem("DL_Content_"+SE_CreateItem_categoryTitle, JSON.stringify(SE_Array_ListText));
		
		SE_Array_ListURL = [];
		SE_Array_ListURL.push("fillerURL");
		SE_Array_ListURL.push("https://mapsaantipolo.net/e/student/dashboard");
		localStorage.setItem("DL_Content_URL_"+SE_CreateItem_categoryTitle, JSON.stringify(SE_Array_ListURL));
		
		OB_TransferOldLinks_Progress = OB_TransferOldLinks_Progress+12.5;
		document.getElementById("OB_TransferOldLinks_PercentageDone").innerHTML = "Percent done: "+OB_TransferOldLinks_Progress;
		//setTimeout(Onboarding_TransferOldLinks(), Math.floor(Math.random() * 500));
		Onboarding_TransferOldLinks_Category++
		Onboarding_TransferOldLinks();
		break;
		
	}*/
	
	
	
}
var OBN_Page = 1;
var OBN_Pages_Total = 10;
function OBN_Begin(){
	document.getElementById("pageElement_Onboarding_New").style.display = "block";
	for (var count = 1; count < OBN_Pages_Total; count++){
		document.getElementById("OBN_Page_"+count).style.display = "none";
	}
	for (var count = 1; count < OBN_Pages_Total; count++){
		document.getElementById("OBN_Graphic_"+count).style.display = "none";
	}
	document.getElementById("OBN_Page_1").style.display = "block";
	document.getElementById("OBN_Graphic_1").style.display = "block";
	document.getElementById("OBN_ButtonSet_1").style.display = "grid";
	document.getElementById("OBN_ButtonSet_2").style.display = "none";
}

function OBN_Switch_Page(OBN_PageDirection){
	if (OBN_PageDirection == "forward"){
		OBN_Page++;
		for (var count = 1; count < OBN_Pages_Total; count++){
			document.getElementById("OBN_Page_"+count).style.display = "none";
		}
		var OBN_CurrentPage = document.getElementById("OBN_Page_"+OBN_Page);
		OBN_CurrentPage.style.display = "block";
		OBN_CurrentPage.style.animationName = "OBN_Animation_Forward";
		OBN_CurrentPage.style.animationDuration = "0.5s";
		OBN_CurrentPage.style.animationFillMode = "forwards";
		for (var count = 1; count < OBN_Pages_Total; count++){
			document.getElementById("OBN_Graphic_"+count).style.display = "none";
		}
		var OBN_CurrentPage_Graphic = document.getElementById("OBN_Graphic_"+OBN_Page);
		OBN_CurrentPage_Graphic.style.display = "block";
		OBN_CurrentPage_Graphic.style.animationName = "OBN_Animation_Forward";
		OBN_CurrentPage_Graphic.style.animationDuration = "0.5s";
		OBN_CurrentPage_Graphic.style.animationFillMode = "forwards";
	}
	if (OBN_PageDirection == "backward"){
		OBN_Page--;
		for (var count = 1; count < OBN_Pages_Total; count++){
			document.getElementById("OBN_Page_"+count).style.display = "none";
		}
		var OBN_CurrentPage = document.getElementById("OBN_Page_"+OBN_Page);
		OBN_CurrentPage.style.display = "block";
		OBN_CurrentPage.style.animationName = "OBN_Animation_Backward";
		OBN_CurrentPage.style.animationDuration = "0.5s";
		OBN_CurrentPage.style.animationFillMode = "forwards";
		for (var count = 1; count < OBN_Pages_Total; count++){
			document.getElementById("OBN_Graphic_"+count).style.display = "none";
		}
		var OBN_CurrentPage_Graphic = document.getElementById("OBN_Graphic_"+OBN_Page);
		OBN_CurrentPage_Graphic.style.display = "block";
		OBN_CurrentPage_Graphic.style.animationName = "OBN_Animation_Backward";
		OBN_CurrentPage_Graphic.style.animationDuration = "0.5s";
		OBN_CurrentPage_Graphic.style.animationFillMode = "forwards";
	}
	if (OBN_Page == 1){
		document.getElementById("OBN_ButtonSet_1").style.display = "grid";
		document.getElementById("OBN_ButtonSet_2").style.display = "none";
		} else {
		document.getElementById("OBN_ButtonSet_1").style.display = "none";
		document.getElementById("OBN_ButtonSet_2").style.display = "grid";
	}
	console.log("Page changed to page "+OBN_Page);
}

// EXPERIMENT //
function trigger_Open_ExperimentSelector(){
	document.getElementById("pageElement_ExperimentSelector").style.display = "block";
}

function trigger_Close_ExperimentSelector(){
	document.getElementById("pageElement_ExperimentSelector").style.display = "none";
}

// EXPERIMENT - LAUNCH ALL CATEGORY LINKS
var launchCategory_CategoryName = "ELMS Assignment Tabs";
function trigger_launchCategory_Confirmation(id){
	launchCategory_CategoryName = SE_Array_Category_Index[id.substr(17)];
	open_Subwindow("Confirmation_LaunchAllLinks");
	document.getElementById("pageElement_Confirmation_Category_Launch_Text").innerHTML = "You are about to launch all shortcuts of the category "+launchCategory_CategoryName+".";
}
function trigger_launchAllTabs(){
	// trigger_createToast("LaunchCategory_Before");
	var launchCategory_ShortcutCount = Object.keys(JSON.parse(localStorage.getItem("DL_Content_URL_"+launchCategory_CategoryName))).length;
	var launchCategory_ShortcutData = Object.values(JSON.parse(localStorage.getItem("DL_Content_URL_"+launchCategory_CategoryName)));
	
	for (a = 1; a != launchCategory_ShortcutCount; a++){
		window.open(launchCategory_ShortcutData[a], "_blank");
		console.log("Launched link: "+launchCategory_ShortcutData[a]);
	}
	close_Subwindow("Confirmation_LaunchAllLinks");
	close_Subwindow("Category_Launcher");
	// trigger_createToast("LaunchCategory_After");
}

// EXPERIMENT - LIBRARY PROFILE SYSTEM //
let placeholderProfileArray = ["Default1", "Account 1", "Account 2", "Account 3"];
let placeholderProfileArray_Image = ["default1.png", "account_1.png", "account_2.png", "account_3.png"];
localStorage.setItem("DL_Profiles", JSON.stringify(placeholderProfileArray));
localStorage.setItem("DL_Profiles_Images", JSON.stringify(placeholderProfileArray_Image));

var key_Index_Profiles = "DL_Profiles";
var key_Index_Profiles_Images = "DL_Profiles_Images";
let PS_Array_ProfileArray = [];
let PS_Array_ProfileImageArray = [];
function generate_ProfileSelector(){
	var PS_Profile_Count = Object.keys(JSON.parse(localStorage.getItem(key_Index_Profiles))).length; 
	var PS_Profile_Data = Object.values(JSON.parse(localStorage.getItem(key_Index_Profiles)));
	for (a = 0; a != PS_Profile_Count; a++){
		PS_Array_ProfileArray.push(PS_Profile_Data[a]);
	} 
	
	var PS_ProfileImage_Count = Object.keys(JSON.parse(localStorage.getItem(key_Index_Profiles_Images))).length; 
	var PS_ProfileImage_Data = Object.values(JSON.parse(localStorage.getItem(key_Index_Profiles_Images)));
	for (b = 0; b != PS_ProfileImage_Count; b++){
		PS_Array_ProfileImageArray.push(PS_ProfileImage_Data[b]);
	} 
	
	for (c = 0; c != PS_Profile_Count; c++){
		var PS_Element_Div = document.createElement('div'); //Creates a div element
		PS_Element_Div.setAttribute("id", "ProfileSelector_Profile_"+c); //Adds an id to attach the text
		PS_Element_Div.setAttribute("onclick", "Login_ProfileChosen(this.id)");
		PS_Element_Div.classList.add("ProfileSelector_Profiles_Item");
		document.getElementById("pageElement_ProfileSelector_ProfilesDiv").appendChild(PS_Element_Div); //Attaches the a element to the page navi element
		
		var PS_Element_Img = document.createElement('img'); //Creates a div element
		PS_Element_Img.classList.add("ProfileSelector_Profiles_Item_Picture");
		PS_Element_Img.setAttribute("src", "Assets/Profile_Pictures/"+PS_Array_ProfileImageArray[c]);
		document.getElementById("ProfileSelector_Profile_"+c).appendChild(PS_Element_Img); //Attaches the a element to the page navi element
		
		var PS_Element_Name = document.createElement('h5'); //Creates a div element
		PS_Element_Name.classList.add("ProfileSelector_Profiles_Item_Name");
		PS_Element_Name.innerHTML = PS_Array_ProfileArray[c];
		document.getElementById("ProfileSelector_Profile_"+c).appendChild(PS_Element_Name); //Attaches the a element to the page navi element
	} 
}

// TASKER //
function changePage_Tasker(){
	window.location.href = "DL_ReminderAndTodoList.html";
}

var TDL_TabName = "Unfinished";
var TDL_PageRefreshed = "yes";

var key_TDL_ProfileSelected = "Default1"; //Will be changed once profile support is implemented
var key_TDL_UnfinishedList = "TDL_List_Unfinished_"; //Add key_TDL_ProfileSelected at the end to pertain to that specific list
var key_TDL_UnfinishedList_Profile = key_TDL_UnfinishedList + key_TDL_ProfileSelected;

var key_TDL_FinishedList = "TDL_List_Finished_";
var key_TDL_FinishedList_Profile = key_TDL_FinishedList + key_TDL_ProfileSelected;

const TDL_Array_UnfinishedList = [];
const TDL_Array_FinishedList = [];

var TDL_UnfinishedList = localStorage.getItem(key_TDL_UnfinishedList_Profile);
var TDL_FinishedList = localStorage.getItem(key_TDL_FinishedList_Profile);
function TDL_Load_Tasks_Todo(){
	console.log("Loading Todo List - Unfinished (To-do section)");
	
	if (TDL_UnfinishedList){ //Object exists
		var key_TDL_UnfinishedList_Length = Object.keys(JSON.parse(localStorage.getItem(key_TDL_UnfinishedList_Profile))).length; //Gets the length of the selected key
		var key_TDL_UnfinishedList_Data = Object.values(JSON.parse(localStorage.getItem(key_TDL_UnfinishedList_Profile)));//Gets the data from selected key and temporarily stores it into variable
		for (a = 0; a != key_TDL_UnfinishedList_Length; a++){
			TDL_Array_UnfinishedList.push(key_TDL_UnfinishedList_Data[a]); //Transfers all data from variable into category array
		} 
		console.log("key_TDL_UnfinishedList exists, storing data to TDL_Array_UnfinishedList");
		TDL_Generate_UnfinishedTasks();
		} else { //Selected item does not exist
		TDL_Array_UnfinishedList.push("List_"+key_TDL_ProfileSelected); //Adds the item "link" to the category array 
		localStorage.setItem(key_TDL_UnfinishedList_Profile, JSON.stringify(TDL_Array_UnfinishedList)); //Saves the category array into the selected key
		//window.location.href = "DL_ReminderAndTodoList.html";
		//location.reload();
		console.log("key_TDL_UnfinishedList doesn't exist. Creating filler data."); //Debug
	}
	console.log("Loading Todo List - Finished (Finished section)");
	
	if (TDL_FinishedList){ //Object exists
		var key_TDL_FinishedList_Length = Object.keys(JSON.parse(localStorage.getItem(key_TDL_FinishedList_Profile))).length; //Gets the length of the selected key
		var key_TDL_FinishedList_Data = Object.values(JSON.parse(localStorage.getItem(key_TDL_FinishedList_Profile)));//Gets the data from selected key and temporarily stores it into variable
		for (a = 0; a != key_TDL_FinishedList_Length; a++){
			TDL_Array_FinishedList.push(key_TDL_FinishedList_Data[a]); //Transfers all data from variable into category array
		} 
		console.log("key_TDL_FinishedList exists, storing data to TDL_Array_FinishedList");
		//TDL_Generate_UnfinishedTasks();
		} else { //Selected item does not exist		
		TDL_Array_FinishedList.push("List_"+key_TDL_ProfileSelected);
		localStorage.setItem(key_TDL_FinishedList_Profile, JSON.stringify(TDL_Array_FinishedList));
		//window.location.href = "DL_ReminderAndTodoList.html";
		//location.reload();
		console.log("key_TDL_UnfinishedList doesn't exist. Creating filler data."); //Debug
	}
}

function TDL_AddTask(){
	var TDL_InfoSource_TaskTitle = document.getElementById("TDL_InfoSource_TaskTitle").value;
	TDL_Array_UnfinishedList.push(TDL_InfoSource_TaskTitle);
	localStorage.setItem(key_TDL_UnfinishedList_Profile, JSON.stringify(TDL_Array_UnfinishedList));
	document.getElementById("TDL_InfoSource_TaskTitle").value = "";
	if(TDL_TabName == "Unfinished"){
		TDL_Refresh_List("Unfinished");
	}
	
}

function TDL_Generate_UnfinishedTasks(){
	var TDL_Generator_ItemCount_Whole = Object.keys(JSON.parse(localStorage.getItem(key_TDL_UnfinishedList_Profile))).length - 1;
	console.log("Generating ToDo list. Total item count minus the filler data is "+TDL_Generator_ItemCount_Whole);
	for (a = 0; a != TDL_Generator_ItemCount_Whole; a++){
		var b = a + 1;
		
		var itemDiv = document.createElement('div');
		itemDiv.classList.add("TDL_List_Item"); //Adds CSS to div
		itemDiv.setAttribute("id", "TDL_ListItem_Div_Unfinished_Item_"+b); //Adds id to div
		itemDiv.setAttribute("onclick", "TDL_MoveItem_ToFinished(this.id)");
		document.getElementById("pageElement_TDL_ListContainer").appendChild(itemDiv);
		
		var itemIndicator = document.createElement('img');
		itemIndicator.classList.add("TDL_List_Item_Indicator");
		itemIndicator.setAttribute("src", "Assets/Icons/TDL/TDL_Task_Indicator_Uncheck.png");
		document.getElementById("TDL_ListItem_Div_Unfinished_Item_"+b).appendChild(itemIndicator);
		
		var itemTitle = document.createElement('h4');
		itemTitle.classList.add("TDL_List_Item_Title");
		itemTitle.innerHTML = TDL_Array_UnfinishedList[b];
		document.getElementById("TDL_ListItem_Div_Unfinished_Item_"+b).appendChild(itemTitle);
		
		var itemEdit = document.createElement('img');
		itemEdit.classList.add("TDL_List_Item_Edit");
		itemEdit.setAttribute("src", "Assets/Icons/iconNew_edit.png");
		document.getElementById("TDL_ListItem_Div_Unfinished_Item_"+b).appendChild(itemEdit);
		
		var itemDelete = document.createElement('img');
		itemDelete.classList.add("TDL_List_Item_Delete");
		itemDelete.setAttribute("src", "Assets/Icons/iconNew_delete.png");
		document.getElementById("TDL_ListItem_Div_Unfinished_Item_"+b).appendChild(itemDelete);
	}
	TDL_StartAnimations_List();
}

function TDL_Generate_FinishedTasks(){
	var TDL_Generator_ItemCount_Whole = Object.keys(JSON.parse(localStorage.getItem(key_TDL_FinishedList_Profile))).length - 1;
	console.log("Generating ToDo list. Total item count minus the filler data is "+TDL_Generator_ItemCount_Whole);
	for (a = 0; a != TDL_Generator_ItemCount_Whole; a++){
		var b = a + 1;
		
		var itemDiv = document.createElement('div');
		itemDiv.classList.add("TDL_List_Item"); //Adds CSS to div
		itemDiv.setAttribute("id", "TDL_ListItem_Div_Finished_Item_"+b); //Adds id to div
		itemDiv.setAttribute("onclick", "TDL_MoveItem_ToUnfinished(this.id)");
		document.getElementById("pageElement_TDL_ListContainer").appendChild(itemDiv);
		
		var itemIndicator = document.createElement('img');
		itemIndicator.classList.add("TDL_List_Item_Indicator");
		itemIndicator.setAttribute("src", "Assets/Icons/TDL/TDL_Task_Indicator_Check.png");
		document.getElementById("TDL_ListItem_Div_Finished_Item_"+b).appendChild(itemIndicator);
		
		var itemTitle = document.createElement('h4');
		itemTitle.classList.add("TDL_List_Item_Title");
		itemTitle.innerHTML = TDL_Array_FinishedList[b];
		document.getElementById("TDL_ListItem_Div_Finished_Item_"+b).appendChild(itemTitle);
		
		var itemEdit = document.createElement('img');
		itemEdit.classList.add("TDL_List_Item_Edit");
		itemEdit.setAttribute("src", "Assets/Icons/iconNew_edit.png");
		document.getElementById("TDL_ListItem_Div_Finished_Item_"+b).appendChild(itemEdit);
		
		var itemDelete = document.createElement('img');
		itemDelete.classList.add("TDL_List_Item_Delete");
		itemDelete.setAttribute("src", "Assets/Icons/iconNew_delete.png");
		itemDelete.setAttribute("onclick", "TDL_DeleteItem_Finished(parentNode.id)");
		document.getElementById("TDL_ListItem_Div_Finished_Item_"+b).appendChild(itemDelete);
	}
	TDL_StartAnimations_List();
}


function TDL_Refresh_List(listType){
	var listContainer = document.getElementById("pageElement_TDL_ListContainer");
	listContainer.parentNode.removeChild(listContainer);
	
	var listContainerDiv = document.createElement('div'); //Creates the container div element
	listContainerDiv.setAttribute("id", "pageElement_TDL_ListContainer"); //Adds id to div
	document.getElementById("pageElement_TDL_MainContainer").appendChild(listContainerDiv);	
	
	if(listType == "Unfinished"){
		TDL_Generate_UnfinishedTasks();
		} else {
		TDL_Generate_FinishedTasks();
	}
	TDL_Refresh_ListProgress();
}

function TDL_StartAnimations_List(){
	var TDL_List_Item = document.querySelectorAll(".TDL_List_Item");
	if (TDL_PageRefreshed == "yes"){
		for (var a = 0; a < TDL_List_Item.length; a++) {
			var TDL_List_Item_Select = TDL_List_Item[a];
			TDL_List_Item_Select.style.opacity = "0%";
			TDL_List_Item_Select.style.display = "block";
			TDL_List_Item_Select.style.animationName = "opening_TDL_ListItem";
			TDL_List_Item_Select.style.animationDuration = "0.5s";
			var delay2 = 0.1 + a / 20;
			
			TDL_List_Item_Select.style.animationDelay = delay2 + "s";
			TDL_List_Item_Select.style.animationFillMode = "forwards";
		}
	}
	TDL_PageRefreshed = "no";
	TDL_Refresh_ListProgress();
}

function TDL_SwitchTab(ID){
	switch(ID){
		case 'select_ToDo':
		TDL_TabName = "Unfinished";
		TDL_Refresh_List('Unfinished');	
		break;
		case 'select_Finished':
		TDL_TabName = "Finished";
		TDL_Refresh_List('Finished');
		break;
	}
}

function TDL_MoveItem_ToFinished(ItemID){
	var ArrayItem = ItemID.substr(33);
	console.log(ArrayItem+", "+TDL_Array_UnfinishedList[ArrayItem]); //Debug
	
	TDL_Array_FinishedList.push(TDL_Array_UnfinishedList[ArrayItem]);
	localStorage.setItem(key_TDL_FinishedList_Profile, JSON.stringify(TDL_Array_FinishedList));
	
	TDL_Array_UnfinishedList.splice(ArrayItem, 1);
	localStorage.setItem(key_TDL_UnfinishedList_Profile, JSON.stringify(TDL_Array_UnfinishedList));
	
	var x = document.getElementById(ItemID);
	x.style.animationName = "TDL_Swipe_ToRight";
	x.style.animationDuration = "0.3s";
	x.addEventListener("animationend",function(){
		var x = document.getElementById(ItemID);
		x.parentNode.removeChild(x);
		if(TDL_TabName == "Unfinished"){
			TDL_Refresh_List("Unfinished");
		}
	}
	);
	
	
	
}

function TDL_MoveItem_ToUnfinished(ItemID){
	var ArrayItem = ItemID.substr(31);
	console.log(ArrayItem+", "+TDL_Array_FinishedList[ArrayItem]); //Debug
	
	TDL_Array_UnfinishedList.push(TDL_Array_FinishedList[ArrayItem]);
	localStorage.setItem(key_TDL_UnfinishedList_Profile, JSON.stringify(TDL_Array_UnfinishedList));
	
	TDL_Array_FinishedList.splice(ArrayItem, 1);
	localStorage.setItem(key_TDL_FinishedList_Profile, JSON.stringify(TDL_Array_FinishedList));
	
	var x = document.getElementById(ItemID);
	x.style.animationName = "TDL_Swipe_ToLeft";
	x.style.animationDuration = "0.3s";
	x.addEventListener("animationend",function(){
		var x = document.getElementById(ItemID);
		x.parentNode.removeChild(x);
		if(TDL_TabName == "Finished"){
			TDL_Refresh_List("Finished");
		}
	}
	);
}

function TDL_Refresh_ListProgress(){
	var TDL_ArrayLength_Unfinished = TDL_Array_UnfinishedList.length - 1;
	var TDL_ArrayLength_Finished = TDL_Array_FinishedList.length - 1;
	var TDL_ListOverallLength = TDL_ArrayLength_Unfinished + TDL_ArrayLength_Finished;
	
	var TDL_ListProgress_Percentage = Math.round((100 * TDL_ArrayLength_Finished) / TDL_ListOverallLength);
	
	console.log("Unfinished: "+TDL_Array_UnfinishedList);
	console.log("Finished: "+TDL_Array_FinishedList);
	
	document.getElementById("pageElement_TDL_ListProgress").innerHTML = "Tasks: " + TDL_ArrayLength_Finished + " / " + TDL_ListOverallLength + ", ("+TDL_ListProgress_Percentage+"% done)";
	document.getElementById("pageElement_TDL_ListProgress_Bar").style.width = TDL_ListProgress_Percentage+"%";
}

function TDL_DeleteItem_Finished(id){
	console.log(id);
}

/* Profile Selector and Login Screen */
function open_ProfileSelector(){
	document.getElementById("pageElement_ProfileSelector").style.display = "grid";
}



function Login_ProfileChosen(accountNumber){
	var IDNumber = accountNumber.substr(19, 0);
	console.log(IDNumber);
	document.getElementById("pageElement_Login_Name").innerHTML = PS_Array_ProfileArray[IDNumber];
	document.getElementById("pageElement_Login_Image").src = "Assets/ProfilePictures/"+PS_Array_ProfileImageArray[IDNumber];
	document.getElementById("pageElement_LoginScreen").style.display = "grid";
}




function generate_year_range(start, end) {
    var years = "";
    for (var year = start; year <= end; year++) {
        years += "<option value='" + year + "'>" + year + "</option>";
	}
    return years;
}

today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");


createYear = generate_year_range(1970, 2050);
/** or
	* createYear = generate_year_range( 1970, currentYear );
*/

//document.getElementById("year").innerHTML = createYear;

// var calendar = document.getElementById("calendar");
// var lang = calendar.getAttribute('data-lang');

// var months = "";
// var days = "";

// var monthDefault = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// var dayDefault = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// if (lang == "en") {
// months = monthDefault;
// days = dayDefault;
// } else if (lang == "id") {
// months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
// days = ["Ming", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
// } else if (lang == "fr") {
// months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
// days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
// } else {
// months = monthDefault;
// days = dayDefault;
// }


// var $dataHead = "<tr>";
// for (dhead in days) {
// $dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
// }
// $dataHead += "</tr>";

//alert($dataHead);
// document.getElementById("thead-month").innerHTML = $dataHead;


// monthAndYear = document.getElementById("monthAndYear");
// showCalendar(currentMonth, currentYear);



function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
	
    var firstDay = ( new Date( year, month ) ).getDay();
	
    tbl = document.getElementById("calendar-body");
	
    
    tbl.innerHTML = "";
	
    
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;
	
    // creating all cells
    var date = 1;
    for ( var i = 0; i < 6; i++ ) {
        
        var row = document.createElement("tr");
		
        
        for ( var j = 0; j < 7; j++ ) {
            if ( i === 0 && j < firstDay ) {
                cell = document.createElement( "td" );
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
				} else if (date > daysInMonth(month, year)) {
                break;
				} else {
                cell = document.createElement("td");
                cell.setAttribute("data-date", date);
                cell.setAttribute("data-month", month + 1);
                cell.setAttribute("data-year", year);
                cell.setAttribute("data-month_name", months[month]);
                cell.className = "date-picker";
                cell.innerHTML = "<span>" + date + "</span>";
				
                if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
                    cell.className = "date-picker selected";
				}
                row.appendChild(cell);
                date++;
			}
			
			
		}
		
        tbl.appendChild(row);
	}
	
}

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}


