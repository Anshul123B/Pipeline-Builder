import express from 'express';
import cors from 'cors';
import { validatePipeline } from './utils/dag.js';

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://pipeline-builder-zc3n.onrender.com'],
  credentials: true,
  methods: ['*'],
  allowedHeaders: ['*']
}));

app.use(express.json({ limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// Health check route
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Pipeline Builder API is running',
    environment: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    environment: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Pipeline validation endpoint
app.post('/pipelines/parse', (req, res) => {
  try {
    const { nodes, edges } = req.body;

    // Validate input
    if (!nodes || !edges) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Missing nodes or edges in request body'
      });
    }

    if (!Array.isArray(nodes)) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'nodes must be an array'
      });
    }

    if (!Array.isArray(edges)) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'edges must be an array'
      });
    }

    // Validate pipeline
    const result = validatePipeline(nodes, edges);
    
    res.json({
      ...result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error parsing pipeline:', error);
    res.status(500).json({
      error: 'Pipeline validation failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.method} ${req.path} does not exist`,
    availableRoutes: [
      'GET /',
      'GET /health',
      'POST /pipelines/parse'
    ]
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`\n✅ Pipeline Builder API started`);
  console.log(`   Environment: ${NODE_ENV}`);
  console.log(`   Port: ${PORT}`);
  console.log(`   URL: http://localhost:${PORT}`);
  console.log(`   API Endpoint: http://localhost:${PORT}/pipelines/parse\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
