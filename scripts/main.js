// Importaciones de módulos
import setupMobileMenu from './modules/ui/mobileMenu.js';
import { setupEditarUsuario } from './modules/auth/editUserHandler.js';
import { setupAuthMenuEvents, openAuthMenu } from './modules/ui/authMenu.js';
import { mostrarUsuario } from './modules/ui/uiHandlers.js';
import { login, registrarse, subirImagenUsuario, borrarCuenta, cerrarSesion } from './modules/auth/authHandlers.js';
import { initThemeChanger } from './modules/themeChanger.js';
import { loadPartial } from './modules/partial.js';
import { initMatrixBackground } from './modules/ui/matrixBackground.js';

// 👉 Ajuste automático para GitHub Pages
function getBasePath() {
  const path = window.location.pathname;
  return path.endsWith('/') ? path : path.substring(0, path.lastIndexOf('/') + 1);
}

async function iniciarApp() {
  const loader = document.getElementById("loader");
  const contenido = document.getElementById("contenido");

  if (loader) loader.style.display = "flex";
  if (contenido) contenido.style.display = "none";
  document.body.style.overflow = "hidden";

  initMatrixBackground();

  const base = getBasePath(); // Detecta la base correcta
  await loadPartial('header', `${base}assets/header.html`);
  await loadPartial('auth-menu', `${base}assets/authMenu.html`);
  await loadPartial('footer', `${base}assets/footer.html`);

  setupAuthMenuEvents();

  document.querySelectorAll('.btn-open-login').forEach(button => {
    button.addEventListener('click', () => openAuthMenu('login'));
  });

  document.querySelectorAll('.btn-open-register').forEach(button => {
    button.addEventListener('click', () => openAuthMenu('register'));
  });

  document.querySelectorAll('.btn-login').forEach(button => {
    button.addEventListener('click', login);
  });

  document.querySelectorAll('.btn-logout').forEach(button => {
    button.addEventListener('click', cerrarSesion);
  });

  document.querySelectorAll('.btn-register').forEach(button => {
    button.addEventListener('click', registrarse);
  });

  const subirBtn = document.getElementById('btn-subir-imagen');
  if (subirBtn) {
    subirBtn.addEventListener('click', subirImagenUsuario);
  }

  setupMobileMenu();
  await mostrarUsuario();
  setupEditarUsuario();
  initThemeChanger();

  // Finalmente ocultar loader y mostrar contenido
  if (loader) loader.style.display = "none";
  if (contenido) contenido.style.display = "block";
  document.body.style.overflow = "auto";
}

document.addEventListener('DOMContentLoaded', iniciarApp);
