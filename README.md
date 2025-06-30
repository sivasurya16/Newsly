# Newsly – Newsletter Publisher and Viewer

[Live Demo](https://newsletter125.netlify.app/) | [GitHub Repository](https://github.com/sivasurya16/news_letter)

## Project Overview

**Newsly** is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application that allows users to publish and view newsletters.
It supports user authentication and the foundation for role-based access control has been set up in the backend. Currently, user roles must be assigned manually in the database. Frontend role management is a work in progress.

---

## Features

* User authentication with JWT
* Role-based access control setup (work in progress)
* Publishers can create, update, and delete newsletters
* Viewers can browse and read newsletters
* RESTful API integration
* Responsive design for all devices

---

## Tech Stack

* **Frontend:** React.js
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Atlas)
* **Authentication:** JSON Web Tokens (JWT)
* **Deployment:** Netlify

---

## Local Setup Instructions

### Prerequisites

* Node.js and npm installed
* MongoDB Atlas URI
* JWT Secret Key

---

### 1. Clone the Repository

```bash
git clone https://github.com/sivasurya16/news_letter.git
cd news_letter
```

---

### 2. Setup the Backend

In **Terminal 1:**

```bash
npm run install-server
npm run start-server
```

---

### 3. Setup the Frontend

In **Terminal 2:**

```bash
npm run install-client
npm run start-client
```

---

### 4. Configure Environment Variables

Create a file named `config.env` in the project root and add the following:

```ini
ATLAS_URI=<your_mongodb_atlas_uri>
PORT=5050
JWT_SECRET=<your_jwt_secret_key>
```

Create a file named `.env` in the client folder and add the following:

```ini
VITE_SERVER_URL=<your_backend_server_url>

Example:
VITE_SERVER_URL=http://localhost:5050/record/
```

---

## Notes

* MongoDB should be accessible through your provided `ATLAS_URI`.
* The frontend will run on `http://localhost:3000` and the backend on `http://localhost:5050`.
* Role-based access control is partially implemented. To set a user as a publisher, you currently need to update the user’s role directly in the database.

---

## Live Demo

[https://newsletter125.netlify.app/](https://newsletter125.netlify.app/)

---
