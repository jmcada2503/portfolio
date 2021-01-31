
function returnValueScroll(obj, key) {
    return ((obj[key+"-end"]-obj[key+"-start"])*$(document).scrollTop())/($(document).height()-window.innerHeight);
}

$(document).ready(function() {
    var sunAnimation = {"opacity-end":50, "left-end":-600, "bottom-end":(window.innerHeight-$("#sun").height())+700, "opacity-start":20, "left-start":-600, "bottom-start":-600};

    document.addEventListener("scroll", function() {
        
        //Animate sun
        console.log($(document).scrollTop());

        $("#sun").css({
            "left": (sunAnimation["left-start"]+returnValueScroll(sunAnimation, "left")).toString()+"px",
            "bottom": (sunAnimation["bottom-start"]+returnValueScroll(sunAnimation, "bottom")).toString()+"px",
            "opacity": (sunAnimation["opacity-start"]+returnValueScroll(sunAnimation, "opacity")).toString()+"%"
        });

    });
})
