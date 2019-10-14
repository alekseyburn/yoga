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
