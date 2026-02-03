import{i as E,a as K}from"./vendor-CK1Rzdhu.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const L={position:"topRight",timeout:5e3},h={success(e){E.success({...L,title:"Success",message:e})},error(e){E.error({...L,title:"Error",message:e})},warning(e){E.warning({...L,title:"Warning",message:e})},info(e){E.info({...L,title:"Info",message:e})}},G="https://your-energy.b.goit.study/api",y=K.create({baseURL:G}),N={400:"Bad request. Please check your input.",401:"Unauthorized. Please log in.",404:"Resource not found.",409:"This email has already been used.",500:"Server error. Please try again later.",default:"Something went wrong. Please try again."};y.interceptors.response.use(e=>e,e=>{var i;if(!e.response){const o=!navigator.onLine?"No internet connection. Please check your network.":"Unable to connect to server. Please try again later.";return h.error(o),Promise.reject(e)}const t=e.response.status,a=((i=e.response.data)==null?void 0:i.message)||N[t]||N.default;return h.error(a),Promise.reject(e)});const Y=async()=>{const{data:e}=await y.get("/quote");return e},Z=async({filter:e,page:t=1,limit:n=12})=>{const{data:a}=await y.get("/filters",{params:{filter:e,page:t,limit:n}});return a},X=async({bodypart:e,muscles:t,equipment:n,keyword:a,page:i=1,limit:r=10})=>{const o={page:i,limit:r};e&&(o.bodypart=e),t&&(o.muscles=t),n&&(o.equipment=n),a&&(o.keyword=a);const{data:c}=await y.get("/exercises",{params:o});return c},S=async e=>{const{data:t}=await y.get(`/exercises/${e}`);return t},H=async(e,t,n,a="")=>{const i={rate:t,email:n};a&&(i.review=a);const{data:r}=await y.patch(`/exercises/${e}/rating`,i);return r},ee=async e=>{const{data:t}=await y.post("/subscription",{email:e});return t},te=`<li class="exercise-card {{cardClass}}" data-id="{{id}}">\r
  <div class="exercise-card__header">\r
    <div class="exercise-card__left">\r
      <span class="exercise-card__badge">WORKOUT</span>\r
      <span class="exercise-card__rating" aria-label="Rating: {{ratingFormatted}} out of 5">\r
        {{ratingFormatted}}\r
        <svg width="18" height="18" class="exercise-card__rating-star" aria-hidden="true">\r
          <use href="/img/sprite.svg#icon-star"></use>\r
        </svg>\r
      </span>\r
      <button type="button" class="exercise-card__delete-btn" data-id="{{id}}" aria-label="Remove {{name}} from favorites">\r
        <svg width="20" height="20" aria-hidden="true">\r
          <use href="/img/sprite.svg#icon-trash"></use>\r
        </svg>\r
      </button>\r
    </div>\r
    <button class="exercise-card__start" data-id="{{id}}" aria-label="Start exercise {{name}}">\r
      Start\r
      <svg width="16" height="16" aria-hidden="true">\r
        <use href="/img/sprite.svg#icon-arrow"></use>\r
      </svg>\r
    </button>\r
  </div>\r
\r
  <div class="exercise-card__body">\r
    <span class="exercise-card__icon">\r
      <svg width="16px" height="16px" aria-hidden="true">\r
        <use href="/img/sprite.svg#icon-quote"></use>\r
      </svg>\r
    </span>\r
    <h3 class="exercise-card__title">{{name}}</h3>\r
  </div>\r
\r
  <ul class="exercise-card__meta">\r
    <li class="exercise-card__meta-item">\r
      <span class="exercise-card__meta-label">Burned calories:</span>\r
      <span class="exercise-card__meta-value">{{burnedCalories}} / {{time}} min</span>\r
    </li>\r
    <li class="exercise-card__meta-item">\r
      <span class="exercise-card__meta-label">Body part:</span>\r
      <span class="exercise-card__meta-value">{{bodyPart}}</span>\r
    </li>\r
    <li class="exercise-card__meta-item">\r
      <span class="exercise-card__meta-label">Target:</span>\r
      <span class="exercise-card__meta-value">{{target}}</span>\r
    </li>\r
  </ul>\r
