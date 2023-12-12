document.addEventListener('DOMContentLoaded', function () {
  /* This is an event listener on the HeaderNav.
   * It unables the background color when the user scrolls down.
   */
  const HeaderNav = document.getElementsByClassName('HeaderNav')[0];
  window.addEventListener('scroll', function () {
    if (window.scrollY > 0) {
      HeaderNav.classList.add('scrolled');
    } else {
      HeaderNav.classList.remove('scrolled');
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  /**
   * This is an event listener on the scroll button.
   * It unables vertical scroll when clicked and flips the icon
   * to unable vertical scroll in the upward direction.
   */
  const scrollButton = document.querySelector('.ScrollButton');
  window.addEventListener('scroll', function () {
    const scrolled = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    if (scrolled + windowHeight >= totalHeight) {
      scrollButton.classList.add('down');
    } else {
      scrollButton.classList.remove('down');
    }
  });

  scrollButton.addEventListener('click', function () {
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  });
});
