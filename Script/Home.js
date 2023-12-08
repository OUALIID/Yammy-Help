/*
document.addEventListener('DOMContentLoaded', function () {
  const AboutSection = document.querySelector('.AboutSection');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 170) {
      AboutSection.classList.remove('up');
      AboutSection.classList.add('down');
    } else {
      AboutSection.classList.remove('down');
      AboutSection.classList.add('up');
    }
  });
});
*/

let lastScrollTop = 0;

window.addEventListener("scroll", function () {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Scrolling down
        document.querySelector(".descending-image").classList.add("appear");
    } else {
        // Scrolling up
        document.querySelector(".descending-image").classList.remove("appear");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
}, false);

function navigateToRecipes() {
  window.location.href = "Recipes.html";
}

function navigateToGithub() {
  window.location.href = "https://github.com/";
}
