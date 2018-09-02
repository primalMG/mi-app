import React, { Component } from 'react';
import { firestore } from './firebase';
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
      console.log('triggerreddd')
      const { video } = this.state;
      if (video ){
          const uploadTask = storage.ref('trackVideo/' + video.name).put(video);
          uploadTask.on('state_changed',
          (snapshot) => {
            //please create a progress bar marksman <3
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
              const dbUser = firestore.collection('users').doc(postKey)
              const newQuery = {
                name: this.state.title,
                //please get the time done uploadTime:,
                genre: this.state.genre,
                description: this.state.description,
              }
              batch.set(dbUser, newQuery)
      
              batch.commit().then(function (){
      
              })
      
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
        const newQuery = {
          name: this.state.title,
          //please get the time done uploadTime:,
          genre: this.state.genre,
          description: this.state.description,
        }
        batch.set(dbUser, newQuery)

        batch.commit().then(function (){

        })

        })

      }
      
  }

    // (downloadURL) => {
  
    // },
    // upload() {
        
    //     var date = new Date();
    //     var name = document.getElementById('name')
    //     var des = document.getElementById('des');
    //     var genre = document.getElementById('genre');
    //     var selectedGenre = genre.options[genre.selectedIndex].value; 
    
    //     if (video) {
    //       var storageRef = storage.ref('trackVideo/' + video.name)
    //         storageRef.put(video).then(snapshot => {
    //         return snapshot.ref.getDownloadURL();
    //     })
    
    //     .then(downloadURL => {
    //       console.log(downloadURL)
    //       var newTrack = {
    //         name: name.value,
    //         uploadTime: date,
    //         genre: selectedGenre,
    //         description: des.value,
    //         link: downloadURL
    //       }
    //         firestore.collection('songs').add(newTrack)
    //         // firestore.collection('users').add(newTrack)
    //         return downloadURL;
    //       })
    
    //     .catch(error => {
    //       console.log('failed to upload the riddim')
    //     })
    //     } else {
    //         var newTrack = {
    //           name: name.value,
    //           uploadTime: date,
    //           genre: selectedGenre,
    //           description: des.value,
    //         }
    //       firestore.collection('songs').add(newTrack)
    //       console.log('other path')
    //     }   
    //   }

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
           <textarea type="textarea" placeholder="Description" name="description" value={this.state.description} onChange={this.handleChange}></textarea><br/> 
          
           <input type="file" accept="video/*" name="video" onChange={this.handleVideo} /><br/>
           
           <input type="button" onClick={this.cancel} value="Discard" />
           <input type="submit" value="Upload"/>
            </form>
          </div>
        )
    }
}

