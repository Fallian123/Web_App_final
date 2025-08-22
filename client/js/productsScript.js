<<<<<<< Updated upstream
const loadProducts = async () => {
    try {
        const res = await fetch('/api/products');
        const data = await res.json();
=======
/**
 * Lädt Produkte und zeigt diese in einer Tabelle
 */
async function loadProducts() {
  try {
    const res = await fetch('/api/products');
    const data = await res.json();
    const tbody = document.getElementById('productList');
    while (tbody.firstChild) tbody.removeChild(tbody.firstChild);
>>>>>>> Stashed changes

    data.forEach(p => {
      const tr = document.createElement('tr');
      tr.appendChild(createCell(p.id));
      tr.appendChild(createCell(p.name));
      tr.appendChild(createCell(p.description || ''));
      tr.appendChild(createCell(p.price));
      tr.appendChild(createCell(p.stock));
      tr.appendChild(createCell(p.reserved));
      tr.appendChild(createCell(p.available));

<<<<<<< Updated upstream
        // Bestehende Zeilen löschen
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }

        data.forEach(p => {
            const tr = document.createElement('tr');

            // Produkt-ID
            const tdId = document.createElement('td');
            tdId.textContent = p.id;
            tr.appendChild(tdId);

            // Name
            const tdName = document.createElement('td');
            tdName.textContent = p.name;
            tr.appendChild(tdName);

            // Beschreibung
            const tdDescription = document.createElement('td');
            tdDescription.textContent = p.description || '';
            tr.appendChild(tdDescription);

            // Preis
            const tdPrice = document.createElement('td');
            tdPrice.textContent = p.price;
            tr.appendChild(tdPrice);

            // Lagerbestand
            const tdStock = document.createElement('td');
            tdStock.textContent = p.stock;
            tr.appendChild(tdStock);

            // Reserviert
            const tdReserved = document.createElement('td');
            tdReserved.textContent = p.reserved;
            tr.appendChild(tdReserved);

            // Verfügbar
            const tdAvailable = document.createElement('td');
            tdAvailable.textContent = p.available;
            tr.appendChild(tdAvailable);

            // Aktionen (Löschen)
            const tdActions = document.createElement('td');
            tdActions.appendChild(
                createDeleteButton(
                    `/api/products/${p.id}`,
                    `Möchten Sie das Produkt "${p.name}" wirklich löschen?`,
                    loadProducts // nach dem Löschen neu laden
                )
            );
            tr.appendChild(tdActions);

            tbody.appendChild(tr);
        });
    } catch (err) {
        console.error('Fehler beim Laden der Produkte:', err);
    }
};
=======
      const tdActions = document.createElement('td');
      tdActions.appendChild(
        createDeleteButton(
          `/api/products/${p.id}`,
          `Möchten Sie das Produkt "${p.name}" wirklich löschen?`,
          loadProducts
        )
      );
      tr.appendChild(tdActions);
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error("❌ Fehler beim Laden der Produkte:", err);
  }
}
>>>>>>> Stashed changes

// Produktformular - POST
document.getElementById('productForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  try {
    const stockValue = Number(form.stock.value);
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name.value,
        description: form.description.value,
        price: parseFloat(form.price.value) || 0,
        stock: stockValue,
        reserved: 0,
        available: stockValue
      })
    });
    form.reset();
    loadProducts();
  } catch (err) {
    console.error('❌ Fehler beim Anlegen eines Produkts:', err);
  }
});

document.addEventListener('DOMContentLoaded', loadProducts);
