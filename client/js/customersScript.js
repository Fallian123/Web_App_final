const load = async () => {
    try {
        const res = await fetch('/api/customers');
        const data = await res.json();

        const tbody = document.getElementById('customerList');

        // Alte Zeilen löschen
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }

        data.forEach(c => {
            const tr = document.createElement('tr');

            const tdId = document.createElement('td');
            tdId.textContent = c.id;
            tr.appendChild(tdId);

            const tdName = document.createElement('td');
            tdName.textContent = c.name;
            tr.appendChild(tdName);

            const tdAddress = document.createElement('td');
            tdAddress.textContent = c.address;
            tr.appendChild(tdAddress);

            const tdEmail = document.createElement('td');
            tdEmail.textContent = c.email;
            tr.appendChild(tdEmail);

            const tdPhone = document.createElement('td');
            tdPhone.textContent = c.phone;
            tr.appendChild(tdPhone);

            const tdActions = document.createElement('td');
            tdActions.appendChild(
                createDeleteButton(
                    `/api/customers/${c.id}`,
                    `Möchten Sie den Kunden "${c.name}" wirklich löschen?`,
                    load // Callback zum Neuladen der Tabelle
                )
            );
            tr.appendChild(tdActions);

            tbody.appendChild(tr);
        });
    } catch (err) {
        console.error('Fehler beim Laden der Kunden:', err);
    }
};

document.addEventListener('DOMContentLoaded', load);
