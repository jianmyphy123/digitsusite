import React from 'react';
import PropTypes from 'prop-types';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';
import TextFieldGroup from '../common/TextFieldGroup';

import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

function validateInput(data) {
  let errors = {};

  if(Validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if(Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if(Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if(Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }
  if(!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Password must match'
  }
  if(Validator.isEmpty(data.timezone)) {
    errors.timezone = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}


class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      timezone: '',
      errors: {},
      isLoading: false,
      invalid: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if(!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  checkUserExists(e) {
    const field = e.target.name;
    const val = e.target.value;

    if(val !== '') {
      this.props.isUserExists(val).then(res => {
        let errors = this.state.errors;
        let invalid;
        if(res.data.user) {
          errors[field] = 'There is user with such ' + field;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  }

  onSubmit(e) {

    e.preventDefault();

    if(this.isValid()) {
      this.setState({errors: {}, isLoading: true});
      this.props.userSignupRequest(this.state).then(
        (res) => {
          this.props.addFlashMessages({
            type: 'success',
            text: 'You signed up successfully. Welcome!'
          });

          this.props.history.push('/');
        },
        (err) => this.setState({errors: err.response.data, isLoading: false})
      );
    }
  }

  render() {

    const { errors } = this.state;

    const options = map(timezones, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join our community!</h1>
          <TextFieldGroup
            error={errors.username}
            label="Username"
            onChange={this.onChange}
            checkUserExists={this.checkUserExists}
            value={this.state.username}
            field="username"
          />

          <TextFieldGroup
            error={errors.email}
            label="Email"
            onChange={this.onChange}
            checkUserExists={this.checkUserExists}
            value={this.state.email}
            field="email"
          />

          <TextFieldGroup
            error={errors.password}
            label="Password"
            onChange={this.onChange}
            value={this.state.password}
            type="password"
            field="password"
          />
          <TextFieldGroup
            error={errors.passwordConfirmation}
            label="PasswordConfirmation"
            onChange={this.onChange}
            value={this.state.passwordConfirmation}
            type="password"
            field="passwordConfirmation"
          />
        <div className={classnames('form-group', {'has-error': errors.timezone})}>
          <label className="control-label">Timezone</label>
          <select value={this.state.timezone} onChange={this.onChange} name="timezone" className="form-control">
            <option value="" disabled>Choose Your Timezone</option>
            {options}
          </select>
          {errors.timezone && <span className="help-block">{errors.timezone}</span>}
        </div>
        <div className="form-group">
          <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">Sign Up</button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessages: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired
}

export default SignupForm;
