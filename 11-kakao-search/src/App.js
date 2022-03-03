import React from 'react';
import { Routes, Route } from "react-router-dom"

import Meta from './components/Meta';
import Top from './components/Top';

import BlogPage from './page/BlogPage';
import BookPage from './page/BookPage';
import CafePage from './page/CafePage';
import ImagePage from './page/ImagePage';
import WebPage from './page/WebPage';




const App = () => {
  return (
    <div>
      <Meta />
      <Top />
      <Routes>
        <Route path='/blog' element={<BlogPage/>} />
        <Route path='/book' element={<BookPage/>} />
        <Route path='/cafe' element={<CafePage/>} />
        <Route path='/image' element={<ImagePage/>} />
        <Route path='/web' element={<WebPage/>} />
      </Routes>
      
    </div>
  );
};

export default App;