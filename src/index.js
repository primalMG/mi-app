import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UploadPost from './UploadPost';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();




// setTimeout(pauseNPlay, 3000);
// function pauseNPlay(){
//   var tunage = document.getElementsByTagName("video");
//   for (var i = 0; i < tunage.length; i++) {
//   //console.log(i)
//     tunage[i].onplay = function() {
//       var currentIndex = index('video', this);
//       for (var k = 0; k < tunage.length; k++) {
//         if (k === currentIndex) { continue }
//         tunage[k].pause();
//       }
//     }  
//   }
// }

// function index(tagName, id) {
//   let nodes = document.getElementsByTagName(tagName);
//   return [].indexOf.call(nodes, id);
// } 