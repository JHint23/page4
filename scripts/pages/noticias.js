import { fetchNoticias } from '../modules/fetch/fetchNoticias.js';
import { renderNoticias } from '../modules/render/renderNoticias.js';
import { setupCardSearch } from '../modules/searchFilter.js';
import setupPagination from '../modules/ui/pagination.js';

document.addEventListener('DOMContentLoaded', async () => {
  const containerSelector = '#noticia-container';
  const paginationSelector = '#pagination';
  const searchInput = document.querySelector('.search-box input');
  const clearBtn = document.getElementById('clear-search');

  const noticiasData = await fetchNoticias();
  
  const paginator = setupPagination({
    data: noticiasData,
    renderFn: renderNoticias,
    containerSelector,
    paginationSelector, 
    itemsPerPage: 4
});

  setupCardSearch({
    inputElement: searchInput,
    clearButton: clearBtn,
    data: noticiasData,
    onFilter: paginator.setFilteredData
  });
});
