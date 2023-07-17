var BranchList_Article_Name = [];
var BranchList_Article_Author = [];
var BranchList_Article_Category = [];
var BranchList_Article_Date_Published = [];
var BranchList_Article_URL = [];
var BranchList_Article_Thumbnail = [];

var BranchList_Album_Name = [];
var BranchList_Album_Author = [];
var BranchList_Album_Category = [];
var BranchList_Album_Date_Published = [];
var BranchList_Album_IndexFileName = [];
var BranchList_Album_Thumbnail = [];

function BranchNavigation_Generate_List_Gallery(){
    const request = new XMLHttpRequest();
    request.open("GET", "Gallery/Index_Gallery_Main.txt", false);
    request.send();
    var messages = request.responseText.split("\n");
    console.log(messages);
    BranchList_Data = messages;
    for (a = 6; a != messages.length; a++){
        console.log("Processing item " + a + "...");
        BranchList_Line_Data = messages[a].split("%&");
        BranchList_Album_Name[a] = BranchList_Line_Data[0];
        BranchList_Album_Author[a] = BranchList_Line_Data[1];
        BranchList_Album_Category[a] = BranchList_Line_Data[2];
        BranchList_Album_Date_Published[a] = BranchList_Line_Data[3];
        BranchList_Album_IndexFileName[a] = BranchList_Line_Data[4];
        if (BranchList_Line_Data[5].includes("\r")){
            BranchList_Album_Thumbnail[a] = BranchList_Line_Data[5].replace("\r", "");
        } else {
            BranchList_Album_Thumbnail[a] = BranchList_Line_Data[5];
        }
        console.log("Done processing item " + a + ".");
    }
    BranchNavigation_Generate_BranchList_Gallery();
}

function BranchNavigation_Generate_BranchList_Gallery(){
    for (a = 6; a != BranchList_Album_Name.length; a++){
        console.log("Processing item " + a + "...");
        // Anchor
        var BranchList_Item_Anchor = document.createElement('a');
        BranchList_Item_Anchor.setAttribute("href", "ES_AlbumViewer.html?albumName=" + BranchList_Album_IndexFileName[a]);
        BranchList_Item_Anchor.setAttribute("id", "BranchList_Main_Item_Anchor_" + a);
        document.getElementById("Branch_Navigation_Main").appendChild(BranchList_Item_Anchor);

        // Item Container
        var BranchList_Item_Div = document.createElement('div');
        BranchList_Item_Div.setAttribute('id','BranchList_Main_Item_Div_' + a);
        BranchList_Item_Div.className = "Branch_Navigation_Grid_Item";
        document.getElementById("BranchList_Main_Item_Anchor_" + a).appendChild(BranchList_Item_Div);

        // Item Thumbnail
        var BranchList_Item_Thumbnail = document.createElement('div');
        BranchList_Item_Thumbnail.setAttribute('style', 'background-image: url("' + BranchList_Album_Thumbnail[a] + '")');
        BranchList_Item_Thumbnail.className = "Branch_Navigation_Grid_Item_Thumbnail";
        document.getElementById('BranchList_Main_Item_Div_' + a).appendChild(BranchList_Item_Thumbnail);

        // Item Title
        var BranchList_Item_Title = document.createElement('h2');
        BranchList_Item_Title.innerHTML = BranchList_Album_Name[a];
        BranchList_Item_Title.className = "Branch_Navigation_Grid_Item_Title";
        document.getElementById('BranchList_Main_Item_Div_' + a).appendChild(BranchList_Item_Title);

        // Item Detail Container
        var BranchList_Item_Details = document.createElement('div');
        BranchList_Item_Details.setAttribute('id', 'BranchList_Main_Item_Details_' + a);
        BranchList_Item_Details.className = "Branch_Navigation_Grid_Item_Details";
        document.getElementById('BranchList_Main_Item_Div_' + a).appendChild(BranchList_Item_Details);

        // Item Detail Author
        var BranchList_Item_Details_Item = document.createElement('div');
        BranchList_Item_Details_Item.innerHTML = BranchList_Album_Author[a];
        BranchList_Item_Details_Item.classList.add("Branch_Navigation_Grid_Item_Details_Item");
        BranchList_Item_Details_Item.classList.add("Detail_Type_Author");
        BranchList_Item_Details_Item.className = "Branch_Navigation_Grid_Item_Details_Item";
        document.getElementById('BranchList_Main_Item_Details_' + a).appendChild(BranchList_Item_Details_Item);

        // Item Detail Category
        var BranchList_Item_Details_Item = document.createElement('div');
        BranchList_Item_Details_Item.innerHTML = BranchList_Album_Category[a];
        BranchList_Item_Details_Item.classList.add("Branch_Navigation_Grid_Item_Details_Item");
        BranchList_Item_Details_Item.classList.add("Detail_Type_Category");
        BranchList_Item_Details_Item.className = "Branch_Navigation_Grid_Item_Details_Item";
        document.getElementById('BranchList_Main_Item_Details_' + a).appendChild(BranchList_Item_Details_Item);

        // Item Detail Publishing Date
        var BranchList_Item_Details_Item = document.createElement('div');
        BranchList_Item_Details_Item.innerHTML = BranchList_Album_Date_Published[a];
        BranchList_Item_Details_Item.classList.add("Branch_Navigation_Grid_Item_Details_Item");
        BranchList_Item_Details_Item.classList.add("Detail_Type_DatePublished");
        BranchList_Item_Details_Item.className = "Branch_Navigation_Grid_Item_Details_Item";
        document.getElementById('BranchList_Main_Item_Details_' + a).appendChild(BranchList_Item_Details_Item);

        console.log("Done processing item " + a + ".");
    }
    document.getElementById("Branch_Navigation_Status").style.display = "none";
    document.getElementById("Branch_Navigation_Status_Container").style.maxHeight = "0px";
    BranchNavigation_Search_SetDataToUppercase();
}


