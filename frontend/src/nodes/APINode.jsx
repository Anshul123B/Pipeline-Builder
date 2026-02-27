import { useState, useEffect } from 'react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const APINode = ({ id, data, selected }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');
  const [headers, setHeaders] = useState(data?.headers || '');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'method', method);
    updateNodeField(id, 'url', url);
    updateNodeField(id, 'headers', headers);
  }, [id, method, url, headers, updateNodeField]);

  const inputs = method === 'GET' 
    ? [{ id: 'params', label: 'params' }]
    : [
        { id: 'params', label: 'params', position: 35 },
        { id: 'body', label: 'body', position: 65 }
      ];

  return (
    <BaseNode
      id={id}
      title="API Call"
      icon="🌐"
      nodeType="api"
      inputs={inputs}
      outputs={[
        { id: 'response', label: 'response', position: 35 },
        { id: 'error', label: 'error', position: 65 }
      ]}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-field-label">Method</label>
        <select
          className="node-field-select"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <div className="node-field">
        <label className="node-field-label">URL</label>
        <input
          type="text"
          className="node-field-input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/endpoint"
        />
      </div>
      <div className="node-field">
        <label className="node-field-label">Headers (JSON)</label>
        <input
          type="text"
          className="node-field-input"
          value={headers}
          onChange={(e) => setHeaders(e.target.value)}
          placeholder='{"Authorization": "Bearer ..."}'
        />
      </div>
    </BaseNode>
  );
};

export default APINode;
