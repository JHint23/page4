import { fetchGuias } from '../modules/fetch/fetchGuias.js';
import { renderGuias } from '../modules/render/renderGuias.js';
import { setupCardSearch } from '../modules/searchFilter.js';
import setupPagination from '../modules/ui/pagination.js';

document.addEventListener('DOMContentLoaded', async () => {
  const containerSelector = '#guias-container';
  const paginationSelector = '#pagination';
  const searchInput = document.querySelector('.search-box input');
  const clearBtn = document.getElementById('clear-search');

  const guiasData = await fetchGuias();

  const paginator = setupPagination({
    data: guiasData,
    renderFn: renderGuias,
    containerSelector,
    paginationSelector,
    itemsPerPage: 6
});

  setupCardSearch({
    inputElement: searchInput,
    clearButton: clearBtn,
    data: guiasData,
    onFilter: paginator.setFilteredData
  });
});
