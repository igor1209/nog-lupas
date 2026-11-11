/*
 * NOG Lupas — ajustes finais de interface, navegação e rodapé.
 * Mantém catálogo, produtos, filtros, visualizador e sacola do index.html / conta-sacola.js.
 * Uma única implementação do rodapé: montarFooterFinal().
 */
(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('nog-carregando');
  // Estilos movidos integralmente para aparencia.css.

  function encerrarCarregamento() {
    root.classList.remove('nog-carregando');
  }
  const limite = setTimeout(encerrarCarregamento, 4000);

  function montarFooterFinal() {
    const footer = document.querySelector('footer');
    if (!footer || footer.classList.contains('nog-footer-final')) return;

    const destaques = [
      { id: 'plantaris', marca: 'Oakley', nome: 'Plantaris' },
      { id: 'wayfarer', marca: 'Ray-Ban', nome: 'Original Wayfarer' },
      { id: 'aviator', marca: 'Ray-Ban', nome: 'Aviator Classic' }
    ];
    const lista = (typeof products !== 'undefined' && Array.isArray(products))
      ? products : [];
    const escapeHTML = value => String(value).replace(/[&<>"']/g, ch => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[ch]);
    const cards = destaques.map(item => {
      const produto = lista.find(p => p.id === item.id);
      if (!produto) return '';
      const nome = escapeHTML(produto.name);
      const marca = escapeHTML(produto.brand);
      const foto = produto.views?.[0]?.url || '';
      return `
        <button class="nog-footer-feature" type="button" data-nog-feature="${item.id}"
                aria-label="Ver detalhes de ${marca} ${nome}">
          <span class="nog-footer-feature-image">
            ${foto ? `<img src="${escapeHTML(foto)}" alt="" loading="lazy" decoding="async">` : ''}
          </span>
          <span class="nog-footer-feature-copy">
            <small>${marca}</small><strong>${nome}</strong><em>Conhecer modelo</em>
          </span>
        </button>`;
    }).join('');

    footer.className = 'nog-footer nog-footer-final';
    footer.setAttribute('aria-label', 'Rodapé da NOG Lupas');
    footer.innerHTML = `
      <div class="nog-footer-topbar">
        <div class="shell nog-footer-topbar-inner">
          <p>Atendimento online • Recife, PE</p>
          <p>Preços e disponibilidade confirmados diretamente com a NOG.</p>
        </div>
      </div>

      <section id="nog-destaques" class="shell nog-footer-featured"
               aria-labelledby="nog-featured-title">
        <div class="nog-footer-featured-head">
          <div>
            <p class="nog-footer-eyebrow">Seleção NOG</p>
            <h2 id="nog-featured-title">Modelos em destaque</h2>
            <p>Três estilos para explorar. Abra cada modelo e veja os ângulos antes de escolher.</p>
          </div>
          <a class="nog-footer-view-all" href="#catalogo" data-nog-footer-brand="Todas">
            Ver catálogo completo
          </a>
        </div>
        <div class="nog-footer-featured-grid">${cards}</div>
      </section>

      <div class="shell nog-footer-main">
        <div class="nog-footer-identity">
          <a class="nog-footer-signature" href="#inicio"
             aria-label="NOG Lupas, voltar ao início">
            <img src="assets/logo.webp?v=20261111" alt="Logo NOG Lupas"
                 width="68" height="68" loading="lazy">
            <span class="nog-footer-name"><strong>NOG</strong><small>LUPAS</small></span>
          </a>
          <p class="nog-footer-description">A lupa que tem a sua presença.<br>De Recife, no seu corre.</p>
        </div>
        <nav class="nog-footer-column" aria-label="Explorar produtos">
          <h2>Explore os modelos</h2>
          <div class="nog-footer-links">
            <a href="#catalogo" data-nog-footer-brand="Todas">Todos os óculos</a>
            <a href="#catalogo" data-nog-footer-brand="Oakley">Modelos Oakley</a>
            <a href="#catalogo" data-nog-footer-brand="Ray-Ban">Modelos Ray-Ban</a>
          </div>
        </nav>
        <div class="nog-footer-column">
          <h2>Sua experiência</h2>
          <div class="nog-footer-links">
            <button type="button" data-nog-footer-action="cart">Minha sacola</button>
            <button type="button" data-nog-footer-action="account">Meu perfil neste navegador</button>
            <a href="https://wa.me/message/JSIBLEUALLYUP1" target="_blank"
               rel="noopener noreferrer">Consultar preço e disponibilidade</a>
          </div>
        </div>
        <div class="nog-footer-column">
          <h2>Novidades da NOG</h2>
          <p class="nog-footer-description">
            Acompanhe as publicações, novidades e inspirações da NOG nas redes sociais.
          </p>
          <div class="nog-footer-links">
            <a href="https://www.instagram.com/nog_081/" target="_blank"
               rel="noopener noreferrer">Acompanhar no Instagram</a>
            <a href="https://wa.me/message/JSIBLEUALLYUP1" target="_blank"
               rel="noopener noreferrer">Falar com a NOG</a>
          </div>
          <div class="nog-footer-socials">
            <a href="https://www.instagram.com/nog_081/" target="_blank"
               rel="noopener noreferrer" aria-label="Instagram da NOG Lupas">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="2.5" y="2.5" width="19" height="19" rx="5"/>
                <circle cx="12" cy="12" r="4.3"/>
                <circle cx="17.8" cy="6.2" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="https://wa.me/message/JSIBLEUALLYUP1" target="_blank"
               rel="noopener noreferrer" aria-label="WhatsApp da NOG Lupas">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.3 11.6a8.3 8.3 0 0 1-8.4 8.3 8.6 8.6 0 0 1-3.7-.8L3 20.8l1.7-5.1a8.4 8.4 0 1 1 15.6-4.1Z"/>
                <path d="M9 8.1c-.5-.6-1-.5-1.3.1-.6 1.2.5 3.5 2.3 5.3 1.8 1.8 4.1 2.8 5.3 2.3.6-.3.8-.9.2-1.4l-1.4-1-1 1c-1.5-.4-2.7-1.6-3.1-3.1l1-1Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <section class="shell nog-footer-faq" aria-labelledby="nog-footer-faq-title">
        <h2 id="nog-footer-faq-title">Dúvidas rápidas</h2>
        <div class="nog-footer-faq-grid">
          <details>
            <summary>Como consulto o preço?</summary>
            <p>Abra o modelo que gostou e fale com a NOG pelo WhatsApp. Valores e disponibilidade são confirmados no atendimento.</p>
          </details>
          <details>
            <summary>Posso escolher outra cor?</summary>
            <p>Você pode informar a cor de preferência no detalhe do modelo. A NOG confirma as opções disponíveis.</p>
          </details>
          <details>
            <summary>Como funciona a sacola?</summary>
            <p>Ela organiza os modelos que você gostou e permite copiar a seleção para o WhatsApp. Não há pagamento pelo site.</p>
          </details>
        </div>
      </section>
      <div class="nog-footer-bottom">
        <div class="shell nog-footer-bottom-inner">
          <span>© ${new Date().getFullYear()} NOG Lupas. Todos os direitos reservados.</span>
          <span>Brasil • Recife, Pernambuco</span>
        </div>
        <div class="shell nog-footer-legal">
          <p>Catálogo de apresentação. Produtos, preços e disponibilidade sujeitos à confirmação com a NOG.
          Oakley e Ray-Ban são marcas de seus respectivos titulares. A NOG não é o site oficial dessas marcas.</p>
        </div>
      </div>`;

    footer.addEventListener('click', event => {
      const destaque = event.target.closest('[data-nog-feature]');
      if (destaque) {
        const id = destaque.dataset.nogFeature;
        const busca = document.querySelector('#search');
        if (busca) {
          busca.value = '';
          busca.dispatchEvent(new Event('input', { bubbles: true }));
        }
        document.querySelector('[data-brand="Todas"]')?.click();
        const abrir = [...document.querySelectorAll('#products [data-open]')]
          .find(el => el.dataset.open === id);
        if (abrir) abrir.click();
        else document.querySelector('#catalogo')?.scrollIntoView();
        return;
      }
      const marca = event.target.closest('[data-nog-footer-brand]');
      if (marca) {
        event.preventDefault();
        const nav = [...document.querySelectorAll('[data-brand-link]')]
          .find(el => el.dataset.brandLink === marca.dataset.nogFooterBrand);
        if (nav) {
          nav.click();
          document.querySelector('#catalogo')?.scrollIntoView();
        }
        return;
      }
      const acao = event.target.closest('[data-nog-footer-action]');
      if (acao) {
        document.querySelector(
          acao.dataset.nogFooterAction === 'account' ? '#nog-account' : '#nog-cart'
        )?.click();
      }
    });
  }

  /* Adiciona apenas Novidades e Destaques ao menu já existente. */
  function adicionarItensAoMenu() {
    const links = [
      { texto: 'Novidades', href: 'https://www.instagram.com/nog_081/', externo: true },
      { texto: 'Destaques', href: '#nog-destaques', externo: false }
    ];
    ['.site-header .main-nav', '#mobile-nav'].forEach(seletor => {
      const nav = document.querySelector(seletor);
      if (!nav || nav.querySelector('[data-nog-menu-extra]')) return;
      const primeiroItem = nav.querySelector('a');
      links.forEach(item => {
        const link = document.createElement('a');
        link.textContent = item.texto;
        link.href = item.href;
        link.dataset.nogMenuExtra = item.texto.toLowerCase();
        if (item.externo) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.setAttribute('aria-label', 'Novidades da NOG no Instagram (abre nova aba)');
        }
        if (seletor === '#mobile-nav') {
          link.addEventListener('click', () => {
            const menu = document.querySelector('#mobile-nav');
            const toggle = document.querySelector('#menu-toggle');
            if (menu && !menu.hidden && toggle) toggle.click();
          });
        }
        nav.insertBefore(link, primeiroItem);
      });
    });
  }


  /* Hero em HTML/CSS/SVG, sem tipografia incorporada na fotografia.
     Substituída após conta-sacola.js inicializar os controles legados. */
  function montarNovaHero() {
    const hero = document.querySelector('#inicio.hero');
    if (!hero || hero.classList.contains('nog-hero')) return;

    const letras = palavra => Array.from(palavra).map(letra =>
      `<span class="nog-hero__logo-letter" aria-hidden="true">${letra}</span>`
    ).join('');

    const faixa = 'NOG LUPAS • ÓCULOS • ESTILO • PROTEÇÃO • PERFORMANCE • ';
    const faixaLonga = Array(4).fill(faixa).join('');

    hero.classList.add('nog-hero');
    hero.setAttribute('aria-labelledby', 'hero-title');

    hero.innerHTML = `
      <div class="nog-hero__bg" aria-hidden="true"></div>

      <div class="nog-hero__grid">
        <div class="nog-hero__left">
          <div class="nog-hero__logo-block">
            <a class="nog-hero__logo-link" href="#inicio" aria-label="NOG Lupas — início">
              <svg class="nog-hero__crown" viewBox="0 0 36 26" aria-hidden="true">
                <path d="M2 7 11 13 17 2 23 13 34 7 30 23H6Z"/>
                <rect x="6" y="23" width="24" height="2" rx="1"/>
              </svg>
              <span class="nog-hero__wordmark" aria-hidden="true">
                <span class="nog-hero__logo-word">${letras('NOG')}</span>
                <span class="nog-hero__logo-word">${letras('LUPAS')}</span>
              </span>
            </a>
            <p class="nog-hero__subtitle">Óculos e Estilo</p>
          </div>

          <h1 class="nog-hero__title" id="hero-title">
            <span class="nog-hero__title-line">Sejam bem</span>
            <span class="nog-hero__title-word">Vindos!</span>
          </h1>

          <ul class="nog-hero__perks" aria-label="Diferenciais anunciados pela NOG">
            <li class="nog-hero__perk">
              <svg class="nog-hero__icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3Z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
              <span>Qualidade<br>Garantida</span>
            </li>
            <li class="nog-hero__perk">
              <svg class="nog-hero__icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 17V7a1 1 0 0 1 1-1h9v11"/>
                <path d="M13 10h4l3 3v4h-2"/>
                <circle cx="7" cy="18" r="1.6"/>
                <circle cx="17" cy="18" r="1.6"/>
              </svg>
              <span>Envio<br>Rápido</span>
            </li>
            <li class="nog-hero__perk">
              <svg class="nog-hero__icon" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <path d="M2 10h20"/>
              </svg>
              <span>Pagamento<br>Seguro</span>
            </li>
          </ul>

          <div class="nog-hero__actions">
            <a class="nog-hero__cta" href="#catalogo">Explorar modelos</a>
          </div>
        </div>

        <div class="nog-hero__right">
          <div class="nog-hero__brush" aria-hidden="true"></div>
          <img id="campaign"
               class="nog-hero__photo"
               src="assets/homem-nog.webp"
               alt="Representante da NOG Lupas usando óculos escuros e segurando um item de exposição"
               width="720" height="901" loading="eager"
               decoding="async" fetchpriority="high">
        </div>
      </div>

      <div class="nog-hero__ribbon" aria-hidden="true">
        <div class="nog-hero__ribbon-track">
          <span>${faixaLonga}</span>
          <span>${faixaLonga}</span>
        </div>
      </div>

      <div class="nog-hero__watermark" aria-hidden="true">
        NOG LUPAS &nbsp; NOG LUPAS &nbsp; NOG LUPAS
      </div>
    `;
  }

  function prepararInterface() {
    montarNovaHero();
    const catalogo = document.querySelector('.catalog');
    const cabecalhoCatalogo = catalogo?.querySelector('.catalog-head');
    if (catalogo && cabecalhoCatalogo && !catalogo.querySelector('.nog-catalog-intro')) {
      const intro = document.createElement('div');
      intro.className = 'nog-catalog-intro';
      intro.innerHTML = `
        <p class="nog-catalog-kicker">Lupas para todos os estilos</p>
        <p class="nog-catalog-subline">Escolha a sua presença</p>`;
      catalogo.insertBefore(intro, cabecalhoCatalogo);
    }

    const header = document.querySelector('.site-header');
    if (header) {
      header.querySelector('.nog-indicacao')?.remove();
      const barra = header.querySelector('.header-inner');
      if (barra && !header.querySelector('.nog-topbar')) {
        const topo = document.createElement('div');
        topo.className = 'nog-topbar';
        topo.innerHTML = `
          <div class="shell nog-topbar-inner">
            <p>NOVIDADE | CONHEÇA A SELEÇÃO DE ÓCULOS DA NOG</p>
            <a href="https://wa.me/message/JSIBLEUALLYUP1" target="_blank"
               rel="noopener noreferrer">ATENDIMENTO ONLINE</a>
          </div>`;
        header.insertBefore(topo, barra);
      }
      if (barra && !header.querySelector('.nog-promo')) {
        const promo = document.createElement('a');
        promo.className = 'nog-promo';
        promo.href = '#catalogo';
        promo.textContent = 'TEM PRESENÇA. TEM NOG. | ENCONTRE A SUA PRÓXIMA LUPA';
        barra.insertAdjacentElement('afterend', promo);
      }
      adicionarItensAoMenu();
      function atualizarAltura() {
        const altura = ['.nog-topbar', '.header-inner', '.nog-promo'].reduce(
          (soma, seletor) => soma + (
            header.querySelector(seletor)?.getBoundingClientRect().height || 0
          ), 0);
        root.style.setProperty('--nog-altura-cabecalho', `${Math.ceil(altura)}px`);
      }
      function atualizarCabecalho() {
        header.classList.toggle('nog-rolado', window.scrollY > 40);
      }
      atualizarAltura();
      atualizarCabecalho();
      window.addEventListener('scroll', atualizarCabecalho, { passive: true });
      window.addEventListener('resize', atualizarAltura, { passive: true });
      if ('ResizeObserver' in window) {
        const observer = new ResizeObserver(atualizarAltura);
        ['.nog-topbar', '.header-inner', '.nog-promo'].forEach(seletor => {
          const elemento = header.querySelector(seletor);
          if (elemento) observer.observe(elemento);
        });
      }
    }

    montarFooterFinal();
    const foto = document.querySelector('#campaign');
    let encerrado = false;
    function concluir() {
      if (encerrado) return;
      encerrado = true;
      clearTimeout(limite);
      encerrarCarregamento();
    }
    if (!foto || foto.complete) concluir();
    else {
      foto.addEventListener('load', concluir, { once: true });
      foto.addEventListener('error', concluir, { once: true });
    }
    window.addEventListener('pageshow', encerrarCarregamento);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', prepararInterface, { once: true });
  } else prepararInterface();
})();
