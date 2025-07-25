import { fetchRecursos } from '../modules/fetch/fetchRecursos.js';
import { renderRecursos } from '../modules/render/renderRecursos.js';
import { setupCardSearch } from '../modules/searchFilter.js';
import setupPagination from '../modules/ui/pagination.js';

document.addEventListener('DOMContentLoaded', async () => {
  const containerSelector = '#recursos-container';
  const paginationSelector = '#pagination';
  const searchInput = document.querySelector('.search-box input');
  const clearBtn = document.getElementById('clear-search');

  const recursosData = await fetchRecursos();

  const paginator = setupPagination({
    data: recursosData,
    renderFn: renderRecursos,
    containerSelector,
    paginationSelector,
    itemsPerPage: 6
  });

  setupCardSearch({
    inputElement: searchInput,
    clearButton: clearBtn,
    data: recursosData,
    onFilter: paginator.setFilteredData
  });
});
