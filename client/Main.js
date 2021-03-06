import React, { Component } from "react";
import axios from "axios";

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
    this.deleteProduct = this.deleteProduct.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this)
    this.handleSubmitWarehouse = this.handleSubmitWarehouse.bind(this)
  }

  async componentDidMount() {
    const { data } = await axios.get("/api/products");
    this.setState({
      products: data,
    });
  }

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
                <div>
                  * Edit Product
                  <div>
                    <form
                      id='product-edit-form'
                      onSubmit={this.handleSubmitEdit}
                    >
                      <label htmlFor="productId">Id:</label>
                      <input type="text" id="productId" name="productId" value={product.id} readOnly /><br></br>
                      <label htmlFor='productPrice'>Product Name:</label>
                      <input name='productName' />
                      <label htmlFor='productPrice'>Product Price:</label>
                      <input name='productPrice' />
                      <label htmlFor='productDescription'>
                        Product Description:{" "}
                      </label>
                      <input name='productDescription' />
                      <label htmlFor='productQuantity'>
                        Product Quantity:{" "}
                      </label>
                      <input name='productQuantity' />
                      <label htmlFor='productImageURL'>
                        Product Image URL:{" "}
                      </label>
                      <input name='productImageURL' />

                      <button type='submit'> Submit Edit</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ));
      }
    }
  }

  async handleSubmit(event) {
    
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
    };
    const updatedProduct = await axios.post(`/api/products`, newProduct);
    
    try {
      if (!updatedProduct){
        var newProducts= this.state.products.concat([updatedProduct]);  
        this.setState({products: newProducts}, 
        console.log(this.state.products));
      
      }
    } catch (error){
      this.setState({ errorMessage: error.message });
      console.error('There was an error!', error);
    }  

    event.preventDefault();
  }

  async handleSubmitEdit(event) {
    const id = event.target.productId.value;
    const name = event.target.productName.value;
    const price = event.target.productPrice.value;
    const description = event.target.productDescription.value;
    const quantity = event.target.productQuantity.value;
    const imageURL = event.target.productImageURL.value;
    const newProduct = {
      id,
      name,
      price,
      description,
      quantity,
      imageURL,
    };
    const updatedProduct = await axios.put(`/api/products/${id}`, newProduct);
    
    try {
      if (!updatedProduct){
        var newProducts= this.state.products.concat([updatedProduct]);  
        this.setState({products: newProducts}, 
        console.log(this.state.products));
      
      }
    } catch (error){
      this.setState({ errorMessage: error.message });
      console.error('There was an error!', error);
    }  
    
    event.preventDefault();

  }

  async handleSubmitWarehouse (event) {
    const location = event.target.contentLocation.value;
    const newWarehouse = await axios.post(`/api/warehouse`, {location});
    try {
      if (!newWarehouse){
        this.setState({}, 
        console.log(this.state.products));
      
      }
    } catch (error){
      this.setState({ errorMessage: error.message });
      console.error('There was an error!', error);
    } 

    event.preventDefault();

  }

  render() {
    return (
      <div id='main' className='row container'>
        <div className='container'>
          <h3>Products List: {this.renderProducts()} </h3>
          <div>
            ----------------------------------------------------------------
          </div>
          <h2> ADD NEW WAREHOUSE</h2>
          <form id='new-warehouse-form' onSubmit={this.handleSubmitWarehouse}>
            <div className='input-warehouse-form'>
              <input
                className='form-control-wh'
                type='text'
                name='contentLocation'
                placeholder='New Warehouse location...    '
              />
              <span className='input-group-btn-wh'>
                <button className='button' type='submit'>
                  Submit!
                </button>
              </span>
            </div>
          </form>
          <h2> ADD NEW PRODUCT </h2>
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
