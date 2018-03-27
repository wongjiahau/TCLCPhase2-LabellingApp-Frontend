import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import Button from 'react-bootstrap/lib/Button';
import '../App.css';
import {Post} from '../Post';
import {testData} from '../testData'; // comment out this line before build
import {LabellingController} from '../controllers/LabellingController';
import {ValidateSession} from './ValidateSession';
import uniq from 'lodash.uniq';
import randomColor from 'randomcolor';

const DEBUGGING = true;
export class LabellingView extends Component {
  constructor(props) {
    super(props);
    this.controller = new LabellingController(this.props.language);
    this.updates = {};
    if(DEBUGGING) {
      console.log("In debugging mode");
      this.generateColorScheme(testData);
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
        const posts = res.body;
        this.generateColorScheme(posts);
        this.setState({loading: false, posts: posts});
        posts.forEach((x) => {
          this.updates[x._id] = 'unassigned';
        });
    });
  }

  generateColorScheme = (posts) => {
    const postIds = uniq(posts.map((p) => p.belongs_to));
    const colorScheme = {};
    postIds.forEach((id) => {
      if(!colorScheme[id]) {
        colorScheme[id] = randomColor({luminosity: "light"});
      }
    });
    this.colorScheme = colorScheme;
  }

  render() {
    if(this.state.done) {
      return <Redirect to='/con'/>
    }
    const posts = this.state.posts;
    return (
      <div className="LabellingView">
        {/* <ValidateSession/> */}
        <h1 style={{marginLeft: '50px', marginTop:'30px'}}>Label the semantic value of the following posts.</h1>
        <br/>
        {this.state.loading
          ? "Loading . . ."
          : posts.map((x, index) => <Post
                 key={index} value={x.value} color={this.colorScheme[x.belongs_to]}
                 renderMergeButton={posts[index - 1] ? (posts[index-1].belongs_to === x.belongs_to) : false}
                 handleMerge={this.handleMerge(index)}
                 onChange={this.handlePostSemanticValueChange(index)}
            />)
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

  handlePostSemanticValueChange = (index) => (newValue) => {
    this.state.posts[index].semantic_value = newValue;
  }

  handleMerge = (index) => () => {
    const posts = this.state.posts;
    posts[index - 1].value = posts[index - 1].value + " " + posts[index].value;
    posts.splice(index, 1); // splice means remove
    this.setState({posts: posts});
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

