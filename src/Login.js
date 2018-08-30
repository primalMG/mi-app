import React, { Component } from 'react';
import { auth } from './firebase';

export class login extends Component {

    render(){
      
        <div className="SignUp-modal">
          <span className="close">&times;</span>
          <div></div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.email} name="email"  onChange={this.handleChange}  placeholder="email" />
    
            <input type="password" value={this.state.password} onChange={this.handleChange} name="password" placeholder="password" />
            <input type="submit" value="SignUp"/>
          </form>
        </div>

    }
}