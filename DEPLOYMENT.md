# Spiritual AI Deployment Guide

## 🚀 Quick Deploy to Vercel (Frontend) + Railway (Backend)

### Step 1: Deploy Backend to Railway

1. **Go to [Railway.app](https://railway.app)** and sign up/login
2. **Create new project** → "Deploy from GitHub repo"
3. **Connect your GitHub** → Select `Spiritual-AI` repository
4. **Configure environment variables:**
   ```
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
   MODEL_NAME=openai/gpt-oss-20b:free
   EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
   TOP_K=5
   ```
5. **Deploy** → Railway will automatically detect Python and install dependencies

Your backend will be live at: `https://your-project-name.up.railway.app`

### Step 2: Deploy Frontend to Vercel

1. **Go to [Vercel.com](https://vercel.com)** and sign up/login
2. **Import project** → Connect GitHub → Select `Spiritual-AI`
3. **Configure build settings:**
   - **Root Directory:** `FRONTEND`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
4. **Add environment variable:**
   ```
   NEXT_PUBLIC_API_URL=https://your-railway-backend-url.up.railway.app
   ```
5. **Deploy**

Your frontend will be live at: `https://spiritual-ai.vercel.app`

### Step 3: Update Frontend API Calls

The frontend needs to call your deployed backend instead of localhost.

## 🔧 Manual Deployment Options

### Alternative Backend Deployments:
- **Render**: Free tier, easy setup
- **Heroku**: Classic choice, has free tier
- **DigitalOcean App Platform**: Good performance

### Alternative Frontend Deployments:
- **Netlify**: Great for static sites
- **GitHub Pages**: Free, but requires build setup
- **Firebase Hosting**: Google's hosting service

## 📋 Environment Variables Needed

**Backend (.env):**
```
OPENROUTER_API_KEY=your_key_here
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
MODEL_NAME=openai/gpt-oss-20b:free
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
TOP_K=5
```

**Frontend:**
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

## 🛠️ Local Testing Before Deploy

Test your backend:
```bash
cd BACKEND
python run.py
# Should run on http://localhost:8000
```

Test your frontend:
```bash
cd FRONTEND
npm run dev
# Should run on http://localhost:3000
```

## 📞 Need Help?

If you run into issues:
1. Check Railway/Render logs for backend errors
2. Check Vercel deployment logs for frontend errors
3. Make sure environment variables are set correctly
4. Verify your GitHub repo has all the files