import React from 'react';
import ToDoItem from "./ToDoItem";

class TodoList extends React.Component{

    constructor(props){
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);        
        this.handleNewItem = this.handleNewItem.bind(this);
        this.state = {items: [], itemText: ''};
    }

    handleTextChange(event){
        this.setState({itemText: event.target.value});
    }

    handleNewItem(event){
        event.preventDefault();

        if(this.state.itemText.length === 0){
            return; 
        }

        const newItem = this.state.itemText;
        
        this.setState( state => ({
            items: state.items.concat(newItem),
            itemText: ''
        }) );

        this.props.onNewItem(this.props.id, newItem);
    }


    render(){
        return(           
            <div>
                <header>
                    <h1>{this.props.todo.name}</h1>
                </header>
    
                {this.props.todo.items.map((item,i) => 
                        <ToDoItem key={item} name={item} id={i}/>                
                )}
                <form onSubmit={this.handleNewItem}>
                    <label htmlFor="newItem"/>
                    <input id="newItem" onChange={this.handleTextChange} value={this.state.itemText}/>
                    <button>Add</button>
                </form>  
    
            </div>
        )
    }
}

export default TodoList;