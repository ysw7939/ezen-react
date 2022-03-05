import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

// 비동기 처리 함수 구현
export const getBookList = createAsyncThunk("BOOK/GET_LIST", async(payload, {rejectWebVitals}) => {
    let result = null;

    if (payload) {
        try {
            const apiUrl = 'https://dapi.kakao.com/v3/search/book';
            result = await axios.get(apiUrl, {
                params: {query: payload, size: 50},
                headers: {Authorization: 'KakaoAK ff9e717a57a525ac5201c5c326224eea'},
            });
        } catch (err) {
            result = rejectWebVitals(err.response);
        }
    }

    return result;
});

// Slice 정의 (Action함수 + Reduser의 개념)
const bookSlice = createSlice({
    // slice 별칭
    name: 'book',
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
        [getBookList.pending] : (state, {payload}) => {
            return {...state, loading: true}
        },
        [getBookList.fulfilled]: (state, {payload}) => {
            return {
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                item: payload.data,
                loading: false
            }
        },
        [getBookList.rejected]: (state, {payload}) => {
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

export default bookSlice.reducer;