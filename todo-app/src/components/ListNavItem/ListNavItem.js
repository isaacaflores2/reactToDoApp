import React from 'react';
import PropTypes from 'prop-types';
import { BsXSquareFill } from 'react-icons/bs';

class ListNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleSelect(event) {
    event.preventDefault();
    this.props.onSelect(event);
  }

  handleRemove() {
    this.props.onRemoveList(this.props.id);
  }

  render() {
    return (
      <div className="row px-1">
        <div className="col-8 mr-auto text-truncate" id={this.props.id} onClick={this.handleSelect}>
          {this.props.name}
        </div>
        <div className="col-3 pl-1">
          <BsXSquareFill data-testid={`list-remove-icon-${this.props.id}`} id={this.props.id} onClick={this.handleRemove} />
        </div>
      </div>
    );
  }
}

ListNavItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onRemoveList: PropTypes.func.isRequired,
};

export default ListNavItem;
