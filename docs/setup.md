# Setup Guide

## Frontend Setup
```bash
cd frontend
npm install
npm run dev    # Runs on http://localhost:3000
```

## Backend Setup  
```bash
cd backend
npm install
npm run start:dev    # Runs on http://localhost:3001
```

## Environment Variables

**Frontend (.env.local):**
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Backend (.env):**
```
MONGODB_URI=mongodb://localhost:27017/marketplace
PORT=3001
```

## Project Structure
- `frontend/pages/` - Next.js pages
- `frontend/components/` - React components  
- `backend/src/` - Nest.js modules
- `docs/` - Documentation