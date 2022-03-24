// HTML 구조를 재정의하기 위한 참조
import Document, { Html, Head, Main, NextScript } from 'next/document';

// styledComponent를 사용하기 위한 참조
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
    /**
     * 초기화 함수 (고정코드)
     * 이 함수에서 리턴하는 객체를 렌더링 함수 안에서 this.props로 접근한다.
     * 이 함수 안에서 ServerStyleSheet 객체를 사용해서 style객체를 반환해야
     * 컴포넌트 전역에서 styledComponent를 사용할 수 있다.
     */
    static getInitialProps({ renderPage }) {
        // 1) ServerStyleSheet 객체 생성
        const sheet = new ServerStyleSheet();

        // 2) 각 페이지의 컴포넌트에 style가 적용된 결과를 렌더링한 결과 생성
        const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));

        // 3) 컴포넌트에 적용된 style을 styleTags라는 이름으로 객체로 반환함
        const styleTags = sheet.getStyleElement();

        // 4) 반환받은 styleTags를 props로 리턴
        return { ...page, styleTags };
    }

    /**
     * 화면 렌더링 함수 -> Html, Head, Main 첫 글자가 대문자임에 주의
     */
    render() {
        return (
            <Html>
                {/*
                    <head>는 순수 HTML태그. <Head>는 next.js의 컴포넌트.
                    이 안에서 charset과 viewport 지정은 자동으로 이루어진다.
                    그 외에 개발자가 적용하고자 하는 외부 CSS나 JS리소스 참조, SEO 구현등을 처리할 수 있다.
                */}
                <Head>
                    <title>Hello Next.js</title>

                    {/* SEO 메타태그 */}
                    <meta name="description" content="검색결과에 표시될 내용"/>
                    <meta name="robots" content="index,follow" />
                    <meta name="keywords" content="SEO,검색엔진 최적화,메타 태그" />
                    <meta name="author" content="leekh" />

                    {/* SNS 메타태그 */}
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="페이지 제목" />
                    <meta property="og:description" content="페이지 설명" />
                    <meta property="og:image" content="http://www.mysite.com/myimage.jpg" />
                    <meta property="og:url" content="http://www.mysite.com" />

                    {/*  getInitialProps에서 리턴한 styleTags를 출력한다. */}
                    {this.props.styleTags}
                </Head>
                <body>
                    {/* 이 구조를 기본으로 적용한 상태에서 일반 페이지용 js들이 이 위치에 출력된다.
                        만약 _app.js가 정의되어 있다면 _app.js의 구조를 먼저 적용한 후에 페이지가 표시된다. */}
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;