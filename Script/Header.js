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

document.addEventListener("DOMContentLoaded", function(){
  const HeaderHamburgerIcon = document.querySelector('.HeaderHamburgerIcon');
  const HeaderUl = document.querySelector('.HeaderUl');

  HeaderHamburgerIcon.addEventListener('click', function(){
    HeaderUl.classList.toggle("active");
  });

  // Close the mobile menu when a menu item is clicked
  const HeaderElements = document.querySelectorAll('.HeaderElement');
  HeaderElements.forEach(function(element) {
    element.addEventListener('click', function(){
      HeaderUl.classList.remove('active');
    });
  });
});


/*
document.addEventListener("DOMContentLoaded", function(){
  /**
   * This is an event listener that unables the Header nav
   * to display when the HeaderHamburgerIcon is clicked on smaller
   * screen sizes.
   *//*
  const HeaderHamburgerIcon = document.querySelector('.HeaderHamburger');
  const HeaderUl = document.querySelector('.HeaderUl');
  const HeaderNav = document.querySelector('.HeaderNav');
  let HeaderUlOpen = false;
  HeaderHamburgerIcon.addEventListener('click', function(){
    if(HeaderUlOpen === false){
      HeaderUl.style.display = 'block';
      HeaderUl.style.position = 'relative';
      HeaderUl.style.top = '20px';
      HeaderNav.style.backgroundColor = 'rgba(0, 26, 45, 0.931)';
      HeaderNav.style.transition =  'background-color ease 0.2s';
      HeaderUlOpen = true;
    }else{
      HeaderUl.style.display = 'none';
      HeaderNav.style.backgroundColor = 'transparent';
      HeaderNav.style.transition =  'background-color ease 0.2s';
      HeaderUlOpen = false;
    }
  });
});*/
