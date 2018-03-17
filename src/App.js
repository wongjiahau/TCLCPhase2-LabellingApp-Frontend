import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Post} from './Post';
import {testData} from './testData'; // comment out this line before build
const nocache = require('superagent-no-cache');
const request = require('superagent');


const DEBUGGING = true;
class App extends Component {
  constructor() {
    super();
    if(DEBUGGING) {
      alert("In debugging mode");
      this.state = {
        loading: false,
        posts: testData
      }
      return;
    }
    this.state = {
      loading: true,
      posts: null
    };
    request
      .get('http://35.198.216.245/getPostsEnglish')
      .use(nocache) // Prevents caching of *only* this request
      .end((err, res) => {
        console.log(err);
        if (err) {
          this.setState({posts: err});
        }
        this.setState({loading: false, posts: res.body});
      });

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit
          <code>src/App.js</code>
          and save to reload.
        </p>
        {this.state.loading
          ? "Loading . . ."
          : this
            .state
            .posts
            .map((x) => <Post value={x.value}/>)
        }
      </div>
    );
  }
}

export default App;
