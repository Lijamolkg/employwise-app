import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Users from "./components/Users";
import EditUser from "./components/EditUser";

function isAuthenticated() {
    return !!localStorage.getItem("token");
}

function PrivateRoute({ children }) {
    return isAuthenticated() ? children : <Navigate to="/" />;
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
                <Route path="/edit/:id" element={<PrivateRoute><EditUser /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
