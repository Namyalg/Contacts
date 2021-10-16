import React from 'react'
import {useState} from 'react'
import NewUser from './NewUser'
import ExistingUser from './ExistingUser';

export default function Home(props) {
    //here false indicates it is a new user, set by default, if the existing user button is clicked value becomes true
    var [type, setType] = useState(false);
    //need to have a enter username and password field and then check, if it is there or not
    //in the place to add u can mention the number and in the list u can delete
    //addition is separate and when u want to list u can delete in the format of a table
    //thats how it can be made now
    const nextPath = (path) => {
        props.history.push(path)
    }

    return (
        <div>
            <h1>Save all your contacts here!</h1>
            <button onClick={e => setType(false)}>New User</button>
            <button onClick={e => setType(true)}>Existing User</button>
            <div>
              {type === true ? <ExistingUser></ExistingUser> : <NewUser></NewUser>}
            </div>
        </div>
    )
}
