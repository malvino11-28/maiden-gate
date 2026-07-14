<p align="center">
  <a href="README.md">Português</a> | <b>English</b>
</p>

<h1 align="center">Maiden Gate</h1>

<p align="center">
  A web support platform for the original tabletop RPG system <strong>Voice Of Flower: Awakening of the Maiden</strong>.
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-11182?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-111827?style=for-the-badge&logo=typescript&logoColor=3178C6" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-111827?style=for-the-badge&logo=vite&logoColor=646CFF" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-111827?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8" />
  <img alt="Laravel" src="https://img.shields.io/badge/Laravel-111827?style=for-the-badge&logo=laravel&logoColor=FF2D20" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-111827?style=for-the-badge&logo=postgresql&logoColor=4169E1" />
</p>

---

## About the Project

**Maiden Gate** is a full stack web application created to support Game Masters and Players during tabletop RPG campaigns.

The platform was created to replace scattered notes, manual spreadsheets, and physical controls with an integrated digital tool. Its goal is to make tabletop sessions more organized, fluid, and immersive, allowing the group to focus more on storytelling and less on manually managing information.

Although it was initially designed for the original **Voice Of Flower** system, its core structure was built to be expandable and adaptable to other RPG systems in the future.

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

**Voice Of Flower: Awakening of the Maiden** is an original tabletop RPG system currently in development. It is set in a dark fantasy universe involving political conflict, mystery, Miasma, Marks, factions, and narrative tension.

In the system, characters have Marks that influence their abilities, attributes, and role in the story. Maiden Gate acts as a digital tool to test, organize, and apply these rules during real campaigns.

---

## Main Features

### Authentication and Roles

- User registration and login.
- Role separation between **Game Master** and **Player**.
- Protected routes.
- Interface adapted according to the user role.

---

## Game Master Module

The Game Master has a complete panel to create, edit, and manage campaigns.

### Game Master Dashboard

- List of created campaigns.
- General statistics.
- Player join requests.
- Accept or reject players in campaigns.

### Campaign Creation

- Manual campaign creation.
- Premade campaign templates.
- Registration of locations, NPCs, monsters, items, lore events, and sessions.
- Image upload for campaigns, locations, NPCs, and monsters.
- NPC association with Marks stored in the database.
- Status and skill registration for NPCs and monsters.

### Game Master Campaign Page

- Complete campaign element visualization.
- Current location control.
- Private Game Master notes.
- Session schedule.
- Campaign member visualization.
- NPC and monster status visualization.
- Campaign data management.
- Shared dice roll chat.
- Dice roll history clearing by the Game Master.
- Battle tab marked as **In development**.

---

## Player Module

Players have their own dashboard to manage characters, campaigns, and session participation.

### Player Dashboard

- List of created characters.
- Real statistics based on the player’s characters.
- List of campaigns the player has joined.
- List of available campaigns.
- Campaign join request system.

### Character Creation

- Selection of campaigns accessible to the player.
- Selection of Marks from the database.
- Skill tree visualization by Mark.
- Up to 6 equipped skills.
- Attribute distribution: POD, DES, RES, INT, DET, and PRE.
- Automatic status calculation.
- Two image uploads: icon image and full character image.
- Real backend persistence.

### Player Campaign Page

- Campaign element visualization.
- Images for locations, NPCs, and monsters.
- NPC and monster status visualization.
- Player character information.
- Campaign member visualization.
- Current location defined by the Game Master.
- Functional inventory: add item, update quantity, and remove item.
- Session visualization.
- Shared dice roll chat.
- Battle tab marked as **In development**.

---

## Dice Roll System

Maiden Gate includes a shared dice roll system between Game Masters and Players.

- Rolls are stored in the backend.
- Campaign-based shared history.
- Game Masters can see player rolls.
- Players can see rolls from the Game Master and other players.
- Automatic updates through polling.
- Game Masters can clear the campaign dice roll history.

---

## Rules Pages

While the complete Voice Of Flower rulebook is still in development, the project includes summarized rules pages:

- General public rules.
- Game Master-specific rules.
- Player-specific rules.
- Tab-based interface with essential information.
- Download button displayed as unavailable until the rulebook is finished.

---

## Responsiveness

The project includes specific adjustments for smaller screens:

- Mobile menu on the public home page.
- Mobile menu on authenticated pages.
- Campaign tabs adapted into mobile selectors.
- Responsive layout for dashboards, cards, elements, and forms.

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

### Backend

<p>
  <img alt="PHP" src="https://img.shields.io/badge/PHP-111827?style=flat-square&logo=php&logoColor=777BB4" />
  <img alt="Laravel" src="https://img.shields.io/badge/Laravel-111827?style=flat-square&logo=laravel&logoColor=FF2D20" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-111827?style=flat-square&logo=postgresql&logoColor=4169E1" />
  <img alt="REST API" src="https://img.shields.io/badge/REST_API-111827?style=flat-square" />
</p>

### Development Tools

<p>
  <img alt="Git" src="https://img.shields.io/badge/Git-111827?style=flat-square&logo=git&logoColor=F05032" />
  <img alt="GitHub" src="https://img.shields.io/badge/GitHub-111827?style=flat-square&logo=github&logoColor=FFFFFF" />
  <img alt="VS Code" src="https://img.shields.io/badge/VS_Code-111827?style=flat-square&logo=visualstudiocode&logoColor=007ACC" />
  <img alt="Composer" src="https://img.shields.io/badge/Composer-111827?style=flat-square&logo=composer&logoColor=885630" />
  <img alt="NPM" src="https://img.shields.io/badge/NPM-111827?style=flat-square&logo=npm&logoColor=CB3837" />
</p>

---

## Running the Project

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

Create a `.env` file in the frontend project:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

### Backend

Configure the Laravel `.env` file:

```env
APP_NAME=MaidenGate
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=0000
DB_DATABASE=your_db
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

---

## General Structure

```txt
maiden-gate/
├── backend/
│   ├── app/
│   ├── database/
│   ├── routes/
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
└── README.md
```

---

## Project Status

The project is currently in a **functional MVP** stage.

Most of the main features are already implemented:

- authentication;
- dashboards;
- campaign creation;
- character creation;
- campaign pages;
- inventory;
- shared dice rolls;
- rules pages;
- responsive interface.

The next steps are mainly focused on:

- interface adjustments;
- text and placeholder review;
- final testing;
- bug fixing;
- deployment preparation.

---

## Roadmap

- [x] User authentication.
- [x] Game Master and Player role separation.
- [x] Game Master dashboard.
- [x] Player dashboard.
- [x] Campaign creation.
- [x] Premade campaigns.
- [x] Character creation.
- [x] Image upload.
- [x] Functional inventory.
- [x] Campaign sessions.
- [x] Shared dice roll chat.
- [x] Rules pages.
- [x] Mobile interface.
- [ ] Final UI/UX review.
- [ ] Text and description adjustments.
- [ ] Final testing.
- [ ] Deployment.

---

## Notes

- The complete Voice Of Flower rulebook is still in development.
- Some rules and texts may change as the system evolves.
- The battle tab is currently marked as **In development**.
- The project was created as a practical tool to support real campaigns and also as a full stack portfolio project.

---

## Author

Developed by **Kauan Malvino Garcia**.

- GitHub: [malvino11-28](https://github.com/malvino11-28)
- LinkedIn: [Malvino Garcia](https://www.linkedin.com/in/malvino-garcia)
