import React from 'react';
import ReactDOM from 'react-dom';
import Product from './components/product';
import axios from 'axios';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }

  componentDidMount = async () => {
    const { data } = await axios.get("https://pokeapi.co/api/v2/item/");
    const promises = data.results.map(async ({ url }) => await axios.get(url));
    const responses = await Promise.all(promises);
    let products = responses.map(({ data }) => data);
    this.setState({
      products: products
    });
  }

  render = () => {
    return (
      <div id="app">
        <h1 id="header">PokeMart</h1>
        <div id="body">
          <div id="products">
            {this.state.products.map(product => <Product product={product} />)}
          </div>
          <div>
            <h1>Carrinho</h1>
          </div>
        </div>
      </div>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));