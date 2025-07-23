import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface LogEntry {
    action: string;
    xp: number;
    date: string;
}

export default function XPLog() {
    const [log, setLog] = useState<LogEntry[]>([]);

    useEffect(() => {
        axios.get('/api/xp/log')
          .then(res => setLog(res.data))
          .catch(err => console.error(err));
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">History of points scored</h2>
            <ul className="">
                {log.map((entry, i) => (
                    <li key={i} className="bg-gray-100 rounded-lg p-3 flex justify-between">
                        <span>{entry.action}</span>
                        <span className="text-blue-600 font-semibold">+{entry.xp} XP</span>
                        <span className="text-gray-500 text-sm">{new Date(entry.date).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}