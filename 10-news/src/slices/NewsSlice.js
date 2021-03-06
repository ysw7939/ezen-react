import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

// 비동기 처리 함수 구현
export const getList = createAsyncThunk("GET_LIST", async(payload, {rejectWebVitals}) => {
    let result = null;

    try {
        const apiUrl = 'https://newsapi.org/v2/top-headlines';
        result = await axios.get(apiUrl, {
            params: {
                apiKey: '68de9f1bb6d24858bb5bf43439ab9840',
                country: 'kr',
                category: payload
            }
        });
    } catch (err) {
        result = rejectWebVitals(err.response);
    }

    return result;
});

// Slice 정의 (Action함수 + Reduser의 개념)
const newsSlice = createSlice({
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
        [getList.pending] : (state, {payload}) => {
            return {...state, loading: true}
        },
        [getList.fulfilled]: (state, {payload}) => {
            return {
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                item: payload.data,
                loading: false
            }
        },
        [getList.rejected]: (state, {payload}) => {
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

export default newsSlice.reducer;