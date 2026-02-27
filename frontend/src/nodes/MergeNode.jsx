import { useState, useEffect } from 'react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const MergeNode = ({ id, data, selected }) => {
  const [mergeType, setMergeType] = useState(data?.mergeType || 'concat');
  const [separator, setSeparator] = useState(data?.separator || '\\n');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'mergeType', mergeType);
    updateNodeField(id, 'separator', separator);
  }, [id, mergeType, separator, updateNodeField]);

  return (
    <BaseNode
      id={id}
      title="Merge"
      icon="🔗"
      nodeType="merge"
      inputs={[
        { id: 'input1', label: 'input 1', position: 25 },
        { id: 'input2', label: 'input 2', position: 50 },
        { id: 'input3', label: 'input 3', position: 75 }
      ]}
      outputs={[{ id: 'output', label: 'output' }]}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-field-label">Merge Type</label>
        <select
          className="node-field-select"
          value={mergeType}
          onChange={(e) => setMergeType(e.target.value)}
        >
          <option value="concat">Concatenate</option>
          <option value="array">As Array</option>
          <option value="object">As Object</option>
          <option value="first">First Non-Empty</option>
          <option value="last">Last Non-Empty</option>
        </select>
      </div>
      {mergeType === 'concat' && (
        <div className="node-field">
          <label className="node-field-label">Separator</label>
          <input
            type="text"
            className="node-field-input"
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            placeholder="Separator between values"
          />
        </div>
      )}
      <div className="node-info">
        Combines multiple inputs into one output
      </div>
    </BaseNode>
  );
};

export default MergeNode;
