import React, { useEffect, useState } from 'react';
import { fetchData } from './commonFetch';
import DetailModal from './DetailModal';

export default function Workouts() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const endpoint = 'workouts';
    fetchData(endpoint)
      .then(data => {
        console.log(`[Workouts] Data from ${endpoint}:`, data);
        setItems(data);
      })
      .catch(e => setError(e.message));
  }, []);

  return (
    <div>
      <div className="data-table-wrapper">
        <div className="section-header">
          <h2>Workouts</h2>
          <div>
            <button className="btn btn-sm btn-outline-primary" onClick={() => window.location.reload()}>Refresh</button>
          </div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="table-responsive mb-4">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Teams</th>
                <th style={{width:'1%'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(items) && items.map((w,i) => (
                <tr key={i}>
                  <td>{w.name}</td>
                  <td>{w.description}</td>
                  <td>{(w.suggested_for||[]).map(t=>t.name).join(', ')}</td>
                  <td><button className="btn btn-sm btn-outline-secondary" onClick={() => setSelected(w)}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h5 className="mb-3">Card View</h5>
        <div className="row g-3">
          {Array.isArray(items) && items.map((w,i) => (
            <div className="col-md-4" key={i}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{w.name}</h5>
                  <p className="card-text">{w.description}</p>
                  <small className="text-muted">Teams: {(w.suggested_for||[]).map(t=>t.name).join(', ')}</small>
                </div>
                <div className="card-footer bg-transparent border-0">
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => setSelected(w)}>View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <DetailModal title="Workout Detail" item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
