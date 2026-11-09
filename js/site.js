/* MIRAJE – comportament minim, adăugat peste un site care funcționează și fără JavaScript:
   1) meniul de pe ecrane mici
   2) caruselul orizontal de pe telefon („Ce îl face diferit”, „Componentele festivalului”)
   3) butonul „Înapoi sus” pe telefon și tabletă */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var comportament = reduceMotion ? 'auto' : 'smooth';

  /* ---------- 1. Meniul de pe ecrane mici ---------- */
  var buton = document.getElementById('nav-buton');
  var nav = document.getElementById('nav-principal');

  if (buton && nav) {
    var seteazaMeniu = function (deschis) {
      nav.classList.toggle('deschis', deschis);
      buton.setAttribute('aria-expanded', deschis ? 'true' : 'false');
      buton.textContent = deschis ? 'Închide' : 'Meniu';
    };

    buton.addEventListener('click', function () {
      seteazaMeniu(!nav.classList.contains('deschis'));
    });

    // Se închide la alegerea unui link, la atingerea din afara meniului sau la Escape
    nav.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('a')) seteazaMeniu(false);
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('deschis') && !nav.contains(e.target) && !buton.contains(e.target)) {
        seteazaMeniu(false);
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('deschis')) {
        seteazaMeniu(false);
        buton.focus();
      }
    });
    // La rotirea telefonului sau lărgirea ferestrei, meniul se resetează
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) seteazaMeniu(false);
    });
  }

  /* ---------- 2. Carusel orizontal (doar pe telefon, max. 620px) ---------- */
  var modTelefon = window.matchMedia('(max-width: 620px)');

  function pregatesteCarusel(scroller) {
    var rand = scroller.firstElementChild;           // .diferit sau .carduri
    if (!rand) return;
    var eticheta = scroller.getAttribute('data-carusel') || 'Carusel';
    var elemente = Array.prototype.slice.call(rand.children);
    if (elemente.length < 2) return;

    var svgStanga = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var svgDreapta = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    var controale = document.createElement('div');
    controale.className = 'carusel__controale';
    controale.innerHTML =
      '<button type="button" class="carusel__buton" aria-label="Cardul anterior">' + svgStanga + '</button>' +
      '<span class="carusel__contor"></span>' +
      '<button type="button" class="carusel__buton" aria-label="Cardul următor">' + svgDreapta + '</button>';
    scroller.parentNode.insertBefore(controale, scroller.nextSibling);

    var anterior = controale.children[0];
    var contor = controale.children[1];
    var urmator = controale.children[2];

    function marginea() {
      return parseFloat(window.getComputedStyle(rand).paddingLeft) || 0;
    }

    function indexCurent() {
      var maxScroll = scroller.scrollWidth - scroller.clientWidth;
      if (scroller.scrollLeft >= maxScroll - 4) return elemente.length - 1;
      var pozitie = scroller.scrollLeft + marginea();
      var cel = 0, distMin = Infinity;
      for (var i = 0; i < elemente.length; i++) {
        var d = Math.abs(elemente[i].offsetLeft - pozitie);
        if (d < distMin) { distMin = d; cel = i; }
      }
      return cel;
    }

    function actualizeaza() {
      var i = indexCurent();
      contor.textContent = (i + 1) + ' din ' + elemente.length;
      anterior.disabled = i === 0;
      urmator.disabled = i === elemente.length - 1;
    }

    function mergeLa(i) {
      i = Math.max(0, Math.min(elemente.length - 1, i));
      scroller.scrollTo({ left: Math.max(0, elemente[i].offsetLeft - marginea()), behavior: comportament });
    }

    anterior.addEventListener('click', function () { mergeLa(indexCurent() - 1); });
    urmator.addEventListener('click', function () { mergeLa(indexCurent() + 1); });

    var asteapta = false;
    scroller.addEventListener('scroll', function () {
      if (asteapta) return;
      asteapta = true;
      window.requestAnimationFrame(function () { asteapta = false; actualizeaza(); });
    }, { passive: true });
    window.addEventListener('resize', actualizeaza);

    // Accesibilitate: zona derulabilă poate fi atinsă cu tastatura (săgeți stânga/dreapta) și anunțată
    function seteazaAccesibilitate() {
      if (modTelefon.matches) {
        scroller.setAttribute('role', 'region');
        scroller.setAttribute('aria-label', eticheta + ' (se derulează orizontal)');
        scroller.setAttribute('tabindex', '0');
        actualizeaza();
      } else if (scroller.hasAttribute('tabindex')) {
        scroller.removeAttribute('role');
        scroller.removeAttribute('aria-label');
        scroller.removeAttribute('tabindex');
        scroller.scrollLeft = 0;
      }
    }
    // La rotirea telefonului sau schimbarea lățimii: „change” și „resize” (al doilea, ca plasă de siguranță)
    if (modTelefon.addEventListener) modTelefon.addEventListener('change', seteazaAccesibilitate);
    else if (modTelefon.addListener) modTelefon.addListener(seteazaAccesibilitate);
    window.addEventListener('resize', seteazaAccesibilitate);
    seteazaAccesibilitate();
  }

  var carusele = document.querySelectorAll('[data-carusel]');
  for (var c = 0; c < carusele.length; c++) pregatesteCarusel(carusele[c]);

  /* ---------- 3. Butonul „Înapoi sus” ---------- */
  var sus = document.createElement('button');
  sus.type = 'button';
  sus.className = 'sus';
  sus.setAttribute('aria-label', 'Înapoi sus');
  sus.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 15l7-7 7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  document.body.appendChild(sus);

  var verificaSus = function () {
    sus.classList.toggle('vizibil', window.pageYOffset > 900);
  };
  window.addEventListener('scroll', function () { window.requestAnimationFrame(verificaSus); }, { passive: true });
  verificaSus();

  sus.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: comportament });
  });
})();
