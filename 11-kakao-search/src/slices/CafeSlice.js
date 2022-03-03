import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

// 비동기 처리 함수 구현
export const getCafeList = createAsyncThunk("CAFE/GET_LIST", async(payload, {rejectWebVitals}) => {
    let result = null;

    try {
        const apiUrl = 'https://dapi.kakao.com/v2/search/cafe';
        result = await axios.get(apiUrl, {
            params: {query: payload},
            headers: {Authorization: 'KakaoAK ff9e717a57a525ac5201c5c326224eea'},
        });
    } catch (err) {
        result = rejectWebVitals(err.response);
    }

    return result;
});

// Slice 정의 (Action함수 + Reduser의 개념)
const cafeSlice = createSlice({
    // slice 별칭
    name: 'cafe',
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
        [getCafeList.pending] : (state, {payload}) => {
            return {...state, loading: true}
        },
        [getCafeList.fulfilled]: (state, {payload}) => {
            return {
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                item: payload.data,
                loading: false
            }
        },
        [getCafeList.rejected]: (state, {payload}) => {
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

export default cafeSlice.reducer;