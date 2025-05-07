import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import './../styles/signUp.css'

function SignUp() {  
    const navigate = useNavigate(); 

    const [username, setUsername] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let url = 'https://my-library-back.vercel.app/signup'
            // let url = 'http://localhost:3000/signup'
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, pseudo, email, password }),
                credentials: 'include', // to send and receive cookies
                mode: 'cors'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error connecting");
            }

            navigate('/');
            
        } catch (error) {
            console.error("Request error :", error);
            setError(error.message || "Connection error. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSignup} className='form'>
            <div className='title'>Welcome!</div>
            <div className='subtitle'>Let's create your account.</div>
                <div className="signup-inputs">

                    <div className="input-group">
                        <label className="input-title">Username</label>
                        <input className='input'
                            type="text"
                            placeholder="Awesome username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-title">Pseudo</label>
                        <input className='input'
                            type="text"
                            placeholder="cool_pseudo"
                            value={pseudo}
                            onChange={(e) => setPseudo(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-title">Email</label>
                        <input className='input'
                            type="email"
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-title">Password</label>
                        <input className='input'
                            type="password"
                            placeholder="****"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {error && <div className="error-message">⚠ {error}</div>}

                <div className="actions">

                    <button 
                        type="submit" 
                        className="signup-button"
                        disabled={loading}
                    >
                        {loading ? "Signing up ..." : "Sign Up"}
                    </button>

                    <div className="already-account">
                        <p className="text">I already have an account, <Link className='link-connection' to="/login">log in here</Link></p>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignUp;