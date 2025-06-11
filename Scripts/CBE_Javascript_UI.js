/*
	UI
*/
var App_Property = null;

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
    "CopyLink_HasAltLink":  Element_Attribute_Get('pageElement_Body', 'CopyLink_HasAltLink'),
    "BackToParent_HasParent": Element_Attribute_Get('pageElement_Body', 'BackToParent_HasParent'),
    "BackToParent_Parent_URL": Element_Attribute_Get('pageElement_Body', 'BackToParent_Parent_URL'),
    "BackToParent_Parent_Text": Element_Attribute_Get('pageElement_Body', 'BackToParent_Parent_Text')
  }
  if (Page_Property.UI_Overlay != null){
    Load_Template(Page_Property.UI_Overlay);
  }
  if (Page_Property.Color_Profile != null){
    Load_ColorProfile(Page_Property.Color_Profile);
  } else {
    Load_ColorProfile("Violet");
  }
  // if (Page_Property.BackToParent_HasParent != null && Page_Property.BackToParent_HasParent == "true"){
  //   Element_Get_ByID("UI_Header_BackToParent").setAttribute("onclick", `Page_ChangePage('${Page_Property.BackToParent_Parent_URL}', Transition)`)
  //   if (Page_Property.BackToParent_Parent_Text != null || Page_Property.BackToParent_Parent_Text != ""){
  //     Element_InnerHTML_Set("UI_Header_BackToParent_Text", `${Page_Property.BackToParent_Parent_Text}`)
  //   } else {
  //     Element_InnerHTML_Set("UI_Header_BackToParent_Text", `Back`)
  //   }
    
  // }
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
        Element_Attribute_Set('UI_Header_AltPage_URL', 'onclick', "Page_ChangePage('" + Page_Property.Header_AltPage_URL + "', Transition)");
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
    L5 : "#e2ffee",
    L4 : "#c7fadc",
    L3 : "#c86cff",
    L2 : "#b435ff",
    L1 : "#a20fff",
    Base : "#9600ff",
    D1: "#7806c3",
    D2 : "#63079c",
    D3 : "#430076",
    D4 : "#370061",
    D5 : "#2d0050"
  },
  Green: {
    L5: "#e2ffee",
    L4: "#c7fadc",
    L3: "#aeffd0",
    L2: "#70ffae",
    L1: "#2bfd84",
    Base: "#00ff6c",
    D1: "#00c04d",
    D2: "#00963f",
    D3: "#067536",
    D4: "#02642d",
    D5: "#014e23"
  },
  Orange: {
    L5: "#ffe49e",
    L4: "#ffdf8d",
    L3: "#ffd66d",
    L2: "#ffb832",
    L1: "#ffa00a",
    Base: "#ff8800",
    D1: "#cc6402",
    D2: "#a14d0b",
    D3: "#82410c",
    D4: "#442205",
    D5: "#613007"
  },
  Pink: {
    L5: "#fac3f2",
    L4: "#ffa7f2",
    L3: "#fa85e8",
    L2: "#ff6be9",
    L1: "#ff48e4",
    Base: "#ff00d7",
    D1: "#e000bf",
    D2: "#c200a5",
    D3: "#ad0193",
    D4: "#94017e",
    D5: "#70005f"
  }
}

