import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);



var homeAll = document.getElementById('home-all')

firestore.collection('songs').get().then((snapshot) => {
    homeAll.innerHTML = ""
    snapshot.forEach((doc) => {
        let value = doc.data();
        let li = document.createElement('li');
        li.innerHTML = value.name + " - Description: " + value.description + " <br/>"
        let comment = document.createElement('button')
        comment.textContent = "Comment"
        comment.addEventListener('click', commentSection)
        comment.id = "comments"

        li.append(comment)
        comment.setAttribute('key', doc.id)

        if (value.link != null){
            var tune = document.createElement('video');
            tune.controls = true
            tune.src = value.link
            li.append(tune)
        }
        homeAll.append(li);

    })
})
.catch(error => {
    homeAll.innerHTML = "unable to retrieve list of tracks, please try again later"
})

var modal = document.getElementById('myModal')
var src = document.getElementById('selectedTune')
var selectedTune = document.getElementById('currentTrack');
var currentTune = document.createElement('video');


function commentSection(e){
    modal.style.display = "block"

    var postId = e.target.getAttribute('key')
    const selectedPost = firestore.collection('songs').doc(postId)
    var title = document.getElementById('title')

    selectedPost.get().then((snapshot) => {
        let value = snapshot.data();
        console.log(value)
        title.innerHTML = value.name
  
        if (value.link != null) {
          
          currentTune.controls = true
          currentTune.src = value.link
    
          selectedTune.appendChild(currentTune);
        }
    })  
}


var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    currentTune.remove(currentTune)
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        currentTune.remove(currentTune)
    }
}

setTimeout(pauseNPlay, 3000);
function pauseNPlay(){
  var tunage = document.getElementsByTagName("video");
  for (var i = 0; i < tunage.length; i++) {
  //console.log(i)
    tunage[i].onplay = function() {
      var currentIndex = index('video', this);
      for (var k = 0; k < tunage.length; k++) {
        if (k === currentIndex) { continue }
        tunage[k].pause();
      }
    }  
  }
}

function index(tagName, id) {
  let nodes = document.getElementsByTagName(tagName);
  return [].indexOf.call(nodes, id);
} 