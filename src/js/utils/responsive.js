export function getItemsLimit(view) {
  const width = window.innerWidth;

  if (view === 'categories') {
    return width < 768 ? 9 : 12;
  } else {
    return width < 768 ? 8 : 10;
  }
}

export function getPerPage() {
  const width = window.innerWidth;
  if (width >= 1440) return Infinity;
  if (width >= 768) return 10;
  return 8;
}

export function usePagination() {
  return window.innerWidth < 1440;
}

export function setupResizeListener(callback) {
  let timeoutId;
  let currentValue = null;

  const handler = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const newValue = callback();
      if (newValue !== currentValue) {
        currentValue = newValue;
      }
    }, 300);
  };

  window.addEventListener('resize', handler);

  return () => window.removeEventListener('resize', handler);
}
