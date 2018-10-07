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

  renderPosts() {
    const {posts, fetching} = this.state;
    console.log(posts)
    return <div>
      {posts.map((doc) => < Posts key={doc.id} doc={doc} />)}
    </div>;
  }

  
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
    this.colRef = firestore.collection('songs');
    this.state = {
      show: false,
      name: '',
      description: '',
      txtComment: '',
      comment: [],
    } 
    this.handlePostComment = this.handlePostComment.bind(this)
    this.handleCommentPrompt = this.handleCommentPrompt.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({ [event.target.name]: event.target.value });
  }

  handlePostComment(event){
    event.preventDefault()
    const {doc} = this.props
    this.colRef.doc(doc.id).collection('comments').add({
      comment: this.state.txtComment
    })
    .then(state => {
      //set state to empty bitach
    })
  }


  handleCommentPrompt(){
    this.setState({show: true})
    const {doc} = this.props 
    this.colRef.doc(doc.id).get().then(post => this.setState({
      name: post.data().name,
      description: post.data().description
    }))
    
  
    this.colRef.doc(doc.id).collection('comments').get().then(comments => {
      
      const coms = comments.docs.map((snapshot) => ({
        id: snapshot.id,
        data: snapshot.data()
      }))
      this.setState({
        comment: coms
      });
    })

  }

  renderComments(){
    const {comment} = this.state;
    return <div> {comment.map((doc) => <li key={doc.id}> {doc.data.comment} </li> )} </div>
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
      <input type="button" key={doc.id} value="Comment" onClick={this.handleCommentPrompt} />
      <br/>
      {video}

          <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Body>
                
                  <p>{this.state.name}</p>
                  <p>{this.state.description}</p>
                   
                   
                   <form onSubmit={this.handlePostComment}>
                   <textarea placeholder="Have something to say about this post?"
                   name="txtComment" value={this.state.txtComment} onChange={this.handleChange}>
                   </textarea><br/>
                  <input type="submit" value="Comment"/>
                </form>
                <ul>{this.renderComments()}</ul>

              </Modal.Body>
            </Modal>
      
    </div>
    ); 
  }
} 
export default App;

