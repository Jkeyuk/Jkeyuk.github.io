//NAV BUTTON ******************************************
var navButton = document.getElementById("NavButton");
navButton.addEventListener('click', showMenu, false);

function showMenu() {
        if (skillsButton.style.bottom == "0px") {
            skillsButton.style.bottom = "70px";
            codePen.style.bottom = "70px";
        } else {
            skillsButton.style.bottom = "0px";
            codePen.style.bottom = "0px";
        }
    }
    //SKILLS BUTTON ******************************************
var skillsButton = document.getElementById("SkillsButton");
skillsButton.addEventListener('click', scrollToSkills, false);

function scrollToSkills() {
    var pos = 0;
    var id = setInterval(frame, 1);

    function frame() {
        if (window.innerWidth < 1400) {
            if (pos >= 750) {
                clearInterval(id);
            } else {
                pos += 5;
                window.scrollTo(0, pos);
            }
        } else {
            if (pos >= 970) {
                clearInterval(id);
            } else {
                pos += 6;
                window.scrollTo(0, pos);
            }
        }
    }
    skillsButton.style.bottom = "70px";
    codePen.style.bottom = "70px";
}

function scrollToTop() {
        var pos = window.pageYOffset;
        var id = setInterval(frame, 1);

        function frame() {
            if (pos <= 0) {
                clearInterval(id);
            } else {
                pos -= 5;
                window.scrollBy(0, -5);
            }
        }
    }
    //codePen BUTTON ******************************************
var codePen = document.getElementById("codePen");
codePen.addEventListener('click', toCodePen, false);

function toCodePen() {
    window.location.assign("http://codepen.io/Jkeyuk/");
}
