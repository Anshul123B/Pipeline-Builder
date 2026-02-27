import { DraggableNode } from '../draggableNode';

const nodeCategories = [
  {
    category: 'Core',
    nodes: [
      { type: 'customInput', label: 'Input', icon: '📥' },
      { type: 'customOutput', label: 'Output', icon: '📤' },
      { type: 'text', label: 'Text', icon: '📝' },
      { type: 'llm', label: 'LLM', icon: '🤖' },
    ]
  },
  {
    category: 'Processing',
    nodes: [
      { type: 'filter', label: 'Filter', icon: '🔍' },
      { type: 'transform', label: 'Transform', icon: '🔄' },
      { type: 'condition', label: 'Condition', icon: '⚡' },
    ]
  },
  {
    category: 'Integration',
    nodes: [
      { type: 'api', label: 'API Call', icon: '🌐' },
      { type: 'merge', label: 'Merge', icon: '🔗' },
    ]
  }
];

export const Toolbar = () => {
  return (
    <div className="pipeline-toolbar">
      <div className="toolbar-title">Pipeline Builder</div>
      <div className="toolbar-nodes">
        {nodeCategories.map(category => (
          category.nodes.map(node => (
            <DraggableNode 
              key={node.type}
              type={node.type} 
              label={node.label}
              icon={node.icon}
            />
          ))
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
