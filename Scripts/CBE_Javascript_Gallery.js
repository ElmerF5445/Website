document.addEventListener('DOMContentLoaded', Gallery_Generate);

var Album_Parameter;
var Album_File;
var Album_Data;
function Gallery_Generate(){
    Album_Parameter = UF_Parameter_Get("Album");
    Album_File = `Index_Gallery_${Album_Parameter}.json`;
    Album_Data = Data_Import_FromPath(`Gallery/${Album_File}`, 'JSON');
    Element_InnerHTML_Set("Subpage_Banner_Title", Album_Data.Album_Name);
    for (a = 0; a < Album_Data.Album_Contents.length; a++){
        console.log(`Creating section ${a}...`);
        var Album_Section = Album_Data.Album_Contents[a];
        var Album_Section_Contents = Album_Section.Section_Contents;
        var Album_Section_InnerHTML;
        Album_Section_InnerHTML = `
                <h1 class="General_Title">
                    ${Album_Section.Section_Name}
                </h1>
                <div class="Gallery_Album_Section" Type="${Album_Section.Section_Mode}" id="Album_Section_${a}">

                </div>
            `;
        var Album_Section_Item = Element_Create('div');
        Album_Section_Item.innerHTML = Album_Section_InnerHTML;
        Element_Append("Gallery_Album", Album_Section_Item);

        for (b = 0; b < Album_Section_Contents.length; b++){
            console.log(`Creating section ${a} image ${b}...`);
            var Image_Source = Album_Section_Contents[b].Image_Thumbnail;
            var Image_InnerHTML = `
                <img class="Gallery_Album_Section_Item_Image" src="${Image_Source}" loading="lazy" onload="this.setAttribute('Loaded', 'True'), this.parentNode.setAttribute('Loaded', 'True')" draggable="false"/>
            `;
            var Image_Item = Element_Create('button');
            Image_Item.setAttribute("class", "Gallery_Album_Section_Item");
            Image_Item.setAttribute("id", `Album_Section_${a}_${b}`);
            Image_Item.setAttribute("onclick", `Image_Preview_Open('${Image_Source}', null)`);
            Image_Item.innerHTML = Image_InnerHTML;
            Element_Append(`Album_Section_${a}`, Image_Item);
        }
    }
    // setTimeout(Image_Preview_Add, 1000);
    // Image_Preview_Add();
}