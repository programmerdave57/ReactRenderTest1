import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import RenderTestApp from './components/RenderTestApp.js';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <RenderTestApp />
    </BrowserRouter>
  );
}

export default App;
