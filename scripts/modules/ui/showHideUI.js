// Simulamos si el usuario está logeado (cambia esto a true o false para probar)
const IS_LOGGED_IN = false;

// Mostrar/Ocultar elementos según estado de login
export function updateAuthUI() {
  const preLoginElements = document.querySelectorAll('.pre-login');
  const postLoginElements = document.querySelectorAll('.post-login');

  preLoginElements.forEach(el => {
    el.style.display = IS_LOGGED_IN ? 'none' : '';
  });

  postLoginElements.forEach(el => {
    el.style.display = IS_LOGGED_IN ? '' : 'none';
  });
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  updateAuthUI();
});
