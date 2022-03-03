import React from 'react';
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux';

import {getBlogList} from '../slices/BlogSlice'
import {getBookList} from '../slices/BookSlice'
import {getCafeList} from '../slices/CafeSlice'
import {getImageList} from '../slices/ImageSlice'
import {getWebList} from '../slices/WebSlice'

const MenuLink = styled(NavLink)`
    font-size: 20px;
    cursor: pointer;
    text-decoration: none;
    padding-bottom: 2px;
    color: #222;

    &:hover {
        color: #22b8cf;
    }

    &:after {
        content: '|';
        display: inline-block;
        padding: 0 7px;
        color: #ccc;
    }

    &:last-child {
        &:after { 
            color: #fff;
        }
    }

    &.active {
        text-decoration: underline;
        color: #22b8cf;
        &:after {
            border-bottom: 4px solid #fff !important;
        }
    }
`;

const Top = () => {

    // HTML 태그에 접근할 수 있는 참조변수를 생성
    const inputQuery = React.useRef();

    const {rt, rtmsg, item, loading } = useSelector((state) => state.blog);
    const dispatch = useDispatch();

    // 검색폼에 대한 이벤트 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();

        //input택의 입력값 가져오기
        const value = inputQuery.current.value;

        if(!value) {
            inputQuery.current.focus();
            alert('검색어를 입력하세요.')
            return;
        }

        console.log(value);
        dispatch(getBookList(value));
        dispatch(getCafeList(value));
        dispatch(getBlogList(value));
        dispatch(getImageList(value));
        dispatch(getWebList(value));
    }
    return (
        <div>
            <h1>카카오 검색</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <input type="search" name='query' ref={inputQuery}/>
                <button type='submit'>검색</button>
            </form>
            <nav>
                <MenuLink to="/web">웹</MenuLink>
                <MenuLink to="/image">이미지</MenuLink>
                <MenuLink to="/blog">블로그</MenuLink>
                <MenuLink to="/cafe">카페</MenuLink>
                <MenuLink to="/book">책</MenuLink>
            </nav>
        </div>
    );
};

export default Top;