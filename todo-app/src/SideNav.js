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
            <div>
                <ul>
                    {todos.map((todo) =>
                        <li key={todo.id} id={todo.id} onClick={this.handleTodoNavSelect}>
                            {todo.name} 
                        </li>
                    )}
                </ul>
            </div>
        )
    };
}

export default SideNav;