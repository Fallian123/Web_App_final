document.addEventListener('DOMContentLoaded', () => {
  const tiles = document.querySelectorAll('.tile');

  const navigateTo = (page) => {
    window.location.href = "transactions/" + page;
  };

  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const page = tile.getAttribute('data-page');
      navigateTo(page);
    });
  });
});

const createDeleteButton = (deleteUrl, confirmMessage, onSuccess) => {
    const btn = document.createElement('button');
    btn.textContent = 'X';
    btn.style.backgroundColor = 'crimson';
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.style.padding = '4px 8px';
    btn.style.cursor = 'pointer';
    btn.title = 'Datensatz löschen';

    btn.addEventListener('click', async () => {
        if (!confirm(confirmMessage)) return;

        const res = await fetch(deleteUrl, { method: 'DELETE' });
        if (res.ok) {
            alert('Eintrag gelöscht.');
            if (typeof onSuccess === 'function') onSuccess();
        } else {
            alert('Fehler beim Löschen: ' + await res.text());
        }
    });

    return btn;
};
