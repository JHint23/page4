import { fetchTops } from '../modules/fetch/fetchTops.js';
import { renderTops } from '../modules/render/renderTops.js';
import { setupCardSearch } from '../modules/searchFilter.js';
import setupPagination from '../modules/ui/pagination.js';

document.addEventListener('DOMContentLoaded', async () => {
  const containerSelector = '#top-container';
  const paginationSelector = '#pagination';
  const searchInput = document.querySelector('.search-box input');
  const clearBtn = document.getElementById('clear-search');

  const topsData = await fetchTops();
  
  const paginator = setupPagination({
    data: topsData,
    renderFn: renderTops,
    containerSelector,
    paginationSelector, 
    itemsPerPage: 4
});

  setupCardSearch({
    inputElement: searchInput,
    clearButton: clearBtn,
    data: topsData,
    onFilter: paginator.setFilteredData
  });
});
