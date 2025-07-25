export function renderNoticias(container, noticias) {
  container.innerHTML = '';

  if (!noticias.length) {
    container.innerHTML = "<p>No hay Noticias disponibles.</p>";
    return;
  }

  noticias.forEach(({ id,imagen_url, titulo, descripcion, fecha }) => {
    const card = document.createElement("a");
    card.classList.add("noticias-card");
    card.rel = "noopener noreferrer";
    card.style.display = "flex";
    card.href = `post.html?tipo=noticias&id=${id}`;


    card.innerHTML = `
      <img src="${imagen_url}" alt="${titulo}">
      <div class="desc-card">
        <p class="title">${titulo}</p>
        <p class="text">${descripcion}</p>
        <p class="date">Publicado el ${new Date(fecha).toLocaleDateString()}</p>
      </div>
    `;

    container.appendChild(card);
  });
}
