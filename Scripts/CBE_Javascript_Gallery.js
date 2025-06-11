document.addEventListener('DOMContentLoaded', function(){
    if (UI_PageName == "CBE_Gallery.html"){
        Gallery_Generate();
        GetDynamicBatchSize();
    }
    if ((path == "/Gallery/index.html" || path == "/Gallery/") || (path == "/Website/Gallery/index.html" || path == "/Website/Gallery/")){
        Gallery_Home_Sections_Generate();
    }
});

var Home_Data;
function Gallery_Home_Sections_Generate(){
    Scroll_ToPosition('top');
    Home_Data = Data_Import_FromPath(`Gallery/Index_Gallery.json`, 'JSON');
    Element_Clear("Gallery_Home");
    Element_Attribute_Set("Gallery_Home_Header", "State", "Inactive");
    Element_Attribute_Set("Gallery_Home", "State", "Active");
    Element_Attribute_Set("Gallery_Albums", "State", "Inactive");
    for (a = 0; a <= Home_Data.length; a++){
        var Item = Home_Data[a];
        console.log(Item.Section_Thumbnail);
        var Item_InnerHTML = ``;
        if (Item.Section_StraightToRenderer == true){
            Item_InnerHTML = `
                <div class="Gallery_Home_Section_Decoration" Position="Top">
                    <span class="Gallery_Home_Section_Decoration_Component" Length="Short"></span>
                    <span class="Gallery_Home_Section_Decoration_Component" Length="Long"></span>
                </div>
                <div class="Gallery_Home_Section_Decoration" Position="Bottom">
                    <span class="Gallery_Home_Section_Decoration_Component" Length="Short"></span>
                    <span class="Gallery_Home_Section_Decoration_Component" Length="Long"></span>
                </div>
                <div class="Gallery_Home_Section_Decoration_Border"></div>
                
                <div class="Gallery_Home_Section_Preview">
                    <img src="${Item.Section_Thumbnail}" loading="lazy" class="Gallery_Home_Section_Preview_Image"/>
                </div>
                <div class="Gallery_Home_Section_Content">
                <h1 class="Gallery_Home_Section_Content_Title">
                    ${Item.Section_Name}
                </h1>
                <h4 class="Gallery_Home_Section_Content_Description">
                    ${Item.Section_Description}
                </h4>
                <button class="Gallery_Home_Section_Content_Button" onclick="Page_ChangePage('Gallery/CBE_Gallery.html?Album=${Item.Section_StraightToRenderer_Album}', Transition)">
                    Check it out
                    <div class="Gallery_Home_Section_Content_Button_Arrow">
                    <div class="Arrow" Right>
                        <div class="Arrow_Container">
                        <span class="Arrow_Base_Dot"></span>
                        <span class="Arrow_Base"></span>
                        <span class="Arrow_Left"></span>
                        <span class="Arrow_Right"></span>
                        </div>
                    </div>
                </button>
                </div>
            `;
        } else {
            Item_InnerHTML = `
                <div class="Gallery_Home_Section_Decoration" Position="Top">
                    <span class="Gallery_Home_Section_Decoration_Component" Length="Short"></span>
                    <span class="Gallery_Home_Section_Decoration_Component" Length="Long"></span>
                </div>
                <div class="Gallery_Home_Section_Decoration" Position="Bottom">
                    <span class="Gallery_Home_Section_Decoration_Component" Length="Short"></span>
                    <span class="Gallery_Home_Section_Decoration_Component" Length="Long"></span>
                </div>
                <div class="Gallery_Home_Section_Decoration_Border"></div>
                
                <div class="Gallery_Home_Section_Preview">
                    <img src="${Item.Section_Thumbnail}" loading="lazy" class="Gallery_Home_Section_Preview_Image"/>
                </div>
                <div class="Gallery_Home_Section_Content">
                <h1 class="Gallery_Home_Section_Content_Title">
                    ${Item.Section_Name}
                </h1>
                <h4 class="Gallery_Home_Section_Content_Description">
                    ${Item.Section_Description}
                </h4>
                <button class="Gallery_Home_Section_Content_Button" onclick="Gallery_Home_Albums_Generate(${a})">
                    Check it out
                    <div class="Gallery_Home_Section_Content_Button_Arrow">
                    <div class="Arrow" Right>
                        <div class="Arrow_Container">
                        <span class="Arrow_Base_Dot"></span>
                        <span class="Arrow_Base"></span>
                        <span class="Arrow_Left"></span>
                        <span class="Arrow_Right"></span>
                        </div>
                    </div>
                </button>
                </div>
            `;
        }
        
        var Item_Element = Element_Create("div");
        Item_Element.setAttribute("class", "Gallery_Home_Section");
        Item_Element.innerHTML = Item_InnerHTML;
        Element_Append("Gallery_Home", Item_Element);
    }
    
}

