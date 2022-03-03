import React from 'react';
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

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
    return (
        <div>
            <h1>헤드라인 뉴스</h1>
            <hr />
            <nav>
                <MenuLink to="/web">웹</MenuLink>
                <MenuLink to="/business">비즈니스</MenuLink>
                <MenuLink to="/entertainment">엔터네이먼트</MenuLink>
                <MenuLink to="/health">건강</MenuLink>
                <MenuLink to="/science">과학</MenuLink>
                <MenuLink to="/sports">스포츠</MenuLink>
                <MenuLink to="/technology">기술</MenuLink>
            </nav>
        </div>
    );
};

export default Top;