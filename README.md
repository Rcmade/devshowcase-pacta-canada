# 🚀 Project Setup Guide

This guide will help you run the project locally with just a few steps.  
**Note:** This project and its resources will only be available for **5 days** from creation.

---

## ✅ Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or later recommended): [Download Node.js](https://nodejs.org)
- **pnpm**: will be automatically installed via the setup script
- **Git**: for cloning the repository
- A modern browser like **Chrome** or **Firefox**

---

## ⚙️ Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Rcmade/devshowcase-pacta-canada
   cd devshowcase-pacta-canada
   ```

2. **Run the setup script:**

   This will install `pnpm`, install dependencies, and create your `.env` file from the example template.

   ```bash
   npm run project-setup
   ```

   > 📎 If the above command fails, install `pnpm` globally first:
   >
   > ```bash
   > npm install -g pnpm
   > # Then run
   > pnpm i
   > ```

3. **Update environment variables:**

   Open the `.env` file and fill in any required environment variables. Default values are provided in `.env.example`.

---

## 🧪 Run the App Locally

To start the development server:

```bash
pnpm dev
```

Then open:

```bash
http://localhost:3000
```

The app should now be running!

---

## 🗒️ Notes

- This project and its related services are **temporary** and will be removed after **5 days**.
- For any issues, ensure your Node.js version is compatible and you are using the correct `.env` values.
- For API routes or client-server communication, make sure backend services (if any) are also up and running.

---
