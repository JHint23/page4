export async function loadPartial(id, url) {
  try {
    console.log(`Intentando cargar ${url}`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error al cargar ${url}: ${res.statusText}`);
    const html = await res.text();
    const container = document.getElementById(id);
    if (container) {
      container.innerHTML = html;
      console.log(`Contenido insertado en #${id}`);
    } else {
      console.warn(`Elemento con ID ${id} no encontrado`);
    }
  } catch (error) {
    console.error('Error al cargar parcial:', error);
  }
}
