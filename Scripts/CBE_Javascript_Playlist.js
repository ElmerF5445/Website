window.onload = setTimeout(Playlist_Load, 500);

var Playlist_Data = {};

function Playlist_Load() {
    var Playlist_ID = UF_Parameter_Get("Playlist");
    var Playlist_Index = Data_Import_FromPath("Playlists/Index_Playlists.json");
    console.log(Playlist_Index);
    for (a = 0; a < Playlist_Index.length; a++) {
        if (Playlist_Index[a].Playlist_ID == Playlist_ID) {
            Playlist_Data = Data_Import_FromPath(`Playlists/${Playlist_Index[a].Playlist_File}.json`);
            console.log(`Playlist with index file ${Playlist_Index[a].Playlist_File}.json found`);
            console.log(Playlist_Data);
            break;
        }
    }
    Element_InnerHTML_Set("Playlist_Title", Playlist_Data.Name);
    Element_InnerHTML_Set("Playlist_Description", Playlist_Data.Description);

    Element_Clear("Player_Playlist");
    console.log(Playlist_Data.List);
    for (a = Playlist_Data.List.length - 1; a >= 0; a--) {
        var Button_Data = Playlist_Data.List[a];
        var Button_InnerHTML = `
            <div class="Player_Playlist_Item_Decoration"></div>
            <div class="Player_Playlist_Item_Background"></div>
            <div class="Player_Playlist_Item_Thumbnail">
            <img class="Player_Playlist_Item_Thumbnail_Image" src="${Button_Data.Thumbnail}" draggable="false"
                loading="lazy" />
            </div>
            <p class="Player_Playlist_Item_Title_Alt">
                ${Button_Data.Name_Alt}
            </p>
            <h2 class="Player_Playlist_Item_Title">
                ${Button_Data.Name}
            </h2>
        `;
        var Button_Element = document.createElement("button");
        Button_Element.innerHTML = Button_InnerHTML;
        Button_Element.setAttribute("id", "Player_Playlist_Item_" + a);
        Button_Element.setAttribute("class", "Player_Playlist_Item");
        Button_Element.setAttribute("Index", a);
        Button_Element.setAttribute("Link", Button_Data.Video);
        Button_Element.setAttribute("onclick", "Playlist_Play(this.id)");
        Element_Append("Player_Playlist", Button_Element);
    }
}

function Playlist_Play(ID) {
    var Video_Link = Element_Attribute_Get(ID, "Link");
    Element_Attribute_Set("Player_Content_Video", "src", Link_Transform(Video_Link));
    var Video_Index = Element_Attribute_Get(ID, "Index");
    var Video_Data = Playlist_Data.List[Video_Index];
    console.log(Video_Index);
    console.log(Video_Data);
    Element_InnerHTML_Set("Player_Content_Details_Title_Alt", Video_Data.Name_Alt);
    Element_InnerHTML_Set("Player_Content_Details_Title", Video_Data.Name);
    Element_InnerHTML_Set("Player_Content_Details_Description", Video_Data.Description);

    for (a = 0; a < document.querySelectorAll(".Player_Playlist_Item").length; a++) {
        document.querySelectorAll(".Player_Playlist_Item")[a].setAttribute("State", "Inactive");
    }

    Element_Attribute_Set(ID, "State", "Active");   
}

function Link_Transform(Link) {
    return `https://www.youtube.com/embed/${Link.split("/").pop()}?autoplay=1`;
}

function Playlist_Description_Toggle() {
    if (Element_Attribute_Get("Player_Content_Toggle", "State") == "Active" || Element_Attribute_Get("Player_Content_Toggle", "State") == null) {
        Element_Attribute_Set("Player_Content_Toggle", "State", "Inactive");
        Element_Attribute_Set("Player_Content_Details_Description", "State", "Inactive");
    } else {
        Element_Attribute_Set("Player_Content_Toggle", "State", "Active");
        Element_Attribute_Set("Player_Content_Details_Description", "State", "Active");
    }
    
}