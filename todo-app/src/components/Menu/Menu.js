import React from 'react';
import PropTypes from 'prop-types';

const Menu = (props) => {
  const {
    onEdit, onRemove, top, left,
  } = props;
  return (
    <div className="dropdown-menu" style={{ top, left, display: 'block' }}>
      <button data-testid="edit-menu-item" className="dropdown-item" href="#" onClick={onEdit} type="button">Edit</button>
      <button data-testid="remove-menu-item" className="dropdown-item" href="#" onClick={onRemove} type="button">Remove</button>
    </div>
  );
};

Menu.protoTypes = {
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Menu;
