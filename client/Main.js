import React, { Component } from "react";
import axios from "axios";

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
    this.deleteProduct = this.deleteProduct.bind(this)
  }

  async componentDidMount() {
    const { data } = await axios.get("/api/products");
    this.setState({
      products: data,
    });
    console.log(this.state.products, "state in component");
  }

  //   pickAlbum (albumId) {
  //     return async () => {
  //       const {data} = await axios.get(`/api/albums/${albumId}`)
  //       this.setState({
  //         selectedAlbum: data
  //       })
  //     }
  //   }

    deleteProduct (productId) {
      return async () => {
        const currentProducts = this.state.products;
        this.setState({
          products: currentProducts.filter(product => product.id !== productId)
        })
        axios
      .delete(`/api/products/${productId}`, this.state)
      .then(response => {
        if (response.status === 'error') {
          this.setState({
            products: currentProducts,
          });

          return 'error'
        } else {

          return 'successfuly removed'

        }        
      });
  
    }
  }
    

  renderProducts() {
    if (this.state.products) {
      if (this.state.products.length === 0) {
        return <div>'No products yet!'</div>;
      } else {
        return this.state.products.map((product) => (
          <div className='product' key={product.id}>
            <div>
              <h4>{product.name}</h4>
              <div>
                {product.price}
                <div>
                  <img src={product.imageUrl} />
                  <div>{product.description}</div>
                </div>
                <button
                  type='button'
                  className='remove'
                  onClick={this.deleteProduct(product.id)}
                >
                  x delete product  
                </button>
              </div>
            </div>
          </div>
        ));
      }
    }
  }

  render() {
    return (
      <div id='main' className='row container'>
        <div className='container'>
          <h3>Products List: {this.renderProducts()} </h3>
        </div>
      </div>
    );
  }
}
