import React from 'react'
import background from './book.png'
import "./styles/ListContact.css"

export default function ListContact() {    
    const backdrop = {
        backgroundImage: `url(${background})`,
            width:'80%',
            height : '630px',
            backgroundRepeat: 'no-repeat',
            marginLeft : '15%'
    }

    const tableStyle = {
        marginLeft : '-12%'
    }

    const tab = {
        marginLeft : '32%'
    }
    return (
       <div style={backdrop}>
            <div style={tableStyle}>
            <h1>Contact list</h1>
            <table style={tab}>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
                <tr>
                    <td>Emil</td>
                    <td>Tobias</td>
                    <td>Linus</td>
                </tr>
                <tr>
                    <td>16</td>
                    <td>14</td>
                    <td>10</td>
                </tr>
                </table>
           </div>
       </div>    
    )
}
