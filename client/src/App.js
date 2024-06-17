import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import LandingPage from "./views/LandingPage";
import LoginPage from "./views/LoginPage";
import SignUpPage from "./views/SignUpPage";
import HomePage from "./views/HomePage";
import {useAuthContext} from "./hooks/useAuthContext"
import Navbar from "./components/Navbar";
import SharedNoteCard from "./components/SharedNoteCard";
import SharedNoteViewPage from "./views/SharedNoteViewPage";

function App() {
    const {authState} = useAuthContext()
    const {user} = authState

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={!user ? <LandingPage /> : <HomePage/> }
                />
                <Route
                    path="/login"
                    element={!user ? <LoginPage /> : <HomePage/> }
                />
                <Route
                    path="/signup"
                    element={!user ? <SignUpPage /> : <HomePage/> }
                />
                <Route
                    path="/home"
                    element={user ? <HomePage token={user.token}/> : <Navigate to="/login"/>}
                />
                <Route
                    path="/share/:endpoint"
                    element={<SharedNoteViewPage/>}
                />
            </Routes>
        </Router>
    );
}

export default App;
