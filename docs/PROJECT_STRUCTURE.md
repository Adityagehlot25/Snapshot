# Project Structure Guide

Complete visual and textual overview of the AI Photo Assistant project structure.

---

## 📁 Directory Tree

```
ai-photo-assistant/
│
├── 📁 backend/                             # FastAPI Backend Application
│   ├── 📁 app/
│   │   ├── 📄 __init__.py
│   │   ├── 📄 main.py                     # FastAPI app initialization, middleware
│   │   ├── 📁 routes/
│   │   │   ├── 📄 __init__.py
│   │   │   └── 📄 image.py                # POST /analyze-image endpoint
│   │   ├── 📁 services/
│   │   │   ├── 📄 __init__.py
│   │   │   └── 📄 image_service.py        # Image processing business logic
│   │   ├── 📁 models/                     # Pydantic models (expandable)
│   │   │   └── 📄 __init__.py
│   │   ├── 📁 utils/
│   │   │   ├── 📄 __init__.py
│   │   │   └── 📄 file_handler.py         # File operations utilities
│   │   └── 📁 __pycache__/                # (auto-generated, in .gitignore)
│   │
│   ├── 📁 uploads/                        # Uploaded & processed images
│   │   ├── .gitkeep                       # (ensures folder tracked)
│   │   └── image_*.jpg                    # Generated during runtime
│   │
│   ├── 🔧 run.py                          # Server entry point (python run.py)
│   ├── 📋 requirements.txt                # Python dependencies
│   ├── 📦 Procfile                        # Render deployment config
│   ├── 🔨 build.sh                        # Build automation script
│   ├── 🏗️ render.yaml                     # Infrastructure as Code (Render)
│   ├── 📝 .env.example                    # Environment variables template
│   └── venv/                              # Virtual environment (local only)
│
├── 📁 frontend/                            # React/Vite Frontend Application
│   ├── 📁 src/
│   │   ├── 📄 App.jsx                     # Main component, state management
│   │   ├── 📄 App.css                     # Global styles, grid layout
│   │   ├── 📄 api.js                      # Axios HTTP client
│   │   ├── 📄 index.css                   # Base styles
│   │   ├── 📄 main.jsx                    # React entry point
│   │   │
│   │   ├── 📁 components/
│   │   │   ├── 📄 UploadBox.jsx           # File upload handler
│   │   │   ├── 📄 UploadBox.css           # Upload styling
│   │   │   ├── 📄 ImagePreview.jsx        # Dual image display, canvas
│   │   │   ├── 📄 ImagePreview.css        # Image styling
│   │   │   ├── 📄 ControlPanel.jsx        # Adjustment sliders
│   │   │   ├── 📄 ControlPanel.css        # Control styling
│   │   │   ├── 📄 SuggestionsPanel.jsx    # Analysis results
│   │   │   └── 📄 SuggestionsPanel.css    # Suggestions styling
│   │   │
│   │   └── 📁 __tests__/                  # Unit tests (optional)
│   │       ├── App.test.jsx
│   │       └── components.test.jsx
│   │
│   ├── 📁 node_modules/                   # Dependencies (auto-generated)
│   ├── 📄 index.html                      # HTML entry point
│   ├── 🔧 vite.config.js                  # Vite build configuration
│   ├── ⚙️ eslint.config.js                # ESLint rules
│   ├── 📦 package.json                    # npm dependencies & scripts
│   ├── 📋 package-lock.json               # Dependency lock file
│   ├── 📝 .env.example                    # Environment variables template
│   ├── 📝 .gitignore                      # Git ignore patterns
│   └── 🎨 public/                         # Static assets (optional)
│       └── vite.svg
│
├── 📁 docs/                                # Documentation Hub
│   ├── 📄 API.md                          # Complete API reference
│   ├── 📄 DEVELOPMENT.md                  # Development guidelines
│   ├── 📄 TROUBLESHOOTING.md              # Common issues & fixes
│   └── 📄 PROJECT_STRUCTURE.md            # (this file)
│
├── 📁 uploads/                             # Root-level uploads (symlink optional)
│
├── 📝 README.md                           # Project overview & quick start
├── 📝 QUICK_DEPLOYMENT.md                 # 20-minute deployment guide
├── 📝 DEPLOYMENT_GUIDE.md                 # Detailed deployment steps
├── 📝 DEPLOYMENT_CHECKLIST.md             # Pre/post deployment tasks
├── 📝 PRODUCTION_DEPLOYMENT_SUMMARY.md    # Production changes summary
├── 📝 README_DEPLOYMENT.md                # Deployment completion summary
├── 📄 .gitignore                          # Git ignore rules
├── 🔗 .git/                               # Git repository (hidden)
└── 📚 LICENSE                             # MIT License (optional)
```

---

## 📊 File Statistics

