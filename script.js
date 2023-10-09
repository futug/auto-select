const burger = document.querySelector(".header__burger-menu");
const close = document.querySelector(".header__close");
const nav = document.querySelector(".header__nav-mobile");
burger.addEventListener("click", () => {
    nav.classList.add("header__nav-mobile--active");
});
close.addEventListener("click", () => {
    nav.classList.remove("header__nav-mobile--active");
});
