const cards = [...document.querySelectorAll('.subscriptions__item')];

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
