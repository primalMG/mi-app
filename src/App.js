import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import renderHTML from 'react-render-html';
import _ from 'lodash';

var config = {
    apiKey: "AIzaSyAeYQ2gRNA28jt5hejGt4gjj0s02d2aLwA",
    authDomain: "marksmanfm-52dc6.firebaseapp.com",
    databaseURL: "https://marksmanfm-52dc6.firebaseio.com",
    projectId: "marksmanfm-52dc6",
    storageBucket: "marksmanfm-52dc6.appspot.com",
    messagingSenderId: "182840990388"
}
firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

var video;

class App extends Component {

  constructor(props){
    super(props);
    this.state = {email: '', 
    password: '', 
    confirmPass: '',
    posts: {}
  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    firestore.collection('songs').get().then((snapshot) => {
      snapshot.forEach((doc) => {
        this.setState({
          posts: doc.data()
        });
      });
    });
  }

  renderPosts() {
    return _.map(this.state.posts, (post, key) => { 
      console.log(key.name)
      return (
        <div key={key}>
          <h2>{post.name}</h2>
          <h2>hello makrmsn</h2>
          <h2>{post.description}</h2>
        </div>
      );
    });
  }

  // isValid(){
  //   if (email === '' || password === '' || confirmPass === '') {
  //     this.setState({
  //       error: 'Please enter in all fields'
  //     });
  //     return false;
  //   }

  //   if (password !== confirmPassword) {
  //     this.setState({
  //       error: 'Please make sure your passwords match'
  //     });
  //     return false;
  //   }

  //   return true;
  // }

  handleChange(event){
    this.setState({ [event.target.name]: event.target.value });  
  }

  handleSubmit(event){
    event.preventDefault()
    console.log(this.state.email)
    console.log(this.state.password)

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
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

  fileUploaded(e){
    video = e.target.files[0];
    console.log(video)
  }
  
  upload() {
    
    var date = new Date();
    var name = document.getElementById('name')
    var des = document.getElementById('des');
    var genre = document.getElementById('genre');
    var selectedGenre = genre.options[genre.selectedIndex].value; 

    if (video) {
      var storageRef = firebase.storage().ref('trackVideo/' + video.name)
        storageRef.put(video).then(snapshot => {
        return snapshot.ref.getDownloadURL();
    })

    .then(downloadURL => {
      console.log(downloadURL)
      var newTrack = {
        name: name.value,
        uploadTime: date,
        genre: selectedGenre,
        description: des.value,
        link: downloadURL
      }
        firestore.collection('songs').add(newTrack)
        // firestore.collection('users').add(newTrack)
        return downloadURL;
      })

    .catch(error => {
      console.log('failed to upload the riddim')
    })
    } else {
        var newTrack = {
          name: name.value,
          uploadTime: date,
          genre: selectedGenre,
          description: des.value,
        }
      firestore.collection('songs').add(newTrack)
      console.log('other path')
    }   
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
       
        </header>
        <div id="uploadTrack" ng-controller="uploads" >
          
          <input placeholder="title" data-key="title" id="name" className="track"/>
           <select id="genre">
             <option value="House">House</option>
             <option value="Dnb">Dnb</option>
             <option value="HipHop">Hip Hop</option>
           </select>
         <textarea type="textarea" placeholder="Description" id="des" className="track" data-key="Decription"></textarea><br/> 
        
         <input type="file" id="vid" data-key="trackURL" accept="video/*" className="track" onChange={this.fileUploaded} /><br/>
         
         <input type="button" onClick={this.cancel} value="Cancel" />
         <button onClick={this.upload} >Upload</button>
        </div>
        <div>
        <ul id="home-all"></ul>
        </div>

        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close">&times;</span>
            <div id="title"></div>
            <div id="currentTrack"></div>
            <br/>
            <textarea></textarea>
            <input type="button" value="Post" ng-click="Post"/>
            <p>Some text in the Modal..</p>
          </div>
        </div>
          
          {this.renderPosts()}
      

        <div id="login">
          <div className="login-modal">
            <span className="close">&times;</span>
            <div></div>
            <form onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.email} name="email"  onChange={this.handleChange}  placeholder="email" />

              <input type="password" value={this.state.password} onChange={this.handleChange} name="password" placeholder="password" />

              <input type="password" value={this.state.confirmPass} onChange={this.handleChange} name="confirmPass" placeholder="Confirm password" />
              <input type="submit" value="Login"/>
            </form>
          </div>
        </div>
     

      </div>
    );
  }
}

export default App;
