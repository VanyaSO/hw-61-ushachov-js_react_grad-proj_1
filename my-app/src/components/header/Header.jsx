import React from "react";
import ShoppingCartIcon from "./Basket"

const Header = () => {

    return (
        <div className="container">
            <div className="header-content">
                <div className="header-logo">
                    <h3>JUDI</h3>
                </div>

                <nav className="header-nav">
                    <ul>
                        <li>
                            <a href="hw-61-ushachov-js_react_grad-proj_1/my-app/src/components/header/Header">Про нас</a>
                        </li>
                        <li>
                            <a href="hw-61-ushachov-js_react_grad-proj_1/my-app/src/components/header/Header">Доставка и оплата</a>
                        </li>
                        <li>
                            <a href="hw-61-ushachov-js_react_grad-proj_1/my-app/src/components/header/Header">Каталог</a>
                        </li>
                    </ul>
                </nav>

                <div className="header-basket">
                    <ShoppingCartIcon/>
                </div>
            </div>
        </div>
    );
}

export default Header;

