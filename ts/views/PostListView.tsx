import * as React from "react";
import { Action } from "../actions/action";
import { FocusNext } from "../actions/focusNext";
import { FocusPrev } from "../actions/focusPrev";
import { MergeWithPrev } from "../actions/mergeWithPrev";
import {IPostListState} from "../actions/postListStateAction";
import { SetSemanticValue } from "../actions/setSemanticValue";
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
    const postViews : any[] = [];
    let currentBelongsTo = posts[0].belongs_to;
    posts.forEach((x, index) => {
      if (x.belongs_to !== currentBelongsTo) {
        currentBelongsTo = x.belongs_to;
        postViews.push(<hr style={{borderColor: "black", borderWidth: "5px"}}/>);
      }
      postViews.push(
        <PostView
          id={x._id}
          belongsTo={x.belongs_to}
          semanticValue={x.semantic_value}
          key={index}
          value={x.value}
          focus={x.focus}
          renderMergeButton={posts[index - 1] ? (posts[index - 1].belongs_to === x.belongs_to) : false}
          handleMerge={this.handleMerge(index)}
          handleOnChange={this.handlePostSemanticValueChange(index)}/>,
      );
    });

    return (
      <div>{postViews}</div>
    );
  }

  public handlePostSemanticValueChange = (index: number) => (newValue: SemanticValue) => {
    this.updateState(new SetSemanticValue(newValue, index));
  }

  public handleMerge = (index: number) => () => {
    this.updateState(new MergeWithPrev(index));
  }

  public setupKeyBindings = () => {
    /** 1st column means key,
     * 2nd columns means action,
     */
    const keyBindings = [
      "up"   , new FocusPrev(),
      "down" , new FocusNext(),
      "1"    , new SetSemanticValue("negative", -1),
      "2"    , new SetSemanticValue("neutral", -1),
      "3"    , new SetSemanticValue("positive", -1),
      "4"    , new SetSemanticValue("unassigned", -1),
      "space", new MergeWithPrev(-1),
    ];
    for (let i = 0; i < keyBindings.length; i += 2) {
      const key = keyBindings[i];
      const action = keyBindings[i + 1] as Action<IPostListState>;
      listener.simple_combo(key, () => {
        this.updateState(action);
      });
    }
  }

  public updateState(action: Action<IPostListState>): void {
    const newState = action.run(clone(this.state));
    this.setState(newState);
  }

}