
/*
 * NOG Lupas
 * Recursos adicionais da loja.
 * Catálogo, sacola, conta local, campanha e rodapé.
 */

(() => {
  "use strict";

  if (document.documentElement.dataset.nogUpgradeInitialized === "true") return;
  document.documentElement.dataset.nogUpgradeInitialized = "true";

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

  // Estilos movidos integralmente para nog-upgrade.css.

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