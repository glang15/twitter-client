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

    // this._handleClick = this._handleClick.bind(this);
    this.state={
      showGraphSentiment: false,
      showGraphKeyWord: false,
      showGraphTimeline: false
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
    })
    document.getElementsByClassName("profile-button2")[0].style.display ="none"
    document.getElementsByClassName("profile-button3")[0].style.display ="none"
// alert("hello")
  }

  _handleClick2 = (e) => {
    e.preventDefault();
    console.log("hello")
    this.setState({
      showGraphTimeline: !this.state.showGraphTimeline,
    })
    document.getElementsByClassName("profile-button1")[0].style.display ="none"
    document.getElementsByClassName("profile-button3")[0].style.display ="none"
    // alert("sup")
  }

  _handleClick3 = (e) => {
    e.preventDefault();
    console.log("hello")
    this.setState({
      showGraphKeyWord: !this.state.showGraphKeyWord,
      })
      document.getElementsByClassName("profile-button1")[0].style.display ="none"
      document.getElementsByClassName("profile-button2")[0].style.display ="none"

    // alert("hi")

  }

  // _hideButtons1 = () =>{
  //   alert("hello")
  //   document.getElementByClassName("profile-button2").style.display = "none"
  // }
  // _hideButtons2 = () =>{
  //   document.getElementByClassName("profile-button1").style.display = "none"
  // }
  // _hideButtons3 = () =>{
    // document.getElementByClassName("profile-button1").style.display ="none"
  // }

  _handleSubmit=()=>{
      history.push(`/search/${this.refs.newUsername.value}/profile`)
      this.fetchAll()
  }

  render () {

    if (!this.state.profile | !this.state.tweets) {
      return (<div className = "user-page">LOADING...</div>);
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
              <div className='profile-buttons'>
                  <button className='profile-button1' onClick={this._handleClick1}>
                    <span className="bigWord">Sentiment</span>
                    <span className="profile-button1-label"> </span>
                    </button>
                    {this.state.showGraphSentiment ? <Sentiment />: null }
                  <button className='profile-button2' onClick={this._handleClick2}>
                    <span>Timeline</span>
                  {this.state.showGraphTimeline  ? <Timeline />: null }

                  </button>
                  <button className='profile-button3' onClick={this._handleClick3}>
                  {/* {this.state.button1 && this.state.button2 ? null: this._hideButtons3} */}
                  {this.state.showGraphKeyWord ? <KeyWord />: null}
                    <span>Keywords</span>

                  </button>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default Profile;
