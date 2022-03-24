// 파라미터를 받기 위한 패키지 참조
import {useRouter} from 'next/router';

const Portfolio = () => {
    //hook을 통해 라우터 사용 시작
    const router = useRouter();

    console.log(router.query);

    return (
        <div className='container'>
            <div className='page-header'>
                <h1>포트폴리오</h1>
            </div>
            <pre> {JSON.stringify(router.query)}</pre>
            <hr />

            {/* path 파라미터의 변수명은 파일이름과 동일하다. --> [변수명].js */}
            {
                (router.query.name === 'publishedAt') ? (
                    <div>웹 퍼블리싱 포트폴리오</div>
                ) : ((router.query.name === 'frontend') ? (
                    <div>프론트엔드 포트폴리오</div>
                ): (
                    <div>백엔드 포트폴리오</div>
                ))}
        </div>
    )
}
export default Portfolio;