function Gallery_Home_Albums_Generate(ID){
    Scroll_ToPosition('top')
    Element_Attribute_Set("Gallery_Home_Header", "State", "Active");
    Element_Attribute_Set("Gallery_Home", "State", "Inactive");
    Element_Attribute_Set("Gallery_Albums", "State", "Active");
    Element_Clear("Gallery_Albums");
    var Album_Data = Home_Data[ID].Section_Albums;
    console.log(Album_Data);
    Element_InnerHTML_Set("Gallery_Home_Header_Title", Home_Data[ID].Section_Name);
    Element_InnerHTML_Set("Gallery_Home_Header_Description", Home_Data[ID].Section_Description);
    for (a = 0; a <= Album_Data.length; a++){
        var Item = Album_Data[a];
        var Item_InnerHTML = `
            <div class="Gallery_Album_Item_Decorations" Corner="TopRight">
                <span class="Gallery_Album_Item_Decoration_Component" Size="Short"></span>
                <span class="Gallery_Album_Item_Decoration_Component" Size="Long"></span>
            </div>
            <div class="Gallery_Album_Item_Decorations" Corner="BottomLeft">
                <span class="Gallery_Album_Item_Decoration_Component" Size="Short"></span>
                <span class="Gallery_Album_Item_Decoration_Component" Size="Long"></span>
            </div>
            <div class="Gallery_Album_Item_Decoration_Border"></div>
            <div class="Gallery_Album_Item_Thumbnail">
                <img src="${Item.Album_Thumbnail}" class="Gallery_Album_Item_Thumbnail_Image" draggable="false" loading="lazy"/>
            </div>
            <div class="Gallery_Album_Item_Content">
                <h3 class="Gallery_Album_Item_Content_Title">
                    ${Item.Album_Name}
                </h3>
            </div>
        `;
        var Item_Element = Element_Create("div");
        Item_Element.innerHTML = Item_InnerHTML;
        Item_Element.setAttribute("class", "Gallery_Album_Item");
        Item_Element.setAttribute("onclick", `Page_ChangePage('Gallery/CBE_Gallery.html?Album=${Item.Album_Link}', Transition)`);
        Element_Append("Gallery_Albums", Item_Element);
    }
}

var Album_Parameter;
var Album_File;
var Album_Data;
var Album_Generation_Section = 0;
var Album_Generation_Section_Images = 0;
var Album_Generation_Max_Section = 0;
var Album_Generation_Max_Section_Images = 0;

function Gallery_Generate() {
    Album_Parameter = UF_Parameter_Get("Album");
    Album_File = `Index_Gallery_${Album_Parameter}.json`;
    Album_Data = Data_Import_FromPath(`Gallery/${Album_File}`, 'JSON');
    Element_InnerHTML_Set("Subpage_Banner_Title", Album_Data.Album_Name);

    Album_Generation_Max_Section = Album_Data.Album_Contents.length;

    // Create sections without images
    for (let a = 0; a < Album_Generation_Max_Section; a++) {
        console.log(`Creating section ${a}...`);
        var Album_Section = Album_Data.Album_Contents[a];

        var Album_Section_InnerHTML = `
            <h1 class="General_Title">
                ${Album_Section.Section_Name}
            </h1>
            <div class="Gallery_Album_Section" Type="${Album_Section.Section_Mode}" id="Album_Section_${a}">
            </div>
        `;

        var Album_Section_Item = Element_Create('div');
        Album_Section_Item.innerHTML = Album_Section_InnerHTML;
        Element_Append("Gallery_Album", Album_Section_Item);
    }

    // Start by loading the first batch of images in the first section
    LoadNextBatch();
    LoadNextBatch();
    LoadNextBatch();
}

// Calculate the number of images to load based on screen size
function GetDynamicBatchSize() {
    let viewportHeight = window.innerHeight;
    let estimatedImageHeight = 150; // Adjust based on your image size
    return Math.max(6, Math.ceil((viewportHeight * 1.5) / estimatedImageHeight)); // Ensure at least 6 images
}

// Load the next batch of images
function LoadNextBatch() {
    if (Album_Generation_Section >= Album_Generation_Max_Section) return; // All sections loaded

    let Album_Section = Album_Data.Album_Contents[Album_Generation_Section];
    let Album_Section_Contents = Album_Section.Section_Contents;
    let sectionElement = document.getElementById(`Album_Section_${Album_Generation_Section}`);

    let imagesPerBatch = GetDynamicBatchSize();

    for (let i = 0; i < imagesPerBatch; i++) {
        if (Album_Generation_Section_Images >= Album_Section_Contents.length) {
            // If all images in this section are loaded, move to the next section
            Album_Generation_Section++;
            Album_Generation_Section_Images = 0;
            LoadNextBatch();
            return;
        }

        let Image_Source = Album_Section_Contents[Album_Generation_Section_Images].Image_Thumbnail;
        let Image_Title = Album_Section_Contents[Album_Generation_Section_Images].Title;
        let Image_InnerHTML = `
            <img class="Gallery_Album_Section_Item_Image" src="${Image_Source}" loading="lazy"
                onload="this.setAttribute('Loaded', 'True'), this.parentNode.setAttribute('Loaded', 'True')" draggable="false"/>
        `;

        let Image_Item = Element_Create('button');
        Image_Item.setAttribute("class", "Gallery_Album_Section_Item");
        Image_Item.setAttribute("id", `Album_Section_${Album_Generation_Section}_${Album_Generation_Section_Images}`);
        Image_Item.setAttribute("onclick", `Image_Preview_Open('${Image_Source}', null, "${Image_Title}")`);
        Image_Item.innerHTML = Image_InnerHTML;
        sectionElement.appendChild(Image_Item);

        Album_Generation_Section_Images++;
    }
}

// Scroll event to detect when to load the next batch
window.addEventListener('scroll', function () {
    let scrollPosition = window.scrollY + window.innerHeight;
    let documentHeight = document.documentElement.scrollHeight;

    // If the user is 300px from the bottom, load more images
    if (documentHeight - scrollPosition < 300) {
        LoadNextBatch();
    }
});

// Resize event to adjust batch size dynamically on screen changes
window.addEventListener('resize', function () {
    LoadNextBatch();
});
