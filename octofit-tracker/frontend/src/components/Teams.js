import React, { useEffect, useState } from 'react';
import { fetchData } from './commonFetch';
import DetailModal from './DetailModal';

export default function Teams() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const endpoint = 'teams';
    fetchData(endpoint)
      .then(data => {
        console.log(`[Teams] Data from ${endpoint}:`, data);
        setItems(data);
      })
      .catch(e => setError(e.message));
  }, []);

  return (
    <div className="data-table-wrapper">
      <div className="section-header">
        <h2>Teams</h2>
        <div>
          <button className="btn btn-sm btn-outline-primary" onClick={() => window.location.reload()}>Refresh</button>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th style={{width:'1%'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(items) && items.map((t,i) => (
              <tr key={i}>
                <td>{t.name}</td>
                <td>{t.description}</td>
                <td><button className="btn btn-sm btn-outline-secondary" onClick={() => setSelected(t)}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DetailModal title="Team Detail" item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
