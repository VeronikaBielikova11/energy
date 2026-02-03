import { initHomePage } from './js/pages/home.js';
import { initFavoritesPage } from './js/pages/favorites.js';
import { subscribe } from './js/core/api.js';
import { toast } from './js/core/toast.js';
import { initNav } from './js/ui/nav.js';

function setupSubscription() {
  const subForm = document.getElementById('subscription-form');
  if (!subForm) return;

  subForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = subForm.email.value;
    try {
      await subscribe(email);
      toast.success('Successfully subscribed!');
      subForm.reset();
    } catch {
      // Error toast is shown by API interceptor
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  setupSubscription();

  const isHomePage = document.getElementById('exercises-container');
  const isFavoritesPage = document.getElementById('favorites-container');

  if (isHomePage && !isFavoritesPage) {
    initHomePage();
  }

  if (isFavoritesPage) {
    initFavoritesPage();
  }
});
