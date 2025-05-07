import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import './../styles/logIn.css';

function LogIn() {  
    const navigate = useNavigate(); 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let url = 'https://my-library-back.vercel.app/login'
            // let url = 'http://localhost:3000/login'
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include', // to send and receive cookies
                mode: 'cors'
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(e => {
                    console.error("Erreur de parsing JSON:", e);
                    return { error: `Error: ${response.status} ${response.statusText}` };
                });
                throw new Error(errorData.error || "Error connecting");
            }

            const data = await response.json();


            if (rememberMe && data.token) {
                localStorage.setItem("userToken", data.token);
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
        <div className="connection-container">
            <form onSubmit={handleLogin} className='form1'>
                <div className='title'>Welcome back</div>
                <div className='subtitle'>Please log in</div>
                <div className="connection-inputs">
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
                    <div className="remember-container">
                        <label>
                            <input 
                                type="checkbox" 
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            Remember me
                        </label>
                    </div>

                    <button 
                        type="submit" 
                        className="connection-button"
                        disabled={loading}
                    >
                        {loading ? "Logging in" : "Log In"}
                    </button>

                    <div className="already-account">
                        <p className="text">I don't have an account, <Link className='link-inscription' to="/signup">sign up here</Link></p>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LogIn;