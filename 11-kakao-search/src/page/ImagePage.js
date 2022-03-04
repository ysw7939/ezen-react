import React from 'react';

import {useSelector, useDispatch} from 'react-redux'
import {getImageList} from '../slices/ImageSlice';
import {Oval} from 'react-loader-spinner';
import { useInView } from 'react-intersection-observer';

import style from '../assets/scss/styled.module.scss'
import ImageView from '../components/ImageView';

const ImagePage = ({query}) => {
    //페이지 번호 상태 값
    const [page, setPage] = React.useState(1);

    // 무한 스크롤 관련
    const [ref, inView] = useInView();

    // 리덕스 스토어에 저장되어 있는 상태값 받기
    const {rt, rtmsg, item, loading} = useSelector((state) => state.image);

    // 액션함수를 호출하기 위한 디스패치 함수 생성
    const dispatch = useDispatch();

    React.useEffect(()=> {
        setPage(1);
    }, [query]);

    // query 값이 변경될 때만 실행되는 hook을 통해 액션함수 디스패치
    React.useEffect(() => {
        if(!loading) {
            dispatch(getImageList({query: query, page: page}));
        }
    }, [dispatch, page]);

    React.useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
        if(inView && !loading) {
            setPage(page+1);
        }
    }, [inView]);

    return (
        <div>

            {loading && (
                <Oval
                    color='#ff6600'
                    height={100}
                    width={100}
                    wrapperStyle={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        marginLeft:'-50px',
                        marginTop: '-50px',
                    }}
                />
            )}

            {/* 결과값이 실패인 경우 에러메시지 표시, 성공인 경우 목록컴포넌트 호출 */}
            {rt !== 200 ? (
                <div className={style.errmsg}>
                    <h3>{rt} Error</h3>
                    <p>{rtmsg}</p>
                </div>
            ): (
                <ImageView documents={item.documents} inview={ref}/>
            )}
        </div>
    );
};

export default ImagePage;