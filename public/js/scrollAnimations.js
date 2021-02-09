
function returnValueScroll(obj, key, min, max) {
    return ((obj[key+"-end"]-obj[key+"-start"])*($(document).scrollTop()-min))/(max-min);
}

$(document).ready(function() {
    var sunAnimation = {"status":0};
    var earthAnimation = {"status":0};

    document.addEventListener("scroll", function() {
        
        //Animate sun
        if ($(document).scrollTop()<=2000) {
            if ($(document).scrollTop()<1000) {
                if (sunAnimation["status"]!=1) {
                    sunAnimation = {"left-end":-400, "bottom-end":(window.innerHeight-$("#sun").height())/2, "left-start":-600, "bottom-start":-600, "status":1};
                }
                $("#sun").css({
                    "left": (sunAnimation["left-start"]+returnValueScroll(sunAnimation, "left", 0, 1000)).toString()+"px",
                    "bottom": (sunAnimation["bottom-start"]+returnValueScroll(sunAnimation, "bottom", 0, 1000)).toString()+"px",
                });
            }
            else {
                if (sunAnimation["status"]!=2) {
                    sunAnimation = {"left-end":-600, "bottom-end":window.innerHeight, "left-start":-400, "bottom-start":(window.innerHeight-$("#sun").height())/2, "status":2}
                }
                $("#sun").css({
                    "left": (sunAnimation["left-start"]+returnValueScroll(sunAnimation, "left", 1000, 2000)).toString()+"px",
                    "bottom": (sunAnimation["bottom-start"]+returnValueScroll(sunAnimation, "bottom", 1000, 2000)).toString()+"px",
                });
            }
        }

        // Animate earth
        if ($(document).scrollTop() > 1000 && $(document).scrollTop() <= 3200) {
            if ($(document).scrollTop()<=2000) {
                if (earthAnimation["status"]!=1) {
                    earthAnimation = {"right-end":100, "top-end":(window.innerHeight-$("#earth").height())/2, "right-start":-100, "top-start":(10*window.innerHeight)/100, "status":1};
                }
                $("#earth").css({
                    "right": (earthAnimation["right-start"]+returnValueScroll(earthAnimation, "right", 1000, 2000)).toString()+"px",
                    "top": (earthAnimation["top-start"]+returnValueScroll(earthAnimation, "top", 1000, 2000)).toString()+"px"
                });
            }
            else {
                if (earthAnimation["status"]!=2) {
                    earthAnimation = {"right-end":-1*($("#earth").width()), "top-end":(10*window.innerHeight)/100, "right-start":100, "top-start":(window.innerHeight-$("#earth").height())/2, "status":2};
                }
                $("#earth").css({
                    "right": (earthAnimation["right-start"]+returnValueScroll(earthAnimation, "right", 2000, 3000)).toString()+"px",
                    "top": (earthAnimation["top-start"]+returnValueScroll(earthAnimation, "top", 2000, 3000)).toString()+"px"
                });
            }
        }

    });
})
