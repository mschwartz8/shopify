import React, { Component } from "react";
import axios from "axios";

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
    this.deleteProduct = this.deleteProduct.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
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

  deleteProduct(productId) {
    return async () => {
      const currentProducts = this.state.products;
      this.setState({
        products: currentProducts.filter((product) => product.id !== productId),
      });
      axios
        .delete(`/api/products/${productId}`, this.state)
        .then((response) => {
          if (response.status === "error") {
            this.setState({
              products: currentProducts,
            });

            return "error";
          } else {
            return "successfully removed";
          }
        });
    };
  }

  createProduct(newProduct) {
    return async () => {
      const currentProducts = this.state.products;
      axios.post(`/api/products/}`, this.state, newProduct).then((response) => {
        if (response.status === "error") {
          this.setState({
            products: currentProducts,
          });

          return "error";
        } else {
          return "successfully added";
        }
      });
    };
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
                <button
                  type='button'
                  className='edit'
                  // onClick={this.editProduct(product.id)}
                >
                  * edit product
                </button>
              </div>
            </div>
          </div>
        ));
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = event.target.contentName.value;
    const price = event.target.contentPrice.value;
    const description = event.target.contentDescription.value;
    const quantity = event.target.contentQuantity.value;
    const imageURL = event.target.contentImage.value;
    const newProduct = {
      name,
      price,
      description,
      quantity,
      imageURL,
    }
    return createProduct(newProduct);
  }

  render() {
    return (
      <div id='main' className='row container'>
        <div className='container'>
          <h3>Products List: {this.renderProducts()} </h3>
          <form id='new-product-form' onSubmit={this.handleSubmit}>
            <div className='input-product-form'>
              <input
                className='form-control'
                type='text'
                name='contentName'
                placeholder='New Product title...'
              />
              <input
                className='form-control'
                type='text'
                name='contentPrice'
                placeholder='Price...'
              />
              <input
                className='form-control'
                type='text'
                name='contentQuantity'
                placeholder='quantity...'
              />
              <input
                className='form-control'
                type='text'
                name='contentDescription'
                placeholder='description...'
              />
              <input
                className='form-control'
                type='text'
                name='contentImage'
                placeholder='image URL...'
              />
              <span className='input-group-btn'>
                <button className='btn' type='submit'>
                  Submit!
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
