 const controller = new ScrollMagic.Controller();

  let tl = new TimelineMax();
  tl.from('.directions__title', .5, { y: -100, opacity: 0 });
  tl.from('.directions__item--main', 0.6, {
    x: -50,
    opacity: 0,
    transformOrigin: 'left bottom',
    transform: 'rotate(-5deg)'
  });
  tl.from('.directions__item:not(.directions__item--main)', 0.5,
    { x: 50, opacity: 0 }, "=-0.2");

  const scene = new ScrollMagic.Scene({
    triggerElement: '.directions',
    triggerHook: '0.85',
  }).setTween(tl).addTo(controller);

  let tl2 = new TimelineMax();
  tl2.from('.subscriptions__title', .5, { y: -100, opacity: 0 });
  tl2.from('.subscriptions__form', .5, { y: 100, opacity: 0 });
  tl2.from('.subscriptions__list', .5, { y: 200, opacity: 0 });

  const scene2 = new ScrollMagic.Scene({
    triggerElement: '.subscriptions',
    triggerHook: '0.85',
  }).setTween(tl2).addTo(controller);

  let tl3 = new TimelineMax();
  tl3.from('.team__title', .5, { y: -100, opacity: 0 });
  tl3.from('.team__column-left', .7, { x: -200, opacity: 0 });
  tl3.from('.team__column-right', 1, { opacity: 0 }, '=-0.3');

  const scene3 = new ScrollMagic.Scene({
    triggerElement: '.team',
    triggerHook: '0.85',
  }).setTween(tl3).addTo(controller);

  if (window.matchMedia("(min-width: 320px)").matches) {
    let tl4 = new TimelineMax();
    tl4.from('.reviews__title', .5, { y: -100, opacity: 0 });
    tl4.from('.reviews__list', 1, { transform: 'scale(0, 0)', opacity: 0 });
    tl4.from('.button--reviews-left', .4, { x: -200, opacity: 0 });
    tl4.from('.button--reviews-right', .4, { x: 200, opacity: 0 }, '=-0.4');
    tl4.from('.reviews__counter', .5, { opacity: 0 });

    const scene4 = new ScrollMagic.Scene({
      triggerElement: '.reviews',
      triggerHook: '0.85',
    }).setTween(tl4).addTo(controller);
  } else {
    let tl4 = new TimelineMax();
    tl4.from('.reviews__title', .5, { y: -100, opacity: 0 });
    tl4.from('.reviews__list', 1, { transform: 'scale(0, 0)', opacity: 0 });
    tl4.from('.button--reviews-left', .4, { x: -200, opacity: 0 });
    tl4.from('.button--reviews-right', .4, { x: 200, opacity: 0 }, '=-0.4');

    const scene4 = new ScrollMagic.Scene({
      triggerElement: '.reviews',
      triggerHook: '0.85',
    }).setTween(tl4).addTo(controller);
  }

  if (window.matchMedia("(min-width: 320px)").matches) {
    let tl5 = new TimelineMax();
    tl5.from('.page-footer__record', 1, { opacity: 0 });
    tl5.from('.page-footer__contacts-list', 1, { x: -100, opacity: 0 });

    const scene5 = new ScrollMagic.Scene({
      triggerElement: '.page-footer',
      triggerHook: '0.85',
    }).setTween(tl5).addTo(controller);
  }
  if (window.matchMedia("(min-width: 1440px)").matches) {
    let tl5 = new TimelineMax();
    tl5.from('.page-footer__record', 1, { x: 200, opacity: 0 });
    tl5.to('.page-footer__record', { x: 0, opacity: 1 });
    tl5.from('.page-footer__contacts', 1, { x: -100, opacity: 0 }, '=-0.6');
    tl5.from('.page-footer__copyright', .4, { opacity: 0 }, '=-1');

    const scene5 = new ScrollMagic.Scene({
      triggerElement: '.page-footer',
      triggerHook: '0.85',
    }).setTween(tl5).addTo(controller);
  }
