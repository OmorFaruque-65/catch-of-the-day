import React, { Component } from 'react'
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'
import sampleFishes from '../sample-fishes'
import Fish from '../components/Fish'
import base from '../base'

class App extends Component {
  state = {
    fishes: {},
    order: {}
  }

  componentDidMount() {
    const {
      params
    } = this.props.match
    //first reinstate our localstorage
    const localstorageRef = localStorage.getItem(params.storeId)
    if (localstorageRef) {
      this.setState({
        order: JSON.parse(localstorageRef)
      })
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    })
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    )
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  addFish = (fish) => {
    //Take a copy of the existing state
    const fishes = {
      ...this.state.fishes
    }
    console.log(fishes)
    //Add our new fish to this fishes variable
    fishes[`fish${Date.now()}`] = fish
    //Set the new fishes obj to state
    this.setState({
      fishes: fishes
    })
  }

  updateFish = (key, updatedFish) => {
    const fishes = {
      ...this.state.fishes
    }
    fishes[key] = updatedFish
    this.setState({
      fishes: fishes
    })
  }

  deleteFish = key => {
    const fishes = {
      ...this.state.fishes
    }
    fishes[key] = null
    this.setState({
      fishes: fishes
    })
  }

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder = key => {
    //take a copy of state obj to a variable
    const order = {
      ...this.state.order
    }
    //add order or update order(if already added)
    order[key] = order[key] + 1 || 1
    //call setState to update state obj
    this.setState({
      order: order
    })
  }

  deleteFromOrder = key => {
    const order = {
      ...this.state.order
    }
    delete order[key]
    this.setState({
      order: order
    })
  }

  render() {
    return (
      <div className = 'catch-of-the-day'>
        <div className = 'menu'>
          <Header tagline = 'Fresh Seafood Market'/>
            <ul className = 'fishes'>
              {Object.keys(this.state.fishes)
                .map(key =>
                  (<Fish key = {key} index = {key} details ={this.state.fishes[key]} addToOrder = {this.addToOrder}/>)
                )}
            </ul>
        </div>
        <Order
          fishes = {this.state.fishes}
          order = {this.state.order}
          deleteFromOrder = {this.deleteFromOrder}
        />
        <Inventory
          addFish = {this.addFish}
          loadSampleFishes = {this.loadSampleFishes}
          fishes = {this.state.fishes}
          updateFish = {this.updateFish}
          deleteFish = {this.deleteFish}
          storeId = {this.props.match.params.storeId}
        />
      </div>
      )
    }
  }

  export default App