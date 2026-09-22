(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-gallery-item]'));
  var filters = Array.prototype.slice.call(document.querySelectorAll('[data-gallery-filter]'));
  var dialog = document.querySelector('.lightbox');
  if (!items.length || !dialog) return;

  var image = dialog.querySelector('img');
  var caption = dialog.querySelector('.lightbox-caption');
  var position = dialog.querySelector('.lightbox-position');
  var closeButton = dialog.querySelector('.lightbox-close');
  var previousButton = dialog.querySelector('.lightbox-prev');
  var nextButton = dialog.querySelector('.lightbox-next');
  var visibleItems = items.slice();
  var currentIndex = 0;
  var lastTrigger = null;

  function showImage(index) {
    if (!visibleItems.length) return;
    currentIndex = (index + visibleItems.length) % visibleItems.length;
    var item = visibleItems[currentIndex];
    var thumbnail = item.querySelector('img');
    image.src = item.dataset.full;
    image.alt = thumbnail.alt;
    caption.textContent = item.dataset.caption;
    position.textContent = (currentIndex + 1) + ' / ' + visibleItems.length;
  }

  function openLightbox(item) {
    visibleItems = items.filter(function (entry) { return !entry.hidden; });
    currentIndex = visibleItems.indexOf(item);
    lastTrigger = item;
    showImage(currentIndex);
    dialog.showModal();
    document.body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    dialog.close();
  }

  items.forEach(function (item) {
    item.addEventListener('click', function () { openLightbox(item); });
  });

  filters.forEach(function (filter) {
    filter.addEventListener('click', function () {
      var selected = filter.dataset.galleryFilter;
      filters.forEach(function (button) {
        var active = button === filter;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      items.forEach(function (item) {
        item.hidden = selected !== 'all' && item.dataset.group !== selected;
      });
    });
  });

  closeButton.addEventListener('click', closeLightbox);
  previousButton.addEventListener('click', function () { showImage(currentIndex - 1); });
  nextButton.addEventListener('click', function () { showImage(currentIndex + 1); });
  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) closeLightbox();
  });
  dialog.addEventListener('close', function () {
    document.body.classList.remove('lightbox-open');
    image.src = '';
    if (lastTrigger) lastTrigger.focus();
  });
  dialog.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (event.key === 'ArrowRight') showImage(currentIndex + 1);
  });
}());
