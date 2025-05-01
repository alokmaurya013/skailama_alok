
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import Projects from './pages/Projects';
import UploadFlow from './pages/UploadFlow';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/create" element={<HomePage />} />
        <Route path="/projects" element={<Projects/>} />
        <Route path="/project/:id" element={<UploadFlow />} />

      </Routes>
    </Router>
  );
}

export default App;
