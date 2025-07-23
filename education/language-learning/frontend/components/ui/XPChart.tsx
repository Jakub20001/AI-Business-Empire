import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function XPChart() {
    const [data, setData] = useState<{ date: string; xp: number }[]>([]);

    useEffect(() => {
        axios.get('/api/xp/chart')
          .then(res => setData(res.data))
          .catch(err => console.error(err));
    }, []);

    const  chartData = {
        labels: data.map(d => new Date(d.date).toLocaleDateString()),
        datasets: [
            {
                label: 'XP dziennie',
                data: data.map(d => d.xp),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                tension: 0.3
            }
        ]
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">📈 Statistics XP</h2>
            <Line data={chartData}/>
        </div>
    );
}
