import React from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './components/header/header';
import ScrollView from './components/scrollView/scrollView';


function App() {
  return (
    <div className="App">
      <Header headline="Cocktails" backBtnActive={true}/>
      <ScrollView title="Cocktailkarte"/>
    </div>
  );
}

export default App;
