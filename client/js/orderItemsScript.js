let orderCache = [];
let productCache = [];
let customerCache = [];

<<<<<<< Updated upstream
const loadDropdownData = async () => {
    // Kunden laden (für Namen)
=======
/**
 * Dropdowns für Bestellungen + Produkte laden
 */
async function loadDropdownData() {
  try {
    // Kunden
>>>>>>> Stashed changes
    const customerRes = await fetch('/api/customers');
    customerCache = await customerRes.json();

    // Bestellungen
    const orderRes = await fetch('/api/orders');
    orderCache = await orderRes.json();

    const orderSelect = document.getElementById('orderSelect');
    while (orderSelect.firstChild) orderSelect.removeChild(orderSelect.firstChild);
    const defaultOrderOption = document.createElement('option');
    defaultOrderOption.value = '';
    defaultOrderOption.textContent = 'Bitte Bestellung wählen';
    defaultOrderOption.disabled = true;
    defaultOrderOption.selected = true;
    orderSelect.appendChild(defaultOrderOption);

    orderCache.forEach(o => {
      const customer = customerCache.find(c => c.id === o.customer_id);
      const customerName = customer ? customer.name : o.customer_id;
      const option = document.createElement('option');
      option.value = o.id;
      option.textContent = `#${o.id} – ${customerName}`;
      orderSelect.appendChild(option);
    });

    // Produkte
    const productRes = await fetch('/api/products');
    productCache = await productRes.json();

    const productSelect = document.getElementById('productSelect');
    while (productSelect.firstChild) productSelect.removeChild(productSelect.firstChild);
    const defaultProductOption = document.createElement('option');
    defaultProductOption.value = '';
    defaultProductOption.textContent = 'Bitte Produkt wählen';
    defaultProductOption.disabled = true;
    defaultProductOption.selected = true;
    productSelect.appendChild(defaultProductOption);

    productCache.forEach(p => {
      const option = document.createElement('option');
      option.value = p.id;
      option.textContent = `${p.name} – ${p.price}€`;
      productSelect.appendChild(option);
    });
<<<<<<< Updated upstream
};

const loadItems = async () => {
=======
  } catch (err) {
    console.error('❌ Fehler beim Laden der Dropdown-Daten:', err);
  }
}

/**
 * Lädt alle OrderItems und zeigt sie an
 */
async function loadItems() {
  const tbody = document.getElementById('itemList');
  tbody.textContent = 'Lädt Daten aus Datenbank...';
  try {
>>>>>>> Stashed changes
    const res = await fetch('/api/order-items');
    const data = await res.json();
    tbody.textContent = '';
    while (tbody.firstChild) tbody.removeChild(tbody.firstChild);

    data.forEach(i => {
      const tr = document.createElement('tr');
      tr.appendChild(createCell(i.id));

      const order = orderCache.find(o => o.id === i.order_id);
      if (order) {
        const customer = customerCache.find(c => c.id === order.customer_id);
        const customerName = customer ? customer.name : order.customer_id;
        tr.appendChild(createCell(`Bestellung ${order.id} (${customerName})`));
      } else {
        tr.appendChild(createCell(`Bestellung ${i.order_id}`));
      }

      const product = productCache.find(p => p.id === i.product_id);
      tr.appendChild(createCell(product ? product.name : i.product_id));
      tr.appendChild(createCell(i.quantity));
      tr.appendChild(createCell(i.price));

      const tdActions = document.createElement('td');
      tdActions.appendChild(
        createDeleteButton(
          `/api/order-items/${i.id}`,
          `Möchten Sie die Bestellposition "${i.id}"/Bestellung ${i.order_id} wirklich löschen?`,
          loadItems
        )
      );
      tr.appendChild(tdActions);
      tbody.appendChild(tr);
    });
<<<<<<< Updated upstream
};
=======
  } catch (err) {
    tbody.textContent = 'Fehler beim Laden der Daten.';
    console.error("❌ Fehler beim Laden der OrderItems:", err);
  }
}
>>>>>>> Stashed changes

// Formular-Handling
document.addEventListener('DOMContentLoaded', async () => {
  await loadDropdownData();
  await loadItems();

  const form = document.getElementById('orderItemForm');
  if (!form) {
    console.warn('Formular "orderItemForm" nicht gefunden!');
    return;
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const orderId = form.orderSelect.value;
    const productId = form.productSelect.value;
    const quantity = Number(form.quantity.value);
    const price = parseFloat(form.price.value);

    if (!orderId || !productId || quantity <= 0 || isNaN(price) || price <= 0) {
      alert('Bitte Bestellung, Produkt, Menge und Preis korrekt auswählen und eingeben.');
      return;
    }

    try {
      const res = await fetch('/api/order-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: orderId,
          product_id: productId,
          quantity: quantity,
          price: price
        }),
      });
      if (!res.ok) throw new Error(await res.text());

      alert('Bestellposition erfolgreich angelegt.');
      form.reset();
      await loadItems();
    } catch (err) {
      alert('Fehler beim Anlegen der Bestellposition: ' + err.message);
      console.error(err);
    }
  });
});
