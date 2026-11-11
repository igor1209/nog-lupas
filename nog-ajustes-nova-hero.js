/*
 * NOG Lupas — ajustes finais de interface, navegação e rodapé.
 * Mantém catálogo, produtos, filtros, visualizador e sacola do index.html / nog-upgrade.js.
 * Uma única implementação do rodapé: montarFooterFinal().
 */
(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('nog-carregando');
  const style = document.createElement('style');
  style.id = 'nog-ajustes-style';
  style.textContent = `
    :root {
      --nog-roxo: #6A51A2;
      --nog-roxo-escuro: #6F3E98;
      --nog-preto: #000;
      --nog-branco: #fff;
      --nog-altura-cabecalho: 158px;
      scroll-padding-top: calc(var(--nog-altura-cabecalho) + 18px);
    }
    html::before, html::after {position:fixed;opacity:0;visibility:hidden;pointer-events:none;}
    html.nog-carregando::before {
      content:'';inset:0;z-index:99998;opacity:1;visibility:visible;
      background:#101010 url('assets/logo.webp?v=20261111')
        center calc(50% - 40px)/88px 88px no-repeat;
    }
    html.nog-carregando::after {
      content:'Preparando seu próximo olhar';top:calc(50% + 32px);left:20px;right:20px;
      z-index:99999;opacity:1;visibility:visible;color:#fff;text-align:center;
      font:600 14px/1.5 Arial,sans-serif;letter-spacing:.02em;
    }

    /* Cabeçalho de três faixas e identidade NOG. */
    :root .site-header, :root .site-header.nog-rolado {
      position:fixed;inset:0 0 auto;z-index:30;background:#000;color:#fff;
      border:0;box-shadow:none;backdrop-filter:none;-webkit-backdrop-filter:none;
    }
    :root .site-header .nog-topbar {
      background:#161616;color:#fff;border-bottom:1px solid #292929;
    }
    :root .site-header .nog-topbar-inner {
      min-height:38px;display:flex;align-items:center;justify-content:center;
      position:relative;gap:18px;padding-block:8px;text-align:center;
    }
    :root .site-header .nog-topbar p {
      margin:0;font:500 11px/1.35 Arial,Helvetica,sans-serif;
    }
    :root .site-header .nog-topbar a {
      position:absolute;right:var(--gutter);display:inline-flex;align-items:center;
      min-height:24px;color:#fff;font:700 10px/1.2 Arial,Helvetica,sans-serif;
      text-underline-offset:3px;
    }
    :root .site-header .header-inner,
    :root .site-header.nog-rolado .header-inner {
      display:grid;grid-template-columns:minmax(150px,1fr) auto minmax(150px,1fr);
      align-items:center;height:78px;gap:22px;text-shadow:none;
    }
    :root .site-header .brand {
      display:inline-flex;align-items:center;gap:12px;width:fit-content;color:#fff;
    }
    :root .site-header .brand img {
      display:block !important;width:54px;height:54px;flex:0 0 54px;object-fit:contain;
      border-radius:50%;background:transparent !important;filter:none !important;
      mix-blend-mode:normal !important;opacity:1 !important;
    }
    :root .site-header .brand > div {
      display:flex;flex-direction:column;align-items:flex-start;justify-content:center;
      background:transparent;color:#fff;padding:0;
    }
    :root .site-header .brand strong {
      display:block;color:#fff;font:900 28px/.96 Arial,Helvetica,sans-serif;letter-spacing:-.07em;
    }
    :root .site-header .brand small {
      display:block;margin-top:5px;color:#fff;font-size:10px;
      font-weight:700;letter-spacing:.19em;
    }
    :root .site-header .main-nav {
      display:flex;justify-self:center;align-items:center;gap:clamp(10px,1.55vw,26px);
    }
    :root .site-header .main-nav a {
      display:inline-flex;align-items:center;min-height:48px;color:#fff;
      border-bottom:2px solid transparent;
      font:400 15px/1.2 Impact,'Arial Narrow',Arial,sans-serif;
      letter-spacing:.025em;text-transform:uppercase;white-space:nowrap;
    }
    :root .site-header .main-nav a:hover {border-bottom-color:var(--nog-roxo);}
    :root .site-header .header-actions {
      justify-self:end;display:flex;align-items:center;gap:8px;
    }
    :root .site-header .nog-icon, :root .site-header .icon-btn {
      display:inline-flex;align-items:center;justify-content:center;
      width:46px;height:46px;min-width:46px;padding:10px;
      border:0;border-radius:0;background:transparent;color:#fff;
    }
    :root .site-header .menu-button {display:none !important;}
    :root .site-header .nog-icon:hover, :root .site-header .icon-btn:hover {
      background:rgba(106,81,162,.3);opacity:1;
    }
    :root .site-header .nog-count, :root .site-header.nog-rolado .nog-count {
      background:var(--nog-roxo);color:#fff;
    }
    :root .site-header :is(.nog-icon,.icon-btn):focus-visible {
      outline:2px solid #fff;outline-offset:2px;
    }
    :root .site-header .nog-promo {
      display:flex;align-items:center;justify-content:center;width:100%;min-height:42px;
      padding:10px 24px;background:var(--nog-roxo);color:#fff;
      font:700 12px/1.5 Arial,Helvetica,sans-serif;
      text-transform:uppercase;text-align:center;text-decoration:none;
    }
    :root .site-header .nog-promo:hover {background:var(--nog-roxo-escuro);color:#fff;}
    :root .site-header .nog-indicacao {display:none !important;}
    :root .site-header .mobile-nav {
      background:#000;color:#fff;border-top:1px solid #292929;
      max-height:calc(100svh - var(--nog-altura-cabecalho));overflow-y:auto;text-shadow:none;
    }
    :root .site-header .mobile-nav a {color:#fff;border-bottom:1px solid #292929;}
    #nog-destaques {scroll-margin-top:calc(var(--nog-altura-cabecalho) + 18px);}

    /* NOVA HERO — conteúdo sem textos incorporados à imagem. */
    :root .hero.nog-hero-v2 {
      display:block !important;
      position:relative;
      height:auto !important;
      min-height:max(780px,100svh) !important;
      max-height:none;
      padding:calc(var(--nog-altura-cabecalho) + 18px) 0 112px;
      overflow:hidden;
      color:#fff;
      background:
        radial-gradient(ellipse at 18% 12%,rgba(106,81,162,.13),transparent 38%),
        linear-gradient(110deg,#070609 0%,#111016 55%,#09090b 100%);
      isolation:isolate;
    }
    :root .hero.nog-hero-v2::after {content:none !important;display:none !important;}
    :root .hero.nog-hero-v2::before {
      content:'';position:absolute;inset:0;z-index:0;pointer-events:none;
      background:repeating-linear-gradient(125deg,transparent 0 74px,rgba(255,255,255,.012) 75px,transparent 76px);
    }
    :root .hero.nog-hero-v2 .nog-hero-inner {
      display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.02fr);
      align-items:center;gap:clamp(16px,2.4vw,50px);
      position:relative;z-index:3;max-width:1480px;
      width:min(100% - 64px,1480px);margin:0 auto;
      min-height:clamp(510px,57vw,740px);
    }
    :root .hero.nog-hero-v2 .nog-hero-content {
      position:relative;z-index:4;min-width:0;max-width:680px;
      display:flex;flex-direction:column;align-items:flex-start;
      padding-block:32px 24px;
    }
    :root .hero.nog-hero-v2 .nog-hero-logo {
      display:inline-flex;flex-direction:column;align-items:center;
      width:max-content;max-width:100%;margin-bottom:clamp(30px,4.5vw,64px);
      text-decoration:none;color:#fff;
    }
    :root .hero.nog-hero-v2 .nog-logo-row {
      display:flex;align-items:center;gap:clamp(10px,1.3vw,20px);
      font-family:'Arial Rounded MT Bold','Trebuchet MS',Arial,sans-serif;
      font-size:clamp(39px,4.2vw,73px);font-weight:1000;
      line-height:1.05;letter-spacing:-.065em;white-space:nowrap;
      text-transform:uppercase;
    }
    :root .hero.nog-hero-v2 .nog-logo-word {display:inline-flex;position:relative;}
    :root .hero.nog-hero-v2 .nog-logo-word:first-child::before {
      content:'♛';position:absolute;top:-.52em;left:0;font-size:.38em;
      color:#f3c523;text-shadow:0 1px 3px rgba(0,0,0,.35);
      transform:rotate(-15deg);-webkit-text-stroke:0;
    }
    :root .hero.nog-hero-v2 .nog-logo-letter {
      display:inline-block;color:#6A51A2;
      -webkit-text-stroke:clamp(1px,.2vw,2.6px) #fff;
      paint-order:stroke fill;
      text-shadow:2px 4px 0 #2f164c,0 5px 14px rgba(81,34,136,.45);
      transform-origin:50% 75%;transition:transform .28s cubic-bezier(.2,.8,.2,1),filter .28s ease;
    }
    :root .hero.nog-hero-v2 .nog-hero-logo:hover .nog-logo-letter:nth-child(odd),
    :root .hero.nog-hero-v2 .nog-hero-logo:focus-visible .nog-logo-letter:nth-child(odd) {
      transform:translateY(-4px) rotate(-3deg);filter:brightness(1.18);
    }
    :root .hero.nog-hero-v2 .nog-hero-logo:hover .nog-logo-letter:nth-child(even),
    :root .hero.nog-hero-v2 .nog-hero-logo:focus-visible .nog-logo-letter:nth-child(even) {
      transform:translateY(3px) rotate(3deg);filter:brightness(1.18);
    }
    :root .hero.nog-hero-v2 .nog-logo-subtitle {
      width:100%;display:flex;align-items:center;justify-content:center;
      gap:12px;margin-top:10px;white-space:nowrap;
      color:rgba(255,255,255,.94);font:500 clamp(10px,1.05vw,14px)/1.2 Arial,sans-serif;
      letter-spacing:.28em;text-transform:uppercase;
    }
    :root .hero.nog-hero-v2 .nog-logo-subtitle::before,
    :root .hero.nog-hero-v2 .nog-logo-subtitle::after {
      content:'';height:1px;min-width:20px;flex:1;background:rgba(255,255,255,.7);
    }
    :root .hero.nog-hero-v2 .nog-welcome {margin:0;line-height:.86;text-transform:uppercase;}
    :root .hero.nog-hero-v2 .nog-welcome span {display:block;transition:filter .22s ease;}
    :root .hero.nog-hero-v2 .nog-welcome-top {
      font:900 clamp(41px,5.2vw,88px)/.93 Impact,'Arial Narrow',Arial,sans-serif;
      letter-spacing:-.025em;color:#fff;white-space:nowrap;
      text-shadow:0 5px 14px rgba(255,255,255,.08);
    }
    :root .hero.nog-hero-v2 .nog-welcome-bottom {
      padding:.05em 0 .1em;
      font:900 clamp(78px,9.3vw,160px)/.88 Impact,'Arial Narrow',Arial,sans-serif;
      letter-spacing:-.055em;white-space:nowrap;
      background:linear-gradient(180deg,#ed90ff 0%,#b54af0 47%,#801dc9 100%);
      -webkit-background-clip:text;background-clip:text;color:transparent;
    }
    :root .hero.nog-hero-v2 .nog-welcome:hover span {filter:brightness(1.12);}
    :root .hero.nog-hero-v2 .nog-hero-benefits {
      display:flex;align-items:center;justify-content:flex-start;flex-wrap:wrap;
      gap:0;margin-top:30px;
    }
    :root .hero.nog-hero-v2 .nog-benefit {
      display:inline-flex;align-items:center;gap:10px;
      min-height:52px;padding:0 18px;border-right:1px solid rgba(255,255,255,.54);
    }
    :root .hero.nog-hero-v2 .nog-benefit:first-child {padding-left:0;}
    :root .hero.nog-hero-v2 .nog-benefit:last-child {border-right:0;}
    :root .hero.nog-hero-v2 .nog-benefit svg {
      flex:0 0 33px;width:33px;height:33px;fill:none;stroke:#bb4ae9;
      stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;
    }
    :root .hero.nog-hero-v2 .nog-benefit strong {
      font:800 clamp(10px,1vw,13px)/1.18 Arial,sans-serif;
      letter-spacing:.005em;text-transform:uppercase;color:#fff;
    }
    :root .hero.nog-hero-v2 .nog-hero-actions {margin-top:28px;}
    :root .hero.nog-hero-v2 .nog-hero-cta {
      min-height:50px;display:inline-flex;align-items:center;justify-content:center;
      padding:14px 24px;background:#6A51A2;color:#fff;text-decoration:none;
      border:1px solid rgba(255,255,255,.18);
      font:700 13px/1 Arial,sans-serif;letter-spacing:.07em;text-transform:uppercase;
      transition:background-color .2s ease,transform .2s ease;
    }
    :root .hero.nog-hero-v2 .nog-hero-cta:hover {background:#6F3E98;transform:translateY(-2px);}
    :root .hero.nog-hero-v2 .nog-hero-visual {
      position:relative;isolation:isolate;display:flex;align-items:flex-end;
      justify-content:center;min-width:0;min-height:520px;
      height:min(65vw,720px);align-self:stretch;
    }
    :root .hero.nog-hero-v2 .nog-hero-brush {
      position:absolute;z-index:0;width:114%;height:95%;inset:0 -7% 0 -7%;
      filter:drop-shadow(0 20px 26px rgba(0,0,0,.3));pointer-events:none;
    }
    :root .hero.nog-hero-v2 #campaign.nog-hero-man {
      display:block !important;position:relative !important;z-index:1;
      width:min(98%,750px) !important;height:100% !important;
      max-height:720px !important;max-width:none !important;
      object-fit:contain !important;object-position:center bottom !important;
      inset:auto !important;opacity:1 !important;
      filter:drop-shadow(0 14px 20px rgba(0,0,0,.24)) !important;
      pointer-events:none;
    }
    :root .hero.nog-hero-v2 .nog-hero-marquee {
      position:absolute;left:-2%;bottom:63px;z-index:5;width:104%;
      height:40px;overflow:hidden;display:flex;align-items:center;
      transform:rotate(-1.7deg);
      background:linear-gradient(180deg,#842bd4 0%,#6A51A2 100%);
      border-top:2px solid rgba(255,255,255,.86);
      border-bottom:2px solid rgba(255,255,255,.86);
      box-shadow:0 8px 22px rgba(0,0,0,.25);
    }
    :root .hero.nog-hero-v2 .nog-marquee-track {
      display:flex;flex:0 0 auto;width:max-content;white-space:nowrap;
      animation:nog-ticker 43s linear infinite;
    }
    :root .hero.nog-hero-v2 .nog-marquee-segment {
      display:flex;align-items:center;gap:20px;flex:0 0 auto;
      padding-inline:10px;
      font:700 13px/1 Arial,sans-serif;letter-spacing:.085em;
      text-transform:uppercase;color:#fff;
    }
    @keyframes nog-ticker {to {transform:translateX(-50%);}}
    :root .hero.nog-hero-v2 .nog-hero-watermark {
      position:absolute;z-index:1;bottom:-.12em;left:0;right:0;
      overflow:hidden;display:flex;gap:36px;pointer-events:none;
      white-space:nowrap;user-select:none;
      font:900 clamp(80px,10vw,176px)/.9 Impact,'Arial Narrow',Arial,sans-serif;
      letter-spacing:-.02em;color:transparent;
      -webkit-text-stroke:1px rgba(255,255,255,.14);
    }
    :root .hero.nog-hero-v2 :is(.nog-hero-logo,.nog-hero-cta):focus-visible {
      outline:2px solid #fff;outline-offset:5px;
    }
    @media (max-width:1250px) {
      :root .hero.nog-hero-v2 .nog-hero-inner {width:min(100% - 44px,1480px);gap:18px;}
      :root .hero.nog-hero-v2 .nog-benefit {padding:0 10px;gap:7px;}
      :root .hero.nog-hero-v2 .nog-benefit svg {width:28px;height:28px;flex-basis:28px;}
      :root .hero.nog-hero-v2 .nog-logo-row {font-size:clamp(36px,4.4vw,62px);}
      :root .hero.nog-hero-v2 .nog-welcome-top {font-size:clamp(40px,5.1vw,70px);}
      :root .hero.nog-hero-v2 .nog-welcome-bottom {font-size:clamp(68px,9vw,125px);}
    }
    @media (max-width:900px) {
      :root .hero.nog-hero-v2 {min-height:auto !important;padding-bottom:104px;}
      :root .hero.nog-hero-v2 .nog-hero-inner {
        display:flex;flex-direction:column;align-items:center;width:min(100% - 36px,620px);
        min-height:0;gap:12px;
      }
      :root .hero.nog-hero-v2 .nog-hero-content {align-items:center;text-align:center;padding:20px 0 0;}
      :root .hero.nog-hero-v2 .nog-hero-logo {margin-bottom:38px;}
      :root .hero.nog-hero-v2 .nog-logo-row {font-size:clamp(42px,8vw,66px);}
      :root .hero.nog-hero-v2 .nog-welcome-top {font-size:clamp(42px,8vw,72px);}
      :root .hero.nog-hero-v2 .nog-welcome-bottom {font-size:clamp(78px,14vw,128px);}
      :root .hero.nog-hero-v2 .nog-hero-benefits {justify-content:center;margin-top:24px;}
      :root .hero.nog-hero-v2 .nog-hero-visual {align-self:center;min-height:340px;height:min(75vw,570px);width:100%;}
      :root .hero.nog-hero-v2 .nog-hero-brush {inset:0;width:100%;height:100%;}
    }
    @media (max-width:520px) {
      :root .hero.nog-hero-v2 {padding-top:calc(var(--nog-altura-cabecalho) + 8px);}
      :root .hero.nog-hero-v2 .nog-hero-inner {width:calc(100% - 30px);}
      :root .hero.nog-hero-v2 .nog-logo-row {gap:10px;font-size:clamp(30px,8.4vw,43px);}
      :root .hero.nog-hero-v2 .nog-logo-subtitle {font-size:10px;letter-spacing:.18em;}
      :root .hero.nog-hero-v2 .nog-welcome-top {font-size:clamp(36px,9.3vw,50px);}
      :root .hero.nog-hero-v2 .nog-welcome-bottom {font-size:clamp(67px,17vw,92px);}
      :root .hero.nog-hero-v2 .nog-hero-benefits {
        display:grid;grid-template-columns:repeat(3,minmax(0,1fr));
        width:100%;gap:0;
      }
      :root .hero.nog-hero-v2 .nog-benefit {
        min-width:0;min-height:64px;flex-direction:column;justify-content:center;
        padding:0 5px;gap:5px;
      }
      :root .hero.nog-hero-v2 .nog-benefit strong {font-size:clamp(8px,2.45vw,10px);line-height:1.15;}
      :root .hero.nog-hero-v2 .nog-hero-actions {margin-top:24px;}
      :root .hero.nog-hero-v2 .nog-hero-visual {min-height:315px;height:min(86vw,450px);}
      :root .hero.nog-hero-v2 .nog-hero-marquee {height:36px;bottom:54px;}
      :root .hero.nog-hero-v2 .nog-marquee-segment {font-size:11px;gap:14px;}
      :root .hero.nog-hero-v2 .nog-hero-watermark {font-size:75px;}
    }
    @media (prefers-reduced-motion:reduce) {
      :root .hero.nog-hero-v2 .nog-marquee-track {animation:none !important;}
      :root .hero.nog-hero-v2 .nog-logo-letter,
      :root .hero.nog-hero-v2 .nog-hero-cta {transition:none !important;}
    }

    /* Visual e funcionamento do catálogo preservados. */
    :root .catalog {
      position:relative;isolation:isolate;color:#fff;padding-top:0;padding-bottom:84px;
    }
    :root .catalog::before {
      content:'';position:absolute;inset:0 auto 0 50%;width:100vw;
      transform:translateX(-50%);background:#101010;z-index:-1;pointer-events:none;
    }
    .nog-catalog-intro {
      max-width:900px;margin:0 auto;
      padding:clamp(64px,6vw,100px) 0 clamp(90px,8vw,132px);text-align:center;
    }
    .nog-catalog-kicker {
      margin:0;color:#fff;font:400 clamp(25px,2.1vw,35px)/1.2
        Impact,'Arial Narrow',Arial,sans-serif;
      letter-spacing:.025em;text-transform:uppercase;text-wrap:balance;
    }
    .nog-catalog-subline {
      margin:14px 0 0;color:#b9b9b9;font-size:12px;font-weight:600;
      letter-spacing:.15em;text-transform:uppercase;
    }
    :root .catalog .catalog-head {
      display:flex;align-items:end;justify-content:space-between;gap:24px;margin:0;
      padding-top:46px;border-top:1px solid rgba(255,255,255,.2);
    }
    :root .catalog .catalog-head h2 {
      color:#fff;font-size:clamp(30px,2.7vw,42px);line-height:1.12;
    }
    :root .catalog .catalog-head p {color:#b9b9b9;margin-top:12px;font-size:14px;}
    :root .catalog :is(.catalog-count,.product-brand,.product-color,.product-bottom > span,.empty p) {
      color:#b9b9b9;
    }
    :root .catalog :is(.product-name,.empty h3) {color:#fff;}
    :root .catalog .toolbar {
      display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;
      gap:20px 28px;margin:30px 0 38px;padding-bottom:24px;
      border-bottom:1px solid rgba(255,255,255,.2);
    }
    :root .catalog .brand-filters {display:flex;flex-wrap:wrap;gap:10px;}
    :root .catalog .filter {
      min-height:48px;padding:10px 22px;border:1px solid rgba(255,255,255,.38);
      border-radius:999px;background:transparent;color:#fff;font-weight:600;
    }
    :root .catalog .filter:hover {border-color:#fff;}
    :root .catalog .filter[aria-pressed='true'] {
      background:#fff;border-color:#fff;color:#101010;
    }
    :root .catalog .search-box {
      min-height:48px;color:#fff;border-bottom:1px solid rgba(255,255,255,.45);
    }
    :root .catalog .search-box input {min-height:48px;background:transparent;color:#fff;}
    :root .catalog .search-box input::placeholder {color:#b9b9b9;opacity:1;}
    :root .catalog .product-image {background:#fff;}
    :root .catalog .detail-button {color:#fff;border-bottom-color:#fff;}
    :root .catalog .nog-card-add {background:#fff;border-color:#fff;color:#101010;}
    :root .catalog .nog-card-add:hover {
      background:#dedede;border-color:#dedede;color:#101010;
    }

    /* Rodapé final: produtos existentes, novidades, ajuda e marca NOG. */
    html body footer.nog-footer.nog-footer-final {
      padding:0;border:0;background:#222124;color:#f7f6fa;
      font-family:Arial,Helvetica,sans-serif;
    }
    html body footer.nog-footer-final .nog-footer-topbar {
      background:#2d2934;border-top:2px solid var(--nog-roxo);
      border-bottom:1px solid #48414d;
    }
    html body footer.nog-footer-final .nog-footer-topbar-inner {
      min-height:56px;display:flex;align-items:center;justify-content:space-between;
      gap:10px 28px;flex-wrap:wrap;padding-block:12px;
    }
    html body footer.nog-footer-final .nog-footer-topbar p {
      margin:0;max-width:none;color:#e6e1eb;font-size:12px;line-height:1.5;
    }
    html body footer.nog-footer-final .nog-footer-eyebrow {
      margin:0 0 12px;color:#c4addf;font-size:11px;font-weight:700;
      text-transform:uppercase;letter-spacing:.16em;
    }
    html body footer.nog-footer-final .nog-footer-featured {
      padding-block:clamp(38px,5vw,64px) clamp(36px,4vw,56px);
      border-bottom:1px solid #444047;
    }
    html body footer.nog-footer-final .nog-footer-featured-head {
      display:flex;align-items:end;justify-content:space-between;
      gap:18px;margin-bottom:24px;
    }
    html body footer.nog-footer-final .nog-footer-featured h2 {
      margin:0;color:#fff;font-size:clamp(24px,3vw,36px);
      line-height:1.08;letter-spacing:-.04em;
    }
    html body footer.nog-footer-final .nog-footer-featured-head p:last-child {
      margin:10px 0 0;max-width:580px;color:#c4c0c9;
      font-size:13px;line-height:1.6;
    }
    html body footer.nog-footer-final .nog-footer-view-all {
      display:inline-flex;align-items:center;justify-content:center;
      min-height:48px;padding:10px 16px;flex-shrink:0;
      border:1px solid #706779;color:#fff;font-size:12px;
      font-weight:700;text-decoration:none;
    }
    html body footer.nog-footer-final .nog-footer-view-all:hover {
      border-color:#fff;background:rgba(255,255,255,.07);
    }
    html body footer.nog-footer-final .nog-footer-featured-grid {
      display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;
    }
    html body footer.nog-footer-final .nog-footer-feature {
      display:flex;align-items:center;width:100%;min-height:120px;gap:16px;padding:14px;
      color:#fff;text-align:left;border:1px solid #47414d;background:#29262e;
      cursor:pointer;transition:background-color .16s ease,border-color .16s ease;
    }
    html body footer.nog-footer-final .nog-footer-feature:hover {
      background:#342e3d;border-color:#9579c6;
    }
    html body footer.nog-footer-final .nog-footer-feature-image {
      width:106px;height:86px;flex:0 0 106px;
      display:flex;align-items:center;justify-content:center;background:#fff;overflow:hidden;
    }
    html body footer.nog-footer-final .nog-footer-feature-image img {
      width:100%;height:100%;object-fit:contain;filter:none;mix-blend-mode:normal;
    }
    html body footer.nog-footer-final .nog-footer-feature-copy {
      display:flex;flex-direction:column;gap:6px;min-width:0;
    }
    html body footer.nog-footer-final .nog-footer-feature-copy small {
      color:#c7bdd3;font-size:11px;
    }
    html body footer.nog-footer-final .nog-footer-feature-copy strong {
      font-size:16px;letter-spacing:-.02em;line-height:1.2;
    }
    html body footer.nog-footer-final .nog-footer-feature-copy em {
      color:#fff;font-size:12px;font-style:normal;
      text-decoration:underline;text-underline-offset:4px;
    }
    html body footer.nog-footer-final .nog-footer-main {
      display:grid;grid-template-columns:minmax(190px,1.35fr) repeat(3,minmax(130px,1fr));
      column-gap:clamp(24px,4vw,70px);row-gap:34px;
      padding-block:clamp(40px,5vw,68px);
    }
    html body footer.nog-footer-final .nog-footer-signature {
      display:inline-flex;align-items:center;gap:14px;width:fit-content;
      color:#fff;text-decoration:none;
    }
    html body footer.nog-footer-final .nog-footer-signature img {
      display:block !important;width:68px;height:68px;flex:0 0 68px;
      border-radius:50%;object-fit:contain;filter:none !important;
      background:transparent !important;mix-blend-mode:normal !important;
    }
    html body footer.nog-footer-final .nog-footer-name {
      display:flex;flex-direction:column;align-items:flex-start;
    }
    html body footer.nog-footer-final .nog-footer-signature strong {
      color:#fff;font-size:32px;font-weight:900;line-height:.96;letter-spacing:-.075em;
    }
    html body footer.nog-footer-final .nog-footer-signature small {
      margin-top:5px;color:#fff;font-size:10px;font-weight:700;letter-spacing:.22em;
    }
    html body footer.nog-footer-final .nog-footer-description {
      margin:18px 0 0;max-width:275px;color:#c9c4ce;
      font-size:13px;line-height:1.7;
    }
    html body footer.nog-footer-final .nog-footer-column h2 {
      margin:0 0 14px;color:#fff;
      font:400 16px/1.3 Impact,'Arial Narrow',Arial,sans-serif;
      letter-spacing:.035em;text-transform:uppercase;
    }
    html body footer.nog-footer-final .nog-footer-links {
      display:flex;flex-direction:column;align-items:flex-start;
    }
    html body footer.nog-footer-final .nog-footer-links :is(a,button) {
      display:inline-flex;align-items:center;min-height:44px;width:fit-content;
      padding:8px 0;border:0;margin:0;background:transparent;
      color:#d3ced9;cursor:pointer;text-align:left;text-decoration:none;
      font:400 13px/1.45 Arial,Helvetica,sans-serif;
    }
    html body footer.nog-footer-final .nog-footer-links :is(a,button):hover {
      color:#fff;text-decoration:underline;text-decoration-color:#b69bd8;
      text-underline-offset:4px;
    }
    html body footer.nog-footer-final .nog-footer-socials {
      display:flex;align-items:center;gap:10px;margin-top:16px;
    }
    html body footer.nog-footer-final .nog-footer-socials a {
      display:inline-flex;align-items:center;justify-content:center;
      width:46px;height:46px;padding:0;border:1px solid #625a69;
      border-radius:50%;color:#fff;background:transparent;
    }
    html body footer.nog-footer-final .nog-footer-socials a:hover {
      background:#3b3346;border-color:#b69bd8;
    }
    html body footer.nog-footer-final .nog-footer-socials svg {
      width:20px;height:20px;fill:none;stroke:currentColor;
      stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;
    }
    html body footer.nog-footer-final .nog-footer-faq {
      border-top:1px solid #444047;padding-block:26px 40px;
    }
    html body footer.nog-footer-final .nog-footer-faq h2 {
      margin:0 0 12px;color:#fff;
      font:400 18px/1.3 Impact,'Arial Narrow',Arial,sans-serif;
      letter-spacing:.03em;text-transform:uppercase;
    }
    html body footer.nog-footer-final .nog-footer-faq-grid {
      display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;
    }
    html body footer.nog-footer-final .nog-footer-faq details {
      border-top:1px solid #625a69;
    }
    html body footer.nog-footer-final .nog-footer-faq summary {
      display:flex;align-items:center;justify-content:space-between;gap:12px;
      min-height:50px;padding:12px 0;list-style:none;cursor:pointer;
      color:#f4f1f7;font-size:13px;font-weight:700;
    }
    html body footer.nog-footer-final .nog-footer-faq summary::-webkit-details-marker {display:none;}
    html body footer.nog-footer-final .nog-footer-faq summary::after {
      content:'+';font:400 20px/1 Arial,sans-serif;color:#c6addf;
    }
    html body footer.nog-footer-final .nog-footer-faq details[open] summary::after {content:'−';}
    html body footer.nog-footer-final .nog-footer-faq details p {
      margin:0 0 16px;max-width:none;color:#cbc5d1;
      font-size:12px;line-height:1.65;
    }
    html body footer.nog-footer-final .nog-footer-bottom {
      display:block;margin:0;padding:0;background:#18171b;
      color:#c6c0cd;border:0;
    }
    html body footer.nog-footer-final .nog-footer-bottom-inner {
      display:flex;align-items:center;justify-content:space-between;
      gap:12px 32px;flex-wrap:wrap;padding-block:20px;
      border-bottom:1px solid #37323d;
    }
    html body footer.nog-footer-final .nog-footer-bottom-inner span {font-size:12px;}
    html body footer.nog-footer-final .nog-footer-legal {padding-block:18px 26px;}
    html body footer.nog-footer-final .nog-footer-legal p {
      margin:0;max-width:1100px;color:#b0a9b8;font-size:11px;line-height:1.75;
    }
    html body footer.nog-footer-final :is(a,button,summary):focus-visible {
      outline:2px solid #d8beff;outline-offset:3px;
    }
    :root .nog-button, :root .nog-card-add {
      min-height:48px;border-radius:12px;font-weight:700;
    }
    :root .icon-btn, :root .nog-icon {border-radius:50%;}
    :root .nog-field input, :root .request-input,
    :root .search-box, :root .nog-quantity {border-radius:10px;}
    :root .cta:focus-visible, :root .nog-button:focus-visible,
    :root .nog-card-add:focus-visible, :root .filter:focus-visible,
    :root .detail-button:focus-visible {
      outline:3px solid currentColor;outline-offset:4px;
    }
    :root .hero .cta {border-radius:0;}

    @media (max-width:1050px) and (min-width:701px) {
      :root .site-header .header-inner {
        grid-template-columns:160px minmax(0,1fr) 160px;gap:10px;
      }
      :root .site-header .brand img {width:46px;height:46px;flex-basis:46px;}
      :root .site-header .brand strong {font-size:23px;}
      :root .site-header .main-nav {gap:14px;}
      :root .site-header .main-nav a {font-size:12px;}
      :root .site-header .header-actions {gap:0;}
    }
    @media (max-width:1100px) {
      html body footer.nog-footer-final .nog-footer-main {
        grid-template-columns:repeat(2,minmax(0,1fr));
      }
      html body footer.nog-footer-final .nog-footer-identity {grid-column:1/-1;}
    }
    @media (max-width:900px) {
      html body footer.nog-footer-final .nog-footer-feature {
        flex-direction:column;align-items:stretch;gap:12px;
      }
      html body footer.nog-footer-final .nog-footer-feature-image {
        width:100%;height:105px;flex-basis:105px;
      }
    }
    @media (max-width:1020px) and (min-width:701px) {
      :root .site-header .main-nav {display:none !important;}
      :root .site-header .menu-button {display:inline-flex !important;}
    }
    @media (max-width:700px) {
      :root .site-header .nog-topbar-inner {min-height:32px;padding-block:7px;}
      :root .site-header .nog-topbar p {font-size:10px;}
      :root .site-header .nog-topbar a {display:none;}
      :root .site-header .header-inner,
      :root .site-header.nog-rolado .header-inner {
        display:flex;height:66px;justify-content:space-between;
        gap:10px;padding-inline:16px;
      }
      :root .site-header .brand {gap:8px;}
      :root .site-header .brand img {width:44px;height:44px;flex-basis:44px;}
      :root .site-header .brand strong {font-size:22px;}
      :root .site-header .brand small {font-size:8px;}
      :root .site-header .main-nav {display:none !important;}
      :root .site-header .menu-button {display:inline-flex !important;}
      :root .site-header .header-actions {gap:0;}
      :root .site-header .nog-icon, :root .site-header .icon-btn {
        width:44px;height:44px;min-width:44px;padding:8px;
      }
      :root .site-header .nog-promo {min-height:38px;padding:9px 14px;font-size:10px;}
      :root .hero {min-height:640px;}
      :root .hero .hero-copy {padding-bottom:40px;}
      :root .hero .cta {max-width:100%;}
      .nog-catalog-intro {padding:52px 12px 72px;}
      .nog-catalog-kicker {font-size:clamp(23px,6vw,30px);}
      .nog-catalog-subline {font-size:10px;letter-spacing:.12em;}
      :root .catalog {padding-bottom:58px;}
      :root .catalog .catalog-head {
        flex-direction:column;align-items:flex-start;gap:12px;padding-top:32px;
      }
      :root .catalog .catalog-head h2 {font-size:clamp(28px,7vw,35px);}
      :root .catalog .toolbar {
        flex-direction:column;align-items:stretch;gap:18px;
        margin:24px 0 30px;padding-bottom:20px;
      }
      :root .catalog .brand-filters {
        display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;
      }
      :root .catalog .filter {padding:10px 6px;font-size:12px;}
      :root .catalog .search-box {width:100%;}
      html body footer.nog-footer-final .nog-footer-featured-head {
        flex-direction:column;align-items:flex-start;
      }
      html body footer.nog-footer-final .nog-footer-featured-grid {
        grid-template-columns:1fr;gap:10px;
      }
      html body footer.nog-footer-final .nog-footer-feature {
        flex-direction:row;min-height:102px;
      }
      html body footer.nog-footer-final .nog-footer-feature-image {
        width:104px;height:78px;flex:0 0 104px;
      }
      html body footer.nog-footer-final .nog-footer-main {gap:26px 18px;padding-block:40px;}
      html body footer.nog-footer-final .nog-footer-faq-grid {
        grid-template-columns:1fr;gap:4px;
      }
      html body footer.nog-footer-final .nog-footer-bottom-inner {
        flex-direction:column;align-items:flex-start;
      }
      html body footer.nog-footer-final .nog-footer-topbar p {font-size:11px;}
    }
    @media (max-width:390px) {
      html body footer.nog-footer-final .nog-footer-main {grid-template-columns:1fr;}
      html body footer.nog-footer-final .nog-footer-feature-image {
        width:86px;flex-basis:86px;
      }
    }
    @media (prefers-reduced-motion:reduce) {
      :root .site-header, :root .nog-button, :root .nog-card-add,
      :root .filter, html body footer.nog-footer-final .nog-footer-feature {
        transition:none !important;
      }
    }
  `;
  document.head.appendChild(style);

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

  /* Hero: logo, título, ícones e faixa são HTML/SVG reais.
     O único elemento fotográfico é assets/homem-nog.png. */
  function montarNovaHero() {
    const hero = document.querySelector('#inicio.hero');
    if (!hero || hero.classList.contains('nog-hero-v2')) return;

    const letras = palavra => Array.from(palavra).map(letra =>
      `<span class="nog-logo-letter" aria-hidden="true">${letra}</span>`
    ).join('');

    const itens = 'NOG LUPAS · ÓCULOS · ESTILO · PROTEÇÃO · PERFORMANCE';
    const repetir = () => Array(6).fill(0).map(() =>
      `<span>${itens}</span>`
    ).join('');

    hero.classList.add('nog-hero-v2');
    hero.setAttribute('aria-labelledby','hero-title');
    hero.innerHTML = `
      <div class="nog-hero-inner">
        <div class="nog-hero-content">
          <a class="nog-hero-logo" href="#inicio" aria-label="NOG Lupas, início">
            <span class="nog-logo-row" aria-hidden="true">
              <span class="nog-logo-word">${letras('NOG')}</span>
              <span class="nog-logo-word">${letras('LUPAS')}</span>
            </span>
            <span class="nog-logo-subtitle">Óculos e estilo</span>
          </a>
          <h1 class="nog-welcome" id="hero-title">
            <span class="nog-welcome-top">Sejam bem</span>
            <span class="nog-welcome-bottom">Vindos!</span>
          </h1>
          <div class="nog-hero-benefits" aria-label="Diferenciais da NOG">
            <div class="nog-benefit">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2 20 5v6c0 5-3 8.5-8 11-5-2.5-8-6-8-11V5l8-3Z"/>
                <path d="m8 12 2.7 2.7L16.5 9"/>
              </svg>
              <strong>Qualidade<br>garantida</strong>
            </div>
            <div class="nog-benefit">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 6h11v10H3zM14 9h4l3 4v3h-7"/>
                <circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>
                <path d="M1 10h5M1 13h4"/>
              </svg>
              <strong>Envio<br>rápido</strong>
            </div>
            <div class="nog-benefit">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <path d="M2 10h20M6 15h5"/>
              </svg>
              <strong>Pagamento<br>seguro</strong>
            </div>
          </div>
          <div class="nog-hero-actions">
            <a class="nog-hero-cta" href="#catalogo">Explorar modelos</a>
          </div>
        </div>
        <div class="nog-hero-visual">
          <svg class="nog-hero-brush" viewBox="0 0 750 800" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <filter id="nog-brush-rough" x="-8%" y="-8%" width="116%" height="116%">
                <feTurbulence type="fractalNoise" baseFrequency=".018 .035" numOctaves="3" seed="6" result="grain"/>
                <feDisplacementMap in="SourceGraphic" in2="grain" scale="22" xChannelSelector="R" yChannelSelector="G"/>
              </filter>
            </defs>
            <g filter="url(#nog-brush-rough)">
              <path fill="#fff" d="M155 2 746 0 692 31 748 58 715 85 750 112 716 129 750 167 711 187 743 205 714 238 750 260 728 301 749 322 707 345 748 377 706 398 743 419 707 444 747 466 708 499 746 514 699 544 748 565 712 584 742 607 694 632 734 653 703 689 737 704 708 733 750 754 717 783 740 799 71 800 100 757 58 729 109 697 74 673 113 645 66 618 117 594 76 562 122 540 93 507 133 477 88 449 130 412 93 386 142 361 105 332 154 307 123 279 165 247 140 220 179 197 153 170 203 146 178 126 222 102 204 82 250 56 233 36Z"/>
            <path fill="#fff" d="M28 170 155 110 142 139 23 201Z M3 390 139 337 129 357 19 416Z M4 605 120 555 106 578 14 637Z M52 766 131 722 115 746 40 788Z"/>
            </g>
          </svg>
          <img id="campaign" class="nog-hero-man"
               src="assets/homem-nog.png"
               width="829" height="1037"
               alt="Representante da NOG Lupas usando óculos escuros e segurando uma bota de exposição"
               decoding="async" fetchpriority="high">
        </div>
      </div>
      <div class="nog-hero-watermark" aria-hidden="true">
        <span>NOG LUPAS</span><span>NOG LUPAS</span><span>NOG LUPAS</span>
      </div>
      <div class="nog-hero-marquee" aria-hidden="true">
        <div class="nog-marquee-track">
          <div class="nog-marquee-segment">${repetir()}</div>
          <div class="nog-marquee-segment">${repetir()}</div>
        </div>
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