</li>\r
`,ne=`<li class="category-card" data-filter="{{filter}}" data-name="{{name}}">\r
  <img src="{{imgURL}}" alt="" class="category-card__bg">\r
  <div class="category-card__overlay"></div>\r
  <div class="category-card__content">\r
    <h3 class="category-card__name">\r
      <a href="#" class="category-card__link">{{name}}</a>\r
    </h3>\r
    <p class="category-card__filter">{{filter}}</p>\r
  </div>\r
</li>\r
`,ae=`<div class="favorites__empty">
  <p class="favorites__empty-text">
    It appears that you haven't added any exercises to your favorites yet. To get started, you can
    add exercises that you like to your favorites for easier access in the future.
  </p>
</div>
`,re=`<ul class="pagination">\r
  <li>\r
    <a href="#" class="pagination__btn pagination__btn--first" data-page="1" aria-label="Go to first page">\r
      <svg width="13" height="12" class="pagination__icon pagination__icon--flip" aria-hidden="true">\r
        <use href="/img/sprite.svg#icon-double-arrow-right"></use>\r
      </svg>\r
    </a>\r
  </li>\r
  <li>\r
    <a href="#" class="pagination__btn pagination__btn--prev" aria-label="Go to previous page">\r
      <svg width="20" height="20" class="pagination__icon pagination__icon--flip" aria-hidden="true">\r
        <use href="/img/sprite.svg#icon-arrow-right"></use>\r
      </svg>\r
    </a>\r
  </li>\r
  <li>\r
    <ul class="pagination__numbers"></ul>\r
  </li>\r
  <li>\r
    <a href="#" class="pagination__btn pagination__btn--next" aria-label="Go to next page">\r
      <svg width="20" height="20" class="pagination__icon" aria-hidden="true">\r
        <use href="/img/sprite.svg#icon-arrow-right"></use>\r
      </svg>\r
    </a>\r
  </li>\r
  <li>\r
    <a href="#" class="pagination__btn pagination__btn--last" aria-label="Go to last page">\r
      <svg width="13" height="12" class="pagination__icon" aria-hidden="true">\r
        <use href="/img/sprite.svg#icon-double-arrow-right"></use>\r
      </svg>\r
    </a>\r
  </li>\r
