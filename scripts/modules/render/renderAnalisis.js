export function renderAnalisis(container, data) {
  if (!data.length) {
    container.innerHTML = "<p>No hay análisis disponibles.</p>";
    return;
  }

  container.innerHTML = "";

  data.forEach(({ id,imagen_url, titulo, descripcion, fecha }) => {
    const card = document.createElement("a");
    card.classList.add("analisis-card");
    card.href = `post.html?tipo=analisis&id=${id}`;
    card.rel = "noopener noreferrer";
    card.style.display = "flex";
    

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
