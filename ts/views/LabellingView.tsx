import * as React from "react";
import Button from "react-bootstrap/lib/Button";
import {Redirect} from "react-router-dom";
import {ILabellingController, LabellingController, Language} from "../controllers/LabellingController";
import {MockLabellingController} from "../controllers/MockLabellingController";
import { IPost } from "../model/post";
import {ISubmitData, SemanticValue} from "../model/submitData";
import {testData} from "../testData"; // comment out this line before build
import {CreatePostViewModel, IPostViewModel} from "../viewModel/postViewModel";
import {PostListView} from "./PostListView";
import {ValidateSession} from "./ValidateSession";

const DEBUGGING = false;
interface ILabellingViewState {
  loading: boolean;
  done: boolean;
  filename: string;
  posts: IPost[];
}

interface ILabellingViewProps {
  language: Language;
}

export class LabellingView extends React.Component<ILabellingViewProps, ILabellingViewState> {
  private controller: ILabellingController;
  private submitData: ISubmitData;
  constructor(props: any) {
    super(props);
    this.controller =
      DEBUGGING ?
      new MockLabellingController() :
      new LabellingController(this.props.language);
    this.submitData = {
      updates: {},
      merges: [],
    };
    this.state = {
      loading: true,
      done: false,
      filename: "",
      posts: [],
    };
    this.requestDataFromServer();
  }

  public requestDataFromServer = () => {
    this.controller.getPosts((err, response) => {
      if (err) {
          alert(err);
          return;
        }
      const posts = response.posts;
      posts.forEach((x) => {
          this.submitData.updates[x._id] = "unassigned";
      });
      this.setState({
        filename: response.filename,
        loading: false,
        posts,
      });
    });
  }

  public render() {
    if (this.state.done) {
      return <Redirect to="/con"/>;
    }
    return (
      <div className="LabellingView">
        <span style={{position: "absolute", right: "5px", top: "5px"}}>
          File : {this.state.filename}
        </span>
        {/* <ValidateSession/> */}
        <h1 style={{marginLeft: "50px", marginTop: "30px"}}>Label the semantic value of the following posts.</h1>
        <br/>
        {this.state.loading
          ? "Loading . . ." :
          <PostListView posts={this.state.posts}
            handlePostSemanticValueChange={this.handlePostSemanticValueChange}
            handleMerge={this.handleMerge}
          />
        }
        <div style={{width: "400px", margin: "0 auto 10px"}}>
          <Button onClick={this.handleSubmit} bsStyle="primary" bsSize="large" block>
            SUBMIT
          </Button>
        </div>
        <br/>
      </div>
    );
  }

  public handlePostSemanticValueChange = (id: string, newValue: SemanticValue) => {
    this.submitData.updates[id] = newValue;
  }

  public handleMerge = (absorber: string, beingAbsorbed: string) => {
    this.submitData.merges.push({ absorber, beingAbsorbed });
  }

  public handleSubmit = () => {
    this.controller.submit(this.submitData, (err, res) => {
      if (err) {
        alert("ERROR: " + err);
        return;
      }
      alert("Your work have been submitted to the database.");
      console.log(JSON.stringify(res.text));
      this.setState({done: true});
    });
  }
}
