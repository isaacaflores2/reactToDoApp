import React from 'react';
import PropTypes from 'prop-types';
import ListIcon from '@material-ui/icons/List';

class ListNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleSelect() {
    this.props.onSelect(this.props.id);
  }

  handleRemove() {
    this.props.onRemoveList(this.props.id);
  }

  render() {
    const { id, name, isCollapsed } = this.props;
    const display = isCollapsed ? 'd-none' : '';

    return (
      <div data-testid={`list-navitem-name-${id}`} className="row flex-nowrap align-items-center" onClick={this.handleSelect}>
        <div className="col-2">
          <ListIcon data-testid={`list-nav-icon-${id}`} id={id} />
        </div>
        <div data-testid={`list-navitem-name-text-${id}`} className={`${display} col-10 text-truncate`} id={id}>
          {name}
        </div>
      </div>
    );
  }
}

ListNavItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onRemoveList: PropTypes.func.isRequired,
  isCollapsed: PropTypes.bool,
};

ListNavItem.defaultProps = {
  isCollapsed: false,
};

export default ListNavItem;
