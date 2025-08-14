let orderCache = [];
let productCache = [];
let customerCache = []; // neu für Kundennamen

async function loadDropdownData() {
    // Kunden laden (für Namen)
    const customerRes = await fetch('/api/customers');
    customerCache = await customerRes.json();

    // Bestellungen laden
    const orderRes = await fetch('/api/orders');
    orderCache = await orderRes.json();

    const orderSelect = document.getElementById('orderSelect');
    while (orderSelect.firstChild) orderSelect.removeChild(orderSelect.firstChild);

    const defaultOrderOption = document.createElement('option');
    defaultOrderOption.value = '';
    defaultOrderOption.textContent = 'Bitte Bestellung wählen';
    orderSelect.appendChild(defaultOrderOption);

    // Bestellungen im Dropdown mit Kundennamen
    orderCache.forEach(o => {
        const customer = customerCache.find(c => c.id === o.customer_id);
        const customerName = customer ? customer.name : o.customer_id;
        const option = document.createElement('option');
        option.value = o.id;
        option.textContent = `#${o.id} – ${customerName}`;
        orderSelect.appendChild(option);
    });

    // Produkte laden
    const productRes = await fetch('/api/products');
    productCache = await productRes.json();

    const productSelect = document.getElementById('productSelect');
    while (productSelect.firstChild) productSelect.removeChild(productSelect.firstChild);

    const defaultProductOption = document.createElement('option');
    defaultProductOption.value = '';
    defaultProductOption.textContent = 'Bitte Produkt wählen';
    productSelect.appendChild(defaultProductOption);

    productCache.forEach(p => {
        const option = document.createElement('option');
        option.value = p.id;
        option.textContent = `${p.name} – ${p.price}€`;
        productSelect.appendChild(option);
    });
}

async function loadItems() {
    const res = await fetch('/api/order-items');
    const data = await res.json();

    const tbody = document.getElementById('itemList');
    while (tbody.firstChild) tbody.removeChild(tbody.firstChild);

    data.forEach(i => {
        const tr = document.createElement('tr');

        // ID
        const tdId = document.createElement('td');
        tdId.textContent = i.id;
        tr.appendChild(tdId);

        // Bestellung mit Kundennamen
        const tdOrder = document.createElement('td');
        const order = orderCache.find(o => o.id === i.order_id);

        if (order) {
            const customer = customerCache.find(c => c.id === order.customer_id);
            const customerName = customer ? customer.name : order.customer_id;
            tdOrder.textContent = `Bestellung ${order.id} (${customerName})`;
        } else {
            tdOrder.textContent = `Bestellung ${i.order_id}`;
        }

        tr.appendChild(tdOrder);

        // Produktname
        const tdProduct = document.createElement('td');
        const product = productCache.find(p => p.id === i.product_id);
        tdProduct.textContent = product ? product.name : i.product_id;
        tr.appendChild(tdProduct);

        // Menge
        const tdQuantity = document.createElement('td');
        tdQuantity.textContent = i.quantity;
        tr.appendChild(tdQuantity);

        // Preis
        const tdPrice = document.createElement('td');
        tdPrice.textContent = i.price;
        tr.appendChild(tdPrice);

        const tdActions = document.createElement('td');
        tdActions.appendChild(
            createDeleteButton(
                `/api/order-items/${i.id}`, // i.id statt c.id
                `Möchten Sie die Bestellposition "${i.id}"/ Bestellung ${i.order_id}  wirklich löschen?`,
                loadItems // richtige Callback-Funktion
            )
        );
        tr.appendChild(tdActions);

        tbody.appendChild(tr);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadDropdownData();
    await loadItems();
});
