import { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { NodeShell } from '../components/NodeShell';
import { useStore } from '../store';

// Matches {{variable_name}} where variable_name is a valid JS identifier
const extractVariables = (text) => {
  const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
  const variables = new Set();
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    variables.add(match[1]);
  }
  
  return Array.from(variables);
};

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || '');
  const textareaRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);
  
  // Extract variables from the current text
  const variables = useMemo(() => extractVariables(currText), [currText]);
  
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(60, textareaRef.current.scrollHeight)}px`;
    }
  }, [currText]);

  useEffect(() => {
    updateNodeField(id, 'text', currText);
    updateNodeField(id, 'variables', variables);
  }, [id, currText, variables, updateNodeField]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Calculate handle positions for variables
  const getVariableHandlePosition = (index, total) => {
    if (total === 0) return 50;
    const headerHeight = 45; // Approximate header height in pixels
    const contentPadding = 16;
    const baseOffset = headerHeight + contentPadding;
    const spacing = 25; // pixels between handles
    return baseOffset + (index * spacing);
  };

  return (
    <NodeShell
      nodeType="text"
      title="Text"
      icon="📝"
      selected={selected}
    >
      {variables.map((variable, index) => (
        <div key={variable} className="variable-handle-container">
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${variable}`}
            style={{ 
              top: `${getVariableHandlePosition(index, variables.length)}px`,
              position: 'absolute'
            }}
          />
          <span className="variable-name">{`{{${variable}}}`}</span>
        </div>
      ))}

      <div className="node-field">
        <label className="node-field-label">Text Content</label>
        <textarea
          ref={textareaRef}
          className="node-field-textarea"
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text with {{variables}}..."
          style={{
            minWidth: '200px',
            width: '100%',
            resize: 'both',
            overflow: 'hidden'
          }}
        />
      </div>
      
      {variables.length > 0 && (
        <div className="node-info">
          Variables: {variables.join(', ')}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ top: '50%' }}
      />
    </NodeShell>
  );
};

export default TextNode;
