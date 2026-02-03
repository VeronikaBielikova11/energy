export function debounce(func, wait) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), wait);
  };
}

export function attachListener(element, event, handler) {
  if (!element) return;

  const key = `listener_${event}`;
  if (element.dataset[key] === 'true') return;

  element.addEventListener(event, handler);
  element.dataset[key] = 'true';
}
