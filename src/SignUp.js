import React, { Component } from 'react';
import { auth, firestore } from './firebase';


export class SignUp extends Component {

    constructor(props){
        super(props);
        this.state = {email: '',
        username: '',
        password: '', 
        confirmPass: '',
      };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
      }

      handleChange(event){
        this.setState({ [event.target.name]: event.target.value });  
      }
    
      handleSubmit(event){
        event.preventDefault()
    
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(user => {
          user = auth.currentUser.uid
          console.log(user)
          firestore.collection('users').doc(user).set({
            username: this.state.username,
            email: this.state.email,
          })
          .then(go => {
            // console.log()
          })
            console.log('sign up successful')
          alert('sign up succuessful')
        })
        .catch(function(error) {
          let errorCode = error.code,
          errorMessage = error.message
    
          if (errorCode === 'auth/weak-password') {
            alert('thep password is too weak.')
          } else {
            // alert(errorMessage)
            console.log(errorMessage)
          }
        })
      
      }

      handleLogin(event){
        event.preventDefault()
        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(user => {
          //hide modal or summin or another, pls I'm tired.
        })
        .catch(error => {
    
        })
    
      }
    

    render(){
        return (
            <div className="Account"> 
               <div className="SignUp-modal">
      <span className="close">&times;</span>
      <div></div>
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.email} name="email"  onChange={this.handleChange}  placeholder="email" />
        <input type="text" value={this.state.username} name="username" onChange={this.handleChange} placeholder="username" />
        
        <input type="password" value={this.state.password} onChange={this.handleChange} name="password" placeholder="password" />

        <input type="password" value={this.state.confirmPass} onChange={this.handleChange} name="confirmPass" placeholder="Confirm password" />
        <input type="submit" value="SignUp"/>
      </form>
    </div>

      <div className="Login-modal">
      <span className="close">&times;</span>
      <div></div>
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.email} name="email"  onChange={this.handleChange}  placeholder="email" />

        <input type="password" value={this.state.password} onChange={this.handleChange} name="password" placeholder="password" />
        <input type="submit" value="Login"/>
      </form>
        </div>
      
        </div>
  
        )
    }
  
}