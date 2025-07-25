export default function setupPagination({ data, renderFn, containerSelector, paginationSelector, itemsPerPage = 6 }) {
  const container = document.querySelector(containerSelector);
  const pagination = document.querySelector(paginationSelector);
  let currentPage = 1;
  let filteredData = [...data];

  function renderPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    renderFn(container, filteredData.slice(start, end));
    updatePagination();
  }

  function updatePagination() {
  pagination.innerHTML = '';

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const maxVisibleButtons = 3;
  const half = Math.floor(maxVisibleButtons / 2);

  let startPage = Math.max(1, currentPage - half);
  let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

  // Ajustar si estamos cerca del final
  if (endPage - startPage < maxVisibleButtons - 1) {
    startPage = Math.max(1, endPage - maxVisibleButtons + 1);
  }

  // Botón ←
  if (currentPage > 1) {
    const prev = document.createElement('button');
    prev.textContent = '←';
    prev.className = 'pagination-btn';
    prev.addEventListener('click', () => {
      currentPage--;
      renderPage(currentPage);
    });
    pagination.appendChild(prev);
  }

  // Botones numerados
  for (let i = startPage; i <= endPage; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = 'pagination-btn';
    if (i === currentPage) btn.classList.add('active');
    btn.addEventListener('click', () => {
      currentPage = i;
      renderPage(currentPage);
    });
    pagination.appendChild(btn);
  }

  // Botón →
  if (currentPage < totalPages) {
    const next = document.createElement('button');
    next.textContent = '→';
    next.className = 'pagination-btn';
    next.addEventListener('click', () => {
      currentPage++;
      renderPage(currentPage);
    });
    pagination.appendChild(next);
  }
}


  function setFilteredData(newData) {
    filteredData = [...newData];
    currentPage = 1;
    renderPage(currentPage);
  }

  renderPage(currentPage);

  return { setFilteredData };
}
