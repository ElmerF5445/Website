function GRBRKR_Logo_Entrance(){
    setTimeout(function(){
        var Elements = document.querySelectorAll(".GRBRKR_Title_Layer");
        for (a = 0; a < Elements.length; a++){
            if (Elements[a].getAttribute("Type") == "Outline"){
                Elements[a].setAttribute("State", "Entrance_Outline");
            }
        }
        
    }, 2000);
    setTimeout(function(){
        var Elements = document.querySelectorAll(".GRBRKR_Title_Layer");
        for (a = 0; a < Elements.length; a++){
            if (Elements[a].getAttribute("Type") == "Filled"){
                Elements[a].setAttribute("State", "Entrance_Filled");  
            }
        }
    }, 4000);
    
}

function List_Generate(FileURL){
    const request = new XMLHttpRequest();
    request.open("GET", FileURL, false);
    request.send();
    var messages = request.responseText;
    console.log(messages);
    Button_Information = JSON.parse(messages)
    console.log(Button_Information);
    document.getElementById("GRBRKR_Chapters").innerHTML = "";
    for (a = 0; a < Button_Information.length; a++){
        var Arc = Button_Information[a];
        var Arc_Name = Arc.Arc_Name;
        console.log(Arc_Name);
        console.log(Arc.Arc_Contents.length);
        for(b = 0; b < Arc.Arc_Contents.length; b++){
            var Chapter = Arc.Arc_Contents[b];
            var Chapter_File = Chapter.Chapter_File;
            var Chapter_Title = Chapter.Chapter_Title;
            var Chapter_Number = Chapter.Chapter_Number;
            var Chapter_Title_Full = `Chapter ${Chapter_Number}: ${Chapter_Title}`;
            var Chapter_InnerHTML = `
                <h2 class="GRBRKR_Chapters_Item_Title">
                    Chapter ${Chapter_Number}: ${Chapter_Title}
                </h2>
                <p class="GRBRKR_Chapters_Item_Subtitle">
                    ${Arc_Name}
                </p>
            `;
            var Chapter_Button = document.createElement("button");
            Chapter_Button.setAttribute("class", "GRBRKR_Chapters_Item");
            Chapter_Button.setAttribute("id", `GRBRKR_${a}_${b}`);
            Chapter_Button.setAttribute("Search_Terms", `${Arc_Name}_${Chapter_Number}_${Chapter_Title_Full.toUpperCase()}`);
            Chapter_Button.setAttribute("onclick", `Page_ChangePage('GROUNDBREAKER/GRBRKR_Story.html?Chapter=${Chapter_File}&Arc=${a}&Index=${b}', Transition)`);
            Chapter_Button.innerHTML = Chapter_InnerHTML;
            document.getElementById("GRBRKR_Chapters").appendChild(Chapter_Button);
        }
    }
    
}

function Search_Query(Query){
    var Buttons = document.querySelectorAll(".GRBRKR_Chapters_Item");
    for (a = 0; a < Buttons.length; a++){
        Buttons[a].style.display = "none";
    }

    for (b = 0; b < Buttons.length; b++){
        if (Buttons[b].getAttribute("Search_Terms").includes(Query.toUpperCase())){
            Buttons[b].style.display = "unset";
        }
    }
}

function Load_File(){
    AB_Renderer_Article_Render(Data_Import_FromPath("GROUNDBREAKER/GRBRKR_Chapter_" + UF_Parameter_Get("Chapter") + ".cbe_sb"));

    // Gets its index
    var Arc = UF_Parameter_Get("Arc");
    var Chapter = Number(UF_Parameter_Get("Chapter"));
    var Chapter_Manifest = Data_Import_FromPath("GROUNDBREAKER/Index_Chapters_GRBRKR.json");
    var Chapter_Array;
    var Chapter_Index = Number(UF_Parameter_Get("Index"));
    Chapter_Array = Chapter_Manifest[Arc].Arc_Contents;

    // Previous
    if (Chapter_Array[Chapter_Index - 1] == null || Chapter_Array[Chapter_Index - 1] == undefined){
        Element_Attribute_Set("GRBRKR_Story_Footer_Button_Previous", "State", "Inactive");
        console.log("Undefined");
    } else {
        Element_InnerHTML_Set("GRBRKR_Story_Footer_Button_Previous_Chapter", `Chapter ${Chapter - 1}:`);
        Element_InnerHTML_Set("GRBRKR_Story_Footer_Button_Previous_Title", Chapter_Array[Chapter_Index - 1].Chapter_Title);
        Element_Attribute_Set("GRBRKR_Story_Footer_Button_Previous", "onclick", `Page_ChangePage('GROUNDBREAKER/GRBRKR_Story.html?Chapter=${Chapter - 1}&Arc=${Arc}&Index=${Chapter_Index - 1}', Transition)`);
    }

    // Next
    if (Chapter_Array[Chapter_Index + 1] == null || Chapter_Array[Chapter_Index + 1] == undefined){
        Element_Attribute_Set("GRBRKR_Story_Footer_Button_Next", "State", "Inactive");
        console.log("Undefined");
    } else {
        Element_InnerHTML_Set("GRBRKR_Story_Footer_Button_Next_Chapter", `Chapter ${Chapter + 1}:`);
        Element_InnerHTML_Set("GRBRKR_Story_Footer_Button_Next_Title", Chapter_Array[Chapter_Index + 1].Chapter_Title);
        Element_Attribute_Set("GRBRKR_Story_Footer_Button_Next", "onclick", `Page_ChangePage('GROUNDBREAKER/GRBRKR_Story.html?Chapter=${Chapter + 1}&Arc=${Arc}&Index=${Chapter_Index + 1}', Transition)`);
    }
}