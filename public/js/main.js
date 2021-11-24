var touchMove = [0, 0]
var lastTouch
var projectsIndex = 0
var projects = [
{
"title": "CENTRO EDUCATIVO MUNDO DE JUEGOS 1",
"description": "Esta página web fué desarrollada para un establecimiento educativo, con el objetivo de dar a conocer su propósito, misión, visión, y otras características de la institución. 1",
"link": "https://mundodejuegos.co"
},
{
"title": "CENTRO EDUCATIVO MUNDO DE JUEGOS 2",
"description": "Esta página web fué desarrollada para un establecimiento educativo, con el objetivo de dar a conocer su propósito, misión, visión, y otras características de la institución. 2",
"link": "https://mundodejuegos.co"
},
{
"title": "CENTRO EDUCATIVO MUNDO DE JUEGOS 3",
"description": "Esta página web fué desarrollada para un establecimiento educativo, con el objetivo de dar a conocer su propósito, misión, visión, y otras características de la institución. 3",
"link": "https://mundodejuegos.co"
},
{
"title": "CENTRO EDUCATIVO MUNDO DE JUEGOS 4",
"description": "Esta página web fué desarrollada para un establecimiento educativo, con el objetivo de dar a conocer su propósito, misión, visión, y otras características de la institución. 4",
"link": "https://mundodejuegos.co"
}
]

$(document).ready(function() {
    blinkDownScroll()

    //Wow animations
    new WOW({callback: revealFunction, live: true}).init();

    // Open menu button
    $("#responsiveMenuButton").on("click", function() {
        $("#headerButtonsContainer")[0].style.right = "0px"
        $("body")[0].style.overflowY = "hidden"
    })

    // Slide gesture to close menu
    $("#headerButtonsContainer")[0].addEventListener("touchstart", function(e) {
        touchMove = [0, 0]
        lastTouch = [e.touches[0].pageX, e.touches[0].pageY]
        $("#headerButtonsContainer")[0].addEventListener("touchmove", onTouchMove)
    })
    $("#headerButtonsContainer")[0].addEventListener("touchend", function(e) {
        if (touchMove[0] <= -100) {
            $("#headerButtonsContainer")[0].style.right = "-90%"
            $("#headerButtonsContainer")[0].removeEventListener("touchmove", onTouchMove)
            $("body")[0].style.overflowY = "auto"
        }
    })

    // Projects info
    $("#projectsLazyLoads").lazyload({treshold: 500, load: function() {
        loadFirstProjects()
    }})
})

// Custom animations
function revealFunction(e) {
    if (e.id == "projectsContainer") {
        setTimeout(function() {
            $(".arrowButton").animate({
                opacity: 1
            }, 500)
            $($(".card")[1]).animate({
                opacity: 1
            }, 1000)
            $($(".card")[0]).animate({
                left: "-150px"
            }, 500)
            $($(".card")[2]).animate({
                left: ($("#projectsContainer").width()+150).toString() + "px"
            }, 500, function() {
                $(".card")[2].style.left = "calc(100% + 150px)"
            })

            // Arrow buttons function
            $("#rightArrowButton").on("click", rightArrowFunction)
            $("#leftArrowButton").on("click", leftArrowFunction)

            // Slide gestures for projects
            $("#projectsContainer")[0].addEventListener("touchstart", function(e) {
                touchMove = [0, 0]
                lastTouch = [e.touches[0].pageX, e.touches[0].pageY]
                $("#projectsContainer")[0].addEventListener("touchmove", onTouchMove)
            })
            $("#projectsContainer")[0].addEventListener("touchend", function(e) {
                if (touchMove[0] <= -100) {
                    $("#rightArrowButton").click()
                }
                else if (touchMove[0] >= 100) {
                    $("#leftArrowButton").click()
                }
            })
        }, 200);
    }
}

var rightArrowFunction = function() {
    $("#rightArrowButton").off("click", rightArrowFunction)
    let newCard = createCard(false)
    newCard.style.left = "-700px"
    $("#projectsContainer")[0].insertBefore(newCard, $(".card")[0])

    $(".arrowButton").animate({
        opacity: 0
    }, 100).promise().done(function() {
        $($(".card")[0]).animate({
            left: "-150px"
        }, 1000)

        $($(".card")[1]).animate({
            top: "0px",
            left: "50%"
        }, 1000)
        $($(".card")[1]).find(".cardBlur").animate({
            opacity: "0%"
        }, 500)

        $($(".card")[2]).find(".cardBlur")[0].style.zIndex = "2"
        $($(".card")[2]).animate({
            top: "100px",
            left: ($("#projectsContainer").width()+150).toString() + "px"
        }, 1000)
        $($(".card")[2]).find(".cardBlur").animate({
            opacity: "60%"
        }, 500)

        $($(".card")[3]).animate({
            left: ($("#projectsContainer").width()+700).toString() + "px"
        }, 1000, function() {
            $($(".card")[1]).find(".cardBlur")[0].style.zIndex = "0"
            $(".card")[2].style.left = "calc(100% + 150px)"
            $($(".card")[3]).remove()
            $(".arrowButton").animate({
                opacity: 1
            }, 500).promise().done(function() {
                $("#rightArrowButton").on("click", rightArrowFunction)
            })
        })
    })
}

