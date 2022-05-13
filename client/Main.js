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

  render () {
    
    console.log(this.state.products)
    return (
      <div id='main' className='row container'>
        <div className='container'>
          "hello"
          <h2>{this.state.products[0].name}</h2>
        </div>
      </div>
    )
  }
}