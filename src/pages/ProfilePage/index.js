import React, { PropTypes } from 'react';
import {browserHistory as history} from 'react-router';
import "./Profile.css";
// import "SearchPage/index.js";
import KeyWord from "../KeyWord";
import Sentiment from "../Sentiment";
import Timeline from "../Timeline"

class Profile extends React.Component {
    constructor(props){
      super(props);
    this.state={
      showGraphSentiment: false,
      showGraphKeyWord: false,
      showGraphTimeline: false,
      button1: true,
      button2: true,
      button3: true
    }
}

componentDidMount(){
  this.fetchAll()
}

componentDidUpdate(prevProps){
  if (prevProps.params.screen_name != this.props.params.screen_name){
    this.fetchAll();
  }
}

fetchAll = () => {
    fetch(`https://infinite-everglades-64546.herokuapp.com/statuses/user_timeline?screen_name=${this.props.params.screen_name}`)
      .then((raw) => raw.json())
      .then((res) => {
        console.log('res', res)
        this.setState({
          tweets: res
        })
      })

    fetch(`https://infinite-everglades-64546.herokuapp.com/users/show?screen_name=${this.props.params.screen_name}`)
      .then((raw) => raw.json())
      .then((res) => {
        console.log('res', res)

        this.setState({
          profile: res.data,
          date: "Joined "+res.data.created_at.split(' ')[1]+' '+res.data.created_at.split(' ')[5]
        })
      })
}
  _handleClick1 = (e) => {
    e.preventDefault();
    console.log("hello")
    this.setState({
      showGraphSentiment: !this.state.showGraphSentiment,
      button2: !this.state.button2,
      button3: !this.state.button3
    })
  }


  _handleClick2 = (e) => {
    e.preventDefault();
    console.log("hello")
    this.setState({
      showGraphTimeline: !this.state.showGraphTimeline,
      button1: !this.state.button1,
      button3: !this.state.button3
    })
  }

  _handleClick3 = (e) => {
    e.preventDefault();
    console.log("hello")
    this.setState({
      showGraphKeyWord: !this.state.showGraphKeyWord,
      button1: !this.state.button1,
      button2: !this.state.button2
      })
  }
  _handleSubmit=()=>{
      history.push(`/search/${this.refs.newUsername.value}/profile`)
      this.fetchAll()
  }

  render () {

    if (!this.state.profile | !this.state.tweets) {
      return (
        <div className = "user-page">LOADING...</div>
      );
    }
    return(
      <div>
        <div className = "header">
          <div className = "headerContent">
            <div className = "left">
              <div className = 'imageContainerContainer'>
              <div className = "imageContainer">
                <img className = "avatarImage" src={this.state.profile.profile_image_url_https}/>
              </div>
              </div>
              <div className = "nameVerified">
              </div>
              <p className = "name">{this.state.profile.name}</p>
            {this.state.profile.verified ? <i class="fa fa-check-circle"></i> : null}
              <div className = "userText">
                <p className = "nameUser">@{this.state.profile.screen_name}</p>
              <p className = "description">{this.state.profile.description}</p>
              <div className = 'dateJoined'>
                <i className="fa fa-calendar"></i>
                <p>{this.state.date}</p>
              </div>
             </div>
            </div>
            <div className = "right">
              <div className = "rightBottom">
                <div className = "searchBar">
                  <input className="inputPro" type="text" placeholder="username" ref="newUsername"></input>
                  <button className="butPro" onClick={this._handleSubmit}>Search</button>
                </div>
              </div>
              <div className = "rightTop">
                <div className = "rightStats">
                  <p>Tweets</p>
                  <p>{this.state.profile.statuses_count}</p>
                </div>
                <div className = "rightStats">
                  <p>Following</p>
                <p>{this.state.profile.friends_count}</p>
                </div>
                <div className = "rightStats">
                  <p>Followers</p>
                <p>{this.state.profile.followers_count}</p>
                </div>
                <div className = "rightStats">
                  <p>Likes</p>
                  <p>{this.state.profile.favourites_count}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
          <div className="profile-container">
             <div className="profile-header">
              <img className="profile-photo" />
            </div>
            <div className="profile-lower">
              {this.state.button1 ? <button className = 'profile-button1' onClick={this._handleClick1}>
                    <span className="bigWord">Sentiment</span>
                    <span className = "profile-button1-label"></span>
                    </button>:null}
              {this.state.showGraphSentiment ? <Sentiment />:null}
              {this.state.button2 ? <button className = 'profile-button2' onClick={this._handleClick2}>
                    <span className="bigWord">Timeline</span>
                  <span className = "profile-button2-label"></span>
                    </button>:null}
              {this.state.showGraphTimeline ? <Timeline />:null}
              {this.state.button3 ? <button className = 'profile-button3' onClick={this._handleClick3}>
                  <span className="bigWord">KeyWord</span>
                <span className = "profile-button3-label"></span>
                    </button>:null}
              {this.state.showGraphKeyWord ? <KeyWord />:null}
            </div>
            </div>
          </div>
    );
  };
}

export default Profile;
