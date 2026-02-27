import { useState, useEffect } from 'react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const ConditionNode = ({ id, data, selected }) => {
  const [operator, setOperator] = useState(data?.operator || 'equals');
  const [compareValue, setCompareValue] = useState(data?.compareValue || '');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'operator', operator);
    updateNodeField(id, 'compareValue', compareValue);
  }, [id, operator, compareValue, updateNodeField]);

  return (
    <BaseNode
      id={id}
      title="Condition"
      icon="⚡"
      nodeType="condition"
      inputs={[{ id: 'input', label: 'input' }]}
      outputs={[
        { id: 'true', label: 'true', position: 35 },
        { id: 'false', label: 'false', position: 65 }
      ]}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-field-label">Operator</label>
        <select
          className="node-field-select"
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
        >
          <option value="equals">Equals (==)</option>
          <option value="notEquals">Not Equals (!=)</option>
          <option value="greaterThan">Greater Than (&gt;)</option>
          <option value="lessThan">Less Than (&lt;)</option>
          <option value="greaterOrEqual">Greater or Equal (&gt;=)</option>
          <option value="lessOrEqual">Less or Equal (&lt;=)</option>
          <option value="isEmpty">Is Empty</option>
          <option value="isNotEmpty">Is Not Empty</option>
          <option value="isTrue">Is True</option>
          <option value="isFalse">Is False</option>
        </select>
      </div>
      {!['isEmpty', 'isNotEmpty', 'isTrue', 'isFalse'].includes(operator) && (
        <div className="node-field">
          <label className="node-field-label">Compare Value</label>
          <input
            type="text"
            className="node-field-input"
            value={compareValue}
            onChange={(e) => setCompareValue(e.target.value)}
            placeholder="Value to compare..."
          />
        </div>
      )}
      <div className="node-info">
        Routes data based on condition result
      </div>
    </BaseNode>
  );
};

export default ConditionNode;
