# MNX DIGITAL TEAM SOLUTIONS — Render Deployment Guide (with Cloud PostgreSQL Database)

This project is fully configured for 1-click zero-configuration deployment on **Render.com** with a **Managed Cloud PostgreSQL Database**.

---

### Step 1: Push Code to GitHub
1. Create a new repository on [github.com](https://github.com) named `mnx-digital-team-solutions`.
2. Push your project code to this GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "MNX DIGITAL TEAM SOLUTIONS with Cloud PostgreSQL support"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/mnx-digital-team-solutions.git
   git push -u origin main
   ```

---

### Step 2: Deploy on Render with 1-Click (Web + Cloud PostgreSQL Database)
1. Go to [render.com](https://render.com) and sign in using your **GitHub account**.
2. Click **New +** at the top right and select **Blueprint**.
3. Select your `mnx-digital-team-solutions` GitHub repository.
4. Render will read `render.yaml` and show:
   - **Service 1:** `mnx-database` (Free Managed Cloud PostgreSQL Database)
   - **Service 2:** `mnx-digital-team-solutions` (Web Service running Node.js + React)
   - **Environment Variables:** `DATABASE_URL` wired automatically!
5. Click **Apply Blueprint**!

Render will create your Cloud PostgreSQL database, build the website, and launch the server.
You will receive your live URL:
👉 `https://mnx-digital-team-solutions.onrender.com`

---

### Step 3: (Alternative) Using an Existing Database (Render, Supabase, or Neon)
If you already created a database on Render, Supabase, or Neon:
1. In your Render Dashboard, go to your Web Service ➔ **Environment**.
2. Add an environment variable:
   - **Key:** `DATABASE_URL`
   - **Value:** Your PostgreSQL connection string (e.g., `postgres://username:password@hostname/dbname`)
3. Click **Save Changes** — your app automatically connects to your external cloud database!

---

### Step 4: Connect Your Custom Domain (e.g. `mnx.com.ng` or `mnxdigital.com`)
1. In your Render Dashboard, click your web service ➔ **Settings** ➔ **Custom Domains**.
2. Click **Add Custom Domain** and enter your domain name.
3. Render will display the DNS records (CNAME / A records).
4. Paste those records into your domain registrar (e.g., Namecheap, Whogohost, or QServers).
5. Render automatically issues a **free SSL padlock (HTTPS 🔒)**.

---

### What Works Automatically:
- ✅ **Cloud PostgreSQL Database**: Client enquiries, messages, settings, and logs are persisted permanently in the cloud.
- ✅ **Public Website**: 8 business departments, educational updates, and project portfolio.
- ✅ **Admin Dashboard**: Full content management and analytics at `/admin` (User: `admin` · Passcode: `mnx2026`).
- ✅ **Automated Email Dispatch**: Enquiries are routed directly to `idrismohamed2521@gmail.com`.
- ✅ **Automated WhatsApp Dispatch**: Inquiries are sent directly to `+234 812 345 6789` without opening WhatsApp.
