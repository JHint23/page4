export async function loadPartial(id, url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error al cargar ${url}: ${res.statusText}`);
    const html = await res.text();
    const container = document.getElementById(id);
    if (container) container.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}
