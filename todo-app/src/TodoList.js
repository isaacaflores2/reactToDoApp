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

        const newItem = this.state.itemText;
        this.setState( state => ({
            items: state.items.concat(newItem),
            itemText: ''
        }) );
    }


    render(){
        const items = this.state.items;
        return(           
            <div>
                <header>
                    <h1>{this.props.name}</h1>
                </header>
    
                {items.map((item,i) => 
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