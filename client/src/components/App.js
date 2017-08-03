import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavigationBar from './NavigationBar';
import Greedings from './Greedings';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="container">
          <NavigationBar />
          <div>
            <Switch>
              <Route exact path='/' component={Greedings} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }

}

export default App;
