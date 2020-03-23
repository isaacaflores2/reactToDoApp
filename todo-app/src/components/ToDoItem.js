import React from "react";

function ToDoItem ({name, id}){
    return (
        <div>          
            <input type="checkbox" id={id} value={name}></input>
            <label className="h6" htmlFor={name}>{name}</label>
        </div>
    )
}

export default ToDoItem;