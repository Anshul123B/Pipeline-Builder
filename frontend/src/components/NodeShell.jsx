// Minimal wrapper for nodes that need custom handle placement
export const NodeShell = ({ 
  nodeType = 'default',
  title, 
  icon = '📦', 
  selected = false,
  children 
}) => {
  return (
    <div className={`base-node node-type-${nodeType} ${selected ? 'selected' : ''}`}>
      <div className="node-header">
        <span className="node-header-icon">{icon}</span>
        <span className="node-header-title">{title}</span>
      </div>

      <div className="node-content">
        {children}
      </div>
    </div>
  );
};

export default NodeShell;
