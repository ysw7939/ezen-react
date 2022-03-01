import {createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import dayjs from 'dayjs';

// 비동기 처리 함수 구현
export const getList = createAsyncThunk("GET_LIST", async (payload, {rejectWithValue}) => {

    if (payload === undefined) {
        payload = dayjs().add(-1, 'd').format('YYYYMMDD');
    }

    const targetDt = payload.replaceAll("-", "");
    let result = null;

    try {
        const date = dayjs().add(-1, 'd').format('YYYYMMDD');
        if (parseInt(targetDt) > parseInt(date)) {
            const err = new Error();
            err.response = {status: 400, statusText:'조회 가능한 날짜는 하루 전 까지만 가능합니다'};
            throw err;
        }
        
        const apiUrl = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json'

        result = await axios.get(apiUrl, {
            //연동 규격서에 명시된 요청 변수들 정의
            params: {key: '98167a66ca5ea845fd79bcd4f2e26a1b', targetDt: targetDt}
        });

        if (result.data.faultInfo !== undefined) {
            const err = new Error()
            err.response = {status: 500, statusText: result.data.faultInfo.message};
            throw err;
        }
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

export const movieRankSlice = createSlice({
    name: 'movieRank',
    initialState: {
        // 상태값 구조 정의 
        rt: null,
        rtmsg: null,
        data: null,
        loading: false
    },

    reducers: {},

    extraReducers: {
        [getList.pending]: (state, {payload}) => {
            return {...state, loading: true}
        },
        [getList.fulfilled]: (state, {payload}) => {
            const chartData = {movieNm: [], audiCnt: []}

            payload.data.boxOfficeResult.dailyBoxOfficeList.forEach((v, i) => {
                chartData.movieNm[i] = v.movieNm;
                chartData.audiCnt[i] = v.audiCnt;
            });

            // 추러낸 값을 통신 결과에 병합한다.
            payload.data.chartData = chartData;

            // state값을 적절히 수정하여 리턴한다.
            return {
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                data: payload.data,
                loading: false
            }
        },
        [getList.rejected]: (state, {payload}) => {
            return {
                ...state,
                rt: payload?.status ? payload.statusText : '500',
                rtmsg: payload?.statusText ? payload.statusText : 'Server error',
                loading: false
            }
        }
    },
});

// 리듀서 객체 내보내기
export default movieRankSlice.reducer;