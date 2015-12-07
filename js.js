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
        if (pos >= 760) {
            clearInterval(id);
        } else {
            pos += 6;
            window.scrollTo(0, pos);
        }
    }
};

function logoButtonfunction() {
    window.scrollTo(0, 0);
}
