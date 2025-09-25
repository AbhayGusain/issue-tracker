# 🐛 Issue Tracker

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)

A modern, full-stack Issue Tracker application built with **FastAPI** backend and **Angular** frontend. This project demonstrates professional-level development practices with comprehensive CRUD operations, advanced filtering, and responsive design.

## ✨ Features

- 📋 **Complete Issue Management**: Create, view, edit, and track issues with full lifecycle support
- 🔍 **Advanced Search & Filtering**: Real-time search by title with multi-criteria filtering (status, priority, assignee)
- 📊 **Dynamic Sorting**: Sort by any column with ascending/descending options
- 📄 **Smart Pagination**: Navigate through large datasets with customizable page sizes (5, 10, 20, 50)
- 🎯 **Detailed Issue View**: Comprehensive issue details with full JSON representation
- 🔄 **Real-time Updates**: Hot-reload development environment with instant feedback
- 🎨 **Responsive UI**: Clean, modern interface that works on all devices
- 🚀 **RESTful API**: Well-documented API with automatic OpenAPI/Swagger documentation

## 🛠️ Tech Stack

### Backend
- **[FastAPI](https://fastapi.tiangolo.com/)** - Modern, high-performance web framework for building APIs
- **[Python 3.13](https://python.org/)** - Latest Python with enhanced performance and features
- **[Pydantic v2](https://docs.pydantic.dev/)** - Data validation and serialization using Python type hints
- **[Uvicorn](https://www.uvicorn.org/)** - Lightning-fast ASGI web server implementation

### Frontend
- **[Angular 20](https://angular.io/)** - Latest Angular with standalone components and modern features
- **[TypeScript 5.9](https://typescriptlang.org/)** - Strongly typed JavaScript with latest language features
- **[RxJS 7](https://rxjs.dev/)** - Reactive programming library for handling asynchronous operations
- **[Angular CLI](https://cli.angular.io/)** - Powerful command-line interface for Angular development

### Development Tools
- **Git** - Version control system
- **npm** - Package manager for JavaScript
- **pip** - Package installer for Python
- **VS Code** - Recommended IDE with excellent TypeScript/Python support

## Project Structure

```
issue-tracker/
├── backend/
│   ├── main.py              # FastAPI application entry point
│   ├── schemas.py           # Pydantic models
│   ├── store.py             # Data storage logic
│   ├── requirements.txt     # Python dependencies
│   └── data.json           # JSON data storage
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/  # Angular components
│   │   │   ├── models/      # TypeScript interfaces
│   │   │   └── services/    # API services
│   │   └── ...
│   ├── package.json         # Node.js dependencies
│   └── angular.json         # Angular configuration
└── README.md
```

## 🔌 API Endpoints

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `GET` | `/health` | Health check endpoint | None |
| `GET` | `/issues` | List issues with advanced filtering | `q`, `status`, `priority`, `assignee`, `sortBy`, `sortOrder`, `page`, `pageSize` |
| `GET` | `/issues/{id}` | Get single issue by ID | `id` (path parameter) |
| `POST` | `/issues` | Create new issue | Request body with issue data |
| `PUT` | `/issues/{id}` | Update existing issue | `id` (path parameter) + request body |

### 📝 Issue Data Model
```json
{
  "id": 1,
  "title": "Bug: Login fails on Safari",
  "description": "Users on Safari 17 cannot login due to CORS preflight error.",
  "status": "open",
  "priority": "high",
  "assignee": "alice",
  "createdAt": "2025-09-25T12:00:00Z",
  "updatedAt": "2025-09-25T12:00:00Z"
}
```

## 🚀 Quick Start

### 📋 Prerequisites
- **Python 3.13+** - [Download here](https://python.org/downloads/)
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Angular CLI** - Install globally with `npm install -g @angular/cli`
- **Git** - [Download here](https://git-scm.com/)

### ⚡ One-Command Setup
```bash
# Clone the repository
git clone https://github.com/AbhayGusain/issue-tracker.git
cd issue-tracker

# Setup backend (in one terminal)
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload

# Setup frontend (in another terminal)
cd frontend
npm install
ng serve
```

🎉 **That's it!** Your application will be running at:
- **Frontend**: http://localhost:4200
- **Backend API**: http://127.0.0.1:8000
- **API Documentation**: http://127.0.0.1:8000/docs

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv .venv
```

3. Activate virtual environment:
```bash
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Start the server:
```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Backend will be available at: http://127.0.0.1:8000
API Documentation: http://127.0.0.1:8000/docs

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
ng serve
```

Frontend will be available at: http://localhost:4200

### 🎯 Sample Data

The application starts with three sample issues to demonstrate different states:
- **🐛 Bug Report**: High priority, open status - "Login fails on Safari"
- **✨ Feature Request**: Medium priority, in progress - "Add dark mode"
- **📚 Documentation**: Low priority, completed - "Update README with API usage"

## 🤝 Contributing

contributions are welcomed! Here's how you can help:

1. **🍴 Fork the repository**
2. **🌿 Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **💻 Make your changes** and test thoroughly
4. **📝 Commit your changes**: `git commit -m 'Add amazing feature'`
5. **🚀 Push to your branch**: `git push origin feature/amazing-feature`
6. **🔄 Submit a Pull Request**

### 📋 Development Guidelines
- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 🌐 Deployment Options

### Backend Deployment
| Platform | Difficulty | Cost | Notes |
|----------|------------|------|-------|
| **[Railway](https://railway.app/)** | Easy | Free tier | Auto-detects Python, great for beginners |
| **[Render](https://render.com/)** | Easy | Free tier | Simple setup, good documentation |
| **[Heroku](https://heroku.com/)** | Medium | Free tier limited | Classic choice, more configuration |
| **[DigitalOcean](https://digitalocean.com/)** | Advanced | Paid | Full control, requires server management |

### Frontend Deployment
| Platform | Difficulty | Cost | Notes |
|----------|------------|------|-------|
| **[Netlify](https://netlify.com/)** | Easy | Free | Best for static sites, great CI/CD |
| **[Vercel](https://vercel.com/)** | Easy | Free | Optimized for frameworks, excellent performance |
| **[GitHub Pages](https://pages.github.com/)** | Easy | Free | Simple GitHub integration |
| **[Firebase Hosting](https://firebase.google.com/)** | Medium | Free tier | Google's platform, good for scaling |

## 📊 Project Statistics

- **Lines of Code**: ~1,200+
- **Files**: 25+
- **Technologies**: 8 major technologies
- **API Endpoints**: 5 RESTful endpoints
- **Features**: 15+ user-facing features

## 🎯 Learning Outcomes

This project demonstrates:
- ✅ **Full-Stack Development** with modern technologies
- ✅ **RESTful API Design** with proper HTTP methods
- ✅ **Database Operations** with CRUD functionality
- ✅ **Frontend State Management** with reactive programming
- ✅ **Type Safety** with TypeScript and Pydantic
- ✅ **Component Architecture** with Angular standalone components
- ✅ **Code Organization** with separation of concerns
- ✅ **Error Handling** and user experience considerations

## 📄 License

This project is open source and available under the **MIT License**.

---

<div align="center">

**Built with ❤️ using FastAPI and Angular**

[⭐ Star this repo](https://github.com/AbhayGusain/issue-tracker) if you found it helpful!

</div>