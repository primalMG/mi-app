import React, { Component } from 'react';
// import logo from './logo.svg';
import './Styles/App.css';
import 'firebase/firestore'
import _ from 'lodash';
import { UploadPost } from './UploadPost';
import { SignUp } from './SignUp';
import { firestore } from './firebase';
import { Modal } from 'react-bootstrap';

var video;

class App extends Component {

  constructor(props){
    super(props);
    this.colRef = firestore.collection('songs');
    this.state = {
    posts: [],
    fetching: false,
 
   
    };
    
    this.handleCommentPrompt = this.handleCommentPrompt.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleCommentPrompt(){
    console.log('Comment section')
    this.setState({show: true})
  }

  handleClose(){
    this.setState({show: false})
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
  

  render() {
    return (
      <div className="App">

        <header className="App-header">
        <div className="tab">
        </div>
        <div className="Account">
         <SignUp />
        </div>
        </header>
        <UploadPost />


          
          {this.renderPosts()}
  
 

      </div>
    );
  }
}

class Posts extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      show: false,
      description: '',
    } 
    this.handleCommentPrompt = this.handleCommentPrompt.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleCommentPrompt(){
    this.setState({show: true})
    //get title
    //get description
    //firebase galore stuff

  }

  handleClose(){
    this.setState({show: false})
  }


  render() {


    const {doc} = this.props;
    const {name, description, link, genre} = doc.data;
    let video
    if (link != null){
      video = <video src={link} controls="true"></video>
    }
    return (
      <div className='App'>
      <p>{name} - {description} - {genre}</p>
      <input type="button" value="Comment" onClick={this.handleCommentPrompt} />
      <br/>
      {video}

          <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Body>
                <form onSubmit={this.handlePostComment}>
                  <p>Title of post</p>
                  <p>description of post</p>
                  <textarea placeholder="Have something to say about this post?"
                   name="description" value={this.state.description} onChange={this.handleChange}>
                   </textarea><br/>
                  <input type="submit"  value="Comment"/>
                </form>
              </Modal.Body>
            </Modal>
      
    </div>
    ); 
  }
} 
export default App;

