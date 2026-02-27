/**
 * Build an adjacency list from nodes and edges.
 */
function buildAdjacencyList(nodes, edges) {
  const adjList = {};

  // Initialize all nodes in the adjacency list
  for (const node of nodes) {
    const nodeId = node.id;
    if (nodeId && !adjList[nodeId]) {
      adjList[nodeId] = [];
    }
  }

  // Add edges to adjacency list
  for (const edge of edges) {
    const source = edge.source;
    const target = edge.target;
    if (source && target) {
      if (!adjList[source]) {
        adjList[source] = [];
      }
      adjList[source].push(target);
    }
  }

  return adjList;
}

/**
 * Check if the graph is a DAG using DFS with three-color marking.
 */
function isDAGdfs(nodes, edges) {
  if (!nodes || nodes.length === 0) {
    return true;
  }

  const adjList = buildAdjacencyList(nodes, edges);

  // Color states
  const WHITE = 0; // Unvisited
  const GRAY = 1; // Currently being processed (in recursion stack)
  const BLACK = 2; // Fully processed

  const color = {};
  for (const nodeId of Object.keys(adjList)) {
    color[nodeId] = WHITE;
  }

  function dfs(nodeId) {
    color[nodeId] = GRAY;

    const neighbors = adjList[nodeId] || [];
    for (const neighbor of neighbors) {
      if (!(neighbor in color)) {
        continue;
      }
      if (color[neighbor] === GRAY) {
        return false; // Cycle detected
      }
      if (color[neighbor] === WHITE) {
        if (!dfs(neighbor)) {
          return false;
        }
      }
    }

    color[nodeId] = BLACK;
    return true;
  }

  for (const nodeId of Object.keys(adjList)) {
    if (color[nodeId] === WHITE) {
      if (!dfs(nodeId)) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Check if the graph is a DAG using Kahn's Algorithm (topological sort).
 */
function isDAGkahn(nodes, edges) {
  if (!nodes || nodes.length === 0) {
    return true;
  }

  const adjList = buildAdjacencyList(nodes, edges);
  const nodeIds = Object.keys(adjList);
  const inDegree = {};

  for (const nodeId of nodeIds) {
    inDegree[nodeId] = 0;
  }

  for (const source of Object.keys(adjList)) {
    for (const target of adjList[source]) {
      if (target in inDegree) {
        inDegree[target]++;
      }
    }
  }

  const queue = nodeIds.filter((nodeId) => inDegree[nodeId] === 0);
  let processedCount = 0;

  while (queue.length > 0) {
    const current = queue.shift();
    processedCount++;

    for (const neighbor of adjList[current] || []) {
      if (neighbor in inDegree) {
        inDegree[neighbor]--;
        if (inDegree[neighbor] === 0) {
          queue.push(neighbor);
        }
      }
    }
  }

  return processedCount === nodeIds.length;
}

/**
 * Validate a pipeline and return analysis results.
 */
export function validatePipeline(nodes, edges) {
  const numNodes = nodes ? nodes.length : 0;
  const numEdges = edges ? edges.length : 0;
  const isDAG = isDAGdfs(nodes || [], edges || []);

  return {
    num_nodes: numNodes,
    num_edges: numEdges,
    is_dag: isDAG
  };
}