function BranchNavigation_Generate_List_Articles(){
    const request = new XMLHttpRequest();
    request.open("GET", "Articles/Index_Articles.txt", false);
    request.send();
    var messages = request.responseText.split("\n");
    console.log(messages);
    BranchList_Data = messages;
    for (a = 6; a != messages.length; a++){
        console.log("Processing item " + a + "...");
        BranchList_Line_Data = messages[a].split("%&");
        BranchList_Article_Name[a] = BranchList_Line_Data[0];
        BranchList_Article_Author[a] = BranchList_Line_Data[1];
        BranchList_Article_Category[a] = BranchList_Line_Data[2];
        BranchList_Article_Date_Published[a] = BranchList_Line_Data[3];
        BranchList_Article_URL[a] = BranchList_Line_Data[4];
        if (BranchList_Line_Data[5].includes("\r")){
            BranchList_Article_Thumbnail[a] = BranchList_Line_Data[5].replace("\r", "");
        } else {
            BranchList_Article_Thumbnail[a] = BranchList_Line_Data[5];
        }
        console.log("Done processing item " + a + ".");
    }
    BranchNavigation_Generate_BranchList_Articles();
}

function BranchNavigation_Generate_BranchList_Articles_Depracated(){
    for (a = 6; a != BranchList_Article_Name.length; a++){
        var BranchList_Item_Div = document.createElement('a');
        BranchList_Item_Div.setAttribute("href", "Articles/" + BranchList_Article_URL[a]);
        BranchList_Item_Div.setAttribute("id", "Branch_Navigation_Link_"+a);
        document.getElementById("Branch_Navigation").appendChild(BranchList_Item_Div);
        
        var BranchList_Item_Div = document.createElement('div');
        BranchList_Item_Div.setAttribute("id", "BranchList_Item_"+a);
        BranchList_Item_Div.classList.add("Branch_Navigation_Item");
        document.getElementById("Branch_Navigation_Link_"+a).appendChild(BranchList_Item_Div);

        var BranchList_Item_Title = document.createElement("h2");
        BranchList_Item_Title.innerHTML = BranchList_Article_Name[a];
        BranchList_Item_Title.classList.add("Branch_Navigation_Item_Title");
        document.getElementById("BranchList_Item_"+a).appendChild(BranchList_Item_Title);

        var BranchList_Item_Details = document.createElement("div");
        BranchList_Item_Details.setAttribute("id", "BranchList_Item_Details_"+a);
        BranchList_Item_Details.classList.add("Branch_Navigation_Item_Details");
        document.getElementById("BranchList_Item_"+a).appendChild(BranchList_Item_Details);

        var BranchList_Item_Details_Text_Author = document.createElement("p");
        BranchList_Item_Details_Text_Author.innerHTML = "Author: " + BranchList_Article_Author[a];
        BranchList_Item_Details_Text_Author.classList.add("Branch_Navigation_Item_Details_Text");
        document.getElementById("BranchList_Item_Details_"+a).appendChild(BranchList_Item_Details_Text_Author);
        
        var BranchList_Item_Details_Text_Category = document.createElement("p");
        BranchList_Item_Details_Text_Category.innerHTML = "Category: " + BranchList_Article_Category[a];
        BranchList_Item_Details_Text_Category.classList.add("Branch_Navigation_Item_Details_Text");
        document.getElementById("BranchList_Item_Details_"+a).appendChild(BranchList_Item_Details_Text_Category);

        var BranchList_Item_Details_Text_Date_Published = document.createElement("p");
        BranchList_Item_Details_Text_Date_Published.innerHTML = "Date Published: " + BranchList_Article_Date_Published[a];
        BranchList_Item_Details_Text_Date_Published.classList.add("Branch_Navigation_Item_Details_Text");
        document.getElementById("BranchList_Item_Details_"+a).appendChild(BranchList_Item_Details_Text_Date_Published);

    }
}

