import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import 'firebase/firestore'
import renderHTML from 'react-render-html';
import _ from 'lodash';
import { UploadPost } from './UploadPost';
import { SignUp } from './SignUp';
import { firestore } from './firebase'



var video;
var upload = require('./UploadPost')

class App extends Component {

  constructor(props){
    super(props);
    this.colRef = firestore.collection('songs');
    this.state = {email: '', 
    password: '', 
    confirmPass: '',
    posts: [],
    fetching: false,
  };


  }

  componentDidMount(){
    this.unsubcribeCol = this.colRef.onSnapshot(this.onColUpdate);
    this.setState({fetching: true})
  }

  componentWillUnmount(){
    this.unsubcribeCol();
  }

  
  renderPosts() {
    const {posts, fetching} = this.state;
    return <div>
      {posts.map((doc) => < Posts key={doc.id} doc={doc} />)}
    </div>;
  }

  onColUpdate = (snapshot) => {
    const posts = snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      data: docSnapshot.data()
    }));
    this.setState({
      posts: posts,
      fetching: false
    });
  };


  
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
        <UploadPost />
        <SignUp />

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
      

 

      </div>
    );
  }
}

class Posts extends React.Component {
  render() {
    const {doc} = this.props;
    const {name, description, link} = doc.data;
    let video
    if (link != null){
      video = <video src={link} controls="true"></video>
    }
    return (
      <div className='App'>
      <p>{name} - {description}</p>
      <button>Comment</button>
      <br/>
      {video}

    </div>
    ); 
  }
} 
export default App;

