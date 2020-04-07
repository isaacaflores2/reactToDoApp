import React from 'react';

const ListCard = ({ children }) => (
  <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-md-4">
    <div className="card px-1 py-2 h-100">
      {children}
    </div>
  </div>
);

export default ListCard;
