import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [showThankYou, setShowThankYou] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowThankYou(true);
        // Reset form after 3 seconds
        setTimeout(() => {
            setFormData({ name: '', email: '', message: '' });
            setShowThankYou(false);
        }, 3000);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <main className="contact-page flex-grow-1 container pt-5 mt-5 my-5">
            <div className="text-center mb-4">
                <img 
                    src="/images/contactme.png"
                    alt="Contact Me"
                    className="contact-img shadow-sm"
                    width="300"
                    onError={(e) => e.target.style.display = 'none'}
                />
            </div>
            <h2 className="text-center mb-4">Get in Touch</h2>

            <form className="w-75 mx-auto" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        className="form-control" 
                        value={formData.name}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Your Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email"
                        className="form-control" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea 
                        id="message" 
                        name="message"
                        rows="4" 
                        className="form-control" 
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-dark w-100">Send Message</button>
            </form>

            {showThankYou && (
                <div className="text-center mt-4">
                    <div className="alert alert-success">
                        <h4>Thanks for reaching out! We'll respond soon.</h4>
                    </div>
                </div>
            )}
        </main>
    );
}
