let lastScrollTop = 0;

window.addEventListener("scroll", function () {
    /**
     * An event listener on the content image of the Home page.
     * It unables the image to apear on scroll.
     */
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
  /**
   * A function that redirects from the home to the recipes page
   * when the button is clicked.
   */
  window.location.href = "Recipes.html";
}

function navigateToGithub() {
  /**
   * A function that redirects from the home to github's repository
   * when the button is clicked.
   */
  window.location.href = "https://github.com/";
}
