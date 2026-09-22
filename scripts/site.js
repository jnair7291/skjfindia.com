(function () {
  var button = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.site-nav');
  if (button && nav) {
    button.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
    });
    nav.addEventListener('click', function () {
      nav.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
    });
  }

  var reveals = document.querySelectorAll('.story-reveal');
  if (!reveals.length) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (element) { element.classList.add('is-visible'); });
    return;
  }

  document.documentElement.classList.add('reveal-ready');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -7% 0px' });

  reveals.forEach(function (element) { observer.observe(element); });
}());
