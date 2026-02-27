import { useCallback } from 'react';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';

// Custom hook for managing pipeline state with CRUD operations
export const usePipelineState = () => {
  // Select state and actions from store
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    updateNodeField,
  } = useStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
      getNodeID: state.getNodeID,
      addNode: state.addNode,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      onConnect: state.onConnect,
      updateNodeField: state.updateNodeField,
    }),
    shallow
  );

  const createNode = useCallback((type, position, initialData = {}) => {
    const nodeID = getNodeID(type);
    const newNode = {
      id: nodeID,
      type,
      position,
      data: { 
        id: nodeID, 
        nodeType: type,
        ...initialData 
      },
    };
    addNode(newNode);
    return nodeID;
  }, [getNodeID, addNode]);

  const updateNode = useCallback((nodeId, fieldName, fieldValue) => {
    updateNodeField(nodeId, fieldName, fieldValue);
  }, [updateNodeField]);

  const deleteNode = useCallback((nodeId) => {
    onNodesChange([{ type: 'remove', id: nodeId }]);
  }, [onNodesChange]);

  const deleteEdge = useCallback((edgeId) => {
    onEdgesChange([{ type: 'remove', id: edgeId }]);
  }, [onEdgesChange]);

  const getNode = useCallback((nodeId) => {
    return nodes.find(node => node.id === nodeId);
  }, [nodes]);

  const getNodeEdges = useCallback((nodeId) => {
    return edges.filter(
      edge => edge.source === nodeId || edge.target === nodeId
    );
  }, [edges]);

  const getPipelineData = useCallback(() => {
    return { nodes, edges };
  }, [nodes, edges]);

  const clearPipeline = useCallback(() => {
    nodes.forEach(node => {
      onNodesChange([{ type: 'remove', id: node.id }]);
    });
  }, [nodes, onNodesChange]);

  return {
    // State
    nodes,
    edges,
    
    // Node operations
    createNode,
    updateNode,
    deleteNode,
    getNode,
    
    // Edge operations
    deleteEdge,
    getNodeEdges,
    onConnect,
    
    // Pipeline operations
    getPipelineData,
    clearPipeline,
    
    // ReactFlow handlers
    onNodesChange,
    onEdgesChange,
  };
};

export default usePipelineState;
