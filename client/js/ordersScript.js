let customerCache = [];

const loadCustomersDropdown = async () => {
    const res = await fetch('/api/customers');
    customerCache = await res.json(); // im gleichen Schritt für Tabelle merken

    const customerSelect = document.getElementById('customer_id');
    while (customerSelect.firstChild) {
        customerSelect.removeChild(customerSelect.firstChild);
    }

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
    const res = await fetch('/api/orders');
    const data = await res.json();

    const tbody = document.getElementById('orderList');
    while (tbody.firstChild) tbody.removeChild(tbody.firstChild);

    data.forEach(o => {
        const tr = document.createElement('tr');

        const tdId = document.createElement('td');
        tdId.textContent = o.id;
        tr.appendChild(tdId);

        // Name statt nur ID
        const tdCustomer = document.createElement('td');
        const customer = customerCache.find(c => c.id === o.customer_id);
        tdCustomer.textContent = customer ? customer.name : o.customer_id;
        tr.appendChild(tdCustomer);

        const tdDate = document.createElement('td');
        if (o.order_date) {
            tdDate.textContent = new Date(o.order_date).toLocaleDateString('de-DE');
        } else {
            tdDate.textContent = '';
        }
        tr.appendChild(tdDate);

        const tdStatus = document.createElement('td');
        tdStatus.textContent = o.status || '';
        tr.appendChild(tdStatus);

        const tdActions = document.createElement('td');
        tdActions.appendChild(
            createDeleteButton(
                `/api/orders/${o.id}`,
                `Möchten Sie die Bestellung "${o.id}" wirklich löschen?`,
                loadOrders // richtige Callback-Funktion
            )
        );
        tr.appendChild(tdActions);

        tbody.appendChild(tr);
    });
};

document.getElementById('orderForm').addEventListener('submit', async e => {
    e.preventDefault();
    const form = e.target;

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
});

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

    updateButton();
};

document.addEventListener('DOMContentLoaded', async () => {
    await loadCustomersDropdown(); 
    await loadOrders();
    initStatusToggle(); // <-- Status-Button initialisieren
});

