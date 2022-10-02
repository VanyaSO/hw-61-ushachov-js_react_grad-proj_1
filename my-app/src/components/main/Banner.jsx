import React from "react";

class Banner extends React.Component{

    render() {
        return (
            <div className="banner">
                <img src={this.props.src} alt=""/>
            </div>
        );
    }


}

export default Banner;