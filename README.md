<div align="center">

# 🚀 Shivanand Shukla — Portfolio
[![Live Site](https://img.shields.io/badge/Live-shivanandshukla.me-6c47ff?style=for-the-badge)](https://shivanandshukla.me)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#-license)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Live Links](#-live-links)
- [Tech Stack](#️-tech-stack)
- [Architecture](#-architecture)
- [Features](#-features)
- [Certifications](#-certifications)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Roadmap](#-roadmap)
- [Author](#-author)
- [License](#-license)

---

## 📖 Overview

This repository powers a personal portfolio ecosystem made of three independent apps that share one backend:

- **`frontend`** — the public-facing portfolio site visitors see
- **`dashboard`** — a private admin panel to manage all content on the portfolio
- **`backend`** — a single REST API that serves both, backed by MongoDB and Cloudinary

Content added or edited in the dashboard is reflected on the live portfolio in real time — no redeploy needed for content changes, only for code changes.

---

## 🌐 Live Links

| | URL |
|---|---|
| 🖥️ Portfolio | [shivanandshukla.me](https://shivanandshukla.me) |
| ⚙️ Admin Dashboard | [dashboard.shivanandshukla.me](https://dashboard.shivanandshukla.me) |

---

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="33%">

**Frontend**
- React.js + Vite
- Redux Toolkit
- Framer Motion
- SCSS Modules
- Axios

</td>
<td valign="top" width="33%">

**Backend**
- Node.js + Express.js
- MongoDB Atlas + Mongoose
- Cloudinary (media storage)
- JWT Authentication
- Nodemailer

</td>
<td valign="top" width="33%">

**Dashboard**
- React.js + Vite
- Redux Toolkit
- Axios
- React Router

</td>
</tr>
</table>

---

## 🏗️ Architecture

```
┌────────────────┐        ┌──────────────────┐        ┌──────────────────┐
│   Dashboard     │        │                  │        │   MongoDB Atlas  │
│  (Vercel)       │───────▶│                  │◀──────▶│   (users, etc.)  │
│  admin content  │        │  Express API     │        └──────────────────┘
└────────────────┘        │   (Render)       │
                            │                  │        ┌──────────────────┐
┌────────────────┐        │                  │───────▶│   Cloudinary      │
│   Frontend      │◀───────│                  │        │  (resume, images) │
│  (Vercel)       │        └──────────────────┘        └──────────────────┘
│  public site    │
└────────────────┘
```

Both `frontend` and `dashboard` talk to the same Express API over REST (`VITE_BACKEND_URL`). Uploaded files (resume, avatar, project images) are stored in Cloudinary; only their URLs live in MongoDB.

---

## ✨ Features

- 🏠 **Hero Section** — Fullscreen background with animated intro
- 👨‍💻 **About Section** — Bio with service cards
- 🏅 **Certifications** — Professional certifications with verify links
- 📁 **Projects** — Glassmorphism project cards
- 💡 **Skills** — Categorized skill grid with icons
- 🧵 **Timeline** — Education/experience history
- 📩 **Contact** — Message form with email notifications
- 🔐 **Admin Dashboard** — Manage projects, skills, timeline, messages, and profile (including resume/avatar upload) from one place

---

## 🏅 Certifications

- AWS Certified Solutions Architect – Associate
- AWS Certified AI Practitioner
- AWS Certified Cloud Practitioner
- CCNA: Introduction to Networks
- CCNA: Switching, Routing & Wireless Essentials
- CCNA: Enterprise Networking, Security & Automation
- Networking Essentials — Cisco · KIET University
- Data Analytics Essentials — Cisco
- Oracle Academy Certification
- Cybersecurity Foundation — Palo Alto Networks

---

## 📁 Project Structure

```
portfolio-shivanand/
├── backend/          # Node.js + Express REST API
│   ├── controllers/  # Route handlers (user, project, skill, etc.)
│   ├── models/       # Mongoose schemas
│   ├── routers/      # Express routers
│   └── server.js
├── frontend/         # Public React portfolio site
│   └── src/
│       ├── components/
│       └── redux/
└── dashboard/        # Private React admin dashboard
    └── src/
        ├── pages/
        └── redux/
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB Atlas cluster
- A Cloudinary account

### Backend
```bash
cd backend
npm install
# create a .env file — see Environment Variables below
npm run dev
```

### Frontend
```bash
cd frontend
npm install
# create a .env file — see Environment Variables below
npm run dev
```

### Dashboard
```bash
cd dashboard
npm install
# create a .env file — see Environment Variables below
npm run dev
```

---

## 🔑 Environment Variables

**`backend/.env`**
```env
PORT=8000
MONGO_URL=your_mongodb_url
MONGO_DB_ID=your_user_id
JWT_SECRET=secret
JWT_EXPIRES=7d
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=key
CLOUD_API_SECRET=secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_MAIL=your_email
SMTP_PASSWORD=your_app_password
PORTFOLIO_URL=http://localhost:5173
DASHBOARD_URL=http://localhost:3000
```

**`frontend/.env`** and **`dashboard/.env`**
```env
VITE_BACKEND_URL=https://your-backend-url.onrender.com/api/v1/
```

> ⚠️ **When setting this on Vercel/Netlify:** put `VITE_BACKEND_URL` in the **Key** field and only the URL in the **Value** field. Pasting `VITE_BACKEND_URL=https://...` into the Value field produces a malformed URL and every API call will 404. See [Troubleshooting](#-troubleshooting).

---

## 🚀 Deployment

| Part | Host |
|---|---|
| Backend | Render |
| Frontend | Vercel |
| Dashboard | Vercel |
| Database | MongoDB Atlas |
| File storage | Cloudinary |

- The backend runs on Render's free tier, which sleeps after ~15 minutes of inactivity and takes 30–50s to wake on the next request. A free [UptimeRobot](https://uptimerobot.com) monitor pinging the backend URL every 5 minutes keeps it warm.
- `getUser` in `frontend/src/redux/slices/userSlice.js` retries the portfolio fetch up to 3 times with backoff before falling back to placeholder data, to ride out any cold start.

---

## 🐛 Troubleshooting

**Symptom: the dashboard confirms an update, but the live site doesn't change.**

1. Open the live site → DevTools (`F12`) → **Console**, and check for failed requests.
2. **404s on a URL like** `.../VITE_BACKEND_URL=https:/...` → the `VITE_BACKEND_URL` env var was pasted incorrectly on the hosting platform (see [Environment Variables](#-environment-variables)).
3. **Request succeeds (200/304) but fields like `resume`, `githubURL`, `linkedInURL` are missing** → there's likely more than one document in the `users` collection on MongoDB Atlas. Only one should exist. `getPortfolioUser` fetches by `MONGO_DB_ID` (falling back to the only user in the collection if unset/invalid) — make sure `MONGO_DB_ID` on Render matches the `_id` of the complete document, or delete the stray duplicate.
4. Always hard refresh (`Ctrl+Shift+R`) after a fix — browsers and CDNs cache the previous JS bundle.

---

## 🗺️ Roadmap

- [ ] Blog section
- [ ] Dark/light theme toggle
- [ ] Analytics dashboard for visitor stats
- [ ] Automated Cloudinary cleanup for replaced files

---

## 👨‍💻 Author

**Shivanand Shukla**
- 📧 shivanand2124@gmail.com
- 📱 +91 8795503507
- 🐙 [GitHub](https://github.com/Shivanand8546)
- 💼 [LinkedIn](https://www.linkedin.com/in/shivnand21)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