var leftArrowFunction = function() {
    $("#leftArrowButton").off("click", leftArrowFunction)
    let newCard = createCard(true)
    newCard.style.left = "calc(100% + 700px)"
    $("#projectsContainer")[0].appendChild(newCard)

    $(".arrowButton").animate({
        opacity: 0
    }, 100).promise().done(function() {
        $($(".card")[0]).animate({
            left: "-700px"
        }, 1000)

        $($(".card")[1]).animate({
            top: "100px",
            left: "-150px"
        }, 1000)
        $($(".card")[1]).find(".cardBlur")[0].style.zIndex = "2"
        $($(".card")[1]).find(".cardBlur").animate({
            opacity: "60%"
        }, 500)

        $($(".card")[2]).animate({
            top: "0px",
            left: "50%"
        }, 1000)
        $($(".card")[2]).find(".cardBlur").animate({
            opacity: "0%"
        }, 500)

        $($(".card")[3]).animate({
            left: ($("#projectsContainer").width()+150).toString() + "px"
        }, 1000, function() {
            $($(".card")[2]).find(".cardBlur")[0].style.zIndex = "0"
            $(".card")[3].style.left = "calc(100% + 150px)"
            $($(".card")[0]).remove()
            $(".arrowButton").animate({
                opacity: 1
            }, 500).promise().done(function() {
                $("#leftArrowButton").on("click", leftArrowFunction)
            })
        })
    })
}

function onTouchMove(e) {
    touchMove[0] = touchMove[0] + (lastTouch[0]-e.touches[0].pageX)
    touchMove[1] = touchMove[1] + (lastTouch[1]-e.touches[0].pageY)
    lastTouch = [e.touches[0].pageX, e.touches[0].pageY]
}

var blinkDownScroll = function() {
    $("#scrollDownCall").animate({
        opacity: "100%"
    }, 1000, function() {
        $("#scrollDownCall").animate({
            opacity: "50%"
        }, 1000, blinkDownScroll)
    })
}

function loadFirstProjects() {
    for (let i=0; i<=3; i++) {
        $($(".card")[i]).find(".cardTitle").text(projects[i].title)
        $($($(".card")[i]).find(".cardText")[0]).text(projects[i].description)
        $($(".card")[i]).find(".cardButton").attr("href", projects[i].link)
    }
}

function createCard(next) {
    let info
    if (next) {
        if (projectsIndex+3 >= projects.length) {
            info = projects[(projectsIndex+3)-projects.length]
        }
        else {
            info = projects[projectsIndex+3]
        }
        if (projectsIndex+1 > projects.length) {
            projectsIndex = (projectsIndex+1)-projects.length
        }
        else {
            projectsIndex += 1
        }
    }
    else {
        if (projectsIndex-1 < 0) {
            info = projects[projects.length + (projectsIndex-1)]
            projectsIndex = projects.length + (projectsIndex-1)
        }
        else {
            info = projects[projectsIndex-1]
            projectsIndex -= 1
        }
    }

    let card = document.createElement("div")
    card.className = "card"
    card.style.bottom = "0px"

    let background = document.createElement("div")
    background.className = "cardBackground"

    let blur = document.createElement("div")
    blur.className = "cardBlur"

    let title = document.createElement("h3")
    title.className = "cardTitle"
    $(title).text(info.title)
    background.appendChild(title)

    let cardInfo = document.createElement("div")
    cardInfo.className = "cardInfo"

    let text = document.createElement("p")
    text.className = "cardText"
    $(text).text(info.description)
    cardInfo.appendChild(text)
    background.appendChild(cardInfo)

    let button = document.createElement("a")
    button.className = "cardButton"
    button.href = info.link
    button.target = "_blank"

    let buttonText = document.createElement("p")
    buttonText.className = "p1TextButton cardText"
    $(buttonText).text("VER")
    button.appendChild(buttonText)
    background.appendChild(button)

    card.appendChild(background)
    card.appendChild(blur)

    return card
}

// Menu buttons functions
function hideResponsiveMenu() {
    if ($("#responsiveMenuButton").css("visibility") == "visible") {
        $("#headerButtonsContainer")[0].style.right = "-90%"
        $("body")[0].style.overflowY = "auto"
    }
}

function seeProjects() {
    let pos;
    try {
        pos = $("#projectsLazyLoads").offset().top;
    }
    catch (e) {
        pos = $("#projectsContainer").offset().top-200;
    }
    $("html, body").animate({
        scrollTop: pos
    }, 1000);
    hideResponsiveMenu();
}

function seeContactInfo() {
    $("html, body").animate({
        scrollTop: $("footer").offset().top
    }, 1000);
    hideResponsiveMenu();
}

function seeSkills() {
    $("html, body").animate({
        scrollTop: $("#skillsInfoContainer").offset().top
    }, 1000);
    hideResponsiveMenu();
}
