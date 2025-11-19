import { Routes, Route, NavLink } from 'react-router-dom'
import Upload from './pages/Upload.jsx'
import Results from './pages/Results.jsx'

export default function App() {
    return (
        <div className="container">
            <header className="header">
                <span className="logo"></span>
                <div>
                    <div className="h1">VintageVision</div>
                    <div className="subtitle">Reinventing vintage discovery with AI</div>
                </div>
                <nav className="nav">
                    <NavLink to="/" className="navlink">Upload</NavLink>
                    <NavLink to="/results" className="navlink">Results</NavLink>
                </nav>
            </header>

            <Routes>
                <Route path="/" element={<Upload />} />
                <Route path="/results" element={<Results />} />
            </Routes>
        </div>
    )
}
