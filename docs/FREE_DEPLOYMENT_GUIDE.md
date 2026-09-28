# 🌐 100% Free Cloud Deployment Guide for AccessAudit
## Complete Zero-Cost ($0.00 / month) Production Deployment
### S-06: Accessibility Audit & Inclusion Improvement Drive on Campus

> **Total Cost:** **$0.00 / month forever** (No credit card required)  
> **Author & Contributor:** **Vaibhav Tiwari**  
> **Target Cloud Stack:**
> - **Database:** **Neon.tech** (Serverless PostgreSQL 16 — 0.5 GB Free Tier)
> - **Backend API:** **Render.com** (Spring Boot 3.4.1 Java 21 Web Service — Free Tier)
> - **Frontend Web App:** **Vercel** (React 18 + Vite Global Edge CDN — Free Hobby Tier)

---

## 🏗️ Free Cloud Architecture Diagram

```
                                  ┌───────────────────────────────┐
                                  │      GLOBAL USERS / JUDGES    │
                                  └──────────────┬────────────────┘
                                                 │ HTTPS
                                                 ▼
                                  ┌───────────────────────────────┐
                                  │      VERCEL (FREE TIER)       │
                                  │  • React 18 + Vite SPA Build  │
                                  │  • Worldwide Edge CDN Cache   │
                                  │  • Free SSL / HTTPS           │
                                  │  • URL: accessaudit.vercel.app│
                                  └──────────────┬────────────────┘
                                                 │ API Calls (JSON / REST)
                                                 │ VITE_API_BASE_URL
                                                 ▼
                                  ┌───────────────────────────────┐
                                  │      RENDER (FREE TIER)       │
                                  │  • Spring Boot 3.4.1 (Java 21)│
                                  │  • Docker Container (Temurin) │
                                  │  • Memory-capped (384MB Max)  │
                                  │  • URL: *.onrender.com/api    │
                                  └──────────────┬────────────────┘
                                                 │ JDBC Connection Pooling
                                                 │ SSL Encrypted
                                                 ▼
                                  ┌───────────────────────────────┐
                                  │     NEON.TECH (FREE TIER)     │
                                  │  • Managed PostgreSQL 16      │
                                  │  • Auto-seeded on 1st boot    │
                                  │  • 29 Buildings & 12 Users    │
                                  └───────────────────────────────┘
```

---

## ⏱️ Quick Deployment Roadmap (Total Time: ~7 Minutes)

