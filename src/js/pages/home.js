import { getFilters, getExercises, getExerciseById, updateRating } from '../core/api.js';
import { toast } from '../core/toast.js';
import { renderCategories, renderExercises } from '../ui/renderer.js';
import { renderPagination, setupPagination } from '../ui/pagination.js';
import { openModal, closeModal, renderExerciseModal, showRatingModal, hideRatingModal, getCurrentRating } from '../ui/modal.js';
import { addFavorite, removeFavorite, isFavorite } from '../services/favorites.js';
import { initQuote } from '../services/quote.js';
import { getItemsLimit } from '../utils/responsive.js';

const state = {
  view: 'categories',
  filter: 'Muscles',
  category: null,
  categoryFilter: null,
  keyword: '',
  page: 1,
};

function getLimit() {
  return getItemsLimit(state.view);
}

async function fetchAndRender() {
  const container = document.getElementById('exercises-container');

  try {
    const limit = getLimit();

    if (state.view === 'categories') {
      const filters = await getFilters({
        filter: state.filter,
        page: state.page,
        limit,
      });
      renderCategories(filters.results, 'exercises-container');
      renderPagination(filters.page ? Number(filters.page) : 1, filters.totalPages || 1);
    } else {
      const params = { limit, page: state.page };

      if (state.categoryFilter === 'Muscles') params.muscles = state.category.toLowerCase();
      else if (state.categoryFilter === 'Body parts') params.bodypart = state.category.toLowerCase();
      else if (state.categoryFilter === 'Equipment') params.equipment = state.category.toLowerCase();

      if (state.keyword) params.keyword = state.keyword;

      const exercises = await getExercises(params);
      renderExercises(exercises.results, 'exercises-container');
      renderPagination(exercises.page ? Number(exercises.page) : 1, exercises.totalPages || 1);
    }
  } catch (err) {
    console.error('Fetch error:', err);
    if (container) container.innerHTML = '<p class="error-message">Failed to load data. Please try again.</p>';
  }
}

function handlePageChange(newPage) {
  if (newPage && newPage !== state.page) {
    state.page = newPage;
    fetchAndRender();
  }
}

function setupResizeListener() {
  let timeoutId;
  let currentLimit = getLimit();

  window.addEventListener('resize', () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const newLimit = getLimit();
      if (newLimit !== currentLimit) {
        currentLimit = newLimit;
        state.page = 1;
        fetchAndRender();
      }
    }, 300);
  });
}

