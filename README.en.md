<p align="center">
  <a href="README.md">Português</a> | <b>English</b>
</p>

<h1 align="center">Maiden Gate</h1>

<p align="center">
  A full stack web platform designed to support tabletop RPG campaigns for the original system <strong>Voice Of Flower: Awakening of the Maiden</strong>.
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-111827?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-111827?style=for-the-badge&logo=typescript&logoColor=3178C6" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-111827?style=for-the-badge&logo=vite&logoColor=646CFF" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-111827?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8" />
  <img alt="Laravel" src="https://img.shields.io/badge/Laravel-111827?style=for-the-badge&logo=laravel&logoColor=FF2D20" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-111827?style=for-the-badge&logo=postgresql&logoColor=4169E1" />
</p>

<p align="center">
  <img alt="Docker" src="https://img.shields.io/badge/Docker-111827?style=for-the-badge&logo=docker&logoColor=2496ED" />
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-111827?style=for-the-badge&logo=vercel&logoColor=FFFFFF" />
  <img alt="Render" src="https://img.shields.io/badge/Render-111827?style=for-the-badge&logo=render&logoColor=46E3B7" />
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-111827?style=for-the-badge&logo=supabase&logoColor=3ECF8E" />
</p>

---

## About the Project

**Maiden Gate** is a full stack web application created to support **Game Masters** and **Players** during tabletop RPG campaigns.

The platform was created to replace scattered notes, manual spreadsheets and physical campaign controls with an integrated digital tool. Its goal is to make tabletop sessions more organized, fluid and immersive, allowing the group to focus more on storytelling and less on manual information management.

Although it was initially created for the original system **Voice Of Flower: Awakening of the Maiden**, the application was designed with future expansion and adaptation to other RPG systems in mind.

---

## Deployment

The project is deployed in production with separated frontend, backend and database services.

| Layer | Service | URL / Note |
|---|---|---|
| Frontend | Vercel | `https://maiden-gate-six.vercel.app` |
| Backend / API | Render | `https://maiden-gate.onrender.com` |
| Database | Supabase | PostgreSQL using pooler connection |
| Container | Docker | Laravel backend running in an Apache/PHP container |

### Deployment Notes

- The frontend is deployed on **Vercel**.
- The Laravel backend is deployed on **Render** using **Docker**.
- The PostgreSQL database is hosted on **Supabase**.
- The backend uses environment variables to define `APP_URL`, `FRONTEND_URL`, database connection and production settings.
- The frontend uses `VITE_API_URL` to point to the API deployed on Render.
- The container startup script runs important Laravel commands such as migrations, storage link creation and application optimization.

---

## Project Preview

### Home Page

![Home Page](docs/images/home-preview.png)

### Game Master Dashboard

![Game Master Dashboard](docs/images/master-dashboard.png)

### Game Master Campaign Page

![Game Master Campaign Page](docs/images/master-campaign-page.png)

### Player Dashboard

![Player Dashboard](docs/images/player-dashboard.png)

### Character Creation

![Character Creation](docs/images/character-creation.png)

### Player Campaign Page

![Player Campaign Page](docs/images/player-campaign-page.png)

---

## About Voice Of Flower

**Voice Of Flower: Awakening of the Maiden** is an original tabletop RPG system currently in development, set in a dark fantasy universe filled with politics, mystery, Miasma, Marks and conflicts between factions.

In the system, characters have Marks that influence their abilities, attributes and role within the narrative. **Maiden Gate** works as a digital tool to test, organize and apply these rules during real campaigns.

---

## Main Features

### Authentication and Profiles

- User registration and login.
- Separate profiles for **Game Master** and **Player**.
- Protected routes through authentication.
- Interface adapted according to user role.
- Automatic redirection based on user profile.

---

## Game Master Module

The Game Master has a complete dashboard to create, edit and manage campaigns.

### Game Master Dashboard

- List of created campaigns.
- General statistics.
- Player join requests.
- Accept or reject players in campaigns.
- Quick access to campaign and element creation.

### Campaign Creation and Management

- Manual campaign creation.
- Premade campaign based on **Voice Of Flower: Awakening of the Maiden**.
- Campaign editing and deletion.
- Campaign cover image upload.
- Creation of locations, NPCs, monsters, items, events, sessions and campaign skills.
- Organization of elements into custom **collections**.
- Visibility control for elements shown to players.
- NPC association with Marks stored in the database.
- Status and skill creation for NPCs and monsters.

### Game Master Campaign Page

