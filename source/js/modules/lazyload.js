if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach((img) => {
    img.src = img.dataset.src;
    img.srcset = img.dataset.srcset;
    img.removeAttribute('data-src');
    img.removeAttribute('data-srcset');
  });
  const sources = document.querySelectorAll('source');
  sources.forEach((source) => {
    source.srcset = source.dataset.srcset;
    source.removeAttribute('data-srcset');
  });
} else {
  // Dynamically import the LazySizes library
  loadFile(
    'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.1.2/lazysizes.min.js',
    'js/lazysizes.min.js',
  );
  document.addEventListener('DOMContentLoaded', () => {
    let lazyloadImages;

    if ('IntersectionObserver' in window) {
      lazyloadImages = document.querySelectorAll('.lazy');
      var imageObserver = new IntersectionObserver(((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const image = entry.target;
            image.classList.remove('lazy');
            imageObserver.unobserve(image);
          }
        });
      }));

      lazyloadImages.forEach((image) => {
        imageObserver.observe(image);
      });
    } else {
      let lazyloadThrottleTimeout;
      lazyloadImages = document.querySelectorAll('.lazy');

      function lazyload() {
        if (lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(() => {
          const scrollTop = window.pageYOffset;
          lazyloadImages.forEach((img) => {
            if (img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
          });
          if (lazyloadImages.length == 0) {
            document.removeEventListener('scroll', lazyload);
            window.removeEventListener('resize', lazyload);
            window.removeEventListener('orientationChange', lazyload);
          }
        }, 20);
      }

      document.addEventListener('scroll', lazyload);
      window.addEventListener('resize', lazyload);
      window.addEventListener('orientationChange', lazyload);
    }
  });
}
