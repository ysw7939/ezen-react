import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { counterSlice } from './slice/CounterSlice';
import { departmentSlice } from './slice/DepartmentSlice';
import { professorSlice } from './slice/ProfessorSlice';
import { studentSlice } from './slice/StudentSlice';
// Slice 오브젝트 참조 구문 명시 위치
const logger = createLogger();

const store = configureStore({
   
   reducer: {
      // 개발자가 직접 작성한 Slice 오브젝트들이 명시되어야 한다.
      counter: counterSlice.reducer,
      department: departmentSlice.reducer,
      professor: professorSlice.reducer,
      student: studentSlice.reducer
   },
   // 미들웨어를 사용하지 않을 경우 이 라인 생략 가능
   middleware: [...getDefaultMiddleware({serializableCheck: false}), logger],
   // redux-devtools-extension을 사용하지 않을 경우 false 혹은 이 라인 명시 안함
   devTools: true
});
export default store;