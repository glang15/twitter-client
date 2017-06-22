import React from 'react';

var mystring = '';
class KeyWord extends React.Component {
  constructor(props){super(props);
  this.state={
    tweets: [],
    tweetString: '',
    keyWords: []
  }
}

componentDidMount(){
  this.fetchTweets()
}

sortObject = (obj) => {
var arr = [];
for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
        arr.push({
            'key': prop,
            'value': obj[prop]
        });
    }
}
arr.sort(function(a, b) { return b.value - a.value; });
return arr;
}

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
      }).then(() => {
        this.fetchKeyWords(this.state.tweetString, 20);
      })
  }

  fetchKeyWords=(mystring, numofwords) => {
    mystring = mystring.slice().replace(/[\.,-\/!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase();
    var words = mystring.split(' ');
    var sortedWords = words.sort()

    var uniqueWords = {}
    var toIgnore = {
      you: 1,
      the: 1,
      RT: 1,
      rt: 1,
      o: 1,
      ok: 1,
      my: 1,
      not: 1,
      u: 1,
      to: 1,
      so: 1,
      of: 1,
      k: 1,
      but: 1,
      at: 1,
      it: 1,
      its: 1,
      in: 1,
      if: 1,
      im: 1,
      a: 1,
      i: 1,
      and: 1,
      for: 1,
      ur: 1,
      on: 1,
      is: 1,
      do: 1,
      with: 1,
      all: 1,
      get: 1,
      they: 1,
      be: 1,
      one: 1,
      what: 1,
      still: 1,
      an: 1,
      when: 1,
      this: 1,
      can: 1,
      bc: 1,
      was: 1,
      from: 1,
      our: 1,
      as: 1,
      we: 1,
      amp: 1,
      et: 1,
      us: 1,
      more: 1

    }

    for (let i = 0; i < sortedWords.length; i++) {
      if(sortedWords[i].length > 0) {
        if(sortedWords[i] === sortedWords[i+1] && !toIgnore[sortedWords[i]]) {
          if(uniqueWords[sortedWords[i]]) {
            uniqueWords[sortedWords[i]] += 1
          } else {
            uniqueWords[sortedWords[i]] = 2
          }
        }
      }
    }



console.log(this.sortObject(uniqueWords));
console.log(uniqueWords)

  }



  render(){
    return (
<div>
</div>
    )
  }
}
export default KeyWord;
