import React from 'react';

class ToDoItem extends React.Component{
    render () {
        return (
            <div>          
                <input type="checkbox" id={this.props.id} value={this.props.name}></input>
                <label className="h6" htmlFor={this.props.name}>{this.props.name}</label>
            </div>
        )
    };
}

export default ToDoItem;