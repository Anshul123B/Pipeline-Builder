import { useState, useEffect } from 'react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const TransformNode = ({ id, data, selected }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');
  const [customExpression, setCustomExpression] = useState(data?.customExpression || '');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'transformType', transformType);
    updateNodeField(id, 'customExpression', customExpression);
  }, [id, transformType, customExpression, updateNodeField]);

  return (
    <BaseNode
      id={id}
      title="Transform"
      icon="🔄"
      nodeType="transform"
      inputs={[{ id: 'input', label: 'input' }]}
      outputs={[{ id: 'output', label: 'output' }]}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-field-label">Transform Type</label>
        <select
          className="node-field-select"
          value={transformType}
          onChange={(e) => setTransformType(e.target.value)}
        >
          <option value="uppercase">To Uppercase</option>
          <option value="lowercase">To Lowercase</option>
          <option value="trim">Trim Whitespace</option>
          <option value="reverse">Reverse</option>
          <option value="split">Split to Array</option>
          <option value="join">Join Array</option>
          <option value="parseJson">Parse JSON</option>
          <option value="stringify">Stringify</option>
          <option value="custom">Custom Expression</option>
        </select>
      </div>
      {transformType === 'custom' && (
        <div className="node-field">
          <label className="node-field-label">Expression</label>
          <input
            type="text"
            className="node-field-input"
            value={customExpression}
            onChange={(e) => setCustomExpression(e.target.value)}
            placeholder="e.g., value.slice(0, 10)"
          />
        </div>
      )}
      <div className="node-info">
        Apply transformation to input data
      </div>
    </BaseNode>
  );
};

export default TransformNode;
