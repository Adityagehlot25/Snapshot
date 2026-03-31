# 🚀 Production Deployment Guide

## Backend Deployment (Render)

### Step 1: Prepare Backend

1. **Install Render CLI (optional)**
   ```bash
   npm install -g render
   ```

2. **Ensure Procfile exists** ✅ (already created)
   ```bash
   web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```

3. **Ensure requirements.txt is up to date** ✅
   ```bash
   pip freeze > requirements.txt
   ```

### Step 2: Deploy to Render

1. Go to [render.com](https://render.com)
2. Create new **Web Service**
3. Connect GitHub repository
4. Configure:
   - **Name**: ai-photo-backend
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Region**: Choose closest to users

5. Add **Environment Variables**:
   ```
   ENVIRONMENT=production
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

6. Save & Deploy ✅

### Step 3: Get Backend URL
After deployment, Render provides:
- `https://your-backend.onrender.com`

---

## Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

1. **Update .env.local with production backend URL**
   ```bash
   VITE_BACKEND_URL=https://your-backend.onrender.com
   ```

2. **Test build locally**
   ```bash
   npm run build
   ```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Import Project**
3. Connect GitHub repository
4. Select the **frontend** folder
5. Configure:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. Add **Environment Variables**:
   ```
   VITE_BACKEND_URL=https://your-backend.onrender.com
   ```

7. Deploy ✅

### Step 3: Get Frontend URL
After deployment, Vercel provides:
- `https://your-frontend.vercel.app`

---

## Update Backend CORS (Final Step)

After getting Frontend URL, update Backend environment:

1. Go to Render Dashboard
2. Select your backend service
3. Edit **Environment**
4. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
5. Save & Redeploy ✅

---

## 📋 Environment Variables Reference

### Backend (.env on Render)
```
ENVIRONMENT=production
FRONTEND_URL=https://your-frontend.vercel.app
PORT=8000
```

### Frontend (.env on Vercel)
```
VITE_BACKEND_URL=https://your-backend.onrender.com
```

---

## ✅ Checklist

- [x] Main.py updated with environment variables
- [x] CORS configured for production
- [x] Static files mounted
- [x] requirements.txt complete
- [x] Procfile created
- [x] API endpoint uses environment variables
- [x] .env.example files created
- [x] build.sh script created
- [ ] Deploy backend to Render
- [ ] Get backend URL
- [ ] Deploy frontend to Vercel
- [ ] Update backend CORS with frontend URL
- [ ] Test end-to-end

---

## 🧪 Testing After Deployment

1. Visit frontend URL
2. Upload an image
3. Verify analysis works
4. Check network requests (Network tab in DevTools)
5. Ensure no CORS errors

---

## 📝 Troubleshooting

### CORS Error After Deployment
- Backend CORS not updated with production frontend URL
- Check backend environment variables
- Redeploy backend

### 404 on API Endpoints
- Check backend is running on Render
- Verify correct backend URL in frontend
- Check network requests in DevTools

### Upload Failures
- Ensure `/uploads` directory is writable on Render
- Check file permissions

---

## 🔗 Useful Links

- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
- [Vite Build](https://vitejs.dev/guide/build.html)

