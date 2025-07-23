import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '../components/ui/card';
import { Crown } from 'lucide-react';

interface User {
    username: string;
    xp: number;
    level: number;
    badges?: string[];
}

export default function Leaderboard() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        axios.get('/api/leaderboard')
          .then(res => setUsers(res.data))
          .catch(err => console.error(err));
    }, []);

    if (users.length === 0){
      return <div className="text-center mt-10 text-gray-600">No data available</div>
    }
    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center">🏆 Leaderboard</h1>
            <div className="grid gap-4">
                {users.map((user, index) => (
                    <div key={index}>
                        <Card className={`flex items-center p-4 shadow-md rounded-2xl ${index === 0 ? 'bg-yellow-100' : ''}`}>
                            <div className="w-10 text-center text-xl font-bold">
                                {index < 3 ? <Crown className="text-yellow-400" /> : index + 1}
                            </div>
                            <CardContent className="flex-1 flex justify-between items-center gap-4">
                                <div className="text-lg">{user.username}</div>
                                <div className="text-sm text-gray-500">Lvl {user.level}</div>
                                <div className="text-right text-blue-600 font-semibold">{user.xp} XP</div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}