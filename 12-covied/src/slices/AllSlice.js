import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

// 비동기 처리 함수 구현
export const getAllList = createAsyncThunk("All/GET_LIST", async(payload, {rejectWebVitals}) => {
    let result = null;

    try {
        result = await axios.get('http://itpaper.co.kr/demo/covid19/all.php');
        console.log(result);
    } catch (err) {
        result = rejectWebVitals(err.response);
    }

    return result;
});

// Slice 정의 (Action함수 + Reduser의 개념)
const allSlice = createSlice({
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
        [getAllList.pending] : (state, {payload}) => {
            return {...state, loading: true}
        },
        [getAllList.fulfilled]: (state, {meta, payload}) => {
            // 데이터 추출
            const { data } = payload;
            console.group("원본 데이터");
            console.log(data);
            console.groupEnd();

            // 통신결과 중에서 각 컴포넌트에 전달할 겂을 추혀낸다.

            // 1) 누적 확진자 현황
            const accState = {'기준시각': data.collection_datetime, '확진환자': 0, '격리해제': 0, '격리중': 0, '사망': 0};

            // 2) 일주일간의 확진자 현황
            const confirmState = {'날짜': [], '누적확진': [], '일일확진': []}

            // 3) 일주일간의 겨리해제 현황
            const releaseState = {'날짜': [], '누적격리해제': [], '일일격리해제': []}

            // 지역별 데이터만 추출
            // --> response.data는 ajax를 통해 얻은 json 결과.
            // --> response.data.data는 ajax결과 안에 포함된 data라는 이름의 key
            const cityData = data.data;

            // 지역명만 추출 (json의 key만 추출)
            const cityNames = Object.getOwnPropertyNames(cityData);

            // 지역수 만큼 반복
            cityNames.forEach((v, p) => {
                //도시 하나를 추출한다. --> 배열형태
                const cityItem = cityData[v];

                // 가장 마지막 원소를 가져온다(가장 최근 데이터)
                const lastIndex = cityItem.confirmed_acc.length - 1;

                // 전국 데이터를 모아야 하므로 각 도시 값을 합산한다. 
                accState.확진환자 += cityItem.confirmed_acc[lastIndex];
                accState.격리해제 += cityItem.released_acc[lastIndex];
                accState.격리중 += cityItem.active[lastIndex];
                accState.사망 += cityItem.death_acc[lastIndex];

                // 일주일 전에 해당하는 위치를 가리키는 인덱스
                const weekIndex = cityItem.confirmed_acc.length - 8;

                // 일주일치를 반복(i=ajax로 가져온 전체 배열의 index, j는 그래프용으로 생성한 weekState의 index)
                for (let i = weekIndex, j = 0; i < cityItem.confirmed_acc.length; i++, j++) {
                    // confirmState.날짜 배열에 cityItem.date[i] 과 일치하는 값의 위치를 검색
                    // --> 일치하는 정보가 없다면(=신규로 추가되는 데이터라면?) -1이 변환됨
                    if (confirmState.날짜.indexOf(cityItem.date[i]) === -1) {
                        // 신규 항목이므로 데이터 추가
                        confirmState.날짜.push(cityItem.date[i]);
                        confirmState.누적확진.push(parseInt(cityItem.confirmed_acc[i]));
                        confirmState.일일확진.push(parseInt(cityItem.confirmed[i]));
                        releaseState.날짜.push(cityItem.date[i]);
                        releaseState.누적격리해제.push(parseInt(cityItem.released_acc[i]));
                        releaseState.일일격리해제.push(parseInt(cityItem.released[i]));
                    } else {
                        confirmState.누적확진[j] += parseInt(cityItem.confirmed_acc[i]);
                        confirmState.일일확진[j] += parseInt(cityItem.confirmed[i]);
                        releaseState.누적격리해제[j] += parseInt(cityItem.released_acc[i]);
                        releaseState.일일격리해제[j] += parseInt(cityItem.released[i]);
                    }
                }
            })
            // 추출한 값을 통신 결과에 병합
            const response = {
                ...data,
                result: {
                    accState: accState,
                    confirmState: confirmState,
                    releaseState: releaseState
                }
            }

            console.group("데이터 변환 결과")
            console.log(response);
            console.groupEnd();

            return {
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                item: response,
                loading: false
            }
        },

        [getAllList.rejected]: (state, {payload}) => {
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

export default allSlice.reducer;