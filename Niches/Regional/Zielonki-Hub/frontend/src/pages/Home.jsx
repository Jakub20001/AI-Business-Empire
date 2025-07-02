import React, { useEffect, useState } from 'react';
import {getAnnouncements} from '../services/api';
import AnnouncementForm from '../components/AnnouncementForm';

export default function Home() {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        getAnnouncements().then(setAnnouncements);
    }, []);

    return (
        <div>
            <h1>Zielonki Hub - Ogłoszenia</h1>
            <AnnouncementForm onNew={ann => setAnnouncements([...announcements, ann])}/>
            <ul>
                {announcements.map(a => (
                    <li key={a.id}>
                        <h3>{a.title}</h3>
                        <p>{a.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
