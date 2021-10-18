/*
    This page handles the case when the route does not match any of the existing routes 
    created in the application
*/

import React from 'react'
import background from '../assets/back.png'
import "./styles/PageNotFound.css"

export default function PageNotFound() {
    const backdrop = {
        backgroundImage: `url(${background})`,
        width:'100%',
        height : '650px',
        backgroundRepeat: 'no-repeat',
        overflow : 'hidden',
        margin : 'auto'
    }
    return (
       <div id="main" style={backdrop}>
    	    <div class="fof">
        		<h1>Error 404 : Page Not found</h1>
                <h2>Try looking for something else </h2>
            </div>
        </div>
    )
}

