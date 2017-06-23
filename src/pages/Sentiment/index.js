import React from 'react';
import {Pie} from 'react-chartjs-2';
import style from './Sentiment.css';

class Sentiment extends React.Component {
  constructor(props){super(props);
  this.state={
    tweets: [],
    sentimentScores: [],
    tweetString: "",
    posScores: [],
    negScores: [],
    neutScores: [],
    pieData: {},
    pieOptions: {}
  }
}
componentDidMount=()=>{
  this.fetchTweets()
}
//Make call to twitter API to set tweets as array of tweet text.
//tweetString is one single string with each tweet seperated by a period.
//The last then makes call to fetchSentiment to retrieve scores.
  fetchTweets = () => {
    fetch(`https://infinite-everglades-64546.herokuapp.com/statuses/user_timeline?screen_name=${this.props.params.screen_name}&count=${200}`)
      .then((raw) => raw.json())
      .then((res) => {
        // console.log('res', res)
        res.data.forEach((twit) => {
          this.setState({
            tweets: this.state.tweets.concat([twit.text]),
            tweetString: this.state.tweetString += twit.text + ". "
          })
        })

        this.fetchSentiment();

      })
  }



  _getScoreType = (sentiment_array) => {

    sentiment_array.forEach((sentiment_obj) => {
      if(sentiment_obj.sentiment.score >= 0.33){
        this.setState({
          posScores: this.state.posScores.concat(sentiment_obj.sentiment.score)
        })
      }else if (sentiment_obj.sentiment.score <= -0.33){
        this.setState({
        negScores: this.state.negScores.concat(sentiment_obj.sentiment.score)
      })
      }else {
        this.setState({
        neutScores: this.state.neutScores.concat(sentiment_obj.sentiment.score)
      })
      }
  })

  setTimeout(() => {
    console.log('this', this.state)
    this.setState({
      pieData: {
        datasets: [{
          data: [this.state.posScores.length, this.state.negScores.length, this.state.neutScores.length],
    backgroundColor: [
		'#009933',
		'#e60000',
		'#0040ff'
		],
		hoverBackgroundColor: [
		'#009933',
		'#e60000',
		'#0040ff'
		]
        }],
        labels: [
          'POS',
          'NEG',
          'NEU'
        ],

      }
    })
  }, 500)

}


  fetchSentiment = () => {
    // console.log(this.state.tweetString);
    fetch(`https://tranquil-plateau-70295.herokuapp.com/getSentiment`,{
      method: "POST",
      body: JSON.stringify({
        text: this.state.tweetString
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((raw) => {
        return raw.json()
      })
      .then((res) => {
        // console.log('res', res)
        this.setState({
          sentimentScores: res.data[1].sentences.slice().sort(function(a,b){
          return a.sentiment.score - b.sentiment.score })
        })
        this._getScoreType(this.state.sentimentScores);

    })

  }

  // tweetCall = () => {
  //     //CODE FOR PIECHART
  //
  //     var pieData = [
  //       {
  //         value: this.state.posScores.length,
  //         color: "#878BB6",
  //         label: 'POS'
  //       },
  //       {
  //         value: this.state.negScores.length,
  //         color: "#4ACAB4",
  //         label: 'NEG'
  //       },
  //       {
  //         value: this.state.neutScores.length,
  //         color: "#FF8153",
  //         label: 'NEU'
  //       }
  //     ];
  //     // pie chart options
  //     var pieOptions = {
  //       legend: true,
  //       segmentShowStroke: false,
  //       animateScale: true
  //     }
  //
  //     this.fetchTweets();

  // }

  render() {
    return (

      <div className = "contentContainer">
      <div className="graph-tweets">

      <Pie data={this.state.pieData}  width={300} height={300} options={{maintainAspectRatio: false}} />
      </div>
      {this.state.sentimentScores.length > 0 ?

        <div className="most-tweets">
          <div className="most-pos">
          <div className="most-posContainer">
          <p>Most positive tweet:</p>
          <p>{this.state.sentimentScores[this.state.sentimentScores.length - 1].text.content.slice(0,-1)}</p>
          </div>
        </div>
          <div className="most-neg">
          <div className ="most-negContainer">
          <p>Most negative tweet:</p>
          <p>{this.state.sentimentScores[0].text.content.slice(0,-1)}</p>
      </div>
      </div>
        </div>

        : <div>LOADING...</div>}
        </div>
    )
  }
}
export default Sentiment;
