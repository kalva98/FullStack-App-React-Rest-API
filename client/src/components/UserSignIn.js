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
//submit function signs in user
submit = () => {
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } }; 
    const { emailAddress, password } = this.state;
  context.actions.signIn(emailAddress, password)
    .then(user => {
      if (user === null) {
        this.setState(() => {
          return { errors: ["Sign-in was unsuccessful"] };
        });
      } else {
        this.props.history.push(from); 
        console.log(`SUCCESS! ${emailAddress} is now signed in!`); 
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
//Takes you back to home page
    cancel = ()=> {
          this.props.history.push("/");
    }
  }

export default UserSignIn