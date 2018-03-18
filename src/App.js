import './App.css';
import React, {Component} from 'react';
import {LabellingView} from './views/LabellingView';
import {Bye} from './views/Bye';
import {ChooseLanguage} from './views/ChooseLanguage';
import {ContinueOrNot} from './views/ContinueOrNot';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={() => <Redirect to='/chooseLang'/>}/>
          <Route exact path='/login' component={LabellingView}/>
          <Route exact path='/chooseLang' component={ChooseLanguage}/>
          <Route exact path='/english' component={() => <LabellingView language='English'/>}/>
          <Route exact path='/chinese' component={() => <LabellingView language='Chinese'/>}/>
          <Route exact path='/con' component={ContinueOrNot}/>
          <Route exact path='/bye' component={Bye}/>
          <Route component={() => <h1>404. Page not found.</h1>}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
