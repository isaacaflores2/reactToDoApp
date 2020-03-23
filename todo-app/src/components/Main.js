import React from 'react';

class Main extends React.Component{
    render(){
        return(
            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                {this.props.children}
            </main>
        )
    };
}

export default Main;