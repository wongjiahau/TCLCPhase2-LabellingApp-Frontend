import * as React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import "../../node_modules/react-vis/dist/style.css";
import {Bye} from "./views/Bye";
import {ChooseLanguage} from "./views/ChooseLanguage";
import {ContinueOrNot} from "./views/ContinueOrNot";
import {LabellingView} from "./views/LabellingView";
import {Login} from "./views/Login";
import { ProgressPanel } from "./views/ProgressPanel";

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={() => <Redirect to="/login"/>}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/chooseLang" component={ChooseLanguage}/>
          <Route exact path="/english" component={() => <LabellingView language="English"/>}/>
          <Route exact path="/chinese" component={() => <LabellingView language="Chinese"/>}/>
          <Route exact path="/con" component={ContinueOrNot}/>
          <Route exact path="/bye" component={Bye}/>
          <Route exact path="/progress" component={ProgressPanel}/>
          <Route exact path="/403" component={() => <h1>403. Unauthorized.</h1>}/>
          <Route component={() => <h1>404. Page not found.</h1>}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
