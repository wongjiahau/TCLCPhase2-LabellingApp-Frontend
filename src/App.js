import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import logo from './logo.svg';
import './App.css';
import {Post} from './Post';
import {testData} from './testData'; // comment out this line before build
import {AppController} from './controllers/AppController';

const DEBUGGING = false;
class App extends Component {
  constructor() {
    super();
    this.controller = new AppController();
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
    this.controller.getPostsEnglish((err, res) => {
      if (err) {
          alert(err);
          console.log(err);
          this.setState({posts: err});
          return;
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
    this.controller.submit(this.updates);
  }
}

export default App;
