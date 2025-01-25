var Slideshow_SlideNumber = 0;
var Slideshow_Speed = 5000;
var AutoStart_Slideshow = true;
var Slideshow_isPaused = false;


window.addEventListener('load', function(){
    if (AutoStart_Slideshow == true){
        Slideshow_Start();
        Slideshow_Loop();
    }
})

function Slideshow_Start(){
    Slideshow_Control = setInterval(Slideshow_Loop, Slideshow_Speed);
    Slideshow_TotalSlides = document.querySelectorAll(".Home_Section_Content_Featured_Item").length;
    console.log(Slideshow_TotalSlides);
    Slideshow_SlideNumber = 0;
    // document.querySelectorAll(".Home_Latest_Item")[0].style.opacity = "100%";
}

function Slideshow_Interrupt(ClickedSlide){
    Slideshow_isPaused = true;
    if (ClickedSlide != null){
        Slideshow_SlideNumber = ClickedSlide;
    }
    setTimeout(function(){
        Slideshow_isPaused = false
    }, 5000);
    // console.log("Slideshow interrupted");
}

function Slideshow_Stop(){
    clearInterval(Slideshow_Control);
}
var Slideshow_TotalSlides;
function Slideshow_Loop(){
    if (Slideshow_isPaused == false){
        // console.log(Slideshow_SlideNumber);
    //console.log("Slide number: " + Slideshow_SlideNumber);
    Tabs_ChangeTab_Specific(Slideshow_SlideNumber, "Home_Section_Content_Featured_1");
    if (Slideshow_SlideNumber >= Slideshow_TotalSlides - 1){
        Slideshow_SlideNumber = 0;
    } else {
        Slideshow_SlideNumber++;
    }
    }
} 

function Slideshow_Reset(){
    Slideshow_TotalSlides = document.querySelectorAll(".Home_Section_Content_Featured_Item").length;
    // for (a = 0; a != Slideshow_TotalSlides; a++){
    //     document.querySelectorAll(".Home_Latest_Item")[a].style.opacity = "0%";
    // }
    // document.querySelectorAll(".Home_Latest_Item")[0].style.opacity = "100%";
}