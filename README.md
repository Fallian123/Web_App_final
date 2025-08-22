<<<<<<< Updated upstream
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
=======
Eine einfache Web-ERP-Anwendung auf Basis von Node.js, Express und Sequelize.  
Der Server stellt eine REST-API für Kunden, Bestellungen, Bestellpositionen, Produkte und Benutzer bereit und liefert das statische Frontend aus dem Ordner \`client\`.

---

## Projekt-Metadaten

**Name:**  
Web ERP

**Engine:**  
Node.js 22 LTS ✅

**Working Directory:**  
Projektstamm-Verzeichnis, Einstiegspunkt: \`server/app.js\`

**Node Startup Commandline:**  
\`\`\`bash
node server/app.js
\`\`\`

**Node Startup Commandline (mit Debug, z. B. für Deprecation-Warnungen):**  
\`\`\`bash
node --trace-deprecation server/app.js
\`\`\`

**Package Manager:**  
npm ✅

**Node Port:**  
3000

**Auto Termination (Staging/Preview):**  
7 Tage

---

## Voraussetzungen

- [Node.js 22 LTS](https://nodejs.org/) und **npm**
- MySQL oder MariaDB Instanz

---

## Installation

1. Repository klonen  
   \`\`\`bash
   git clone <repo-url>
   cd <projektordner>
   \`\`\`

2. Abhängigkeiten installieren  
   \`\`\`bash
   npm install
   \`\`\`

3. \`.env\` Datei im Projektstamm anlegen  
   \`\`\`env
>>>>>>> Stashed changes
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=deine_datenbank
   DB_USER=dein_benutzer
   DB_PASS=dein_passwort
<<<<<<< Updated upstream
   PORT=3000        # optional
   ```
4. (Optional) Beispieldaten aus `db_20250805.sql` importieren.
=======
   PORT=3000
   \`\`\`

4. (Optional) Beispieldaten importieren  
   \`\`\`bash
   mysql -u <benutzer> -p <datenbank> < db_20250805.sql
   \`\`\`

---
>>>>>>> Stashed changes

## Entwicklung & Start

Der Server synchronisiert die Datenbankstrukturen über Sequelize.
<<<<<<< Updated upstream
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
=======

Starten:
\`\`\`bash
node server/app.js
\`\`\`

Anwendung läuft dann unter:  
👉 [http://localhost:3000](http://localhost:3000)

---

## Benutzung

Frontend unter \`http://localhost:3000\`:
- Kunden, Produkte und Bestellungen verwalten
- CRUD-Operationen über Formulare
- Bestellungen können mehrere Produkte enthalten

Alternativ können dieselben CRUD-Operationen auch direkt über die API-Endpunkte durchgeführt werden.

---

## API-Endpunkte

- \`/api/customers\`
- \`/api/orders\`
- \`/api/order-items\`
- \`/api/products\`
- \`/api/users\`

Jede Route unterstützt \`GET\`, \`POST\`, \`PUT\`, \`DELETE\`.

---

## Datenbank-Konfiguration / Tabellen

**.env Beispiel:**
\`\`\`env
DB_NAME=
DB_USER=
DB_PASS=
DB_HOST=
DB_PORT=
\`\`\`

**Tabellen-Schema:**
- customers: \`id | name | address | email | phone | created_at\`
- orders: \`id | customer_id | order_date | status | total_value\`
- order_items: \`id | order_id | product_id | quantity | price\`
- products: \`id | name | description | price | stock | created_at | reserved | available\`
- users: \`id | username | email | password | created_at\`

---

## Projektstruktur

\`\`\`
client/   # statisches Frontend (HTML, CSS, JS)
server/   # Express-Server mit Modellen, Controllern und Routen
\`\`\`

---

## Configuration and Access Information

### 🌐 WEB ACCESS
- **URL:** [https://se231306-10849.node.fhstp.cc](https://se231306-10849.node.fhstp.cc)  
- **WebSocket Secure:** \`wss://se231306-10849.node.fhstp.cc:10849\`

### 📂 FILE TRANSFER
- **Protocol:** SFTP  
- **Server / Host:** \`node.fhstp.cc\`  
- **Username:** \`node-se231306-10849\`

### 🗄 DATABASE
- **Type:** MariaDB / MySQL  
- **Manage:** Open phpMyAdmin  
- **Server / Host:** \`169.254.255.253\`  
- **Port:** \`3306\`  
- **Database Name:** \`node_se231306_10849\`  
- **Username:** \`node-se231306-10849\`

### ✉️ E-MAIL
- **Allowed Sender:** [cloudmail-n10849@fhstp.cc](mailto:cloudmail-n10849@fhstp.cc)  
- **Host:** \`csmtp.fhstp.cc\`  
- **Port:** \`587\`  
- **Username:** [cloudmail-n10849@fhstp.cc](mailto:cloudmail-n10849@fhstp.cc)  

---

## CI/CD & GitLab Runner – Hinweise

Für automatisierte Builds, Tests und Deployments (CI/CD) muss ein **GitLab Runner** für dein Projekt aktiviert sein:  
Mehr Infos: [Was ist GitLab Runner?](https://docs.gitlab.com/runner/)

**Runners**
- Runners sind Prozesse, die CI/CD-Jobs ausführen.
- Für dieses Projekt ist ein **Linux (Docker) basierter public runner instance** aktiv:
    - #257 (\`_zSx8c4W\`)
    - Typ: dockerlinuxshared (Instance Runner, für alle Gruppen und Projekte nutzbar)

**Wichtig:**  
Das Projekt verwendet nur den Instance Runner. Projekt- und Gruppen-Runner sind aktuell nicht zugewiesen und nicht erforderlich.

---

## CI/CD Variables

Folgende CI/CD Umgebungsvariablen müssen im Projekt gesetzt sein:

| Variable             | Hinweis                 | Beispielwert / Anmerkung        |
|----------------------|------------------------|---------------------------------|
| ENV_FILE             | Datei (masked/hidden)  | Pfad zur ENV-Konfigurationsdatei|
| SFTP_HOST            | Host für SFTP          | node.fhstp.cc                   |
| SFTP_PASS            | SFTP-Passwort (masked) |                                 |
| SFTP_PORT            | Port für SFTP          | 22                              |
| SFTP_REMOTE_PATH     | Zielpfad auf Server    | /var/www/...                    |
| SFTP_USER            | Benutzername für SFTP  | node-se231306-10849             |
| SSH_PRIVATE_KEY_B64  | Base64-codiert (masked)|                                 |

**Hinweis:**  
Der Wert für \`SSH_PRIVATE_KEY_B64\` muss aus deinem privaten SSH-Key mit PowerShell erzeugt werden:

\`\`\`powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("C:\\Pfad\\zu\\deinem\\private-key.pem"))
\`\`\`

Das Ergebnis in die Variable \`SSH_PRIVATE_KEY_B64\` im CI/CD-UI eintragen.

---

## Lizenz

ISC (siehe \`package.json\`).
KI- unterstützt generiert
>>>>>>> Stashed changes
