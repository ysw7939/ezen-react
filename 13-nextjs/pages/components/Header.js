import styled from 'styled-components';
import Link from 'next/link';

const MenuLink = styled.a`
    font-size: 20px;
    cursor: pointer;
    text-decoration: none;
    padding-bottom: 2px;
    color: #222;
    line-height:40px;

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

const Header = () => {
    return (
        <div>
            <h1>Hello Next.js</h1>
            <hr/>
            <nav>
                <Link href="/" passHref>
                    <MenuLink>Home</MenuLink>
                </Link>
                <Link href="/hello?num1=100&num2=200" passHref>
                    <MenuLink>Hello(SPA)</MenuLink>
                </Link>
                <Link href="/world?num1=100&num2=200" passHref>
                    <MenuLink>World(SPA)</MenuLink>
                </Link>
                <MenuLink href="/hello?num1=100&num2=200">
                    Hello(SSR)
                </MenuLink>
                <MenuLink href="/world?num1=100&num2=200">
                    World(SSR)
                </MenuLink>
                <Link href="/about/introduce" passHref>
                    <MenuLink>소개글</MenuLink>
                </Link>
                <Link href="/portfolio/publish" passHref>
                    <MenuLink>퍼블리싱</MenuLink>
                </Link>
                <Link href="/portfolio/fontend" passHref>
                    <MenuLink>프론트엔드</MenuLink>
                </Link>
                <Link href="/portfolio/backend" passHref>
                    <MenuLink>백엔드</MenuLink>
                </Link>
            </nav>
            <hr/>
        </div>
    );
};

// 페이지 이동 기능 사용하기
export default Header;