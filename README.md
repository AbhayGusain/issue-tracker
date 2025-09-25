# Issue Tracker

A full-stack Issue Tracker application built with Python FastAPI backend and Angular frontend.

## Features

- 📋 **Issues Management**: Create, view, edit, and manage issues
- 🔍 **Search & Filter**: Search by title, filter by status, priority, and assignee
- 📊 **Sorting**: Sort by any column (id, title, status, priority, assignee, dates)
- 📄 **Pagination**: Navigate through issues with customizable page sizes
- 🎯 **Detailed View**: View complete issue details in JSON format
- 🔄 **Real-time Updates**: Auto-reload functionality for both frontend and backend

## Tech Stack

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **Python 3.13** - Programming language
- **Pydantic** - Data validation and serialization
- **Uvicorn** - ASGI web server

### Frontend
- **Angular 20** - Web application framework
- **TypeScript** - Typed superset of JavaScript
- **RxJS** - Reactive programming library
- **Angular CLI** - Command line interface for Angular

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

## API Endpoints

- `GET /health` - Health check
- `GET /issues` - List issues with search, filters, sorting, and pagination
- `GET /issues/{id}` - Get single issue by ID
- `POST /issues` - Create new issue
- `PUT /issues/{id}` - Update existing issue

## Quick Start

### Prerequisites
- Python 3.13+
- Node.js and npm
- Angular CLI

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

## Usage

1. **View Issues**: Browse the issues list with sorting and filtering options
2. **Search**: Use the search box to find issues by title
3. **Filter**: Filter by status (open/in_progress/closed), priority (low/medium/high), or assignee
4. **Create Issue**: Click "Create Issue" button to add a new issue
5. **Edit Issue**: Click "Edit" button on any row to modify an issue
6. **View Details**: Click anywhere on a row (except Edit button) to view full issue details

## Sample Data

The application comes with sample issues:
- Bug report with high priority
- Feature request in progress
- Documentation task (completed)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Deployment

### Backend Deployment
- Can be deployed to platforms like Heroku, Railway, or DigitalOcean
- Requires Python 3.13+ support
- Environment variables may be needed for production configuration

### Frontend Deployment
- Can be deployed to Netlify, Vercel, or GitHub Pages
- Build with `ng build` for production
- Configure backend API URL for production environment

---

Built with ❤️ using FastAPI and Angular