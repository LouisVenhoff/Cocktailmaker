import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Socket from './classes/socket/socket';
import Header from './components/header/header';
import ScrollView from './components/scrollView/scrollView';
import CocktailPage from './components/cocktailPage/cocktailPage';
import { configureStore } from '@reduxjs/toolkit';
import {useSelector} from "react-redux"; 


//DEBUG
import Cocktail from './classes/cocktail/cocktail';
import settings from "../src/settings/cocktails.json";
import PageLogic from './classes/pageLogic/pageLogic';
import { Page } from './classes/pageLogic/pages';


type LoginCommand = {
    id: "",
    key: "",
}


function App() {
  

  const [connected, setConnected] = useState<boolean>(false);
  const [machineKey, setMachineKey] = useState<string>("");

  const [conn, setConn] = useState<Socket>(Socket.getInstance("ws://localhost:3014/ws", true, () => {login()}, () => {setConnected(false)}, (payload:any) => {messageHandler(payload)}))
  
  const [currentCocktail, setCurrentCocktail] = useState<Cocktail>(new Cocktail("Placeholder", settings[0].mesh, []));

  const cocktailRedux = useSelector((state:any) => state.currentCocktail.value);
  const pageRedux = useSelector((state:any) => state.currentPage.value);


  const [renderElement, setRenderElement] = useState<JSX.Element>(<ScrollView title="Cocktailkarte"/>);

  // const test:Cocktail = new Cocktail(settings[0].name, settings[0].mesh, settings[0].content); //Debug
  
  useEffect(() => {

        if(cocktailRedux.objStr !== "")
        {
            let cocktailElement:Cocktail = Cocktail.instantiate(cocktailRedux.objStr);
          
            console.log(cocktailElement);

            setRenderElement(<CocktailPage element={cocktailElement}/>);
        }

  },[pageRedux.page]);



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

  // const getCurrentCocktail = ():Cocktail => {
    
  //   let cocktailJSON = cocktailRedux.objStr;

  //   let tempCocktail:Cocktail = currentCocktail;

  //  if(cocktailJSON === "")
  //  {
  //     console.log("No Cocktail found");
  //  }
  //  else
  //  {
  //     tempCocktail = JSON.parse(cocktailJSON);
  //  }
    
    
  //   return tempCocktail;
  // }



  
  return (
    <div className="App">
      <Header headline="Cocktails" backBtnActive={true}/>
          {renderElement}
    </div>
  );
}

export default App;
