var Slideshow_SlideNumber = 0;
var Slideshow_Speed = 8500;
var AutoStart_Slideshow = true;


window.addEventListener('load', function(){
    if (AutoStart_Slideshow == true){
        Slideshow_Start();
    }
})

function Slideshow_Start(){
    Slideshow_Control = setInterval(Slideshow_Loop, Slideshow_Speed);
    Slideshow_TotalSlides = document.querySelectorAll(".Home_Latest_Item").length;
    document.querySelectorAll(".Home_Latest_Item")[0].style.opacity = "100%";
}

function Slideshow_Stop(){
    clearInterval(Slideshow_Control);
}
var Slideshow_TotalSlides;
function Slideshow_Loop(){
    //console.log("Slide number: " + Slideshow_SlideNumber);
    Slideshow_TotalSlides = document.querySelectorAll(".Home_Latest_Item").length;
    document.querySelectorAll(".Home_Latest_Item")[Slideshow_SlideNumber].style.opacity = "100%";
    Slideshow_SlideNumber++;
    if (Slideshow_SlideNumber > Slideshow_TotalSlides - 1){
        Slideshow_SlideNumber = 0;
        Slideshow_Reset();
    }
} 

function Slideshow_Reset(){
    Slideshow_TotalSlides = document.querySelectorAll(".Home_Latest_Item").length;
    for (a = 0; a != Slideshow_TotalSlides; a++){
        document.querySelectorAll(".Home_Latest_Item")[a].style.opacity = "0%";
    }
    document.querySelectorAll(".Home_Latest_Item")[0].style.opacity = "100%";
}