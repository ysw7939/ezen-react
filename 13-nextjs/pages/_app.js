import '../styles/globals.css'

/** 
 * 모든 페이지들에게 적용되는 공통 컴포넌트 (헤더,푸터를 구현하는 용도)
 * 클래스 형태로 작성해야 함
 * -> 페이지들의 내용이 이 안에 포함되는 개념
 */
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
