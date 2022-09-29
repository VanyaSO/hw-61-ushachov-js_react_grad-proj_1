import React from "react"
import Header from "../../../hw-61-ushachov-js_react_grad-proj_1/my-app/src/components/header/Header"
import Banner from "../../../hw-61-ushachov-js_react_grad-proj_1/my-app/src/components/main/Banner"
import Catalog from "../../../hw-61-ushachov-js_react_grad-proj_1/my-app/src/components/main/catalog/Catalog"

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }

  fetchFilters = async () => {
    const res = await fetch('https://61f5558a62f1e300173c40f3.mockapi.io/products');
    const data =  await res.json();
    this.setState({products: data});
  }

  componentDidMount(){
    this.fetchFilters();
  }

  render() {
    return (
        <div className="App">
          <header className="header">
            <Header/>
          </header>

          <main>
            <Banner src={`./image/banner.jpeg`}/>
            <Catalog className="catalog" products={this.state.products}/>
          </main>
        </div>
    );
  }


}

export default App;
