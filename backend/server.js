import express from 'express';
import cors from 'cors';
import { validatePipeline } from './utils/dag.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://pipeline-builder-zc3n.onrender.com'],
  credentials: true,
  methods: ['*'],
  allowedHeaders: ['*']
}));

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Pipeline Builder API is running'
  });
});

app.post('/pipelines/parse', (req, res) => {
  try {
    const { nodes, edges } = req.body;

    if (!nodes || !edges) {
      return res.status(400).json({
        error: 'Missing nodes or edges in request body'
      });
    }

    const result = validatePipeline(nodes, edges);
    res.json(result);
  } catch (error) {
    console.error('Error parsing pipeline:', error);
    res.status(500).json({
      error: 'Failed to parse pipeline',
      message: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Pipeline Builder API running on http://localhost:${PORT}`);
});
