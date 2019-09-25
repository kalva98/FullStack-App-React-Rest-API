import React from 'react';
import Form from './Form';
import { Link } from 'react-router-dom';
    
class UserSignIn extends React.Component {
    state = {
        emailAddress: '',
        password: '',
        errors:[],
    }

change = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  this.setState(() => {
    return {
      [name]: value
    };
  });
}

submit = () => {
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } }; //If a user submits the sign in form without previously visiting a protected route, they will navigate to /authenticated by default
    const { emailAddress, password } = this.state;
  context.actions.signIn(emailAddress, password)
    .then(user => {
      if (user === null) {
        this.setState(() => {
          return { errors: ["Sign-in was unsuccessful"] };
        });
      } else {
        this.props.history.push(from); //The from variable passed to history.push(from) contains information about the pathname an unauthenticated user redirected "from" (via this.props.location.state). For example, if a user redirects to the sign up page from /settings, from will be equal to pathname: "/settings".
        console.log(`SUCCESS! ${emailAddress} is now signed in!`); // Same as in UserSignUp
      }
    }).catch(err => {
      console.log(err);
      this.props.history.push("/error");
    })
}

render() {
    const {emailAddress, password, errors} = this.state;
    return(
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
            <Form cancel= {this.cancel}
            errors={errors}
            submit= {this.submit}
            submitButtonText= "Sign In"
            elements={() => (
              <React.Fragment>
                <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" defaultValue={emailAddress} onChange={this.change}/>
                <input id="password" name="password" type="password" className="" placeholder="Password" defaultValue={password} onChange={this.change}/>
              </React.Fragment>
            )} />
            
            <p>&nbsp;</p>
          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
        </div>
      </div>
      )
    }
        
    cancel = ()=> {
          this.props.history.push("/");
    }
  }

export default UserSignIn