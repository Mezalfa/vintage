import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);

    const scrollToUpload = () => {
        const uploadSection = document.getElementById('upload');
        if (uploadSection) {
            uploadSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleAnalyze = () => {
        if (selectedFile) {
            // Navigate to upload page with the file
            navigate('/upload', { state: { file: selectedFile } });
        } else {
            // If no file selected, just go to upload page
            navigate('/upload');
        }
    };

    return (
        <>
            {/* Hero Section */}
            <header className="hero d-flex align-items-center justify-content-center text-center text-light">
                <div className="px-3">
                    <h1 className="display-3 fw-bold mb-3">Discover the Era Behind Your Style</h1>
                    <p className="lead mb-4 fs-4">Upload your photo and let AI reveal your fashion story through the decades.</p>
                    <button className="btn btn-light btn-lg px-5 py-3" onClick={scrollToUpload}>
                        Try It Now
                    </button>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-5 fw-bold">How VintageVision Works</h2>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="text-center p-4">
                                <div className="mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#2563eb" viewBox="0 0 16 16">
                                        <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                        <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
                                    </svg>
                                </div>
                                <h4 className="fw-bold mb-3">1. Upload Your Photo</h4>
                                <p className="text-muted">Simply upload a photo of your outfit or fashion piece. Our AI accepts various image formats.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="text-center p-4">
                                <div className="mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#2563eb" viewBox="0 0 16 16">
                                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z"/>
                                    </svg>
                                </div>
                                <h4 className="fw-bold mb-3">2. AI Analysis</h4>
                                <p className="text-muted">Our advanced AI analyzes your fashion, identifying era, style elements, and historical context.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="text-center p-4">
                                <div className="mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#2563eb" viewBox="0 0 16 16">
                                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
                                    </svg>
                                </div>
                                <h4 className="fw-bold mb-3">3. Get Insights</h4>
                                <p className="text-muted">Receive detailed analysis including era classification, style tips, and care recommendations.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Upload Section */}
            <section className="container my-5 py-5" id="upload">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <h2 className="text-center mb-4 fw-bold">Analyze Your Outfit</h2>
                        <p className="text-center text-muted mb-5">Upload a clear photo of your clothing or outfit for the most accurate analysis.</p>
                        <div className="card shadow-sm p-4">
                            <div className="text-center">
                                <label htmlFor="photoUpload" className="form-label fw-semibold mb-3">
                                    Select a photo
                                </label>
                                <input 
                                    type="file" 
                                    id="photoUpload" 
                                    className="form-control mb-3" 
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                {selectedFile && (
                                    <p className="text-success small mb-3">
                                        ✓ Selected: {selectedFile.name}
                                    </p>
                                )}
                                <button 
                                    id="analyzeBtn" 
                                    className="btn btn-dark btn-lg px-5"
                                    onClick={handleAnalyze}
                                >
                                    {selectedFile ? 'Analyze Now' : 'Go to Upload'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-5 bg-dark text-light">
                <div className="container">
                    <div className="row text-center g-4">
                        <div className="col-md-3">
                            <h2 className="display-4 fw-bold">10K+</h2>
                            <p className="text-light-emphasis">Photos Analyzed</p>
                        </div>
                        <div className="col-md-3">
                            <h2 className="display-4 fw-bold">95%</h2>
                            <p className="text-light-emphasis">Accuracy Rate</p>
                        </div>
                        <div className="col-md-3">
                            <h2 className="display-4 fw-bold">50+</h2>
                            <p className="text-light-emphasis">Fashion Eras</p>
                        </div>
                        <div className="col-md-3">
                            <h2 className="display-4 fw-bold">5K+</h2>
                            <p className="text-light-emphasis">Happy Users</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Eras Section */}
            <section className="py-5">
                <div className="container">
                    <h2 className="text-center mb-4 fw-bold">Fashion Eras We Recognize</h2>
                    <p className="text-center text-muted mb-5">Our AI can identify fashion styles from various historical periods</p>
                    <div className="row g-3">
                        {[
                            { era: "1920s", name: "Flapper Era", color: "#fbbf24" },
                            { era: "1940s", name: "War Time Utility", color: "#84cc16" },
                            { era: "1950s", name: "New Look", color: "#06b6d4" },
                            { era: "1960s", name: "Mod & Mini", color: "#8b5cf6" },
                            { era: "1970s", name: "Bohemian Chic", color: "#f97316" },
                            { era: "1980s", name: "Power Dressing", color: "#ec4899" },
                            { era: "1990s", name: "Grunge & Minimalism", color: "#6366f1" },
                            { era: "2000s", name: "Y2K Revival", color: "#14b8a6" }
                        ].map((item, idx) => (
                            <div key={idx} className="col-md-3 col-sm-6">
                                <div className="card h-100 text-center p-3 border-0 shadow-sm" style={{ borderLeft: `4px solid ${item.color}` }}>
                                    <h5 className="fw-bold mb-1">{item.era}</h5>
                                    <p className="small text-muted mb-0">{item.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-5 fw-bold">What Our Users Say</h2>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm p-4">
                                <div className="mb-3">
                                    <span className="text-warning">★★★★★</span>
                                </div>
                                <p className="mb-3">"VintageVision helped me identify my grandmother's vintage dress as authentic 1950s couture. Absolutely amazing!"</p>
                                <div className="d-flex align-items-center">
                                    <div className="rounded-circle bg-secondary" style={{ width: '40px', height: '40px' }}></div>
                                    <div className="ms-3">
                                        <p className="mb-0 fw-semibold">Sarah M.</p>
                                        <p className="mb-0 small text-muted">Vintage Collector</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm p-4">
                                <div className="mb-3">
                                    <span className="text-warning">★★★★★</span>
                                </div>
                                <p className="mb-3">"As a fashion student, this tool is invaluable for my research. The accuracy and detail are impressive!"</p>
                                <div className="d-flex align-items-center">
                                    <div className="rounded-circle bg-secondary" style={{ width: '40px', height: '40px' }}></div>
                                    <div className="ms-3">
                                        <p className="mb-0 fw-semibold">James L.</p>
                                        <p className="mb-0 small text-muted">Fashion Design Student</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm p-4">
                                <div className="mb-3">
                                    <span className="text-warning">★★★★★</span>
                                </div>
                                <p className="mb-3">"Perfect for my vintage clothing business! Helps me accurately date and describe pieces for customers."</p>
                                <div className="d-flex align-items-center">
                                    <div className="rounded-circle bg-secondary" style={{ width: '40px', height: '40px' }}></div>
                                    <div className="ms-3">
                                        <p className="mb-0 fw-semibold">Maria R.</p>
                                        <p className="mb-0 small text-muted">Boutique Owner</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-5 text-center">
                <div className="container">
                    <h2 className="mb-4 fw-bold">Ready to Discover Your Fashion Story?</h2>
                    <p className="lead mb-4 text-muted">Join thousands of users exploring fashion history through AI</p>
                    <button className="btn btn-dark btn-lg px-5" onClick={scrollToUpload}>
                        Get Started Free
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-dark text-light py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="fw-bold mb-3">VintageVision</h5>
                            <p className="text-light-emphasis">AI-powered fashion era analysis for vintage enthusiasts and fashion historians.</p>
                        </div>
                        <div className="col-md-3">
                            <h6 className="fw-bold mb-3">Quick Links</h6>
                            <ul className="list-unstyled">
                                <li><a href="/about" className="text-light-emphasis text-decoration-none">About Us</a></li>
                                <li><a href="/upload" className="text-light-emphasis text-decoration-none">Upload</a></li>
                                <li><a href="/contact" className="text-light-emphasis text-decoration-none">Contact</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <h6 className="fw-bold mb-3">Legal</h6>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-light-emphasis text-decoration-none">Privacy Policy</a></li>
                                <li><a href="#" className="text-light-emphasis text-decoration-none">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                    <hr className="my-4 border-secondary" />
                    <p className="text-center text-light-emphasis mb-0">© 2024 VintageVision. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
}
