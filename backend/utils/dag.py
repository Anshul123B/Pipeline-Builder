from collections import defaultdict
from typing import List, Dict, Any


def build_adjacency_list(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> Dict[str, List[str]]:
    """Build an adjacency list from nodes and edges."""
    adj_list = defaultdict(list)
    
    # Initialize all nodes in the adjacency list
    for node in nodes:
        node_id = node.get('id')
        if node_id and node_id not in adj_list:
            adj_list[node_id] = []
    
    # Add edges to adjacency list
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        if source and target:
            adj_list[source].append(target)
    
    return dict(adj_list)


def is_dag_dfs(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    """Check if the graph is a DAG using DFS with three-color marking."""
    if not nodes:
        return True
    
    adj_list = build_adjacency_list(nodes, edges)
    
    # Color states
    WHITE = 0  # Unvisited
    GRAY = 1   # Currently being processed (in recursion stack)
    BLACK = 2  # Fully processed
    
    color = {node_id: WHITE for node_id in adj_list}
    
    def dfs(node_id: str) -> bool:
        """Returns False if a cycle is detected."""
        color[node_id] = GRAY
        
        for neighbor in adj_list.get(node_id, []):
            if neighbor not in color:
                continue
            if color[neighbor] == GRAY:
                return False
            if color[neighbor] == WHITE:
                if not dfs(neighbor):
                    return False
        
        color[node_id] = BLACK
        return True
    
    for node_id in adj_list:
        if color[node_id] == WHITE:
            if not dfs(node_id):
                return False
    
    return True


def is_dag_kahn(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    """Check if the graph is a DAG using Kahn's Algorithm (topological sort)."""
    if not nodes:
        return True
    
    adj_list = build_adjacency_list(nodes, edges)
    node_ids = set(adj_list.keys())
    
    in_degree = {node_id: 0 for node_id in node_ids}
    
    for source, targets in adj_list.items():
        for target in targets:
            if target in in_degree:
                in_degree[target] += 1
    
    queue = [node_id for node_id, degree in in_degree.items() if degree == 0]
    processed_count = 0
    
    while queue:
        current = queue.pop(0)
        processed_count += 1
        
        for neighbor in adj_list.get(current, []):
            if neighbor in in_degree:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)
    
    return processed_count == len(node_ids)


def validate_pipeline(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Validate a pipeline and return analysis results."""
    num_nodes = len(nodes) if nodes else 0
    num_edges = len(edges) if edges else 0
    is_dag = is_dag_dfs(nodes or [], edges or [])
    
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }
