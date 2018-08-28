import React, { Component } from 'react';
import { firestore } from './firebase';
import { storage } from './firebase';



let video;

export class UploadPost extends Component {
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
          var storageRef = storage.ref('trackVideo/' + video.name)
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

    render(){
        return (
            <div id="uploadTrack">
            <form onSubmit={this.handleUpload}>
              <input placeholder="title" data-key="title" id="name" className="track"/>
             <select id="genre">
               <option value="House">House</option>
               <option value="Dnb">Dnb</option>
               <option value="HipHop">Hip Hop</option>
             </select>
           <textarea type="textarea" placeholder="Description"  className="track" data-key="Decription"></textarea><br/> 
          
           <input type="file" data-key="trackURL" accept="video/*" className="track" onChange={this.fileUploaded} /><br/>
           
           <input type="button" onClick={this.cancel} value="Discard" />
           <button onClick={this.upload} >Upload</button>
            </form>
          </div>
        )
    }
}

