import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

import { InputNode } from './nodes/InputNode';
import { LLMNode } from './nodes/LLMNode';
import { OutputNode } from './nodes/OutputNode';
import { TextNode } from './nodes/TextNode';
import { FilterNode } from './nodes/FilterNode';
import { TransformNode } from './nodes/TransformNode';
import { ConditionNode } from './nodes/ConditionNode';
import { APINode } from './nodes/APINode';
import { MergeNode } from './nodes/MergeNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  filter: FilterNode,
  transform: TransformNode,
  condition: ConditionNode,
  api: APINode,
  merge: MergeNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      return { id: nodeID, nodeType: type };
    };

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // Check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <div ref={reactFlowWrapper} style={{ width: '100%', height: 'calc(100vh - 120px)' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                snapToGrid
                connectionLineType='smoothstep'
                fitView
                deleteKeyCode={['Backspace', 'Delete']}
            >
                <Background color="#334155" gap={gridSize} />
                <Controls />
                <MiniMap 
                    nodeColor={(node) => {
                        switch (node.type) {
                            case 'customInput': return '#22c55e';
                            case 'customOutput': return '#f59e0b';
                            case 'llm': return '#8b5cf6';
                            case 'text': return '#3b82f6';
                            case 'filter': return '#ec4899';
                            case 'transform': return '#14b8a6';
                            case 'condition': return '#f97316';
                            case 'api': return '#06b6d4';
                            case 'merge': return '#a855f7';
                            default: return '#64748b';
                        }
                    }}
                />
            </ReactFlow>
        </div>
    );
};
