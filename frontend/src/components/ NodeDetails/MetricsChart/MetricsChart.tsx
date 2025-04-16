import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);



function MetricsChart({ metrics }) {
    // Из метрик строим график. Предполагаем на основе данных с сервера, что каждая метрика имеет поля: datetime, cpu_utilization, memory_utilization, disk_utilization.
    const labels:[] = metrics.map(m => m.datetime);
    const data = {
        labels,
        datasets: [
            {
                label: 'CPU Utilization',
                data: metrics.map(m => m.cpu_utilization),
                borderColor: 'red',
                backgroundColor: 'rgba(255,0,0,0.5)',
                tension: 0.3,
            },
            {
                label: 'Memory Utilization',
                data: metrics.map(m => m.memory_utilization),
                borderColor: 'blue',
                backgroundColor: 'rgba(0,0,255,0.5)',
                tension: 0.3,
            },
            {
                label: 'Disk Utilization',
                data: metrics.map(m => m.disk_utilization),
                borderColor: 'green',
                backgroundColor: 'rgba(0,255,0,0.5)',
                tension: 0.3,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Метрики ноды' },
        },

    };


    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return <Line data={data} options={options} />;
}

export default MetricsChart;
