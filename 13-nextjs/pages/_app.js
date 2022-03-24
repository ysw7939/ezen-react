import App from 'next/app';

import Header from './components/Header'
import Footer from './components/Footer'

class MyApp extends App {
    /** 초기화함수(고정코드) */
    static async getInitialProps(appContext) {
        // 브라우저가 URL로 접근했을 때,
        // index.js, hello.js, world.js와 같은 일반 페이지 스크립트들을 appContext로 받는다. 
        // 이를 리턴하여 렌더링 함수로 전달해야 한다.
        const appProps = await App.getInitialProps(appContext);
        return { ...appProps };
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <div>
                {/* ... 원한다면 Header 구성 */}
                <Header/>
 
                {/* 일반 페이지 컴포넌트를 출력한다. --> index.js, hello.js, world.js 등 */}
                <Component {...pageProps} />

                {/* ... 원한다면 Footer 구성 */}
                <Footer/>
            </div>
        );
    }
}

export default MyApp;