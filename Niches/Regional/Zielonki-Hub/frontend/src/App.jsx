// File: niches/Regional/Zielonki-Hub/frontend/src/App.jsx

import React, { useEffect, useState } from 'react';
import './App.css'
import { getAnnouncements, createAnnouncement, deleteAnnouncement, login, register } from './services/api'; 

// Importujemy funkcje z pliku api.js
function App() {
    const [announcements, setAnnouncements] = useState([]);
    const [formData, setFormData] = useState({ id: '', title: '', description: '' });
    const [authForm, setAuthForm] = useState({ username: '', password: '' });
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
      fetchAnnouncements();
    }, []);
// Fetchujemy ogłoszenia przy pierwszym renderze komponentu
    const fetchAnnouncements = async () => {
        const data = await getAnnouncements();
        setAnnouncements(data);
    };
// Funkcja do pobierania ogłoszeń z API
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
// Funkcja do obsługi zmian w formularzu ogłoszenia
    const handleAuthChange = (e) => {
        setAuthForm({ ...authForm, [e.target.name]: e.target.value });
    };
// Funkcja do obsługi zmian w formularzu autoryzacji (logowanie/rejestracja)
    const handleRegister = async () => {
        await register(authForm.username, authForm.password);
        alert("Zarejestrowano pomyślnie. Możesz się teraz zalogować.");
    };
// Funkcja do zalogowania nowego użytkownika
    const handleLogin = async () => {
        await login(authForm.username, authForm.password);
        setIsLoggedIn(true);
        fetchAnnouncements();
    };
// Funkcja do wylogowania użytkownika
    const handleLogout = async (e) => {
        e.preventDefault();
        // You probably want to log out the user here, not create an announcement.
        // If you want to just log out, clear the token and update isLoggedIn:
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };
// Funkcja do zgłaszania nowego ogłoszenia
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newAnnouncement = await createAnnouncement(formData);
        if (newAnnouncement) {
            setAnnouncements([...announcements, newAnnouncement]);
            setFormData({ title: '', description: ''});
        }
    };
// Funkcja do usunięcia ogłoszenia
    const handleDelete = async (id) => {
        await deleteAnnouncement(id);
        setAnnouncements(announcements.filter((a) => a.id !== id));
    };


    return (
        <div className="App">
            <h1>Zielonki Hub - Ogłoszenia</h1>

            {isLoggedIn ? (
            <>
                    <button onClick={handleLogout}>Wyloguj się</button>

                    <form onSubmit={handleSubmit}>
                        <input name="id" placeholder="ID" value={formData.id} onChange={handleChange} required />
                        <input name="title" placeholder="Tytuł" value={formData.title} onChange={handleChange} required />
                        <textarea name="description" placeholder="Opis" value={formData.description} onChange={handleChange} required />
                        <button type="submit">Dodaj ogłoszenie</button>
                    </form>
                </>
            ) : (
                <div className="auth">
                    <input name="username" placeholder="Login" value={authForm.username} onChange={handleAuthChange} />
                    <input name="password" type="password" placeholder="Hasło" value={authForm.password} onChange={handleAuthChange}/>
                    <button onClick={handleLogin}>Zaloguj się</button>
                    <button onClick={handleRegister}>Zarejestruj się</button>
                </div>
            )}    
            <ul>
                {announcements.map((a) => (
                    <li key={a.id}>
                        <h3>{a.title}</h3>
                        <p>{a.description}</p>
                        {isLoggedIn && <button onClick={() => handleDelete(a.id)}>Usuń</button>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;