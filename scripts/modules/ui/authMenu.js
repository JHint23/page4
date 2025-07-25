// authMenu.js

function getAuthElements() {
  const authWrapper = document.querySelector('.auth-wrapper');
  const blurOverlay = authWrapper?.querySelector('.blur-overlay');
  const loginMenu = authWrapper?.querySelector('.login-menu');
  const registerMenu = authWrapper?.querySelector('.create-acount-menu');
  return { authWrapper, blurOverlay, loginMenu, registerMenu };
}

function closeOtherMenus() {
  const navMenu = document.getElementById('menu-nav-mb');
  const userMenu = document.getElementById('menu-user-mb');
  const icon = document.getElementById('nav-link-icon');

  if (navMenu?.classList.contains('active')) {
    navMenu.classList.remove('active');
    icon?.classList.remove('active');
    icon?.classList.add('bi-list');
    icon?.classList.remove('bi-x');
  }

  if (userMenu?.classList.contains('active')) {
    userMenu.classList.remove('active');
  }
}

export function openAuthMenu(mode = 'login') {
  const { authWrapper, blurOverlay, loginMenu, registerMenu } = getAuthElements();
  if (!authWrapper || !blurOverlay || !loginMenu || !registerMenu) return;

  closeOtherMenus();

  blurOverlay.classList.add('active');
  authWrapper.classList.add('active');

  loginMenu.classList.remove('active');
  registerMenu.classList.remove('active');

  if (mode === 'login') {
    loginMenu.classList.add('active');
  } else {
    registerMenu.classList.add('active');
  }
}

export function closeAuthMenu() {
  const { authWrapper, blurOverlay, loginMenu, registerMenu } = getAuthElements();
  if (!authWrapper || !blurOverlay || !loginMenu || !registerMenu) return;

  blurOverlay.classList.remove('active');
  loginMenu.classList.remove('active');
  registerMenu.classList.remove('active');
  authWrapper.classList.remove('active');
}

export function setupAuthMenuEvents() {
  const { authWrapper, blurOverlay, loginMenu, registerMenu } = getAuthElements();

  if (!authWrapper) return;

  // Botones atrás
  authWrapper.querySelectorAll('.back').forEach(btn => {
    btn.addEventListener('click', () => {
      closeAuthMenu();
    });
  });

  // Botones para cambiar entre login y registro
  authWrapper.querySelectorAll('.change').forEach(btn => {
    btn.addEventListener('click', () => {
      loginMenu?.classList.toggle('active');
      registerMenu?.classList.toggle('active');
    });
  });

  // Cerrar al hacer clic fuera
  blurOverlay?.addEventListener('click', () => {
    closeAuthMenu();
  });
}
