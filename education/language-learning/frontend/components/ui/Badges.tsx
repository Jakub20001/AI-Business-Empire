import React from 'react';

const badges = [
    { name: 'First quiz', icon: '🥇' },
    { name: '1000 XP', icon: '💎'},
    { name: '5 days in a row', icon: '🔥'},
];

export default function Badges() {
    return (
        <div className="max-w-3xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">🎖Your badges</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {badges.map((badge, i) => (
                  <div key={i} className="bg-white shadow p-4 rounded-xl flex items-center justify-between">
                    <span className="text-xl">{badge.icon}</span>
                    <span className="text-md font-medium">{badge.name}</span>
                  </div>
                ))};
            </div>
        </div>
    )
}


