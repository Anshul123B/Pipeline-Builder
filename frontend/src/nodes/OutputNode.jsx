import { useState, useEffect } from 'react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const OutputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'outputName', currName);
    updateNodeField(id, 'outputType', outputType);
  }, [id, currName, outputType, updateNodeField]);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="📤"
      nodeType="output"
      inputs={[{ id: 'value', label: 'value' }]}
      outputs={[]}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-field-label">Name</label>
        <input
          type="text"
          className="node-field-input"
          value={currName}
          onChange={handleNameChange}
          placeholder="Output name"
        />
      </div>
      <div className="node-field">
        <label className="node-field-label">Type</label>
        <select
          className="node-field-select"
          value={outputType}
          onChange={handleTypeChange}
        >
          <option value="Text">Text</option>
          <option value="Number">Number</option>
          <option value="Image">Image</option>
          <option value="JSON">JSON</option>
        </select>
      </div>
    </BaseNode>
  );
};

export default OutputNode;
