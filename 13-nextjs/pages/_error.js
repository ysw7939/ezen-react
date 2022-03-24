import Link from 'next/link';

const MyError = () => {
    return (
        <div>
            <h1>Opps!!!</h1>
            <hr/>
            <p>404에러가 발생했습니다</p>
            <p><Link href="/">홈으로 이동하기</Link></p>
        </div>
    )
}

export default MyError; 