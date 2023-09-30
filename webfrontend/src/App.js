import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from './pages/Login';
import Register from "./pages/Register";
import SetPassword from "./pages/SetPassword";
import Navbar from "./components/Navbar";
import MaybeShowNavBar from "./pages/MaybeShowNavBar";
import ReactBigCalendar from "./pages/ReactBigCalendar";



function App() {
  return (  
    <div className="App">
      <Router>

      <MaybeShowNavBar>

        <Navbar/>
        

      </MaybeShowNavBar>

          <Routes>
          <Route exact path ="/" element ={<Login/>} /> 
          <Route exact path = "/register" element ={<Register/>}/>
          <Route exact path = "/setPassword" element ={<SetPassword/>}/>       
          <Route exact path = "/reactBigCalendar" element ={<ReactBigCalendar/>}/>
       
         
                 
        </Routes>
          
     
        
           

      </Router>
      
        
    </div>
  );
};

export default App;

