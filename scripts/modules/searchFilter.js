export function setupCardSearch({ inputElement, clearButton, data, onFilter }) {
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
    if (onFilter) {
      onFilter(data); // Restaura todos los datos
    }
  });
}
