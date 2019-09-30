import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRenderTest from './components/AppRenderTest';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppRenderTest />
    </BrowserRouter>
  );
}

export default App;
