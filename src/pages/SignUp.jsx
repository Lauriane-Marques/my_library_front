import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL

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
            const response = await fetch(`${apiUrl}/signup`, {
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
        <div className="bg-gradient-to-br from-teal-900 to-green-200 min-h-screen w-full flex items-center justify-center">
            <div className="w-full max-w-md">
                <div className="bg-gray-50 rounded-xl shadow-lg flex flex-col p-6 w-full">
                    <h1 className="text-4xl font-semibold text-teal-900 text-center mt-4">Welcome!</h1>
                    <h2 className="text-xl text-teal-900 text-center mt-2 mb-6">Let's create your account.</h2>
                    
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-teal-900 mb-1 font-medium">Username</label>
                            <input
                            className="bg-teal-50 px-4 py-2 text-teal-900 text-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                            type="text"
                            placeholder="Awesome username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-teal-900 mb-1 font-medium">Pseudo</label>
                            <input
                            className="bg-teal-50 px-4 py-2 text-teal-900 text-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                            type="text"
                            placeholder="cool_pseudo"
                            value={pseudo}
                            onChange={(e) => setPseudo(e.target.value)}
                            required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-teal-900 mb-1 font-medium">Email</label>
                            <input
                            className="bg-teal-50 px-4 py-2 text-teal-900 text-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                            type="email"
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-teal-900 mb-1 font-medium">Password</label>
                            <input
                            className="bg-teal-50 px-4 py-2 text-teal-900 text-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                            type="password"
                            placeholder="****"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                        </div>
                    </div>

                    {error && (
                    <div className="mt-4 p-2 bg-red-100 border border-red-500 text-red-700 rounded">
                        ⚠ {error}
                    </div>
                    )}

                    <div className="flex flex-col items-center mt-6">
                    <button
                        onClick={handleSignup}
                        className="bg-persian-green hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 w-1/3"
                        disabled={loading}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>

                    <div className="mt-4 text-center">
                        <p className="text-teal-900">
                        I already have an account,{" "}
                        <a className="text-teal-500 font-semibold underline" href="/login">
                            log in here
                        </a>
                        </p>
                    </div>
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default SignUp;