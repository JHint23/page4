export function renderGuias(container, guias) {
  container.innerHTML = '';

  if (!guias.length) {
    container.innerHTML = '<p>No hay guías disponibles.</p>';
    return;
  }

  guias.forEach(({ id,imagen_url, titulo, descripcion, fecha}) => {
    const card = document.createElement('a');
    card.classList.add('guias-card');
    card.href = `post.html?tipo=guias&id=${id}`;
    card.rel = 'noopener noreferrer';
    card.style.display = 'flex';

    card.innerHTML = `
      <img src="${imagen_url}" alt="${titulo}">
      <div class="desc-card">
        <p class="title">${titulo}</p>
        <p class="text">${descripcion}</p>
        <p class="date">Añadido el ${new Date(fecha).toLocaleDateString()}</p>
      </div>
    `;

    container.appendChild(card);
  });
}
