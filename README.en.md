<p align="center">
  <a href="README.md">Português</a> | <b>English</b>
</p>

---

# Maiden Gate

> A web support platform for the original tabletop RPG system "Voice Of Flower: Awakening of Maiden", designed to centralize information, automate attribute calculations, and serve as a digital assistant for Game Masters and Players.

---

## About the Project

Maiden Gate was born to replace traditional RPG management methods, such as physical notes and scattered spreadsheets. The proposal is to eliminate excess paper at the table and optimize the flow of information, allowing the group to focus on narrative and immersion.

Although initially tailored for the VOF (Voice of Flower) system, the platform's core is being designed to be adaptable to other RPG systems.

---

## About the VOF System

**Voice Of Flower: Awakening of Maiden** is a proprietary tabletop RPG system currently being developed by me. It features original lore and mechanics, making this software an essential and tailor-made tool for dynamically testing and applying its rules.

---

## Planned Technologies and Services

The project's ecosystem was structured with modern technologies focused on performance, responsiveness, and scalability:

* **Frontend:** React, TypeScript, and Laravel (for route management and interface).
* **Styling:** Tailwind CSS combined with shadcn/ui components.
* **Backend and Database:** Laravel with PostgreSQL integrated into Supabase (managing secure authentication, relational database, and asset storage).
* **Hosting:** Planned for platforms like Vercel or Netlify.

---

## Main Features (Overview)

### Game Master (GM) Module
* **Bestiary and NPC Management:** Registration and control of creatures, bosses, and world characters.
* **Lore and Location Control:** Organization of cities, dungeons, factions, and historical events.
* **Campaign Monitoring:** Real-time visualization of connected players' sheets and status.
* **Visual Support:** Upload and display of reference maps and graphic materials.

### Player Module
* **Digital Sheets:** Guided character creation with choices of Marks and Subclasses.
* **Automation:** Automatic calculations of basic mechanical attributes (POD, DES, RES, INT, VON, PRE).
* **Status Manager:** Dynamic updates for HP, combat resources, inventory, and skill trees.
* **Bestiary and NPC Visualization:** Bestiary available for viewing according to the Master's permission.

---

## Status: In Development

The platform is in the early stages of specification and code development.

### Initial Roadmap:
- [ ] **Authentication:** Secure login system and differentiated access control (Master vs. Player) via Supabase.
- [ ] **Player Module:** Sheet creation, attribute distribution, and resource control (HP/Inventory).
- [ ] **GM Module:** Campaign control panel, NPC database, and table visualization tools.
- [ ] **Visual Support:** Module for quick availability of reference maps.
- [ ] **Customization:** Flexible parameters to adapt rules for other RPG settings.

---

## System Restrictions
* **Connectivity:** As a centralized web platform, it requires an active internet connection.
* **Responsiveness:** Full focus on mobile devices (smartphones and tablets), considering the frequent use of these screens during in-person sessions.
* **System Core:** The system is entirely focused on VOF regarding combat, powers, and lore. However, it can be adapted for any other RPG by a Dev. Instructions will be developed.