| Category | Count | Notes |
|----------|-------|-------|
| **Python files** | 5 | Backend logic, entry point |
| **React components** | 4 | UploadBox, ImagePreview, ControlPanel, SuggestionsPanel |
| **CSS files** | 6 | Global + component-specific styles |
| **Config files** | 7 | Vite, ESLint, package.json, etc. |
| **Documentation** | 10 | Guides, API ref, troubleshooting |
| **Total routes** | 3 | GET /, POST /analyze-image, GET /uploads/{file} |
| **Total components** | 4 | All functional and tested |

---

## 📋 File Descriptions

### Backend (`backend/`)

| File | Purpose | Lines |
|------|---------|-------|
| `main.py` | FastAPI initialization, CORS, routing | ~50 |
| `routes/image.py` | Image analysis endpoint | ~20 |
| `services/image_service.py` | Image processing logic | ~150 |
| `utils/file_handler.py` | File utilities | ~50 |
| `run.py` | Server entry point | ~10 |
| `requirements.txt` | Python dependencies (7 packages) | ~7 |
| `Procfile` | Render deployment config | ~1 |
| `build.sh` | Build automation | ~10 |
| `render.yaml` | Infrastructure as Code | ~30 |
| `.env.example` | Environment template | ~5 |

**Total Backend Code:** ~340 lines of Python

### Frontend (`frontend/src/`)

| File | Purpose | Lines |
|------|---------|-------|
| `App.jsx` | Main component, state management | ~150 |
| `App.css` | Global styles, grid layout | ~200 |
| `api.js` | Axios client with environment vars | ~20 |
| `components/UploadBox.jsx` | Upload handler | ~80 |
| `components/ImagePreview.jsx` | Canvas + filters | ~200 |
| `components/ControlPanel.jsx` | Sliders | ~100 |
| `components/SuggestionsPanel.jsx` | Results display | ~60 |
| `index.css` | Base styles | ~30 |
| `main.jsx` | React entry point | ~5 |

**Total Frontend Code:** ~845 lines of React/CSS

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | npm scripts and dependencies |
| `vite.config.js` | Vite build tool configuration |
| `eslint.config.js` | Code linting rules |
| `.env.example` (both) | Environment variable templates |
| `tsconfig.json` | TypeScript config (if used) |

### Documentation Files

| File | Purpose | Audience |
|------|---------|----------|
| `README.md` | Project overview | Everyone |
| `API.md` | API reference | Developers |
| `DEVELOPMENT.md` | Dev guidelines | Contributors |
| `TROUBLESHOOTING.md` | Common issues | Users & Devs |
| `QUICK_DEPLOYMENT.md` | Fast deployment | DevOps |
| `DEPLOYMENT_GUIDE.md` | Detailed deployment | DevOps |
| `DEPLOYMENT_CHECKLIST.md` | Verification | DevOps |

---

## 🗂 Folder Organization Rationale

### Backend Folder Structure

```
backend/
├── app/                 # All application code
│   ├── routes/         # HTTP endpoints (scalable)
│   ├── services/       # Business logic (testable)
│   ├── models/         # Data structures (organized)
│   └── utils/          # Reusable functions (maintainable)
├── uploads/            # User data (runtime)
├── run.py              # Entry point (simple)
├── requirements.txt    # Dependencies (managed)
└── Procfile            # Deployment config (separate)
```

**Benefits:**
- Separation of concerns
- Easy to scale endpoints
- Business logic testable
- Clear dependency flow

### Frontend Folder Structure

```
frontend/src/
├── components/         # Reusable UI pieces
├── App.jsx            # Root component
├── api.js             # Data layer
└── *.css              # Styling
```

**Benefits:**
- Component-based architecture
- Co-located styles
- Easy to add new components
- Clear data flow

### Documentation Organization

```
docs/
├── API.md             # Technical reference
├── DEVELOPMENT.md     # How to contribute
└── TROUBLESHOOTING.md # Problem solving
```

**Benefits:**
- Comprehensive documentation
- Easy to find information
- Organized by use case
- Searchable content

---

## 🔄 Data Flow

```
User (Browser)
    ↓
    ├→ Upload File
    │  ↓
    └→ App.jsx (state: selectedFile)
       ↓
       ├→ UploadBox.jsx (handles file)
       │  ↓
       │  └→ api.js (POST /analyze-image)
       │     ↓
       │     ↓ (NETWORK)
       │     ↓
       Backend: routes/image.py
                  ↓
                  ├→ Validate file
                  │
                  ├→ services/image_service.py
                  │  ├→ Load image
                  │  ├→ Analyze metrics
                  │  ├→ Generate suggestions
                  │  └→ Enhance image
                  │
                  └→ Return JSON
                     ↓
       Response: analysisData
       ↓
       ├→ SuggestionsPanel.jsx (display analysis)
       │
       ├→ ImagePreview.jsx (show images)
       │  ├→ Apply CSS filters (brightness, contrast, etc.)
       │  └→ Apply pixel manipulation (temperature, tint, white balance)
       │
       └→ ControlPanel.jsx (adjustment bars)
          ↓
          └→ Update state (temperature, tint, etc.)
             ↓
             └→ Re-render ImagePreview with new values
```

