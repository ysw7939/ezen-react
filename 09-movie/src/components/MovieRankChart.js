import React from 'react';

import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

import {Bar} from 'react-chartjs-2';

ChartJS.register (
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const MovieRankChart = ({chartData, targetDt}) => {

    // 그래프 옵션
    const options = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: targetDt + '관람객 수 순위',
            },
        },
    };

    // chart에 표시될 데이터 (막대그래프용)
    const data = {
        // r출에 나타날 항목들
        labels: chartData.movieNm,
        // y축의 값을 비롯한 기타 옵션들
        datasets: [
            {
                // 그래프 제목
                label: '관람객 수',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor : 'rgba(255,99,132,1)',
                // 그래프 각 항목별 y축 수치값
                data: chartData.audiCnt,
            }
        ]
    };
    return (
        <Bar
            data={data}
            options={options}
        />
    )
}

// 검색 결과가 없을 경우를 대비해 화면 출력에 사용되는 json-key에 대한 기본값을 정의해 둔다.
MovieRankChart.defultProps = {
    chartData: {
        movieNm: [],
        audiCnt: []
    }
}

export default MovieRankChart;