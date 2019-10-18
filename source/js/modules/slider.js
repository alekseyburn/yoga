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
