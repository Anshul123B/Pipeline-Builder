# Pipeline Builder

A visual node-based workflow editor built with React, ReactFlow, and FastAPI. Users can create, connect, and validate data processing pipelines through an intuitive drag-and-drop interface.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- Python 3.11+

### Running the Frontend

```bash
cd frontend
npm install
npm start
```
Opens at: **http://localhost:3000**

### Running the Backend

```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload --port 8000
```
Opens at: **http://localhost:8000**

> **Note:** If `pip` is not in PATH, use the full Python path:
> ```bash
> & "C:\Users\hp\AppData\Local\Programs\Python\Python314\python.exe" -m pip install fastapi uvicorn
> & "C:\Users\hp\AppData\Local\Programs\Python\Python314\python.exe" -m uvicorn main:app --reload --port 8000
> ```

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── BaseNode.jsx      # Reusable node abstraction
│   │   ├── NodeShell.jsx     # Minimal node wrapper
│   │   └── Toolbar.jsx       # Draggable node palette
│   ├── nodes/
│   │   ├── InputNode.jsx     # Data input node
│   │   ├── OutputNode.jsx    # Data output node
│   │   ├── TextNode.jsx      # Text with {{variable}} parsing
│   │   ├── LLMNode.jsx       # AI/LLM processing node
│   │   ├── FilterNode.jsx    # Data filtering node
│   │   ├── TransformNode.jsx # Data transformation node
│   │   ├── ConditionNode.jsx # Branching logic node
│   │   ├── APINode.jsx       # HTTP request node
│   │   └── MergeNode.jsx     # Combine multiple inputs
│   ├── hooks/
│   │   └── usePipelineState.js  # Pipeline state management
│   ├── styles/
│   │   └── theme.css         # Unified styling
│   ├── App.js                # Main application
│   ├── ui.js                 # ReactFlow canvas
│   ├── store.js              # Zustand state store
│   ├── submit.js             # Pipeline submission
│   └── draggableNode.js      # Toolbar node component
│
backend/
├── main.py                   # FastAPI server
└── utils/
    └── dag.py                # DAG validation (cycle detection)
```

---

## 🎯 Features

### Node Types (9 total)

| Node | Icon | Purpose |
|------|------|---------|
| **Input** | 📥 | Entry point for pipeline data |
| **Output** | 📤 | Exit point for pipeline results |
| **Text** | 📝 | Text content with dynamic `{{variable}}` handles |
| **LLM** | 🤖 | AI language model processing |
| **Filter** | 🔍 | Filter data based on conditions |
| **Transform** | 🔄 | Transform/modify data |
| **Condition** | ⚡ | Branch logic (true/false paths) |
| **API Call** | 🌐 | HTTP requests to external services |
| **Merge** | 🔗 | Combine multiple inputs into one |

### Key Capabilities

1. **Drag & Drop** - Drag nodes from toolbar onto canvas
2. **Connect Nodes** - Click and drag between handles to create edges
3. **Dynamic Handles** - Text nodes auto-create input handles for `{{variables}}`
4. **Auto-Resize** - Text node grows as you type
5. **Delete** - Select node/edge and press `Backspace` or `Delete`
6. **Pipeline Validation** - Submit to check if pipeline is a valid DAG

---

## 🔧 How It Works

### Frontend Architecture

1. **BaseNode Abstraction** - All nodes extend `BaseNode.jsx` for consistent layout, handles, and styling
2. **State Management** - Zustand store (`store.js`) manages nodes and edges
3. **ReactFlow** - Handles canvas rendering, drag-drop, and connections

### Backend Architecture

1. **POST /pipelines/parse** - Receives pipeline JSON
2. **DAG Validation** - Uses DFS cycle detection algorithm
3. **Response** - Returns `{ num_nodes, num_edges, is_dag }`

### Data Flow

```
User builds pipeline → Click "Submit" → POST to /pipelines/parse
                                              ↓
                              Backend validates DAG
                                              ↓
                              Response with validation result
                                              ↓
                              Alert shown to user
```

---

## 📝 Text Node Variables

The Text node supports dynamic variable parsing:

```
Hello {{name}}, your order {{orderId}} is ready!
```

This automatically creates two input handles:
- `name` (left side)
- `orderId` (left side)

**Rules:**
- Variables must be in `{{variableName}}` format
- Variable names must be valid JavaScript identifiers
- Duplicate variables create only one handle

---

## 🌐 API Reference

### POST /pipelines/parse

**Request:**
```json
{
  "nodes": [
    { "id": "input-1", "type": "customInput", ... },
    { "id": "output-1", "type": "customOutput", ... }
  ],
  "edges": [
    { "source": "input-1", "target": "output-1", ... }
  ]
}
```

**Response:**
```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, ReactFlow, Zustand |
| Styling | CSS (custom theme) |
| Backend | Python, FastAPI |
| Validation | DFS-based DAG detection |
