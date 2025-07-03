// File: niches/Regional/Zielonki-Hub/frontend/src/components/AnnouncementForm.jsx

import React, { useState } from 'react';
import {createAnnouncement} from '../services/api'

// Importujemy funkcję do tworzenia ogłoszenia
export default function AnnouncementForm({ onNew }) {
    const [formData, setFormData] = useState({title: '', description: ''});

    const handleChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        const ann = await createAnnouncement(formData);
        if (ann) {
            onNew(ann);
            setFormData({title: '', description: ''});

        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Tytuł" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Opis" required/>
            <button type="submit">Dodaj</button>
        </form>
    );
}
