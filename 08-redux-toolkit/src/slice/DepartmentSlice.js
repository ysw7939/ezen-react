import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// 비동기 처리 함수 구현
// payload는 이 함수를 호출할 때 전달되는 파라미터.
export const getList = createAsyncThunk("department/getList", async (payload, {rejectWithValue}) => {
    let result = null;

    try {
        result = await axios.get('http://localhost:3001/department');
    } catch(err) {
        // 에러발생시 rejectWithValue() 함수에 에러 데이터를 전달하면 ertraReducer의 rejected 함수가 호출된다.
        result = rejectWithValue(err.response);
    }

    return result;
});

export const departmentSlice = createSlice({
    name: 'department',
    // 이 모듈이 관리하고자 하는 상태값들을 명시
    initialState: {
        rt: null,           // HTTP 상태코드
        rtmsg: null,        // 에러메시지
        item: [],           // Ajax 처리를 통해 수신된 데이터
        loading: false,     // 로딩 여부
    },
    // 내부 action 및 동기 action (Ajax처리시에는 사용하지 않음)
    reducers: {},
    //외부 action 및 비동기 action
    extraReducers : {
        [getList.pending]: (state, {payload}) => {
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
        // 옵셔널 체이닝 방식을 활용하여 값의 기본값 설정
        [getList.rejected]: (state, {payload}) => {
            return {
                ...state,
                rt: payload?.status? payload.status : 500,
                rtmsg: payload?.statusText ? payload.statusText : 'Server error',
                item: payload?.data,
                loading: false
            }
        }
    }
});


// 리듀서 객체 내보내기
export default departmentSlice.reducer;