import React, { useState } from "react";
import "../CSS/Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type Props = {};

function Login() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="container">
      <div className="left-side">
        <img
          src="/public/Images/Login_Image.jpeg"
          alt="imagen"
          className="image"
        />
      </div>
      <div className="right-side">
        <div className="login">
          <div className="login-logo">
            <img
              src="/public/Images/LogoMotorMaster.png"
              alt="login-icon"
              className="login-img"
            />
            <label htmlFor="" className="login-label">
              Motor Master
            </label>
          </div>
          <input type="text" placeholder="Usuario" className="login-input" />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input password-input"
            />
            <div
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <button className="login-button">Ingresar</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
