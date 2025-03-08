document.addEventListener('DOMContentLoaded', function(){
    Gallery_Generate();
    GetDynamicBatchSize();
});

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
        let Image_InnerHTML = `
            <img class="Gallery_Album_Section_Item_Image" src="${Image_Source}" loading="lazy"
                onload="this.setAttribute('Loaded', 'True'), this.parentNode.setAttribute('Loaded', 'True')" draggable="false"/>
        `;

        let Image_Item = Element_Create('button');
        Image_Item.setAttribute("class", "Gallery_Album_Section_Item");
        Image_Item.setAttribute("id", `Album_Section_${Album_Generation_Section}_${Album_Generation_Section_Images}`);
        Image_Item.setAttribute("onclick", `Image_Preview_Open('${Image_Source}', null)`);
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
