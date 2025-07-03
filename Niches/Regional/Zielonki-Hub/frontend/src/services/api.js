// Serwis komunikacji z backendem (REST API)

import axios from 'axios';

// Pobieranie ogłoszeń
export const getAnnouncements = async () => {
    const res = await axios.get('/announcements');
    return res.data;
};

// Tworzenie ogłoszenia z tokenem
export const createAnnouncement = async (data) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.post('/announcements', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (err) {
        alert("Błąd podczas dodawania ogłoszenia: (czy jesteś zalogowany?)");
        return null;
    }
};

// Usuwanie ogłoszenia
export const deleteAnnouncement = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/announcements/${id}`, {
        headers: { Authorization: `Bearer ${token}`}
    });
};


// Logowanie użytkownika
export const login = async (username, password) => {
    const res = await axios.post('/token', new URLSearchParams({
        username,
        password
    }));
    localStorage.setItem('token', res.data.access_token);
};

// Rejestracja nowego użytkownika
export const register = async (username, password) => {
    return axios.post('/register', {username, password });
};
