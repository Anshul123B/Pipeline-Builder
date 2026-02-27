import { useState, useEffect } from 'react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const LLMNode = ({ id, data, selected }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4');
  const [temperature, setTemperature] = useState(data?.temperature || 0.7);
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'model', model);
    updateNodeField(id, 'temperature', temperature);
  }, [id, model, temperature, updateNodeField]);

  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      nodeType="llm"
      inputs={[
        { id: 'system', label: 'system', position: 33 },
        { id: 'prompt', label: 'prompt', position: 66 }
      ]}
      outputs={[{ id: 'response', label: 'response' }]}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-field-label">Model</label>
        <select
          className="node-field-select"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-4-turbo">GPT-4 Turbo</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="claude-3">Claude 3</option>
          <option value="claude-2">Claude 2</option>
        </select>
      </div>
      <div className="node-field">
        <label className="node-field-label">Temperature: {temperature}</label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>
      <div className="node-info">
        Configure LLM parameters for text generation
      </div>
    </BaseNode>
  );
};

export default LLMNode;
