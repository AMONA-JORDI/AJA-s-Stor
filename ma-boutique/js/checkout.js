function copyMerchantNumber() {
    navigator.clipboard.writeText(CONFIG.numeroCopie).then(() => {
        alert(`Numéro ${CONFIG.numeroAffichage} copié !`);
    });
}

function buildWhatsAppMessage(product, customerData) {
    const dateCommande = new Date().toLocaleString("fr-FR");

    return [
        "🛍️ *NOUVELLE COMMANDE REÇUE*",
        `📅 *Date :* ${dateCommande}`,
        "",
        `📦 *Produit :* ${product.nom}`,
        `💰 *Montant à vérifier :* ${formatPrice(product.prix)}`,
        `📱 *Paiement vers :* ${CONFIG.numeroAffichage}`,
        "",
        `👤 *Client :* ${customerData.name}`,
        `📞 *Numéro payeur :* ${customerData.phone}`,
        `🧾 *ID Transaction :* ${customerData.txId || "Non renseigné"}`,
        `📍 *Livraison / Détails :* ${customerData.delivery}`,
        "",
        "_Merci de vérifier la réception du dépôt Mobile Money avant d'expédier la commande._"
    ].join("\n");
}
function renderCategoryFields(categoryName) {
    const container = document.getElementById("dynamicCategoryFields");
    if (!container) return;

    const fields = CHAMPS_PAR_CATEGORIE[categoryName] || CHAMPS_PAR_CATEGORIE.default;

    container.innerHTML = fields.map((field, index) => `
        <div class="form-group">
            <label for="${field.id}">${field.label}</label>
            <input
                type="${field.type}"
                id="${field.id}"
                name="${field.id}"
                data-label="${field.label}"
                placeholder="${field.placeholder}"
                ${field.required ? "required" : ""}
            >
        </div>
    `).join("");
}

function getDynamicOrderDetails() {
    const inputs = document.querySelectorAll("#dynamicCategoryFields input");
    const details = {};

    inputs.forEach(input => {
        const label = input.getAttribute("data-label");
        details[label] = input.value.trim();
    });

    return details;
}

function handleCheckoutSubmit(event) {
    event.preventDefault();
    if (!selectedProduct) return;

    const customerData = {
        name: document.getElementById("clientName").value.trim(),
        phone: document.getElementById("clientPhone").value.trim(),
        delivery: document.getElementById("deliveryInfo").value.trim(),
        txId: document.getElementById("txId").value.trim()
    };

    const message = buildWhatsAppMessage(selectedProduct, customerData);
    const whatsappUrl = `https://wa.me/${CONFIG.vendeurWhatsApp}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
    document.getElementById("checkoutForm").reset();
    closeOrderModal();
}

document.getElementById("copyNumberBtn").addEventListener("click", copyMerchantNumber);
document.getElementById("checkoutForm").addEventListener("submit", handleCheckoutSubmit);