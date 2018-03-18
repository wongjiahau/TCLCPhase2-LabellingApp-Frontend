import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import Button from 'react-bootstrap/lib/Button';
import '../App.css';
import {Post} from '../Post';
import {testData} from '../testData'; // comment out this line before build
import {LabellingController} from '../controllers/LabellingController';

const DEBUGGING = false;
export class LabellingView extends Component {
  constructor(props) {
    super(props);
    this.controller = new LabellingController(this.props.language);
    this.updates = {};
    if(DEBUGGING) {
      console.log("In debugging mode");
      this.state = {
        loading: false,
        done: false,
        posts: testData
      }
      return;
    }
    this.state = {
      loading: true,
      done: false,
      posts: null
    };
    this.controller.getPosts((err, res) => {
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
    if(this.state.done) {
      return <Redirect to='/con'/>
    }
    return (
      <div className="LabellingView">
        <h1 style={{marginLeft: '50px', marginTop:'30px'}}>Label the semantic value of the following posts.</h1>
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
    this.controller.submit(this.updates, (err, res) => {
      if(err) {
        alert("ERROR: " + err);
        return;
      }
      alert("Your work have been submitted to the database.");
      console.log(JSON.stringify(res.text));
      this.setState({done: true});
    });
  }
}

