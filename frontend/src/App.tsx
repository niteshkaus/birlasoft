import * as React from 'react'; 
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";
 
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'toastr/build/toastr.min.css'; 
//import Index from './components/index.component';
//import Edit from './components/edit.component';
import Create from './components/create.component';

const App: React.FC = () => {
  return (
      <Router>
          <div className="container">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav mr-auto">
                          
                          <li className="nav-item">
                              <Link to={'/'} className="nav-link">Home</Link>
                          </li>
                          
                      </ul>
                  </div>
              </nav> <br/>
         
              <Switch>
                  <Route exact path='/' component={ Create } />
                  
              </Switch>
          </div>
      </Router>
  );
}

export default App;
