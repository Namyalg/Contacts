import './App.css';
import AddContact from './components/AddContact';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import ListContact from './components/ListContact'  
import {BrowserRouter, Route, Switch} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/add" exact component={AddContact}/>
            <Route path="/list" exact component={ListContact}/>
            <Route path="/" component={PageNotFound}/>
          </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
