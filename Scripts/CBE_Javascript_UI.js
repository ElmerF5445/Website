/*
	UI
*/
var path = window.location.pathname;
var UI_PageName = path.split("/").pop();
var UI_PageTitle;
var UI_PageSuffix= "Content By ElmerF";
function Load_PageTitle(){
  switch(UI_PageName){
    case "CBE_Reviewers.html":
      UI_PageTitle = "Reviewers";
      break;
      case "CBE_Reviewers_Grade10.html":
        UI_PageTitle = "Grade 10 Reviewer";
        break;
      case "CBE_Reviewers_Grade11.html":
        UI_PageTitle = "Grade 11 Reviewer";
        break;
      case "CBE_Reviewers_Grade12.html":
        UI_PageTitle = "Grade 12 Reviewer";
        break;
      case "CBE_Socials.html":
        UI_PageTitle = "Socials";
        break;
      case "CBE_Projects.html":
        UI_PageTitle = "Projects";
        break;
  }
  if (document.getElementById("pageElement_Title") && UI_PageTitle != undefined){
    document.getElementById("pageElement_Title").innerHTML = UI_PageTitle + " | " + UI_PageSuffix;
  }
}

var Page_Property = {};

function Load_Properties(){
  var Page = document.getElementsByTagName('body');
  Page_Property = {
    "UI_Overlay": Element_Attribute_Get('pageElement_Body', 'UI_Overlay'),
    "Color_Profile": Element_Attribute_Get('pageElement_Body', 'Color_Profile'),
    "Header_AltPage_Title": Element_Attribute_Get('pageElement_Body', 'Header_AltPage_Title'),
    "Header_AltPage_URL": Element_Attribute_Get('pageElement_Body', 'Header_AltPage_URL'),
    "CopyLink_HasAltLink":  Element_Attribute_Get('pageElement_Body', 'CopyLink_HasAltLink')
  }
  if (Page_Property.UI_Overlay != null){
    Load_Template(Page_Property.UI_Overlay);
  }
  if (Page_Property.Color_Profile != null){
    Load_ColorProfile(Page_Property.Color_Profile);
  } else {
    Load_ColorProfile("Violet");
  }
  
}

function Load_Template(templateId) {
  fetch("CBE_Template_UIOverlay.html")
    .then((response) => response.text())
    .then((template) => {
      const templateElement = document.createElement("div");
      templateElement.innerHTML = template;
      const templateContent = templateElement
        .querySelector(`#${templateId}`)
        .content.cloneNode(true);
      const bodyElement = document.getElementById("pageElement_Body");
      bodyElement.appendChild(templateContent);
      setTimeout(Load_Overlay_Properties, 200);
    })
    .catch((error) => console.log(error));
  Load_PageTitle();
}

function Load_Overlay_Properties(){
  if (Page_Property.Header_AltPage_Title != null){
    document.getElementById('UI_Header_AltPage_Title').innerHTML = Page_Property.Header_AltPage_Title;
    if (Page_Property.Header_AltPage_URL != null){
      if (Page_Property.Header_AltPage_URL == "Top") {
        Element_Attribute_Remove('UI_Header_AltPage_URL', 'href');
        Element_Attribute_Set('UI_Header_AltPage_URL', 'onclick', "Scroll_ToPosition('top')");
      } else {
        Element_Attribute_Set('UI_Header_AltPage_URL', 'href', Page_Property.Header_AltPage_URL);
      }
    } else {
      Element_Attribute_Remove('UI_Header_AltPage_URL', 'href');
      Element_Attribute_Set('UI_Header_AltPage_URL', 'onclick', "Scroll_ToPosition('top')");
    }
  }
}


function toggle_Sidebar() {
  var UI_Sidebar_State = document.getElementById("pageElement_Sidebar").getAttribute("State");
  if (UI_Sidebar_State == "Collapsed") {
    document.getElementById("pageElement_Sidebar").setAttribute("State", "Expanded");
    document.getElementById("pageElement_Curtain").setAttribute("State", "Expanded");
  } else {
    document.getElementById("pageElement_Sidebar").setAttribute("State", "Collapsed");
    document.getElementById("pageElement_Curtain").setAttribute("State", "Collapsed");
  }
}

function copyURLLink() {
  // Get the current URL
  const currentUrl = window.location.href;

  // Create a temporary input element to hold the URL
  const tempInput = document.createElement("input");

  // Set the input value to the current URL
  tempInput.value = currentUrl;

  // Append the input element to the DOM
  document.body.appendChild(tempInput);

  // Select the input element's contents
  tempInput.select();

  // Copy the selected contents to the clipboard
  document.execCommand("copy");

  // Remove the input element from the DOM
  document.body.removeChild(tempInput);

  toast_Popup_Animate("Header_Toast_Share_Link");
}

