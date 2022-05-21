import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
function LineChart({ chartOptions, title, data, label, width, height }) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );


    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: title,
            },
            tooltip: {
                enabled: false
            },
        },
        elements: {
            point: {
                radius: 0
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    display: false,
                },
            }
        },


    };

    const chartData = {

        labels: label,
        datasets: [
            {
                label: 'Coin',
                fill: false,
                lineTension: 0.5,
                backgroundColor: '#1e2630',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
                data: data
            }
        ]

    }
    return (
        <div>
            <Line
                data={chartData}
                options={chartOptions ? chartOptions : options}
                width={width} height={height}
            />
        </div>
    )
}

export default LineChart
