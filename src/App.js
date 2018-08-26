import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

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

  fileUploaded(e){
    video = e.target.files[0];
    console.log(video)
  }
  // vid.addEventListener('change', function(e){
  //   video = e.target.files[0];
  //   console.log(video)
  //   });
    

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
        </div>


      
    );
  }
}

export default App;
