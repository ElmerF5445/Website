/*
	UI
*/

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
    })
    .catch((error) => console.log(error));
}

var UI_Sidebar_isOpen = false;
function toggle_Sidebar() {
  var UI_Sidebar = document.getElementById("pageElement_Sidebar");
  if (UI_Sidebar_isOpen == false) {
    UI_Sidebar.style.transform = "translateX(0px)";
    UI_Sidebar_isOpen = true;
  } else {
    UI_Sidebar.style.transform = "translateX(-100%)";
    UI_Sidebar_isOpen = false;
  }
}

function scrollToPosition(direction) {
  if (direction == "bottom") {
    document
      .getElementById("pageElement_Content")
      .scrollTo(0, document.getElementById("pageElement_Content").scrollHeight);
  } else if (direction == "top") {
    document.getElementById("pageElement_Content").scrollTop = 0;
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

function scrollToPosition(direction){
	if (direction == "bottom"){
    console.log("Bottom");
		document.querySelectorAll("Main_Content_Container").scrollTo(0, document.getElementById("pageElement_Content").scrollHeight);
	} else if (direction == "top"){
    console.log("Top");
		document.querySelectorAll("Main_Content_Container").scrollTop = 0;
	}
}

var UI_ColorProfile;
var UI_ColorProfile_Preset_1 = ["url(../Assets/Backgrounds/Background_Noise_Landscape_1.png)", "#9600ff", "#460475", "#38035e", "#23023a", "#170127", "#0d0016"];
var UI_ColorProfile_Preset_2 = ["url(../Assets/Backgrounds/Background_Noise_Landscape_2.png)", "#00ff6c", "#018639", "#005c26", "#014b20", "#013517", "#01220f"];
var UI_ColorProfile_Preset_3 = ["url(../Assets/Backgrounds/Background_Noise_Landscape_5.png)", "#00d7ff", "#0188a0", "#037386", "#025766", "#01434e", "#00343d"];
var UI_ColorProfile_Preset_4 = ["url(../Assets/Backgrounds/Background_Noise_Landscape_4.png)", "#ff00d7", "#a7008e", "#850171", "#6d005d", "#58014b", "#3f0036"];
var UI_ColorProfile_Preset_5 = ["url(../Assets/Backgrounds/Background_Noise_Landscape_3.png)", "#fffc00", "#ad7600", "#996900", "#855b00", "#744f00", "#664600"];
var UI_ColorProfile_ToLoad = [];

function Load_ColorProfile(){
  var UI_DocumentBody = document.getElementById("pageElement_Body");
  UI_ColorProfile = UI_DocumentBody.getAttribute('data-id');
  if (UI_ColorProfile != null){
    switch (UI_ColorProfile){
      case "Preset_1":
        UI_ColorProfile_ToLoad = UI_ColorProfile_Preset_1;
        break;
        case "Preset_2":
          UI_ColorProfile_ToLoad = UI_ColorProfile_Preset_2;
          break;
        case "Preset_3":
          UI_ColorProfile_ToLoad = UI_ColorProfile_Preset_3;
          break;
        case "Preset_4":
          UI_ColorProfile_ToLoad = UI_ColorProfile_Preset_4;
          break;
        case "Preset_5":
          UI_ColorProfile_ToLoad = UI_ColorProfile_Preset_5;
          break;
    }
    var UI_Root = document.documentElement;
    UI_Root.style.setProperty('--ColorProfile-BGImage', UI_ColorProfile_ToLoad[0]);
    UI_Root.style.setProperty('--ColorProfile-Text-Color', UI_ColorProfile_ToLoad[1]);
    UI_Root.style.setProperty('--ColorProfile-BGColor-Level1', UI_ColorProfile_ToLoad[2]);
    UI_Root.style.setProperty('--ColorProfile-BGColor-Level2', UI_ColorProfile_ToLoad[3]);
    UI_Root.style.setProperty('--ColorProfile-BGColor-Level3', UI_ColorProfile_ToLoad[4]);
    UI_Root.style.setProperty('--ColorProfile-BGColor-Level4', UI_ColorProfile_ToLoad[5]);
    UI_Root.style.setProperty('--ColorProfile-BGColor-Level5', UI_ColorProfile_ToLoad[6]);
  }

  
}