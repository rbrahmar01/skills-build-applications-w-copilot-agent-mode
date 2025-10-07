import React, { useEffect, useState } from 'react';
import { fetchData } from './commonFetch';
import DetailModal from './DetailModal';

export default function Users() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchData('users')
      .then(data => setItems(data))
      .catch(e => setError(e.message));
  }, []);

  return (
    <div className="data-table-wrapper">
      <div className="section-header">
        <h2>Users</h2>
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
              <th>Email</th>
              <th>Team</th>
              <th>Superhero</th>
              <th style={{width:'1%'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(items) && items.map((u,i) => (
              <tr key={i}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.team?.name || ''}</td>
                <td>{u.is_superhero ? 'Yes' : 'No'}</td>
                <td><button className="btn btn-sm btn-outline-secondary" onClick={() => setSelected(u)}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DetailModal title="User Detail" item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
