window.addEventListener('DOMContentLoaded', Article_Fetch);

function Article_Fetch(){
    var Article_QueryString = window.location.search;
    var Article_QueryString_Parameters = new URLSearchParams(Article_QueryString);
    if (Article_QueryString_Parameters.get('article') != null){
        var Article_FileLocation = "Projects/" + Article_QueryString_Parameters.get('article') + ".cbe_ab";
        console.log(Article_FileLocation);
        Article_Load(Article_FileLocation);
    } else {
        let Data = {
            "Metadata": {
                "Article_Banner": "https://sticm-english-society.github.io/Website/Assets/Images/Placeholder.png",
                "Article_Title": "Error",
                "Article_Title_Height": "122px",
                "Article_Author": "",
                "Article_Category": "",
                "Article_PublishingDate": ""
            },
            "Contents": [
                {
                    "Type": "Primary_Title",
                    "Content": "The article could not be loaded."
                },
                {
                    "Type": "Secondary_Title",
                    "Content": "The file does not exist."
                }
            ]
        };
        AB_Renderer_Article_Render(Data);
    }
}

function Article_Load(IndexURL){
    const request = new XMLHttpRequest();
    request.open("GET", IndexURL, false);
    request.send();
    var Article_Data = JSON.parse(request.responseText);
    console.log(Article_Data);
    AB_Renderer_Article_Render(Article_Data);
}