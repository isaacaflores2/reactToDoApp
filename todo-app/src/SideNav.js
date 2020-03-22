import React from "react";

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
            <nav class="col-md-2 d-none d-md-block bg-dark text-light sidebar">
                <div class="sidebar-sticky">
                <h6 class="nav-link text-light pl-3">My Lists</h6>
                    <ul class="nav flex-column">
                        {todos.map((todo) =>
                            <li className="nav-item pl-3 text-light" key={todo.id} id={todo.id} onClick={this.handleTodoNavSelect}>
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