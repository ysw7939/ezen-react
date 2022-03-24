
const World = (props) => {
    return (
        <div>
            <h2>여기는 world.js 입니다.</h2>

            <p>이 페이지는 <b>{props.from}</b>에서 실행되었습니다.</p>

            <ul>
                <li>a={props.a}</li>
                <li>b={props.b}</li>
            </ul>
        </div>
    );
};

// 모든 pages폴더 내의 함수들은 getInitialProps 라는 하위 함수를 갖는다.
// 이 함수를 통해 각 페이지가 웹 프로그램으로 동작할 수 있는 기능을 넘겨받는다.
// ex) 브라우저의 요청을 받기 위한 request 객체 등..
World.getInitialProps = async (props) => {
    console.log(props);

    let from = 'client';

    // 브라우저에 URL을 직접 입력하거나 <a>태그에 의해서 이동된 경우만 req 값이 존재한다.
    if (props.req) {
        from = 'server';

        // req객체의 사용 방법은 node.js 참고
        console.log(props.req);
    }

    // 이 함수에서 return하는 객체는 컴포넌트함수에 props 파라미터로 전달된다.
    return {a: 123, b: 234, from: from};
}

export default World;