# Trackout

A fullstack fitness tracking web app to log workouts, track progress, and manage your fitness journey.

---

## Tech Stack

| Layer    | Tech                                |
|----------|-------------------------------------|
| Frontend | React, TailwindCSS, Motion, Zustand |
| Backend  | Node.js, Express, Zod(validation)   |
| Database | MongoDB (Mongoose)                  |
| Storage  | Cloudinary (avatar uploads)         |
| Auth     | JWT + Refresh Tokens                |

---

## Project Structure

```
trackout/
├── client/     # React frontend
└── server/     # Express backend
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB connection string
- Cloudinary account

### Backend

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=8000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NODE_ENV=development
```

```bash
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## Scripts

```bash
# Backend
npm run dev     # Development with nodemon
npm start       # Production

# Frontend
npm run dev     # Development
npm run build   # Production build
```

---

## Environment Variables

Never commit `.env`. A `.env.example` should be used as reference.

---

## License

MIT
