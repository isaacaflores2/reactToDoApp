import React from 'react';

class NavBar extends React.Component{
    render(){
        return(
            <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a class="navbar-brand col-sm-3 col-md-2 mr-0" >To Do</a>
            </nav>
        )
    };
}

export default NavBar;