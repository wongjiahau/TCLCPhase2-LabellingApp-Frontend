import * as React from "react";
import { IAction } from "../actions/action";
import { FocusNext } from "../actions/focusNext";
import { FocusPrev } from "../actions/focusPrev";
import {IPostListState} from "../actions/postListStateAction";
import { clone } from "../libs/clone";
import {IPost} from "../model/post";
import { SemanticValue } from "../model/submitData";
import {CreatePostViewModel, IPostViewModel} from "../viewModel/postViewModel";
import {PostView} from "./PostView";

const listener = new window.keypress.Listener();

interface IPostListViewProps {
  posts : IPost[];
  handlePostSemanticValueChange: (id: string, newSemanticValue: SemanticValue) => void;
  handleMerge: (mergedIds: string[]) => void;
}

export class PostListView extends React.Component < IPostListViewProps, IPostListState > {
  public constructor(props : IPostListViewProps) {
    super(props);
    const postViewModels = props.posts.map((x) => CreatePostViewModel(x));
    postViewModels[0].focus = true;
    this.state = {
      postViewModels,
      currentFocusIndex: 0,
    };
    this.setupKeyBindings();
  }

  public render() {
    const posts = this.state.postViewModels;
    return (
      <div>{
        posts.map((x, index) => <PostView
          id={x._id}
          semanticValue={x.semantic_value}
          key={index}
          value={x.value}
          focus={x.focus}
          renderMergeButton={posts[index - 1]
          ? (posts[index - 1].belongs_to === x.belongs_to)
          : false}
          handleMerge={this.handleMerge(index)}
          handleOnChange={this.handlePostSemanticValueChange(index)}/>)
      }</div>
    );
  }

  public handlePostSemanticValueChange = (index: number) => (newValue: SemanticValue) => {
    console.log(index);
    this.state.postViewModels[index].semantic_value = newValue;
    const id = this.state.postViewModels[index]._id;
    this.props.handlePostSemanticValueChange(id, newValue);
  }

  public handleMerge = (index: number) => () => {
    const posts = this.state.postViewModels;
    posts[index - 1].value = posts[index - 1].value + " " + posts[index].value;
    posts.splice(index, 1); // splice means remove
    this.setState({postViewModels: posts});
    // this.props.handleMerge();
  }

  public updateState(action: IAction<IPostListState>): void {
    const newState = action.run(clone(this.state));
    this.setState(newState);
  }

  public setupKeyBindings = () => {
    /** 1st column means key,
     * 2nd columns means action,
     */
    const keyBindings = [
      "up"  , new FocusPrev(),
      "down", new FocusNext(),
    ];
    for (let i = 0; i < keyBindings.length; i += 2) {
      const key = keyBindings[i];
      const action = keyBindings[i + 1] as IAction<IPostListState>;
      listener.simple_combo(key, () => {
        this.updateState(action);
      });
    }
  }

}
