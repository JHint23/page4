export function renderTops(container, data) {
  if (!data || data.length === 0) {
    container.innerHTML = "<p>No hay tops disponibles.</p>";
    return;
  }

  container.innerHTML = "";

  data.forEach(({ imagen_url, titulo, descripcion, fecha, puntuacion, enlace }) => {
    let scoreClass = "f4";
    const score = parseInt(puntuacion, 10) || 0;
    const score10 = (score / 10).toFixed(1);

    if (score >= 85) {
      scoreClass = "f1";
    } else if (score >= 70) {
      scoreClass = "f2";
    } else if (score >= 55) {
      scoreClass = "f3";
    }

    const link = document.createElement("a");
    link.href = enlace;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.classList.add("top-card");
    link.style.display = "flex";

    link.innerHTML = `
      <div class="top-subcard ${scoreClass}">
        <div class="puntuacion">
          <div class="circle-1 ${scoreClass}">
            <div class="circle-2">
              <div class="score">${score10}</div>
            </div>
          </div>
        </div>
        <div class="content">
          <p class="title">${titulo}</p>
          <p class="text">${descripcion}</p>
          <p class="date">${new Date(fecha).toLocaleDateString()}</p>
        </div>
      </div>
      <img src="${imagen_url}" alt="${titulo}">
    `;

    container.appendChild(link);
  });
}
