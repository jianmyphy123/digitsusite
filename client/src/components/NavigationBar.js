import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class NavigationBar extends React.Component {

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <NavLink className="navbar-brand" to="/">React</NavLink>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li><NavLink activeClassName="active" to="/signup">Sign Up</NavLink></li>
              <li><NavLink activeClassName="active" to="/login">Login</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

export default connect()(NavigationBar);
