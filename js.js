//event handlers
//NAV button handler
var logoButton = document.getElementById("LogoButton");
logoButton.addEventListener('click', logoButtonfunction, false);
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
}

function logoButtonfunction() {
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
