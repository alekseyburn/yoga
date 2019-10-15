// если cdn недоступен, загружаем полифил локально
const loadFile = (file, cb) => {
  // eslint-disable-next-line no-undef
  let fileRef = document.createElement('script');
  const removeItem = () => {
    fileRef.parentNode.removeChild(fileRef);
    fileRef = document.createElement('script');
    fileRef.type = 'text/javascript';
    fileRef.src = cb;
    document.getElementsByTagName('head')[0].appendChild(fileRef);
  };
  fileRef.type = 'text/javascript';
  fileRef.src = file;
  // eslint-disable-next-line no-use-before-define
  fileRef.onerror = removeItem;
  // eslint-disable-next-line no-undef
  document.getElementsByTagName('head')[0].appendChild(fileRef);
};

// определяем, что браузер - ie11, загружаем полифил из cdn
// eslint-disable-next-line no-undef
if (/Trident.*rv:/.test(navigator.userAgent)) {
  loadFile(
    '//cdnjs.cloudflare.com/ajax/libs/picturefill/3.0.3/picturefill.min.js',
    'js/picturefill.min.js',
  );
  loadFile('//cdnjs.cloudflare.com/ajax/libs/svgxuse/1.2.6/svgxuse.min.js',
    'js/svgxuse.min.js');
}

// if (window.matchMedia('(min-width: 768px)').matches) {
//   const reviewsSlides = document.querySelectorAll('.reviews__item');
//   reviewsSlides[0].classList.add('active');
//   reviewsSlides[1].classList.add('active');
// }


document.addEventListener('DOMContentLoaded', () => {
  const SLIDETIME = 500;
  const backButton = document.querySelectorAll('.slider-back-btn-js');
  const forwardsButton = document.querySelectorAll('.slider-next-btn-js');

  let clickable = true;
  let active = null;
  let newActive = null;

  function initSlider(slides, item, number) {
    const allSlides = [
      ...document.querySelector(slides)
        .querySelectorAll('.slide-js')];

    allSlides.forEach((slide) => {
      slide.setAttribute(
        'style',
        `transition: transform ${SLIDETIME}ms ease;
                     animation-duration: ${SLIDETIME}ms`,
      );
      slide.classList.contains('active')
        ? slide.classList.remove('non-visible')
        : slide.classList.add('non-visible');
    });

    function changeSlide(forward) {
      if (clickable) {
        clickable = false;
        active = document.querySelector(slides).querySelector('.active');
        const activeSlideIndex = allSlides.indexOf(active);
        if (forward) {
          newActive = allSlides[(activeSlideIndex + 1) % allSlides.length];
          active.classList.add('slideOutLeft');
          newActive.classList.remove('non-visible');
          newActive.classList.add('slideInRight', 'active');
        } else {
          newActive = allSlides[(activeSlideIndex - 1 + allSlides.length)
          % allSlides.length];
          active.classList.add('slideOutRight');
          newActive.classList.remove('non-visible');
          newActive.classList.add('slideInLeft', 'active');
        }
      }
    }

    allSlides.forEach((slide) => {
      slide.addEventListener('transitionend', () => {
        if (slide === active && !clickable) {
          clickable = true;
          active.className = `${item} slide-js non-visible`;
        }
      });
    });

    forwardsButton[number - 1].addEventListener('click', () => {
      changeSlide(true);
    });

    backButton[number - 1].addEventListener('click', () => {
      changeSlide(false);
    });
  }

  initSlider('.team__list', 'team__item', '1');
  initSlider('.reviews__list', 'reviews__item', '2');
});

// const allCards = document.querySelectorAll('.subscriptions__item');
// allCards.forEach((item) => {
//   const wrapper = document.createElement('div');
//   wrapper.className = 'subscription__item-wrapper';
//   wrapper.style.transition = 'transform 0.2s;';
//   wrapper.innerHTML = item.innerHTML;
//   item.innerHTML = wrapper.outerHTML;
// });

const cards = document.querySelectorAll('.subscriptions__item');

function startRotate(event) {
  const cardItem = this.querySelector('.subscriptions__wrapper');
  const halfHeight = cardItem.offsetHeight / 2;
  const halfWidth = cardItem.offsetWidth / 2;
  cardItem.style.transform = `rotateX(${-(event.offsetY - halfHeight) / 7}deg) 
                              rotateY(${(event.offsetX - halfWidth) / 7}deg)`;
}
function stopRotate() {
  const cardItem = this.querySelector('.subscriptions__wrapper');
  cardItem.style.transform = 'rotate(0)';
}

cards.forEach((item) => {
  item.addEventListener('mousemove', startRotate);
  item.addEventListener('mouseout', stopRotate);
});


const form = document.querySelector('.form');
const name = form.querySelector('[name=name]');
const phone = form.querySelector('[name=phone]');
let isStorageSupport = true;
const storage = {
  name: '',
  phone: '',
};

try {
  storage.name = localStorage.getItem('name');
  storage.phone = localStorage.getItem('phone');
} catch (err) {
  isStorageSupport = false;
}

if (storage.name) {
  name.value = storage.name;
}
if (storage.phone) {
  phone.value = storage.phone;
}

form.addEventListener('submit', () => {
  if (isStorageSupport) {
    localStorage.setItem('name', name.value);
    localStorage.setItem('phone', phone.value);
  }
});
