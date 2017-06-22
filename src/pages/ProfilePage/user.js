// import React from 'react';
// import { Link } from 'react-router';
//
// class User extends React.Component {
//     constructor() {
//         super();
//         this.state = {};
//     }
//
//     /*
//     This method will be called by React after the first render. It's a perfect place to load
//     data with AJAX. This User component gets mounted in the DOM as soon as the URL is /user/:username
//
//     When that happens, react-router will pass a `params` prop containing every parameter in the URL, just like
//     when we get URL parameters in Express with req.params. Here, it's this.props.params. Since we called our route
//     parameter `username`, it's available under this.props.params.username
//
//     We're using it to make an API call to GitHub to fetch the user data for the username in the URL. Once we receive
//     the data -- in the callback -- we call `setState` to put the user data in our state. This will trigger a re-render.
//     When `render` gets called again, `this.state.user` exists and we get the user info display instead of "LOADING..."
//     */
//     componentDidUpdate(prevProps){
//       if (prevProps.params.username != this.props.params.username){
//         this.fetchData();
//       }
//     }
//
//     componentDidMount() {
//       this.fetchData();
//     }
//
//       fetchData = () => {
//         fetch(`https://infinite-everglades-64546.herokuapp.com/users/show?screen_name=${this.props.params.screen_name}`)
//           .then((raw) => raw.json())
//           .then((res) => {
//             console.log('res', res)
//             this.setState({
//               profile: res.data,
//               date: "Joined "+res.data.created_at.split(' ')[1]+' '+res.data.created_at.split(' ')[5]
//             })
//           })
//         }
//
//     /*
//     This method is used as a mapping function. Eventually this could be factored out to its own component.
//     */
//     renderStat(stat) {
//         return (
//             <li key={stat.name} className="user-info__stat">
//                 <Link to={stat.url}>
//                     <p className="user-info__stat-value">{stat.value}</p>
//                     <p className="user-info__stat-name">{stat.name}</p>
//                 </Link>
//             </li>
//         );
//     }
//
//     render() {
//         // If the state doesn't have a user key, it means the AJAX didn't complete yet. Simply render a LOADING indicator.
//         if (!this.state.profile) {
//             return (<div className="user-page">LOADING...</div>);
//         }
//
//         // If we get to this part of `render`, then the user is loaded
//         const profile = this.state.profile;
//         const tweets =  this.state.tweets;
//
//         // Gather up some number stats about the user, to be used in a map below
//         const stats = [
//             {
//                 name: 'KeyWord',
//                 value: tweets.text,
//                 url: `search/user/${this.props.params.username}/keyword`
//             },
//             {
//                 name: 'Timeline',
//                 value: tweets.created_at,
//                 url: `search/user/${this.props.params.username}/timeline`
//             },
//             {
//                 name: 'Sentiment',
//                 value: ,
//                 url: `search/user/${this.props.params.username}/sentiment`
//             }
//         ];
//
//         // Look in index.css for the styles that make this look like it does
//         return (
//             <div className="user-page">
//                 <div className="user-info">
//                     <Link className="user-info__text" to={`search/user/${profile.screen_name}`}>
//                         <img className="user-info__avatar" src={user.avatar_url} alt={`${user.login} avatar`}/>
//                         <h2 className="user-info__title">{user.login} ({user.name})</h2>
//                         <p className="user-info__bio">{user.bio}</p>
//                     </Link>
//
//                     <ul className="user-info__stats">
//                         {stats.map(this.renderStat)}
//                     </ul>
//                 </div>
//                 {this.props.children}
//             </div>
//         );
    }
};

export default User;
