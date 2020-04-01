import React from 'react';
import PropTypes from 'prop-types';
import './ToDoItem.css';
import { BsXSquareFill } from 'react-icons/bs';


class ToDoItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.state = { isChecked: false };
  }

  handleChange(event) {
    this.setState({ isChecked: event.target.checked });
  }

  handleRemoveItem() {
    this.props.onRemoveItem(this.props.id);
  }

  render() {
    return (
      <div className="row no-gutters">
        <div className="col-1 pr-1">
          <input data-testid="checkbox" type="checkbox" id={this.props.id} value={this.props.name} onChange={this.handleChange} />
        </div>
        <div data-testid="item-name" className={this.state.isChecked ? 'item-complete col-10 mr-auto text-truncate' : 'item-not-complete col-10 mr-auto text-truncate'}>
          {this.props.name}
        </div>
        <div className="col-1 pl-1">
          <BsXSquareFill data-testid="remove-icon" id={this.props.id} onClick={this.handleRemoveItem} />
        </div>
      </div>
    );
  }
}

ToDoItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};

export default ToDoItem;
