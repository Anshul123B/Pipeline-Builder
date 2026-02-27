#!/bin/bash
# Quick start script for MERN Pipeline Builder

echo "📦 Installing backend dependencies..."
cd backend
npm install

echo "✅ Backend dependencies installed"
echo ""
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

echo "✅ Frontend dependencies installed"
echo ""
echo "🚀 Setup complete!"
echo ""
echo "To start the application:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend && npm start"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd frontend && npm start"
echo ""
echo "Backend will run on: http://localhost:5000 (development)"
echo "Frontend will run on: http://localhost:3000"
echo ""
echo "Production Backend: https://pipeline-builder-zc3n.onrender.com"
