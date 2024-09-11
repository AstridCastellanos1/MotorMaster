import React, { useState, useContext } from "react";
import "../CSS/Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "./context/GlobalContext";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const globalContext = useContext(GlobalContext);

  if (!globalContext) {
    return <div>Error: GlobalContext no está disponible.</div>;
  }

  const { setValor } = globalContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = { usuario, password };

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setValor(usuario);
          navigate("/Login/Menu");
        } else {
          setErrorMessage("Usuario o contraseña incorrectos");
        }
      } else {
        setErrorMessage("Error en la respuesta del servidor");
      }
    } catch (error) {
      setErrorMessage("Error al enviar la solicitud");
    }
  };

  return (
    <div className="login-container" id="login-c">
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
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="login-input"
              />
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
              {errorMessage && (
                <div className="error-message">
                  <label>{errorMessage}</label>
                </div>
              )}
              <button type="submit" className="login-button">
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
