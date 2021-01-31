import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }
  
  findPets=()=>{
    let URL="/api/pets";
    if(this.state.filters.type!=='all'){
      URL=URL+`?type=${this.state.filters.type}`}
    
    fetch(URL)
    .then(res=>res.json())
    .then(data=>this.setState({pets:data}))
  }
  
  changeType=(e)=>{
    this.setState({filters:{...this.state.filters,type:e.event.target}})
  }
  
  
  onAdoptPet=(idx)=>{
  const newpets= this.state.pets.map(pet=>{
  return pet.id === idx ? { ...pet, isAdopted: true } : pet
  })
  this.setState({ pets: newpets })
  }
  


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters  onChangeType={this.changeType} 
                        onFindPetsClick={this.findPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} 
                          onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
