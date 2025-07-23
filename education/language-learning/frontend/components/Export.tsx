import React from 'react';
import axios from 'axios';

export default function ExportButtons() {
    const exportCSV = () => {
        axios.get('/api/leaderboard/export/csv', { responseType: 'blob' })
          .then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'leaderboard.csv');
            document.body.appendChild(link);
            link.click();
          });
    };


const exportPDF = () => {
    axios.get('/api/leaderboard/export/pdf', { responseType: 'blob'})
      .then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'leaderboard.pdf');
        document.body.appendChild(link);
        link.click();
      });
};

return (
    <div className="flex gap-4 mt-6 justify-center">
        <button onClick={exportCSV} className="bg-gray-200 px-4 py-2 rounded">📥 Export CSV</button>
        <button onClick={exportPDF} className="bg-gray-300 px-4 py-2 rounded">📥 Export PDF</button>
    </div>
    );
}