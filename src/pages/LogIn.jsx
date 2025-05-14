import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL

function LogIn() {  
    const navigate = useNavigate(); 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [redirectMessage, setRedirectMessage] = useState(null);

    useEffect(()=> {
        const queryParams = new URLSearchParams(location.search);
        const redirectParam = queryParams.get('redirect')

        if (redirectParam === 'true'){
            setRedirectMessage("Please log in to get access to this content")
        }

        const fromPage = queryParams.get('from')
        if(fromPage){
            localStorage.setItem('redirectAfterLogin', fromPage)
        }
    }, [location.search])

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${apiUrl}/login`, {
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

            const toPage = localStorage.getItem('redirectAfterLogin') || '/';
            localStorage.removeItem('redirectAfterLogin');
            navigate(toPage)
            
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
        <div className="bg-gray-50 rounded-xl shadow-lg flex flex-col p-6 w-full h-auto justify-center">
          <h1 className="text-4xl font-semibold text-teal-900 text-center">Welcome back</h1>
          
          {redirectMessage && (
            <h2 className="text-xl text-teal-900 text-center mt-2 mb-2">{redirectMessage}</h2>
          )}
          
          <div className="space-y-4 mt-4">
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

          <div className="flex flex-col mt-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-teal-900">
                Remember me
              </label>
            </div>

            <button
              onClick={handleLogin}
              className="bg-persian-green hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 w-1/3 self-center mt-6"
              disabled={loading}
            >
              {loading ? "Logging in" : "Log In"}
            </button>

            <div className="mt-4 text-center">
              <p className="text-teal-900">
                I don't have an account,{" "}
                <a className="text-teal-500 font-semibold underline" href="/signup">
                  sign up here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default LogIn;