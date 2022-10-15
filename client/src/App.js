import { Route, Switch } from "react-router-dom";
import Landing from "./components/landing/landing";
import Home from "./components/home/home";
import Nav from "./components/NavBar/nav";
import Detail from "./components/detail/detail";
import CreateVideogame from "./components/create_vg/create_vg";
import './App.css';
import React from "react";

function App() {
  return (
    <div className="App">
      
        <Switch>
        <Route exact path='/' render={()=> <Landing/>}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/create' component={CreateVideogame}/>
        <Route path='/videogame/:id' component={Detail}/>
        </Switch>
      
    </div>
  );
}
//<Route path='/' component={Nav}/>
export default App;
