import React, { Component } from 'react';
import { auth } from './firebase';


export class SignUp extends Component {

    constructor(props){
        super(props);
        this.state = {email: '', 
        password: '', 
        confirmPass: '',
      };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event){
        this.setState({ [event.target.name]: event.target.value });  
      }
    
      handleSubmit(event){
        event.preventDefault()
        console.log(this.state.email)
        console.log(this.state.password)
    
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(function(user) {
            console.log('sign up successful')
          alert('sign up succuessful')
        })
        .catch(function(error) {
          var errorCode = error.code,
           errorMessage = error.message
    
          if (errorCode === 'auth/weak-password') {
            alert('thep password is too weak.')
          } else {
            alert(errorMessage)
            console.log(errorMessage)
          }
        })
      }
    

    render(){
        return (
              <div id="SignUp">
    <div className="SignUp-modal">
      <span className="close">&times;</span>
      <div></div>
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.email} name="email"  onChange={this.handleChange}  placeholder="email" />

        <input type="password" value={this.state.password} onChange={this.handleChange} name="password" placeholder="password" />

        <input type="password" value={this.state.confirmPass} onChange={this.handleChange} name="confirmPass" placeholder="Confirm password" />
        <input type="submit" value="SignUp"/>
      </form>
    </div>
  </div>

        )
    }
  
}