function Load_ColorProfile(UI_ColorProfile){
  var UI_Root = document.documentElement;
  UI_Root.style.setProperty('--Theme-Dynamic-Level-L5', UI_ColorProfiles[UI_ColorProfile].L5);
  UI_Root.style.setProperty('--Theme-Dynamic-Level-L4', UI_ColorProfiles[UI_ColorProfile].L4);
  UI_Root.style.setProperty('--Theme-Dynamic-Level-L3', UI_ColorProfiles[UI_ColorProfile].L3);
  UI_Root.style.setProperty('--Theme-Dynamic-Level-L2', UI_ColorProfiles[UI_ColorProfile].L2);
  UI_Root.style.setProperty('--Theme-Dynamic-Level-L1', UI_ColorProfiles[UI_ColorProfile].L1);
  UI_Root.style.setProperty('--Theme-Dynamic-Base', UI_ColorProfiles[UI_ColorProfile].Base);
  UI_Root.style.setProperty('--Theme-Dynamic-Level-D1', UI_ColorProfiles[UI_ColorProfile].D1);
  UI_Root.style.setProperty('--Theme-Dynamic-Level-D2', UI_ColorProfiles[UI_ColorProfile].D2);
  UI_Root.style.setProperty('--Theme-Dynamic-Level-D3', UI_ColorProfiles[UI_ColorProfile].D3);
  UI_Root.style.setProperty('--Theme-Dynamic-Level-D4', UI_ColorProfiles[UI_ColorProfile].D4);
  UI_Root.style.setProperty('--Theme-Dynamic-Level-D5', UI_ColorProfiles[UI_ColorProfile].D5);
  UI_Root.style.setProperty('--Theme-Dynamic-Opacitated', UI_ColorProfiles[UI_ColorProfile].D3 + "ce");
  
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
  if (Main_Content_Container != null){
    Main_Content_Container.onscroll = function() {scrollFunction()};
    function scrollFunction() {
      var Header = document.getElementById("pageElement_Header");
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
      if (Main_Content_Container.scrollTop > 100) {
        Header.setAttribute("Color", "Fill");
      } else {
        Header.setAttribute("Color", "Transparent");
      }
    }
  }
  
});

document.addEventListener('DOMContentLoaded', function(){
  Image_Preview_Add();
})

function Image_Preview_Add(){
  var Items = document.getElementsByTagName("img");
  for (a = 0; a < Items.length; a++){
    var Item = Items[a];
    if (Item.getAttribute("NoPreview") == null){
      Item.setAttribute("onclick", `Image_Preview_Open('${Item.getAttribute('src')}', ${Item.getAttribute('NoPreview')})`);
    }
    
  }
}

function Image_Preview_Open(Source, NoPreview, Title){
  if (NoPreview == null){
    Element_Attribute_Set("UI_ImagePreview", "State", "Active");
    Element_Attribute_Set("UI_ImagePreview_Image_Image", "src", "Assets/Images/Loading.png");
    Element_Attribute_Set("pageElement_Curtain", "State", "Expanded");
    Element_Attribute_Set("UI_ImagePreview_Image_Image", "src", Source);
  }
  if (Title != null){
    Element_Attribute_Set("UI_ImagePreview_Image_Title", "State", "Active");
    Element_InnerHTML_Set("UI_ImagePreview_Image_Title", Title);
  } else {
    Element_Attribute_Set("UI_ImagePreview_Image_Title", "State", "Inactive");
  }
}

function Image_Preview_Close(){
  Element_Attribute_Set("UI_ImagePreview", "State", "Inactive");
  Element_Attribute_Set("pageElement_Curtain", "State", "Collapsed");
}

function Image_Preview_OpenTab(){
  var Source = Element_Attribute_Get("UI_ImagePreview_Image_Image", "src");
  window.open(Source, '_blank').focus();
}

document.addEventListener("DOMContentLoaded", function(){
  LoadingScreen_Grid_Generate();
  setTimeout(LoadingScreen_Grid_Animate("BSD", "In"), 1000);
  setTimeout(function(){
    LoadingScreen_Hide()
  }, 1700);
  
});

function LoadingScreen_Show(){
  Element_Get_ByQuery(".LoadingScreen").setAttribute("State", "Enabled");
  LoadingScreen_Grid_Animate("BSD", "Out");
  Element_Attribute_Set("LoadingScreen_Loader_Container", "State", "Active");
}

function LoadingScreen_Hide(){
  LoadingScreen_Grid_Animate("BSD", "In");
  setTimeout(Element_Get_ByQuery(".LoadingScreen").setAttribute("State", "Disabled"), 1000);
  Element_Attribute_Set("LoadingScreen_Loader_Container", "State", "Inactive");
}