</ul>\r
`,ie={"exercise-card":te,"category-card":ne,"favorites-empty":ae,pagination:re};function _(e){return ie[e]||""}function A(e,t){return e.replace(/\{\{(\w+)\}\}/g,(n,a)=>t[a]!==void 0?t[a]:"")}function se(e,t){const n=document.getElementById(t);if(!n)return;if(e.length===0){n.innerHTML='<p class="no-results">No exercises found. Try another filter.</p>';return}const a=_("exercise-card"),i=e.map(r=>A(a,{id:r._id,rating:r.rating||0,ratingFormatted:r.rating?r.rating.toFixed(1):"0.0",cardClass:"",name:r.name,burnedCalories:r.burnedCalories||0,time:r.time||0,bodyPart:r.bodyPart||"N/A",target:r.target||"N/A"})).join("");n.className="exercises",n.innerHTML=i}function oe(e,t){const n=document.getElementById(t);if(!n)return;if(e.length===0){n.innerHTML='<p class="no-results">No categories found.</p>';return}const a=_("category-card"),i=e.map(r=>A(a,{filter:r.filter,name:r.name,imgURL:r.imgURL||""})).join("");n.className="categories",n.innerHTML=i}function R(e,t){const n=document.getElementById(t);if(!n)return;if(e.length===0){const r=_("favorites-empty");n.innerHTML=r;return}const a=_("exercise-card"),i=e.map(r=>A(a,{id:r._id,name:r.name,burnedCalories:r.burnedCalories||0,time:r.time||0,bodyPart:r.bodyPart||"N/A",target:r.target||"N/A",rating:r.rating||0,ratingFormatted:r.rating?r.rating.toFixed(1):"0.0",cardClass:"is-favorite"})).join("");n.className="favorites__list",n.innerHTML=i}async function x(e,t,n="pagination-container"){const a=document.getElementById(n);if(!a)return;if(t<=1){a.innerHTML="";return}if(!a.querySelector(".pagination")){const l=await _("pagination");a.innerHTML=l}const i=a.querySelector(".pagination__btn--first"),r=a.querySelector(".pagination__btn--prev"),o=a.querySelector(".pagination__btn--next"),c=a.querySelector(".pagination__btn--last"),d=a.querySelector(".pagination__numbers");w(i,e===1,1),w(r,e===1,e-1),w(o,e===t,e+1),w(c,e===t,t);const m=ce(e,t).map(l=>l==="..."?'<li aria-hidden="true"><span class="pagination__dots">...</span></li>':l===e?`<li><a href="#" class="pagination__number pagination__number--current" aria-current="page">${l}</a></li>`:`<li><a href="#" class="pagination__number" data-page="${l}">${l}</a></li>`).join("");d.innerHTML=m}function w(e,t,n){t?(e.classList.add("is-disabled"),e.setAttribute("aria-disabled","true"),e.removeAttribute("data-page")):(e.classList.remove("is-disabled"),e.removeAttribute("aria-disabled"),e.dataset.page=n)}function ce(e,t){const n=[];if(t<=3){for(let r=1;r<=t;r++)n.push(r);return n}let a,i;e===1?(a=1,i=3):e===t?(a=t-2,i=t):(a=e-1,i=e+1),a>1&&n.push("...");for(let r=a;r<=i;r++)n.push(r);return i<t&&n.push("..."),n}function O(e,t="pagination-container"){const n=document.getElementById(t);n&&n.dataset.listenerAttached!=="true"&&(n.dataset.listenerAttached="true",n.addEventListener("click",a=>{const i=a.target.closest(".pagination__number, .pagination__btn");if(!i||i.classList.contains("is-disabled")||i.classList.contains("pagination__number--current"))return;a.preventDefault();const r=Number(i.dataset.page);r&&!isNaN(r)&&e(r)}))}function I(e){const t=document.getElementById(e);if(t){if(t.classList.add("is-open"),document.body.classList.add("modal-open"),t.dataset.backdropListener!=="true"){const n=t.querySelector(".modal__backdrop");n&&n.addEventListener("click",()=>{f(e)}),t.dataset.backdropListener="true"}if(t.dataset.escapeListener!=="true"){const n=a=>{a.key==="Escape"&&t.classList.contains("is-open")&&f(e)};document.addEventListener("keydown",n),t.dataset.escapeListener="true"}}}function f(e){const t=document.getElementById(e);t&&(t.classList.remove("is-open"),e==="rating-modal"&&I("exercise-modal"),document.querySelector(".modal.is-open")||document.body.classList.remove("modal-open"))}function U(){f("exercise-modal"),I("rating-modal"),le(),de()}function B(){f("rating-modal")}function D(e){if(!e)return;const t=document.getElementById("modal-exercise-gif");t&&(t.src=e.gifUrl||"",t.alt=e.name||"Exercise");const n=document.getElementById("modal-exercise-title");n&&(n.textContent=e.name||"Exercise");const a=document.getElementById("modal-exercise-rating");if(a){const l=e.rating||0,v=Math.floor(l);a.innerHTML=`
      <span class="modal__rating-value">${l.toFixed(1)}</span>
      <div class="modal__rating-stars">
        ${Array.from({length:5},(Pe,J)=>`<svg class="modal__star ${J<v?"modal__star--filled":""}" width="18" height="18" aria-hidden="true">
            <use href="/img/sprite.svg#icon-star"></use>
          </svg>`).join("")}
      </div>
    `}const i=document.getElementById("modal-target");i&&(i.textContent=e.target||"N/A");const r=document.getElementById("modal-bodypart");r&&(r.textContent=e.bodyPart||"N/A");const o=document.getElementById("modal-equipment");o&&(o.textContent=e.equipment||"N/A");const c=document.getElementById("modal-popular");c&&(c.textContent=e.popularity||"0");const d=document.getElementById("modal-calories");d&&(d.textContent=`${e.burnedCalories||0}/${e.time||0} min`);const u=document.getElementById("modal-description");u&&(u.textContent=e.description||"No description available.");const m=document.getElementById("exercise-modal");m&&(m.dataset.exerciseId=e._id)}function le(){const e=document.getElementById("rating-form"),t=document.getElementById("rating-display-value");e&&e.reset(),t&&(t.textContent="0.0")}function de(){const e=document.getElementById("rating-stars"),t=document.getElementById("rating-display-value");e&&e.dataset.listenerAttached!=="true"&&(e.dataset.listenerAttached="true",e.addEventListener("change",n=>{if(n.target.type==="radio"){const a=parseFloat(n.target.value);t&&(t.textContent=a.toFixed(1))}}))}function z(){const e=document.querySelector('#rating-stars input[name="rating"]:checked');return e?parseFloat(e.value):0}const T="favoriteExercises";function k(){try{const e=localStorage.getItem(T);return e?JSON.parse(e):[]}catch(e){return console.error("Failed to get favorites:",e),[]}}function ue(e){try{const t=k();return t.some(n=>n._id===e._id)?!1:(t.push(e),localStorage.setItem(T,JSON.stringify(t)),!0)}catch(t){return console.error("Failed to add favorite:",t),!1}}function M(e){try{const n=k().filter(a=>a._id!==e);return localStorage.setItem(T,JSON.stringify(n)),!0}catch(t){return console.error("Failed to remove favorite:",t),!1}}function q(e){return k().some(n=>n._id===e)}const Q="dailyQuote",j="dailyQuoteDate";function V(){return new Date().toDateString()}function me(){const e=localStorage.getItem(j),t=V();if(e===t)try{const n=localStorage.getItem(Q);return n?JSON.parse(n):null}catch{return null}return null}function ge(e){try{localStorage.setItem(Q,JSON.stringify(e)),localStorage.setItem(j,V())}catch(t){console.warn("Failed to cache quote:",t)}}function P(e){const t=document.getElementById("quote-text"),n=document.getElementById("quote-author");t&&e.quote&&(t.textContent=e.quote),n&&e.author&&(n.textContent=e.author)}async function W(){const e=me();if(e){P(e);return}try{const t=await Y();ge(t),P(t)}catch(t){console.error("Failed to fetch quote:",t)}}function fe(e){const t=window.innerWidth;return e==="categories"?t<768?9:12:t<768?8:10}function F(){const e=window.innerWidth;return e>=1440?1/0:e>=768?10:8}function pe(){return window.innerWidth<1440}const s={view:"categories",filter:"Muscles",category:null,categoryFilter:null,keyword:"",page:1};function C(){return fe(s.view)}async function p(){const e=document.getElementById("exercises-container");try{const t=C();if(s.view==="categories"){const n=await Z({filter:s.filter,page:s.page,limit:t});oe(n.results,"exercises-container"),x(n.page?Number(n.page):1,n.totalPages||1)}else{const n={limit:t,page:s.page};s.categoryFilter==="Muscles"?n.muscles=s.category.toLowerCase():s.categoryFilter==="Body parts"?n.bodypart=s.category.toLowerCase():s.categoryFilter==="Equipment"&&(n.equipment=s.category.toLowerCase()),s.keyword&&(n.keyword=s.keyword);const a=await X(n);se(a.results,"exercises-container"),x(a.page?Number(a.page):1,a.totalPages||1)}}catch(t){console.error("Fetch error:",t),e&&(e.innerHTML='<p class="error-message">Failed to load data. Please try again.</p>')}}function ye(e){e&&e!==s.page&&(s.page=e,p())}function ve(){let e,t=C();window.addEventListener("resize",()=>{clearTimeout(e),e=setTimeout(()=>{const n=C();n!==t&&(t=n,s.page=1,p())},300)})}function he(){const e=document.getElementById("filter-tabs");!e||e.dataset.listenerAttached==="true"||(e.dataset.listenerAttached="true",e.addEventListener("click",async t=>{const n=t.target.closest(".tabs__btn");n&&(document.querySelectorAll(".tabs__btn").forEach(a=>{a.classList.remove("tabs__btn--active"),a.setAttribute("aria-selected","false")}),n.classList.add("tabs__btn--active"),n.setAttribute("aria-selected","true"),s.filter=n.dataset.filter,s.view="categories",s.page=1,s.keyword="",s.category=null,be(),await p())}))}function _e(e){const t=document.getElementById("section-title"),n=document.getElementById("exercise-search-form");t&&(t.innerHTML=`Exercises / <span class="filters__category-name">${e}</span>`),n&&n.classList.remove("is-hidden")}function be(){const e=document.getElementById("section-title"),t=document.getElementById("exercise-search-form"),n=document.getElementById("exercise-search-input"),a=document.getElementById("exercise-clear-btn");e&&(e.textContent="Exercises"),t&&t.classList.add("is-hidden"),n&&(n.value=""),a&&a.classList.add("is-hidden")}function Ee(){const e=document.getElementById("exercise-search-form"),t=document.getElementById("exercise-search-input"),n=document.getElementById("exercise-clear-btn");!e||!t||e.dataset.listenerAttached==="true"||(e.dataset.listenerAttached="true",t.addEventListener("input",()=>{n.classList.toggle("is-hidden",!t.value.trim())}),n.addEventListener("click",async()=>{t.value="",n.classList.add("is-hidden"),t.focus(),s.keyword="",s.page=1,await p()}),e.addEventListener("submit",async a=>{a.preventDefault(),s.keyword=t.value.trim(),s.page=1,await p()}))}function Le(e){const t=document.getElementById("modal-close-btn");t&&(t.onclick=()=>f("exercise-modal"));const n=document.getElementById("give-rating-btn");n&&(n.onclick=()=>{U(),we(e)});const a=document.getElementById("add-to-favorites-btn");if(a){const i=()=>{q(e)?a.innerHTML=`
          <span class="btn__text">Remove from favorites</span>
          <svg width="20" height="20" aria-hidden="true">
            <use href="/img/sprite.svg#icon-trash"></use>
          </svg>
        `:a.innerHTML=`
          <span class="btn__text">Add to favorites</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 3.5C10 3.5 6.5 1 3.5 3.5C0.5 6 2 10 10 16.5C18 10 19.5 6 16.5 3.5C13.5 1 10 3.5 10 3.5Z" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        `};a.onclick=async()=>{if(q(e))M(e);else{const r=await S(e);ue(r)}i()},i()}}function we(e){const t=document.getElementById("rating-modal-close-btn");t&&(t.onclick=()=>B());const n=document.getElementById("rating-form");n&&(n.onsubmit=async a=>{var c;if(a.preventDefault(),!n.checkValidity()){n.reportValidity();return}const i=z(),r=n.email.value.trim(),o=((c=n.review)==null?void 0:c.value.trim())||"";try{await H(e,i,r,o),B(),h.success("Rating submitted successfully!")}catch(d){console.error("Failed to submit rating:",d)}})}function xe(){const e=document.getElementById("exercises-container");!e||e.dataset.listenerAttached==="true"||(e.dataset.listenerAttached="true",e.addEventListener("click",async t=>{const n=t.target.closest(".category-card");if(n){t.preventDefault();const i=n.dataset.name,r=n.dataset.filter;if(!i)return;s.view="exercises",s.category=i,s.categoryFilter=r,s.page=1,s.keyword="",_e(i),Ee(),await p();return}const a=t.target.closest(".exercise-card__start");if(a){const i=a.dataset.id;if(!i)return;try{const r=await S(i);D(r),I("exercise-modal"),Le(i)}catch(r){console.error(`Failed to fetch exercise details for ${i}:`,r)}}}))}async function Be(){const e=document.querySelector(".layout");try{await W(),await p()}catch(t){console.error("Error initializing home page:",t)}finally{e&&e.classList.add("loaded")}he(),xe(),O(ye),ve()}const g={page:1};function b(){if(!document.getElementById("favorites-container"))return;const t=k();if(t.length===0){R([],"favorites-container"),x(1,1,"favorites-pagination");return}const n=F(),a=pe(),i=a?Math.ceil(t.length/n):1;g.page>i&&(g.page=i);const r=a?(g.page-1)*n:0,o=a?r+n:t.length,c=t.slice(r,o);R(c,"favorites-container"),a&&x(g.page,i,"favorites-pagination")}function Ie(e){e&&e!==g.page&&(g.page=e,b())}function ke(){let e,t=F();window.addEventListener("resize",()=>{clearTimeout(e),e=setTimeout(()=>{const n=F();n!==t&&(t=n,g.page=1,b())},300)})}function Fe(e){const t=document.getElementById("modal-close-btn");t&&(t.onclick=()=>f("exercise-modal"));const n=document.getElementById("give-rating-btn");n&&(n.onclick=()=>{U(),Ce(e)});const a=document.getElementById("add-to-favorites-btn");a&&(a.innerHTML=`
      <span class="btn__text">Remove from favorites</span>
      <svg width="20" height="20" aria-hidden="true">
        <use href="/img/sprite.svg#icon-trash"></use>
      </svg>
    `,a.onclick=()=>{M(e),f("exercise-modal"),b()})}function Ce(e){const t=document.getElementById("rating-modal-close-btn");t&&(t.onclick=()=>B());const n=document.getElementById("rating-form");n&&(n.onsubmit=async a=>{var c;if(a.preventDefault(),!n.checkValidity()){n.reportValidity();return}const i=z(),r=n.email.value.trim(),o=((c=n.review)==null?void 0:c.value.trim())||"";try{await H(e,i,r,o),B(),h.success("Rating submitted successfully!")}catch(d){console.error("Failed to submit rating:",d)}})}function Se(){const e=document.getElementById("favorites-container");!e||e.dataset.listenerAttached==="true"||(e.dataset.listenerAttached="true",e.addEventListener("click",async t=>{const n=t.target.closest(".exercise-card__delete-btn");if(n){t.stopPropagation();const i=n.dataset.id;i&&(M(i),b());return}const a=t.target.closest(".exercise-card__start");if(a){t.stopPropagation();const i=a.dataset.id;if(!i)return;try{const r=await S(i);D(r),I("exercise-modal"),Fe(i)}catch(r){console.error("Failed to fetch exercise details:",r)}}}))}async function Ae(){const e=document.querySelector(".page--favorites");try{await W(),b(),Se(),O(Ie,"favorites-pagination"),ke()}catch(t){console.error("Error initializing favorites page:",t)}finally{e&&e.classList.add("loaded")}}function Te(){const e=document.getElementById("burger-btn"),t=document.getElementById("mobile-menu"),n=document.getElementById("mobile-close-btn"),a=t==null?void 0:t.querySelector(".mobile-menu__backdrop");if(!e||!t||!n)return;const i=()=>{t.classList.add("is-open"),document.body.style.overflow="hidden",e.setAttribute("aria-expanded","true")},r=()=>{t.classList.remove("is-open"),document.body.style.overflow="",e.setAttribute("aria-expanded","false")};e.addEventListener("click",i),n.addEventListener("click",r),a&&a.addEventListener("click",r),document.addEventListener("keydown",c=>{c.key==="Escape"&&t.classList.contains("is-open")&&r()}),t.querySelectorAll(".mobile-menu__nav-link").forEach(c=>{c.addEventListener("click",r)})}function $(e){let t=e;return t.endsWith("/index.html")&&(t=t.slice(0,-11)),t=t.replace(/\/+$/,""),t||"/"}function Me(){const{origin:e,pathname:t}=window.location;if(t.endsWith("/"))return`${e}${t}`;if((t.split("/").pop()||"").includes(".")){const a=t.slice(0,t.lastIndexOf("/")+1);return`${e}${a}`}return`${e}${t}/`}function Ne(){const e=new URL(window.location.href),t=Me(),n=$(e.pathname);document.querySelectorAll(".nav__link, .mobile-menu__nav-link").forEach(i=>{const r=i.getAttribute("href");if(!r)return;const o=new URL(r,t),c=$(o.pathname),d=n===c,u=i.closest(".nav__item, .mobile-menu__item"),m=i.classList.contains("nav__link"),l=m?"nav__link--active":"mobile-menu__nav-link--active",v=m?"nav__item--active":"mobile-menu__item--active";d?(i.classList.add("active",l),i.setAttribute("aria-current","page"),u&&u.classList.add("active",v)):(i.classList.remove("active",l),i.removeAttribute("aria-current"),u&&u.classList.remove("active",v))})}function Re(){Te(),Ne()}function qe(){const e=document.getElementById("subscription-form");e&&e.addEventListener("submit",async t=>{t.preventDefault();const n=e.email.value;try{await ee(n),h.success("Successfully subscribed!"),e.reset()}catch{}})}document.addEventListener("DOMContentLoaded",()=>{Re(),qe();const e=document.getElementById("exercises-container"),t=document.getElementById("favorites-container");e&&!t&&Be(),t&&Ae()});
//# sourceMappingURL=main-BaX-ncsm.js.map
