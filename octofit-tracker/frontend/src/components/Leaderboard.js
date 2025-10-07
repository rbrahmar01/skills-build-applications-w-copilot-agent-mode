import React, { useEffect, useState } from 'react';
import { fetchData } from './commonFetch';
import DetailModal from './DetailModal';

export default function Leaderboard() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchData('leaderboards')
      .then(data => setItems(data))
      .catch(e => setError(e.message));
  }, []);

  return (
    <div className="data-table-wrapper">
      <div className="section-header">
        <h2>Leaderboard</h2>
        <div>
          <button className="btn btn-sm btn-outline-primary" onClick={() => window.location.reload()}>Refresh</button>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>Team</th>
              <th>Points</th>
              <th style={{width:'1%'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(items) && items.map((l,i) => (
              <tr key={i}>
                <td>{l.team?.name || ''}</td>
                <td>{l.points}</td>
                <td><button className="btn btn-sm btn-outline-secondary" onClick={() => setSelected(l)}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DetailModal title="Leaderboard Entry" item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
