import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./views/LandingPage";
import LoginPage from "./views/LoginPage";
import SignUpPage from "./views/SignUpPage";
import HomePage from "./views/HomePage";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/home" element={<HomePage/>} />
            </Routes>
        </Router>
    );
}

export default App;
