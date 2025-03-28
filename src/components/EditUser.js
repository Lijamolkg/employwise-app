import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditUser() {
    const { id } = useParams(); // Get user ID from URL
    const navigate = useNavigate(); // For redirecting after update

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        avatar: ""
    });

    useEffect(() => {
        axios.get(`https://reqres.in/api/users/${id}`)
            .then(res => setUser(res.data.data))
            .catch(err => console.error("Error fetching user:", err));
    }, [id]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://reqres.in/api/users/${id}`, user)
            .then(() => {
                alert("User updated successfully!");
                localStorage.setItem("refreshUsers", "true"); // 🔥 Set refresh flag
                navigate("/users"); // Redirect back to users list
            })
            .catch(err => console.error("Error updating user:", err));
    };
    
    return (
        <div>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <label>First Name:</label>
                <input type="text" name="first_name" value={user.first_name} onChange={handleChange} required />

                <label>Last Name:</label>
                <input type="text" name="last_name" value={user.last_name} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="email" value={user.email} onChange={handleChange} required />

                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default EditUser;
