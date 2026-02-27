import { useState, useEffect } from 'react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const FilterNode = ({ id, data, selected }) => {
  const [filterType, setFilterType] = useState(data?.filterType || 'contains');
  const [filterValue, setFilterValue] = useState(data?.filterValue || '');
  const [caseSensitive, setCaseSensitive] = useState(data?.caseSensitive || false);
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'filterType', filterType);
    updateNodeField(id, 'filterValue', filterValue);
    updateNodeField(id, 'caseSensitive', caseSensitive);
  }, [id, filterType, filterValue, caseSensitive, updateNodeField]);

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon="🔍"
      nodeType="filter"
      inputs={[{ id: 'input', label: 'input' }]}
      outputs={[
        { id: 'matched', label: 'matched', position: 35 },
        { id: 'unmatched', label: 'unmatched', position: 65 }
      ]}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-field-label">Filter Type</label>
        <select
          className="node-field-select"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="contains">Contains</option>
          <option value="equals">Equals</option>
          <option value="startsWith">Starts With</option>
          <option value="endsWith">Ends With</option>
          <option value="regex">Regex Match</option>
          <option value="notEmpty">Not Empty</option>
        </select>
      </div>
      <div className="node-field">
        <label className="node-field-label">Value</label>
        <input
          type="text"
          className="node-field-input"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Filter value..."
        />
      </div>
      <div className="node-checkbox">
        <input
          type="checkbox"
          id={`${id}-case`}
          checked={caseSensitive}
          onChange={(e) => setCaseSensitive(e.target.checked)}
        />
        <label htmlFor={`${id}-case`}>Case Sensitive</label>
      </div>
    </BaseNode>
  );
};

export default FilterNode;
