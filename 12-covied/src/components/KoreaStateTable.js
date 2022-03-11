import React from 'react';
import dayjs from 'dayjs'

import style from '../assets/scss/style.module.scss'

const KoreaStateTable = ({ accState }) => {
    return (
        <div className={style.section}>
            <h3 className={style.title}>
                누적 확진자 현황 <small>({dayjs(accState.기준시각).format('M/D h')}시 기준)</small>    
            </h3>
            <table className={style.table}>
                <colgroup>
                    <col width="25%"/>    
                    <col width="25%"/>    
                    <col width="25%"/>    
                    <col width="25%"/>    
                </colgroup>
                <thead>
                    <tr>
                        <th>확진환자</th>
                        <th>격리해제</th>
                        <th>격리중</th>
                        <th>사망</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{Number(accState.확진환자).toLocaleString()}</td>
                        <td>{Number(accState.격리해제).toLocaleString()}</td>
                        <td>{Number(accState.격리중).toLocaleString()}</td>
                        <td>{Number(accState.사망).toLocaleString()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

//값의 출처가 Ajax인 경우 실제 값이 수신되기 까지 시간차가 발생하기 때문에,
// 값이 존재하지 않는 타이밍이 있을 수 있다.
// 이 상황을 방지하기 위해 기본 속성을 반드시 정의해야 한다.
KoreaStateTable.defaultProps = {
    accState: {
        기준시각: null,
        확진환자: 0,
        격리해제: 0,
        격리중: 0,
        사망: 0,
    }
}

export default KoreaStateTable;