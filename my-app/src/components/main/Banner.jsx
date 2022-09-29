import React from "react";

class Header extends React.Component{

    render() {
        return (
            <div className="banner">
                <img src={this.props.src} alt=""/>
            </div>
        );
    }


}

export default Header;