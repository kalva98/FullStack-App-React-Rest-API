import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Courses from './components/Courses';
import './styles/global.css';
import './App.css';
import Header from './components/Header';
import CourseDetails from './components/CourseDetails';
import CreateCourse from './components/CreateCourse';

export default class App extends Component{

  render() {
    return (

      <div className="container">
        <Header/>
        <BrowserRouter>
          <Switch>
            <Route key={0} exact path="/" component={Courses} />
            <Route path="/courses/:id" component={CourseDetails}/>
            <Route path= "/course/create" component={CreateCourse}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}