import { supabaseClient } from '../../supabase.js';

export async function fetchGuias() {
  const { data, error } = await supabaseClient
    .from('guias')
    .select('*')
    .order('fecha', { ascending: false });

  if (error) {
    console.error("Error cargando guías:", error);
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