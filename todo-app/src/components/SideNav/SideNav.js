import React from 'react';

class SideNav extends React.Component{
    constructor(props){
        super(props);
        this.handleTodoNavSelect = this.handleTodoNavSelect.bind(this); 
    }

    handleTodoNavSelect(event){
        event.preventDefault();
        this.props.onTodoSelect(event.target.id);
    }

    render(){
        const todos = this.props.todos;
        return(
            <nav className="col-md-2 d-none d-md-block bg-dark text-light sidebar">
                <div className="sidebar-sticky">
                <h6 className="nav-link text-light pl-3">My Lists</h6>
                    <ul data-testid='todo-name-list' className="nav flex-column list-group">
                        {todos.map((todo) =>
                            <li className="list-group-item list-group-item-action pl-3 text-light bg-dark" key={todo.id} id={todo.id} onClick={this.handleTodoNavSelect}>
                                {todo.name} 
                            </li>
                        )}
                        {this.props.children}
                    </ul>
                </div>
            </nav>
        )
    };
}

export default SideNav;