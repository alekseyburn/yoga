document.querySelector('html').classList.remove('no-js');

document.addEventListener('DOMContentLoaded', () => {
  if ((/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) || /Trident.*rv:/.test(navigator.userAgent)) {
    document.querySelector('body').classList.remove('webp');
    document.querySelector('body').classList.add('no-webp');
  }
});

// если cdn недоступен, загружаем полифил локально
const loadFile = (file, cb) => {
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
  fileRef.onerror = removeItem;
  document.getElementsByTagName('head')[0].appendChild(fileRef);
};

// определяем, что браузер - ie11, загружаем полифил из cdn
if (/Trident.*rv:/.test(navigator.userAgent)) {
  loadFile(
    '//cdnjs.cloudflare.com/ajax/libs/picturefill/3.0.3/picturefill.min.js',
    'js/picturefill.min.js',
  );
  loadFile('//cdnjs.cloudflare.com/ajax/libs/svgxuse/1.2.6/svgxuse.min.js',
    'js/svgxuse.min.js');
}

// loadFile(
//   'https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js',
//   'js/TweenMax.min.js',
// );

// loadFile(
//   'https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TimelineMax.min.js',
//   'js/TimelineMax.min.js',
// );
//
// loadFile(
//   'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js',
//   'js/ScrollMagic.min.js',
// );
//
// loadFile(
//   'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/animation.gsap.min.js',
//   'js/animation.gsap.min.js',
// );
