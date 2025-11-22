import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const scrollToUpload = () => {
        const uploadSection = document.getElementById('upload');
        if (uploadSection) {
            uploadSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleAnalyze = () => {
        // Redirect to upload page
        navigate('/upload');
    };

    return (
        <>
            <header className="hero d-flex align-items-center justify-content-center text-center text-light">
                <div className="px-3">
                    <h1 className="display-5 fw-bold">Discover the Era Behind Your Style</h1>
                    <p className="lead mb-4">Upload your photo and let AI reveal your fashion story.</p>
                    <button className="btn btn-light btn-lg" onClick={scrollToUpload}>
                        Try It Now
                    </button>
                </div>
            </header>

            <section className="container my-5" id="upload">
                <h2 className="text-center mb-4">Analyze Your Outfit</h2>
                <div className="text-center">
                    <input 
                        type="file" 
                        id="photoUpload" 
                        className="form-control" 
                        style={{ maxWidth: '420px', margin: '0 auto' }}
                    />
                    <button 
                        id="analyzeBtn" 
                        className="btn btn-dark mt-3"
                        onClick={handleAnalyze}
                    >
                        Analyze
                    </button>
                </div>

                <div id="resultBox" className="mt-4 text-center d-none">
                    <h4>Result:</h4>
                    <p id="resultText">Your outfit resembles 1970s Bohemian Chic style!</p>
                </div>
            </section>
        </>
    );
}
