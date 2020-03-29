import React from 'react';
import PropTypes from 'prop-types';
import './ToDoItem.css'
import { TiDelete } from 'react-icons/ti';
import {BsXSquareFill} from 'react-icons/bs';


class ToDoItem extends React.Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.state = {isChecked: false}
    }

    handleChange(event){        
        this.setState({isChecked: event.target.checked });        
    }

    handleRemoveItem(){
        this.props.onRemoveItem(this.props.id)
    }

    render () {
        return (
            <div className='row'>
                <div className='col'>
                    <input data-testid='checkbox' type="checkbox" id={this.props.id} value={this.props.name} onChange={this.handleChange}></input>
                    <label data-testid='label' className={this.state.isChecked? "item-complete" : "item-not-complete"} htmlFor={this.props.name}>{this.props.name}</label>
                    <BsXSquareFill data-testid='remove-icon' id={this.props.id} onClick={this.handleRemoveItem} />
                </div>          
            </div>
        )
    };
}

ToDoItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onRemoveItem: PropTypes.func.isRequired
}

export default ToDoItem;