function BranchNavigation_Generate_BranchList_Articles(){
    for (a = 6; a != BranchList_Article_Name.length; a++){
        //console.log("Processing item " + a + "...");
        // Anchor
        var BranchList_Item_Anchor = document.createElement('a');
        BranchList_Item_Anchor.setAttribute("href", "Articles/" + BranchList_Article_URL[a]);
        BranchList_Item_Anchor.setAttribute("id", "BranchList_Main_Item_Anchor_" + a);
        document.getElementById("Branch_Navigation_Main").appendChild(BranchList_Item_Anchor);

        // Item Container
        var BranchList_Item_Div = document.createElement('div');
        BranchList_Item_Div.setAttribute('id','BranchList_Main_Item_Div_' + a);
        BranchList_Item_Div.className = "Branch_Navigation_Grid_Item";
        document.getElementById("BranchList_Main_Item_Anchor_" + a).appendChild(BranchList_Item_Div);

        // Item Thumbnail
        var BranchList_Item_Thumbnail = document.createElement('div');
        BranchList_Item_Thumbnail.setAttribute('style', 'background-image: url("' + BranchList_Article_Thumbnail[a] + '")');
        BranchList_Item_Thumbnail.className = "Branch_Navigation_Grid_Item_Thumbnail";
        document.getElementById('BranchList_Main_Item_Div_' + a).appendChild(BranchList_Item_Thumbnail);

        // Item Title
        var BranchList_Item_Title = document.createElement('h2');
        BranchList_Item_Title.innerHTML = BranchList_Article_Name[a];
        BranchList_Item_Title.className = "Branch_Navigation_Grid_Item_Title";
        document.getElementById('BranchList_Main_Item_Div_' + a).appendChild(BranchList_Item_Title);

        // Item Detail Container
        var BranchList_Item_Details = document.createElement('div');
        BranchList_Item_Details.setAttribute('id', 'BranchList_Main_Item_Details_' + a);
        BranchList_Item_Details.className = "Branch_Navigation_Grid_Item_Details";
        document.getElementById('BranchList_Main_Item_Div_' + a).appendChild(BranchList_Item_Details);

        // Item Detail Author
        var BranchList_Item_Details_Item = document.createElement('div');
        BranchList_Item_Details_Item.innerHTML = BranchList_Article_Author[a];
        BranchList_Item_Details_Item.classList.add("Branch_Navigation_Grid_Item_Details_Item");
        BranchList_Item_Details_Item.classList.add("Detail_Type_Author");
        BranchList_Item_Details_Item.className = "Branch_Navigation_Grid_Item_Details_Item";
        document.getElementById('BranchList_Main_Item_Details_' + a).appendChild(BranchList_Item_Details_Item);

        // Item Detail Category
        var BranchList_Item_Details_Item = document.createElement('div');
        BranchList_Item_Details_Item.innerHTML = BranchList_Article_Category[a];
        BranchList_Item_Details_Item.classList.add("Branch_Navigation_Grid_Item_Details_Item");
        BranchList_Item_Details_Item.classList.add("Detail_Type_Category");
        BranchList_Item_Details_Item.className = "Branch_Navigation_Grid_Item_Details_Item";
        document.getElementById('BranchList_Main_Item_Details_' + a).appendChild(BranchList_Item_Details_Item);

        // Item Detail Publishing Date
        var BranchList_Item_Details_Item = document.createElement('div');
        BranchList_Item_Details_Item.innerHTML = BranchList_Article_Date_Published[a];
        BranchList_Item_Details_Item.classList.add("Branch_Navigation_Grid_Item_Details_Item");
        BranchList_Item_Details_Item.classList.add("Detail_Type_DatePublished");
        BranchList_Item_Details_Item.className = "Branch_Navigation_Grid_Item_Details_Item";
        document.getElementById('BranchList_Main_Item_Details_' + a).appendChild(BranchList_Item_Details_Item);

        //console.log("Done processing item " + a + ".");
    }
    document.getElementById("Branch_Navigation_Status").style.display = "none";
    document.getElementById("Branch_Navigation_Status_Container").style.maxHeight = "0px";
    BranchNavigation_Search_SetDataToUppercase();
}

