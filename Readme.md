# 🐦 X Feed Viewer - Social Feed Platform

A lightweight web platform built using **Twikit** that allows users to view public or friend-only feeds of other users, with full support for login, signup, and friend management.

---

## 🌟 Features

- 🔐 **Authentication**
  - User **Sign Up** and **Login**
  - Secure session management (basic auth)

- 📃 **Feed Privacy**
  - Users can set their feed to **Public** or **Friends Only**
  - Feeds are read-only and controlled by the user’s privacy settings

- 👥 **Friendship System**
  - **Friends List** – People *you* added
  - **Added By** – People who added *you*
  - **Global Feed** – Shows all public posts

- 🗃️ **Data Storage**
  - Backend powered by a **JSON-based database** (lightweight and easy to manage)

- 🧭 **Feed Sections**
  - `🌐 Global Feed` – Public posts by all users
  - `➕ Added By` – Feeds of users who added you
  - `👫 Friends` – Feeds of users you added as friends

---

## ⚙️ Tech Stack

- **Frontend**: HTML/CSS + Twikit components
- **Backend**: Node.js / Express.js (if applicable)
- **Database**: JSON file-based storage (acts as lightweight DB)
- **Authentication**: Basic session/login using JSON DB


---

## 🚀 Setup & Run Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/Mohit1423/X-feed-Viewer
   cd XView

2. **Start the Backend**

   cd x-server
   nodemon index.js/node index.js
