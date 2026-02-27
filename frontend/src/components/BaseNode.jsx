import { Handle, Position } from 'reactflow';

// Reusable wrapper component for all node types
export const BaseNode = ({ 
  id, 
  title, 
  icon = '📦', 
  nodeType = 'default',
  inputs = [], 
  outputs = [], 
  selected = false,
  children 
}) => {
  // Calculate handle positions evenly distributed
  const getHandlePosition = (index, total) => {
    if (total === 1) return 50;
    const padding = 20; // percentage from top/bottom
    const availableSpace = 100 - (padding * 2);
    return padding + (index * (availableSpace / (total - 1)));
  };

  return (
    <div className={`base-node node-type-${nodeType} ${selected ? 'selected' : ''}`}>
      {inputs.map((input, index) => (
        <div key={input.id} style={{ position: 'relative' }}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${input.id}`}
            style={{ 
              top: input.position !== undefined 
                ? `${input.position}%` 
                : `${getHandlePosition(index, inputs.length)}%` 
            }}
          />
          {input.label && (
            <span 
              className="handle-label handle-label-left"
              style={{ 
                top: input.position !== undefined 
                  ? `${input.position}%` 
                  : `${getHandlePosition(index, inputs.length)}%`,
                transform: 'translateY(-50%)'
              }}
            >
              {input.label}
            </span>
          )}
        </div>
      ))}

      <div className="node-header">
        <span className="node-header-icon">{icon}</span>
        <span className="node-header-title">{title}</span>
      </div>

      <div className="node-content">
        {children}
      </div>

      {outputs.map((output, index) => (
        <div key={output.id} style={{ position: 'relative' }}>
          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-${output.id}`}
            style={{ 
              top: output.position !== undefined 
                ? `${output.position}%` 
                : `${getHandlePosition(index, outputs.length)}%` 
            }}
          />
          {output.label && (
            <span 
              className="handle-label handle-label-right"
              style={{ 
                top: output.position !== undefined 
                  ? `${output.position}%` 
                  : `${getHandlePosition(index, outputs.length)}%`,
                transform: 'translateY(-50%)'
              }}
            >
              {output.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default BaseNode;
