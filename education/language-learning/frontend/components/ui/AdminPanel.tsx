import React, {useState} from 'react';
import axios from 'axios';

export default function AdminPanel() {
    const [username, setUsername] = useState('');
    const [xp, setXp] = useState(0);
    const [badge, setBadge] = useState('');

    const handleXpSubmit = () => {
        axios.post('/api/admin/add-xp', {username, xp})
          .then(() => alert('XP added'))
          .catch(() => alert('Error adding XP'));
    };

    const handleBadgeSubmit = () => {
        axios.post('/api/admin/add-badge', {username, badge })
          .then(() => alert("Badge added!"))
          .catch(() => alert("Error adding badge"));
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-4 shadow rounded-xl bg-white">
            <h2 className="text-2xl font-bold mb-4">🛠️ Admin panel</h2>

            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"
              className="w-full mb-3 p-2 border rounded"/>

            <div className="flex gap-2 mb-3">
                <input type="number" value={xp} onChange={e => setXp(parseInt(e.target.value))}
                  placeholder="XP" className="p-2 border rounded w-full"/>
                <button onClick={handleXpSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">+XP</button>
            </div>

            <div className="flex-gap-2">
                <input value={badge} onChange={e => setBadge(e.target.value)} placeholder="Badge name"
                  className="p-2 border rounded w-full"/>
                <button onClick={handleBadgeSubmit} className="bg-green-600 text-white px-4 py-2 rounded">🎖 Badge</button>  
            </div>
        </div>
    );
}

