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

const CoursesWithContext = withContext(Courses);
const CourseDetailsWithContext = withContext(CourseDetails);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignInWithContext = withContext(UserSignIn);
const HeaderWithContext = withContext(Header);

export default class App extends Component{

  render() {
    return (

      <div className="container">
        
        <BrowserRouter>
        <HeaderWithContext/>
          <Switch>
            <Route exact path="/" component={CoursesWithContext} />
            <Route path="/courses/:id" component={CourseDetailsWithContext}/>
            <Route path= "/course/create" component={CreateCourseWithContext}/>
            <Route path= {`/course/:id/update`} component={UpdateCourseWithContext}/>
            <Route path= "/signin" component={UserSignInWithContext}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}