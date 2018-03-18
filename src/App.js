import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import logo from './logo.svg';
import './App.css';
import { LabellingView } from './views/LabellingView';

const DEBUGGING = false;
class App extends Component {
  render() {
    return (
      <div className="App">
        <LabellingView/>
      </div>
    );
  }
}

export default App;
