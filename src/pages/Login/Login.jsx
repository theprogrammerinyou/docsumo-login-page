import { useState } from "react";
import "./Login.css";
import { useAuth } from "../../context/auth-context";
import { login } from "../../api/login";
import { useUserData } from "../../context/user-context";

function Login() {

  const { setIsLoggedIn } = useAuth();
  const { setUserData } = useUserData();
  const [error, setError] = useState("");
  const [userInputValues, setUserInputValues] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userInputValues;
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }
    const userData = await login({email, password});
    try {
      if (userData?.token) {
        setUserData(userData);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUserData({});
      }
    } catch (err) {
      setIsLoggedIn(false);
      setUserData({});
      setError(err.message);
    }
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  }
  
  const handleInputChange = (e, inputType) => {
    if (inputType === "email") {
      setUserInputValues({...userInputValues, email: e.target.value})
    }
    if (inputType === "password") {
      setUserInputValues({...userInputValues, password: e.target.value})
    }
  }
  
  return (
    <div className="container">
      <div className="header">
        <a href="/">
          <img
            src="https://app.docsumo.com/static/images/docsumo-logo.1a785f0ecf111285ae69.png"
            alt="Docsumo"
          />
        </a>
      </div>
      <div className="login-container">
        <h1 className="title">Login to your Docsumo account</h1>
        {error && <p className="error">{error}</p>}
        <div className="form-container">
          <form onSubmit={handleLogin}>
            <div className="email-container">
              <label htmlFor="email-input" className="label">Work Email</label>
              <div className="email-input-container">
                <input
                  id="email-input"
                  type="email"
                  autoComplete="off"
                  onChange={(e) => handleInputChange(e, "email")}
                  placeholder="johndoe@abc.com"
                />
              </div>
            </div>
            <div className="password-container">
              <div>
                <label htmlFor="password-input" className="label">Password</label>
                <div className="password-input-container">
                  <input
                    id="password-input"
                    onChange={(e) => handleInputChange(e, "password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password here..."
                  />
                  <span
                    className="show-password"
                    title={showPassword ? "Hide Password" : "Show Password"}
                    onClick={handleShowPasswordToggle}
                  >
                    <svg width="19" height="11" fill="none">
                      <path
                        d="M9.388 0C5.891 0 2.742 1.741.538 4.521a.915.915 0 0 0 0 1.138c2.204 2.78 5.353 4.522 8.85 4.522s6.646-1.741 8.85-4.522a.915.915 0 0 0 0-1.138C16.034 1.741 12.885 0 9.388 0zm0 7.953a2.862 2.862 0 1 1 0-5.725 2.862 2.862 0 0 1 0 5.725z"
                        fill={showPassword ? "#405089" : "#8D8D8D"}
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div id="forgot-pwd-link">
              <a title="Forgot Password?" href="/reset-password">
                Forgot Password?
              </a>
            </div>
            <div id="login-btn-container">
              <button id="login-btn" onClick={handleLogin}>
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="no-account-container">
          <span>Don't have an account?</span>
          &nbsp;&nbsp;<a href="/">Sign Up </a>
        </div>
      </div>
    </div>
  );
}

export { Login };
