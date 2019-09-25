import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Courses from './components/Courses';
import './styles/global.css';
import './App.css';
import Header from './components/Header';
import CourseDetails from './components/CourseDetails';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import withContext from './components/Context';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './components/PrivateRoute';

const CoursesWithContext = withContext(Courses);
const CourseDetailsWithContext = withContext(CourseDetails);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignInWithContext = withContext(UserSignIn);
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

export default class App extends Component{

  render() {
    return (

      <div className="container">
        
        <BrowserRouter>
        <HeaderWithContext/>
          <Switch>
            <Route exact path="/" component={CoursesWithContext} />
            <Route path="/courses/:id" component={CourseDetailsWithContext}/>
            <PrivateRoute path= "/course/create" component={CreateCourseWithContext}/>
            <PrivateRoute path= {`/course/:id/update`} component={UpdateCourseWithContext}/>
            <Route path= "/signin" component={UserSignInWithContext}/>
            <Route path= "/signup" component={UserSignUpWithContext}/>
            <Route path= "/signout" component={UserSignOutWithContext}/>

          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}