# Site MIRAJE – Festivalul Național Cultural

Site static de prezentare (HTML, CSS și puțin JavaScript). Nu are nevoie de Node, de build sau de bază de date: se editează direct fișierele.

## Structura

```
index.html        pagina de acasă
editii.html       Ediția 2026 (program complet) și arhiva edițiilor
parteneri.html    organizatori, parteneri, sponsori
contact.html      date de contact
css/stil.css      toate stilurile (culorile sunt variabile la începutul fișierului)
js/site.js        doar meniul de pe telefon
img/              logo, pictogramă și (ulterior) fotografii
```

Antetul și subsolul se repetă în fiecare pagină. Dacă schimbi meniul sau subsolul, modifică-l în toate cele 4 fișiere HTML.

## Actualizarea la ~3 luni

Caută în cod comentariile care încep cu `ACTUALIZARE`: marchează fiecare loc care se schimbă.

Listă de verificare:

- [ ] **Date de contact.** E-mailul (`festival.miraje@gmail.com`) și adresa (Calea Dorobanților nr. 31) apar în `contact.html`, în secțiunea Contact din `index.html` și (doar e-mailul) în subsolul fiecărei pagini. Dacă se schimbă, caută-le în toate fișierele.
- [ ] **Ediție nouă.** În `editii.html` mută programul vechi în secțiunea „Arhivă” (un rezumat scurt, într-un `<li>`) și pune programul noii ediții. În `index.html` actualizează secțiunea `#editia-2026` (titlu, date, listă) și textul din meniu („Ediția 2026”) dacă anul se schimbă.
- [ ] **Parteneri și sponsori.** Actualizează listele din `parteneri.html`.
- [ ] **Mențiunea din subsol** (înscrierea în Calendarul MEC) se schimbă anual: actualizeaz-o în toate cele 4 pagini.
- [ ] **Fotografii.** Pune-le în `img/`, cu dimensiuni rezonabile (sub ~300 KB fiecare, format `.jpg` sau `.webp`) și completează mereu atributul `alt` cu o descriere scurtă. Locurile pregătite sunt marcate în `index.html` (hero și carduri).

## Telefon și tabletă

- **Carusel orizontal.** Pe telefon (ecran până la 620 px), secțiunile „Ce îl face diferit” și „Componentele festivalului” afișează cardurile pe un singur rând care se derulează cu degetul, cu butoane „înainte/înapoi” și contor („2 din 6”). Pe tabletă și desktop rămân ca o grilă obișnuită. Ca să adaugi sau să ștergi un card, copiază sau șterge direct un `<li>` (componente) sau un `<article>` (ce îl face diferit): caruselul se adaptează singur la numărul de carduri.
- **Reguli aplicate:** zone de atingere de cel puțin 44 px, text de minimum 16 px, meniu restrâns sub 860 px, buton „Înapoi sus” pe ecrane mici, antet care nu mai e „lipit” sus când telefonul e ținut pe orizontală.
- **Număr de telefon.** Site-ul nu afișează deocamdată unul. Dacă se adaugă, folosește o legătură `tel:` (de exemplu `<a href="tel:+40264000000">+40 264 000 000</a>`, fără spații în `href`), ca să se poată apela cu o atingere de pe telefon.

## Publicare pe GitHub Pages

1. Creează un repository **public** pe GitHub și încarcă toate fișierele din acest folder (fișierele din rădăcina repository-ului, nu într-un subfolder).
2. În repository: **Settings → Pages → Build and deployment → Source: „Deploy from a branch”**, branch `main`, folder `/ (root)`.
3. După un minut site-ul apare la `https://UTILIZATOR.github.io/NUME-REPO/`.

Toate legăturile din site sunt relative, deci funcționează și într-un subdirector, și pe un domeniu propriu.

### Când avem un domeniu

1. În **Settings → Pages → Custom domain** scrie domeniul și bifează „Enforce HTTPS”.
2. La furnizorul domeniului, adaugă înregistrările DNS cerute de GitHub (ghid: documentația „Managing a custom domain for your GitHub Pages site”).
3. GitHub creează automat un fișier `CNAME` în repository; păstrează-l.

### Înainte de lansare

Site-ul are deocamdată `<meta name="robots" content="noindex, nofollow">` în `<head>`-ul fiecărei pagini, ca Google să nu îl indexeze. **La lansare, șterge această linie din toate cele 4 pagini.**

## Verificare locală

Deschide `index.html` în browser (dublu-click). Pentru a testa exact ca pe GitHub Pages, poți porni orice server static din acest folder, de exemplu: `npx serve` sau extensia „Live Server” din VS Code.

## Accesibilitate

Site-ul este gândit să fie folosit și cu cititoare de ecran și doar cu tastatura. La modificări păstrează:

- un singur `<h1>` pe pagină și ierarhia titlurilor (`h2`, `h3`);
- text `alt` descriptiv la imaginile cu conținut (`alt=""` pentru cele pur decorative);
- contrast bun între text și fundal (variabilele de culoare din `css/stil.css` sunt alese pentru asta);
- legături cu text clar („Pagina de contact”), nu „click aici”.