function setupFilterTabs() {
  const filterTabs = document.getElementById('filter-tabs');
  if (!filterTabs || filterTabs.dataset.listenerAttached === 'true') return;
  filterTabs.dataset.listenerAttached = 'true';

  filterTabs.addEventListener('click', async e => {
    const btn = e.target.closest('.tabs__btn');
    if (!btn) return;

    document.querySelectorAll('.tabs__btn').forEach(t => {
      t.classList.remove('tabs__btn--active');
      t.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('tabs__btn--active');
    btn.setAttribute('aria-selected', 'true');

    state.filter = btn.dataset.filter;
    state.view = 'categories';
    state.page = 1;
    state.keyword = '';
    state.category = null;

    hideExercisesHeader();
    await fetchAndRender();
  });
}

function showExercisesHeader(categoryName) {
  const sectionTitle = document.getElementById('section-title');
  const searchForm = document.getElementById('exercise-search-form');

  if (sectionTitle) {
    sectionTitle.innerHTML = `Exercises / <span class="filters__category-name">${categoryName}</span>`;
  }
  if (searchForm) {
    searchForm.classList.remove('is-hidden');
  }
}

function hideExercisesHeader() {
  const sectionTitle = document.getElementById('section-title');
  const searchForm = document.getElementById('exercise-search-form');
  const searchInput = document.getElementById('exercise-search-input');
  const clearBtn = document.getElementById('exercise-clear-btn');

  if (sectionTitle) sectionTitle.textContent = 'Exercises';
  if (searchForm) searchForm.classList.add('is-hidden');
  if (searchInput) searchInput.value = '';
  if (clearBtn) clearBtn.classList.add('is-hidden');
}

function setupExerciseSearch() {
  const searchForm = document.getElementById('exercise-search-form');
  const searchInput = document.getElementById('exercise-search-input');
  const clearBtn = document.getElementById('exercise-clear-btn');

  if (!searchForm || !searchInput || searchForm.dataset.listenerAttached === 'true') return;
  searchForm.dataset.listenerAttached = 'true';

  searchInput.addEventListener('input', () => {
    clearBtn.classList.toggle('is-hidden', !searchInput.value.trim());
  });

  clearBtn.addEventListener('click', async () => {
    searchInput.value = '';
    clearBtn.classList.add('is-hidden');
    searchInput.focus();
    state.keyword = '';
    state.page = 1;
    await fetchAndRender();
  });

  searchForm.addEventListener('submit', async e => {
    e.preventDefault();
    state.keyword = searchInput.value.trim();
    state.page = 1;
    await fetchAndRender();
  });
}

function setupExerciseModal(exerciseId) {
  const closeBtn = document.getElementById('modal-close-btn');
  if (closeBtn) {
    closeBtn.onclick = () => closeModal('exercise-modal');
  }

  const giveRatingBtn = document.getElementById('give-rating-btn');
  if (giveRatingBtn) {
    giveRatingBtn.onclick = () => {
      showRatingModal();
      setupRatingModal(exerciseId);
    };
  }

  const addToFavoritesBtn = document.getElementById('add-to-favorites-btn');
  if (addToFavoritesBtn) {
    const updateFavoriteButton = () => {
      if (isFavorite(exerciseId)) {
        addToFavoritesBtn.innerHTML = `
          <span class="btn__text">Remove from favorites</span>
          <svg width="20" height="20" aria-hidden="true">
            <use href="/img/sprite.svg#icon-trash"></use>
          </svg>
        `;
      } else {
        addToFavoritesBtn.innerHTML = `
          <span class="btn__text">Add to favorites</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 3.5C10 3.5 6.5 1 3.5 3.5C0.5 6 2 10 10 16.5C18 10 19.5 6 16.5 3.5C13.5 1 10 3.5 10 3.5Z" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        `;
      }
    };

    addToFavoritesBtn.onclick = async () => {
      if (isFavorite(exerciseId)) {
        removeFavorite(exerciseId);
      } else {
        const exercise = await getExerciseById(exerciseId);
        addFavorite(exercise);
      }
      updateFavoriteButton();
    };

    updateFavoriteButton();
  }
}

function setupRatingModal(exerciseId) {
  const closeBtn = document.getElementById('rating-modal-close-btn');
  if (closeBtn) {
    closeBtn.onclick = () => hideRatingModal();
  }

  const ratingForm = document.getElementById('rating-form');
  if (ratingForm) {
    ratingForm.onsubmit = async e => {
      e.preventDefault();

      if (!ratingForm.checkValidity()) {
        ratingForm.reportValidity();
        return;
      }

      const rating = getCurrentRating();
      const email = ratingForm.email.value.trim();
      const review = ratingForm.review?.value.trim() || '';

      try {
        await updateRating(exerciseId, rating, email, review);
        hideRatingModal();
        toast.success('Rating submitted successfully!');
      } catch (err) {
        console.error('Failed to submit rating:', err);
      }
    };
  }
}

function setupExerciseCards() {
  const container = document.getElementById('exercises-container');
  if (!container || container.dataset.listenerAttached === 'true') return;
  container.dataset.listenerAttached = 'true';

  container.addEventListener('click', async e => {
    const categoryCard = e.target.closest('.category-card');
    if (categoryCard) {
      e.preventDefault();
      const categoryName = categoryCard.dataset.name;
      const categoryFilter = categoryCard.dataset.filter;

      if (!categoryName) return;

      state.view = 'exercises';
      state.category = categoryName;
      state.categoryFilter = categoryFilter;
      state.page = 1;
      state.keyword = '';

      showExercisesHeader(categoryName);
      setupExerciseSearch();
      await fetchAndRender();
      return;
    }

    const startBtn = e.target.closest('.exercise-card__start');
    if (startBtn) {
      const exerciseId = startBtn.dataset.id;
      if (!exerciseId) return;

      try {
        const exercise = await getExerciseById(exerciseId);
        renderExerciseModal(exercise);
        openModal('exercise-modal');
        setupExerciseModal(exerciseId);
      } catch (err) {
        console.error(`Failed to fetch exercise details for ${exerciseId}:`, err);
      }
    }
  });
}

export async function initHomePage() {
  const mainContent = document.querySelector('.layout');

  try {
    await initQuote();
    await fetchAndRender();
  } catch (err) {
    console.error('Error initializing home page:', err);
  } finally {
    if (mainContent) {
      mainContent.classList.add('loaded');
    }
  }

  setupFilterTabs();
  setupExerciseCards();
  setupPagination(handlePageChange);
  setupResizeListener();
}
