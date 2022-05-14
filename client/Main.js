import React, { Component } from 'react'
import axios from 'axios'




export default class Main extends React.Component {
  constructor () {
    super()
    this.state = {
      products: []
    }
  }

  async componentDidMount () {
    const {data} = await axios.get('/api/products')
    this.setState({
      products: data
    })
    console.log(this.state.products, 'state in component')
  }

//   pickAlbum (albumId) {
//     return async () => {
//       const {data} = await axios.get(`/api/albums/${albumId}`)
//       this.setState({
//         selectedAlbum: data
//       })
//     }
//   }

//   deselectAlbum () {
//     this.setState({
//       selectedAlbum: {}
//     })
//   }

renderProducts() {    
  if (this.state.products) {
    if (this.state.products.length === 0) {
      return <div>'No products yet!'</div>;
    } else {
      return this.state.products.map((product) => (
        <div className="product" key={product.id}>
            <h3>{product.name}</h3>
        </div>
      ));
    }
  }
}

  render () {
        return (
      <div id='main' className='row container'>
        <div className='container'>
        <h3>Products List: {this.renderProducts()} </h3>
        </div>
      </div>
    )
  }
}