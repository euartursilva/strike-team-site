/* Strike Team — animações e interações */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  var WA = 'https://wa.me/5573991831090?text=Ol%C3%A1!%20Quero%20agendar%20minha%20aula%20experimental%20na%20Strike%20Team.';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* barra de progresso */
  var bar = document.createElement('div');
  bar.className = 'fx-progress';
  document.body.appendChild(bar);

  /* menu fixo */
  var header = $('header');
  if (header) header.classList.add('fx-header');

  /* topo: título linha a linha + itens em sequência */
  var hero = $('#topo') || $('section');
  if (hero) {
    var h1 = $('h1', hero);
    if (h1) {
      var parts = h1.innerHTML.split(/<br\s*\/?>/i);
      h1.innerHTML = parts.map(function (p, i) {
        return '<span class="fx-line"><span class="fx-line-in" style="--i:' + i + '">' + p + '</span></span>';
      }).join('');
      var outline = $('span[style*="text-stroke"]', h1);
      if (outline) outline.classList.add('fx-fill');
    }
    var col = h1 ? h1.parentElement : null;
    if (col) {
      var n = 0;
      Array.prototype.forEach.call(col.children, function (el) {
        if (el === h1) return;
        el.classList.add('fx-hero-item');
        el.style.setProperty('--i', n++);
      });
    }
    var heroImg = $(':scope > img', hero);
    if (heroImg) {
      var wrap = document.createElement('div');
      wrap.className = 'fx-hero-media';
      wrap.style.cssText = 'flex: 1 1 380px; min-width: 0; height: 560px;';
      heroImg.parentNode.insertBefore(wrap, heroImg);
      wrap.appendChild(heroImg);
      heroImg.style.flex = 'none';
    }
  }

  /* botões principais */
  $$('a').forEach(function (a) {
    var s = a.getAttribute('style') || '';
    if (/border-radius:\s*6px/.test(s) && /padding/.test(s) && !/border-radius:\s*50%/.test(s)) a.classList.add('fx-btn');
  });

  /* faixas rolando (só na página inicial) */
  function marquee(words, cls) {
    var html = '';
    for (var k = 0; k < 2; k++) {
      words.forEach(function (w, i) { html += '<span' + (i % 2 ? ' class="o"' : '') + '>' + w + ' •</span>'; });
    }
    var m = document.createElement('div');
    m.className = 'fx-marquee ' + (cls || '');
    m.setAttribute('aria-hidden', 'true');
    m.innerHTML = '<div class="fx-track">' + html + '</div>';
    return m;
  }
  var stats = $('section[aria-label="Resultados"]');
  if (stats) stats.parentNode.insertBefore(marquee(['Muaythai', 'Iniciante', 'Intermediário', 'Avançado', 'Competição', 'Kids', 'Teen']), stats.nextSibling);
  var contato = $('#contato');
  if (contato) contato.parentNode.insertBefore(marquee(['Aula experimental', 'Luvas e bandagens por nossa conta', 'Agende pelo WhatsApp', 'Teixeira de Freitas'], 'rev light'), contato);

  /* cartões 3D */
  $$('#turmas article, article.card').forEach(function (c) {
    c.classList.add('fx-tilt');
    if (!fine || reduce) return;
    c.addEventListener('mousemove', function (e) {
      var r = c.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.classList.add('moving');
      c.style.transform = 'perspective(900px) rotateX(' + ((0.5 - y) * 10).toFixed(2) + 'deg) rotateY(' + ((x - 0.5) * 12).toFixed(2) + 'deg) translateY(-6px)';
      c.style.setProperty('--mx', (x * 100) + '%');
      c.style.setProperty('--my', (y * 100) + '%');
    });
    c.addEventListener('mouseleave', function () { c.classList.remove('moving'); c.style.transform = ''; });
  });

  /* zoom nas fotos dos álbuns */
  $$('a.tile img, a.ev img').forEach(function (img) {
    var w = document.createElement('div');
    w.className = 'fx-zoom';
    img.parentNode.insertBefore(w, img);
    w.appendChild(img);
  });

  /* lightbox */
  var lb = document.createElement('div');
  lb.className = 'fx-lb';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Foto ampliada');
  lb.innerHTML = '<img alt=""><button type="button" aria-label="Fechar">×</button>';
  document.body.appendChild(lb);
  var lbImg = $('img', lb), lastFocus = null;
  function openLb(src, alt) { lastFocus = document.activeElement; lbImg.src = src; lbImg.alt = alt || ''; lb.classList.add('open'); $('button', lb).focus(); }
  function closeLb() { lb.classList.remove('open'); if (lastFocus) lastFocus.focus(); }
  lb.addEventListener('click', function (e) { if (e.target !== lbImg) closeLb(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && lb.classList.contains('open')) closeLb(); });
  $$('#escola img, #turmas img, article > img').forEach(function (img) {
    img.setAttribute('data-lightbox', '');
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    var go = function () { openLb(img.currentSrc || img.src, img.alt); };
    img.addEventListener('click', go);
    img.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
  });
  $$('a[href$="grade.png"]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); openLb(a.getAttribute('href'), 'Grade de horários da Strike Team'); });
  });

  /* WhatsApp flutuante + voltar ao topo */
  var wa = document.createElement('a');
  wa.className = 'fx-float fx-wa';
  wa.href = WA;
  wa.setAttribute('aria-label', 'Agendar aula experimental pelo WhatsApp');
  wa.innerHTML = '<span class="tip">Agende sua aula experimental</span><svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.5A8.4 8.4 0 1 1 21 11.5z"></path></svg>';
  document.body.appendChild(wa);
  var top = document.createElement('button');
  top.type = 'button';
  top.className = 'fx-float fx-top';
  top.setAttribute('aria-label', 'Voltar ao topo');
  top.innerHTML = '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"></path></svg>';
  top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });
  document.body.appendChild(top);

  /* perguntas frequentes com abertura suave */
  $$('details').forEach(function (d) {
    var s = $('summary', d), body = $('p', d);
    if (!s || !body || reduce) return;
    s.addEventListener('click', function (e) {
      e.preventDefault();
      if (d.open) {
        var a = body.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-8px)' }], { duration: 220, easing: 'ease-in' });
        a.onfinish = function () { d.open = false; };
      } else {
        d.open = true;
        body.animate([{ opacity: 0, transform: 'translateY(-10px)' }, { opacity: 1, transform: 'none' }], { duration: 380, easing: 'cubic-bezier(.2,.7,.2,1)' });
      }
    });
  });

  /* troca de abas na página de fotos */
  $$('.tab').forEach(function (t) {
    t.addEventListener('click', function () {
      ['sec-eventos', 'sec-grad'].forEach(function (id) {
        var el = document.getElementById(id);
        if (!el || el.style.display === 'none') return;
        el.classList.remove('fx-swap'); void el.offsetWidth; el.classList.add('fx-swap');
      });
    });
  });

  /* revelar ao rolar, em cascata */
  if (!reduce && 'IntersectionObserver' in window) {
    var sel = [
      'section:not(#topo) h2', 'section:not(#topo) h3', 'section:not(#topo) p', 'section:not(#topo) article',
      'section:not(#topo) li', 'section:not(#topo) details', 'section:not(#topo) img', 'section:not(#topo) .tile',
      'section[aria-label="Resultados"] > div > div', '#conquistas span[style*="999px"]', '.chip', 'a.ev',
      '#horarios div[style*="border: 1px solid #262626"]', 'footer > *'
    ].join(',');
    var list = $$(sel).filter(function (el) { return !el.closest('#topo') && !el.closest('.fx-marquee'); });
    var set = new Set(list);
    list = list.filter(function (el) {
      for (var p = el.parentElement; p; p = p.parentElement) if (set.has(p)) return false;
      return true;
    });
    var idx = new Map();
    list.forEach(function (el) {
      var k = el.parentElement, i = idx.get(k) || 0;
      idx.set(k, i + 1);
      el.style.setProperty('--d', Math.min(i, 8) * 80 + 'ms');
      el.classList.add('fx-reveal');
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        el.classList.add('fx-in');
        io.unobserve(el);
        setTimeout(function () { el.classList.remove('fx-reveal', 'fx-in'); el.style.removeProperty('--d'); }, 1700);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    list.forEach(function (el) { io.observe(el); });
  }

  /* números contando */
  var nums = $$('span').filter(function (s) {
    return /Anton/.test(s.getAttribute('style') || '') && /^\d+$/.test(s.textContent.trim());
  });
  if (!reduce && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, end = parseInt(el.getAttribute('data-end'), 10), t0 = null;
        cio.unobserve(el);
        (function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / 1600, 1), e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(end * e);
          if (p < 1) requestAnimationFrame(step);
        })(performance.now());
      });
    }, { threshold: 0.6 });
    nums.forEach(function (el) { el.setAttribute('data-end', el.textContent.trim()); el.textContent = '0'; cio.observe(el); });
  }

  /* rolagem: progresso, menu, botões flutuantes, parallax */
  var heroMediaImg = $('.fx-hero-media img');
  var ticking = false;
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
    if (header) header.classList.toggle('scrolled', y > 24);
    var show = y > 520;
    wa.classList.toggle('show', show);
    top.classList.toggle('show', y > 1400);
    if (heroMediaImg && !reduce && y < 1200) heroMediaImg.style.transform = 'translateY(' + (-y * 0.14) + 'px)';
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
})();
