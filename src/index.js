import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

global.davelogit = function ( msg )
{
  let count;
  if ( ! global.davelogitcounter )
    global.davelogitcounter = 1;
  count = global.davelogitcounter++;
  console.log( "" + count + ": " + msg );
}

ReactDOM.render(<App />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
