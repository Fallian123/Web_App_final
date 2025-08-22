let customerCache = [];

<<<<<<< Updated upstream
const loadCustomersDropdown = async () => {
    const res = await fetch('/api/customers');
    customerCache = await res.json(); // im gleichen Schritt für Tabelle merken
=======
/**
 * Lädt Kunden für Dropdown und speichert Cache
 */
async function loadCustomersDropdown() {
  const res = await fetch('/api/customers');
  customerCache = await res.json();
  const customerSelect = document.getElementById('customer_id');
  while (customerSelect.firstChild) customerSelect.removeChild(customerSelect.firstChild);
>>>>>>> Stashed changes

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Bitte Kunden wählen';
  customerSelect.appendChild(defaultOption);

<<<<<<< Updated upstream
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Bitte Kunden wählen';
    customerSelect.appendChild(defaultOption);

    customerCache.forEach(c => {
        const option = document.createElement('option');
        option.value = c.id;
        option.textContent = `${c.name} (${c.email})`;
        customerSelect.appendChild(option);
    });
};

const loadOrders = async () => {
=======
  customerCache.forEach(c => {
    const option = document.createElement('option');
    option.value = c.id;
    option.textContent = `${c.name} (${c.email})`;
    customerSelect.appendChild(option);
  });
}

/**
 * Alle Bestellungen laden und darstellen
 */
async function loadOrders() {
  try {
>>>>>>> Stashed changes
    const res = await fetch('/api/orders');
    const data = await res.json();
    const tbody = document.getElementById('orderList');
    while (tbody.firstChild) tbody.removeChild(tbody.firstChild);

    data.forEach(o => {
      const tr = document.createElement('tr');
      tr.appendChild(createCell(o.id));
      const customer = customerCache.find(c => c.id === o.customer_id);
      tr.appendChild(createCell(customer ? customer.name : o.customer_id));
      tr.appendChild(createCell(o.order_date ? new Date(o.order_date).toLocaleDateString('de-DE') : ''));
      tr.appendChild(createCell(o.status || ''));

      const tdActions = document.createElement('td');
      tdActions.appendChild(
        createDeleteButton(
          `/api/orders/${o.id}`,
          `Möchten Sie die Bestellung "${o.id}" wirklich stornieren/löschen?`,
          loadOrders
        )
      );
      tr.appendChild(tdActions);
      tbody.appendChild(tr);
    });
<<<<<<< Updated upstream
};
=======
  } catch (err) {
    console.error("❌ Fehler beim Laden der Bestellungen:", err);
  }
}
>>>>>>> Stashed changes

// Neues Order anlegen
document.getElementById('orderForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  try {
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_id: form.customer_id.value,
        order_date: form.order_date.value,
        status: form.status.value
      })
    });
    form.reset();
    loadOrders();
  } catch (err) {
    console.error("❌ Fehler beim Anlegen einer Bestellung:", err);
  }
});

<<<<<<< Updated upstream
const initStatusToggle = () => {
    const toggleBtn = document.getElementById('statusToggle');
    const statusInput = document.getElementById('status');

    const states = ['storniert', 'offen', 'abgeschlossen'];
    let currentIndex = states.indexOf(statusInput.value);
    if (currentIndex === -1) currentIndex = 1; // Standard = offen

    const updateButton = () => {
        const currentState = states[currentIndex];
        toggleBtn.dataset.status = currentState; // CSS kümmert sich um Farbe
        toggleBtn.textContent =
            currentState.charAt(0).toUpperCase() + currentState.slice(1);
        statusInput.value = currentState;
    };

    toggleBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % states.length;
        updateButton();
    });
=======
/**
 * Status-Schalter für Bestellungen
 */
function initStatusToggle() {
  const toggleBtn = document.getElementById('statusToggle');
  const statusInput = document.getElementById('status');
  const states = ['storniert', 'offen', 'abgeschlossen'];
  let currentIndex = states.indexOf(statusInput.value);
  if (currentIndex === -1) currentIndex = 1;

  function updateButton() {
    const currentState = states[currentIndex];
    toggleBtn.dataset.status = currentState;
    toggleBtn.textContent = currentState.charAt(0).toUpperCase() + currentState.slice(1);
    statusInput.value = currentState;
  }
>>>>>>> Stashed changes

  toggleBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % states.length;
    updateButton();
<<<<<<< Updated upstream
};
=======
  });

  updateButton();
}
>>>>>>> Stashed changes

document.addEventListener('DOMContentLoaded', async () => {
  await loadCustomersDropdown();
  await loadOrders();
  initStatusToggle();
});
