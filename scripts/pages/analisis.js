import { fetchAnalisis } from '../modules/fetch/fetchAnalisis.js';
import { renderAnalisis } from '../modules/render/renderAnalisis.js';
import { setupCardSearch } from '../modules/searchFilter.js';
import setupPagination from '../modules/ui/pagination.js';

document.addEventListener("DOMContentLoaded", async () => {
  const containerSelector = '#analisis-container';
  const paginationSelector = '#pagination';
  const searchInput = document.querySelector(".search-box input");
  const clearBtn = document.getElementById("clear-search");

  const analisisData = await fetchAnalisis();

  const paginator = setupPagination({
    data: analisisData,
    renderFn: renderAnalisis,
    containerSelector,
    paginationSelector,
    itemsPerPage: 6
  });
  setupCardSearch({
    inputElement: searchInput,
    clearButton: clearBtn,
    data: analisisData,
    onFilter: paginator.setFilteredData
  });
});