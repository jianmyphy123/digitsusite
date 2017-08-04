import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavigationBar from './NavigationBar';
import Greedings from './Greedings';
import SignupPage from './signup/SignupPage';
import LoginPage from './login/LoginPage';
import FlashMessagesList from './flash/FlashMessagesList';
import NewEventPage from './events/NewEventPage';

import requireAuth from '../utils/requireAuth';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="container">
          <NavigationBar />
          <FlashMessagesList />
          <div>
            <Switch>
              <Route exact path='/' component={Greedings} />
              <Route path='/signup' component={SignupPage} />
              <Route path='/login' component={LoginPage} />
              <Route path='/new-event' component={requireAuth(NewEventPage)} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }

}

export default App;
