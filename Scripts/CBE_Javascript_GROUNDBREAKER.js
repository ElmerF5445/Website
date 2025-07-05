function GRBRKR_Logo_Entrance() {
    setTimeout(function () {
        var Elements = document.querySelectorAll(".GRBRKR_Title_Layer");
        for (a = 0; a < Elements.length; a++) {
            if (Elements[a].getAttribute("Type") == "Outline") {
                Elements[a].setAttribute("State", "Entrance_Outline");
            }
        }

    }, 2000);
    setTimeout(function () {
        var Elements = document.querySelectorAll(".GRBRKR_Title_Layer");
        for (a = 0; a < Elements.length; a++) {
            if (Elements[a].getAttribute("Type") == "Filled") {
                Elements[a].setAttribute("State", "Entrance_Filled");
            }
        }
    }, 4000);

}
var Data;
function List_Generate() {
    Data = Data_Import_FromPath("GROUNDBREAKER/Index_Sequence_GRBRKR.json");
    Element_Clear("GRBRKR_Chapters");
    for (a = 0; a < Data.length; a++) {
        var Arc = Data[a];
        for (b = Arc.Arc_Contents.length - 1; b > 0; b--) {
            var Chapter = Arc.Arc_Contents[b];
            var Chapter_InnerHTML = `
                <div class="GRBRKR_Chapters_Item_Decoration"></div>
                <h3 class="GRBRKR_Chapters_Item_Chapter">
                    ${Arc.Arc_Prefix} ${Chapter.Chapter_Number}:
                </h3>
                <h2 class="GRBRKR_Chapters_Item_Title">
                    ${Chapter.Chapter_Title}
                </h2>
                <h3 class="GRBRKR_Chapters_Item_Arc">
                    ${Arc.Arc_Name}
                </h3>
            `;

            var Chapter_Element = document.createElement("button");
            Chapter_Element.setAttribute("class", "GRBRKR_Chapters_Item");
            Chapter_Element.setAttribute("onclick", `Sequence_Open_Node('${Arc.Arc_ID}', ${ b });`);
            Chapter_Element.setAttribute("Search_Terms", `${Arc.Arc_Prefix.toUpperCase()}_${Chapter.Chapter_Number.toString().toUpperCase()}_${Chapter.Chapter_Title.toUpperCase()}_${Arc.Arc_Name.toUpperCase() }`);
            Chapter_Element.innerHTML = Chapter_InnerHTML;
            document.getElementById("GRBRKR_Chapters").appendChild(Chapter_Element);
        }
    }

    var Latest_Arc = Data[Data.length - 1];
    var Latest_Chapter = Latest_Arc.Arc_Contents[Latest_Arc.Arc_Contents.length - 1];
    Element_InnerHTML_Set("GRBRKR_Latest_Chapter", `${Latest_Arc.Arc_Prefix} ${Latest_Chapter.Chapter_Number}:`);
    Element_InnerHTML_Set("GRBRKR_Latest_Title", `${Latest_Chapter.Chapter_Title}`);
    Element_Attribute_Set("GRBRKR_Latest_Control", "onclick", `Page_ChangePage('GROUNDBREAKER/GRBRKR_Story.html?F=${Latest_Chapter.Chapter_File}&A=${Data.length - 1}&C=${Latest_Arc.Arc_Contents.length - 1}', Transition)`);
}
/*
function List_Generate(FileURL) {
    const request = new XMLHttpRequest();
    request.open("GET", FileURL, false);
    request.send();
    var messages = request.responseText;
    Button_Information = JSON.parse(messages)
    document.getElementById("GRBRKR_Chapters").innerHTML = "";
    for (a = 0; a < Button_Information.length; a++) {
        var Arc = Button_Information[a];
        var Arc_Name = Arc.Arc_Name;
        console.log(Arc_Name);
        console.log(Arc.Arc_Contents.length);
        for (b = Arc.Arc_Contents.length - 1; b >= 0; b--) {
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

    var Latest_Arc = Button_Information[Button_Information.length - 1];
    var Latest_Chapter = Latest_Arc.Arc_Contents[Latest_Arc.Arc_Contents.length - 1];
    console.log(Latest_Arc);
    console.log(Latest_Chapter);
    Element_InnerHTML_Set("GRBRKR_Latest_Chapter", `Chapter ${Latest_Chapter.Chapter_Number}:`);
    Element_InnerHTML_Set("GRBRKR_Latest_Title", `${Latest_Chapter.Chapter_Title}`);
    Element_Attribute_Set("GRBRKR_Latest_Control", "onclick", `Page_ChangePage('GROUNDBREAKER/GRBRKR_Story.html?Chapter=${Latest_Chapter.Chapter_File}&Arc=${Button_Information.indexOf(Latest_Arc.Arc_Name)}&Index=${Latest_Arc.Arc_Contents.indexOf(Latest_Chapter.Chapter_Number)}', Transition)`);
}*/

function Search_Query(Query) {
    var Buttons = document.querySelectorAll(".GRBRKR_Chapters_Item");
    for (a = 0; a < Buttons.length; a++) {
        Buttons[a].style.display = "none";
    }

    for (b = 0; b < Buttons.length; b++) {
        if (Buttons[b].getAttribute("Search_Terms").includes(Query.toUpperCase())) {
            Buttons[b].style.display = "unset";
        }
    }
}

