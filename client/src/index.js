import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ContextStore } from './ContextStore';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(

   <ContextStore>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </ContextStore>,

   document.getElementById('root')
);

reportWebVitals();
