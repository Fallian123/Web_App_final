document.addEventListener('DOMContentLoaded', () => {
  const tiles = document.querySelectorAll('.tile');

<<<<<<< Updated upstream
  const navigateTo = (page) => {
    window.location.href = "transactions/" + page;
  };
=======
  /**
   * Navigation zu "transactions/"
   */
  function navigateTo(page) {
    window.location.href = "transactions/" + page;
  }
>>>>>>> Stashed changes

  // Klick-Events auf Kacheln binden
  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const page = tile.getAttribute('data-page');
      navigateTo(page);
    });
  });
});

<<<<<<< Updated upstream
const createDeleteButton = (deleteUrl, confirmMessage, onSuccess) => {
    const btn = document.createElement('button');
    btn.textContent = 'X';
    btn.style.backgroundColor = 'crimson';
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.style.padding = '4px 8px';
    btn.style.cursor = 'pointer';
    btn.title = 'Datensatz löschen';
=======
/**
 * Hilfsfunktion: Erzeugt eine Tabellenzelle (td) mit Textinhalt.
 * Diese Funktion kann von allen weiteren Skripten verwendet werden.
 */
function createCell(content) {
  const td = document.createElement('td');
  td.textContent = content;
  return td;
}

/**
 * Universeller Button zum Löschen von Datensätzen
 * @param {string} deleteUrl - API-Endpunkt für DELETE
 * @param {string} confirmMessage - Meldung für Sicherheitsabfrage
 * @param {function} onSuccess - Callback nach erfolgreichem Löschen
 */
function createDeleteButton(deleteUrl, confirmMessage, onSuccess) {
  const btn = document.createElement('button');
  btn.textContent = 'X';
  btn.classList.add('delete-btn'); // Styling wird durch CSS gesteuert
  btn.title = 'Datensatz löschen';
>>>>>>> Stashed changes

  btn.addEventListener('click', async () => {
    if (!confirm(confirmMessage)) return;

    try {
      const res = await fetch(deleteUrl, { method: 'DELETE' });
      if (res.ok) {
        alert('✅ Eintrag wurde erfolgreich gelöscht.');
        if (typeof onSuccess === 'function') onSuccess();
      } else {
        alert('❌ Fehler beim Löschen: ' + await res.text());
      }
    } catch (err) {
      console.error("❌ Fehler im Delete-Request:", err);
      alert('Fehler beim Löschen. Siehe Konsole.');
    }
  });

<<<<<<< Updated upstream
    return btn;
};
=======
  return btn;
}
>>>>>>> Stashed changes
