from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

from utils.dag import validate_pipeline

app = FastAPI(
    title="Pipeline Builder API",
    description="Backend API for pipeline validation and analysis",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelineNode(BaseModel):
    id: str
    type: Optional[str] = None
    position: Optional[Dict[str, float]] = None
    data: Optional[Dict[str, Any]] = None


class PipelineEdge(BaseModel):
    id: Optional[str] = None
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None


class PipelineRequest(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]


class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool


@app.get('/')
def read_root():
    return {'status': 'ok', 'message': 'Pipeline Builder API is running'}


@app.post('/pipelines/parse', response_model=PipelineResponse)
def parse_pipeline(pipeline: PipelineRequest):
    """Parse and validate a pipeline, checking if it forms a valid DAG."""
    result = validate_pipeline(pipeline.nodes, pipeline.edges)
    return PipelineResponse(**result)
