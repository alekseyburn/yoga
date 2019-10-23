if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
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
}
