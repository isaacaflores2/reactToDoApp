import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

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
            <div className="sidebar-sticky">
                <ul className="nav flex-column">    
                    {todos.map((todo) =>
                        <li className="nav-item" key={todo.id} id={todo.id} onClick={this.handleTodoNavSelect}>
                            {todo.name} 
                        </li>
                    )}
                </ul>
            </div>
        )
    };
}

export default SideNav;