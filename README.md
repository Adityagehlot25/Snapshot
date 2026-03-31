# 📸 AI Photo Assistant - Image Analysis & Enhancement Platform

A full-stack web application that analyzes photo quality, provides intelligent enhancement suggestions, and applies real-time image adjustments. Built with FastAPI backend and React frontend with production-ready deployment configuration.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Python](https://img.shields.io/badge/python-3.9+-green.svg)
![React](https://img.shields.io/badge/react-19.2+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## 🎯 Features

### 🔍 Image Analysis
- **Visual Quality Metrics**: Brightness, contrast, sharpness, and color composition analysis
- **Intelligent Suggestions**: AI-powered recommendations for camera settings adjustment
- **Enhanced Output**: Automatic image enhancement based on detected quality issues
- **File Management**: Secure file upload and storage with validation

### 🎨 Real-Time Adjustments
- **Brightness & Contrast**: Fine-tune image luminance and dynamic range
- **Saturation**: Control color intensity and vibrancy
- **Temperature**: Adjust warm/cool tone balance
- **Tint**: Modify color cast and hue
- **White Balance**: Preset options (neutral, warmer, cooler)
- **Live Preview**: Instant visual feedback on canvas

### 📱 User Interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dual Image View**: Side-by-side comparison of original and enhanced images
- **Download Feature**: Export edited images in high-quality JPEG format
- **Dark/Light Theme Support**: Easy on the eyes in any lighting condition

### 🚀 Production Ready
- **Environment-Based Configuration**: Development and production modes
- **CORS Handling**: Secure cross-origin requests
- **Static File Serving**: Efficient upload and retrieval
- **Docker Support**: Ready for containerized deployment
- **Deployment Guides**: Step-by-step instructions for Render & Vercel

---

## 🛠 Technology Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **FastAPI** | 0.110.0 | Async web framework with automatic API documentation |
| **Uvicorn** | 0.29.0 | Production ASGI server |
| **Python** | 3.9+ | Programming language |
| **OpenCV** | 4.9.0 | Image processing and analysis |
| **NumPy** | 1.26.4 | Numerical computations |
| **Pillow** | 10.2.0 | Image manipulation |
| **aiofiles** | 23.2.1 | Async file operations |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2.4 | UI component library |
| **Vite** | 8.0+ | Fast build tool and dev server |
| **Axios** | 1.14.0 | HTTP client |
| **CSS3** | Latest | Styling and layout |

### Deployment
| Platform | Purpose |
|----------|---------|
| **Render** | Backend hosting with free tier |
| **Vercel** | Frontend hosting optimized for React |
| **GitHub** | Version control and CI/CD |

---

## 📁 Project Structure

```
ai-photo-assistant/
├── backend/                          # FastAPI application
│   ├── app/
│   │   ├── main.py                  # FastAPI app initialization, CORS, routing
│   │   ├── routes/
│   │   │   └── image.py             # Image analysis endpoint
│   │   ├── services/
│   │   │   └── image_service.py     # Image processing business logic
│   │   ├── models/                  # Data models (if needed)
│   │   └── utils/
│   │       └── file_handler.py      # File operations utilities
│   ├── uploads/                      # Temporary file storage (auto-created)
│   ├── run.py                       # Server entry point
│   ├── requirements.txt              # Python dependencies
│   ├── Procfile                     # Render deployment config
│   ├── build.sh                     # Build script
│   ├── render.yaml                  # Infrastructure as Code
│   └── .env.example                 # Environment variables template
│
├── frontend/                         # React application
│   ├── src/
│   │   ├── App.jsx                  # Main component with state management
│   │   ├── App.css                  # Styling (grid layout)
│   │   ├── api.js                   # Axios client with env variables
│   │   ├── components/
│   │   │   ├── UploadBox.jsx        # File upload handler
│   │   │   ├── ImagePreview.jsx     # Dual image display with canvas
│   │   │   ├── SuggestionsPanel.jsx # Analysis results display
│   │   │   └── ControlPanel.jsx     # Adjustment sliders
│   │   └── index.css                # Global styles
│   ├── index.html                   # Entry point
│   ├── vite.config.js               # Build configuration
│   ├── package.json                 # npm dependencies
│   ├── .env.example                 # Environment variables template
│   └── eslint.config.js             # Linting rules
│
├── docs/                            # Documentation (optional)
│   ├── API.md                       # API reference
│   ├── DEVELOPMENT.md               # Development guide
│   └── TROUBLESHOOTING.md           # Common issues and fixes
│
├── README.md                        # This file
├── QUICK_DEPLOYMENT.md              # Fast deployment guide (20 min)
├── DEPLOYMENT_GUIDE.md              # Detailed deployment instructions
├── DEPLOYMENT_CHECKLIST.md          # Pre/during/post deployment tasks
├── PRODUCTION_DEPLOYMENT_SUMMARY.md # What was changed for production
└── .gitignore                       # Git ignore patterns
```

---

## 📋 Prerequisites

### System Requirements
- **Node.js**: 16.x or higher (for frontend)
- **Python**: 3.9 or higher (for backend)
- **Git**: Latest version
- **OS**: Windows, macOS, or Linux

### Development Tools
- **VS Code** or preferred IDE
- **Git CLI**
- **npm** or **yarn** (comes with Node.js)

### Optional
- **Docker**: For containerized development
- **Postman**: For API testing

---

## 🚀 Quick Start

### 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd ai-photo-assistant
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create uploads directory
mkdir uploads

# Run server
python run.py
```

**Server runs at:** `http://localhost:8000`
**API Docs:** `http://localhost:8000/docs`

### 3️⃣ Frontend Setup

```bash
# Navigate to frontend directory (new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Application runs at:** `http://localhost:5173`

### 4️⃣ Access Application

Open browser and navigate to: **http://localhost:5173**

1. Upload an image
2. Wait for analysis results
3. Adjust sliders in real-time
4. Download enhanced image

---

## 🔌 API Documentation

### Base URL
- **Development**: `http://localhost:8000`
- **Production**: `https://your-backend.onrender.com`

### Endpoints

#### POST `/analyze-image`
Analyzes uploaded image and returns metrics, suggestions, and enhanced version.

**Request:**
```bash
curl -X POST http://localhost:8000/analyze-image \
  -F "file=@image.jpg"
```

**Request Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| file | File | Yes | JPEG/PNG image file |

**Response:**
```json
{
  "status": "success",
  "filename": "image_1234567890.jpg",
  "metrics": {
    "brightness": 0.65,
    "contrast": 0.72,
    "sharpness": 0.88,
    "color_saturation": 0.54
  },
  "suggestions": [
    "Consider increasing saturation for more vibrant colors",
    "Good contrast levels detected",
    "Image is well-lit and properly exposed"
  ],
  "enhanced_image": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

#### GET `/`
Health check endpoint.

**Response:**
```json
{
  "message": "API is running",
  "environment": "development"
}
```

#### GET `/uploads/{filename}`
Retrieve uploaded or processed images.

**Example:**
```
http://localhost:8000/uploads/image_1234567890.jpg
```

---

## 🎨 Frontend Components

### App.jsx
**Responsibility:** Main application component
- State management for all adjustments
- File upload orchestration
- Component composition and layout
- Real-time state propagation

**Key States:**
```javascript
const [selectedFile, setSelectedFile] = useState(null);
const [analysisData, setAnalysisData] = useState(null);
const [brightness, setBrightness] = useState(0);
const [contrast, setContrast] = useState(0);
const [saturation, setSaturation] = useState(0);
const [temperature, setTemperature] = useState(0);
const [tint, setTint] = useState(0);
const [whiteBalance, setWhiteBalance] = useState('neutral');
```

### ImagePreview.jsx
**Responsibility:** Display and manipulate images
- Render original image
- Apply CSS filters (brightness, contrast, saturation)
- Apply pixel-level adjustments (temperature, tint, white balance)
- Download functionality

### ControlPanel.jsx
**Responsibility:** User adjustment controls
- Brightness slider (-50 to +50)
- Contrast slider (-50 to +50)
- Saturation slider (-50 to +50)
- Temperature slider (-50 to +50)
- Tint slider (-50 to +50)
- White balance dropdown (neutral, warmer, cooler)

### SuggestionsPanel.jsx
**Responsibility:** Display analysis results
- Show metrics from backend analysis
- Display AI suggestions
- Provide visual feedback

### UploadBox.jsx
**Responsibility:** File upload handling
- Drag-and-drop support
- File validation
- Loading state management
- Error handling

---

## 📝 Environment Variables

### Backend (.env)
```env
# Server configuration
ENVIRONMENT=development        # 'development' or 'production'
PORT=8000                      # Server port
FRONTEND_URL=http://localhost:5173  # Frontend URL (production)

# Production only
RENDER_EXTERNAL_URL=https://your-backend.onrender.com
```

### Frontend (.env)
```env
VITE_BACKEND_URL=http://localhost:8000
```

---

## 🧪 Development

### Running Tests
```bash
# Backend (if tests exist)
cd backend
pytest

# Frontend linting
cd frontend
npm run lint
```

### Code Style
- **Python**: Follow PEP 8 style guide
- **JavaScript**: Use ESLint configuration provided
- **CSS**: Use consistent spacing and naming conventions

### Hot Reload
- **Backend**: FastAPI auto-reloads on file changes
- **Frontend**: Vite hot module replacement (HMR) for instant updates

---

## 🐳 Docker (Optional)

### Build Docker Images

**Backend:**
```bash
cd backend
docker build -t ai-photo-backend .
docker run -p 8000:8000 ai-photo-backend
```

**Frontend:**
```bash
cd frontend
docker build -t ai-photo-frontend .
docker run -p 5173:5173 ai-photo-frontend
```

### Docker Compose
```bash
docker-compose up
```

---

## 🚀 Deployment

### Quick Deployment (20 minutes)
See **[QUICK_DEPLOYMENT.md](QUICK_DEPLOYMENT.md)** for fast-track instructions.

### Detailed Deployment Guide
See **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** for comprehensive step-by-step guide.

### Pre-Deployment Checklist
See **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** for verification tasks.

### Deployment Targets

#### Render (Backend)
1. Create account at [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Set environment variables
5. Deploy with Procfile

**Deployment Time:** ~5 minutes

#### Vercel (Frontend)
1. Create account at [vercel.com](https://vercel.com)
2. Import Project
3. Select frontend folder
4. Set environment variables
5. Deploy

**Deployment Time:** ~5 minutes

---

## 🐛 Troubleshooting

### Common Issues

#### CORS Error: "Access Blocked by CORS Policy"
**Solution:** Check that backend is running and CORS is configured correctly in `app/main.py`
```bash
# Verify backend is running
curl http://localhost:8000/

# Check CORS configuration
python -c "from app.main import app; print(app.middleware)" 
```

#### Module Import Error: "ModuleNotFoundError"
**Solution:** Ensure virtual environment is activated and dependencies installed
```bash
# Reactivate virtual environment
venv\Scripts\activate

# Reinstall dependencies
pip install -r requirements.txt
```

#### Port Already in Use
**Solution:** Use different port or kill existing process
```bash
# On Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# On macOS/Linux
lsof -i :8000
kill -9 <PID>
```

#### Vite Build Error: "Missing Dependencies"
**Solution:** Clean install and rebuild
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Images Not Displaying
**Solution:** Ensure uploads directory exists and CORS allows image access
```bash
# Create uploads directory
mkdir backend/uploads

# Restart backend
python run.py
```

### Getting Help

1. **Check Documentation**
   - Read [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
   - Read [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) (if exists)

2. **View Logs**
   - Frontend: Open browser DevTools (F12)
   - Backend: Check terminal output

3. **Community Resources**
   - [FastAPI Docs](https://fastapi.tiangolo.com)
   - [React Docs](https://react.dev)
   - [Vite Docs](https://vitejs.dev)

---

## 📊 Performance Tips

### Backend Optimization
- Use `opencv-python-headless` (no GUI overhead)
- Cache image analysis results
- Implement request rate limiting
- Use async file operations

### Frontend Optimization
- Lazy load images
- Use canvas for real-time adjustments
- Minify production builds
- Enable service workers for offline support

### General
- Monitor server resource usage
- Implement request logging
- Use CDN for static files
- Enable HTTP/2 and gzip compression

---

## 🔒 Security Considerations

### File Upload
- ✅ Validate file types and sizes
- ✅ Sanitize filenames
- ✅ Store uploads outside web root
- ✅ Implement rate limiting

### API Security
- ✅ Use HTTPS in production
- ✅ Implement CORS properly
- ✅ Validate all input data
- ✅ Use environment variables for secrets

### Data Privacy
- ✅ Clear uploaded files periodically
- ✅ Implement data retention policies
- ✅ Use secure communication (HTTPS/WSS)
- ✅ Never log sensitive information

---

## 📜 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 🤝 Contributing

We welcome contributions! Here's how to help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation
- Ensure all tests pass

---

## 📞 Support & Contact

### Resources
- **GitHub Issues**: Report bugs and request features
- **Discussions**: Ask questions and share ideas
- **Documentation**: Check docs/ folder for guides

### Documentation Files
| File | Purpose |
|------|---------|
| [QUICK_DEPLOYMENT.md](QUICK_DEPLOYMENT.md) | 20-minute deployment guide |
| [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) | Detailed deployment instructions |
| [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) | Pre/post deployment verification |
| [PRODUCTION_DEPLOYMENT_SUMMARY.md](PRODUCTION_DEPLOYMENT_SUMMARY.md) | Production configuration details |

---

## 🎉 Acknowledgments

- **FastAPI** - For the amazing async web framework
- **React** - For modern UI development
- **OpenCV** - For powerful image processing
- **Render & Vercel** - For excellent deployment platforms

---

## 📈 Roadmap

### v1.1 (Coming Soon)
- [ ] User authentication and profiles
- [ ] Image history and favorites
- [ ] Batch image processing
- [ ] Advanced filters and effects

### v2.0 (Planned)
- [ ] Mobile app (React Native)
- [ ] AI-powered object detection
- [ ] Real-time collaboration
- [ ] Custom preset library

---

## 🔄 Version History

### v1.0.0 (Current)
- ✅ Image analysis and enhancement
- ✅ Real-time image adjustments
- ✅ Production deployment ready
- ✅ Comprehensive documentation

---

**Built with ❤️ by the Development Team**

---

## Quick Links

- 🌐 [Live Demo](#) (when deployed)
- 📖 [API Documentation](http://localhost:8000/docs)
- 🐦 [Twitter](#) | 💼 [LinkedIn](#) | 📧 [Email](mailto:support@example.com)
- 🐛 [Report Issue](#) | 💡 [Request Feature](#)

---

**Last Updated:** March 31, 2026 | **Status:** Production Ready ✅
