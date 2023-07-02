import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import cocktailReducer from "./features/currentCocktail";

 
const theme = extendTheme({
   colors:{
    lightcoral: {
      50: '#fff4f4',
      100: '#ffdfdf',
      200: '#ffcccc',
      300: '#ffb8b8',
      400: '#ffa3a3',
      500: '#ff8e8e',
      600: '#ff7a7a',
      700: '#ff6565',
      800: '#ff5151',
      900: '#ff3c3c',
   },
  },
})


const store = configureStore({
  reducer:{
    currentCocktail: cocktailReducer
  }
})



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ChakraProvider resetCSS={false} theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
