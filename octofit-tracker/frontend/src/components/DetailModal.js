import React from 'react';

export default function DetailModal({ title, item, onClose }) {
  if (!item) return null;
  return (
    <div className="modal fade show" style={{display:'block'}} tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            <div className="modal-json">
              <pre>{JSON.stringify(item, null, 2)}</pre>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