---

## 📦 Dependencies

### Backend (Python)

```
fastapi==0.110.0           # Web framework
uvicorn==0.29.0            # ASGI server
python-multipart==0.0.9    # File uploads
pillow==10.2.0             # Image manipulation
opencv-python-headless==4.9.0.80  # Image analysis
numpy==1.26.4              # Numerical operations
aiofiles==23.2.1           # Async file I/O
```

**Total:** 7 packages | ~50MB installed

### Frontend (JavaScript)

```
react==19.2.4              # UI library
react-dom==19.2.4          # DOM rendering
axios==1.14.0              # HTTP client
vite==8.0+                 # Build tool (dev)
@vitejs/plugin-react==6.0.1  # React plugin (dev)
eslint==9.39.4             # Code linting (dev)
```

**Total:** 6 packages + devDeps | ~300MB node_modules

---

## 🚀 Deployment Structure

### Render (Backend)

```
Render.com
├── GitHub Repository (backend/ folder)
├── Environment: Python 3.11
├── Build Command: pip install -r requirements.txt
├── Start Command: (from Procfile)
│   web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
├── Environment Variables:
│   ├── ENVIRONMENT=production
│   ├── FRONTEND_URL=https://your-vercel-app.vercel.app
│   └── PORT=8080
└── Output: https://your-backend.onrender.com
```

### Vercel (Frontend)

```
Vercel.com
├── GitHub Repository (frontend/ folder)
├── Framework: Vite
├── Build Command: npm run build
├── Start Command: npm run preview
├── Environment Variables:
│   ├── VITE_BACKEND_URL=https://your-backend.onrender.com
├── Output Folder: dist/
└── Output: https://your-app.vercel.app
```

---

## 🔐 File Permissions & Security

| File/Folder | Permission | Reason |
|-----------|----------|--------|
| `backend/app/` | Read-only | Source code |
| `backend/uploads/` | Read/Write | User data |
| `frontend/src/` | Read-only | Source code |
| `frontend/node_modules/` | Read-only | Dependencies |
| `.env*` | Local only | Secrets (git-ignored) |
| `.gitignore` | Tracked | Security rules |

---

## 📈 Growth Path

### Phase 1 (Current - v1.0)
```
backend/app/
├── routes/image.py         (1 endpoint)
├── services/image_service.py (1 service)
└── utils/file_handler.py   (1 utility)
```

### Phase 2 (v1.1 - Authentication)
```
backend/app/
├── routes/
│   ├── image.py
│   ├── auth.py            (NEW)
│   └── user.py            (NEW)
├── services/
│   ├── image_service.py
│   ├── auth_service.py    (NEW)
│   └── user_service.py    (NEW)
├── models/
│   ├── user.py            (NEW)
│   └── auth.py            (NEW)
└── utils/
    ├── file_handler.py
    └── auth_handler.py    (NEW)
```

### Phase 3 (v2.0 - Advanced Features)
```
backend/app/
├── routes/               (5+ endpoints)
├── services/             (5+ services)
├── models/               (5+ models)
├── middleware/           (NEW)
├── database/             (NEW)
├── cache/                (NEW)
└── utils/                (10+ utilities)
```

---

## 🔍 Finding What You Need

### "I need to..."

| Task | File/Folder |
|------|-------------|
| Upload handling | `frontend/src/components/UploadBox.jsx` |
| API integration | `frontend/src/api.js` |
| Image manipulation | `frontend/src/components/ImagePreview.jsx` |
| Image analysis logic | `backend/app/services/image_service.py` |
| API endpoint | `backend/app/routes/image.py` |
| Deployment | `backend/Procfile` and `backend/render.yaml` |
| Styling | `frontend/src/App.css` |
| Dark mode | `frontend/src/App.css` (.dark-theme) |
| Documentation | `docs/` folder |
| Troubleshooting | `docs/TROUBLESHOOTING.md` |

---

## ✅ Project Completion Checklist

- [x] Backend API functional (3 endpoints)
- [x] Frontend UI complete (4 components)
- [x] Image processing working (7 filters)
- [x] Real-time adjustments active
- [x] File upload/download functional
- [x] CORS configured (dev & prod)
- [x] Environment variables set up
- [x] Deployment ready (Procfile, Render config)
- [x] Documentation complete (10 guides)
- [x] `.gitignore` configured
- [x] Project structure organized

---

## 📞 Quick References

**Start Backend:**
```bash
cd backend && venv\Scripts\activate && python run.py
```

**Start Frontend:**
```bash
cd frontend && npm run dev
```

**View API Docs:**
- Swagger: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

**Default Ports:**
- Backend: 8000
- Frontend: 5173

**Environment Files:**
- Backend: `backend/.env.example`
- Frontend: `frontend/.env.example`

---

**Last Updated:** March 31, 2026

**Related Documents:**
- [README.md](../README.md)
- [API.md](API.md)
- [DEVELOPMENT.md](DEVELOPMENT.md)
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
