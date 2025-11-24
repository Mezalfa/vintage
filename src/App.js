import './App.css'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import Upload from './pages/Upload';
import Results from './pages/Results';

export default function App() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/results" element={<Results />} />
            </Routes>

            <footer className="text-center py-4 bg-dark text-light mt-auto">
                © 2025 Vintage Vision. All Rights Reserved.
            </footer>
        </div>
    );
}
