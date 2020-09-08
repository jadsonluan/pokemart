import React from 'react';
import ReactDOM from 'react-dom';
import Product from './components/product';
import axios from 'axios';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      productSearched: ''
    }
  }

  componentDidMount = async () => {
    const { data } = await axios.get("https://pokeapi.co/api/v2/item/");
    const promises = data.results.map(async ({ url }) => await axios.get(url));
    const responses = await Promise.all(promises);
    let products = responses.map(({ data }) => data);
    products = products.map(product => {
      let { name } = product.names.filter(({ language }) => language.name === 'en')[0];
      let { text } = product.flavor_text_entries.filter(({ language }) => language.name === 'en')[0];

      return {
        img: product.sprites.default,
        name,
        description: text.replace('\n', ' ')
      }
    })
    this.setState({
      products: products
    });
  }

  handleChange = (ev) => {
    let { name, value } = ev.target;
    this.setState({
      [name]: value
    })
  }

  render = () => {
    return (
      <div id="app">
        <header id="header">
          <h1>PokeMart</h1>
          <input type="text" name="productSearched" onChange={this.handleChange}></input>
        </header>

        <div id="body">
          <div id="products">
            {this.state.products
              .filter(({ name }) => name.toLowerCase().includes(this.state.productSearched.toLowerCase()))
              .map((product, idx) => <Product key={idx} product={product} />)
            }
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