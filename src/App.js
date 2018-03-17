import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
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
      console.log("In debugging mode");
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
        <h1>Label the semantic value of the following posts.</h1>
        <br/>
        {this.state.loading
          ? "Loading . . ."
          : this
            .state
            .posts
            .map((x, index) => <Post key={index} value={x.value}/>)
        }
        <div style={{width: '400px', margin: '0 auto 10px'}}>
          <Button bsStyle="primary" bsSize="large" block>
            SUBMIT
          </Button>
        </div>
        <br/>
      </div>
    );
  }
}

export default App;
