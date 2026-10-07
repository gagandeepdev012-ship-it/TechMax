# TechMax
Needs Node 18.11+. Open two terminals:

**Terminal 1**
    cd server
    npm install
    npm run dev
**Terminal 2**
    cd client
    npm install
    npm run dev
Open http://localhost:5173

- Works with no database setup: `MONGO_URI=memory` in `server/.env` uses a temporary in-memory MongoDB (first start downloads it once; data resets on restart).
- Admin login: admin@techmax.com / Admin@123
- Real storage: set `MONGO_URI` to a local MongoDB or Atlas URI, then run `npm run seed` once.
- Deploy: server on Render/Railway with MONGO_URI, JWT_SECRET, CLIENT_URL; client with VITE_API_URL=https://your-api/api