| Step | Platform | Component | Setup Time | Cost | Credit Card? |
|:---:|:---|:---|:---:|:---:|:---:|
| **Step 1** | [Neon.tech](https://neon.tech) | PostgreSQL 16 Database | 2 mins | **$0.00** | ❌ No |
| **Step 2** | [Render.com](https://render.com) | Spring Boot Java 21 API | 3 mins | **$0.00** | ❌ No |
| **Step 3** | [Vercel](https://vercel.com) | React 18 Vite Frontend | 2 mins | **$0.00** | ❌ No |

---

## 📦 Step 1: Create Free PostgreSQL Database on Neon (2 Mins)

[Neon](https://neon.tech) provides a high-performance, serverless PostgreSQL 16 database with an SSL endpoint for free without needing a credit card.

1. Go to [https://neon.tech](https://neon.tech) and click **"Sign In"** &rarr; **"Continue with GitHub"**.
2. Click **"Create Project"**:
   - **Project Name:** `accessaudit`
   - **Database Name:** `accessaudit`
   - **Region:** Choose closest to your users (e.g., `AWS us-east-2` or `AWS ap-southeast-1` Singapore).
   - **Postgres version:** `16`
3. Click **"Create Project"**.
4. In your project dashboard, find the **Connection Details** box:
   - Select **"Parameters only"** or inspect the **Connection string**.
   - You will see details like:
     - **Host:** `ep-your-db-name.us-east-2.aws.neon.tech`
     - **Database:** `accessaudit`
     - **User:** `alex` (or your username)
     - **Password:** `YourPassword123`
5. Note your **JDBC Connection URL**:
   ```
   jdbc:postgresql://<HOST>/accessaudit?sslmode=require
   ```
   *(Example: `jdbc:postgresql://ep-silent-sky-123456.us-east-2.aws.neon.tech/accessaudit?sslmode=require`)*

> [!NOTE]  
> You do **not** need to run any SQL scripts! The Spring Boot backend automatically creates all tables and seeds all 29 buildings, 12 users, checklists, and tasks on first startup.

---

## ⚙️ Step 2: Deploy Spring Boot Backend on Render (3 Mins)

[Render](https://render.com) offers free web service hosting for Docker containers with automatic HTTPS certificates.

1. Go to [https://render.com](https://render.com) and click **"Get Started for Free"** (Sign in with your GitHub account).
2. On your Render Dashboard, click the blue **"New +"** button at top right &rarr; select **"Web Service"**.
3. Select **"Build and deploy from a Git repository"** &rarr; click **Next**.
4. Connect and choose your repository: `VaibhavTiwari006/S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus`.
5. Configure the service settings:
   - **Name:** `accessaudit-backend` *(or any unique name you prefer)*
   - **Region:** Choose the region matching or close to your Neon database (e.g., *Oregon (US West)* or *Ohio (US East)*).
   - **Branch:** `main`
   - **Root Directory:** Leave empty (default root)
   - **Language / Runtime:** **Docker**
   - **Dockerfile Path:** `./backend/Dockerfile`
   - **Docker Context:** `./backend`
   - **Instance Type:** Select **Free ($0/month)**
6. Scroll down to **"Environment Variables"** and click **"Add Environment Variable"** to add these 4 keys:

| Key | Value | Notes |
|:---|:---|:---|
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://<YOUR-NEON-HOST>/accessaudit?sslmode=require` | From Step 1 |
| `SPRING_DATASOURCE_USERNAME` | `<YOUR-NEON-USER>` | From Step 1 |
| `SPRING_DATASOURCE_PASSWORD` | `<YOUR-NEON-PASSWORD>` | From Step 1 |
| `APP_JWT_SECRET` | `MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDE=` | Standard 256-bit secret |

7. Click **"Deploy Web Service"**.
8. Render will pull the repository, build the Java 21 image using the optimized multi-stage `backend/Dockerfile`, and start the app.
9. Once the logs display:
   ```
   Started AccessAuditApplication in X.XXX seconds
   ```
10. Copy your backend's public URL at the top of the Render page:  
    *(Example: `https://accessaudit-backend.onrender.com`)*
11. **Test your backend in your browser:**  
    Visit `https://accessaudit-backend.onrender.com/api/buildings`  
    You should see the JSON list of 29 audited campus buildings!

---

## 🎨 Step 3: Deploy React Frontend on Vercel (2 Mins)

[Vercel](https://vercel.com) provides the fastest, most reliable free hosting for React/Vite single-page applications with instant global CDN caching.

1. Go to [https://vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **"Add New..."** &rarr; select **"Project"**.
3. In the **"Import Git Repository"** list, find `S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus` and click **"Import"**.
4. In the Project Configuration screen:
   - **Project Name:** `accessaudit`
   - **Framework Preset:** `Vite` (Vercel automatically detects this)
   - **Root Directory:** Click **"Edit"**, select the `frontend` folder, and click **"Continue"**.
5. Expand the **"Environment Variables"** accordion section:
   - **Name:** `VITE_API_BASE_URL`
   - **Value:** `https://<YOUR-RENDER-BACKEND-NAME>.onrender.com/api`  
     *(Be sure to include `/api` at the end!)*
6. Click the blue **"Deploy"** button.
7. Vercel will install dependencies and compile the production build in ~45 seconds.
8. Click **"Go to Dashboard"** or click on the preview window to open your live production site!  
   *(Example: `https://accessaudit-six.vercel.app`)*

---

## 🎯 Alternative: 1-Click Render.com Blueprint (`render.yaml`)

If you prefer to host **both** the backend and frontend on Render inside a single dashboard:

1. Push the repository to GitHub.
2. In [Render Dashboard](https://dashboard.render.com), click **"New +"** &rarr; **"Blueprint"**.
3. Select this repository.
4. Render will read the root [`render.yaml`](../render.yaml) file and automatically declare:
   - Managed PostgreSQL database
   - Dockerized Spring Boot service
   - Static React site with routing rewrites
5. Click **"Apply"** and wait for automatic provisioning!

---

## 🔑 Live Site Evaluator Login Credentials

Once your site is live, you and the CUSoC evaluators can log in immediately using the pre-seeded credentials:

| Role | Email Address | Password | Evaluator Focus |
|:---|:---|:---|:---|
| **Administrator** | `admin@campus.edu` | `admin123` | Executive dashboard, analytics radar, building CRUD, audit approval |
| **Lead Auditor** | `auditor@campus.edu` | `auditor123` | **Vaibhav Tiwari** profile, 42-parameter audit checklist conductor |
| **Student / Staff** | `student@campus.edu` | `student123` | Barrier reporting with photo evidence, community upvoting, campus navigation |
| **Maintenance** | `maintenance@campus.edu` | `maintenance123` | 5-stage Kanban remediation board (`REPORTED` &rarr; `VERIFIED`) |

> [!TIP]  
> You can also use the **"⚡ Quick Role Switch"** button located in the top navigation bar or the floating pill in the bottom-right corner to instantly jump between roles without typing credentials!

---

## 💡 Keeping Free Render Containers Warm (Pro-Tip)

Render's free tier spins down backend services after 15 minutes of inactivity. When a new visitor accesses the app, the container takes ~30 to 45 seconds to "wake up" (cold start).

**To keep your backend fast and warm 24/7 at $0 cost:**
1. Go to [https://cron-job.org](https://cron-job.org) (100% free cron service).
2. Create a free account.
3. Click **"Create Cronjob"**:
   - **Title:** `Keep AccessAudit Warm`
   - **URL:** `https://<YOUR-RENDER-BACKEND>.onrender.com/api/buildings`
   - **Schedule:** Every 10 or 14 minutes.
4. Save the cron job! Your free backend will now stay warm 24/7 with zero cold starts during evaluations.

---

## 🛠️ Free Cloud Deployment Troubleshooting

### Issue 1: CORS Error in Browser Console
- **Symptom:** `Access to fetch at ... from origin 'https://accessaudit.vercel.app' has been blocked by CORS policy`
- **Solution:** Our `CorsConfig.java` has already been pre-configured to automatically allow all `*.vercel.app` and `*.onrender.com` origins. If you use a custom domain, simply ensure the backend has restarted with the latest Git commit.

### Issue 2: Direct Page Refresh Gives 404 on Vercel
- **Symptom:** Opening `https://yourapp.vercel.app/presentation` directly displays `404 Not Found`.
- **Solution:** The included `frontend/vercel.json` and `frontend/public/_redirects` route all subpaths back to `index.html`. Ensure the `frontend` folder was chosen as the **Root Directory** in Vercel.

### Issue 3: Backend Takes Time on First Request
- **Symptom:** The first API call takes 30 seconds to respond.
- **Explanation:** This is standard Render free-tier cold start behavior. Set up the free keep-alive cron job described above to eliminate cold starts.
