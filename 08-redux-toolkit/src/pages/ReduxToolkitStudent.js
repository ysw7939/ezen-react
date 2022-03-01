import React from 'react';

// 상태값을 로드하기 위한 hook과 action함수를 dispatch할 hook 참조
import { useSelector, useDispatch } from 'react-redux';
// Slice에 정의된 엑션함수들 참조
import { getList } from '../slice/StudentSlice';

const ReduxToolkitStudent = () => {

    React.useEffect(() => console.clear(), []);
    
    // hook을 통해 slice가 관리하는 상태값 가져오기
    const {rt, rtmsg, item, loading} = useSelector((state) => state.student);

    // dispatch 함수 생성
    const dispatch = useDispatch();

    if (loading) {
        return (<div>Loading...</div>);
    }
    
    if (rt !== 200) {
        return (
            <div>
                <h2>{rt} {rtmsg}</h2>
                <button onClick={(e) => {dispatch(getList());}}>getList</button>
            </div>
        )
    }
    return (
        <div>
            <h2>ReduxToolkitStudent</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>학생번호</th>
                        <th>이름</th>
                        <th>아이디</th>
                        <th>학년</th>
                        <th>생년월일</th>
                        <th>번호</th>
                        <th>키</th>
                        <th>몸무게</th>
                        <th>학과번호</th>
                        <th>교수번호</th>
                    </tr>
                </thead>
                <tbody>
                    {item.map((v, i) => {
                        return (
                            <tr key={i}>
                                <td>{v.id}</td>
                                <td>{v.name}</td>
                                <td>{v.userid}</td>
                                <td>{v.grade}</td>
                                <td>{v.birthdate}</td>
                                <td>{v.tel}</td>
                                <td>{v.height}</td>
                                <td>{v.weight}</td>
                                <td>{v.deptno}</td>
                                <td>{v.profno}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button onClick={(e) => {dispatch(getList());}}>getList</button>
        </div>
    );
};

export default ReduxToolkitStudent;