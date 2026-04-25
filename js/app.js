const products = [
    {
        id: 1,
        name: "Crystal Clear Case",
        model: "iPhone 15",
        material: "Kunststoff",
        price: 9.99,
        description: "Ultradünnes, transparentes Design. Zeigt die Originalfarbe deines iPhones.",
        specs: ["Vergilbungsfrei", "Extra Grip", "Leichtbau"],
        image: "assets/images/clear case.jpg"
    },
    {
        id: 2,
        name: "Premium Leather Edition",
        model: "iPhone 14",
        material: "Leder",
        price: 23.99,
        description: "Echtes Leder für ein luxuriöses Gefühl und optimalen Schutz.",
        specs: ["Echtes Leder", "Mikrofaser-Innenfutter", "Edle Patina"],
        image: "assets/images/leather.jpg"
    },
    {
        id: 3,
        name: "MagSafe Armor Case",
        model: "iPhone 15 Pro",
        material: "Kunststoff",
        price: 19.99,
        description: "Integrierte Magnete für perfektes kabelloses Laden und sicheren Halt.",
        specs: ["MagSafe optimiert", "Stoßfest", "Kratzfest"],
        image: "assets/images/clear magsafe.jpg"
    }
];

let lastFocusedElement;

document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    
    const urlParams = new URLSearchParams(window.location.search);
    const selectedModel = urlParams.get('model');
    if (selectedModel) {
        const filter = document.getElementById('modelFilter');
        if (filter) {
            filter.value = selectedModel;
            filterProducts();
        }
    }
});

function renderProducts(productsToRender) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    productsToRender.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img-container">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-model">${product.model}</p>
                <p class="product-price">${product.price.toFixed(2)} €</p>
                <button class="btn-primary" onclick="openModal(${product.id})">Details</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterProducts() {
    const model = document.getElementById('modelFilter').value;
    const material = document.getElementById('materialFilter').value;
    const search = document.getElementById('searchInput').value.toLowerCase();

    const filtered = products.filter(p => {
        return (model === "" || p.model === model) &&
               (material === "" || p.material === material) &&
               (p.name.toLowerCase().includes(search));
    });
    renderProducts(filtered);
}


function openModal(id) {
    const p = products.find(prod => prod.id === id);
    if (!p) return;
    
    const modal = document.getElementById('productModal');
    
    document.getElementById('modalTitle').innerText = p.name;
    document.getElementById('modalImage').src = p.image;
    document.getElementById('modalModel').innerText = p.model + " | " + p.material;
    document.getElementById('modalDescription').innerText = p.description;
    document.getElementById('modalPrice').innerText = p.price.toFixed(2) + " €";
    
    const specs = document.getElementById('modalSpecs');
    specs.innerHTML = p.specs.map(s => `<li>${s}</li>`).join('');
    
    // Wichtig: Erst hier auf 'flex' setzen
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
}

// Sicherstellen, dass das Modal beim Laden wirklich zu ist
window.addEventListener('load', () => {
    const modal = document.getElementById('productModal');
    if(modal) modal.style.display = 'none';
});