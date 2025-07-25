export function renderRecursos(container, recursos) {
  container.innerHTML = '';

  if (!recursos.length) {
    container.innerHTML = '<p>No hay recursos disponibles.</p>';
    return;
  }

  recursos.forEach(({ imagen_url, titulo, descripcion, enlace, color_inicio, color_fin,}) => {
    const card = document.createElement('a');
    card.classList.add('recurso-card');
    card.href = enlace;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    
    const backgroundStyle = `linear-gradient(90deg,#${color_inicio} 0%, #${color_fin} 100%)`;
    card.style.background = backgroundStyle;

    card.innerHTML = `
      <img src="${imagen_url}" alt="${titulo}">
      <div class="content">
        <p class="title">${titulo}</p>
        <p class="subcontent">${descripcion}</p>
      </div>
    `;

    container.appendChild(card);
  });
}
