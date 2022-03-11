import React from 'react';

import style from '../assets/scss/style.module.scss'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import {Bar} from "react-chartjs-2"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const SidoConfirmAccChart = ({지역명, 누적확진자}) => {
    // 그래프 옵션
    const options ={
        indexAxis: "y",
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            }
        },
    };

    // chart에 표시될 데이터 (막대그래프용)
    const data = {
        // x축에 나타날 항목들
        labels: 지역명,
        // y축에 값을 비롯한 기타 옵션들
        datasets: [
            {
                // 그래프 제목
                label: "누적확진자",
                backgroundColor: '#15A8DE',
                borderColor: '#15A8DE',
                borderWidth: 1,
                hoverBackgroundColor: '#15A8DE',
                hoverBorderColor: '#15A8DE',
                // 그래프 각 항목별 y출 수치값
                data: 누적확진자,
            }
        ],
    }
    return (
        <div>
            <h2 className={style.title}>시도별 누적 확진자 현황</h2>
            <Bar data={data} options={options}/>
        </div>
    );
};

SidoConfirmAccChart.defaultProps = {
    지역명: [],
    누적확진자: [],
}

export default SidoConfirmAccChart;