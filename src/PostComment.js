import React, { Component } from 'react';

export class PostComment extends Component { 

    redner(){
        return(
            <div className='tabs'>
                    <input type="button" value="home"></input>
                    <input type="button" value="House"></input>
                    <input type="button" value="Dnb"></input>
                    <input type="button" value="Hip Hop"></input>
            </div>
        )
    }
}