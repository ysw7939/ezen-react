import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom"
import qs from 'qs';

import Meta from './components/Meta';
import Top from './components/Top';

import BookPage from './page/BookPage';
import style from './assets/scss/styled.module.scss'


const App = () => {

  // Top.js에서 클릭된 링크에 의해 전달되는 QueryString을 추출한다.
  const {search} = useLocation();
  console.log(useLocation());

  // 추출된 QueryString을 JSON객체로 파싱하고 key가 query인 값만 추출한다.
  const json = qs.parse(search, {ignoreQueryPrefix: true});
  console.log(json)
  return (
    <div className={style.container}>
      <Meta />
      <Top />
      <Routes>
        <Route path='/book' element={<BookPage query={json.query} order={json.order} />} />
      </Routes>
      
    </div>
  );
};

export default App;