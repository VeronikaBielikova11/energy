function setupBurgerMenu() {
  const burgerBtn = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const backdrop = mobileMenu?.querySelector('.mobile-menu__backdrop');

  if (!burgerBtn || !mobileMenu || !mobileCloseBtn) return;

  const openMenu = () => {
    mobileMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    burgerBtn.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
    burgerBtn.setAttribute('aria-expanded', 'false');
  };

  burgerBtn.addEventListener('click', openMenu);
  mobileCloseBtn.addEventListener('click', closeMenu);

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-menu__nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

function normalizePathname(pathname) {
  let normalized = pathname;

  if (normalized.endsWith('/index.html')) {
    normalized = normalized.slice(0, -'/index.html'.length);
  }

  normalized = normalized.replace(/\/+$/, '');

  return normalized || '/';
}

function getBaseUrl() {
  const { origin, pathname } = window.location;

  if (pathname.endsWith('/')) {
    return `${origin}${pathname}`;
  }

  const lastSegment = pathname.split('/').pop() || '';

  if (lastSegment.includes('.')) {
    const basePath = pathname.slice(0, pathname.lastIndexOf('/') + 1);
    return `${origin}${basePath}`;
  }

  return `${origin}${pathname}/`;
}

function setActiveNavLink() {
  const currentUrl = new URL(window.location.href);
  const baseUrl = getBaseUrl();
  const currentPath = normalizePathname(currentUrl.pathname);
  const navLinks = document.querySelectorAll('.nav__link, .mobile-menu__nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const linkUrl = new URL(href, baseUrl);
    const linkPath = normalizePathname(linkUrl.pathname);
    const isActive = currentPath === linkPath;
    const parentItem = link.closest('.nav__item, .mobile-menu__item');
    const isDesktopLink = link.classList.contains('nav__link');
    const activeLinkClass = isDesktopLink ? 'nav__link--active' : 'mobile-menu__nav-link--active';
    const activeItemClass = isDesktopLink ? 'nav__item--active' : 'mobile-menu__item--active';

    if (isActive) {
      link.classList.add('active', activeLinkClass);
      link.setAttribute('aria-current', 'page');
      if (parentItem) parentItem.classList.add('active', activeItemClass);
    } else {
      link.classList.remove('active', activeLinkClass);
      link.removeAttribute('aria-current');
      if (parentItem) parentItem.classList.remove('active', activeItemClass);
    }
  });
}

export function initNav() {
  setupBurgerMenu();
  setActiveNavLink();
}
