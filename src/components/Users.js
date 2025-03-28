import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Users.css"; // 🔥 Import CSS

function Users() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.get(`https://reqres.in/api/users?page=${page}`)
            .then(res => setUsers(res.data.data))
            .catch(err => console.error(err));
    }, [page]);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        axios.delete(`https://reqres.in/api/users/${id}`)
            .then(() => {
                alert("User deleted successfully!");
                setUsers(users.filter(user => user.id !== id));
            })
            .catch(err => console.error("Error deleting user:", err));
    };

    return (
        <div className="users-container">
            <h2>Users List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id} className="user-item">
                        <img src={user.avatar} alt={user.first_name} className="user-avatar" />
                        <span className="user-name">{user.first_name} {user.last_name}</span>
                        <Link to={`/edit/${user.id}`} className="edit-link">Edit</Link>
                        <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div className="pagination-buttons">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                <button onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
}

export default Users;
