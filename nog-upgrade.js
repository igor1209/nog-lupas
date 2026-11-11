
/*
 * NOG Lupas
 * Recursos adicionais da loja.
 * Catálogo, sacola, conta local, campanha e rodapé.
 */

(() => {
  "use strict";

  if (document.getElementById("nog-upgrade-style")) return;

  const q = selector => document.querySelector(selector);
  const all = selector => [...document.querySelectorAll(selector)];

  const escape = value =>
    String(value).replace(/[&<>"']/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]);

  const icons = {
    search: `
      <circle cx="10.5" cy="10.5" r="7"/>
      <path d="m16 16 5 5"/>
    `,
    user: `
      <circle cx="12" cy="7.5" r="4.2"/>
      <path d="M3.5 22v-2a8.5 6.5 0 0 1 17 0v2Z"/>
    `,
    bag: `
      <path d="M5 8h14l2 14H3L5 8Z"/>
      <path d="M8 10V6a4 4 0 0 1 8 0v4"/>
    `,
    close: `
      <path d="m5 5 14 14M19 5 5 19"/>
    `,
    plus: `<path d="M12 5v14M5 12h14"/>`,
    minus: `<path d="M5 12h14"/>`
  };

  const icon = name => `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      ${icons[name]}
    </svg>
  `;

  /*
   * CSS adicional
   */

  const style = document.createElement("style");
  style.id = "nog-upgrade-style";

  style.textContent = `
    .site-header .header-actions {
      gap: 12px;
    }

    .nog-icon {
      width: 48px;
      height: 48px;
      min-width: 48px;
      border: 0;
      background: transparent;
      padding: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
      color: inherit;
    }

    .nog-icon svg {
      width: 27px;
      height: 27px;
      stroke: currentColor;
      stroke-width: 1.65;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
    }

    .nog-icon:hover {
      opacity: .7;
    }

    .nog-icon:focus-visible,
    .nog-button:focus-visible,
    .nog-text:focus-visible {
      outline: 3px solid var(--green);
      outline-offset: 4px;
    }

    .site-header .nog-icon:focus-visible {
      outline-color: currentColor;
    }

    .nog-count {
      position: absolute;
      right: 0;
      top: 0;
      background: var(--white);
      color: var(--black);
      font-size: 10px;
      min-width: 17px;
      height: 17px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      padding: 0 3px;
    }

    .hero {
      text-align: left;
      justify-content: start;
    }

    .hero > img {
      object-position: center center;
    }

    .hero-copy {
      width: 100%;
      max-width: 1560px;
      margin: auto;
      padding: 60px var(--gutter);
    }

    .hero h1 {
      max-width: 570px;
      margin: 0;
      font-size: clamp(44px, 5.2vw, 80px);
    }

    .hero p {
      max-width: 430px;
      margin: 22px 0 28px;
    }

    .hero::after {
      inset: 0;
      background: linear-gradient(
        90deg,
        rgba(0,0,0,.46),
        transparent 68%
      );
    }

    .product-image,
    .viewer-side,
    .thumbnail {
      background: var(--white);
    }

    .product-image img,
    .viewer-stage img,
    .thumbnail img {
      mix-blend-mode: normal;
      background: transparent;
    }

    .product-image {
      padding: 8px;
    }

    .viewer-side {
      border-right: 1px solid var(--line);
    }

    .product-bottom {
      flex-wrap: wrap;
    }

    .nog-card-add {
      margin-top: 10px;
      width: 100%;
      min-height: 46px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: var(--black);
      color: var(--white);
      border: 1px solid var(--black);
      padding: 10px 14px;
      font-size: 13px;
      cursor: pointer;
    }

    .nog-card-add svg {
      width: 18px;
      height: 18px;
    }

    .nog-card-add:hover,
    .nog-button:hover {
      background: var(--green);
      border-color: var(--green);
    }

    .nog-card-add:focus-visible {
      outline: 3px solid var(--green);
      outline-offset: 4px;
    }

    .nog-add-dialog {
      margin-top: 16px;
      width: 100%;
    }

    /*
     * Painéis de conta e sacola
     */

    .nog-modal {
      position: fixed;
      inset: 0 0 0 auto;
      margin: 0;
      width: min(100%, 540px);
      height: 100svh;
      max-height: 100svh;
      max-width: 100%;
      border: 0;
      padding: 0;
      background: var(--white);
      color: var(--black);
      overflow: auto;
    }

    .nog-modal::backdrop {
      background: rgba(0,0,0,.56);
    }

    .nog-modal-head {
      position: sticky;
      top: 0;
      background: var(--white);
      z-index: 2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      padding: 22px 26px;
      border-bottom: 1px solid var(--line);
    }

    .nog-modal h2 {
      font-size: 30px;
      letter-spacing: -.045em;
      margin: 0;
    }

    .nog-modal-body {
      padding: 26px;
    }

    .nog-muted {
      font-size: 13px;
      color: var(--grey);
      line-height: 1.6;
    }

    .nog-button {
      min-height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      width: 100%;
      border: 1px solid var(--black);
      background: var(--black);
      color: var(--white);
      padding: 12px 18px;
      font: 600 14px var(--font);
      cursor: pointer;
      text-decoration: none;
    }

    .nog-button svg {
      width: 20px;
      height: 20px;
    }

    .nog-button:disabled {
      opacity: .45;
      cursor: not-allowed;
    }

    .nog-text {
      display: inline-flex;
      align-items: center;
      min-height: 44px;
      padding: 8px 0;
      border: 0;
      background: transparent;
      color: inherit;
      font-size: 13px;
      text-decoration: underline;
      text-underline-offset: 4px;
      cursor: pointer;
    }

    .nog-field {
      display: block;
      margin-top: 20px;
      font-size: 13px;
    }

    .nog-field input {
      display: block;
      width: 100%;
      min-height: 48px;
      border: 1px solid var(--grey);
      padding: 12px;
      margin-top: 8px;
      background: var(--white);
      border-radius: 10px;
      font-size: 15px;
    }

    .nog-field input:focus-visible {
      outline: 3px solid var(--green);
      outline-offset: 3px;
    }

    .nog-form .nog-button {
      margin-top: 26px;
    }

    .nog-status {
      font-size: 12px;
      line-height: 1.6;
      min-height: 24px;
      margin-top: 14px;
      overflow-wrap: anywhere;
      white-space: pre-wrap;
    }

    .nog-profile-note {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid var(--line);
    }

    /*
     * Sacola
     */

    .nog-empty {
      padding: 38px 0;
      text-align: center;
    }

    .nog-empty > svg {
      width: 56px;
      height: 56px;
      margin: 0 auto 22px;
      stroke-width: 1.1;
    }

    .nog-empty h3 {
      font-size: 25px;
      margin-bottom: 12px;
    }

    .nog-empty .nog-button {
      margin-top: 26px;
    }

    .nog-cart-item {
      display: grid;
      grid-template-columns: 110px minmax(0,1fr);
      gap: 18px;
      padding: 22px 0;
      border-bottom: 1px solid var(--line);
    }

    .nog-cart-item:first-child {
      padding-top: 0;
    }

    .nog-cart-item img {
      width: 110px;
      height: 100px;
      object-fit: contain;
      background: var(--white);
    }

    .nog-cart-brand {
      font-size: 11px;
      color: var(--grey);
    }

    .nog-cart-item h3 {
      font-size: 21px;
      line-height: 1.15;
      margin: 5px 0 8px;
      letter-spacing: -.035em;
    }

    .nog-cart-item p {
      font-size: 12px;
      color: var(--grey);
      margin: 0;
    }

    .nog-cart-row {
      display: flex;
      gap: 16px;
      align-items: center;
      justify-content: space-between;
      margin-top: 12px;
      flex-wrap: wrap;
    }

    .nog-quantity {
      display: flex;
      align-items: center;
      border: 1px solid var(--line);
      border-radius: 10px;
    }

    .nog-quantity button {
      width: 44px;
      height: 44px;
      border: 0;
      background: transparent;
      padding: 12px;
      cursor: pointer;
    }

    .nog-quantity span {
      min-width: 28px;
      text-align: center;
      font-size: 14px;
    }

    .nog-quantity svg {
      width: 16px;
      height: 16px;
    }

    .nog-remove {
      font-size: 11px;
    }

    .nog-cart-summary {
      padding-top: 24px;
    }

    .nog-summary-row {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      font-size: 14px;
      margin-bottom: 16px;
    }

    .nog-cart-summary .nog-button {
      margin-top: 20px;
    }

    .nog-order-copy {
      width: 100%;
      margin: 14px 0 0;
      min-height: 140px;
      padding: 12px;
      border: 1px solid var(--grey);
      border-radius: 10px;
      font-size: 13px;
      resize: vertical;
    }

    /*
     * Responsividade
     */

    @media (max-width: 700px) {
      .site-header .header-actions {
        gap: 0;
      }

      .site-header .nog-icon {
        width: 42px;
        min-width: 42px;
        padding: 8px;
      }

      .site-header .nog-icon svg {
        width: 25px;
        height: 25px;
      }

      .header-inner {
        gap: 8px;
        padding-inline: 16px;
      }

      .brand {
        gap: 8px;
      }

      .hero {
        align-items: end;
      }

      .hero > img {
        object-position: 65% center;
      }

      .hero-copy {
        padding: 30px 24px 44px;
        margin: 0;
      }

      .hero h1 {
        font-size: 44px;
        max-width: 330px;
      }

      .hero p {
        margin: 18px 0 24px;
        font-size: 14px;
        max-width: 270px;
      }

      .hero::after {
        background: linear-gradient(
          0deg,
          rgba(0,0,0,.8),
          transparent 80%
        );
      }

      .nog-card-add {
        font-size: 11px;
        padding-inline: 8px;
        gap: 6px;
      }

      .nog-card-add svg {
        width: 16px;
        height: 16px;
      }

      .viewer-side {
        border-right: 0;
        border-bottom: 1px solid var(--line);
      }

      .nog-modal-head {
        padding: 18px 20px;
      }

      .nog-modal-body {
        padding: 22px 20px;
      }

      .nog-modal h2 {
        font-size: 28px;
      }

      .nog-cart-item {
        grid-template-columns: 86px minmax(0,1fr);
        gap: 14px;
      }

      .nog-cart-item img {
        width: 86px;
        height: 90px;
      }

    }

    @media (prefers-reduced-motion: reduce) {
      .nog-modal,
      .nog-card-add {
        transition: none !important;
      }
    }
  `;

  document.head.append(style);

  /*
   * Imagens transparentes dos produtos.
   */

  products.forEach(product => {
    product.views.forEach(view => {
      view.url = view.url.split("?")[0];
    });
  });

  /*
   * Campanha NOG
   */

  const campaign = q("#campaign");

  campaign.src = "assets/campanha-nog.png";
  campaign.alt =
    "Campanha NOG Lupas: estilo urbano em Recife, com óculos esportivos escuros";

  q("#hero-title").textContent = "Tem presença. Tem NOG.";
  q(".hero-copy p").textContent =
    "A lupa certa acompanha o seu corre.";

  /*
   * Ícones e ações do cabeçalho.
   */

  const menuButton = q("#menu-toggle");
  const headerActions = q(".header-actions");

  function makeIconButton(id, label, name) {
    const button = document.createElement("button");
    button.id = id;
    button.className = "nog-icon";
    button.type = "button";
    button.setAttribute("aria-label", label);
    button.innerHTML = icon(name);
    return button;
  }

  const searchButton = makeIconButton(
    "nog-search",
    "Buscar modelo",
    "search"
  );

  const accountButton = makeIconButton(
    "nog-account",
    "Minha conta",
    "user"
  );

  const cartButton = makeIconButton(
    "nog-cart",
    "Abrir sacola",
    "bag"
  );

  cartButton.insertAdjacentHTML(
    "beforeend",
    '<span id="nog-cart-count" class="nog-count" hidden></span>'
  );

  headerActions.replaceChildren(
    searchButton,
    accountButton,
    cartButton,
    menuButton
  );

  accountButton.setAttribute("aria-haspopup", "dialog");
  accountButton.setAttribute("aria-controls", "nog-account-dialog");

  cartButton.setAttribute("aria-haspopup", "dialog");
  cartButton.setAttribute("aria-controls", "nog-cart-dialog");

  searchButton.onclick = () => {
    closeMenu();
    q("#catalogo").scrollIntoView();
    q("#search").focus({ preventScroll: true });
  };

  /*
   * Armazenamento local
   */

  function load(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  }

  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  let profile = load("nog.profile.v1");

  if (
    !profile ||
    typeof profile.name !== "string" ||
    typeof profile.email !== "string"
  ) {
    profile = null;
  }

  let cart = load("nog.cart.v1");

  cart = Array.isArray(cart)
    ? cart
        .filter(row =>
          row && products.some(product => product.id === row.id)
        )
        .map(row => ({
          id: row.id,
          qty: Math.max(
            1,
            Math.min(99, Math.floor(Number(row.qty) || 1))
          )
        }))
    : [];

  let activeTrigger = null;

  /*
   * Painel de conta local
   */

  const accountDialog = document.createElement("dialog");

  accountDialog.id = "nog-account-dialog";
  accountDialog.className = "nog-modal";
  accountDialog.setAttribute(
    "aria-labelledby",
    "nog-account-title"
  );

  accountDialog.innerHTML = `
    <div class="nog-modal-head">
      <h2 id="nog-account-title">Criar conta</h2>

      <button class="nog-icon"
              data-nog-close
              aria-label="Fechar minha conta">
        ${icon("close")}
      </button>
    </div>

    <div class="nog-modal-body">
      <p id="nog-account-intro" class="nog-muted">
        Deixe seus dados prontos para conversar com a NOG.
      </p>

      <form id="nog-account-form" class="nog-form">
        <label class="nog-field">
          Seu nome
          <input id="nog-name"
                 name="nome"
                 autocomplete="name"
                 maxlength="80"
                 required>
        </label>

        <label class="nog-field">
          Seu e-mail
          <input id="nog-email"
                 name="email"
                 type="email"
                 autocomplete="email"
                 maxlength="160"
                 required>
        </label>

        <button class="nog-button"
                id="nog-save-profile"
                type="submit">
          Criar conta neste navegador
        </button>

        <p id="nog-account-status"
           class="nog-status"
           role="status"></p>
      </form>

      <p class="nog-muted nog-profile-note">
        Cadastro de demonstração, salvo somente neste navegador.
        Sem senha, autenticação ou sincronização entre dispositivos.
      </p>

      <button class="nog-text"
              id="nog-delete-profile"
              hidden>
        Remover perfil local
      </button>
    </div>
  `;

  /*
   * Painel da sacola
   */

  const cartDialog = document.createElement("dialog");

  cartDialog.id = "nog-cart-dialog";
  cartDialog.className = "nog-modal";
  cartDialog.setAttribute(
    "aria-labelledby",
    "nog-cart-title"
  );

  cartDialog.innerHTML = `
    <div class="nog-modal-head">
      <h2 id="nog-cart-title">Sua sacola</h2>

      <button class="nog-icon"
              data-nog-close
              aria-label="Fechar sacola">
        ${icon("close")}
      </button>
    </div>

    <div class="nog-modal-body"
         id="nog-cart-content"></div>
  `;

  document.body.append(accountDialog, cartDialog);

  /*
   * Abertura e fechamento dos painéis
   */

  function openDrawer(dialog, trigger) {
    closeMenu();

    activeTrigger = trigger || document.activeElement;

    [accountDialog, cartDialog].forEach(other => {
      if (other !== dialog && other.open) {
        other.close();
      }
    });

    if (q("#product-dialog").open) {
      q("#product-dialog").close();
    }

    if (!dialog.open) {
      dialog.showModal();
    }

    document.body.style.overflowY = "hidden";
    dialog.querySelector("[data-nog-close]").focus();
  }

  [accountDialog, cartDialog].forEach(dialog => {
    dialog.querySelector("[data-nog-close]").onclick = () => {
      dialog.close();
    };

    dialog.addEventListener("close", () => {
      if (
        !accountDialog.open &&
        !cartDialog.open &&
        !q("#product-dialog").open
      ) {
        document.body.style.overflowY = "";

        activeTrigger?.focus({
          preventScroll: true
        });
      }
    });

    dialog.addEventListener("click", event => {
      if (event.target !== dialog) return;

      const bounds = dialog.getBoundingClientRect();

      const outside =
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom;

      if (outside) dialog.close();
    });
  });

  q("#product-dialog").addEventListener("close", () => {
    const drawer = accountDialog.open
      ? accountDialog
      : cartDialog.open
        ? cartDialog
        : null;

    if (drawer) {
      document.body.style.overflowY = "hidden";
      drawer.querySelector("[data-nog-close]").focus();
    }
  });

  /*
   * Conta local
   */

  function openAccount(trigger) {
    q("#nog-account-title").textContent = profile
      ? "Minha conta"
      : "Criar conta";

    q("#nog-name").value = profile?.name || "";
    q("#nog-email").value = profile?.email || "";

    q("#nog-save-profile").textContent = profile
      ? "Salvar meus dados"
      : "Criar conta neste navegador";

    q("#nog-delete-profile").hidden = !profile;
    q("#nog-account-status").textContent = "";

    openDrawer(accountDialog, trigger);
  }

  accountButton.onclick = () => {
    openAccount(accountButton);
  };

  q("#nog-account-form").addEventListener("submit", event => {
    event.preventDefault();

    const name = q("#nog-name").value.trim();
    const email = q("#nog-email").value.trim();

    if (!name) {
      q("#nog-name").setCustomValidity("Escreva seu nome.");
      q("#nog-name").reportValidity();
      return;
    }

    q("#nog-name").setCustomValidity("");

    if (!event.currentTarget.reportValidity()) return;

    const data = { name, email };

    if (!save("nog.profile.v1", data)) {
      q("#nog-account-status").textContent =
        "O navegador não permitiu salvar os dados. Seu perfil não foi gravado.";
      return;
    }

    profile = data;

    q("#nog-account-title").textContent = "Minha conta";
    q("#nog-save-profile").textContent = "Salvar meus dados";
    q("#nog-delete-profile").hidden = false;

    q("#nog-account-status").textContent =
      "Seus dados foram salvos neste navegador.";

    accountButton.setAttribute(
      "aria-label",
      `Minha conta: ${profile.name}`
    );
  });

  q("#nog-name").addEventListener("input", () => {
    q("#nog-name").setCustomValidity("");
  });

  q("#nog-delete-profile").onclick = () => {
    try {
      localStorage.removeItem("nog.profile.v1");
    } catch {
      q("#nog-account-status").textContent =
        "Não foi possível remover o perfil local.";
      return;
    }

    profile = null;

    q("#nog-account-form").reset();
    q("#nog-account-title").textContent = "Criar conta";
    q("#nog-save-profile").textContent =
      "Criar conta neste navegador";
    q("#nog-delete-profile").hidden = true;
    q("#nog-account-status").textContent =
      "Perfil local removido.";

    accountButton.setAttribute("aria-label", "Minha conta");
  };

  /*
   * Contador da sacola
   */

  function syncCart() {
    const persisted = save("nog.cart.v1", cart);

    const count = cart.reduce(
      (sum, row) => sum + row.qty,
      0
    );

    q("#nog-cart-count").textContent = count;
    q("#nog-cart-count").hidden = count === 0;

    cartButton.setAttribute(
      "aria-label",
      `Abrir sacola, ${count} ${count === 1 ? "item" : "itens"}`
    );

    return persisted;
  }

  /*
   * Renderização da sacola
   */

  function renderCart() {
    syncCart();

    const container = q("#nog-cart-content");

    if (!cart.length) {
      container.innerHTML = `
        <div class="nog-empty">
          ${icon("bag")}

          <h3>Sua próxima lupa começa aqui.</h3>

          <p class="nog-muted">
            Escolha um modelo e adicione à sacola.
          </p>

          <button class="nog-button" data-continue>
            Explorar os modelos
          </button>
        </div>
      `;
      return;
    }

    const total = cart.reduce(
      (sum, row) => sum + row.qty,
      0
    );

    container.innerHTML =
      cart.map(row => {
        const product = products.find(
          item => item.id === row.id
        );

        return `
          <article class="nog-cart-item">
            <img src="${escape(product.views[0].url)}"
                 alt="${escape(product.name)}">

            <div>
              <span class="nog-cart-brand">
                ${escape(product.brand)}
              </span>

              <h3>${escape(product.name)}</h3>
              <p>${escape(product.color)}</p>

              <div class="nog-cart-row">
                <div class="nog-quantity">
                  <button data-qty="${product.id}"
                          data-delta="-1"
                          aria-label="Diminuir quantidade de ${escape(product.name)}"
                          ${row.qty <= 1 ? "disabled" : ""}>
                    ${icon("minus")}
                  </button>

                  <span aria-label="Quantidade">${row.qty}</span>

                  <button data-qty="${product.id}"
                          data-delta="1"
                          aria-label="Aumentar quantidade de ${escape(product.name)}"
                          ${row.qty >= 99 ? "disabled" : ""}>
                    ${icon("plus")}
                  </button>
                </div>

                <button class="nog-text nog-remove"
                        data-remove="${product.id}"
                        aria-label="Remover ${escape(product.name)} da sacola">
                  Remover
                </button>
              </div>
            </div>
          </article>
        `;
      }).join("") +
      `
        <div class="nog-cart-summary">
          <div class="nog-summary-row">
            <span>Itens na sacola</span>
            <strong>${total}</strong>
          </div>

          <p class="nog-muted">
            Valores, disponibilidade e entrega são confirmados
            com a NOG antes da compra.
            Nenhuma cobrança é realizada aqui.
          </p>

          <button id="nog-copy-cart" class="nog-button">
            Copiar minha seleção
          </button>

          <a class="nog-text"
             href="https://wa.me/message/JSIBLEUALLYUP1"
             target="_blank"
             rel="noopener">
            Abrir WhatsApp da NOG
          </a>

          <p id="nog-order-status"
             class="nog-status"
             role="status">
            Copie a seleção e cole na conversa.
          </p>

          <textarea id="nog-order-copy"
                    class="nog-order-copy"
                    readonly
                    aria-label="Seleção para copiar"
                    hidden></textarea>

          <p id="nog-cart-storage"
             class="nog-muted"></p>
        </div>
      `;
  }

  /*
   * Adicionar produtos à sacola
   */

  function addToCart(id, trigger) {
    if (!products.some(product => product.id === id)) return;

    const existing = cart.find(row => row.id === id);

    if (existing) {
      existing.qty = Math.min(99, existing.qty + 1);
    } else {
      cart.push({ id, qty: 1 });
    }

    const persisted = syncCart();

    renderCart();
    openDrawer(cartDialog, trigger);

    if (!persisted && q("#nog-cart-storage")) {
      q("#nog-cart-storage").textContent =
        "O navegador bloqueou o salvamento. A sacola ficará disponível somente enquanto esta página estiver aberta.";
    }
  }

  cartButton.onclick = () => {
    renderCart();
    openDrawer(cartDialog, cartButton);
  };

  /*
   * Ações dentro da sacola
   */

  cartDialog.addEventListener("click", event => {
    const remove = event.target.closest("[data-remove]");
    const quantity = event.target.closest("[data-qty]");

    if (remove) {
      cart = cart.filter(
        row => row.id !== remove.dataset.remove
      );

      renderCart();

      q("#nog-cart-title").setAttribute("tabindex", "-1");
      q("#nog-cart-title").focus();
    }

    if (quantity) {
      const row = cart.find(
        row => row.id === quantity.dataset.qty
      );

      if (row) {
        row.qty = Math.min(
          99,
          Math.max(
            1,
            row.qty + Number(quantity.dataset.delta)
          )
        );

        renderCart();

        const controls = [
          ...cartDialog.querySelectorAll("[data-qty]")
        ];

        controls.find(button =>
          button.dataset.qty === quantity.dataset.qty &&
          button.dataset.delta === quantity.dataset.delta &&
          !button.disabled
        )?.focus();
      }
    }

    if (event.target.closest("[data-continue]")) {
      cartDialog.close();
      q("#catalogo").scrollIntoView();
    }

    if (event.target.closest("#nog-copy-cart")) {
      copyCart();
    }
  });

  /*
   * Copiar seleção
   */

  async function copyCart() {
    const lines = cart.map(row => {
      const product = products.find(
        product => product.id === row.id
      );

      return (
        `${row.qty}x ${product.brand} ${product.name} ` +
        `(${product.color})`
      );
    });

    const text =
      "Olá, NOG!" +
      (profile ? ` Meu nome é ${profile.name}.` : "") +
      "\nTenho interesse nestes modelos:\n\n" +
      lines.join("\n") +
      "\n\nPode confirmar os valores e a disponibilidade?";

    try {
      await navigator.clipboard.writeText(text);

      q("#nog-order-status").textContent =
        "Seleção copiada. Abra o WhatsApp e cole na conversa.";
    } catch {
      const area = q("#nog-order-copy");

      area.value = text;
      area.hidden = false;
      area.focus();
      area.select();

      q("#nog-order-status").textContent =
        "Selecione e copie o texto abaixo para enviar à NOG.";
    }
  }

  /*
   * Botões de sacola nos cartões
   */

  function addCardButtons() {
    all("#products .product").forEach(card => {
      if (card.querySelector("[data-nog-add]")) return;

      const id = card.querySelector("[data-open]")?.dataset.open;
      if (!id) return;

      const product = products.find(
        product => product.id === id
      );

      if (!product) return;

      const button = document.createElement("button");

      button.type = "button";
      button.className = "nog-card-add";
      button.dataset.nogAdd = id;

      button.setAttribute(
        "aria-label",
        `Adicionar ${product.name} à sacola`
      );

      button.innerHTML =
        icon("bag") + "Adicionar à sacola";

      card.append(button);
    });
  }

  q("#products").addEventListener("click", event => {
    const button = event.target.closest("[data-nog-add]");

    if (button) {
      addToCart(button.dataset.nogAdd, button);
    }
  });

  new MutationObserver(addCardButtons).observe(
    q("#products"),
    { childList: true }
  );

  /*
   * Botão da sacola no detalhe do produto
   */

  const productCTA = q(
    "#product-dialog .product-info .cta"
  );

  const addDetail = document.createElement("button");

  addDetail.type = "button";
  addDetail.className = "nog-button nog-add-dialog";

  addDetail.innerHTML =
    icon("bag") + "Adicionar à sacola";

  productCTA.before(addDetail);

  addDetail.onclick = () => {
    if (selected) {
      addToCart(selected.id, cartButton);
    }
  };

  productCTA.className = "nog-text";
  productCTA.textContent =
    "Tirar dúvidas sobre este modelo";

  /* O rodapé é controlado apenas por montarFooterFinal() em nog-ajustes.js. */

  /*
   * Inicialização
   */

  render();
  addCardButtons();
  syncCart();

  if (profile) {
    accountButton.setAttribute(
      "aria-label",
      `Minha conta: ${profile.name}`
    );
  }
})();