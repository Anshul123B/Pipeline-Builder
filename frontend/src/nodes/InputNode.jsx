import { useState, useEffect } from 'react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useState(data?.inputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'inputName', currName);
    updateNodeField(id, 'inputType', inputType);
  }, [id, currName, inputType, updateNodeField]);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="📥"
      nodeType="input"
      inputs={[]}
      outputs={[{ id: 'value', label: 'value' }]}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-field-label">Name</label>
        <input
          type="text"
          className="node-field-input"
          value={currName}
          onChange={handleNameChange}
          placeholder="Input name"
        />
      </div>
      <div className="node-field">
        <label className="node-field-label">Type</label>
        <select
          className="node-field-select"
          value={inputType}
          onChange={handleTypeChange}
        >
          <option value="Text">Text</option>
          <option value="Number">Number</option>
          <option value="File">File</option>
          <option value="JSON">JSON</option>
        </select>
      </div>
    </BaseNode>
  );
};

export default InputNode;