function toast_Popup_Animate(toast_ID){
  var toast_Element = document.getElementById(toast_ID);
  toast_Element.style.animationName = "toast_Popup_Open";
	toast_Element.style.animationDuration = "0.3s";
	toast_Element.style.animationFillMode = "forwards";
  setTimeout( function() {
    toast_Element.style.animationName = "toast_Popup_Close";
    toast_Element.style.animationDuration = "0.3s";
    toast_Element.style.animationFillMode = "forwards";
  }, 3000);
}

function Subwindows_Open(ID){
  document.getElementById("pageElement_Subwindows").style.opacity = "100%";
  document.getElementById("pageElement_Subwindows").style.display = "flex";
  document.getElementById("pageElement_Subwindows").style.opacity = "100%";
  var subwindowElement = document.getElementById("subwindow_"+ID);
  subwindowElement.style.display = "block";
  subwindowElement.style.animationFillMode = "forwards";
  subwindowElement.style.animationName = "opening_Subwindow";
  subwindowElement.style.animationDuration = "0.3s";
  subwindow_activeSubwindow = ID;
  if (ID == "ImageView"){
    subwindowElement.style.display = "grid";
  }
}

function Subwindows_Close(ID){
  var subwindowElement = document.getElementById("subwindow_" + ID);
  subwindowElement.style.animationName = "closing_Subwindow";
  subwindowElement.style.animationDuration = "0.3s";
  subwindowElement.style.animationFillMode = "forwards";

  setTimeout(function() {
    subwindowElement.style.opacity = "0";
  }, 0);

  setTimeout(function() {
    subwindowElement.style.display = "none";
    document.getElementById("pageElement_Subwindows").style.display = "none";
  }, 300);

  subwindow_activeSubwindow = "none";
}

function Scroll_ToPosition(direction) {
  if (direction == "bottom") {
    document
      .getElementById("pageElement_Body")
      .scrollTo(0, document.getElementById("pageElement_Body").scrollHeight);
  } else if (direction == "top") {
    document.getElementById("pageElement_Body").scrollTop = 0;
  }
}

var UI_ColorProfile;
var UI_ColorProfile_Preset_1 = ["url(../Assets/Backgrounds/Background_Noise_Landscape_LQ_1.png)", "#9600ff", "#460475", "#38035e", "#23023a", "#170127", "#0d0016"];
var UI_ColorProfile_Preset_2 = ["url(../Assets/Backgrounds/Background_Noise_Landscape_LQ_2.png)", "#00ff6c", "#018639", "#005c26", "#014b20", "#013517", "#01220f"];
var UI_ColorProfile_Preset_3 = ["url(../Assets/Backgrounds/Background_Noise_Landscape_LQ_5.png)", "#00d7ff", "#0188a0", "#037386", "#025766", "#01434e", "#00343d"];
var UI_ColorProfile_Preset_4 = ["url(../Assets/Backgrounds/Background_Noise_Landscape_LQ_4.png)", "#ff00d7", "#a7008e", "#850171", "#6d005d", "#58014b", "#3f0036"];
var UI_ColorProfile_Preset_5 = ["url(../Assets/Backgrounds/Background_Noise_Landscape_LQ_3.png)", "#fffc00", "#ad7600", "#996900", "#855b00", "#744f00", "#664600"];
var UI_ColorProfile_ToLoad = [];

var UI_ColorProfiles = {
  Violet: {
    L3 : "#c86cff",
    L2 : "#b435ff",
    L1 : "#a20fff",
    Base : "#9600ff",
    D1: "#7806c3",
    D2 : "#63079c",
    D3 : "#430076"
  },
  Green: {
    L3: "#aeffd0",
    L2: "#70ffae",
    L1: "#2bfd84",
    Base: "#00ff6c",
    D1: "#00c04d",
    D2: "#00963f",
    D3: "#067536"
  },
  Orange: {
    L3: "#ffd66d",
    L2: "#ffb832",
    L1: "#ffa00a",
    Base: "#ff8800",
    D1: "#cc6402",
    D2: "#a14d0b",
    D3: "#82410c"
  }
}

