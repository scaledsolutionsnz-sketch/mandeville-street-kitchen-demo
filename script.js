// Mandeville Street Kitchen — hero rotation + nav
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var slides = Array.prototype.slice.call(document.querySelectorAll('.hero__slide'));

  // Lazy-set backgrounds: first eagerly, rest after load to spare mobile.
  if (slides.length) {
    slides[0].style.backgroundImage = 'url("' + slides[0].dataset.bg + '")';
    var loadRest = function () {
      slides.forEach(function (s, i) {
        if (i > 0 && !s.style.backgroundImage) {
          var img = new Image();
          img.src = s.dataset.bg;
          img.onload = function () { s.style.backgroundImage = 'url("' + s.dataset.bg + '")'; };
        }
      });
    };
    if ('requestIdleCallback' in window) { requestIdleCallback(loadRest); }
    else { setTimeout(loadRest, 1200); }
  }

  // Crossfade rotation (paused under reduced motion)
  if (!reduce && slides.length > 1) {
    var i = 0;
    setInterval(function () {
      slides[i].classList.remove('is-active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('is-active');
    }, 6000);
  }

  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () { links.classList.toggle('open'); });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') links.classList.remove('open');
    });
  }

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
