/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import ToDo from '../../modules/ToDo';
import ListNavItem from '../ListNavItem/ListNavItem';
import './NavBar.css';

class NavBar extends React.Component {
  render() {
    return (
      <nav data-testid="navbar" className="navbar navbar-expand-md navbar-dark bg-dark">
        <span data-testid="navbar-brand" className="navbar-brand">To Do</span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul data-testid="todo-name-list" className="navbar-nav mr-auto">
            <li className="nav-item dropdown bg-transparent">
              <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Your Lists
              </a>
              <div className="dropdown-menu text-light bg-dark" aria-labelledby="navbarDropdown">
                <div data-testid="todo-name-dropdown" className="dropdown-content">
                  {todos.map((todo) => <ListNavItem key={`${todo.name}-${todo.id}`} id={todo.id} name={todo.name} onSelect={this.handleSelectList} onRemoveList={this.handleRemoveList} />,
                  )}
                </div>
              </div>
            </li>
          </ul>

          <form className="form-inline my-2 my-lg-0" onSubmit={this.props.onNewList}>
            <input className="form-control mr-sm-2 bg-transparent text-light" placeholder="My new ToDo list" id="newTodoList" onChange={this.props.onTodoNameChange} value={this.props.newTodoName} />
            <button className="btn btn-outline-light my-2 my-sm-0">Add list</button>
          </form>

        </div> */}
      </nav>
    );
  }
}


export default NavBar;
