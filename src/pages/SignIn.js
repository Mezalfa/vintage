import { useState, useMemo } from 'react';

function calcStrength(pw) {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    
    if (score <= 1) return { label: 'Weak', pct: 20, className: 'strength-weak' };
    if (score === 2) return { label: 'Fair', pct: 40, className: 'strength-fair' };
    if (score === 3) return { label: 'Good', pct: 70, className: 'strength-good' };
    return { label: 'Strong', pct: 100, className: 'strength-strong' };
}

export default function SignIn() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [showCreate, setShowCreate] = useState(false);

    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newLogin, setNewLogin] = useState('');
    const [newPassword, setNewPassword] = useState('');
    
    const strength = useMemo(() => calcStrength(newPassword), [newPassword]);

    function handleCreateEnter(e) {
        e.preventDefault();
        setLogin(newLogin);
        setPassword(newPassword);
        setNewName('');
        setNewEmail('');
        setNewLogin('');
        setNewPassword('');
        setShowCreate(false);
        alert('Account created! You can now sign in.');
    }

    function handleSignIn(e) {
        e.preventDefault();
        alert(`Signing in with:\nLogin: ${login}\nPassword: ${'*'.repeat(password.length)}`);
    }

    return (
        <main className="container my-5 pt-5">
            <div className="row g-4 align-items-start">
                <div className="col-12 col-lg-6">
                    <div className="card card-elev">
                        <div className="card-body p-4">
                            <h1 className="h4 mb-3">Sign in</h1>
                            <form onSubmit={handleSignIn}>
                                <div className="mb-3">
                                    <label htmlFor="login" className="form-label">Login</label>
                                    <input 
                                        id="login" 
                                        className="form-control" 
                                        placeholder="username or email"
                                        value={login} 
                                        onChange={e => setLogin(e.target.value)} 
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <div className="input-group">
                                        <input 
                                            id="password" 
                                            className="form-control"
                                            type={showPwd ? 'text' : 'password'}
                                            value={password} 
                                            onChange={e => setPassword(e.target.value)} 
                                            required
                                        />
                                        <button 
                                            type="button" 
                                            className="btn btn-outline-secondary"
                                            onClick={() => setShowPwd(s => !s)}
                                        >
                                            {showPwd ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                </div>
                                <div className="d-grid mt-3">
                                    <button className="btn btn-dark" type="submit">Sign In</button>
                                </div>
                            </form>

                            <div className="text-center mt-3">
                                <button 
                                    className="btn btn-link" 
                                    onClick={() => setShowCreate(true)}
                                >
                                    Create account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <img 
                        className="side-illustration mb-3" 
                        alt="Welcome Illustration"
                        src="/images/welcome.png"
                        onError={(e) => e.target.style.display = 'none'}
                    />
                    
                    {showCreate && (
                        <div className="card card-elev">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h2 className="h5 m-0">Create account</h2>
                                    <button 
                                        className="btn btn-sm btn-outline-secondary" 
                                        onClick={() => setShowCreate(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                                <form className="mt-3" onSubmit={handleCreateEnter}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input 
                                            id="name" 
                                            className="form-control" 
                                            value={newName}
                                            onChange={e => setNewName(e.target.value)} 
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input 
                                            id="email" 
                                            type="email" 
                                            className="form-control" 
                                            value={newEmail}
                                            onChange={e => setNewEmail(e.target.value)} 
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="newLogin" className="form-label">Login</label>
                                        <input 
                                            id="newLogin" 
                                            className="form-control" 
                                            value={newLogin}
                                            onChange={e => setNewLogin(e.target.value)} 
                                            required
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="newPassword" className="form-label">Password</label>
                                        <input 
                                            id="newPassword" 
                                            type="password" 
                                            className="form-control" 
                                            value={newPassword}
                                            onChange={e => setNewPassword(e.target.value)} 
                                            required
                                        />
                                    </div>
                                    <div className="d-flex align-items-center gap-2 mb-3">
                                        <div className="strength-bar flex-grow-1">
                                            <div 
                                                className={`strength-fill ${strength.className}`} 
                                                style={{ width: strength.pct + '%' }}
                                            />
                                        </div>
                                        <small className="text-muted" style={{ minWidth: '60px', textAlign: 'right' }}>
                                            {strength.label}
                                        </small>
                                    </div>

                                    <div className="d-grid">
                                        <button className="btn btn-primary" type="submit">Enter</button>
                                    </div>
                                    <small className="text-muted d-block mt-2">
                                        On Enter: the form will close and your new login/password will be filled into the Sign in form.
                                    </small>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
