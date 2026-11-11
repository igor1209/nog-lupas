/* Dados, filtros e visualizador do catálogo NOG Lupas. */
"use strict";

        const oakBase =
            "https://assets2.oakley.com/prod-onecp-record-files/pieyewear/";

        const rayBase =
            "https://images2.ray-ban.com//prod-onecp-record-files/pieyewear/";

        function oak(code, color, views) {
            return views.map(([id, angle, label]) => ({
                label,
                url:
                    `${oakBase}${id}/0OO${code}__${color}__P21__shad__${angle}.png` +
                    "?impolicy=OO_ratio&width=768"
            }));
        }

        function ray(code, color, type, views) {
            return views.map(([id, angle, label]) => ({
                label,
                url:
                    `${rayBase}${id}/0RB${code}__${color}__${type}__shad__${angle}.png` +
                    "?impolicy=RB_Product_clone&width=720&bgc=%23f2f2f2"
            }));
        }

        const products = [
            {
                id: "plantaris",
                brand: "Oakley",
                name: "Plantaris",
                color: "Preto fosco / lente cinza",
                code: "OO9437-0163",
                description:
                    "Desenho orgânico, armação envolvente e hastes com uma presença própria.",
                official: "https://www.oakley.com/pt-br/product/W0OO9437",
                views: oak("9437", "943701", [
                    ["3d1d744d-1279-40e5-be17-b363004477f4", "qt", "Perspectiva"],
                    ["ecce80ed-acf6-489d-b131-b36300447710", "fr", "Frente"],
                    ["a84bec4f-7478-434c-9353-b36300447c7a", "lt", "Lateral"],
                    ["699af1e1-e0f1-4f11-b6c4-b3630044791f", "al1", "Armação em detalhe"],
                    ["dd1e2904-1a29-4330-b52b-b36300447a1a", "al2", "Detalhe adicional"],
                    ["45b5ea4c-8169-480e-a66c-b36300448206", "al3", "Haste em detalhe"],
                    ["743a0dcc-65e0-491e-9a91-b363004480d1", "al4", "Outro detalhe"]
                ])
            },
            {
                id: "highland",
                brand: "Oakley",
                name: "Highland",
                color: "Transparente / lente azul",
                code: "OO9522 / variante 952207",
                description:
                    "Linhas esportivas e lentes envolventes. Transparência na armação, presença no olhar.",
                official: "https://www.oakley.com/pt-br/product/W0OO9522",
                views: oak("9522", "952207", [
                    ["9f82e4b9-c734-4dc6-9eda-b3f3011df01b", "qt", "Perspectiva"],
                    ["69990b9d-0409-4128-99c2-b3f3011dee9b", "fr", "Frente"],
                    ["e6283d88-373c-4a5f-b83d-b3f3011ded2d", "lt", "Lateral"],
                    ["e1a30bcf-54f9-4aa6-a5cd-b3f3011ded22", "al1", "Armação em detalhe"],
                    ["c0976832-eaba-4154-aad4-b3f3011df01f", "al3", "Haste em detalhe"],
                    ["47396b9b-7dec-4a20-8c45-b3f3011ded2f", "al4", "Outro detalhe"]
                ])
            },
            {
                id: "twoface",
                brand: "Oakley",
                name: "TwoFace",
                color: "Preto fosco",
                code: "OO9189 / variante 918930",
                description:
                    "Armação de linhas retas e recorte inferior marcante. Um visual que vai da rua ao dia a dia.",
                official: "https://www.oakley.com/pt-br/product/W0OO9189",
                views: oak("9189", "918930", [
                    ["628cd182-0ccd-4d6e-a785-b35e00bcca14", "qt", "Perspectiva"],
                    ["65e59ea0-408c-4398-966a-b35e00bcce3c", "fr", "Frente"],
                    ["c98474a7-2438-441f-b939-b35e00bcce3d", "lt", "Lateral"],
                    ["726edd3e-3cdb-4d91-9d8b-b35e00bcceb6", "al1", "Armação em detalhe"],
                    ["6e825a09-d5ba-4323-8025-b35e00bcd3a1", "al3", "Haste em detalhe"],
                    ["f06c2bf9-396f-455f-ad91-b35e00bcd6fc", "al4", "Outro detalhe"]
                ])
            },
            {
                id: "wayfarer",
                brand: "Ray-Ban",
                name: "Original Wayfarer",
                color: "Preto / lente verde",
                code: "RB2140 / 901",
                description:
                    "O desenho de linhas fortes que faz o básico ter personalidade.",
                official:
                    "https://www.ray-ban.com/brazil/oculos-de-sol/RB2140original%20wayfarer%20classic-preto/805289126577",
                views: ray("2140", "901", "P21", [
                    ["aa3935f3-184a-4e17-a880-b35d00c65c8a", "qt", "Perspectiva"],
                    ["298c1087-b9f4-4c25-9a73-b35d00c66100", "fr", "Frente"],
                    ["93a83ecf-12ff-41d7-b7bb-b35d00c65b5c", "lt", "Lateral"],
                    ["2bcf0817-88c0-4207-8118-b35d00c65b3a", "bk", "Parte de trás"]
                ])
            },
            {
                id: "aviator",
                brand: "Ray-Ban",
                name: "Aviator Classic",
                color: "Dourado / lente verde",
                code: "RB3025 / L0205",
                description:
                    "Metal fino, lente em gota e um formato que dispensa apresentação.",
                official:
                    "https://www.ray-ban.com/brazil/oculos-de-sol/RB3025aviator%20classic-dourado-arista/805289602057",
                views: ray("3025", "L0205", "STD", [
                    ["6ad42b4b-f1af-45cc-a6c6-b35d00db1f85", "qt", "Perspectiva"],
                    ["f30f60d0-fb5d-48fb-acd4-b35d00db2212", "fr", "Frente"],
                    ["66890e64-3791-41a5-a3ca-b35d00db2550", "lt", "Lateral"],
                    ["85e80a2c-c5dd-4319-b3c7-b35d00db2467", "bk", "Parte de trás"]
                ])
            },
            {
                id: "clubmaster",
                brand: "Ray-Ban",
                name: "Clubmaster Classic",
                color: "Marrom e dourado / lente marrom",
                code: "RB3016 / 687853",
                description:
                    "A parte superior da armação em destaque e o metal desenhando o restante.",
                official:
                    "https://www.ray-ban.com/brazil/oculos-de-sol/RB3016clubmaster%20classic-marrom%20e%20ouro/8056262889312",
                views: ray("3016", "687853", "P21", [
                    ["0a078249-7a7b-4d65-86bb-b37200c67939", "qt", "Perspectiva"],
                    ["ec855cea-c136-41b2-a53f-b37200c67898", "fr", "Frente"],
                    ["13693e03-5ed4-4693-b1d2-b37200c678a3", "lt", "Lateral"],
                    ["7f9a30bb-5819-4ecc-a317-b37200c67890", "bk", "Parte de trás"]
                ])
            }
        ];

        const $ = selector => document.querySelector(selector);
        const $$ = selector => [...document.querySelectorAll(selector)];

        $("#campaign").src = "assets/campanha-nog.png";
        $("#year").textContent = new Date().getFullYear();

        const normalize = text =>
            text.normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();

        let brand = "Todas";
        let visible = [...products];
        let selected = null;
        let frame = 0;
        let returnFocus = null;
        let drag = null;

        const rotateIcon = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 11a8 8 0 1 1 1 6M4 5v6h6"/>
      </svg>
    `;

        function createCard(product) {
            const article = document.createElement("article");
            article.className = "product";

            article.innerHTML = `
        <button class="product-open"
                data-open="${product.id}"
                aria-label="Ver ${product.brand} ${product.name}">
          <span class="product-image">
            <img src="${product.views[0].url}"
                 alt="${product.brand} ${product.name}, ${product.color}"
                 width="720" height="600" loading="lazy">
            <span class="view-label">
              ${rotateIcon}
              Ver ângulos
            </span>
          </span>
          <span class="product-brand">${product.brand}</span>
          <span class="product-name">${product.name}</span>
          <span class="product-color">${product.color}</span>
        </button>
        <div class="product-bottom">
          <span>Consulte o valor com a NOG</span>
          <button class="detail-button"
                  data-open="${product.id}"
                  aria-label="Detalhes de ${product.name}">
            Ver modelo
          </button>
        </div>
      `;

            return article;
        }

        function render() {
            const query = normalize($("#search").value.trim());

            visible = products.filter(product => {
                const matchesBrand =
                    brand === "Todas" || product.brand === brand;

                const searchable = normalize([
                    product.brand,
                    product.name,
                    product.color,
                    product.code
                ].join(" "));

                return matchesBrand && searchable.includes(query);
            });

            $("#products").replaceChildren(...visible.map(createCard));
            $("#empty").hidden = visible.length > 0;

            $("#count").textContent =
                `${visible.length} ${visible.length === 1 ? "modelo" : "modelos"}`;

            $$("[data-brand]").forEach(button => {
                button.setAttribute(
                    "aria-pressed",
                    String(button.dataset.brand === brand)
                );
            });
        }

        function closeMenu() {
            $("#mobile-nav").hidden = true;
            $("#menu-toggle").setAttribute("aria-expanded", "false");
            $("#menu-toggle").setAttribute("aria-label", "Abrir menu");
        }

        $("#menu-toggle").onclick = () => {
            const open = $("#mobile-nav").hidden;

            $("#mobile-nav").hidden = !open;
            $("#menu-toggle").setAttribute("aria-expanded", String(open));
            $("#menu-toggle").setAttribute(
                "aria-label",
                open ? "Fechar menu" : "Abrir menu"
            );
        };

        $$("[data-brand-link]").forEach(link => {
            link.onclick = () => {
                brand = link.dataset.brandLink;
                $("#search").value = "";
                render();
                closeMenu();
            };
        });

        $$("[data-brand]").forEach(button => {
            button.onclick = () => {
                brand = button.dataset.brand;
                render();
            };
        });

        $("#search").addEventListener("input", render);

        $("#reset-search").onclick = () => {
            brand = "Todas";
            $("#search").value = "";
            render();
        };

        $("#search-trigger").onclick = () => {
            closeMenu();
            $("#catalogo").scrollIntoView();
            $("#search").focus({ preventScroll: true });
        };

        matchMedia("(min-width:701px)")
            .addEventListener("change", closeMenu);

        const dialog = $("#product-dialog");
        const stage = $("#viewer-stage");
        const modelImage = $("#model-image");

        function setFrame(index) {
            if (!selected) return;

            frame =
                (index + selected.views.length) % selected.views.length;

            const view = selected.views[frame];

            $("#image-error").hidden = true;
            modelImage.hidden = false;
            modelImage.src = view.url;
            modelImage.alt =
                `${selected.brand} ${selected.name}: ${view.label}`;

            $("#angle-title").textContent =
                `${view.label} (${frame + 1}/${selected.views.length})`;

            $$("[data-frame]").forEach(button => {
                button.setAttribute(
                    "aria-pressed",
                    String(Number(button.dataset.frame) === frame)
                );
            });
        }

        modelImage.onerror = () => {
            modelImage.hidden = true;
            $("#image-error").hidden = false;
        };

        function showProduct(id, opener) {
            const product = products.find(item => item.id === id);
            if (!product) return;

            selected = product;
            returnFocus = opener || returnFocus;

            stage.classList.remove("zoomed");
            $("#zoom").setAttribute("aria-pressed", "false");
            $("#zoom").setAttribute("aria-label", "Ampliar peça");

            $("#modal-brand").textContent = product.brand;
            $("#model-title").textContent = product.name;
            $("#modal-color").textContent = product.color;
            $("#model-description").textContent = product.description;
            $("#model-code").textContent = product.code;
            $("#official-link").href = product.official;
            $("#preference").value = "";

            $("#request-status").textContent =
                "Copie o modelo e cole na conversa com a NOG.";

            const thumbnails = product.views.map((view, index) => {
                const button = document.createElement("button");
                button.className = "thumbnail";
                button.dataset.frame = index;
                button.setAttribute("aria-label", view.label);
                button.setAttribute("aria-pressed", String(index === 0));

                const image = new Image();
                image.src = view.url;
                image.alt = "";
                image.loading = "lazy";

                button.append(image);
                button.onclick = () => setFrame(index);
                return button;
            });

            $("#thumbnails").replaceChildren(...thumbnails);
            setFrame(0);

            if (!dialog.open) {
                dialog.showModal();
                document.body.style.overflowY = "hidden";
            }

            dialog.scrollTop = 0;
            $("#dialog-close").focus();
        }

        $("#products").addEventListener("click", event => {
            const button = event.target.closest("[data-open]");
            if (button) {
                showProduct(button.dataset.open, button);
            }
        });

        $("#dialog-close").onclick = () => dialog.close();

        dialog.addEventListener("close", () => {
            selected = null;
            drag = null;
            document.body.style.overflowY = "";
            returnFocus?.focus({ preventScroll: true });
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

        $("#previous-angle").onclick = () => setFrame(frame - 1);
        $("#next-angle").onclick = () => setFrame(frame + 1);

        $("#zoom").onclick = () => {
            const expanded = stage.classList.toggle("zoomed");
            $("#zoom").setAttribute("aria-pressed", String(expanded));
            $("#zoom").setAttribute(
                "aria-label",
                expanded ? "Reduzir peça" : "Ampliar peça"
            );
        };

        stage.addEventListener("keydown", event => {
            if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;

            event.preventDefault();
            setFrame(frame + (event.key === "ArrowRight" ? 1 : -1));
        });

        stage.addEventListener("pointerdown", event => {
            if (!event.isPrimary) return;

            drag = {
                x: event.clientX,
                y: event.clientY,
                frame
            };

            stage.setPointerCapture(event.pointerId);
        });

        stage.addEventListener("pointermove", event => {
            if (!drag) return;

            const dx = event.clientX - drag.x;
            const dy = event.clientY - drag.y;

            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 26) {
                setFrame(drag.frame + Math.trunc(dx / 46));
            }
        });

        ["pointerup", "pointercancel", "lostpointercapture"].forEach(type => {
            stage.addEventListener(type, () => {
                drag = null;
            });
        });

        function changeModel(direction) {
            if (!selected || !visible.length) return;

            const index = visible.findIndex(
                product => product.id === selected.id
            );

            const nextIndex =
                (index + direction + visible.length) % visible.length;

            showProduct(visible[nextIndex].id);
        }

        $("#previous-model").onclick = () => changeModel(-1);
        $("#next-model").onclick = () => changeModel(1);

        $("#copy-request").onclick = async () => {
            if (!selected) return;

            const extra = $("#preference").value.trim();

            const message =
                `Olá, NOG! Curti o ${selected.brand} ${selected.name} ` +
                `(${selected.color}).` +
                (extra ? ` Procuro: ${extra}.` : "") +
                " Pode me passar as opções disponíveis e o valor?";

            try {
                await navigator.clipboard.writeText(message);
                $("#request-status").textContent =
                    "Escolha copiada. Agora é só colar no WhatsApp.";
            } catch {
                $("#request-status").textContent = message;
            }
        };

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") closeMenu();
        });

        render();
