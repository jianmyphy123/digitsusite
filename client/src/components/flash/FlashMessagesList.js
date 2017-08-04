import React from 'react';
import PropTypes from 'prop-types';
import FlashMessage from './FlashMessage';
import { deleteFlashMessages } from '../../actions/flashMessages';
import { connect } from 'react-redux';

class FlashMessagesList extends React.Component {
  render() {
    const { deleteFlashMessages } = this.props;
    const messages = this.props.messages.map(message =>
      <FlashMessage key={message.id} message={message} deleteFlashMessages={deleteFlashMessages} />
    );
    return (
      <div>
        <div>{messages}</div>
      </div>
    );
  }
}

FlashMessagesList.propTypes = {
  messages: PropTypes.array.isRequired,
  deleteFlashMessages: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    messages: state.flashMessages
  }
}

export default connect(mapStateToProps, { deleteFlashMessages })(FlashMessagesList);
