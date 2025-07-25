import { supabaseClient } from '../../supabase.js';

export async function fetchRecursos() {
  const { data, error } = await supabaseClient
    .from('recursos')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error("Error cargando Recursos:", error);
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