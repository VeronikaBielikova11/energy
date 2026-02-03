import exerciseCardTemplate from '../../partials/exercise-card.html?raw';
import categoryCardTemplate from '../../partials/category-card.html?raw';
import favoritesEmptyTemplate from '../../partials/favorites-empty.html?raw';
import paginationTemplate from '../../partials/pagination.html?raw';

const templates = {
  'exercise-card': exerciseCardTemplate,
  'category-card': categoryCardTemplate,
  'favorites-empty': favoritesEmptyTemplate,
  pagination: paginationTemplate,
};

export function loadTemplate(templateName) {
  return templates[templateName] || '';
}

export function replacePlaceholders(template, data) {
  return template.replace(/\{\{(\w+)\}\}/g, (_match, key) => {
    return data[key] !== undefined ? data[key] : '';
  });
}

export function renderExercises(exercises, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (exercises.length === 0) {
    container.innerHTML = '<p class="no-results">No exercises found. Try another filter.</p>';
    return;
  }

  const template = loadTemplate('exercise-card');

  const exercisesHtml = exercises
    .map(exercise => {
      return replacePlaceholders(template, {
        id: exercise._id,
        rating: exercise.rating || 0,
        ratingFormatted: exercise.rating ? exercise.rating.toFixed(1) : '0.0',
        cardClass: '',
        name: exercise.name,
        burnedCalories: exercise.burnedCalories || 0,
        time: exercise.time || 0,
        bodyPart: exercise.bodyPart || 'N/A',
        target: exercise.target || 'N/A',
      });
    })
    .join('');

  container.className = 'exercises';
  container.innerHTML = exercisesHtml;
}

export function renderCategories(categories, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (categories.length === 0) {
    container.innerHTML = '<p class="no-results">No categories found.</p>';
    return;
  }

  const template = loadTemplate('category-card');

  const categoriesHtml = categories
    .map(cat => {
      return replacePlaceholders(template, {
        filter: cat.filter,
        name: cat.name,
        imgURL: cat.imgURL || '',
      });
    })
    .join('');

  container.className = 'categories';
  container.innerHTML = categoriesHtml;
}


export function renderFavoritesList(favorites, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (favorites.length === 0) {
    const emptyTemplate = loadTemplate('favorites-empty');
    container.innerHTML = emptyTemplate;
    return;
  }

  const template = loadTemplate('exercise-card');

  const cardsHtml = favorites
    .map(exercise => {
      return replacePlaceholders(template, {
        id: exercise._id,
        name: exercise.name,
        burnedCalories: exercise.burnedCalories || 0,
        time: exercise.time || 0,
        bodyPart: exercise.bodyPart || 'N/A',
        target: exercise.target || 'N/A',
        rating: exercise.rating || 0,
        ratingFormatted: exercise.rating ? exercise.rating.toFixed(1) : '0.0',
        cardClass: 'is-favorite',
      });
    })
    .join('');

  container.className = 'favorites__list';
  container.innerHTML = cardsHtml;
}
