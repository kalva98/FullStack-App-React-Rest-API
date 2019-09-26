import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


class UpdateCourse extends Component {
  constructor() {
    super();
    this.state = {
      course: {},
      id: "",
      title: "",
      description: "",
      materialsNeeded: "",
      estimatedTime: "",
      firstName: "",
      lastName: ""
    }
  }
  componentDidMount() {

    axios.get('http://localhost:5000/api/courses/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          courses: response.data,
          id: this.props.match.params.id
        })
      })
      .catch(error => {
        if (error.status === 404) {
          console.log('Error not found')
        }
      })
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

  submit = (e) => {
    e.preventDefault()
    const { context } = this.props;
    //Sets the
    //const userId = context.authenticatedUser.id;
    // declares variables so save from writing this.state.* everywhere
    const { id, title, description, estimatedTime, materialsNeeded } = this.state;
    // Declares and fills course variable object
    const course = { id, title, description, estimatedTime, materialsNeeded };
    const authUser = context.authenticatedUser;
    const emailAddress = authUser.emailAddress;
    const password = authUser.password;
    // Grabs credentials to authorize user in update request
    const credentials = btoa(`${emailAddress}:` + password);
    context.data.updateCourse(course, credentials.authUser)
      
        //Checks for validation errors and sets them if they exist
        if(course.description === '' || course.title === '') {
          this.setState({ errors: 'Course and Description are required' });
        } else {
          axios({
        method: 'PUT',
        url: 'http://localhost:5000/api/courses/' + this.props.match.params.id,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Basic ${credentials}`
        },

        auth:
        {
          emailAddress: emailAddress,
          password
        },
        // 'Basic' + btoa(this.props.context.authenticatedUser.emailAddress),

        data: {
          title: course.title,
          description: course.description,
          estimatedTime: course.estimatedTime,
          materialsNeeded: course.materialsNeeded
        }
        
      }).then(() => {
        alert("Course updated successfully");
        this.props.history.push("/");
      }).catch(err => {
        if (err.response.status === 400) {
          this.setState({
            errors: err.response.data.message
          })
        } else if (err.response.status === 500) {
          alert("Course and Description must be updated ")
          this.props.history.push("/error");
        }
      })
    }
  }

  render() {
    const course = this.state.courses;
    const {context} = this.props;
    const authUser = context.authenticatedUser;
    
    if (course.id === undefined)
        return (<div></div>)
    else
    return (
      <div>
        <div className="bounds course--detail">
            <h1>Update Course</h1>
            <div>
              <form onSubmit= {this.submit}>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                      defaultValue={course.title} /></div>
                    <p>{course.user.firstName} {course.user.lastName}</p>
                  </div>
                  <div className="course--description">
                    <div><textarea id="description" name="description" className="" placeholder="Course description..." defaultValue={course.description}> onChange={this.change} />
                    </textarea></div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li key="0" className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue={course.estimatedTime} onChange={this.change} /></div>
                      </li>
                      <li key="1" className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." defaultValue={course.materialsNeeded} onChange={this.change} />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid-100 pad-bottom">
                  {(authUser && authUser.id === course.user.id) &&
                  <button className="button" type="submit" onClick = {this.submit}>Update Course</button>}
                  <Link className="button button-secondary" to={'/courses/' + this.props.match.params.id}>Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>

    )
  }
}

export default UpdateCourse