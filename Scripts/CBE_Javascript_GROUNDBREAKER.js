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
            Chapter_Button.setAttribute("onclick", `Page_ChangePage('GROUNDBREAKER/GRBRKR_Story.html?chapter=${Chapter_File}')`);
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