import React from 'react';
import PropTypes from 'prop-types';

class ToDoItem extends React.Component{
    render () {
        return (
            <div>          
                <input data-testid='checkbox' type="checkbox" id={this.props.id} value={this.props.name}></input>
                <label data-testid='label' className="h6" htmlFor={this.props.name}>{this.props.name}</label>
            </div>
        )
    };
}

ToDoItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
}

export default ToDoItem;