var LoadingScreen_Grid_Square_Size;
function LoadingScreen_Grid_Generate(){
  var Container = Element_Get_ByQuery(".LoadingScreen");
  Container.setAttribute("onclick", "LoadingScreen_Hide()");
  var Grid_Square_Size = 250;
  var Container_Width = Container.offsetWidth;
  var Container_Height = Container.offsetHeight;
  console.log("Width: " + Container_Width + " | Height: " + Container_Height);
  var Container_Count_Rows = Math.ceil(Container_Width / Grid_Square_Size);
  var Container_Count_Columns = Math.ceil(Container_Height / Grid_Square_Size);
  console.log("Rows: " + Container_Count_Rows + " | Columns: " + Container_Count_Columns);
  console.log("Total squares: " + Container_Count_Columns * Container_Count_Rows);
  for (a = 0; a <= Container_Count_Columns; a++){
    for (b = 0; b <= Container_Count_Rows; b++){
      var Grid_Square_InnerHTML = `
        <div class="LoadingScreen_Grid_Item_Inner"></div>
      `
      var Grid_Square = document.createElement("div");
      Grid_Square.innerHTML = Grid_Square_InnerHTML;
      Grid_Square.setAttribute("class", "LoadingScreen_Grid_Item");
      Grid_Square.style.width = `${Grid_Square_Size}px`;
      Grid_Square.style.height = `${Grid_Square_Size}px`;
      Container.appendChild(Grid_Square);
    }
    
  }
  var Loader = Element_Create('div');
  Loader.innerHTML = `
    <div class="LoadingScreen_Loader" Top>
      
    </div>
    <div class="LoadingScreen_Loader" Bottom>
      <h2 class="LoadingScreen_Loader_Text">
        Loading...
      </h2>
      <div class="LoadingScreen_Loader_Bar">
          <div class="LoadingScreen_Loader_Bar_Accent"></div>
      </div>
    </div>
  `;
  Loader.setAttribute("class", "LoadingScreen_Loader_Container");
  Loader.setAttribute("id", "LoadingScreen_Loader_Container");
  Loader.setAttribute("NoMargins", "");
  Element_Get_ByQuery(".LoadingScreen").parentNode.appendChild(Loader);
  LoadingScreen_Grid_Square_Size = Grid_Square_Size + "px";
}

function LoadingScreen_Grid_Animate(Animation, Type){
  if (Animation == "BSD"){
    if (Type == "In"){
      var Squares_Inner = Element_Get_ByQuery_All(".LoadingScreen_Grid_Item_Inner");
      for (a = 0; a <= Squares_Inner.length - 1; a++){
        Squares_Inner[a].setAttribute("Animation", "BSD_In");
      }
      setTimeout(function(){
        Element_Get_ByQuery(".LoadingScreen").setAttribute("Animation", "BSD_In");
        var Squares = Element_Get_ByQuery_All(".LoadingScreen_Grid_Item");
        for (b = 0; b <= Squares.length - 1; b++){
          var OffsetX = Math.round(Randomize() * 10);
          var OffsetY = Math.round(Randomize() * 10);
          var State_End = `width: ${LoadingScreen_Grid_Square_Size}; height: ${LoadingScreen_Grid_Square_Size}; transform: translate(${OffsetX / 5}px, ${OffsetY / 5}px);`;
          Squares[b].style = State_End;
        }
      }, 600);
    }
    if (Type == "Out"){
      Element_Get_ByQuery(".LoadingScreen").setAttribute("Animation", "BSD_Out");
        var Squares = Element_Get_ByQuery_All(".LoadingScreen_Grid_Item");
        var Squares_Inner = Element_Get_ByQuery_All(".LoadingScreen_Grid_Item_Inner");
        for (a = 0; a <= Squares_Inner.length - 1; a++){
          Squares_Inner[a].setAttribute("Animation", "BSD_Out");
        }
        for (b = 0; b <= Squares.length - 1; b++){
          var OffsetX = Math.round(Randomize() * 10);
          var OffsetY = Math.round(Randomize() * 10);
          var State_End = `width: ${LoadingScreen_Grid_Square_Size}; height: ${LoadingScreen_Grid_Square_Size}; transform: translate(0px, 0px);`;
          Squares[b].style = State_End;
        }
    }
  }
}

function Randomize(){
  var Number = Math.ceil((Math.random() * 50));
  if (Math.random() >= 0.50){
      Number *= -1
  } else {
      Number *= 1
  }
  return Number;
}

async function Transition(){
  console.log("Triggered");
  LoadingScreen_Show()
  return new Promise(resolve => 
    setTimeout(resolve, 700)
  );
}