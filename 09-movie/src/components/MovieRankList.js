import React from 'react';

import style from '../assets/scss/style.module.scss'

const MovieRankList = ({boxOfficeResult}) => {
    return (
        <table className={style.table}>
            <thead>
                <tr>
                    <th className={style.textCenter}>순위</th>
                    <th className={style.textCenter}>제목</th>
                    <th className={style.textCenter}>관람객 수</th>
                    <th className={style.textCenter}>매출액</th>
                    <th className={style.textCenter}>누적 관람객 수</th>
                    <th className={style.textCenter}>누적 매출액</th>
                </tr>
            </thead>
            <tbody>
                {boxOfficeResult.dailyBoxOfficeList.map((item, index) => (
                    <tr key={index}>
                        <td className={style.textCenter}>{item.rank}</td>
                        <td className={style.textCenter}>{item.movieNm}</td>
                        <td className={style.textRight}>{Number(item.audiCnt).toLocaleString()}명</td>
                        <td className={style.textRight}>{Number(item.salesAmt).toLocaleString()}원</td>
                        <td className={style.textRight}>{Number(item.audiAcc).toLocaleString()}명</td>
                        <td className={style.textRight}>{Number(item.salesAcc).toLocaleString()}원</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

// 검색 결과가 없을 경우를 대비해 화면 출력에 사용되는 json-key에 대한 기본값을 정의해 둔다
MovieRankList.defaultProps = {
    boxOfficeResult: {
        dailyBoxOfficeList: []
    }
}

export default MovieRankList;