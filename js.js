//onload stuff ******************************************
//set height of elements
window.onload = function() {
	var setHeight = window.innerHeight;
	var skills = document.getElementById("Skills");
	var About = document.getElementById("About");
	var ServicesHead = document.getElementById("ServicesHead");
	var Services = document.getElementById("Services");
	var Services2 = document.getElementById("Services2");
	var projectwrap = document.querySelectorAll(".projectwrap");
	skills.style.top = setHeight + 'px';
	About.style.top = setHeight + 'px';
	ServicesHead.style.top = setHeight + 'px';
	Services.style.top = setHeight + 'px';
	Services2.style.top = setHeight + 'px';
	projectwrap[0].style.top = setHeight + 'px';

}
// NAV BUTTON ******************************************
var navButton = document.getElementById("NavButton");
navButton.addEventListener('click', showMenu, false);
function showMenu() {
	if (skillsButton.style.bottom == "0px") {
		skillsButton.style.bottom = "70px";
		github.style.bottom = "70px";
		webapps.style.bottom = "70px";
	} else {
		skillsButton.style.bottom = "0px";
		github.style.bottom = "0px";
		webapps.style.bottom = "0px";
	}
}
// SKILLS BUTTON ******************************************
var skillsButton = document.getElementById("SkillsButton");
skillsButton.addEventListener('click', scrollToSkills, false);
function scrollToSkills() {
	var setHeight = window.innerHeight;
	var id = setInterval(frame, 1);
	var pos = 0;

	function frame() {
		if (pos >= setHeight) {
			clearInterval(id);
		} else {
			pos += 4;
			window.scrollTo(0, pos);
		}
	}
	skillsButton.style.bottom = "70px";
	github.style.bottom = "70px";
	webapps.style.bottom = "70px";
}
//
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
// GITHUB BUTTON ******************************************
var github = document.getElementById("github");
github.addEventListener('click', toGitHub, false);
function toGitHub() {
	window.location.assign("https://github.com/Jkeyuk");
}
// few web apps button*********************************
var webapps = document.getElementById("webApps");
webapps.addEventListener('click', toWebApps, false);
function toWebApps() {
	window.scrollTo(0, document.body.scrollHeight);
	skillsButton.style.bottom = "70px";
	github.style.bottom = "70px";
	webapps.style.bottom = "70px";
}
// progress bar animation stuff**********************
var bar = document.getElementsByClassName("bar");
for (i = 0; i <= bar.length; i++) {
	bar[i].addEventListener('mouseenter', progressBar, false);
}
function progressBar() {
	var bar = this;
	var innerBar = this.firstElementChild;
	var innerBarCounter = innerBar.clientWidth;
	var pos = 0;
	var id = setInterval(frame, 1);
	function frame() {
		if (pos >= innerBarCounter) {
			bar.addEventListener('mouseenter', progressBar, false);
			clearInterval(id);
		} else {
			pos += 3;
			innerBar.style.maxWidth = pos + 'px';
		}
	}
	bar.removeEventListener('mouseenter', progressBar, false);
}