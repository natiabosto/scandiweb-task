import React from 'react';
import 'App.css';
import scandiwebImage from './scandiweb.png';

const App = () => (
  <div>
    <h1 className='test'>
      hello react
    </h1>
    <img src={scandiwebImage} alt='alt' />
  </div>
);

export default App;