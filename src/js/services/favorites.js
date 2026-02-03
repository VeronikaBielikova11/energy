const FAVORITES_KEY = 'favoriteExercises';

export function getFavorites() {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (err) {
    console.error('Failed to get favorites:', err);
    return [];
  }
}

export function addFavorite(exercise) {
  try {
    const favorites = getFavorites();

    if (favorites.some(fav => fav._id === exercise._id)) {
      return false;
    }

    favorites.push(exercise);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return true;
  } catch (err) {
    console.error('Failed to add favorite:', err);
    return false;
  }
}

export function removeFavorite(exerciseId) {
  try {
    const favorites = getFavorites();
    const filtered = favorites.filter(fav => fav._id !== exerciseId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.error('Failed to remove favorite:', err);
    return false;
  }
}

export function isFavorite(exerciseId) {
  const favorites = getFavorites();
  return favorites.some(fav => fav._id === exerciseId);
}

export function toggleFavorite(exercise) {
  if (isFavorite(exercise._id)) {
    return removeFavorite(exercise._id);
  } else {
    return addFavorite(exercise);
  }
}