function BranchNavigation_Search_SetDataToUppercase(){
    for (a = 6; a != BranchList_Data.length; a++){
        BranchList_Data[a] = BranchList_Data[a].toUpperCase();
    }
}

var BranchList_Search_Results = [];
var BranchList_Search_Results_Lines = [];
function BranchNavigation_Search_Articles(Query){
    //console.log("Starting search...");
    BranchList_Search_Results = [];
    BranchList_Search_Results_Lines = [];
    for (a = 6; a != BranchList_Data.length; a++){
        if (BranchList_Data[a].includes(Query.toUpperCase())){
            BranchList_Search_Results.push(BranchList_Data[a]);
            BranchList_Search_Results_Lines.push(a);
            //console.log("Result found on line: " + a);
        }
    }
    //console.log("Search results: " + BranchList_Search_Results);
    //console.log("Search result lines: " + BranchList_Search_Results_Lines);

    for (a = 6; a != BranchList_Data.length; a++){
        document.getElementById("BranchList_Main_Item_Anchor_" + a).style.display = "none";
    }

    for (a = 0; a != BranchList_Search_Results_Lines.length; a++){
        document.getElementById("BranchList_Main_Item_Anchor_" + BranchList_Search_Results_Lines[a]).style.display = "block";
    }

    document.getElementById("Branch_Navigation_Status").style.display = "block";
    document.getElementById("Branch_Navigation_Status_Container").style.maxHeight = "500px";
    document.getElementById("Branch_Navigation_Status").innerHTML = BranchList_Search_Results_Lines.length + " results for '" + Query + "'";
    if (BranchList_Search_Results_Lines.length == 0){
        document.getElementById("Branch_Navigation_Status").innerHTML = "No article found containing '" + Query + "'.";
    }

    if (Query == ""){
        document.getElementById("Branch_Navigation_Status").style.display = "none";
        document.getElementById("Branch_Navigation_Status_Container").style.maxHeight = "1px";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var BranchNavigation_Search_InputElement = document.getElementById("BranchNavigation_Search_Query");
    BranchNavigation_Search_InputElement.addEventListener('keypress', function(event) {
        if (event.keyCode === 13) {
        BranchNavigation_Search_Articles(document.getElementById("BranchNavigation_Search_Query").value);
        }
    });
});