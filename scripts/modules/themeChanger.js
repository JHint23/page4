export function initThemeChanger() {
  const btn = document.getElementById('toggle-theme-btn');
  const iconContainer = document.getElementById('theme-icon');
  const root = document.documentElement;

  if (!btn || !iconContainer || !window.lottie) {
    console.warn('Botón, ícono o Lottie no disponibles');
    return;
  }

  const lottie = window.lottie;

  const animation = lottie.loadAnimation({
    container: iconContainer,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'media/icons8-sun.json'
  });

  const temaGuardado = localStorage.getItem('modo-tema');
  let modoOscuro = temaGuardado !== 'claro'; // predeterminado oscuro
  const temaInicial = modoOscuro ? 'oscuro' : 'claro';
  root.setAttribute('data-tema', temaInicial);

  animation.addEventListener('DOMLoaded', () => {
    animation.goToAndStop(modoOscuro ? 0 : 14, true);
  });

  btn.addEventListener('click', () => {
    modoOscuro = !modoOscuro;
    const nuevoModo = modoOscuro ? 'oscuro' : 'claro';

    root.setAttribute('data-tema', nuevoModo);
    localStorage.setItem('modo-tema', nuevoModo);

    animation.setDirection(modoOscuro ? -1 : 1);
    animation.playSegments(modoOscuro ? [14, 0] : [0, 14], true);
  });
}
