import React, { Component } from 'react';
import { auth, firestore } from './firebase';
import { Modal } from 'react-bootstrap';
import ErrorAlert from './ErrorAlert';



export class SignUp extends Component {

    constructor(props){
        super(props);
        this.state = {email: '',
        username: '',
        password: '', 
        confirmPass: '',
        error: '',
        show: false,
        SignUpModal: false
      };
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
      }

      showSignUp(){
        this.setState({show: false})
        this.setState({SignUpModal: true})
      }

      loginPrompt(e){
        auth.onAuthStateChanged(user => {
          if (user) {
            //auth.signOut()
            //Account modal and tings.
          } else {
            this.setState({show: true})
          }
        })
        
      }

      handleClose(e){
        this.setState({show: false})
        this.setState({SignUpModal: false})
      }

      handleChange(event){
        this.setState({ [event.target.name]: event.target.value });  
      }

      validation(){
        const { email, password, confirmPass } = this.state;
        if ( email === '' || password === '' || confirmPass === ''){
          this.setState({
            error: "Please enter in all fields"
          })
          return false; 
        }
        if (password !== confirmPass) {
          this.setState({ error: 'Passwords do not match'})
          return false;
        }
        return true;
      }
    
      handleSubmit(event){
        event.preventDefault()
        if(!this.validation()) {
          return;
        }
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(user => {
          user = auth.currentUser.uid
          firestore.collection('users').doc(user).set({
            username: this.state.username,
            email: this.state.email,
          })
          console.log('sign up successful')
          this.setState({SignUpModal: false})
        })
        .catch(err => {
          console.log(err.message)
          this.setState({ error: err.message })
        })
      }

      handleLogin(event){
        event.preventDefault()
        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(user => {
          this.setState({show: false})
          console.log("sign in successful")
        })
        .catch(err => {
          // this.setState()
          //this.setState({ loginError: err.message })
        })
    
      }
    

    render(){
        return (
            <div className="Account"> 
            <div>
              <input type="button" onClick={this.loginPrompt.bind(this)} value="Account" />
            </div>
 

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Body>
            <form onSubmit={this.handleLogin.bind(this)}>
            <ul>
        <li>Email:</li><li><input type="text" value={this.state.email} name="email"  onChange={this.handleChange}  placeholder="email" /></li>

        <li>Password:</li><li><input type="password" value={this.state.password} onChange={this.handleChange} name="password" placeholder="password" /></li>
        <input type="submit" value="Login"/>
        </ul>
        </form>
        <input type="button" value="Sign Up" onClick={this.showSignUp.bind(this)} />
          </Modal.Body>
        
        </Modal>

        <Modal show={this.state.SignUpModal} onHide={this.handleClose}>
          <Modal.Body>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <ul>
                <li>Email:</li><li><input type="text" className="txtAccount" value={this.state.email} name="email"onChange={this.handleChange}  placeholder="email" /></li>
                <li>Username:</li> <li><input type="text" className="txtAccount" value={this.state.username} name="username" onChange={this.handleChange} placeholder="username" /></li>
                
                <li>Password:</li><li><input type="password" className="txtAccount"  value={this.state.password} onChange={this.handleChange} name="password" placeholder="password" /></li>

                <li>Confirm Password:</li><li><input type="password" className="txtAccount" value={this.state.confirmPass} onChange={this.handleChange} name="confirmPass" placeholder="Confirm password" /></li>
                <input type="submit" value="SignUp"/>
                </ul>
                {this.state.error && <ErrorAlert>
                  {this.state.error}
                </ErrorAlert>}
              </form>
          </Modal.Body>
        </Modal>
      
        </div>
  
        )
    }
  
}