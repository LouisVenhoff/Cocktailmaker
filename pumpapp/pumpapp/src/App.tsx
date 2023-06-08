import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';

import PumpList from './components/pumpList/pumpList';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <h1>Cocktailinator</h1>
        <h2>Hardware Test</h2>
        <PumpList />
      </div>

    </ChakraProvider>
  );
}

export default App;
