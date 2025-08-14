async function loadUsers() {
    try {
        const res = await fetch('/api/users');
        const data = await res.json();

        const tbody = document.getElementById('userList');

        // Tabelle leeren
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }

        data.forEach(u => {
            const tr = document.createElement('tr');

            // ID
            const tdId = document.createElement('td');
            tdId.textContent = u.id;
            tr.appendChild(tdId);

            // Benutzername
            const tdUsername = document.createElement('td');
            tdUsername.textContent = u.username;
            tr.appendChild(tdUsername);

            // E-Mail
            const tdEmail = document.createElement('td');
            tdEmail.textContent = u.email;
            tr.appendChild(tdEmail);

            // Erstellungsdatum
            const tdCreatedAt = document.createElement('td');
            if (u.created_at) {
                tdCreatedAt.textContent = new Date(u.created_at).toLocaleDateString('de-DE');
            } else {
                tdCreatedAt.textContent = '';
            }
            tr.appendChild(tdCreatedAt);

            // Aktionen (Löschen)
            const tdActions = document.createElement('td');
            tdActions.appendChild(
                createDeleteButton(
                    `/api/users/${u.id}`,
                    `Möchten Sie den Benutzer "${u.username}" wirklich löschen?`,
                    loadUsers // nach Löschen neu laden
                )
            );
            tr.appendChild(tdActions);

            tbody.appendChild(tr);
        });
    } catch (err) {
        console.error('Fehler beim Laden der Benutzer:', err);
    }
}

// Formular-Submit (neuen Benutzer anlegen)
document.getElementById('userForm').addEventListener('submit', async e => {
    e.preventDefault();
    const form = e.target;

    await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: form.username.value,
            email: form.email.value,
            password: form.password.value
        })
    });

    form.reset();
    loadUsers();
});

document.addEventListener('DOMContentLoaded', loadUsers);
