import React from 'react';
import '../styles/product.scss';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      front: true
    }
  }

  flip = () => {
    this.setState({ front: !this.state.front })
  }

  render = () => {
    let product;
    if (this.state.front) {
      product = (
        <div className="front" >
          <div className="imgContainer">
            <img src={this.props.product.img} alt="master ball"></img>
          </div>
          <h1>{this.props.product.name}</h1>
          <div className="info" onClick={this.flip}></div>
        </div>
      )
    } else {
      product = (
        <div className="back" onClick={this.flip}>
          <p className="description">{this.props.product.description}</p>
        </div>
      )
    }

    return (<div className="product"> {product} </div>)
  }
}

export default Product;