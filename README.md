# AGRABO Deli Honey Sales Website

Stack:

- Frontend: Angular
- Backend: Node.js, Express, Sequelize
- Database: MySQL

## Project Structure

```text
frontend/agrabo-web
backend
```

## Local Development

### Database

Start XAMPP MySQL, then create the database in phpMyAdmin:

```sql
CREATE DATABASE agrabo_db;
```

### Backend

```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

API runs at:

```text
http://localhost:5000/api
```

Starter admin login:

```text
admin@agrabo.local
Admin@12345
```

### Frontend

```bash
cd frontend/agrabo-web
npm install
npm start
```

Angular runs at:

```text
http://localhost:4200
```

For phone testing on the same Wi-Fi:

```bash
npm start -- --host 0.0.0.0 --port 4201
```

## Production Hosting Plan

Recommended setup:

- Frontend: Vercel
- Backend: Railway
- Database: Railway MySQL
- Source control: GitHub

## Railway Backend

Create a Railway project with:

1. MySQL service
2. Backend service connected to this repository

Backend root directory:

```text
backend
```

Start command:

```bash
npm start
```

Required Railway variables:

```text
MYSQL_URL=<Railway MySQL connection URL>
JWT_SECRET=<long random secret>
WHATSAPP_NUMBER=256706506319
CLIENT_URLS=https://your-vercel-site.vercel.app
```

Railway will also provide database variables automatically for the MySQL service.

Health check:

```text
https://your-railway-backend.up.railway.app/api/health
```

## Vercel Frontend

Frontend root directory:

```text
frontend/agrabo-web
```

Build command:

```bash
npm run build
```

Output directory:

```text
dist/agrabo-web/browser
```

Before deploying frontend, update:

```text
frontend/agrabo-web/src/environments/environment.production.ts
```

Set:

```ts
apiUrl: 'https://your-railway-backend.up.railway.app/api'
```

The `vercel.json` file keeps Angular routes working after refresh.

## Deployment Order

1. Push project to GitHub.
2. Create Railway MySQL service.
3. Deploy backend from `backend`.
4. Copy Railway backend public URL.
5. Update `environment.production.ts` with the backend URL.
6. Deploy frontend from `frontend/agrabo-web` to Vercel.
7. Add the Vercel URL to Railway `CLIENT_URLS`.
8. Test public pages, forms, admin login, orders, bulk requests, and contact messages.
