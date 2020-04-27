import React, { Component } from 'react';
import './SideBar.css';
import PropTypes from 'prop-types';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import ToDo from '../../modules/ToDo';
import ListNavItem from '../ListNavItem/ListNavItem';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.handleSelectList = this.handleSelectList.bind(this);
    this.handleRemoveList = this.handleRemoveList.bind(this);
    this.handleToggleSideBar = this.handleToggleSideBar.bind(this);
    this.state = { isCollapsed: true };
  }

  handleSelectList(id) {
    this.props.onTodoSelect(id);
  }

  handleRemoveList(listId) {
    this.props.onRemoveList(listId);
  }

  handleToggleSideBar() {
    this.props.onToggle();
  }

  render() {
    const { todos, children, isCollapsed } = this.props;
    const sidebarClass = isCollapsed ? 'sidebar-collapsed px-2' : 'sidebar-open';

    return (
      <div data-testid="sidebar-container" className={`${sidebarClass} sidebar-container sticky-top bg-dark text-light d-mb-block`}>
        <MenuOpenIcon data-testid="sidebar-menu-button" onClick={this.handleToggleSideBar} />
        <ul data-testid="sidebar-todoname-list" className="nav flex-column list-group">
          { todos.map((todo) => (
            <li key={`${todo.name}-${todo.id}`} className="list-group-item list-group-item-action border-0 px-0 text-light bg-dark">
              <ListNavItem
                id={todo.id}
                name={todo.name}
                onSelect={this.handleSelectList}
                onRemoveList={this.handleRemoveList}
                isCollapsed={isCollapsed}
              />
            </li>
          ),
          )}
        </ul>
        {children}
      </div>
    );
  }
}

SideBar.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.instanceOf(ToDo)).isRequired,
  onTodoSelect: PropTypes.func.isRequired,
  onRemoveList: PropTypes.func.isRequired,
  onToggle: PropTypes.func,
  isCollapsed: PropTypes.bool.isRequired,
};

SideBar.defaultProps = {
  onToggle: false,
};

export default SideBar;
