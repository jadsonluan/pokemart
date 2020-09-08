import React from 'react';
import '../styles/product.scss';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = { front: true }
  }

  flip = () => {
    this.setState({ front: !this.state.front })
  }

  render = () => {
    let product;
    if (this.state.front) {
      product = (
        <div className="front" onClick={this.flip}>
          <img src={this.props.product.sprites.default} alt="master ball"></img>
          <h1>{this.props.product.names[7].name}</h1>
        </div>
      )
    } else {
      product = (
        <div className="back" onClick={this.flip}>
          <p className="description">{this.props.product.flavor_text_entries[0].text}</p>
        </div>
      )
    }

    return (<div className="product"> {product} </div>)
  }
}

export default Product;