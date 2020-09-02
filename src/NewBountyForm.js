import React, { Component } from 'react'

class NewBountyForm extends Component {

        state={
            name: this.props.current.name || '',
            wantedFor: this.props.current.wantedFor || '',
            client: this.props.current.client || '',
            ship: this.props.current.ship || '',
            captured: this.props.current.captured || false,
            id: this.props.current._id || '',

        }

        submitForm = (e) => {
            e.preventDefault()
            let whichMethod = this.state.id?'PUT':'POST'
            fetch('http://localhost:8000/bounties/'+this.state.id, {
                method: whichMethod,
                body:JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response=>response.json())
            .then(results=>{
                this.setState({
                    name: '',
                    wantedFor: '',
                    client: '',
                    reward: 0,
                    ship: '',
                    captured: false
                }, ()=>{
                    this.props.refreshBounties()
                })

            })
            .catch(err =>{
                console.log('Error in fetch for submit form:', err)
            })
        }

        storeInput = (e) => {
            if(e.target.name === 'captured') {
                this.setState({capture: e.target.checked})
            } else {
                this.setState({ [e.target.name]: e.target.value })
            }
        }

        render(){

        return(
          <div className='bounty-form'>
              <h2>{this.state.id?'Edit Bounty':'Add New Bounty'}</h2>
              <form onSubmit={this.submitForm}>
                  <div>
                      <label htmlFor="name">Name:</label>
                      <input name="name" onChange={this.storeInput}
                      value={this.state.name}/>
                  </div>
                  <div>
                      <label htmlFor="wantedFor">Wanted For:</label>
                      <input name="wantedFor" onChange={this.storeInput}
                      value={this.state.wantedFor}/>
                  </div>
                  <div>
                      <label htmlFor="client">Client:</label>
                      <input name="client" onChange={this.storeInput}
                      value={this.state.client}/>
                  </div>
                  <div>
                      <label htmlFor="ship">Ship:</label>
                      <input name="ship" onChange={this.storeInput}
                      value={this.state.ship}/>
                  </div>
                  <div>
                      <label htmlFor="reward">Reward:</label>
                      <input name="reward" onChange={this.storeInput}
                      value={this.state.reward}/>
                  </div>
                  <div>
                        <label htmlFor="captured">Captured:</label>
                        <input type="checkbox" name="captured"
                        onChange={this.storeInput} checked={this.state.captured?"checked":""}/>
                    </div>
                 <input type="submit" value="Bountify!" />
              </form>
          </div>
        )
    }
}

export default NewBountyForm
