import React from "react"
import Header from "./components/header/Header"
import Banner from "./components/main/Banner"
import Catalog from "./components/main/catalog/Catalog"

function App(){
    return (
        <div className="App">
        <header className="header">
            <Header/>
        </header>

        <main>
            <Banner src={`./image/banner.jpeg`}/>
            <Catalog className="catalog"/>
        </main>
        </div>
    );
}

export default App;
