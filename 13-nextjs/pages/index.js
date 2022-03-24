// 링크를 적용하기 위해 import 필요함 (nextjs 전용)
import Link from 'next/link'

// 함수 이름은 URL에 영향을 주지 않는다. 오직 파일 이름으로만 URL이 결정된다.
const Home = (props) => {
  return (
      <div>
          <h1>여기는 index.js 입니다.</h1>
      </div>
  )
}

export default Home;