- Complete visualization of campaign elements.
- Current campaign location control.
- Private Game Master notes.
- Session schedule.
- Campaign member visualization.
- Character HP/XP visualization and editing.
- NPC and monster status visualization.
- Main campaign data management.
- Shared dice roll chat.
- Dice history clearing by the Game Master.
- Quick combat effects reference.
- Element creation, copying and reorganization between collections.

---

## Player Module

The Player has a dedicated dashboard to manage characters, campaigns and session participation.

### Player Dashboard

- List of created characters.
- Real statistics based on characters.
- List of campaigns the player has joined.
- List of available campaigns.
- Campaign join requests.

### Character Creation and Editing

- Selection of campaigns available to the player.
- Selection of Marks from the database.
- Mark-based skill tree visualization.
- Equipment of up to 6 skills.
- Attribute distribution: POD, DES, RES, INT, DET and PRE.
- Initial distribution limits controlled by system rules.
- Automatic status calculation.
- Visual indicators showing attribute impact.
- Upload of two character images: icon image and full-body image.
- Character editing and deletion.
- Real backend persistence.

### Player Campaign Page

- Visualization of campaign elements released by the Game Master.
- Visualization of location, NPC and monster images.
- NPC and monster status visualization.
- Visualization of the player's own character data.
- Visualization of campaign members.
- Visualization of the current location defined by the Game Master.
- Functional inventory: add item, update quantity and remove item.
- Visualization of sessions created by the Game Master.
- Shared dice roll chat.
- Quick combat effects reference.

---

## Dice Roll System

Maiden Gate includes a shared dice roll system between Game Master and Players.

- Dice rolls stored in the backend.
- Shared campaign history.
- Game Master can view player rolls.
- Players can view Game Master and other player rolls.
- Automatic updates through polling.
- Game Master can clear the full campaign roll history.

---

## Rules Pages

While the full **Voice Of Flower** rulebook is still in development, the project includes summarized rules pages:

- General public rules.
- Game Master-specific rules.
- Player-specific rules.
- Explanation of main attributes.
- Combat effects list.
- Tab-based interface with essential content.
- Download button displayed as unavailable until the rulebook is finished.

---

## Effects System

The project includes an internal effects guide used as a session reference.

Available effects include:

- Buffs, such as Increase, Advantage, Regeneration and Purification.
- Debuffs, such as Infection, Reduction, Burn and Disadvantage.
- Control effects, such as Doom, Paralysis and Omen.
- Special effects, such as Ephemeral, Ruin, Punish and Decay.
- Mark-based effects, such as Decree, Authority, Resonance, Shadow, Pain and Fortuitous.

---

## Responsiveness

The project includes specific adjustments for smaller screens:

- Mobile menu on the home page.
- Mobile menu on authenticated pages.
- Campaign tabs adapted into a mobile selector.
- Modals adapted for smaller screens.
- Effects guide displayed as a mobile accordion.
- Responsive layouts for dashboards, cards, elements and forms.

---

## Technologies Used

### Frontend

<p>
  <img alt="React" src="https://img.shields.io/badge/React-111827?style=flat-square&logo=react&logoColor=61DAFB" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-111827?style=flat-square&logo=typescript&logoColor=3178C6" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-111827?style=flat-square&logo=vite&logoColor=646CFF" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-111827?style=flat-square&logo=tailwindcss&logoColor=38BDF8" />
  <img alt="React Router" src="https://img.shields.io/badge/React_Router-111827?style=flat-square&logo=reactrouter&logoColor=CA4245" />
  <img alt="Axios" src="https://img.shields.io/badge/Axios-111827?style=flat-square&logo=axios&logoColor=5A29E4" />
</p>

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React
- EmailJS

### Backend

<p>
  <img alt="PHP" src="https://img.shields.io/badge/PHP-111827?style=flat-square&logo=php&logoColor=777BB4" />
  <img alt="Laravel" src="https://img.shields.io/badge/Laravel-111827?style=flat-square&logo=laravel&logoColor=FF2D20" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-111827?style=flat-square&logo=postgresql&logoColor=4169E1" />
  <img alt="REST API" src="https://img.shields.io/badge/REST_API-111827?style=flat-square" />
</p>

- PHP
- Laravel
- REST API
- PostgreSQL
- Migrations
- File uploads
- API authentication

### Deployment and Infrastructure

- Vercel for the frontend.
- Render for the backend.
- Supabase PostgreSQL for the database.
- Docker to package the Laravel backend.
- Apache/PHP in the production container.

### Development Tools

