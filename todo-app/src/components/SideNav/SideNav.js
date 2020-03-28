import React from 'react';
import ToDo from '../../modules/ToDo';
import PropTypes from 'prop-types';

class SideNav extends React.Component{
    constructor(props){
        super(props);
        this.handleTodoNavSelect = this.handleTodoNavSelect.bind(this); 
    }

    handleTodoNavSelect(event){
        event.preventDefault();
        const id = Number(event.target.id,10);
        this.props.onTodoSelect(id);
    }

    render(){
        const todos = this.props.todos;
        return(
            <nav data-testid='sidenav' className="col-md-2 d-none d-md-block bg-dark text-light sidebar">
                <div className="sidebar-sticky">
                <h6 className="nav-link text-light pl-3">My Lists</h6>
                    <ul data-testid='todo-name-list' className="nav flex-column list-group">
                        {todos.map((todo) =>
                            <li className="list-group-item list-group-item-action pl-3 text-light bg-dark" key={todo.id} id={todo.id} onClick={this.handleTodoNavSelect}>
                                {todo.name} 
                            </li>
                        )}            
                    </ul>
                    {this.props.children}
                </div>
            </nav>
        )
    };
}

SideNav.propTypes = {    
    todos: PropTypes.arrayOf(PropTypes.instanceOf(ToDo)).isRequired
};


export default SideNav;