function Load_File() {
    AB_Renderer_Article_Render(Data_Import_FromPath("GROUNDBREAKER/" + UF_Parameter_Get("F")));
    var Sequence = Data_Import_FromPath("GROUNDBREAKER/Index_Sequence_GRBRKR.json");
    var Chapter_Before = Sequence[UF_Parameter_Get("A")].Arc_Contents[UF_Parameter_Get("C")].Chapter_Before;
    console.log(Chapter_Before.Active);

    var Chapter_After = Sequence[UF_Parameter_Get("A")].Arc_Contents[UF_Parameter_Get("C")].Chapter_After;
    console.log(Chapter_After.Active);
    // Previous
    if ((Chapter_Before == null || Chapter_Before == undefined) || Chapter_Before.Active == false) {
        Element_Attribute_Set("GRBRKR_Story_Footer_Button_Previous", "State", "Inactive");
    } else {
        Element_InnerHTML_Set("GRBRKR_Story_Footer_Button_Previous_Chapter", `${Sequence[Chapter_Before.Arc_Index].Arc_Prefix} ${Sequence[Chapter_Before.Arc_Index].Arc_Contents[Chapter_Before.Chapter_Index].Chapter_Number}:`);
        Element_InnerHTML_Set("GRBRKR_Story_Footer_Button_Previous_Title", Sequence[Chapter_Before.Arc_Index].Arc_Contents[Chapter_Before.Chapter_Index].Chapter_Title);
        Element_Attribute_Set("GRBRKR_Story_Footer_Button_Previous", "onclick", `Page_ChangePage('GROUNDBREAKER/GRBRKR_Story.html?F=${Chapter_Before.Chapter_File}&A=${Chapter_Before.Arc_Index}&C=${Chapter_Before.Chapter_Index}', Transition);`);
    }

    if ((Chapter_After == null || Chapter_After == undefined) || Chapter_After.Active == false) {
        Element_Attribute_Set("GRBRKR_Story_Footer_Button_Next", "State", "Inactive");
    } else {
        Element_InnerHTML_Set("GRBRKR_Story_Footer_Button_Next_Chapter", `${Sequence[Chapter_After.Arc_Index].Arc_Prefix} ${Sequence[Chapter_After.Arc_Index].Arc_Contents[Chapter_After.Chapter_Index].Chapter_Number}:`);
        Element_InnerHTML_Set("GRBRKR_Story_Footer_Button_Next_Title", Sequence[Chapter_After.Arc_Index].Arc_Contents[Chapter_After.Chapter_Index].Chapter_Title);
        Element_Attribute_Set("GRBRKR_Story_Footer_Button_Next", "onclick", `Page_ChangePage('GROUNDBREAKER/GRBRKR_Story.html?F=${Chapter_After.Chapter_File}&A=${Chapter_After.Arc_Index}&C=${Chapter_After.Chapter_Index}', Transition);`);
    }
}

function Load_File_Old() {
    AB_Renderer_Article_Render(Data_Import_FromPath("GROUNDBREAKER/GRBRKR_Chapter_" + UF_Parameter_Get("Chapter") + ".cbe_sb"));

    // Gets its index
    var Arc = UF_Parameter_Get("Arc");
    var Chapter = Number(UF_Parameter_Get("Chapter"));
    var Chapter_Manifest = Data_Import_FromPath("GROUNDBREAKER/Index_Chapters_GRBRKR.json");
    var Chapter_Array;
    var Chapter_Index = Number(UF_Parameter_Get("Index"));
    Chapter_Array = Chapter_Manifest[Arc].Arc_Contents;

    // Previous
    if (Chapter_Array[Chapter_Index - 1] == null || Chapter_Array[Chapter_Index - 1] == undefined) {
        Element_Attribute_Set("GRBRKR_Story_Footer_Button_Previous", "State", "Inactive");
        console.log("Undefined");
    } else {
        Element_InnerHTML_Set("GRBRKR_Story_Footer_Button_Previous_Chapter", `Chapter ${Chapter - 1}:`);
        Element_InnerHTML_Set("GRBRKR_Story_Footer_Button_Previous_Title", Chapter_Array[Chapter_Index - 1].Chapter_Title);
        Element_Attribute_Set("GRBRKR_Story_Footer_Button_Previous", "onclick", `Page_ChangePage('GROUNDBREAKER/GRBRKR_Story.html?Chapter=${Chapter - 1}&Arc=${Arc}&Index=${Chapter_Index - 1}', Transition)`);
    }

    // Next
    if (Chapter_Array[Chapter_Index + 1] == null || Chapter_Array[Chapter_Index + 1] == undefined) {
        Element_Attribute_Set("GRBRKR_Story_Footer_Button_Next", "State", "Inactive");
        console.log("Undefined");
    } else {
        Element_InnerHTML_Set("GRBRKR_Story_Footer_Button_Next_Chapter", `Chapter ${Chapter + 1}:`);
        Element_InnerHTML_Set("GRBRKR_Story_Footer_Button_Next_Title", Chapter_Array[Chapter_Index + 1].Chapter_Title);
        Element_Attribute_Set("GRBRKR_Story_Footer_Button_Next", "onclick", `Page_ChangePage('GROUNDBREAKER/GRBRKR_Story.html?Chapter=${Chapter + 1}&Arc=${Arc}&Index=${Chapter_Index + 1}', Transition)`);
    }
}