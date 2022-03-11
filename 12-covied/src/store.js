import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import allSlice  from './slices/AllSlice'
import nowSlice  from './slices/NowSlice'
// Slice 오브젝트 참조 구문 명시 위치
const logger = createLogger();

const store = configureStore({
reducer: {
    all : allSlice,
    now : nowSlice
},
middleware: [
    ...getDefaultMiddleware({ serializableCheck: false }, logger),
    createLogger()
],

devTools: true
});
export default store;