# Backend
- The backend is written in Node.js
- The frontend and backend are two separate applications connected via REST APIs

### API Endpoints

|    ENDPOINT           |   METHOD   |  USE     |
| ------------          | ---------- | ----     |
|  `/user/signin`  | `POST` | To create a new user; Name and Email is stored in the database |
| `/user/login/:name/:email` | `GET` | An existing user is verified |
| `/contact/add/` | `POST` | A new contact is added to the user's list |
| `/contact/list/:name/:email` | `GET` | The user's contacts are retrieved from the database |
| `/contact/delete/:documentId/:contactId` | `DELETE` | The contact with the document Id and contact Id (from the contacts list) is deleted |
| `/contact/update` | `PUT` | The contact record with the documentId, contactId is updated to new values |

### Steps to run
- Clone the folder from the Github Repository
- Install the dependencies using `npm install`
- Run the server using `node index.js` on `PORT 9001`
