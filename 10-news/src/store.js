import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import newsSlice  from './slices/NewsSlice'
// Slice 오브젝트 참조 구문 명시 위치
const logger = createLogger();

const store = configureStore({
reducer: {
    news : newsSlice
},
middleware: [
    ...getDefaultMiddleware({ serializableCheck: false }, logger),
    createLogger()
],

devTools: true
});
export default store;