import React from 'react';
import { Routes, Route } from "react-router-dom"

import Meta from './components/Meta';
import Top from './components/Top'

import KoreaStatePage from './pages/KoreaStatePage'
import SidoState from './pages/SidoStatePage'
import style from './assets/scss/style.module.scss';

const App = () => {
  return (
    <div className={style.container}>
      <Meta />
      <Top />
      <Routes>
        <Route path="/korea_state" element={<KoreaStatePage/>} />
        <Route path="/sido_state" element={<SidoState/>} />
      </Routes>
      
    </div>
  );
};

export default App;