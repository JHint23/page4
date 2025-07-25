import { supabaseClient } from '../../supabase.js';

export async function fetchAnalisis() {
  const { data, error } = await supabaseClient
    .from('analisis')
    .select('*')
    .order('fecha', { ascending: false });

  if (error) {
    console.error("Error cargando análisis:", error);
    return [];
  }

  return data || [];

}export function setupCardSearch({ inputElement, clearButton, data, onFilter }) {
  function filtrarDatos() {
    const query = inputElement.value.toLowerCase();
    const resultados = data.filter(item =>
      item.titulo.toLowerCase().includes(query)
    );

    if (onFilter) {
      onFilter(resultados);
    }
  }

  inputElement.addEventListener("input", filtrarDatos);

  clearButton.addEventListener("click", () => {
    inputElement.value = "";
    onFilter(data); // Restaurar lista completa
  });
}