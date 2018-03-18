import './App.css';
import React, {Component} from 'react';
import {LabellingView} from './views/LabellingView';
import {ChooseLanguage} from './views/ChooseLanguage';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={() => <Redirect to='/chooseLang'/>}/>
          <Route exact path='/login' component={LabellingView}/>
          <Route exact path='/chooseLang' component={ChooseLanguage}/>
          <Route exact path='/play' component={LabellingView}/>
          <Route component={() => <h1>404. Page not found.</h1>}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
