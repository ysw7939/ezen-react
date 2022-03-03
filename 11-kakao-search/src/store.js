import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import blogSlice from './slices/BlogSlice';
import bookSlice from './slices/BookSlice';
import cafeSlice from './slices/CafeSlice';
import imageSlice from './slices/ImageSlice';
import webSlice from './slices/WebSlice';

// Slice 오브젝트 참조 구문 명시 위치
const logger = createLogger();

const store = configureStore({
reducer: {
    'blog': blogSlice,
    'book': bookSlice,
    'cafe': cafeSlice,
    'image': imageSlice,
    'web': webSlice,

},
middleware: [
    ...getDefaultMiddleware({ serializableCheck: false }, logger),
    createLogger()
],

devTools: true
});
export default store;