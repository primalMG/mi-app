import React, { Component } from 'react';
import { firestore, auth } from './firebase';
import { storage } from './firebase';




export class UploadPost extends Component {

    constructor(props){
      super(props)
      this.state = {
        title: '',
        description: '',
        genre: '',
        file: '',
        video: null,
        url: '',
        date: new Date(),
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleUpload = this.handleUpload.bind(this)
      this.handleVideo = this.handleVideo.bind(this)
    }


    handleChange(event){
      this.setState({ [event.target.name]: event.target.value });
    }

    handleVideo(e){
      if (e.target.files[0]) {
        const video = e.target.files[0];
        this.setState(() => ({video}))
      }
    }

    handleUpload(event){
      event.preventDefault()
      const { video, title, date, genere, description } = this.state;
      auth.onAuthStateChanged(user => {
        if (user) {
          if (video ){
            const uploadTask = storage.ref('trackVideo/' + video.name).put(video);
            uploadTask.on('state_changed',
            (snapshot) => {
              //please create a progress bar marksman <3
              console.log(snapshot)
              return snapshot.ref.getDownloadURL();
            },
            (error) => {
              console.log(error)
            },
            () => {
              storage.ref('trackVideo/').child(video.name).getDownloadURL().then(url => {
                this.setState({url});
                firestore.collection('songs').add({
                })
                .then(docRef => {
                 let postKey = docRef.id
                 console.log(postKey)
                const batch = firestore.batch()
                const dbContent = firestore.collection('songs').doc(postKey)
                const dbUser = firestore.collection('users').doc(postKey)
                const newQuery = {
                  name: this.state.title,
                  uploadTime: this.state.date,
                  link: url,
                  genre: this.state.genre,
                  description: this.state.description,
                }
                batch.set(dbUser, newQuery)
                batch.set(dbContent, newQuery)
                batch.commit()
                })
              })
            }
          );
        } else {
          firestore.collection('songs').add({
          })
          .then(docRef => {
           let postKey = docRef.id
           console.log(postKey)
          const batch = firestore.batch()
          const dbUser = firestore.collection('users').doc(postKey)
          const dbContent = firestore.collection('songs').doc(postKey)
          const newQuery = {
            name: this.state.title,
            uploadTime: this.state.date,
            genre: this.state.genre,
            description: this.state.description,
          }
          batch.set(dbContent, newQuery)
          batch.set(dbUser, newQuery)
          batch.commit()
          })
        }  
        } else {
          console.log('no user signed in')
        }
      })
  }


    render(){
        return (
            <div className="uploadTrack">
            <form onSubmit={this.handleUpload}>
              <input placeholder="title" name="title" value={this.state.title} onChange={this.handleChange}/>
             <select value={this.state.genre} name="genre" onChange={this.handleChange}>
               <option value="House">House</option>
               <option value="Dnb">Dnb</option>
               <option value="HipHop">Hip Hop</option>
             </select>
           <textarea placeholder="Description" name="description" value={this.state.description} onChange={this.handleChange}></textarea><br/> 
          
           <input type="file" accept="video/*" name="video" onChange={this.handleVideo} /><br/>
           
           <input type="button" onClick={this.cancel} value="Discard" />
           <input type="submit" value="Upload"/>
            </form>
          </div>
        )
    }
}

