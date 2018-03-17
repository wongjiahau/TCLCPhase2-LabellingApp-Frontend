import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import logo from './logo.svg';
import './App.css';
import {Post} from './Post';
import {testData} from './testData'; // comment out this line before build
const nocache = require('superagent-no-cache');
const request = require('superagent');


const DEBUGGING = false;
class App extends Component {
  constructor() {
    super();
    this.updates = {};
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
        res.body.forEach((x) => {
          this.updates[x._id] = 'unassigned';
        });
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
            .map((x, index) => <Post key={index} value={x.value} onChange={this.handlePostSemanticValueChange(x._id)}/>)
        }
        <div style={{width: '400px', margin: '0 auto 10px'}}>
          <Button onClick={this.handleSubmit} bsStyle="primary" bsSize="large" block>
            SUBMIT
          </Button>
        </div>
        <br/>
      </div>
    );
  }

  handlePostSemanticValueChange = (postId) => (newValue) => {
    this.updates[postId] = newValue;
    console.log(this.updates);
  }

  handleSubmit = () => {
    request
      .post('http://35.198.216.245/submitEnglish')
      .send(this.updates)
      .set('accept', 'json')
      .end((err, res) => {
        if(err) {
          console.log(err);
        }
        console.log(res);
        alert("Uploading data");
        // Redirect to another page
      });
    console.log("Submiting updates");
  }
}

export default App;
