import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PageHome from './PageHome';
import PageControlled1 from './PageControlled1';

// ---------------------------------------------------------
// global data...
// ---------------------------------------------------------

if ( ! global.daveinitialized )
{
  global.categories = {
    items: [ "Animal", "Mineral", "Vegetable" ],
    sortorder: [ 0, 1, 2 ],
  };

  global.subcategories = {
    "Animal": {
      items: [ "Dog", "Cat", "Zebra" ],
      sortorder: [ 1, 0, 2 ],
    },
    "Mineral": {
      items: [ "Car", "House", "Rock" ],
      sortorder: [ 0, 1, 2 ],
    },
    "Vegetable": {
      items: [ "Tree", "Flower", "Brocolli" ],
      sortorder: [ 2, 1, 0 ],
    },
  }

  global.daveinitialized = true;
}


// ---------------------------------------------------------
// (exported) RenderTestApp...
// ---------------------------------------------------------

class RenderTestApp extends React.Component
{
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={PageHome} />
        <Route path="/controlled1/:lagms" component={PageControlled1} />
      </Switch>
    );

        //<Route path="/uncontrolled" component={PageUncontrolled} />
  }
}

export default RenderTestApp;