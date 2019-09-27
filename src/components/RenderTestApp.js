import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PageHome from './PageHome';

class RenderTestApp extends React.Component
{
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={PageHome} />
      </Switch>
    );

        //<Route path="/controlled" component={PageControlled} />
        //<Route path="/uncontrolled" component={PageUncontrolled} />
  }
}

export default RenderTestApp;