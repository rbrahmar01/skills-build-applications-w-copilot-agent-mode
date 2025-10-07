import React, { useEffect, useState } from 'react';
import { fetchData } from './commonFetch';
import DetailModal from './DetailModal';

export default function Activities() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchData('activities')
      .then(data => { setItems(data); })
      .catch(e => setError(e.message));
  }, []);

  return (
    <div className="data-table-wrapper">
      <div className="section-header">
        <h2>Activities</h2>
        <div>
          <button className="btn btn-sm btn-outline-primary" onClick={() => window.location.reload()}>Refresh</button>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Duration (min)</th>
              <th>Date</th>
              <th style={{width:'1%'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(items) && items.map((a,i) => (
              <tr key={i}>
                <td>{a.user?.name || a.user || ''}</td>
                <td>{a.type}</td>
                <td>{a.duration}</td>
                <td>{a.date}</td>
                <td><button className="btn btn-sm btn-outline-secondary" onClick={() => setSelected(a)}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DetailModal title="Activity Detail" item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