function Load_ColorProfile(UI_ColorProfile){
  var UI_Root = document.documentElement;
  UI_Root.style.setProperty('--Theme-Dynamic-Level-L3', UI_ColorProfiles[UI_ColorProfile].L3);
  UI_Root.style.setProperty('--Theme-Dynamic-Level-L2', UI_ColorProfiles[UI_ColorProfile].L2);
  UI_Root.style.setProperty('--Theme-Dynamic-Level-L1', UI_ColorProfiles[UI_ColorProfile].L1);
  UI_Root.style.setProperty('--Theme-Dynamic-Base', UI_ColorProfiles[UI_ColorProfile].Base);
  UI_Root.style.setProperty('--Theme-Dynamic-Level-D1', UI_ColorProfiles[UI_ColorProfile].D1);
  UI_Root.style.setProperty('--Theme-Dynamic-Level-D2', UI_ColorProfiles[UI_ColorProfile].D2);
  UI_Root.style.setProperty('--Theme-Dynamic-Level-D3', UI_ColorProfiles[UI_ColorProfile].D3);
  
  //var UI_DocumentBody = document.getElementById("pageElement_Body");
  //UI_ColorProfile = UI_DocumentBody.getAttribute('data-id');
  // if (UI_ColorProfile != null){
  //   switch (UI_ColorProfile){
  //     case "Purple":
  //       UI_ColorProfile_ToLoad = UI_ColorProfile_Preset_1;
  //       break;
  //       case "Green":
  //         UI_ColorProfile_ToLoad = UI_ColorProfile_Preset_2;
  //         break;
  //       case "Cyan":
  //         UI_ColorProfile_ToLoad = UI_ColorProfile_Preset_3;
  //         break;
  //       case "Pink":
  //         UI_ColorProfile_ToLoad = UI_ColorProfile_Preset_4;
  //         break;
  //       case "Orange":
  //         UI_ColorProfile_ToLoad = UI_ColorProfile_Preset_5;
  //         break;
  //   

    // UI_Root.style.setProperty('--ColorProfile-BGColor-Level1', UI_ColorProfile_ToLoad[2]);
    // UI_Root.style.setProperty('--ColorProfile-BGColor-Level2', UI_ColorProfile_ToLoad[3]);
    // UI_Root.style.setProperty('--ColorProfile-BGColor-Level3', UI_ColorProfile_ToLoad[4]);
    // UI_Root.style.setProperty('--ColorProfile-BGColor-Level4', UI_ColorProfile_ToLoad[5]);
    // UI_Root.style.setProperty('--ColorProfile-BGColor-Level5', UI_ColorProfile_ToLoad[6]);

    // UI_Root.style.setProperty('--ColorProfile-BGImage', UI_ColorProfile_ToLoad[0]);
    // UI_Root.style.setProperty('--ColorProfile-Text-Color', UI_ColorProfile_ToLoad[1]);
    // UI_Root.style.setProperty('--ColorProfile-BGColor-Level1', UI_ColorProfile_ToLoad[2]);
    // UI_Root.style.setProperty('--ColorProfile-BGColor-Level2', UI_ColorProfile_ToLoad[3]);
    // UI_Root.style.setProperty('--ColorProfile-BGColor-Level3', UI_ColorProfile_ToLoad[4]);
    // UI_Root.style.setProperty('--ColorProfile-BGColor-Level4', UI_ColorProfile_ToLoad[5]);
    // UI_Root.style.setProperty('--ColorProfile-BGColor-Level5', UI_ColorProfile_ToLoad[6]); 
}

/*function Load_TitleLayout(UI_TitleLayout){
  setTimeout(function(){
    if (UI_TitleLayout == "Subpage"){
        document.querySelectorAll(".Subpage_Text_ParentPage_Title")[0].style.fontSize = "30px";
        document.querySelectorAll(".Subpage_Text_CurrentPage_Title")[0].style.fontSize = "100px";
      }
    }
  , 1000);
}*/

document.addEventListener('DOMContentLoaded', function() {
  var Main_Content_Container = document.getElementById("pageElement_Body");
  Main_Content_Container.onscroll = function() {scrollFunction()};
  function scrollFunction() {
    var Header_Title = document.getElementById("UI_Header_Title");
    var Body = document.getElementById("pageElement_Body");
    if (Page_Property.Header_AltPage_Title != null){
      if (Main_Content_Container.scrollTop > 100) {
        Header_Title.setAttribute("ActiveTitle", "AltPage");
      } else {
        Header_Title.setAttribute("ActiveTitle", "Home");
      }
    } else {
      Header_Title.setAttribute("ActiveTitle", "Home");
    }
    
  }
});