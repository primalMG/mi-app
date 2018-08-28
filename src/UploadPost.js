import React, { Component } from 'react';
import { firestore } from './firebase';




export class UploadPost extends Component {

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

