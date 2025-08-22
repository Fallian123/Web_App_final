<<<<<<< Updated upstream
const load = async () => {
    try {
        const res = await fetch('/api/customers');
        const data = await res.json();
=======
/**
 * Lädt alle Kunden vom Server und zeigt sie in der Tabelle an
 */
async function loadCustomers() {
  try {
    const res = await fetch('/api/customers');
    const data = await res.json();
    const tbody = document.getElementById('customerList');
>>>>>>> Stashed changes

    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
<<<<<<< Updated upstream
};
=======

    data.forEach(c => {
      const tr = document.createElement('tr');
      tr.appendChild(createCell(c.id));
      tr.appendChild(createCell(c.name));
      tr.appendChild(createCell(c.address));
      tr.appendChild(createCell(c.email));
      tr.appendChild(createCell(c.phone));

      const tdActions = document.createElement('td');
      tdActions.appendChild(
        createDeleteButton(
          `/api/customers/${c.id}`,
          `Möchten Sie den Kunden "${c.name}" wirklich löschen?`,
          loadCustomers
        )
      );
      tr.appendChild(tdActions);

      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error('❌ Fehler beim Laden der Kunden:', err);
  }
}
>>>>>>> Stashed changes

// Event: Tabelle + Formular
document.addEventListener('DOMContentLoaded', () => {
  loadCustomers();

  const form = document.getElementById('customerForm');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const name = form.name.value.trim();
      const address = form.address.value.trim();
      const email = form.email.value.trim();
      const phone = form.phone.value.trim();
      try {
        const res = await fetch('/api/customers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, address, email, phone }),
        });
        if (!res.ok) throw new Error(await res.text());

        form.reset();
        alert('Neuer Kunde wurde erfolgreich angelegt.');
        loadCustomers();
      } catch (err) {
        alert('Fehler beim Anlegen des Kunden: ' + err.message);
        console.error(err);
      }
    });
  } else {
    console.warn('Formular "customerForm" nicht gefunden!');
  }
});
