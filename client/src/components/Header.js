import React from 'react';
import {Link} from 'react-router-dom';

const Header = (props) => {
   const { context } = props;
   const authUser = context.authenticatedUser;

   return (
     <div className = "header" >
         <div className = "bounds" >
            <h1 className="header--logo" >Courses</h1>
            {authUser ?
         <nav>
            <span>Welcome, {authUser.firstName} {authUser.lastName}</span>
            <Link className="signout" to="/signout" >Sign Out</Link>
            </nav>:
            <nav> 
            <Link className="signup" to="/signup" >Sign Up</Link>  
            <Link className= "signin" to="/signin" >Sign In</Link>
            <Link className= "home" to="/" >Home</Link>
         </nav>
            }
         </div> 
      </div>
)
};
export default Header