import { getExerciseById, updateRating } from '../core/api.js';
import { toast } from '../core/toast.js';
import { renderFavoritesList } from '../ui/renderer.js';
import { renderPagination, setupPagination } from '../ui/pagination.js';
import { openModal, closeModal, renderExerciseModal, showRatingModal, hideRatingModal, getCurrentRating } from '../ui/modal.js';
import { getFavorites, removeFavorite } from '../services/favorites.js';
import { initQuote } from '../services/quote.js';
import { getPerPage, usePagination } from '../utils/responsive.js';

const state = {
  page: 1,
};

function renderFavorites() {
  const container = document.getElementById('favorites-container');
  if (!container) return;

  const allFavorites = getFavorites();

  if (allFavorites.length === 0) {
    renderFavoritesList([], 'favorites-container');
    renderPagination(1, 1, 'favorites-pagination');
    return;
  }

  const perPage = getPerPage();
  const shouldPaginate = usePagination();
  const totalPages = shouldPaginate ? Math.ceil(allFavorites.length / perPage) : 1;

  if (state.page > totalPages) {
    state.page = totalPages;
  }

  const startIndex = shouldPaginate ? (state.page - 1) * perPage : 0;
  const endIndex = shouldPaginate ? startIndex + perPage : allFavorites.length;
  const favorites = allFavorites.slice(startIndex, endIndex);

  renderFavoritesList(favorites, 'favorites-container');

  if (shouldPaginate) {
    renderPagination(state.page, totalPages, 'favorites-pagination');
  }
}

function handlePageChange(newPage) {
  if (newPage && newPage !== state.page) {
    state.page = newPage;
    renderFavorites();
  }
}

function setupResizeListener() {
  let timeoutId;
  let currentPerPage = getPerPage();

  window.addEventListener('resize', () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const newPerPage = getPerPage();
      if (newPerPage !== currentPerPage) {
        currentPerPage = newPerPage;
        state.page = 1;
        renderFavorites();
      }
    }, 300);
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
    addToFavoritesBtn.innerHTML = `
      <span class="btn__text">Remove from favorites</span>
      <svg width="20" height="20" aria-hidden="true">
        <use href="/img/sprite.svg#icon-trash"></use>
      </svg>
    `;

    addToFavoritesBtn.onclick = () => {
      removeFavorite(exerciseId);
      closeModal('exercise-modal');
      renderFavorites();
    };
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

function setupEventDelegation() {
  const container = document.getElementById('favorites-container');
  if (!container || container.dataset.listenerAttached === 'true') return;
  container.dataset.listenerAttached = 'true';

  container.addEventListener('click', async e => {
    const deleteBtn = e.target.closest('.exercise-card__delete-btn');
    if (deleteBtn) {
      e.stopPropagation();
      const exerciseId = deleteBtn.dataset.id;
      if (exerciseId) {
        removeFavorite(exerciseId);
        renderFavorites();
      }
      return;
    }

    const startBtn = e.target.closest('.exercise-card__start');
    if (startBtn) {
      e.stopPropagation();
      const exerciseId = startBtn.dataset.id;
      if (!exerciseId) return;

      try {
        const exercise = await getExerciseById(exerciseId);
        renderExerciseModal(exercise);
        openModal('exercise-modal');
        setupExerciseModal(exerciseId);
      } catch (err) {
        console.error('Failed to fetch exercise details:', err);
      }
    }
  });
}

export async function initFavoritesPage() {
  const favoritesPage = document.querySelector('.page--favorites');

  try {
    await initQuote();
    renderFavorites();
    setupEventDelegation();
    setupPagination(handlePageChange, 'favorites-pagination');
    setupResizeListener();
  } catch (err) {
    console.error('Error initializing favorites page:', err);
  } finally {
    if (favoritesPage) favoritesPage.classList.add('loaded');
  }
}
