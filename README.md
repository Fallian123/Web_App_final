# Web App Final

Eine einfache Web-ERP-Anwendung auf Basis von Node.js, Express und Sequelize. Der Server stellt eine REST-API für Kunden, Bestellungen, Bestellpositionen, Produkte und Benutzer bereit und liefert das statische Frontend aus dem Ordner `client`.

## Voraussetzungen

- [Node.js](https://nodejs.org/) und npm
- MySQL oder MariaDB Instanz

## Installation

1. Repository klonen
2. Abhängigkeiten installieren
   ```bash
   npm install
   ```
3. `.env` Datei im Projektstamm anlegen
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=deine_datenbank
   DB_USER=dein_benutzer
   DB_PASS=dein_passwort
   PORT=3000        # optional
   ```
4. (Optional) Beispieldaten aus `db_20250805.sql` importieren.

## Entwicklung & Start

Der Server synchronisiert die Datenbankstrukturen über Sequelize.
Starten:

```bash
node server/app.js
```

Die Anwendung ist anschließend unter `http://localhost:3000` erreichbar.

## Benutzung

Nach dem Start erreichst du unter `http://localhost:3000` ein simples Frontend. Über die Navigationsleiste kannst du Kunden, Produkte und Bestellungen verwalten. Die Formulare erlauben das Anlegen, Bearbeiten und Löschen von Einträgen; Bestellungen können mehrere Produkte enthalten. Alternativ lassen sich dieselben CRUD-Operationen auch direkt über die oben genannten API-Endpunkte durchführen.

## API-Endpunkte

- `/api/customers`
- `/api/orders`
- `/api/order-items`
- `/api/products`
- `/api/users`

Jede Route unterstützt `GET`, `POST`, `PUT`, `DELETE` für CRUD-Operationen.

## Projektstruktur

```
client/   # statisches Frontend (HTML, CSS, JS)
server/   # Express-Server mit Modellen, Controllern und Routen
```

## Lizenz

ISC (siehe `package.json`).
