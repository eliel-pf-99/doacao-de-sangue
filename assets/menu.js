var menu = document.querySelector("#menu");
var menu_options = document.querySelector("#options");
var options = document.querySelectorAll(".menu-option");
var img = document.querySelector(".invert")
var func_open = () => {
    menu.classList.toggle("open");
    menu_options.classList.toggle("open");
    img.classList.toggle("hidden")
}
menu.addEventListener('click', func_open);
for(var option of options){
    option.addEventListener('click', func_open);
}

