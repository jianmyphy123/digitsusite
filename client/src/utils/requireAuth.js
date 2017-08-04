import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFlashMessages } from '../actions/flashMessages';

export default function(ComposedComponent) {
  class Authenticate extends React.Component {

    componentWillMount() {
      if(!this.props.isAuthenticated) {
        this.props.addFlashMessages({
          type: 'error',
          text: 'You need to login to access this page'
        });
        this.props.history.push('/login');
      }
    }

    componentWillUpdate(nextProps, nextState) {
      if(!nextProps.isAuthenticated) {
        this.props.history.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent { ...this.props }/>
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashMessages: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    }
  }

  return connect(mapStateToProps, { addFlashMessages })(Authenticate);
}
