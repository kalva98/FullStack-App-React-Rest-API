import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';


class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: []
    
  }

//change function
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  //handle submit function
  submit = () => {
    const { context } = this.props;

    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword
    } = this.state;

    
    let user ={};

    if (firstName === '' || lastName === '' || emailAddress === '' || password === '' || confirmPassword === '') {
        this.setState({
          errors: ['One or more fields are missing information, please fill out all fields']
        })
        return;
    }

    if (password !== confirmPassword) {
      this.setState({
        errors: ['Passwords must match'] 
      })

    } else {
        user = {
        firstName,
        lastName,
        emailAddress,
        password,
    };
  }

  context.data.createUser(user)
        .then(res => {
          if (res.status === 500) {
            this.props.history.push('/error');
          } else {
            context.actions.signIn(emailAddress, password)
              .then(() => {
                this.props.history.push('/');
              });
          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({
          errors: ['This email is already in use.']
        })
    });
  }
  

//cancel button
  cancel = () => {
    this.props.history.push('/');
  }

//displays page
  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <Form
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              submitButtonText="Sign Up"
              elements={() => (
                <React.Fragment>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={firstName}
                    placeholder="First Name"
                    onChange={this.change} />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={lastName}
                    placeholder="Last Name"
                    onChange={this.change} />
                  <input
                    id="emailAddress"
                    name="emailAddress"
                    type="text"
                    value={emailAddress}
                    placeholder="Email Address"
                    onChange={this.change} />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={this.change} />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={this.change} />
                </React.Fragment>
              )} />
            <p> Already have a user account? <Link to="/signin">Click here</Link> to sign in! </p>
          </div>
        </div>
        </div>
      );
    }
  }

export default UserSignUp;