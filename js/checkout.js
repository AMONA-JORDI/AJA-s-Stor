function getDynamicDeliveryDetails() {
    const inputs = document.querySelectorAll("#dynamicCategoryFields input, #dynamicCategoryFields select, #dynamicCategoryFields textarea");
    if (!inputs.length) return [];

    const details = [];
    inputs.forEach(input => {
        const label = input.getAttribute("data-label") || input.name || input.id || "Information";
        const val = input.value.trim();
        if (val) {
            details.push(`- ${label} : ${val}`);
        }
    });
    return details;
}

function buildWhatsAppMessage(product, customerData) {
    const devise = (typeof CONFIG !== "undefined" && CONFIG.devise) ? CONFIG.devise : "FCFA";
    const boutique = (typeof CONFIG !== "undefined" && CONFIG.nomBoutique) ? CONFIG.nomBoutique : "AJA's Store";
    const prixFormate = `${Number(product.prix || 0).toLocaleString("fr-FR")} ${devise}`;
    const categorieLabel = product.sousCategorie
        ? `${product.categorie} (${product.sousCategorie})`
        : product.categorie;

    const lines = [
        `Bonjour *${boutique}*, je viens d'effectuer un paiement Mobile Money pour une commande :`,
        ``,
        `*Produit :* ${product.nom}`,
        `*Catégorie :* ${categorieLabel}`,
        `*Montant payé :* ${prixFormate}`,
        ``,
        `*Informations client :*`,
        `- Nom : ${customerData.name}`,
        `- Téléphone : ${customerData.phone}`,
        ...customerData.dynamicDetails,
        `- ID / Réf. Transaction : ${customerData.txId}`
    ];

    return lines.join("\n");
}

function handleCheckoutSubmit(event) {
    event.preventDefault();
    if (typeof selectedProduct === "undefined" || !selectedProduct) return;

    const nameEl = document.getElementById("clientName");
    const phoneEl = document.getElementById("clientPhone");
    const txIdEl = document.getElementById("txId");

    const customerData = {
        name: nameEl ? nameEl.value.trim() : "",
        phone: phoneEl ? phoneEl.value.trim() : "",
        dynamicDetails: getDynamicDeliveryDetails(),
        txId: txIdEl ? txIdEl.value.trim() : ""
    };

    const message = buildWhatsAppMessage(selectedProduct, customerData);
    const numeroWhatsApp = (typeof CONFIG !== "undefined" && CONFIG.vendeurWhatsapp)
        ? CONFIG.vendeurWhatsapp.replace(/\D/g, "")
        : "242069453774";

    const whatsappUrl = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");

    const form = document.getElementById("checkoutForm");
    if (form) form.reset();
    if (typeof closeOrderModal === "function") closeOrderModal();
}

function copyMerchantNumber() {
    const numero = (typeof CONFIG !== "undefined" && CONFIG.numeroAffichage)
        ? CONFIG.numeroAffichage
        : "+242 06 945 37 74";

    const btn = document.getElementById("copyNumberBtn");

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(numero).then(() => {
            if (btn) {
                const original = btn.textContent;
                btn.textContent = "Copié !";
                setTimeout(() => { btn.textContent = original; }, 2000);
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const checkoutForm = document.getElementById("checkoutForm");
    if (checkoutForm) {
        checkoutForm.addEventListener("submit", handleCheckoutSubmit);
    }

    const copyBtn = document.getElementById("copyNumberBtn");
    if (copyBtn) {
        copyBtn.addEventListener("click", copyMerchantNumber);
    }
});