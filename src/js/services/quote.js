import { getQuote } from '../core/api.js';

const QUOTE_KEY = 'dailyQuote';
const QUOTE_DATE_KEY = 'dailyQuoteDate';

function getTodayDateString() {
  return new Date().toDateString();
}

function getCachedQuote() {
  const cachedDate = localStorage.getItem(QUOTE_DATE_KEY);
  const today = getTodayDateString();

  if (cachedDate === today) {
    try {
      const cached = localStorage.getItem(QUOTE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  }
  return null;
}

function cacheQuote(quoteData) {
  try {
    localStorage.setItem(QUOTE_KEY, JSON.stringify(quoteData));
    localStorage.setItem(QUOTE_DATE_KEY, getTodayDateString());
  } catch (err) {
    console.warn('Failed to cache quote:', err);
  }
}

function renderQuote(quoteData) {
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');

  if (quoteText && quoteData.quote) {
    quoteText.textContent = quoteData.quote;
  }
  if (quoteAuthor && quoteData.author) {
    quoteAuthor.textContent = quoteData.author;
  }
}

export async function initQuote() {
  const cached = getCachedQuote();

  if (cached) {
    renderQuote(cached);
    return;
  }

  try {
    const quoteData = await getQuote();
    cacheQuote(quoteData);
    renderQuote(quoteData);
  } catch (err) {
    console.error('Failed to fetch quote:', err);
  }
}
