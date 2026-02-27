# Pipeline Builder - MERN Stack

A full-stack application for building and validating data pipeline DAGs (Directed Acyclic Graphs) using modern web technologies.

## Tech Stack

- **Frontend**: React 18 + Tailwind CSS + React Flow
- **Backend**: Node.js + Express
- **Build Tools**: Webpack (via react-scripts), Tailwind CSS

## Project Structure

```
Pipeline-Builder/
├── backend/                 # Node.js/Express backend
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   ├── utils/
│   │   └── dag.js          # DAG validation logic
│   └── node_modules/       # Installed packages
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── App.js          # Main React component
│   │   ├── index.js        # React entry point
│   │   ├── index.css       # Global styles (with Tailwind)
│   │   ├── components/     # React components
│   │   ├── nodes/          # Pipeline node components
│   │   ├── hooks/          # Custom React hooks
│   │   └── styles/         # Additional styles
│   ├── package.json        # Frontend dependencies
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── postcss.config.js   # PostCSS configuration
│   └── node_modules/       # Installed packages
│
└── README.md              # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```
   
   The backend will run on `http://localhost:5000` (development) or `https://pipeline-builder-zc3n.onrender.com` (production)

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```
   
   The frontend will automatically open at `http://localhost:3000`

## Running Both Servers

For development, you'll need **two terminal windows**:

**Terminal 1 (Backend):**
```bash
cd backend
npm start
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

## API Endpoints

### Backend Routes

- `GET /` - Health check
  ```json
  {
    "status": "ok",
    "message": "Pipeline Builder API is running"
  }
  ```

- `POST /pipelines/parse` - Validate pipeline DAG
  ```json
  Request:
  {
    "nodes": [...],
    "edges": [...]
  }
  
  Response:
  {
    "num_nodes": 5,
    "num_edges": 4,
    "is_dag": true
  }
  ```

## Features

- **Visual Pipeline Builder**: Drag-and-drop interface to create data pipelines
- **DAG Validation**: Automatic detection of cycles using DFS algorithm
- **Node Types**: Input, Output, Filter, Transform, Merge, LLM, Condition, Text, API nodes
- **Real-time Analysis**: Instant pipeline validation with detailed feedback
- **Modern UI**: Clean, dark-themed interface with Tailwind CSS

## Tailwind CSS

The project uses Tailwind CSS for styling. Custom colors are configured in `frontend/tailwind.config.js`:

```javascript
colors: {
  primary: '#5c6bc0',
  'bg-dark': '#1a1d23',
  'bg-card': '#22262e',
  // ... and more
}
```

To update styles, use Tailwind utility classes in your components:

```jsx
<div className="bg-bg-dark text-white p-4 rounded-lg">
  Your content here
</div>
```

## Building for Production

### Frontend Build
```bash
cd frontend
npm run build
```

This creates an optimized production build in the `build/` directory.

### Backend Deployment
The backend is ready for deployment as-is. For production:

1. Set environment variables (PORT, NODE_ENV, etc.)
2. Use a process manager like PM2
3. Configure proper CORS origins

Example with PM2:
```bash
npm install -g pm2
cd backend
pm2 start server.js --name "pipeline-builder-api"
```

## Development Notes

- The backend uses ES modules (import/export syntax)
- The frontend is built with Create React App
- Tailwind CSS is processed via PostCSS
- No databases configured - modify `backend/server.js` to add database integration

## License

MIT
