import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createEvent } from '../../actions/eventActions';
import TextFieldGroup from '../common/TextFieldGroup';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      datetime: '',
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();console.log(this.state);
    this.props.createEvent(this.state).then(
      (res) => {
        console.log('res',res);
      },
      (err) => {
        this.setState({errors: err.response.data.errors, isLoading: false});
      }
    );
  }

  render() {
    const { title, errors, isLoading } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Create New Game Event</h1>

        <TextFieldGroup
          field="title"
          label="Descrition"
          name="title"
          value={title}
          onChange={this.onChange}
          error={errors.title}
        />
        <div className="form-group">
          <input
            className="form-control"
            type="datetime-local"
            onChange={event => this.setState({datetime: event.target.value})}
          />
        </div>        

      <button type="submit" disabled={isLoading} className="btn btn-primary">Create</button>
      </form>
    );
  }
}

EventForm.propTypes = {
  createEvent: PropTypes.func.isRequired
}

export default connect(null, { createEvent })(EventForm);
