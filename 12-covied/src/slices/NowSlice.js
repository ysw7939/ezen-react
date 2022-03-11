import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

// 비동기 처리 함수 구현
export const getNowList = createAsyncThunk("NOW/GET_LIST", async(payload, {rejectWebVitals}) => {
    let result = null;

    try {
        result = await axios.get('http://itpaper.co.kr/demo/covid19/now.php');
        console.log(result);
    } catch (err) {
        result = rejectWebVitals(err.response);
    }

    return result;
});

// Slice 정의 (Action함수 + Reduser의 개념)
const nowSlice = createSlice({
    // slice 별칭
    name: 'news',
    // 상태값 구조 정의
    initialState: {
        rt: null,
        rtmsg: null,
        item: [],
        loading: false
    },
    // 내부 action 및 동기 action
    reducers: {},
    // 외부 action 및 비동기 action
    extraReducers: {
        [getNowList.pending] : (state, {payload}) => {
            return {...state, loading: true}
        },
        [getNowList.fulfilled]: (state, {meta, payload}) => {
            // 데이터 추출
            const {data} = payload;
            console.group("원본데이터");
            console.log(data);
            console.groupEnd();

            // 통신결과 중에서 그래프에 출력하기 위한 값을 추려낸다.
            const newData = data.state.slice().sort((a, b) => b.confirmed - a.confirmed)
            const result = {지역명: [], 누적확진자: []}

            newData.forEach((v, i) => {
                result.지역명[i] = v.region;
                result.누적확진자[i] = v.confirmed;
            })

            
            // 누적확진자 값이 큰 순서대로 정렬하기 위한 순차정렬 알고리즘 적용
            // for (let i = 0; i < result.누적확진자.length - 1; i++) {
            //     for (let j = i + 1; j < result.누적확진자.length; j++) {
            //         if(result.누적확진자[i] < result.누적확진자[j]) {
            //             const tmp1 = result.누적확진자[i];
            //             result.누적확진자[i] = result.누적확진자[j]
            //             result.누적확진자[j] = tmp1

            //             const tmp2 = result.지역명[i];
            //             result.지역명[i] = result.지역명[j];
            //             result.지역명[j] = tmp2;
            //         }
            //     }
            // }

            // Ajax 결과를 로그에 출력
            const response = {
                ...data,
                result: result
            }
            console.group("데이터 변환 결과")
            console.log(response);
            console.groupEnd();

            return {
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                item: response,
                loading: false
            }
        },
        [getNowList.rejected]: (state, {payload}) => {
            return {
                ...state,
                rt: payload?.status ? payload.statusText : '500',
                rtmsg: payload?.statusText ? payload.statusText : 'Server error',
                item: payload?.data,
                loading: false
            }
        }
    }
})

export default nowSlice.reducer;