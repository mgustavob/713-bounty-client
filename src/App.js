import React, {Component} from 'react';
import './App.css';
import Poster from './Poster'
import ShowBounty from './ShowBounty'
import NewBountyForm from './NewBountyForm'

class App extends Component {
  state= {
    bounties: [],
    current: {},
    showForm: false
  }

  //fires as soon as the component loads to the DOM
  // standard place to make fetch calls to retrieve data
  // from third parties
  componentDidMount() {
    this.getBounties()
  }

  getBounties = () => {
    fetch('http://localhost:8000/bounties')
    .then(response=>{
      return response.json()
    })
    .then(bounties=>{
      console.log(bounties)
      this.setState({bounties: bounties, current: {}})
    })
    .catch(err=>{
      console.log('Error while fetching bounties', err)
    })
  }

  changeCurrent = (bounty) => {
    console.log("Changen Current just fire")
    this.setState({
      current: bounty,
      showForm: false
    })
  }

  toggleForm = () => {
    this.setState({showForm: !this.state.showForm})
  }

  render() {
    let posters = this.state.bounties.map((bounty, i)=>{
      return (<Poster key={i}
        bounty={bounty}
        changeCurrent={this.changeCurrent}
        currentId={this.state.current._id}
        refreshBounties={this.getBounties}
        />)
    })
    return(
      <div className="App">
        <header className="App-Header">
          <h1>Wanted Poster Bulletin Board</h1>
          <p>Reduce crime in your galaxy!</p>
        </header>
        <main>
          {posters}
          <ShowBounty current={this.state.current}
          refreshBounties={this.getBounties}
          showForm={this.state.showForm}
          toggleForm={this.toggleForm} />
          <NewBountyForm current={this.state.current} refreshBounties={this.getBounties} />
        </main>
      </div>
    )
  }
}

export default App;
