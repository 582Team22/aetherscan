import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from "../components/LoginForm";
import '../assets/Login.css';

function Login() {
  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <p className="login-subtitle">Hi! Welcome back.</p>
        <LoginForm />
        <div className="login-footer">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;