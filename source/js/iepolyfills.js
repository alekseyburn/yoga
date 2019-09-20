// определяем, что браузер - ie11, загружаем полифил из cdn
if (/Trident.*rv:/.test(navigator.userAgent)) {
  document.write(
    '<script src="//cdnjs.cloudflare.com/ajax/libs/picturefill/3.0.3/picturefill.min.js" onerror="loadPicturefill()"><\/script>',
  );
  document.write(
    '<script src="//cdnjs.cloudflare.com/ajax/libs/svgxuse/1.2.6/svgxuse.min.js" onerror="loadSvgxuse()"><\/script>',
  );
}

// если cdn недоступен, загружаем полифил локально
const loadFile = function (file) {
  const fileRef = document.createElement('script');

  fileRef.setAttribute('type', 'text/javascript');
  fileRef.setAttribute('src', file);
  document.getElementsByTagName('head')[0].appendChild(fileRef);
};

const loadPicturefill = function () {
  loadFile('picturefill.min.js');
};

const loadSvgxuse = function () {
  loadFile('svgxuse.min.js');
};
