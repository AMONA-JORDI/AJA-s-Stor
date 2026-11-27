let selectedProduct = null;
let currentCategory = null;
let currentSubCategory = null;

function formatPrice(prix) {
    const devise = (typeof CONFIG !== "undefined" && CONFIG.devise) ? CONFIG.devise : "FCFA";
    return `${Number(prix || 0).toLocaleString("fr-FR")} ${devise}`;
}

function showCategoriesView() {
    currentCategory = null;
    currentSubCategory = null;

    const catView = document.getElementById("categoriesView");
    const catGridView = document.getElementById("catalogView");

    if (catView) catView.style.display = "block";
    if (catGridView) catGridView.style.display = "none";
}

function getSubCategoriesForCategory(categoryName) {
    if (typeof PRODUITS === "undefined" || !Array.isArray(PRODUITS)) return [];

    const subMap = new Map();

    PRODUITS
        .filter(prod => prod.categorie === categoryName)
        .forEach(prod => {
            const subName = prod.sousCategorie || "Autres offres";
            const customCfg = (typeof SOUS_CATEGORIES_CONFIG !== "undefined" && SOUS_CATEGORIES_CONFIG[subName]) || {};

            if (!subMap.has(subName)) {
                subMap.set(subName, {
                    nom: subName,
                    image: customCfg.image || prod.image || "",
                    description: customCfg.description || `Découvrir toutes les offres ${subName} en ${categoryName}.`,
                    count: 0
                });
            }
            subMap.get(subName).count += 1;
        });

    return Array.from(subMap.values());
}

function renderCategoriesHome() {
    const grid = document.getElementById("categoriesGrid");
    if (!grid) return;

    if (typeof CATEGORIES === "undefined" || !Array.isArray(CATEGORIES) || typeof PRODUITS === "undefined") {
        grid.innerHTML = `<p class="empty-category">Configuration des catégories introuvable.</p>`;
        return;
    }

    grid.innerHTML = CATEGORIES.map(cat => {
        const count = cat.nom === "Tout"
            ? PRODUITS.length
            : PRODUITS.filter(p => p.categorie === cat.nom).length;

        return `
            <div class="category-card" data-category="${cat.nom}">
                <div class="category-icon">
                    <img src="${cat.image}" alt="${cat.nom}" class="category-img">
                </div>
                <h3 class="category-card-title">${cat.nom}</h3>
                <p class="category-card-desc">${cat.description}</p>
                <span class="category-count">${count} offre(s)</span>
            </div>
        `;
    }).join("");

    grid.querySelectorAll(".category-card").forEach(card => {
        card.addEventListener("click", () => {
            const categoryName = card.getAttribute("data-category");
            enterCategory(categoryName);
        });
    });
}

function enterCategory(categoryName) {
    currentCategory = categoryName;
    currentSubCategory = null;

    const catView = document.getElementById("categoriesView");
    const catGridView = document.getElementById("catalogView");
    const subGrid = document.getElementById("subcategoriesGrid");
    const catalogContainer = document.getElementById("catalog");
    const titleEl = document.getElementById("currentCategoryTitle");
    const backBtn = document.getElementById("backToCategoriesBtn");

    if (catView) catView.style.display = "none";
    if (catGridView) catGridView.style.display = "block";
    if (backBtn) backBtn.textContent = "← Retour aux catégories";

    if (categoryName === "Tout") {
        if (subGrid) subGrid.style.display = "none";
        if (catalogContainer) catalogContainer.style.display = "grid";
        if (titleEl) titleEl.textContent = "Tous les produits";
        renderCatalog("Tout", null);
        return;
    }

    const subCategories = getSubCategoriesForCategory(categoryName);

    if (titleEl) titleEl.textContent = `${categoryName} — Choisissez une option`;
    if (catalogContainer) catalogContainer.style.display = "none";

    if (subGrid) {
        subGrid.style.display = "grid";

        if (subCategories.length === 0) {
            subGrid.innerHTML = `
                <p class="empty-category">Aucune sous-catégorie disponible dans ${categoryName} pour le moment.</p>
            `;
            return;
        }

        subGrid.innerHTML = subCategories.map(sub => `
            <div class="category-card" data-subcategory="${sub.nom}">
                <div class="category-icon">
                    <img src="${sub.image}" alt="${sub.nom}" class="category-img">
                </div>
                <h3 class="category-card-title">${sub.nom}</h3>
                <p class="category-card-desc">${sub.description}</p>
                <span class="category-count">${sub.count} offre(s)</span>
            </div>
        `).join("");

        subGrid.querySelectorAll(".category-card").forEach(card => {
            card.addEventListener("click", () => {
                const subName = card.getAttribute("data-subcategory");
                enterSubCategory(categoryName, subName);
            });
        });
    }
}

