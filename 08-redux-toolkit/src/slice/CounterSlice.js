import {createSlice} from '@reduxjs/toolkit'

// Slice 정의 (Action함수 + Reducer의 개념)
export const counterSlice = createSlice({
    name: 'counter',
    // 이 모듈이 관리하고자 하는 상태값들을 명시
    initialState: {
        number: 0,
        color: '#000'
    },
    // 상태값을 갱신하기 위한 함수들을 구현
    // 컴포넌트에서 이 함수들을 호출할 때 전달되는 파라미터는 action.paylood로 전달된다.
    // initialState와 동일한 구조의 JSON을 리턴한다
    reducers: {
        plus: (state, action) => {
            const numberValue = state.number + action.payload;
            let colorValue = '#000';

            if (numberValue > 0) {
                colorValue = '#2f77eb';
            } else if (numberValue < 0) {
                colorValue = '#f60';
            }

            return {number: numberValue, color: colorValue};
        },
        minus: (state, action) => {
            const numberValue = state.number - action.payload;
            let colorValue = '#000';

            if (numberValue > 0) {
                colorValue = '#2f77eb';
            } else if (numberValue < 0) {
                colorValue = '#f60';
            }

            return {number: numberValue, color: colorValue};
        }
    },
});

// 액션함수들 내보내기
export const {plus, minus} = counterSlice.actions;

// 리듀서 객체 내보내기
export default counterSlice.reducer;