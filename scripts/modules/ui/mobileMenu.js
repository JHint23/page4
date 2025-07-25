
export default function setupMobileMenu() {
  const navToggle = document.getElementById('menu-toggle');
  const userToggle = document.getElementById('nav-user-mb');
  const navMenu = document.getElementById('menu-nav-mb');
  const userMenu = document.getElementById('menu-user-mb');
  const icon = document.getElementById('nav-link-icon');

  const animation = lottie.loadAnimation({
    container: icon,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'media/icons8-menu.json'
  });


  animation.addEventListener('DOMLoaded', () => {
    animation.goToAndStop(0, true);
  });


  if (!navToggle || !userToggle || !navMenu || !userMenu || !icon) return;

  navToggle.addEventListener('click', () => {
    const wasOpen = navMenu.classList.contains('active');
    userMenu.classList.remove('active');
    navMenu.classList.toggle('active');
    if (wasOpen) {
      // Se está cerrando el menú
      animation.setDirection(-1);
      animation.playSegments([14, 0], true);
    } else {
      // Se está abriendo el menú
      animation.setDirection(1);
      animation.playSegments([0, 14], true);
    }
  });
  
  userToggle.addEventListener('click', () => {

    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
    }

    userMenu.classList.toggle('active');
  });
}
