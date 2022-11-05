import React, {memo} from "react";
import PropTypes from "prop-types";

const Banner = memo((props) => {
    const {src} = props
    return (
        <div className="banner">
            <img src={src} alt=""/>
        </div>
    );
})

Banner.prototype = {
    src: PropTypes.string
}

export default Banner;