<p>
  <img alt="Git" src="https://img.shields.io/badge/Git-111827?style=flat-square&logo=git&logoColor=F05032" />
  <img alt="GitHub" src="https://img.shields.io/badge/GitHub-111827?style=flat-square&logo=github&logoColor=FFFFFF" />
  <img alt="VS Code" src="https://img.shields.io/badge/VS_Code-111827?style=flat-square&logo=visualstudiocode&logoColor=007ACC" />
  <img alt="Composer" src="https://img.shields.io/badge/Composer-111827?style=flat-square&logo=composer&logoColor=885630" />
  <img alt="NPM" src="https://img.shields.io/badge/NPM-111827?style=flat-square&logo=npm&logoColor=CB3837" />
</p>

- Git and GitHub
- VS Code
- Composer
- NPM
- Postman/Insomnia
- pgAdmin/Supabase Dashboard

---

## Running the Project Locally

### Prerequisites

- Node.js
- NPM
- PHP
- Composer
- PostgreSQL

### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan storage:link
php artisan serve
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

### Frontend

Create a `.env` or `.env.local` file inside the frontend folder:

```env
VITE_API_URL=http://127.0.0.1:8000/api
VITE_STORAGE_URL=http://127.0.0.1:8000/storage

VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

In production, on Vercel:

```env
VITE_API_URL=https://maiden-gate.onrender.com/api
```

### Backend

Configure the Laravel `.env` file:

```env
APP_NAME=Maiden-Gate
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000
FRONTEND_URL=http://localhost:5173

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password

CACHE_STORE=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
FILESYSTEM_DISK=public
```

In production, on Render:

```env
APP_NAME=Maiden-Gate
APP_ENV=production
APP_DEBUG=false
APP_URL=https://maiden-gate.onrender.com
FRONTEND_URL=https://maiden-gate-six.vercel.app

LOG_CHANNEL=stderr
LOG_LEVEL=info

DB_CONNECTION=pgsql
DB_HOST=supabase_pooler_host
DB_PORT=0000
DB_DATABASE=postgres
DB_USERNAME=pooler_username
DB_PASSWORD=database_password
DB_SSLMODE=require

CACHE_STORE=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
FILESYSTEM_DISK=public
PORT=80
```

> **Important:** Production variables should be configured directly on Vercel and Render.

---

## Docker

The backend includes a Dockerfile for deploying Laravel on Render.

The container runs Laravel with Apache/PHP and points the web server to Laravel's `public` directory.

It also includes a startup script responsible for preparing the application before starting the server:

```bash
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan storage:link
php artisan migrate --force
php artisan optimize
apache2-foreground
```

This flow avoids the need to access Render's shell to run manual commands after deployment.

---

## General Structure

```txt
maiden-gate/
├── backend/
│   ├── app/
│   ├── database/
│   ├── docker/
│   ├── routes/
│   ├── Dockerfile
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── features/
│   │   ├── shared/
│   │   ├── routes/
│   │   └── services/
│   └── ...
│
├── README.md
└── README.en.md
```

---

## Project Status

The project is a **completed and deployed MVP**.

The main features are already implemented:

- authentication;
- dashboards;
- campaign creation and editing;
- premade campaigns;
- character creation, editing and deletion;
- campaign pages for Game Master and Player;
- inventory;
- shared dice roll system;
- collection-based organization;
- element visibility control;
- rules pages;
- effects guide;
- responsiveness;
- frontend and backend deployment.

---

## Roadmap

- [x] User authentication.
- [x] Game Master and Player role separation.
- [x] Game Master dashboard.
- [x] Player dashboard.
- [x] Campaign creation.
- [x] Premade campaigns.
- [x] Character creation.
- [x] Image uploads.
- [x] Functional inventory.
- [x] Campaign sessions.
- [x] Shared dice roll chat.
- [x] Rules pages.
- [x] Effects guide.
- [x] Collection-based organization.
- [x] Mobile interface.
- [x] Frontend deployment.
- [x] Backend deployment.

---

## Notes

- The complete **Voice Of Flower** rulebook is still in development.
- Some rules and texts may change as the system evolves.
- The battle tab is still marked as **In development**.
- Local image storage in the backend may be replaced in the future by an external solution such as Supabase Storage, Cloudinary or S3.
- The project was created both as a practical tool for real campaigns and as a full stack portfolio project.

---

## Author

Developed by **Kauan Malvino Garcia**.

- GitHub: [malvino11-28](https://github.com/malvino11-28)
- LinkedIn: [Malvino Garcia](https://www.linkedin.com/in/malvino-garcia)

---

## License

This project is licensed under the **MIT** license.
