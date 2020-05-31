//script voor hamburgermenu
var hamburger = document.querySelector('.hamburger');
var cross = document.querySelector('.cross');
var navigatie = document.querySelector('nav');
console.log(navigatie);

function active() {
    navigatie.classList.toggle('menu-items-active');
    hamburger.classList.toggle('display-none');
    cross.classList.toggle('display-none');
}

hamburger.addEventListener('click', active);
cross.addEventListener('click', active);