function enterSubCategory(categoryName, subCategoryName) {
    currentCategory = categoryName;
    currentSubCategory = subCategoryName;

    const subGrid = document.getElementById("subcategoriesGrid");
    const catalogContainer = document.getElementById("catalog");
    const titleEl = document.getElementById("currentCategoryTitle");
    const backBtn = document.getElementById("backToCategoriesBtn");

    if (subGrid) subGrid.style.display = "none";
    if (catalogContainer) catalogContainer.style.display = "grid";
    if (titleEl) titleEl.textContent = `${categoryName} — ${subCategoryName}`;
    if (backBtn) backBtn.textContent = `← Retour à ${categoryName}`;

    renderCatalog(categoryName, subCategoryName);
}

function renderCatalog(categoryName, subCategoryName = null) {
    const catalogContainer = document.getElementById("catalog");
    if (!catalogContainer) return;

    if (typeof PRODUITS === "undefined" || !Array.isArray(PRODUITS)) {
        catalogContainer.innerHTML = `<p class="empty-category">Catalogue indisponible.</p>`;
        return;
    }

    let filteredProducts = categoryName === "Tout"
        ? PRODUITS
        : PRODUITS.filter(prod => prod.categorie === categoryName);

    if (subCategoryName) {
        filteredProducts = filteredProducts.filter(
            prod => (prod.sousCategorie || "Autres offres") === subCategoryName
        );
    }

    if (filteredProducts.length === 0) {
        catalogContainer.innerHTML = `
            <p class="empty-category">Aucun produit disponible dans cette sélection pour le moment.</p>
        `;
        return;
    }

    catalogContainer.innerHTML = filteredProducts.map(prod => `
        <article class="product-card">
            <img src="${prod.image}" alt="${prod.nom}" class="product-img">
            <div class="product-info">
                <div>
                    <span class="product-category">${prod.sousCategorie ? `${prod.categorie} • ${prod.sousCategorie}` : prod.categorie}</span>
                    <h2 class="product-title">${prod.nom}</h2>
                    <p class="product-desc">${prod.description}</p>
                </div>
                <div class="product-footer">
                    <span class="product-price">${formatPrice(prod.prix)}</span>
                    <button type="button" class="btn-order" data-product-id="${prod.id}">
                        Commander
                    </button>
                </div>
            </div>
        </article>
    `).join("");

    catalogContainer.querySelectorAll(".btn-order").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.getAttribute("data-product-id"));
            openOrderModal(id);
        });
    });
}

function renderCategoryFields(categoryName) {
    const container = document.getElementById("dynamicCategoryFields");
    if (!container) return;

    const categoryMap = (typeof CHAMPS_PAR_CATEGORIE !== "undefined") ? CHAMPS_PAR_CATEGORIE : {};
    const fields = categoryMap[categoryName] || categoryMap.default || [];

    container.innerHTML = fields.map(field => `
        <div class="form-group">
            <label for="${field.id}">${field.label}</label>
            <input
                type="${field.type || "text"}"
                id="${field.id}"
                name="${field.id}"
                data-label="${field.label}"
                placeholder="${field.placeholder || ""}"
                ${field.required ? "required" : ""}
            >
        </div>
    `).join("");
}

function openOrderModal(productId) {
    if (typeof PRODUITS === "undefined") return;

    selectedProduct = PRODUITS.find(p => Number(p.id) === Number(productId));
    if (!selectedProduct) return;

    const merchantEl = document.getElementById("merchantDisplayNumber");
    const productNameEl = document.getElementById("modalProductName");
    const productPriceEl = document.getElementById("modalProductPrice");
    const modalEl = document.getElementById("orderModal");

    if (merchantEl && typeof CONFIG !== "undefined") {
        merchantEl.textContent = CONFIG.numeroAffichage || "";
    }
    if (productNameEl) productNameEl.textContent = selectedProduct.nom;
    if (productPriceEl) productPriceEl.textContent = formatPrice(selectedProduct.prix);

    renderCategoryFields(selectedProduct.categorie);

    if (modalEl) modalEl.classList.add("active");
}

function closeOrderModal() {
    const modalEl = document.getElementById("orderModal");
    if (modalEl) modalEl.classList.remove("active");
}

function initCatalogEvents() {
    const backBtn = document.getElementById("backToCategoriesBtn");
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            if (currentSubCategory && currentCategory) {
                enterCategory(currentCategory);
            } else {
                showCategoriesView();
            }
        });
    }

    const closeModalBtn = document.getElementById("closeModalBtn");
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeOrderModal);
    }

    const orderModal = document.getElementById("orderModal");
    if (orderModal) {
        orderModal.addEventListener("click", (e) => {
            if (e.target.id === "orderModal") {
                closeOrderModal();
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initCatalogEvents();
    renderCategoriesHome();
    showCategoriesView();
});