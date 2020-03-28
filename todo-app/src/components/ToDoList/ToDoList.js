import React from 'react';
import ToDoItem from "../ToDoItem/ToDoItem";
import ToDo from '../../modules/ToDo';
import PropTypes from 'prop-types';

class ToDoList extends React.Component{

    constructor(props){
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);        
        this.handleNewItem = this.handleNewItem.bind(this);

        this.state = {itemText: ''};
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
            itemText: ''
        }) );

        this.props.onNewItem(this.props.id, newItem);
    }

    render(){
        return(           
            <div>   
                <header data-testid='todolist-header'>
                    <h1>{this.props.todo.name}</h1>
                </header>
                
                {this.props.todo.items.map((item,i) => 
                    <ToDoItem key={item} name={item} id={i}/>                
                )}

                <form data-testid='list-form' onSubmit={this.handleNewItem}>
                    <label htmlFor="newItem"/>
                    <input className="form-control-sm bg-transparent" placeholder="New item" id="newItem" onChange={(this.handleTextChange)} value={this.state.itemText}/>
                    <button data-testid='new-item-button' type="submit" className="btn btn-light">Add</button>
                </form>  
    
            </div>
        )
    }
}

ToDoList.propTypes = {
    id: PropTypes.number.isRequired,
    todo: PropTypes.instanceOf(ToDo).isRequired
};

export default ToDoList;