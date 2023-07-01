import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Socket from './classes/socket/socket';
import Header from './components/header/header';
import ScrollView from './components/scrollView/scrollView';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CocktailPage from './components/cocktailPage/cocktailPage';

//DEBUG
import Cocktail from './classes/cocktail/cocktail';
import settings from "../src/settings/cocktails.json";


type LoginCommand = {
    id: "",
    key: "",
}


function App() {
  

  const [connected, setConnected] = useState<boolean>(false);
  const [machineKey, setMachineKey] = useState<string>("");

  const [conn, setConn] = useState<Socket>(Socket.getInstance("ws://localhost:3014/ws", true, () => {login()}, () => {setConnected(false)}, (payload:any) => {messageHandler(payload)}))
  
  const test:Cocktail = new Cocktail(settings[0].name, settings[0].mesh, settings[0].content);

  const login = () => {

    let payload:LoginCommand = {
      id:"",
      key:""
    }

    conn.send(payload);

  }


  const messageHandler = (payload:any) => {
    
    if(machineKey === "" && payload.Key !== undefined)
    {
        setMachineKey(payload.Key);
    }
  }



  
  return (
    <div className="App">
      <Header headline="Cocktails" backBtnActive={true}/>
          
            <Router>
              <Routes>
                <Route path="/"  element={<ScrollView title="Cocktailkarte"/>}/>
                <Route path="/detail"  element={<CocktailPage  element={test}/>}/>
              </Routes>
            </Router>
          
          
          {/* <ScrollView title="Cocktailkarte"/> */}
    </div>
  );
}

export default App;
