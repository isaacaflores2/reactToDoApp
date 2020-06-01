import React from 'react';
import PropTypes from 'prop-types';

const Menu = (props) => {
  const {
    onEdit, onRemove, top, left,
  } = props;
  return (
    <div className="dropdown-menu" style={{ top, left, display: 'block' }}>
      <a data-testid="edit-menu-item" className="dropdown-item" href="#" onClick={onEdit}>Edit</a>
      <a data-testid="remove-menu-item" className="dropdown-item" href="#" onClick={onRemove}>Remove</a>
    </div>
  );
};

Menu.protoTypes = {
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Menu;
