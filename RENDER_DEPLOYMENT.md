# Render.com Deployment Guide for Pipeline Builder

## Backend Deployment (Node.js/Express API)

### Step 1: Create a Web Service on Render.com
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Use these settings:

**Service Settings:**
- **Name**: `pipeline-builder-api`
- **Environment**: `Node`
- **Build Command**: `cd backend && npm install`
- **Start Command**: `node backend/server.js`
- **Plan**: Free or Starter (free supports small projects)

**Environment Variables:**
```
NODE_ENV=production
PORT=5000
```

### Step 2: Configure CORS
The backend already has CORS configured for:
- `http://localhost:3000` (development)
- `https://pipeline-builder-zc3n.onrender.com` (production)

### Step 3: Get Your Backend URL
Once deployed, Render will provide a URL like:
`https://pipeline-builder-api.onrender.com` or `https://pipeline-builder-zc3n.onrender.com`

Update `frontend/src/submit.js` if needed:
```javascript
const API_BASE_URL = 'https://your-render-service-url.onrender.com';
```

---

## Frontend Deployment (React)

### Option A: Deploy on Render.com (Static Site)
1. Build the frontend: `cd frontend && npm run build`
2. In Render dashboard, create a "Static Site"
3. Set **Build Command**: `cd frontend && npm run build`
4. Set **Publish Directory**: `frontend/build`

### Option B: Deploy on GitHub Pages
Already configured in `.github/workflows/deploy-frontend.yml`

---

## Testing Deployment

1. Check backend health:
```bash
curl https://pipeline-builder-api.onrender.com/
```

Should return:
```json
{
  "status": "ok",
  "message": "Pipeline Builder API is running"
}
```

2. Test pipeline validation:
```bash
curl -X POST https://pipeline-builder-api.onrender.com/pipelines/parse \
  -H "Content-Type: application/json" \
  -d '{"nodes": [{"id": "1"}], "edges": []}'
```

---

## Troubleshooting

**Issue**: 503 Service Unavailable
- **Solution**: Render free tier may spin down. Wait 30 seconds and retry.

**Issue**: CORS errors
- **Check**: Ensure your frontend URL is in the CORS whitelist in `backend/server.js`

**Issue**: 404 on API call
- **Check**: Verify the API endpoint URL matches your Render service URL

**Issue**: Port binding error
- **Check**: Ensure `PORT` environment variable is set to 5000

---

## Local Development

**Backend:**
```bash
cd backend
npm install
npm start
# Runs on http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm install
npm start
# Runs on http://localhost:3000
```

Both will communicate locally with no CORS issues.
