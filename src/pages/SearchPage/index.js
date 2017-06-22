import React, { Component } from 'react';
import './Search.css';
import {browserHistory as history } from 'react-router';
import Profile from '../ProfilePage';

class Search extends Component {
  constructor(props) {
    super(props);

    // Why do we need to do this?? Make sure you understand!!!
    this._handleSubmit = this._handleSubmit.bind(this);
  }
  // constructor(props){
  //   super(props)
  //   this.state={
  //     data: []
  //   }
  // }


  // fetchData = () =>{
  //   fetch(`https://infinite-everglades-64546.herokuapp.com/users/show?screen_name=${this.refs.screen_name.value}`)
  //     .then((raw) => raw.json())
  //      .then((res) => {
  //       console.log('res', res)
  //       this.setState({
  //         data: res
  //       })
  // })
// }
_handleSubmit() {
    history.push(`/search/${this.refs.screen_name.value}/profile`)
    // return(<Profile name = {this.refs.screen_name.value}/>)
}

  render() {
    return (

      <div className="search-container">
        {/* {this.state.data.length > 0 ?  <Profile data= {this.state.data}/>: null} */}
       <div className="search-content-container">
            <div className="search-content">
                <p className="search-title">TWITTER DATA<i className="fa fa-twitter"></i></p>
                <p className="search-description">ENTER A PUBLIC USERNAME FOR ACCOUNT DATA</p>
                <div className="search-button-input">
                  <input className="search-form" type="text" ref="screen_name" placeholder="USERNAME"></input>
                <button onClick={this._handleSubmit} className="search-button">ENTER</button>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default Search
