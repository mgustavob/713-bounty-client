import React, { Component } from 'react'

class Poster extends Component {
    handleDelete = () => {
        fetch('http://localhost:8000/bounties/'+this.props.bounty._id, {
            method: 'DELETE'
        })
        .then(response=> {
            if (response.status !== 204) console.log(response)
            return {}
        })
        .then(()=>{
            this.props.refreshBounties()
        })
        .catch(err =>{
            console.log('ERROR deleting', err)
        })
    }

    render(){
        let more = <button onClick={()=>{this.props.changeCurrent(this.props.bounty)}}>More</button>
        let less = <button onClick={()=>{this.props.changeCurrent({})}}>Less</button>
        let button = this.props.bounty._id === this.props.currentId ? less : more
        return (
            <div className="poster">
                <h2>Wanted</h2>
                <h3>{this.props.bounty.name}</h3>
                <h4>{this.props.bounty.reward}</h4>
                {button}
                <button onClick={this.handleDelete}>Delete</button>
            </div>
        )
    }
}

export default Poster
