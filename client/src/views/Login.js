import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// From redux - dispatch event && get store state status
import { useDispatch, useSelector } from "react-redux";

// Actions
import { signIn } from "../store/actions/authActions";

import Footer from "../components/home/Footer";
import Header from "../components/home/Header";

import "../assets/scss/auth.scss";

export default function Login() {
  const navigate = useNavigate(); // redirect and navigate
  const dispatch = useDispatch(); // dispatch events

  const auth = useSelector((state) => state.auth); // get store state status from auth

  // Login credentials informations
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  // Before mount, mount and update component
  useEffect(() => {
    // Check if user already authenticated and redirect to dashboard
    if (auth._id) navigate("/dashboard");
  }, [auth]);

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    dispatch(signIn(login));
  };

  return (
    <div className="body-wrap">
      <Header />

      <div className="page-content">
        <div className="form-structor shadow">
          <div className="login">
            <div className="center">
              <h2 className="form-title" id="login">
                Se connecter
              </h2>
              <form className="form-holder">
                <input
                  type="email"
                  className="input"
                  placeholder="Adresse mail"
                  name="email-login"
                  value={login.email}
                  onChange={(e) =>
                    setLogin({ ...login, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  className="input"
                  placeholder="Mot de passe"
                  name="password-login"
                  value={login.password}
                  onChange={(e) =>
                    setLogin({ ...login, password: e.target.value })
                  }
                />
              </form>
              <button onClick={handleSubmitLogin} className="submit-btn">
                Se connecter
              </button>
              <p className="fs-12 fw-semibold text-center">
                <Link className="link" to="#">
                  Mot de passe oublié ?
                </Link>
              </p>
              <p className="fs-12 fw-semibold text-center">
                Vous n'avez pas de compte ?&nbsp;
                <Link className="link" to="/signup">
                  Vous inscrire ici
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
