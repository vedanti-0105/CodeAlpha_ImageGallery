const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const filterButtons = document.querySelectorAll('.filter-buttons button');

let currentIndex = 0;

/* Open Lightbox */
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentIndex = index;
    lightbox.style.display = 'flex';
    showImage(currentIndex);
  });
});

/* Close Lightbox */
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

/* Show Image with Fade */
function showImage(index){
  lightboxImg.style.opacity = 0;
  const img = galleryItems[index].querySelector('img');
  setTimeout(() => {
    lightboxImg.src = img.src;
    lightboxImg.style.opacity = 1;
  }, 200);
}

/* Next */
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  showImage(currentIndex);
});

/* Previous */
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  showImage(currentIndex);
});

/* Filter */
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    galleryItems.forEach(item => {
      if(filter === 'all' || item.dataset.category === filter){
        item.classList.remove('hide');
      } else {
        item.classList.add('hide');
      }
    });
  });
});

/* Keyboard Navigation */
document.addEventListener('keydown', (e) => {
  if(lightbox.style.display === 'flex'){
    if(e.key === 'ArrowRight') nextBtn.click();
    if(e.key === 'ArrowLeft') prevBtn.click();
    if(e.key === 'Escape') closeBtn.click();
  }
});