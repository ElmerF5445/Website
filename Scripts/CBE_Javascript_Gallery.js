var Gallery_Album_Name;
var Gallery_Album_Description;
var Gallery_Album_Information = [];
var Gallery_Album_RawData;
var Gallery_Album_ImageLinks = [];
var Gallery_Album_ImageLinks_Separated = [];

var Gallery_Album_IndexFinder_QueryString;
var Gallery_Album_IndexFinder_URLParameters;
var Gallery_Album_IndexFinder_IndexFileName;
function Gallery_IndexFinder(){
    Gallery_Album_IndexFinder_QueryString = window.location.search;
    Gallery_Album_IndexFinder_URLParameters = new URLSearchParams(Gallery_Album_IndexFinder_QueryString);
    Gallery_Album_IndexFinder_IndexFileName = "Gallery/Album_Indexes/Index_" + Gallery_Album_IndexFinder_URLParameters.get('albumName') + ".txt";
    console.log(Gallery_Album_IndexFinder_IndexFileName);
    Gallery_Generate_Information(Gallery_Album_IndexFinder_IndexFileName);
}


function Gallery_Generate_Information(IndexURL){
    const request = new XMLHttpRequest();
    request.open("GET", IndexURL, false);
    request.send();
    Gallery_Album_RawData = request.responseText.split("\n");
    Gallery_Album_Name = Gallery_Album_RawData[1];
    Gallery_Album_Description = Gallery_Album_RawData[2];
    var LineCounter = 4;
    while (Gallery_Album_RawData[LineCounter] != "#>\r" && Gallery_Album_RawData[LineCounter] != "#>") {
        if (LineCounter > 100){
            console.log("Loop broken due to exceeding limit");
            break;
        }
        if (Gallery_Album_RawData[LineCounter].includes("\r")){
            Gallery_Album_Information.push(Gallery_Album_RawData[LineCounter].replace("\r", ""));
        } else {
            Gallery_Album_Information.push(Gallery_Album_RawData[LineCounter]);
        }
        //console.log(Gallery_Album_Information);
        LineCounter++;
    }

    document.getElementById("Gallery_Album_Title").innerHTML = Gallery_Album_Name;
    document.getElementById("Gallery_Album_ImageView_Title").innerHTML = Gallery_Album_Name;
    document.getElementById("Gallery_Album_Description").innerHTML = Gallery_Album_Description;

    var Gallery_Album_Information_Separated = [];
    for (a = 0; a != Gallery_Album_Information.length; a++){
        Gallery_Album_Information_Separated.push(Gallery_Album_Information[a].split("%&")[0]);
        Gallery_Album_Information_Separated.push(Gallery_Album_Information[a].split("%&")[1]);
    }
    //console.log(Gallery_Album_Information_Separated);
    var b = 0;
    for (a = 0; a != Gallery_Album_Information_Separated.length; a += 2){
        b++;
        var Gallery_Album_Information_Item = document.createElement('div');
        Gallery_Album_Information_Item.classList.add("Gallery_Information_Item");
        Gallery_Album_Information_Item.setAttribute("id", "Gallery_Album_Information_" + b);
        document.getElementById("Gallery_Album_Information").appendChild(Gallery_Album_Information_Item);

        var Gallery_Album_Information_Item_Title = document.createElement('p');
        Gallery_Album_Information_Item_Title.classList.add("Gallery_Information_Item_Title");
        Gallery_Album_Information_Item_Title.innerHTML = Gallery_Album_Information_Separated[a];
        document.getElementById("Gallery_Album_Information_" + b).appendChild(Gallery_Album_Information_Item_Title);
        
        var Gallery_Album_Information_Item_Title = document.createElement('p');
        Gallery_Album_Information_Item_Title.classList.add("Gallery_Information_Item_Value");
        Gallery_Album_Information_Item_Title.innerHTML = Gallery_Album_Information_Separated[a + 1];
        document.getElementById("Gallery_Album_Information_" + b).appendChild(Gallery_Album_Information_Item_Title);
    }

    var LineCounter = 8;
    while (Gallery_Album_RawData[LineCounter] != undefined) {
        if (LineCounter > 100){
            console.log("Loop broken due to exceeding limit");
            break;
        }
        if(Gallery_Album_RawData[LineCounter].includes("\r")){
            Gallery_Album_ImageLinks.push(Gallery_Album_RawData[LineCounter].replace("\r", ""));
        } else {
            Gallery_Album_ImageLinks.push(Gallery_Album_RawData[LineCounter]);
        }
        //console.log(Gallery_Album_ImageLinks);
        LineCounter++;
    }

    Gallery_Album_ImageLinks_Separated = [];
    for (a = 0; a != Gallery_Album_ImageLinks.length; a++){
        Gallery_Album_ImageLinks_Separated.push(Gallery_Album_ImageLinks[a].split("%&")[0]);
        Gallery_Album_ImageLinks_Separated.push(Gallery_Album_ImageLinks[a].split("%&")[1]);
    }
    //console.log(Gallery_Album_ImageLinks_Separated);
    Gallery_Generate_Album();
}

var Gallery_Album_Generation_Level = 1;
var Gallery_Album_Generation_Limit = 6;
var Gallery_Album_Generation_StartingPoint = 0;

function Gallery_Generate_Album(){
    /*console.log(Gallery_Album_Generation_Level);
    console.log(Gallery_Album_Generation_StartingPoint);
    console.log(Gallery_Album_Generation_Limit * Gallery_Album_Generation_Level);*/
    for (a = Gallery_Album_Generation_StartingPoint; a != Gallery_Album_Generation_Limit * Gallery_Album_Generation_Level * 2; a += 2){
        var Gallery_Album_Item = document.createElement("div");
        Gallery_Album_Item.classList.add("Gallery_Album_Item");
        Gallery_Album_Item.setAttribute("onclick", "Subwindows_Open('ImageView'); Gallery_Album_ImageView_ChangeImage(this.getAttribute('data-id'));");
        Gallery_Album_Item.setAttribute("style", 'background-image: url("' + Gallery_Album_ImageLinks_Separated[a] + '");');
        Gallery_Album_Item.setAttribute("data-id", Gallery_Album_ImageLinks_Separated[a + 1]);
        if (Gallery_Album_ImageLinks_Separated[a] != undefined || Gallery_Album_ImageLinks_Separated[a] != null){
            document.getElementById("Gallery_Album").appendChild(Gallery_Album_Item);
        }
        
    }
    Gallery_Album_Generation_StartingPoint = Gallery_Album_Generation_Limit * Gallery_Album_Generation_Level * 2;
    Gallery_Album_Generation_Level++;
}

function Gallery_Album_ImageView_ChangeImage(URL){
    document.getElementById("Gallery_ImageView_Image").setAttribute("style", "background-image: url('" + URL + "');");
}

