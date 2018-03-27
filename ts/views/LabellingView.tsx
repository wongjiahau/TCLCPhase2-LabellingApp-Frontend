import uniq from "lodash.uniq";
import * as React from "react";
import Button from "react-bootstrap/lib/Button";
import {Redirect} from "react-router-dom";
import {focusNext} from "../actions/focusNext";
import {focusPrev} from "../actions/focusPrev";
import {ILabellingController, LabellingController, Language} from "../controllers/LabellingController";
import {MockLabellingController} from "../controllers/MockLabellingController";
import {ISubmitData, SemanticValue} from "../model/submitData";
import {PostView} from "../PostView";
import {testData} from "../testData"; // comment out this line before build
import {CreatePostViewModel, IPostViewModel} from "../viewModel/postViewModel";
import {ValidateSession} from "./ValidateSession";

const listener = new window.keypress.Listener();

const DEBUGGING = true;
interface ILabellingViewState {
  loading: boolean;
  done: boolean;
  postViewModels: IPostViewModel[];
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
      postViewModels: [],
    };
    this.requestDataFromServer();
  }

  public requestDataFromServer = () => {
    this.controller.getPosts((err, response) => {
      if (err) {
          alert(err);
          return;
        }
      const posts = response;
      posts.forEach((x) => {
          this.submitData.updates[x._id] = "unassigned";
      });
      const postViewModels = posts.map((x) => CreatePostViewModel(x));
      postViewModels[0].focus = true;
      this.setState({
        loading: false,
        postViewModels,
      });
      this.setupKeyBindings();
    });
  }

  public setupKeyBindings = () => {
    listener.simple_combo("down", () => {
      this.setState({
        postViewModels: focusNext(this.state.postViewModels),
      });
    });

    listener.simple_combo("up", () => {
      this.setState({
        postViewModels: focusPrev(this.state.postViewModels),
      });
    });
  }

  public render() {
    if (this.state.done) {
      return <Redirect to="/con"/>;
    }
    const posts = this.state.postViewModels;
    return (
      <div className="LabellingView">
        {/* <ValidateSession/> */}
        <h1 style={{marginLeft: "50px", marginTop: "30px"}}>Label the semantic value of the following posts.</h1>
        <br/>
        {this.state.loading
          ? "Loading . . ."
          : posts.map((x, index) => <PostView
                 key={index} value={x.value}
                 focus={x.focus}
                 renderMergeButton={posts[index - 1] ? (posts[index - 1].belongs_to === x.belongs_to) : false}
                 handleMerge={this.handleMerge(index)}
                 handleOnChange={this.handlePostSemanticValueChange(index)}
            />)
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

  public handlePostSemanticValueChange = (index: number) => (newValue: SemanticValue) => {
    this.state.postViewModels[index].semantic_value = newValue;
    this.submitData.updates[this.state.postViewModels[index]._id] = newValue;
    console.log(this.submitData);
  }

  public handleMerge = (index: number) => () => {
    const posts = this.state.postViewModels;
    posts[index - 1].value = posts[index - 1].value + " " + posts[index].value;
    posts.splice(index, 1); // splice means remove
    this.setState({postViewModels: posts});
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
